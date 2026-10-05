"""Declarative read-only rules over the complete filtered relation."""
import math

SIGNS={'eq':'=','ne':'<>','lt':'<','lte':'<=','gt':'>','gte':'>='}

def ident(s): return '"'+s.replace('"','""')+'"'

def typed(name, columns):
    if name not in columns: raise ValueError('Unknown column: '+name)
    q=ident(name);kind=columns[name]['type']
    if kind=='number': return f'TRY_CAST({q} AS DOUBLE)'
    if kind=='datetime': return f'TRY_CAST({q} AS TIMESTAMPTZ)'
    return f"NULLIF({q},'')"

def valid(expr,kind):
    return f'({expr} IS NOT NULL'+(f' AND isfinite({expr})' if kind in ['number','datetime'] else '')+')'

def operand(rule,columns):
    kind=columns[rule['column']]['type']
    if 'otherColumn' in rule:
        other=rule['otherColumn']
        if other not in columns: raise ValueError('Unknown column: '+other)
        if columns[other]['type']!=kind: raise ValueError('Comparison columns must have matching types. Use a derived column to convert explicitly.')
        return typed(other,columns),[]
    value=rule.get('value')
    if value is None: raise ValueError('A comparison requires a value or otherColumn.')
    if kind=='number':
        try: number=float(value)
        except (TypeError,ValueError): raise ValueError('Numeric comparisons require a finite number.') from None
        if not math.isfinite(number): raise ValueError('Numeric comparisons require a finite number.')
        return 'CAST(? AS DOUBLE)',[number]
    if kind=='datetime': return 'CAST(? AS TIMESTAMPTZ)',[value]
    return '?',[value]

def filter_sql(filters,columns):
    clauses=[];params=[]
    for rule in filters:
        name=rule['column'];q=typed(name,columns);kind=columns[name]['type'];op=rule['op']
        if op=='missing': clauses.append(f"({ident(name)} IS NULL OR {ident(name)}='')");continue
        if op=='contains': clauses.append(f'contains(lower({ident(name)}),lower(?))');params.append(rule['value']);continue
        if op not in SIGNS: raise ValueError('Unsupported filter.')
        rhs,values=operand(rule,columns)
        # Numeric column comparisons explicitly exclude NaN and infinities.
        rhs_valid=valid(rhs,kind) if 'otherColumn' in rule else 'TRUE'
        clauses.append(f'({valid(q,kind)} AND {rhs_valid} AND {q} {SIGNS[op]} {rhs})');params.extend(values)
    return (' WHERE '+' AND '.join(clauses) if clauses else ''),params

