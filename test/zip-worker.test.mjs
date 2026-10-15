// Runs the durable ZIP parser/binding behavior corpus with the same dependency gate as duckdb.test.mjs.
import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const script=fileURLToPath(new URL('./zip-worker.py',import.meta.url));
const python=process.env.TEDATA_PYTHON;
const skip=python?false:'needs DuckDB: set TEDATA_PYTHON to a Python that has DuckDB 1.5.6';
test('ZIP parsing and bounded binding preserve complete raw values, order, profiles and refusals',{skip},()=>{
 const result=spawnSync(python,['-B',script],{cwd:root,encoding:'utf8',timeout:60000,maxBuffer:1024*1024,
  env:{...process.env,PYTHONDONTWRITEBYTECODE:'1'}});
 assert.equal(result.error,undefined,result.error?.message);
 assert.equal(result.signal,null,'worker corpus was terminated');
 assert.equal(result.status,0,result.stdout+result.stderr);
});
