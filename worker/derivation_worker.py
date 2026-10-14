"""Explicit recipes over source views; only save writes a new caller-owned output."""
import csv
import gzip
import io
import math
import os
import re
import json
import hashlib
from validation_worker import ident, typed, valid, filter_sql

MAX_OUTPUT_BYTES = 2 * 1024 * 1024 * 1024

def bounded_sample(names, rows, total):
    import json
    kept=[]; used=len(json.dumps(names).encode())
    for row in rows:
        size=len(json.dumps(row,default=str).encode())
        if used+size>131072: break
        kept.append(row); used+=size
    return {'columns':names,'rows':kept,'total':total,'omittedExampleRows':len(rows)-len(kept)}

def literal(value):
    return "'" + str(value).replace("'", "''") + "'"

def datetime_fraction_patterns(fmt):
    """Locate actual %n fields, including formats with adjacent numeric tokens.

    All other directives are noncapturing. The same format must also parse
    successfully before a fraction is considered precision loss.
    """
    directives = {'Y': r'[+-]?[0-9]{1,4}', 'G': r'[+-]?[0-9]{1,4}',
                  **{t: r'[0-9]{1,2}' for t in ['y','m','d','H','I','M','S','U','W','V']},
                  **{t: r'[0-9]' for t in ['u','w']}, 'j': r'[0-9]{1,3}',
                  'f': r'[0-9]{1,6}', 'g': r'[0-9]{1,3}',
                  **{t: r'[A-Za-z]+' for t in ['a','A','b','B','h','p']},
                  'z': r'(?:Z|[+-][0-9]{2}(?::?[0-9]{2})?(?::?[0-9]{2})?)',
                  'Z': r'[A-Za-z0-9_+./-]+'}
    composites = {'c':'%Y-%m-%d %H:%M:%S', 'x':'%Y-%m-%d', 'X':'%H:%M:%S', 'T':'%H:%M:%S'}
    parts=[];fractions=0;i=0
    while i<len(fmt):
        if fmt[i]!='%':
            if fmt[i].isspace():
                while i+1<len(fmt) and fmt[i+1].isspace():i+=1
                parts.append(r'\s*')
            else:parts.append(re.escape(fmt[i]))
            i+=1;continue
        i+=1
        if i<len(fmt) and fmt[i]=='-':i+=1
        if i>=len(fmt):raise ValueError('Incomplete datetime format.')
        directive=fmt[i];i+=1
        if directive=='%':parts.append('%')
        elif directive=='n':parts.append('([0-9]{1,9})');fractions+=1
        elif directive in composites:
            expanded,_=datetime_fraction_patterns(composites[directive]);parts.append(expanded[4:-4])
        elif directive in directives:parts.append(directives[directive])
        else:raise ValueError('Cannot verify datetime precision for format directive %'+directive+'. Keep exact timestamps as text.')
    return r'^\s*'+''.join(parts)+r'\s*$',fractions

def datetime_loss_predicate(value, fmt=None, parsed=None):
    """TIMESTAMPTZ has microsecond precision; test source digits before casting."""
    parsed=parsed or (f'try_strptime({value},{literal(fmt)})' if fmt else f'TRY_CAST({value} AS TIMESTAMPTZ)')
    if fmt:
        pattern,fields=datetime_fraction_patterns(fmt)
        if not fields:return 'FALSE'
        # Failed extraction for an otherwise valid %n format cannot establish
        # exactness. Refuse it rather than making an unverified conversion.
        fractions=[f'regexp_extract({value},{literal(pattern)},{i})' for i in range(1,fields+1)]
        loss=' OR '.join(f"({f}='' OR regexp_matches(substr({f},7),'[1-9]'))" for f in fractions)
    else:
        fraction=f"regexp_extract({value},'[0-9]+:[0-9]+:[0-9]+[.,]([0-9]+)',1)"
        loss=f"regexp_matches(substr({fraction},7),'[1-9]')"
    # Parsing/timezone conversion is only relevant when nonzero fractional
    # digits could actually be lost. CASE avoids expensive eager conversions
    # for representable timestamps while still ignoring invalid date strings.
    return f'(CASE WHEN ({loss}) THEN {parsed} IS NOT NULL ELSE FALSE END)'

def datetime_precision_error(label,count):
    return ValueError(f'Datetime {label!r} has {count} value(s) with nonzero submicrosecond precision that would be lost. Keep exact timestamps as text; use an explicitly justified separate coarse-time column only when the intended analysis permits it. No datetime conversion or typed result was produced.')