def validate_partitioned(db,request,columns,where,params,partitions=4):
    """Exact memory fallback: equal keys/entities always stay in one shard.

    Hashes route rows only; the original typed keys still determine equality.
    This is deliberately not available for an unpartitioned change series.
    """
    results=[];report=None;limit=request.get('sampleLimit') or 20
    for rule in request['checks']:
        if rule['kind']=='duplicate':keys=rule['columns']
        elif rule['kind']=='change' and rule['partitionBy']:keys=rule['partitionBy']
        else:raise ValueError('This check cannot be divided without changing its boundaries.')
        routing='hash('+','.join(typed(k,columns) for k in keys)+f') % {partitions}'
        checks=[];total=0
        for shard in range(partitions):
            clause=where+(' AND ' if where else ' WHERE ')+f'({routing}={shard})'
            result=validate(db,{**request,'checks':[rule]},columns,clause,params)
            report=result;total+=result['scopedRows'];checks.append(result['checks'][0])
        combined={**checks[0],'evaluated':sum(c['evaluated'] for c in checks),'skipped':sum(c['skipped'] for c in checks),'violations':sum(c['violations'] for c in checks),'skipReasons':{}}
        for check in checks:
            for reason,count in check['skipReasons'].items():combined['skipReasons'][reason]=combined['skipReasons'].get(reason,0)+count
        rows=[row for c in checks for row in c['sample']['rows']]
        sample=checks[0]['sample']
        if rows and rule['kind']=='change':
            # Reapply the original typed sample ordering to bounded shard samples.
            # SQL casts handle the full datetime range without Python coercion.
            ordered=[(k,columns[k]['type']) for k in rule['partitionBy']]+[(sample['evidenceFields']['currentOrder'],columns[rule['orderBy']]['type'])]+[(k,columns[k]['type']) for k in rule.get('tieBreakers',[])]
            names=['k'+str(i) for i in range(len(ordered))]
            projection={n:{'type':kind} for n,(_,kind) in zip(names,ordered)}
            slots='('+','.join('?' for _ in range(len(names)+1))+')'
            args=[]
            for i,row in enumerate(rows):args.extend([i]+[str(row[sample['columns'].index(k)]) for k,_ in ordered])
            sql='SELECT i FROM (VALUES '+','.join(slots for _ in rows)+') AS evidence(i,'+','.join(names)+') ORDER BY '+','.join(typed(n,projection) for n in names)+' LIMIT ?'
            indices=db.execute(sql,args+[limit]).fetchall();rows=[rows[i] for (i,) in indices]
        else:rows=rows[:limit]
        combined['sample']={**sample,'rows':rows,'truncated':combined['violations']>len(rows)}
        results.append(combined)
    return {**report,'scopedRows':total,'checks':results,'execution':{'strategy':'typed-key hash partitions','partitions':partitions,'exact':True,'boundary':'Duplicate keys or complete change entities remain together; hashes are never used as equality tests.'}}

def validate(db,request,columns,where,params):
    # A parallel hash aggregate may hold multiple native key tables that are
    # not fully charged to DuckDB's buffer-manager limit. Keep the complete
    # validation relation within one aggregation pipeline; other operations
    # retain the connection's original concurrency.
    threads=db.execute("SELECT current_setting('threads')").fetchone()[0]
    try:
        if threads!=1:db.execute('SET threads=1')
        return _validate(db,request,columns,where,params)
    finally:
        if threads!=1:db.execute('SET threads='+str(threads))

