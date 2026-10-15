"""Behavioral ZIP worker gate; every assertion calls released worker logic with values."""
import csv
import io
import json
from pathlib import Path
import sys
import tempfile
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'worker'))
import data_worker as worker
import duckdb

def encoded(rows, delimiter=','):
    out = io.StringIO(newline='')
    csv.writer(out, delimiter=delimiter, lineterminator='\r\n').writerows(rows)
    return out.getvalue().encode('utf-8-sig')

class ZipBehavior(unittest.TestCase):
    def setUp(self):
        self.db = duckdb.connect(':memory:', config={'memory_limit': '1GB', 'threads': '2',
            'temp_directory': '', 'max_temp_directory_size': '0B',
            'autoinstall_known_extensions': 'false', 'autoload_known_extensions': 'false'})

    def tearDown(self):
        self.db.close()

    def read(self, rows, header=True, delimiter=','):
        worker.load_zip_table(self.db, io.BytesIO(encoded(rows, delimiter)),
                              {'header': header, 'delimiter': delimiter})
        return self.db.execute('SELECT * FROM input_source').fetchall()

    def test_complete_rows_and_source_order_across_flush_boundaries(self):
        # Covers old/new batch boundaries, tail flush, empty records and exact raw strings.
        rows = [['identifier', 'value']]
        expected = []
        for i in range(4099):
            row = [f'{i:06d}', '' if i % 7 == 0 else f'  café,{i}\n"quoted"  ']
            rows.append(row)
            if i % 19 == 0:
                rows.append([])
            expected.append((row[0], row[1] or None))
        self.assertEqual(self.read(rows), expected)

    def test_headerless_first_record_is_data_and_tsv_is_literal(self):
        rows = [['0001', ' tabs\tinside ', '001.20'], ['0002', '', 'NaN'],
                ['0003', 'nul\0end', 'null'], ['0004', '"[]\\{}', '😀']]
        self.assertEqual(self.read(rows, header=False, delimiter='\t'),
                         [('0001', ' tabs\tinside ', '001.20'), ('0002', None, 'NaN'),
                          ('0003', 'nul\0end', 'null'), ('0004', '"[]\\{}', '😀')])
        self.assertEqual([r[0] for r in self.db.execute('DESCRIBE input_source').fetchall()],
                         ['column_1', 'column_2', 'column_3'])

    def test_duplicate_blank_and_quoted_header_names(self):
        self.assertEqual(self.read([['', 'x', 'x', 'x_1', 'a"b'], ['1','2','3','4','5']]),
                         [('1','2','3','4','5')])
        self.assertEqual([r[0] for r in self.db.execute('DESCRIBE input_source').fetchall()],
                         ['column_1', 'x', 'x_1', 'x_1_1', 'a"b'])

    def test_header_only_is_valid_empty_table(self):
        self.assertEqual(self.read([['a','b']]), [])

    def test_escaping_and_exact_field_limit_keep_literal_strings(self):
        pattern='a"\\\0\n\r\t\u2028😀'
        moderate=pattern*4096
        at_limit=(pattern*((1048576//len(pattern))+1))[:1048576]
        rows=[['id','text'],['json-batch',moderate],['large-fallback',at_limit],['last','null \\N [] {}']]
        self.assertEqual(self.read(rows),[tuple(row) for row in rows[1:]])

    def test_large_fields_are_bounded_and_single_large_record_is_preserved(self):
        rows = [['field_'+str(i) for i in range(64)]]
        rows += [['x'*8192]*64 for _ in range(16)]
        rows += [['y'*81920]*64, ['last']*64]
        owner = self
        real = self.db
        class ObservedDB:
            def execute(self, sql, parameters=None):
                # Observe values handed to the database, independent of SQL spelling
                # or whether parameters are row-major/column-major/structured.
                def strings(value):
                    if isinstance(value, str):return [value]
                    if isinstance(value, dict):return [s for v in value.values() for s in strings(v)]
                    if isinstance(value, (list,tuple)):return [s for v in value for s in strings(v)]
                    return []
                if parameters is not None:
                    values = strings(parameters)
                    if sum(map(len,values)) > 4*1024*1024:
                        owner.assertEqual(values, ['y'*81920]*64,
                                          'only one intrinsically oversized valid record may exceed the buffer')
                return real.execute(sql) if parameters is None else real.execute(sql, parameters)
        self.db = ObservedDB()
        try:
            actual = self.read(rows)
        finally:
            self.db = real
        self.assertEqual(actual, [tuple(row) for row in rows[1:]])

    def test_late_inconsistent_width_refuses_full_operation(self):
        rows = [['a','b']] + [[str(i),'ok'] for i in range(4097)] + [['late']]
        with self.assertRaisesRegex(ValueError, 'inconsistent row widths'):
            self.read(rows)

    def test_invalid_csv_and_oversized_field_refuse(self):
        for payload in (b'a,b\n"unterminated', b'a\n' + b'x' * 1048577 + b'\n'):
            with self.subTest(bytes=len(payload)):
                with self.assertRaises(csv.Error):
                    worker.load_zip_table(self.db, io.BytesIO(payload), {'header':True,'delimiter':','})
                self.db.execute('DROP TABLE IF EXISTS cached_source')

    def test_column_and_name_limits_keep_boundary_values(self):
        self.assertEqual(self.read([['n'+str(i) for i in range(128)], ['x']*128]), [('x',)*128])
        self.db.execute('DROP VIEW input_source')
        self.db.execute('DROP TABLE cached_source')
        with self.assertRaisesRegex(ValueError, '128 columns'):
            self.read([['n'+str(i) for i in range(129)]])
        with self.assertRaisesRegex(ValueError, '200 characters'):
            self.read([['x'*201]])
        self.assertEqual(self.read([['x'*200], ['ok']]), [('ok',)])

    def test_zip_selection_and_unsafe_members_refuse(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'input.zip'
            with zipfile.ZipFile(path, 'w') as z:
                z.writestr('a.csv', 'a\n1\n')
                z.writestr('b.tsv', 'a\t b\n1\t2\n')
            source, reader, _, _ = worker.open_source(str(path), {})
            self.assertIsNone(source)
            self.assertTrue(reader['requiresMember'])
            self.assertEqual(reader['members'], ['a.csv','b.tsv'])
            with self.assertRaisesRegex(ValueError, 'Choose a CSV or TSV'):
                worker.open_source(str(path), {'member':'absent.csv'})
            for name in ('../escape.csv', '/absolute.csv', 'dir\\file.csv'):
                with self.subTest(name=name):
                    with zipfile.ZipFile(path, 'w') as z:
                        z.writestr(name, 'a\n1\n')
                    with self.assertRaisesRegex(ValueError, 'unsafe member'):
                        worker.open_source(str(path), {})

    def test_public_worker_profile_preserves_counts_ranges_types_and_tail(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = Path(tmp) / 'input.zip'
            rows = [['id','number','date','text']]
            for i in range(4099):
                rows.append([f'{i:06d}', str(i-2000), '2026-01-01T00:00:00.123456789Z',
                             '  A,"B"\nC  ' if i % 5 else ''])
            # After type inference's first1,000 rows, range/count must still include the tail.
            rows[-1][1] = '999999'
            with zipfile.ZipFile(path,'w',compression=zipfile.ZIP_DEFLATED) as z:
                z.writestr('records.csv', encoded(rows))
            profile = json.loads(worker.run({'path':str(path),'reader':{'header':True,'delimiter':','}}))
            self.assertNotIn('error', profile)
            self.assertEqual(profile['rows'], 4099)
            self.assertEqual([c['type'] for c in profile['columns']], ['number','number','datetime','text'])
            self.assertEqual(profile['columns'][1]['max'], 999999)
            self.assertEqual(profile['columns'][3]['missing'], 820)
            self.assertEqual(profile['columns'][2]['precisionLossCount'], 4099)
            query = json.loads(worker.run({'path':str(path),'profile':profile,'offset':4097,'limit':2,
                                           'reader':{'header':True,'delimiter':','}}))
            self.assertEqual(query['rows'], rows[-2:])

if __name__ == '__main__':
    unittest.main(verbosity=2)
