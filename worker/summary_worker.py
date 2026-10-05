"""Grouped summaries for plots and grouped tables: declarative keys and measures, never SQL.

Keys group by a column's value, a calendar time bucket in an IANA zone, or equal-width numeric
bins. Measures aggregate all matching rows. Results are bounded (up to 20,000 rows) so charts stay
fast over very large sources; temporal values are wall-clock ISO strings in the key's zone.
"""
import math, re
from validation_worker import filter_sql, ident, typed

INTERVALS = ['second', 'minute', 'hour', 'day', 'week', 'month', 'quarter', 'year']
FIELD = re.compile(r'^[A-Za-z_][A-Za-z0-9_ -]{0,63}$')
NUMERIC = {'sum': 'sum', 'mean': 'avg', 'median': 'median', 'stddev': 'stddev_samp'}
MAX_ROWS, DEFAULT_ROWS, MAX_BINS = 20000, 5000, 2000


def literal(value): return "'" + str(value).replace("'", "''") + "'"


def iso(expr, utc=False):
    # Wall-clock text that Vega-Lite parses as the same local time it then displays.
    return f"strftime({expr}, '%Y-%m-%dT%H:%M:%S.%g')" + ("||'Z'" if utc else '')


def bucket(interval, every, local):
    if every == 1: return f"date_trunc('{interval}', {local})"
    if interval == 'quarter': return f"time_bucket(INTERVAL '{3 * every} months', {local})"
    return f"time_bucket(INTERVAL '{every} {interval}s', {local})"


