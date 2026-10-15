"""Bounded, read-only delimited-table exploration. No disk extraction or spilling."""
import csv, gzip, io, json, math, sys, os, zipfile, atexit, shutil, tempfile, time, uuid
from pathlib import PurePosixPath
import duckdb
from validation_worker import filter_sql, validate, validate_partitioned
from derivation_worker import derive, datetime_loss_predicate, datetime_precision_error, require_datetime_precision
from summary_worker import summarize

MAX_ZIP_BYTES=128*1024*1024
WORKER_MEMORY_LIMIT='1GB'
MAX_CACHE_SOURCE_BYTES=128*1024*1024
PATTERN_CHARACTERS='*?[]'

def ident(s):
    return '"' + s.replace('"', '""') + '"'

def literal(s):
    return "'"+str(s).replace("'","''")+"'"

_alias_dir=None
_alias=None
ALIAS_PREFIX='tedata-source-'
STALE_ALIAS_SECONDS=24*3600

def sweep_stale_aliases(now=None):
    """Remove alias folders left by workers that were stopped without exiting (the parent kills them).

    Only folders of this worker's own prefix in the temporary folder, untouched for a day, are removed.
    """
    now=time.time() if now is None else now
    try:parent=tempfile.gettempdir();names=os.listdir(parent)
    except OSError:return
    for name in names:
        if not name.startswith(ALIAS_PREFIX):continue
        path=os.path.join(parent,name)
        try:
            if os.path.isdir(path) and not os.path.islink(path) and now-os.lstat(path).st_mtime>STALE_ALIAS_SECONDS:shutil.rmtree(path,ignore_errors=True)
        except OSError:pass

def release_alias():
    """Drop the pattern-free alias of the previous source; it lives only while that source is current."""
    global _alias
    if _alias:
        try:os.unlink(_alias)
        except OSError:pass
        _alias=None

def literal_path(path):
    """DuckDB expands * ? and [ ] in a path as a pattern, so 'data[1].csv' can read 'data1.csv'.

    Its CSV reader has no literal mode (DuckDB 1.5.6), so such a path is read through a pattern-free
    alias in a private temporary folder: a symbolic link, or a hard link where links cannot be made,
    that the system resolves to the very file the parent resolved (same device and inode, checked).
    The rows and the fingerprint therefore describe one file. If no alias can be made, the path is
    refused before anything is read. The alias is removed when another source becomes current.
    """
    global _alias_dir,_alias
    found=[c for c in PATTERN_CHARACTERS if c in path]
    if not found:return path
    problem='The file path contains '+' '.join(found)+', which the data reader would expand as a pattern'
    advice='. Rename the file or its folder without * ? [ ] and connect it again.'
    if _alias_dir is None:
        sweep_stale_aliases()
        _alias_dir=tempfile.mkdtemp(prefix=ALIAS_PREFIX)
        atexit.register(shutil.rmtree,_alias_dir,True)
    if any(c in _alias_dir for c in PATTERN_CHARACTERS):raise ValueError(problem+', and the temporary folder is itself named with such a character'+advice)
    lower=path.lower()
    alias=os.path.join(_alias_dir,uuid.uuid4().hex+('.tsv' if lower.endswith(('.tsv','.tsv.gz')) else '.csv')+('.gz' if lower.endswith('.gz') else ''))
    try:
        try:os.symlink(path,alias)
        except OSError:os.link(path,alias)
        a=os.stat(alias);b=os.stat(path)
        if (a.st_dev,a.st_ino)!=(b.st_dev,b.st_ino):raise OSError('the alias does not resolve to the file')
    except OSError:
        try:os.unlink(alias)
        except OSError:pass
        raise ValueError(problem+', and no literal alias for it could be made on this system'+advice) from None
    _alias=alias
    return alias