def require_datetime_precision(db, relation, value, label, fmt=None, parsed=None):
    count=db.execute(f'SELECT count(*) FROM {relation} WHERE '+datetime_loss_predicate(value,fmt,parsed)).fetchone()[0]
    if count:raise datetime_precision_error(label,count)

def require_ordered_text_is_not_numeric(db,relation,columns,condition):
    """Text sorts character by character, so '10.5' < '9.0'. Refuse ordering filters on
    number-like text rather than silently keeping the wrong rows. ISO dates sort correctly."""
    if condition['op'] not in ('lt','lte','gt','gte') or columns.get(condition['column'],{}).get('type')!='text':return
    def numeric_column(name):
        q=ident(name)
        return db.execute(f"SELECT coalesce(bool_or(TRY_CAST({q} AS DOUBLE) IS NOT NULL),false) FROM (SELECT {q} FROM {relation} WHERE {q} IS NOT NULL AND {q}<>'' LIMIT 1000)").fetchone()[0]
    def numeric_value(value):
        try:return math.isfinite(float(value))
        except (TypeError,ValueError):return False
    other=condition.get('otherColumn')
    if numeric_column(condition['column']) and (numeric_column(other) if other else numeric_value(condition.get('value'))):
        names=condition['column']+(' and '+other if other else '')
        raise ValueError(f'{names} hold numbers stored as text, so "{condition["op"]}" would compare them as text ("10.5" sorts before "9.0") and keep the wrong rows. To keep the original text values, add transform steps with method "number" into new columns (name), filter on those, then drop them with a select step; or use basis "interpreted".')