def _validate(db,request,columns,where,params):
    names=list(columns);limit=request.get('sampleLimit') or 20
    if not 1<=limit<=100: raise ValueError('Choose a sample limit from 1 to 100.')
    rules=request.get('checks') or []
    if not 1<=len(rules)<=20: raise ValueError('Choose from 1 to 20 checks.')
    prefix='__bench_validation_'
    while any(n.startswith(prefix) for n in names): prefix='_'+prefix
    a=lambda n: ident(prefix+n)
    scoped='WITH scoped AS NOT MATERIALIZED (SELECT * FROM source'+where+')'
    total=db.execute(scoped+' SELECT count(*) FROM scoped',params).fetchone()[0]
    results=[]
    checked_keys=set()
    def require_safe_keys(keys):
        pending=[]
        for key in keys:
            expression=typed(key,columns)
            if key in checked_keys or key in [k for k,_ in pending] or columns[key]['type']!='number':continue
            # >= is deliberate: DOUBLE may already have rounded 2^53+1 to 2^53.
            pending.append((key,f'bool_or({valid(expression,"number")} AND abs({expression})>=9007199254740992)'))
        if not pending:return
        unsafe=db.execute(scoped+' SELECT '+','.join(expression for _,expression in pending)+' FROM scoped',params).fetchone()
        for (key,_),is_unsafe in zip(pending,unsafe):
            if is_unsafe:raise ValueError('Numeric key '+repr(key)+' reaches the integer precision boundary (2^53). Preserve identifiers as text, or explicitly transform physical ordering values to a suitable datetime or smaller unit before validating. No duplicate or neighbor result was produced.')
            checked_keys.add(key)
    for rule in rules:
        name=rule.get('column');value=typed(name,columns) if name else None;kind=columns[name]['type'] if name else None
        extra=[];sample_names=names[:];evidence_fields={};rule_params=params[:]
        if rule['kind']=='duplicate':
            keys=rule['columns']
            if not keys or len(set(keys))!=len(keys): raise ValueError('Choose unique columns for a duplicate check.')
            require_safe_keys(keys)
            key_aliases=[a('key'+str(i)) for i in range(len(keys))]
            projected=','.join(typed(n,columns)+' AS '+key for n,key in zip(keys,key_aliases))
            good=' AND '.join(valid(key,columns[n]['type']) for n,key in zip(keys,key_aliases))
            # Counts need only one typed tuple and a count per complete key
            # group. Avoid joining every wide interpreted source row merely
            # to count violations or to maintain a tiny example heap.
            sql=scoped+', duplicate_keys AS (SELECT '+projected+' FROM scoped)'
            sql+=', duplicate_groups AS (SELECT '+','.join(key_aliases)+f', count(*) AS {a("count")} FROM duplicate_keys WHERE {good} GROUP BY '+','.join(key_aliases)+')'
            sample_fields=['v'+str(i) for i in range(len(keys))]
            sample_value='struct_pack('+','.join(field+' := '+key for field,key in zip(sample_fields,key_aliases))+')'
            sql+=f', counted AS (SELECT coalesce(sum({a("count")}),0) AS {a("evaluated")}, coalesce(sum({a("count")}) FILTER (WHERE {a("count")}>1),0) AS {a("violations")}, arg_min({sample_value},0,?) FILTER (WHERE {a("count")}>1) AS {a("samples")} FROM duplicate_groups)'
            # Convert only the bounded selected datetime keys to strings.
            # Native typed keys determine grouping and comparisons throughout.
            projected_sample='struct_pack('+','.join(field+' := '+(f'CAST(item.{field} AS VARCHAR)' if columns[n]['type']=='datetime' else 'item.'+field) for field,n in zip(sample_fields,keys))+')'
            evaluated,violations,samples=db.execute(sql+f' SELECT {a("evaluated")},{a("violations")},list_transform({a("samples")}, item -> {projected_sample}) FROM counted',params+[limit]).fetchone()
            rows=[]
            if samples:
                slots='('+','.join('?' for _ in keys)+')'
                args=[sample[field] for sample in samples for field in sample_fields]
                sample_columns={prefix+'key'+str(i):{'type':columns[n]['type']} for i,n in enumerate(keys)}
                matching=' AND '.join(typed(n,columns)+'='+typed(prefix+'key'+str(i),sample_columns) for i,n in enumerate(keys))
                recovery=scoped+' SELECT '+','.join(ident(n) for n in names)+' FROM scoped JOIN (VALUES '+','.join(slots for _ in samples)+') AS samples('+','.join(key_aliases)+') ON '+matching+' LIMIT ?'
                rows=[list(row) for row in db.execute(recovery,params+args+[limit]).fetchall()]
                if len(rows)<min(violations,limit):raise ValueError('Source records changed while recovering validation samples. Refresh the source and retry.')
            skipped=total-evaluated
            results.append({**rule,'evaluated':evaluated,'skipped':skipped,'violations':violations,'skipReasons':{'missing_invalid_or_nonfinite':skipped} if skipped else {},'sample':{'columns':names[:],'rows':rows,'evidenceFields':{},'truncated':violations>len(rows)}})
            continue
        elif rule['kind']=='missing':
            sql=scoped+f', assessed AS (SELECT *, TRUE AS {a("eligible")}, ({ident(name)} IS NULL OR {ident(name)}=\'\') AS {a("violation")}, NULL::VARCHAR AS {a("reason")} FROM scoped)'
        elif rule['kind']=='compare':
            rhs,values=operand(rule,columns)
            if rule['op'] not in SIGNS: raise ValueError('Unsupported comparison.')
            # Bind the operand once so casts and placeholders are consistent.
            sql=scoped+f', operands AS (SELECT *, {value} AS {a("left")}, {rhs} AS {a("right")} FROM scoped)'
            good=f'{valid(a("left"),kind)} AND {valid(a("right"),kind)}'
            sql+=f', assessed AS (SELECT *, ({good}) AS {a("eligible")}, ({a("left")} {SIGNS[rule["op"]]} {a("right")}) AS {a("violation")}, CASE WHEN NOT ({good}) THEN \'missing_invalid_or_nonfinite\' END AS {a("reason")} FROM operands)'
            rule_params+=values
        elif rule['kind']=='change':
            if kind!='number': raise ValueError('Change checks require a numeric measure. Convert it explicitly with a transform if needed.')
            if 'partitionBy' not in rule: raise ValueError('Choose partitionBy explicitly; use [] only for a single series.')
            order_name=rule['orderBy'];order=typed(order_name,columns);order_kind=columns[order_name]['type']
            if order_kind not in ['number','datetime']: raise ValueError('Change ordering requires a numeric or datetime column.')
            groups=rule['partitionBy'];ties=rule.get('tieBreakers',[])
            require_safe_keys([*groups,order_name,*ties])
            if len(set(groups))!=len(groups) or len(set([order_name,*ties]))!=len([order_name,*ties]): raise ValueError('Partition and ordering columns must not repeat.')
            gap=rule.get('maxGapSeconds')
            if gap is not None and order_kind!='datetime': raise ValueError('maxGapSeconds requires datetime ordering.')
            threshold=rule['threshold']
            if not math.isfinite(threshold) or threshold<0: raise ValueError('Threshold must be finite and nonnegative.')
            # Sort only typed keys and the measure. Carrying every interpreted
            # source string through the window makes wide files needlessly
            # exceed memory; complete sample rows are recovered after top-n.
            key_names=[*groups,order_name,*ties]
            key_aliases=[a('key'+str(i)) for i in range(len(key_names))]
            group_keys=key_aliases[:len(groups)];order_key=key_aliases[len(groups)];tie_keys=key_aliases[len(groups)+1:]
            projection=','.join(typed(n,columns)+' AS '+key for n,key in zip(key_names,key_aliases))
            good_order=' AND '.join(valid(key,columns[n]['type']) for n,key in zip(key_names,key_aliases))
            window=('PARTITION BY '+','.join(group_keys)+' ' if groups else '')+'ORDER BY '+','.join([order_key]+tie_keys)
            previous_ties=[a('previousTie'+str(i)) for i in range(len(ties))]
            lag_ties=''.join(f', lag({key}) OVER ({window}) AS {previous}' for key,previous in zip(tie_keys,previous_ties))
            sql=scoped+f', typed_keys AS (SELECT {projection}, {value} AS {a("currentValue")} FROM scoped)'
            sql+=f', sequenced AS (SELECT *, {order_key} AS {a("currentOrder")}, lag({a("currentValue")}) OVER ({window}) AS {a("previousValue")}, lag({order_key}) OVER ({window}) AS {a("previousOrder")}, row_number() OVER ({window}) AS {a("position")}{lag_ties} FROM typed_keys WHERE {good_order})'
            # Equal order/tie tuples are adjacent in this same window. Detect
            # ambiguity even on skipped measures, before returning any result.
            ambiguous=f'{a("position")}>1 AND {a("currentOrder")}={a("previousOrder")}'
            ambiguous+=''.join(f' AND {key}={previous}' for key,previous in zip(tie_keys,previous_ties))
            delta=f'abs({a("currentValue")}-{a("previousValue")})'
            if rule['mode']=='relative': delta+=f'/nullif(abs({a("previousValue")}),0)'
            elif rule['mode']!='absolute':raise ValueError('Unknown change mode.')
            gap_expr=f'epoch({a("currentOrder")})-epoch({a("previousOrder")})' if order_kind=='datetime' else 'NULL::DOUBLE'
            sql+=f', measured AS (SELECT *, {delta} AS {a("change")}, {gap_expr} AS {a("gapSeconds")} FROM sequenced)'
            reasons=[f'WHEN {a("position")}=1 THEN \'no_previous_row\'',f'WHEN NOT ({valid(a("currentValue"),"number")} AND {valid(a("previousValue"),"number")}) THEN \'missing_invalid_or_nonfinite\'']
            if rule['mode']=='relative':reasons.append(f'WHEN {a("previousValue")}=0 THEN \'zero_previous_value\'')
            if gap is not None:reasons.append(f'WHEN {a("gapSeconds")}>{float(gap)!r} THEN \'gap_exceeded\'')
            reasons.append(f'WHEN NOT {valid(a("change"),"number")} THEN \'nonfinite_change\'')
            sql+=f', reasoned AS (SELECT *, CASE '+ ' '.join(reasons)+f' END AS {a("reason")} FROM measured)'
            sql+=f', assessed AS (SELECT *, {a("reason")} IS NULL AS {a("eligible")}, {a("change")}>{float(threshold)!r} AS {a("violation")} FROM reasoned)'
            extra=['previousValue','currentValue','previousOrder','currentOrder','change','gapSeconds']
            evidence_fields={n:prefix+n for n in extra};sample_names += list(evidence_fields.values())
        else: raise ValueError('Unknown check kind.')
        if rule['kind']!='change':
            # A FILTER on arg_min still evaluates its full struct argument for
            # nonviolating rows. Count using only the actual predicate columns,
            # then interpret complete rows solely for bounded examples.
            groups=db.execute(sql+f' SELECT {a("reason")},count(*) FILTER (WHERE {a("eligible")}),count(*) FILTER (WHERE {a("eligible")} AND {a("violation")}),count(*) FILTER (WHERE NOT {a("eligible")}) FROM assessed GROUP BY {a("reason")}',rule_params).fetchall()
            evaluated=violations=0;reasons={}
            for reason,eligible_count,violation_count,skipped_count in groups:
                evaluated+=eligible_count;violations+=violation_count
                if skipped_count:reasons[reason]=skipped_count
            rows=[]
            if violations:
                rows=[list(row) for row in db.execute(sql+' SELECT '+','.join(ident(n) for n in names)+f' FROM assessed WHERE {a("eligible")} AND {a("violation")} LIMIT ?',rule_params+[limit]).fetchall()]
                if len(rows)!=min(violations,limit):raise ValueError('Source records changed while recovering validation samples. Refresh the source and retry.')
            results.append({**rule,'evaluated':evaluated,'skipped':total-evaluated,'violations':violations,'skipReasons':reasons,'sample':{'columns':sample_names,'rows':rows,'evidenceFields':{},'truncated':violations>len(rows)}})
            continue
        selected=[ident(n) for n in names]
        if rule['kind']=='change':
            # Datetimes stay SQL strings at the Python boundary, including the
            # complete DuckDB range outside Python datetime's supported years.
            selected=[f'CAST({key} AS VARCHAR)' if columns[n]['type']=='datetime' else key for n,key in zip(key_names,key_aliases)]
        selected += [f'CAST({a(n)} AS VARCHAR)' if n in ['previousOrder','currentOrder'] else a(n) for n in extra]
        sample_fields=['v'+str(i) for i in range(len(selected))]
        sample_value='struct_pack('+','.join(field+' := '+expression for field,expression in zip(sample_fields,selected))+')'
        # arg_min(..., n) keeps a bounded top-n heap, unlike list(...)[1:n],
        # which would retain every violation. Combine counts, skip reasons and
        # evidence in one pass so duplicate/change windows are evaluated once.
        # A change's sample uses the same typed partition/order tuple as before;
        # other checks have no declared sample ordering and use a constant key.
        sample_order='0'
        if rule['kind']=='change':
            sample_order='struct_pack('+','.join('k'+str(i)+' := '+expression for i,expression in enumerate(key_aliases))+')'
        ambiguity=f'bool_or({ambiguous})' if rule['kind']=='change' else 'FALSE'
        groups=db.execute(sql+f' SELECT {a("reason")},count(*) FILTER (WHERE {a("eligible")}),count(*) FILTER (WHERE {a("eligible")} AND {a("violation")}),count(*) FILTER (WHERE NOT {a("eligible")}),arg_min({sample_value},{sample_order},?) FILTER (WHERE {a("eligible")} AND {a("violation")}),{ambiguity} FROM assessed GROUP BY {a("reason")}',rule_params+[limit]).fetchall()
        evaluated=violations=0;reasons={};rows=[]
        for reason,eligible_count,violation_count,skipped_count,samples,has_ambiguity in groups:
            if has_ambiguity:raise ValueError('Duplicate ordering keys within a partition. Choose tieBreakers that uniquely order records before checking changes.')
            evaluated+=eligible_count;violations+=violation_count
            if skipped_count:reasons[reason]=skipped_count
            rows.extend([[sample[field] for field in sample_fields] for sample in samples or []])
        if rows and rule['kind']=='change':
            # Ordering keys have just been proven unique. Joining the bounded
            # sample tuples back to the identical scope preserves every source
            # string and null, without keeping wide rows in the window.
            sample_index=a('sampleIndex')
            slots='('+','.join('?' for _ in range(len(key_names)+1))+')'
            args=[value for i,row in enumerate(rows) for value in [i,*row[:len(key_names)]]]
            sample_columns={prefix+'key'+str(i):{'type':columns[n]['type']} for i,n in enumerate(key_names)}
            matching=' AND '.join(typed(n,columns)+'='+typed(prefix+'key'+str(i),sample_columns) for i,n in enumerate(key_names))
            recovery=scoped+' SELECT '+','.join(ident(n) for n in names)+','+sample_index+' FROM scoped JOIN (VALUES '+','.join(slots for _ in rows)+') AS samples('+','.join([sample_index,*key_aliases])+') ON '+matching+' ORDER BY '+sample_index
            recovered=db.execute(recovery,params+args).fetchall()
            if len(recovered)!=len(rows) or any(row[-1]!=i for i,row in enumerate(recovered)):
                raise ValueError('Source records changed while recovering validation samples. Refresh the source and retry.')
            rows=[list(source_row[:-1])+sample_row[len(key_names):] for source_row,sample_row in zip(recovered,rows)]
        accounted=evaluated+sum(reasons.values())
        if accounted<total: reasons['missing_invalid_order_or_partition']=total-accounted
        results.append({**rule,'evaluated':evaluated,'skipped':total-evaluated,'violations':violations,'skipReasons':reasons,'sample':{'columns':sample_names,'rows':rows,'evidenceFields':evidence_fields,'truncated':violations>len(rows)}})
    return {'kind':'validation','scopedRows':total,'checks':results,'scope':{'filters':request.get('filters') or [],'transforms':request.get('transforms') or [],'boundary':'single connected file; no cross-file neighbors or duplicate groups','typeBasis':'saved configuration' if request.get('configuration') else 'inferred types; verify reader settings and column types'},'semantics':['Counts cover every filtered record; samples contain only bounded violation examples.','Duplicate violations count all rows in repeated complete typed-key groups; missing or invalid keys are skipped.', 'Compare predicates describe violations, not passing conditions. Missing checks count empty or null interpreted cells.','Compare and change checks skip missing, invalid and nonfinite operands. Change checks never bridge an invalid measure.','Neighbors are ordered within explicit partitions after filtering; invalid ordering or partition values are skipped. Duplicate ordering keys require explicit unique tie breakers.','Change is absolute magnitude; relative means abs(current - previous) / abs(previous), so 0.1 means 10%. Zero previous values are skipped. Threshold comparison is strictly greater than.','Numeric calculations use floating-point values. Keep identifiers and exact large integers as text; numbers beyond 2^53 may lose integer precision.', 'Checks do not modify source files or saved configuration.']}