def open_source(path, settings):
    """Inspect generic syntax only; interpretation remains an explicit user/model step."""
    members=[]
    member=settings.get('member')
    if path.lower().endswith('.zip'):
        with zipfile.ZipFile(path) as archive:
            entries=archive.infolist()
            if len(entries)>1000: raise ValueError('ZIP archives may contain at most 1,000 entries.')
            for entry in entries:
                p=PurePosixPath(entry.filename)
                if p.is_absolute() or '..' in p.parts or '\\' in entry.filename or '\0' in entry.filename or (entry.external_attr>>16)&0o170000==0o120000:
                    raise ValueError('ZIP contains an unsafe member name or symbolic link.')
                if not entry.is_dir() and entry.filename.lower().endswith(('.csv','.tsv')):
                    members.append(entry.filename)
            if len(members)!=len(set(members)): raise ValueError('ZIP has duplicate member names.')
            if not members: raise ValueError('ZIP contains no CSV or TSV member.')
            if member is None:
                if len(members)>1:
                    return None,{'members':members,'requiresMember':True},[],[]
                member=members[0]
            if member not in members: raise ValueError('Choose a CSV or TSV member from this ZIP.')
            info=archive.getinfo(member)
            if info.file_size>MAX_ZIP_BYTES or info.file_size/max(1,info.compress_size)>1000:
                raise ValueError('ZIP member exceeds the 128 MiB in-memory limit or compression-ratio limit.')
            with archive.open(member) as handle: payload=handle.read(MAX_ZIP_BYTES+1)
            if len(payload)>MAX_ZIP_BYTES: raise ValueError('ZIP member exceeds the in-memory limit.')
            source=io.BytesIO(payload)
            sample=payload[:65536].decode('utf-8-sig',errors='replace')
    else:
        if member: raise ValueError('A member can only be selected for a ZIP archive.')
        opener=gzip.open if path.lower().endswith('.gz') else open
        with opener(path,'rt',encoding='utf-8-sig') as handle: sample=handle.read(65536)
        source=path
    if not sample.strip(): raise ValueError('The source is empty.')
    delimiter=settings.get('delimiter')
    if delimiter is None:
        try: delimiter=csv.Sniffer().sniff(sample,delimiters=',\t;|').delimiter
        except csv.Error: delimiter='\t' if (member or path).lower().endswith(('.tsv','.tsv.gz')) else ','
    if len(delimiter)!=1 or delimiter in ['\0','\n','\r','"']: raise ValueError('Choose a single delimiter character.')
    header=settings.get('header')
    if header is None:
        try: header=csv.Sniffer().has_header(sample)
        except csv.Error: header=False
    records=list(csv.reader(io.StringIO(sample),delimiter=delimiter))[:21]
    reader={'header':bool(header),'delimiter':delimiter,'inferred':not ('header' in settings and 'delimiter' in settings),'note':'Header and delimiter guesses are mechanical; confirm them when saving the setup.'}
    if members: reader.update(member=member,members=members)
    return source,reader,records[:20],records[1:21] if header else records[:20]

_connection=None
_source_key=None
_reader_info=None
_raw_records=None
_datetime_precision_cache={}

def validated_base_datetime(request,path,stat,configuration,reader,raw_names):
    """Reuse only measured base-source facts pinned by the parent service.

    This internal field is never accepted by the public operation schema. The
    parent also pins the exact profile object; the worker independently checks
    source identity and parser bindings before using any retained measurement.
    Transformations must still validate the actual relation they produce.
    """
    proof=request.get('validatedBaseDatetime');profile=request.get('profile')
    if not isinstance(proof,dict) or type(proof.get('version')) is not int or proof['version']!=1 or not isinstance(profile,dict):return []
    def stamp(s):
        return {'path':path,'size':str(s.st_size),'mtimeNs':str(s.st_mtime_ns),'ctimeNs':str(s.st_ctime_ns),'dev':str(s.st_dev),'ino':str(s.st_ino)}
    try:
        if proof.get('source')!=stamp(stat) or proof.get('source')!=stamp(os.stat(path)):return []
        if json.dumps(proof.get('configuration'),sort_keys=True)!=json.dumps(configuration,sort_keys=True) or json.dumps(proof.get('reader'),sort_keys=True)!=json.dumps(reader,sort_keys=True):return []
        rows=profile.get('rows');columns=profile.get('columns')
        if type(rows) is not int or not 0<=rows<=9007199254740991 or not isinstance(columns,list):return []
        expected=[]
        for col in columns:
            if not isinstance(col,dict):return []
            if col.get('type')!='datetime':continue
            source=col.get('source',col.get('name'));count=col.get('precisionLossCount')
            if source not in raw_names or not isinstance(col.get('name'),str) or type(count) is not int or not 0<=count<=rows:return []
            expected.append({'source':source,'name':col['name'],'type':'datetime',**{k:col[k] for k in ['format','timezone'] if k in col},'precisionLossCount':count})
        if len({col['source'] for col in expected})!=len(expected) or json.dumps(proof.get('columns'),sort_keys=True)!=json.dumps(expected,sort_keys=True):return []
        return expected
    except (OSError,TypeError,ValueError):return []