def summarize(db, query, columns, where, params):
    keys, measures = query.get('groupBy') or [], query.get('measures') or []
    if len(keys) > 3: raise ValueError('Group by up to 3 keys.')
    if not 1 <= len(measures) <= 8: raise ValueError('Use 1 to 8 measures.')
    extra, extra_params = filter_sql(query.get('filters', []), columns)
    if extra:
        where = where + ' AND ' + extra[len(' WHERE '):] if where else extra
        params = params + extra_params
    names, fields, selects, notes = set(), [], [], []

    def kind(name, role):
        if name not in columns: raise ValueError(f'Unknown column in {role}: {name}')
        return columns[name]['type']

    def claim(name):
        if not isinstance(name, str) or not FIELD.match(name): raise ValueError(f'Output field names use letters, digits, spaces, _ or - and start with a letter or _ (got {name!r}).')
        if name in names: raise ValueError(f'Output field names must be unique: {name}')
        names.add(name)

    for key in keys:
        column = key['column']; k = kind(column, 'groupBy'); name = key.get('as') or column; claim(name)
        interval, every = key.get('interval'), int(key.get('every') or 1)
        bins, width = key.get('bins'), key.get('binWidth')
        if (interval or key.get('timezone')) and k != 'datetime': raise ValueError(f'Time buckets and time zones need a datetime column; {column} is {k}.')
        if (bins or width) and k != 'number': raise ValueError(f'Bins need a numeric column; {column} is {k}.')
        if k == 'datetime':
            zone = key.get('timezone') or 'UTC'
            try: db.execute("SELECT timezone(?, TIMESTAMPTZ '2024-01-01 00:00:00+00')", [zone])
            except Exception: raise ValueError(f'Use an IANA time zone such as America/New_York (got {zone!r}).') from None
            local = f'timezone({literal(zone)}, {typed(column, columns)})'
            if interval:
                if interval not in INTERVALS: raise ValueError('Interval must be one of ' + ', '.join(INTERVALS) + '.')
                if not 1 <= every <= 1000: raise ValueError('every must be between 1 and 1000.')
                local = bucket(interval, every, local)
            selects.append(iso(local))
            fields.append({'name': name, 'role': 'key', 'type': 'temporal', 'column': column, 'timezone': zone, **({'interval': interval, 'every': every} if interval else {})})
            notes.append(f'{name}: ' + (f'{every} {interval}' if every > 1 else interval if interval else 'time') + f' ({zone} wall clock)')
        elif k == 'number' and (bins or width):
            x = typed(column, columns)
            scope = where + (' AND ' if where else ' WHERE ') + f'isfinite({x})'
            lo, hi = db.execute(f'SELECT min({x}), max({x}) FROM source' + scope, params).fetchone()
            if lo is None: lo, hi = 0.0, 1.0
            if width:
                width = float(width)
                if not math.isfinite(width) or width <= 0: raise ValueError('binWidth must be a positive number.')
                start = math.floor(lo / width) * width; count = max(1, math.ceil((hi - start) / width + 1e-12))
                if hi >= start + count * width: count += 1
                if count > MAX_BINS: raise ValueError(f'binWidth {width:g} makes {count:,} bins over {lo:g} to {hi:g}; use at most {MAX_BINS:,}.')
            else:
                count = int(bins)
                if not 2 <= count <= 200: raise ValueError('bins must be between 2 and 200.')
                start = lo; width = (hi - lo) / count if hi > lo else 1.0
            index = f'least({count - 1}, greatest(0, floor(({x} - {start!r}) / {width!r})))'
            claim(name + '_end')
            selects.append(f'CASE WHEN isfinite({x}) THEN {start!r} + {index} * {width!r} END')
            selects.append(f'CASE WHEN isfinite({x}) THEN {start!r} + ({index} + 1) * {width!r} END')
            fields.append({'name': name, 'role': 'key', 'type': 'quantitative', 'column': column, 'bin': {'start': start, 'width': width, 'count': count}, 'unit': columns[column].get('unit')})
            fields.append({'name': name + '_end', 'role': 'binEnd', 'type': 'quantitative', 'column': column, 'unit': columns[column].get('unit')})
            notes.append(f'{name}: {count} bins of width {width:g}')
        else:
            x = typed(column, columns)
            selects.append(f'CASE WHEN isfinite({x}) THEN {x} END' if k == 'number' else x)
            fields.append({'name': name, 'role': 'key', 'type': 'quantitative' if k == 'number' else 'nominal', 'column': column, 'unit': columns[column].get('unit')})
    key_count = len(selects)

    for m in measures:
        op, column, name = m['op'], m.get('column'), m.get('as')
        claim(name)
        if op == 'count' and not column:
            selects.append('count(*)'); fields.append({'name': name, 'role': 'measure', 'type': 'quantitative', 'op': 'count'}); continue
        if not column: raise ValueError(f'Measure {name} ({op}) needs a column.')
        k = kind(column, 'measures'); value = typed(column, columns); unit = columns[column].get('unit')
        out = 'quantitative'
        if op == 'count': expr = f'count({value})'; unit = None
        elif op == 'distinct': expr = f'count(DISTINCT {value})'; unit = None
        elif op in NUMERIC or op == 'quantile':
            if k != 'number': raise ValueError(f'{op} needs a numeric column; {column} is {k}.')
            if op == 'quantile':
                p = m.get('p')
                if not isinstance(p, (int, float)) or not 0 < p < 1: raise ValueError('quantile needs p between 0 and 1, for example 0.9.')
                expr = f'quantile_cont({value}, {float(p)!r})'
            else: expr = f'{NUMERIC[op]}({value})'
        elif op in ('min', 'max'):
            if k == 'text': raise ValueError(f'{op} needs a numeric or datetime column; {column} is text.')
            expr = f'{op}({value})'
            if k == 'datetime': expr = iso(f"timezone('UTC', {expr})", utc=True); out = 'temporal'
        elif op in ('first', 'last'):
            order = m.get('orderBy')
            if not order: raise ValueError(f'{op} needs orderBy, the column that defines order (usually the time column).')
            ok = kind(order, 'orderBy')
            if ok == 'text': raise ValueError(f'orderBy needs a numeric or datetime column; {order} is text.')
            expr = f"{'arg_min' if op == 'first' else 'arg_max'}({value}, {typed(order, columns)})"
            if k == 'datetime': expr = iso(f"timezone('UTC', {expr})", utc=True); out = 'temporal'
            elif k == 'text': out = 'nominal'; unit = None
        else: raise ValueError('Unsupported measure: ' + str(op))
        selects.append(expr)
        fields.append({'name': name, 'role': 'measure', 'type': out, 'op': op, 'column': column, **({'p': m['p']} if op == 'quantile' else {}), **({'orderBy': m['orderBy']} if op in ('first', 'last') else {}), **({'unit': unit} if unit else {})})

    position = {f['name']: i + 1 for i, f in enumerate(fields)}
    order, sorted_positions = [], set()
    for rule in query.get('sort') or []:
        if rule['field'] not in position: raise ValueError(f"Sort field {rule['field']} is not an output field.")
        sorted_positions.add(position[rule['field']])
        order.append(f"{position[rule['field']]} {'DESC' if rule.get('descending') else 'ASC'} NULLS LAST")
    # Keys always complete the order, so a truncated result is a deterministic prefix.
    order += [f'{i} ASC NULLS LAST' for i in range(1, key_count + 1) if i not in sorted_positions]
    limit = int(query.get('limit') or DEFAULT_ROWS)
    if not 1 <= limit <= MAX_ROWS: raise ValueError(f'limit must be between 1 and {MAX_ROWS:,}.')
    sql = 'SELECT ' + ','.join(selects) + ' FROM source' + where + (' GROUP BY ALL' if key_count else '') + (' ORDER BY ' + ','.join(order) if order else '') + f' LIMIT {limit + 1}'
    rows = db.execute(sql, params).fetchall()
    truncated = len(rows) > limit
    rows = [[None if isinstance(v, float) and not math.isfinite(v) else v for v in row] for row in rows[:limit]]
    described = [f"{f['op']} of {f['column']}" if f.get('column') else 'rows' for f in fields if f['role'] == 'measure']
    note = ('Grouped by ' + ', '.join(f['name'] for f in fields if f['role'] == 'key') if key_count else 'All matching rows') + ' · ' + ', '.join(described) + f' · {len(rows):,} rows' + (f' (first {limit:,} in sort order; more groups exist)' if truncated else '')
    return {'kind': 'grouped', 'fields': fields, 'rows': rows, 'rowCount': len(rows), 'truncated': truncated, 'limit': limit, 'note': note, 'keyNotes': notes,
            'scope': 'All rows matching the view filters' + (" and this summary's filters" if query.get('filters') else '')}
