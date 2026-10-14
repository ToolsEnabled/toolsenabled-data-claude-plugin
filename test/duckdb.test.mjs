// Tests that need the query engine. They run when TEDATA_PYTHON names a Python that has DuckDB 1.5.6
// (for example the python/bin/python in TE Data's data folder after setup) and are skipped otherwise.
// Each server gets its own home, project and data folder; of the caller's CLAUDE_* and TEDATA_* settings
// only TEDATA_PYTHON reaches it.
import test, {after} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp, mkdir, copyFile, readFile, readdir, rm} from 'node:fs/promises';
import {gunzipSync} from 'node:zlib';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const python = process.env.TEDATA_PYTHON;
const skip = python ? false : 'needs DuckDB: set TEDATA_PYTHON to a Python that has DuckDB 1.5.6';
const scratch = await mkdtemp(join(tmpdir(), 'tedata-duckdb-test-'));
after(() => rm(scratch, {recursive: true, force: true}));
const text = response => (response.result?.content || []).map(part => part.text).join('\n') || JSON.stringify(response.error);

async function start() {
 const base = await mkdtemp(join(scratch, 'case-')), home = join(base, 'home'), project = join(base, 'project');
 await mkdir(home, {recursive: true}); await mkdir(project, {recursive: true});
 await copyFile(join(root, 'examples', 'sample.csv'), join(project, 'sample.csv'));
 const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^(CLAUDE|TEDATA)_/.test(key)));
 Object.assign(env, {HOME: home, USERPROFILE: home, TEDATA_DATA_DIR: join(base, 'data'), TEDATA_WORKSPACE: project, TEDATA_PYTHON: python});
 const child = spawn(process.execPath, [join(root, 'server', 'tedata-server.mjs')], {cwd: project, env, stdio: ['pipe', 'pipe', 'pipe']});
 let stderr = '', buffer = '', id = 0; const pending = new Map();
 child.stderr.on('data', chunk => { stderr += chunk; });
 child.stdout.on('data', chunk => { buffer += chunk; let end; while ((end = buffer.indexOf('\n')) >= 0) {
  const line = buffer.slice(0, end); buffer = buffer.slice(end + 1); if (!line.trim()) continue;
  let message; try { message = JSON.parse(line); } catch { continue; }
  const handler = pending.get(message.id); if (handler && !message.method) { pending.delete(message.id); handler(message); }
 }});
 const request = (method, params = {}) => new Promise((accept, reject) => { const key = ++id;
  const timer = setTimeout(() => { pending.delete(key); reject(new Error(`MCP ${method} timed out; stderr: ${stderr}`)); }, 120000);
  pending.set(key, message => { clearTimeout(timer); accept(message); });
  child.stdin.write(JSON.stringify({jsonrpc: '2.0', id: key, method, params}) + '\n');
 });
 const call = (name, args = {}) => request('tools/call', {name, arguments: args});
 const json = async response => { const r = await response; assert.notEqual(r.result?.isError, true, text(r)); return JSON.parse(text(r)); };
 const settle = async response => { let job = await json(response); while (job.jobId && job.state === 'running') job = await json(call('tedata_data', {request: {action: 'poll', jobId: job.jobId}})); assert.notEqual(job.state, 'error', JSON.stringify(job)); return job; };
 await request('initialize', {protocolVersion: '2025-06-18', capabilities: {}, clientInfo: {name: 'duckdb-test', version: '1'}});
 child.stdin.write(JSON.stringify({jsonrpc: '2.0', method: 'notifications/initialized'}) + '\n');
 await json(call('tedata_sources', {action: 'add', kind: 'source', path: 'sample.csv'}));
 const {fileId, fingerprint, revision} = await json(call('tedata_inspect', {}));
 return {project, call, json, settle, base: {fileId, fingerprint, revision},
  async close() { if (child.exitCode === null && child.signalCode === null) { const closed = new Promise(accept => child.once('close', accept)); child.stdin.end(); child.kill('SIGTERM'); await closed; } }};
}
async function files(directory, pattern) {
 return (await readdir(directory, {recursive: true})).filter(name => pattern.test(name)).sort().map(name => join(directory, name));
}
const sourceRows = async () => (await readFile(join(root, 'examples', 'sample.csv'), 'utf8')).trim().split('\n').slice(1);

test('removing duplicate rows keeps the first of each in source order, also for first/last by key', {skip}, async () => {
 const s = await start();
 try {
  const derive = async (steps, name) => {
   const preview = await s.settle(s.call('tedata_data', {request: {action: 'preview_derive', ...s.base, recipe: {version: 1, basis: 'raw', steps}}}));
   const saved = await s.json(s.call('tedata_derive', {...s.base, previewId: preview.previewId, name}));
   const [data] = await files(join(s.project, '.tedata', 'derived-data'), new RegExp(`${preview.previewId}[/\\\\]data\\.csv\\.gz$`));
   const rows = gunzipSync(await readFile(data)).toString('utf8').trim().split(/\r?\n/);
   assert.equal(rows.shift(), 'date,city,high_c,low_c,rain_mm');
   return {preview, saved, rows};
  };
  const source = await sourceRows();
  // keep unique: the 2 repeated rows (source rows 29 and 30) go; every other row stays where it was.
  const unique = await derive([{op: 'deduplicate', keep: 'unique'}], 'unique rows');
  const expected = source.filter((row, index) => source.indexOf(row) === index);
  assert.equal(expected.length, 28);
  assert.deepEqual(unique.rows, expected);
  assert.deepEqual(unique.preview.after.rows.map(row => row.join(',')), expected.slice(0, unique.preview.after.rows.length));
  // keep first per date, ordered by city (Lisbon before Oslo): the Lisbon rows, in their source order.
  const first = await derive([{op: 'deduplicate', keep: 'unique'}, {op: 'deduplicate', keep: 'first', columns: ['date'], orderBy: [{column: 'city'}]}], 'first city per date');
  assert.deepEqual(first.rows, expected.filter(row => row.split(',')[1] === 'Lisbon'));
  // keep last per city, ordered by date: the 2026-01-14 rows, Oslo first as in the source.
  const last = await derive([{op: 'deduplicate', keep: 'unique'}, {op: 'deduplicate', keep: 'last', columns: ['city'], orderBy: [{column: 'date'}]}], 'last date per city');
  assert.deepEqual(last.rows, expected.filter(row => row.startsWith('2026-01-14,')));
 } finally { await s.close(); }
});