def column_value_expression(config):
    q=ident(config['source'])
    kind=config['type']
    if kind=='text': return q
    if kind=='number':
        expr=f'TRY_CAST({q} AS DOUBLE)'
        if config.get('scale') is not None:
            if not math.isfinite(config['scale']): raise ValueError('Scale must be finite.')
            expr=f'({expr}*{float(config["scale"])!r})'
        return expr
    if kind=='datetime':
        fmt=config.get('format'); zone=config.get('timezone')
        if zone and fmt and ('%z' in fmt or '%Z' in fmt): raise ValueError('Use a date offset or a separate timezone, not both.')
        expr=f'try_strptime({q},{literal(fmt)})' if fmt else f'TRY_CAST({q} AS {"TIMESTAMP" if zone else "TIMESTAMPTZ"})'
        if zone: expr=f'timezone({literal(zone)},{expr})'
        return f'CAST({expr} AS TIMESTAMPTZ)'
    raise ValueError('Unknown configured column type.')

def column_expression(config):
    expr=column_value_expression(config)
    return expr if config['type']=='text' else f'CAST({expr} AS VARCHAR)'

def load_zip_table(db,source,reader):
    """Read a bounded ZIP member in batches without a filesystem or extra adapter."""
    csv.field_size_limit(1048576)
    records=csv.reader(io.TextIOWrapper(source,encoding='utf-8-sig',newline=''),delimiter=reader['delimiter'],strict=True)
    first=next(records,[])
    if not first:raise ValueError('The selected ZIP member is empty.')
    if len(first)>128:raise ValueError('This explorer supports up to 128 columns per file.')
    names=[]
    for i,value in enumerate(first):
        name=(value or 'column_'+str(i+1)) if reader['header'] else 'column_'+str(i+1)
        base=name;index=1
        while name in names:name=base+'_'+str(index);index+=1
        names.append(name)
    if any(len(n)>200 for n in names):raise ValueError('Column names must be at most 200 characters.')
    db.execute('CREATE TABLE cached_source ('+','.join(ident(n)+' VARCHAR' for n in names)+')')
    sql='INSERT INTO cached_source SELECT '+','.join('unnest(?::VARCHAR[])' for _ in names)
    batch=[] if reader['header'] else [first]
    def flush():
        if batch:db.execute(sql,[[row[i] if row[i]!='' else None for row in batch] for i in range(len(names))]);batch.clear()
    for row in records:
        if not row:continue
        if len(row)!=len(names):raise ValueError('ZIP member contains inconsistent row widths. Check the delimiter and header settings.')
        batch.append(row)
        if len(batch)>=512:flush()
    flush()
    db.execute('CREATE VIEW input_source AS SELECT * FROM cached_source')

def release_source_cache(db):
    """Give read-only checks more working memory without changing their scope."""
    has_file=db.execute("SELECT count(*) FROM duckdb_views() WHERE view_name='file_source'").fetchone()[0]
    has_cache=db.execute("SELECT count(*) FROM duckdb_tables() WHERE table_name='cached_source'").fetchone()[0]
    if not has_file or not has_cache:return False
    # All interpreted/transformed views continue to reference input_source.
    # ZIP members have no file_source and keep their bounded in-memory table.
    db.execute('CREATE OR REPLACE VIEW input_source AS SELECT * FROM file_source')
    db.execute('DROP TABLE cached_source')
    return True