def derive(db, request, columns):
    recipe = request['recipe']
    relation = 'source'
    # On the raw basis every value stays original text; 'origin' marks columns whose text is still
    # the source column's, byte for byte (a transform replaces the dict, so it drops the mark).
    columns = {n: {**c, **({'type': 'text', 'origin': n} if recipe['basis'] == 'raw' else {})} for n, c in columns.items()}
    before_names = list(columns)
    before_count = db.execute('SELECT count(*) FROM source').fetchone()[0]
    before_rows = db.execute('SELECT * FROM source LIMIT 20').fetchall()
    effects = []
    row_count = before_count
    views = []
    try:
        for index, step in enumerate(recipe['steps']):
            names = list(columns)
            def require(name):
                if name not in columns:
                    raise ValueError('Unknown recipe column: ' + name)
                return ident(name)
            op = step['op']
            query = 'SELECT * FROM ' + relation
            query_params = []
            effect = {'index': index, 'op': op, 'inputRows': row_count}
            if op in ('filter', 'exclude', 'flag'):
                for condition in step['filters']:
                    if columns.get(condition['column'],{}).get('type')=='datetime' and condition['op'] not in ['missing','contains']:
                        require_datetime_precision(db,'(SELECT 1)',literal(condition.get('value','')),'filter value')
                    require_ordered_text_is_not_numeric(db,relation,columns,condition)
                where, params = filter_sql(step['filters'], columns)
                condition_sql = 'coalesce((' + where[len(' WHERE '):] + '), false)'
                if op == 'flag':
                    # Flag keeps every row and records whether all conditions match; a missing operand never matches.
                    if step['name'] in columns: raise ValueError('A flag column must have a new, unique name.')
                    query = 'SELECT *, CASE WHEN ' + condition_sql + " THEN 'true' ELSE 'false' END AS " + ident(step['name']) + ' FROM ' + relation
                    columns[step['name']] = {'name': step['name'], 'type': 'text'}
                else:
                    # Exclude removes rows matching every condition; a missing operand never matches.
                    query += where if op == 'filter' else ' WHERE NOT ' + condition_sql
                query_params = params
            elif op == 'drop_missing':
                selected = step['columns']
                if len(set(selected)) != len(selected):
                    raise ValueError('Missing-value columns must be unique.')
                predicates = [f'({require(n)} IS NULL OR {require(n)}=\'\')' for n in selected]
                joiner = ' OR ' if step.get('mode', 'any') == 'any' else ' AND '
                query += ' WHERE NOT (' + joiner.join(predicates) + ')'
            elif op == 'transform':
                name = step['column']; q = require(name)
                output = step.get('name', name)
                if output != name and output in columns:
                    raise ValueError('A new transformation column must have a unique name.')
                method = step['method']; argument = step.get('value', '')
                kind = columns[name]['type']; expr = q
                numeric = f'TRY_CAST(NULLIF(trim({q}),\'\') AS DOUBLE)'
                if method in ['trim', 'lower', 'upper']:
                    expr = f'{method}({q})'; kind = 'text'
                elif method == 'fill':
                    expr = f'coalesce(nullif({q},\'\'),{literal(argument)})'; kind = 'text'
                elif method == 'replace':
                    expr = f'CASE WHEN {q}={literal(argument)} THEN {literal(step["replacement"])} ELSE {q} END'; kind = 'text'
                elif method in ['number', 'scale']:
                    expr = numeric; kind = 'number'
                    if method == 'scale':
                        try: factor = float(argument)
                        except (ValueError, TypeError): raise ValueError('Scale needs a finite numeric factor.') from None
                        if not math.isfinite(factor): raise ValueError('Scale needs a finite numeric factor.')
                        expr = f'({numeric}*{factor!r})'
                    expr = f'CASE WHEN isfinite({expr}) THEN {expr} END'
                elif method == 'time_of_day':
                    # Local wall-clock time (HH:MM) in an IANA zone, so session rules follow daylight saving.
                    try: db.execute("SELECT timezone(?, TIMESTAMPTZ '2024-01-01 00:00:00+00')", [argument])
                    except Exception: raise ValueError('Use an IANA time zone, for example America/New_York.') from None
                    moment = q if kind == 'datetime' else f'TRY_CAST(NULLIF(trim({q}),\'\') AS TIMESTAMPTZ)'
                    expr = f"strftime(timezone({literal(argument)}, {moment}), '%H:%M')"; kind = 'text'
                elif method == 'date':
                    # Local calendar date (YYYY-MM-DD) in an IANA zone: the trading day a timestamp belongs to.
                    try: db.execute("SELECT timezone(?, TIMESTAMPTZ '2024-01-01 00:00:00+00')", [argument])
                    except Exception: raise ValueError('Use an IANA time zone, for example America/New_York.') from None
                    moment = q if kind == 'datetime' else f'TRY_CAST(NULLIF(trim({q}),\'\') AS TIMESTAMPTZ)'
                    expr = f"strftime(timezone({literal(argument)}, {moment}), '%Y-%m-%d')"; kind = 'text'
                elif method == 'extract':
                    # The first capture group of a pattern (RE2: linear time, no backtracking).
                    try: groups = db.execute("SELECT regexp_extract('', ?, 1)", [argument]).fetchone()
                    except Exception: raise ValueError('Extract needs a valid pattern with one capture group, for example ^(\\S+) or (\\d{8})$.') from None
                    expr = f"NULLIF(regexp_extract({q}, {literal(argument)}, 1), '')"; kind = 'text'
                elif method == 'datetime':
                    try: db.execute("SELECT try_strptime('', ?)", [argument])
                    except Exception: raise ValueError('Use a valid strptime date format, for example %Y-%m-%d.') from None
                    require_datetime_precision(db,relation,q,name,argument)
                    expr = f'CAST(try_strptime({q},{literal(argument)}) AS TIMESTAMPTZ)'; kind = 'datetime'
                else: raise ValueError('Unknown transformation.')
                expr = f'CAST({expr} AS VARCHAR)'
                changed, invalid = db.execute(f'SELECT count(*) FILTER (WHERE {q} IS DISTINCT FROM {expr}), count(*) FILTER (WHERE NULLIF(trim({q}),\'\') IS NOT NULL AND {expr} IS NULL) FROM {relation}').fetchone()
                effect.update(changedRows=changed, invalidValues=invalid)
                if invalid and step.get('onInvalid', 'error') != 'null':
                    raise ValueError(f'Step {index + 1} cannot convert {invalid} nonempty values. Review the input or explicitly set onInvalid to null. Nothing was saved.')
                output_names = names if output == name else names + [output]
                query = 'SELECT ' + ','.join((expr + ' AS ' + ident(n)) if n == output else ident(n) for n in output_names) + ' FROM ' + relation
                # Filling blanks, replacing an exact value or trimming in place keeps the column's text
                # comparable with the source, so the source interpretation still applies to it.
                kept = columns[name].get('origin') if output == name and method in ('fill', 'replace', 'trim') else None
                columns[output] = {'name': output, 'type': kind, **({'origin': kept} if kept else {})}
            elif op == 'lookup':
                # Values from a grouped summary of another connected file, prepared by the service and
                # joined on exact keys. Row order and count never change; unmatched rows are an error
                # unless onMissing is null.
                table = (request.get('lookups') or {}).get(str(index))
                if not table: raise ValueError(f'Step {index + 1}: the lookup data was not prepared.')
                names_t = [f['name'] for f in table['fields']]; types_t = {f['name']: f.get('type') for f in table['fields']}
                rows_t = [[None if v is None else (repr(v) if isinstance(v, float) else str(v)) for v in r] for r in table['rows']]
                # Loaded once per worker (one JSON parse) and kept while the worker lives: a collection
                # run joins the same table into thousands of files.
                key = hashlib.sha256(json.dumps([names_t, rows_t]).encode()).hexdigest()[:24]
                tname = '__bench_lookup_' + key
                if not db.execute('SELECT 1 FROM duckdb_tables() WHERE table_name = ? LIMIT 1', [tname]).fetchone():
                    db.execute('CREATE TEMP TABLE ' + tname + ' AS SELECT ' + ','.join(f'r[{i + 1}] AS {ident(n)}' for i, n in enumerate(names_t)) + ' FROM (SELECT unnest(from_json(?, \'[["VARCHAR"]]\')) AS r)', [json.dumps(rows_t)])
                match = step['match']; outs = [(f['field'], f.get('as') or f['field']) for f in step['fields']]
                for m in match:
                    require(m['column'])
                    if m['field'] not in names_t: raise ValueError(f"Lookup field {m['field']} is not in the lookup data ({', '.join(names_t)}).")
                for field, out in outs:
                    if field not in names_t: raise ValueError(f"Lookup field {field} is not in the lookup data ({', '.join(names_t)}).")
                    if out in columns: raise ValueError(f'Lookup output {out} must be a new column name.')
                keys = ','.join('l.' + ident(m['field']) for m in match)
                if db.execute(f'SELECT 1 FROM {tname} l GROUP BY {keys} HAVING count(*) > 1 LIMIT 1').fetchone():
                    raise ValueError(f'Step {index + 1}: the lookup data has repeated keys; group it by exactly the matched fields.')
                on = ' AND '.join(f'CAST(s.{ident(m["column"])} AS VARCHAR) = l.{ident(m["field"])}' for m in match)
                joined = f'(SELECT row_number() OVER () AS __bench_rn, * FROM {relation}) s LEFT JOIN {tname} l ON {on}'
                unmatched = db.execute(f'SELECT count(*) FROM {joined} WHERE l.{ident(match[0]["field"])} IS NULL').fetchone()[0]
                effect.update(lookupRows=len(rows_t), unmatchedRows=unmatched, lookupSource=table.get('source'))
                if unmatched and step.get('onMissing', 'error') != 'null':
                    raise ValueError(f'Step {index + 1}: {unmatched} rows have no match in the lookup data. Check the matched keys, or set onMissing to null.')
                query = 'SELECT s.* EXCLUDE (__bench_rn), ' + ','.join(f'l.{ident(f)} AS {ident(o)}' for f, o in outs) + f' FROM {joined} ORDER BY s.__bench_rn'
                for field, out in outs: columns[out] = {'name': out, 'type': 'number' if types_t.get(field) == 'quantitative' else 'text'}
            elif op == 'select':
                selected = step['columns']; new_columns = {}
                items = []
                for c in selected:
                    q = require(c['column']); name = c.get('name', c['column'])
                    if name in new_columns: raise ValueError('Output column names must be unique.')
                    items.append(q + ' AS ' + ident(name))
                    new_columns[name] = {**columns[c['column']], 'name': name}
                columns = new_columns
                query = 'SELECT ' + ','.join(items) + ' FROM ' + relation
            elif op == 'deduplicate':
                keep = step.get('keep', 'unique')
                # Number the rows in their current order first, so that the rows kept stay in that order
                # (SELECT DISTINCT and a window partition both return rows in hash order).
                rn = '__bench_rn'
                while rn in columns: rn += '_'
                numbered = '(SELECT *, row_number() OVER () AS ' + rn + ' FROM ' + relation + ')'
                if keep == 'unique':
                    # The first of each set of identical rows; NULLs compare equal, as in SELECT DISTINCT.
                    query = 'SELECT * EXCLUDE (' + rn + ') FROM (SELECT * EXCLUDE (' + rn + '), min(' + rn + ') AS ' + rn + ' FROM ' + numbered + ' GROUP BY ALL) ORDER BY ' + rn
                else:
                    keys = step.get('columns', []); ordering = step.get('orderBy', [])
                    if not keys or not ordering: raise ValueError('Choose key columns and explicit ordering for first/last deduplication.')
                    if len(set(keys)) != len(keys) or len({o['column'] for o in ordering}) != len(ordering):
                        raise ValueError('Key and order column lists must not repeat columns.')
                    key_exprs = [require(n) for n in keys]
                    order_exprs = [typed(o['column'], columns) for o in ordering]
                    eligible = ' AND '.join([f'NULLIF({q},\'\') IS NOT NULL' for q in key_exprs] + [valid(e, columns[o['column']]['type']) for e, o in zip(order_exprs, ordering)])
                    if db.execute(f'SELECT 1 FROM {relation} WHERE NOT ({eligible}) LIMIT 1').fetchone():
                        raise ValueError('Deduplication has missing/invalid key or order values. Handle them explicitly before selecting first/last.')
                    for o, expr in zip(ordering, order_exprs):
                        if columns[o['column']]['type'] == 'number' and db.execute(f'SELECT 1 FROM {relation} WHERE abs({expr})>=9007199254740992 LIMIT 1').fetchone():
                            raise ValueError('Numeric ordering reaches 2^53. Preserve exact identifiers as text or use smaller physical units.')
                    if db.execute(f'SELECT 1 FROM {relation} GROUP BY '+','.join(key_exprs+order_exprs)+' HAVING count(*)>1 LIMIT 1').fetchone():
                        raise ValueError('Deduplication order is ambiguous within a key. Add a tie-breaker order column.')
                    order_sql = ','.join(e + (' DESC' if bool(o.get('descending')) != (keep == 'last') else ' ASC') for e, o in zip(order_exprs, ordering))
                    query = 'SELECT * EXCLUDE (' + rn + ') FROM ' + numbered + ' QUALIFY row_number() OVER (PARTITION BY ' + ','.join(key_exprs) + ' ORDER BY ' + order_sql + ')=1 ORDER BY ' + rn
            else: raise ValueError('Unknown recipe operation.')
            if len(columns) > 128: raise ValueError('A derived dataset supports up to 128 columns.')
            view = '__bench_derived_step_' + str(index)
            if query_params:
                db.sql(query, params=query_params).create_view(view, replace=True)
            else:
                db.execute('CREATE OR REPLACE TEMP VIEW ' + view + ' AS ' + query)
            views.append(view); relation = view
            if op in ['filter', 'exclude', 'drop_missing', 'deduplicate']:
                row_count = db.execute('SELECT count(*) FROM ' + relation).fetchone()[0]
            effect['outputRows'] = row_count; effects.append(effect)
        sample = db.execute('SELECT * FROM ' + relation + ' LIMIT 20').fetchall()
        result = {'kind': 'derivation_preview', 'recipe': recipe,
                  'before': bounded_sample(before_names,before_rows,before_count),
                  'after': bounded_sample(list(columns),sample,row_count),
                  'outputColumns': [{'name': n, 'type': c['type'], **({'origin': c['origin']} if c.get('origin') else {})} for n, c in columns.items()],
                  'steps': effects,
                  'notes': ['Counts cover the complete dataset; examples are limited to 20 rows and 128 KiB per sample. Omitted example rows are counted; retained values are exact.',
                            'Raw basis preserves original source strings until an explicit transformation. Interpreted basis uses the saved configuration.',
                            'Filtering keeps matching rows; operations run in the displayed order. Exact duplicate removal compares all emitted columns; deduplication keeps rows in their source order.',
                            'Type conversion and scaling use floating point. Keep exact identifiers as text. Unzoned date formats are interpreted as UTC.',
                            'A derived dataset is not a quality verdict. Validate it for the intended use.']}
        if request['action'] == 'save_derived':
            path = request['outputPath']; written = 0
            try:
                # No model-supplied paths: parent creates a private staging directory.
                with open(path, 'xb') as raw:
                    os.chmod(path, 0o600)
                    # Level 6 (gzip's usual default) writes several times faster than 9 for a few percent more size.
                    with gzip.GzipFile(fileobj=raw, mode='wb', filename='', mtime=0, compresslevel=6) as zipped:
                        with io.TextIOWrapper(zipped, encoding='utf-8', newline='') as text:
                            writer = csv.writer(text); writer.writerow(list(columns))
                            cursor = db.execute('SELECT * FROM ' + relation)
                            while True:
                                batch = cursor.fetchmany(1024)
                                if not batch: break
                                writer.writerows(batch); written += len(batch)
                                if raw.tell() > MAX_OUTPUT_BYTES:
                                    raise ValueError('Derived output exceeds the 2 GiB limit. Narrow the explicit recipe.')
                if os.path.getsize(path) > MAX_OUTPUT_BYTES:
                    raise ValueError('Derived output exceeds the 2 GiB limit. Narrow the explicit recipe.')
                if written != row_count: raise ValueError('Derived row count changed while writing. Nothing was published.')
                result['writtenRows'] = written
            except Exception:
                if os.path.exists(path): os.unlink(path)
                raise
        return result
    finally:
        for view in reversed(views):
            db.execute('DROP VIEW IF EXISTS ' + view)
        pass