def cache_file_source(db,source_bytes,cache_memory='768MB'):
    """A compressed file's on-disk size does not bound its VARCHAR table.

    Leave headroom for the CSV reader and native allocations while trying the
    optional cache. A failed cache attempt falls back to the identical file
    relation; restore the worker's query budget before running any checks.
    """
    cached=False
    if source_bytes<=MAX_CACHE_SOURCE_BYTES:
        try:
            db.execute('SET memory_limit='+literal(cache_memory))
            db.execute('CREATE TABLE cached_source AS SELECT * FROM file_source')
            cached=True
        except duckdb.OutOfMemoryException:
            db.execute('DROP TABLE IF EXISTS cached_source')
        finally:
            # current_setting formats a rounded human-readable size; restoring
            # that repeatedly would gradually shrink the budget across files.
            db.execute('SET memory_limit='+literal(WORKER_MEMORY_LIMIT))
    db.execute('CREATE VIEW input_source AS SELECT * FROM '+('cached_source' if cached else 'file_source'))
    return cached

def explore(request):
    global _connection, _source_key, _reader_info, _raw_records, _datetime_precision_cache
    if _connection is None:
        _connection=duckdb.connect(':memory:',config={'memory_limit':WORKER_MEMORY_LIMIT,'threads':'2','temp_directory':'','max_temp_directory_size':'0B','enable_external_access':'true','autoinstall_known_extensions':'false','autoload_known_extensions':'false'})
    db=_connection
    db.execute("SET TimeZone='UTC'")
    path=request['path']; configuration=request.get('configuration')
    settings=request.get('reader') or (configuration or {}).get('reader') or {}
    if request.get('action') in ['preview_derive','save_derived'] and request.get('recipe',{}).get('basis')=='raw':configuration=None
    st=os.stat(path);key=(path,st.st_dev,st.st_ino,st.st_size,st.st_mtime_ns,st.st_ctime_ns,json.dumps(settings,sort_keys=True))
    # Only the parent resolves configured files; the model cannot supply a path.
    if key!=_source_key:
        _source_key=None
        _datetime_precision_cache={}
        for name in ['source','interpreted_source','input_source','file_source']:
            db.execute(f'DROP VIEW IF EXISTS {name}')
        db.execute('DROP TABLE IF EXISTS cached_source')
        release_alias()
        source,reader,raw_records,_=open_source(path,settings)
        if source is None:
            return {'kind':'profile','rows':None,'columns':[],'rawColumns':[],'rawRows':[],'rawRecords':[],'reader':reader,'requiresMember':True,'typeNote':'Select a ZIP member before inspecting records.'}
        if isinstance(source,io.BytesIO):
            load_zip_table(db,source,reader)
        else:
            options=dict(header=reader['header'],sep=reader['delimiter'],all_varchar=True,sample_size=10000,parallel=False,max_line_size=1048576)
            # A gzip stream cannot be sampled by seeking. A bounded read buffer keeps dialect
            # detection from decompressing the whole file repeatedly; the parsed rows are identical.
            if path.lower().endswith('.gz'):options['buffer_size']=2*1048576
            relation=db.read_csv(literal_path(source),**options)
            if not reader['header']:
                relation=relation.project(','.join(ident(n)+' AS '+ident('column_'+str(i+1)) for i,n in enumerate(relation.columns)))
            relation.create_view('file_source')
            cache_file_source(db,st.st_size)
        _source_key=key;_reader_info=reader;_raw_records=raw_records
    raw_names=[r[0] for r in db.execute('DESCRIBE input_source').fetchall()]
    if len(raw_names)>128 or any(len(n)>200 for n in raw_names): raise ValueError('This explorer supports up to 128 columns and 200-character column names.')
    def precision_key(name,config=None):
        return json.dumps([name,(config or {}).get('format'),(config or {}).get('timezone')])
    for fact in validated_base_datetime(request,path,st,configuration,_reader_info,raw_names):
        _datetime_precision_cache[precision_key(fact['source'],fact)]=fact['precisionLossCount']
    def guard_datetime_source(name,config=None):
        source_name=(config or {}).get('source',name);cache_key=precision_key(source_name,config)
        if cache_key not in _datetime_precision_cache:
            parsed=column_value_expression(config) if config else None
            _datetime_precision_cache[cache_key]=db.execute('SELECT count(*) FROM input_source WHERE '+datetime_loss_predicate(ident(source_name),(config or {}).get('format'),parsed)).fetchone()[0]
        if _datetime_precision_cache[cache_key]:raise datetime_precision_error(name,_datetime_precision_cache[cache_key])
    configured={}
    if configuration:
        items=configuration['columns']
        if len({c['name'] for c in items})!=len(items) or len({c['source'] for c in items})!=len(items): raise ValueError('Column names and sources must be unique.')
        if any(c['source'] not in raw_names for c in items): raise ValueError('A configured source column is missing. Preview the reader settings and update the mapping.')
        for c in items:
            if c['type']=='datetime' and c.get('format'):
                try:db.execute('SELECT try_strptime(\'\',?)',[c['format']])
                except duckdb.InvalidInputException:
                    raise ValueError('Invalid date format for column '+json.dumps(c['name'])+'. Use strptime directives such as %Y%m%d %H:%M or %Y-%m-%d.') from None
        configured={c['name']:c for c in items}
        expressions={c['name']:column_expression(c) for c in items}
        for c in items:
            if c['type']=='datetime':guard_datetime_source(c['name'],c)
        db.execute('CREATE OR REPLACE VIEW interpreted_source AS SELECT '+','.join(expressions[c['name']]+' AS '+ident(c['name']) for c in items)+' FROM input_source')
    else:
        expressions={n:ident(n) for n in raw_names}
        db.execute('CREATE OR REPLACE VIEW interpreted_source AS SELECT * FROM input_source')
    db.execute('CREATE OR REPLACE VIEW source AS SELECT * FROM interpreted_source')
    names=[r[0] for r in db.execute('DESCRIBE source').fetchall()]
    profile=request.get('profile')
    if not profile:
        sample=db.execute('SELECT * FROM source LIMIT 1000').fetchall()
        columns,exprs=[],['count(*)']
        for i,name in enumerate(names):
            values=[r[i] for r in sample if r[i] not in (None,'')]
            numeric=bool(values) and all(is_number(v) for v in values)
            temporal=bool(values) and not numeric and all(len(v)>=10 and v[4:5]=='-' and v[7:8]=='-' for v in values)
            kind=configured.get(name,{}).get('type') or ('number' if numeric else 'datetime' if temporal else 'text')
            q=ident(configured.get(name,{}).get('source',name));expr=expressions[name]
            value=column_value_expression(configured[name]) if name in configured else f'TRY_CAST({expr} AS DOUBLE)' if kind=='number' else f'TRY_CAST({expr} AS TIMESTAMPTZ)' if kind=='datetime' else expr
            columns.append({**configured.get(name,{}),'name':name,'type':kind,'examples':list(dict.fromkeys(values))[:30]})
            cached_precision=_datetime_precision_cache.get(precision_key(configured.get(name,{}).get('source',name),configured.get(name)))
            precision=str(cached_precision) if kind=='datetime' and cached_precision is not None else f'count(*) FILTER (WHERE {datetime_loss_predicate(q,configured.get(name,{}).get("format"),value)})' if kind=='datetime' else '0'
            exprs.extend([f'count(*) FILTER (WHERE {q} IS NULL OR {q}=\'\')',f'CAST(min({value}) AS VARCHAR)' if kind=='datetime' else f'min({value})',f'CAST(max({value}) AS VARCHAR)' if kind=='datetime' else f'max({value})',f'count(*) FILTER (WHERE {q} IS NOT NULL AND {q}<>\'\' AND {value} IS NULL)',precision])
        stats=db.execute('SELECT '+','.join(exprs)+' FROM input_source').fetchone()
        for i,col in enumerate(columns):
            missing,low,high,invalid,precision_loss=stats[1+i*5:6+i*5];col.update(missing=missing,min=low,max=high,invalid=invalid)
            if col['type']=='datetime':
                col.update(datetimePrecision='microseconds',precisionLossCount=precision_loss)
                _datetime_precision_cache[precision_key(col.get('source',col['name']),configured.get(col['name']))]=precision_loss
        return {'kind':'profile','rows':stats[0],'columns':columns,'reader':_reader_info,'rawColumns':raw_names,'rawRows':db.execute('SELECT * FROM input_source LIMIT 20').fetchall(),'rawRecords':_raw_records,'sampleRows':sample[:20],'typeNote':'Configured types are explicit; other types are inferred from the first 1,000 records. Counts and ranges scan every record. Raw rows preserve source strings. Datetime calculations have microsecond precision; precisionLossCount reports values that must stay as exact text instead of being silently rounded.'}
    columns={c['name']:dict(c) for c in profile['columns']}
    if request.get('action') in ['preview_derive','save_derived']:
        return derive(db,request,columns)
    transforms=request.get('transforms',[])
    if transforms:
        additions=[]
        for t in transforms:
            if t['column'] not in columns or t['name'] in columns: raise ValueError('Derived columns require an existing input and a unique name.')
            q=ident(t['column']);op=t['op'];kind='text';value=literal(t.get('value',''))
            if op in ['trim','lower','upper']:expr=f'{op}({q})'
            elif op=='number':expr=f'TRY_CAST({q} AS DOUBLE)';kind='number'
            elif op=='scale':
                if not is_number(t.get('value','')): raise ValueError('Scale requires a finite multiplier.')
                expr=f'TRY_CAST({q} AS DOUBLE)*CAST({value} AS DOUBLE)';kind='number'
            elif op=='datetime':
                require_datetime_precision(db,'interpreted_source',q,t['column'],t.get('value',''))
                expr=f'try_strptime({q},{value})';kind='datetime'
            elif op=='fill':expr=f'coalesce(nullif({q},\'\'),{value})'
            elif op in ('time_of_day','date'):
                try:db.execute("SELECT timezone(?, TIMESTAMPTZ '2024-01-01 00:00:00+00')",[t.get('value','')])
                except Exception:raise ValueError('Use an IANA time zone, for example America/New_York.') from None
                moment=f'TRY_CAST(NULLIF(trim({q}),\'\') AS TIMESTAMPTZ)'
                expr=f"strftime(timezone({value}, {moment}), '{'%H:%M' if op=='time_of_day' else '%Y-%m-%d'}')"
            elif op=='extract':
                try:db.execute("SELECT regexp_extract('', ?, 1)",[t.get('value','')])
                except Exception:raise ValueError('Extract needs a valid pattern with one capture group.') from None
                expr=f"NULLIF(regexp_extract({q}, {value}, 1), '')"
            else:raise ValueError('Unknown transformation.')
            if t['column'] not in names: raise ValueError('Use an original interpreted column for each derived column.')
            additions.append(f'CAST({expr} AS VARCHAR) AS '+ident(t['name']))
            columns[t['name']]={'name':t['name'],'type':kind,'derived':t}
        db.execute('CREATE OR REPLACE VIEW source AS SELECT *, '+','.join(additions)+' FROM interpreted_source');names=list(columns)
    # Inferred datetimes remain inspectable as exact source strings. Only an
    # operation that actually types a timestamp may reject its precision.
    typed_fields=[];datetime_operands=[]
    for condition in request.get('filters',[]):
        if condition['op'] not in ['missing','contains']:
            typed_fields.append(condition['column']);datetime_operands.append(condition)
    for rule in request.get('checks',[]):
        if rule['kind']=='duplicate':typed_fields.extend(rule['columns'])
        elif rule['kind']=='compare':
            typed_fields.extend([rule['column']]+([rule['otherColumn']] if 'otherColumn' in rule else []));datetime_operands.append(rule)
        elif rule['kind']=='change':typed_fields.extend([rule['orderBy'],*rule['partitionBy'],*rule.get('tieBreakers',[])])
    typed_fields.extend(n for n in [request.get('sort'),request.get('x')] if n)
    grouping=request.get('summarize') or {}
    typed_fields.extend(n for n in [k.get('column') for k in grouping.get('groupBy') or []]+[v for m in grouping.get('measures') or [] for v in (m.get('column'),m.get('orderBy'))] if n and n in columns)
    for condition in grouping.get('filters') or []:
        if condition['op'] not in ['missing','contains']:typed_fields.append(condition['column']);datetime_operands.append(condition)
    for name in set(typed_fields):
        if columns.get(name,{}).get('type')=='datetime' and not columns[name].get('derived'):guard_datetime_source(name,configured.get(name))
    for operand in datetime_operands:
        if columns.get(operand['column'],{}).get('type')=='datetime' and 'value' in operand:require_datetime_precision(db,'(SELECT 1)',literal(operand['value']),'comparison value')
    def column(name):
        if name not in columns or name not in names:raise ValueError('Unknown column.')
        return ident(name)
    where,params=filter_sql(request.get('filters',[]),columns)
    if request.get('action')=='validate':
        try:return validate(db,request,columns,where,params)
        except duckdb.OutOfMemoryException:
            can_partition=all(r['kind']=='duplicate' or (r['kind']=='change' and r['partitionBy']) for r in request['checks'])
            if can_partition:
                try:return validate_partitioned(db,request,columns,where,params)
                except duckdb.OutOfMemoryException:
                    if not release_source_cache(db):raise
                    return validate_partitioned(db,request,columns,where,params)
            if not release_source_cache(db):raise
            # Retry the identical complete relation, not independent row chunks:
            # duplicate groups and ordered neighbors must keep their boundaries.
            return validate(db,request,columns,where,params)
    count=db.execute('SELECT count(*) FROM source'+where,params).fetchone()[0]
    limit=max(1,min(200,int(request.get('limit',100))));offset=max(0,min(10000000,int(request.get('offset',0))))
    selected=request.get('columns') or names
    select=','.join(column(n) for n in selected[:128]);order=''
    if request.get('sort'):
        n=request['sort'];q=column(n);kind=columns[n]['type']
        q=f'TRY_CAST({q} AS DOUBLE)' if kind=='number' else f'TRY_CAST({q} AS TIMESTAMPTZ)' if kind=='datetime' else q
        order=' ORDER BY '+q+(' DESC' if request.get('descending') else ' ASC')+' NULLS LAST'
    rows=db.execute('SELECT '+select+' FROM source'+where+order+' LIMIT ? OFFSET ?',params+[limit,offset]).fetchall()
    mixed=[]
    # Group warnings inform charts. Paging a table must not build an unrelated
    # distinct-value hash for every text identifier in the complete dataset.
    mixed_assessed=bool(request.get('x') and request.get('y')) or any(block.get('type')=='chart' for section in (request.get('layout') or {}).get('sections',[]) for block in section.get('blocks',[]))
    if mixed_assessed:
        for name in names:
            if columns[name]['type']=='text':
                n=db.execute(f'SELECT count(DISTINCT {ident(name)}) FROM source'+where,params).fetchone()[0]
                if 1<n<=50:mixed.append({'column':name,'groups':n})
    result={'kind':'query','total':count,'offset':offset,'limit':limit,'columns':selected,'rows':rows,'mixedGroups':mixed,'mixedGroupsAssessed':mixed_assessed,'recipe':{k:v for k,v in request.items() if k not in ['path','profile','jobId','configuration','reader','summaryMetrics','validatedBaseDatetime']}}
    if grouping:result['grouped']=summarize(db,grouping,columns,where,params)
    metrics=request.get('summaryMetrics',[])
    if metrics:
        expressions=[]
        for metric in metrics:
            op=metric['op']
            if op=='rows': expressions.append('count(*)'); continue
            q=column(metric['column'])
            if op not in ['count','min','max','mean','sum']: raise ValueError('Unsupported summary operation.')
            if op!='count' and columns[metric['column']]['type']!='number': raise ValueError('Summary calculations need a numeric column.')
            value=f'TRY_CAST({q} AS DOUBLE)' if columns[metric['column']]['type']=='number' else f"NULLIF({q},'')"
            expressions.append(f'{"avg" if op=="mean" else op}({value})')
        values=db.execute('SELECT '+','.join(expressions)+' FROM source'+where,params).fetchone()
        result['summaries']=[{**metric,'value':values[i],'scope':'all matching rows'} for i,metric in enumerate(metrics)]
    if request.get('x') and request.get('y') and count:
        xn,yn=request['x'],request['y'];x,y=column(xn),column(yn)
        if columns[yn]['type']!='number':raise ValueError('Choose a numeric measure.')
        kind=columns[xn]['type'];y=f'TRY_CAST({y} AS DOUBLE)';agg=request.get('aggregate','mean')
        if agg not in ['mean','sum','min','max','count']:raise ValueError('Unsupported aggregation.')
        chart_type=request.get('chartType','auto')
        if chart_type not in ['auto','line','bar','scatter']:raise ValueError('Unsupported chart type.')
        if chart_type=='auto':chart_type='bar' if kind=='text' else 'line'
        if chart_type in ['line','scatter'] and kind=='text':raise ValueError('Line and scatter charts require a numeric or datetime x column.')
        sn=request.get('series');series=column(sn) if sn else None
        if series:
            groups=db.execute(f'SELECT count(DISTINCT {series}) FROM source'+where,params).fetchone()[0]
            if groups>20:raise ValueError('Charts support up to 20 series. Filter to fewer groups.')
        suffix=','+series if series else '';group_suffix=','+series if series else ''
        measure=f'{"avg" if agg=="mean" else agg}({y})'
        chart={'type':chart_type,'x':xn,'y':yn,'series':sn,'temporal':kind=='datetime','interpretation':{'x':columns[xn],'y':columns[yn]},'pointFields':['intervalStart' if chart_type=='line' else 'x','value','count','min','max']+(['series'] if sn else [])}
        xx=f'epoch(TRY_CAST({x} AS TIMESTAMPTZ))' if kind=='datetime' else f'TRY_CAST({x} AS DOUBLE)'
        if chart_type=='scatter':
            conjunction=' AND ' if where else ' WHERE '
            points=db.execute(f'SELECT {xx},{y},1,{y},{y}{suffix} FROM source'+where+conjunction+f'{xx} IS NOT NULL AND {y} IS NOT NULL'+order+' LIMIT 1000',params).fetchall()
            chart.update(points=points,sampled=True,note='Up to 1,000 individual matching records in table order; values use the saved interpretation. This is a bounded sample, not an aggregate.')
        elif chart_type=='bar':
            points=db.execute(f'SELECT {x},{measure},count({y}),min({y}),max({y}){suffix} FROM source'+where+f' GROUP BY {x}{group_suffix} ORDER BY count(*) DESC LIMIT 300',params).fetchall()
            chart.update(points=points,note=agg.title()+' by category'+(' and '+sn if sn else '')+' · up to 300 category/series combinations · all matching records in each shown group')
        else:
            lo,hi=db.execute(f'SELECT min({xx}),max({xx}) FROM source'+where,params).fetchone()
            if lo is not None and hi is not None:
                width=max((hi-lo)/300,0.000001);bucket=f'least(299,floor(({xx}-?)/?))'
                points=db.execute(f'SELECT {bucket} AS b,{measure},count({y}),min({y}),max({y}){suffix} FROM source'+where+' GROUP BY b'+group_suffix+' HAVING b IS NOT NULL ORDER BY b'+group_suffix,[lo,width]+params).fetchall()
                chart.update(points=[[lo+r[0]*width,*r[1:]] for r in points],intervalWidth=width,range=[lo,hi],note=agg.title()+' per interval'+(' and '+sn if sn else '')+' · up to 300 intervals · all matching records'+(' · UTC' if kind=='datetime' else ''))
        if 'points' in chart:result['chart']=chart
    return result

def is_number(value):
    try:return math.isfinite(float(value))
    except (ValueError,TypeError):return False

def clean(value):
    if isinstance(value,float) and not math.isfinite(value):return None
    if isinstance(value,dict):return {k:clean(v) for k,v in value.items()}
    if isinstance(value,(list,tuple)):return [clean(v) for v in value]
    return value

def run(request):
    try:return json.dumps(clean(explore(request)),default=str,allow_nan=False)
    except Exception as exc:
        # User-facing validation errors do not contain local paths or SQL text.
        message=str(exc) if isinstance(exc,ValueError) else ('This operation exceeded the in-memory data limit. No disk spill was used.' if isinstance(exc,duckdb.OutOfMemoryException) else 'Data query failed. Check reader settings and typed values.')
        return json.dumps({'error':message,'errorType':type(exc).__name__})

def write_protocol(result):
    # Redirected Windows text streams use a legacy code page by default.
    # The Node<->worker wire is always strict UTF-8, independently of locale.
    sys.stdout.buffer.write(result.encode('utf-8',errors='strict')+b'\n')
    sys.stdout.buffer.flush()

if __name__=='__main__':
    if '--serve' in sys.argv:
        for line in sys.stdin.buffer:
            try:write_protocol(run(json.loads(line.decode('utf-8',errors='strict'))))
            except Exception:write_protocol(json.dumps({'error':'Invalid data request.'}))
    else:
        result=run(json.loads(sys.stdin.buffer.read().decode('utf-8',errors='strict')))
        write_protocol(result);sys.exit(1 if 'error' in json.loads(result) else 0)
