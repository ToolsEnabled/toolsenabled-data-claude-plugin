// Behavioural tests of the bundled MCP server: agent chat history is refused, concurrent first calls,
// tool annotations, and the consent wording before setup downloads anything.
import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp, mkdir, writeFile} from 'node:fs/promises';
import {join, dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
const server = fileURLToPath(new URL('../server/tedata-server.mjs', import.meta.url));
const scratch = await mkdtemp(join(tmpdir(), 'tedata-server-test-'));
const text = response => (response.result?.content || []).map(part => part.text).join('\n') || JSON.stringify(response.error);

// Every server gets its own home, project and data folder and none of the caller's CLAUDE_* or
// TEDATA_* settings, so no test can reach a real project, chat history or Python environment.
async function start() {
 const base = await mkdtemp(join(scratch, 'case-'));
 const home = join(base, 'home'), project = join(base, 'project');
 await mkdir(home, {recursive: true}); await mkdir(project, {recursive: true});
 const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^(CLAUDE|TEDATA)_/.test(key)));
 Object.assign(env, {HOME: home, USERPROFILE: home, TEDATA_WORKSPACE: project, TEDATA_DATA_DIR: join(base, 'data')});
 const child = spawn(process.execPath, [server], {cwd: project, env, stdio: ['pipe', 'pipe', 'pipe']});
 let stderr = '', buffer = '', id = 0; const pending = new Map();
 child.stderr.on('data', chunk => { stderr += chunk; });
 child.stdout.on('data', chunk => { buffer += chunk; let end; while ((end = buffer.indexOf('\n')) >= 0) {
  const line = buffer.slice(0, end); buffer = buffer.slice(end + 1); if (!line.trim()) continue;
  try { const message = JSON.parse(line), handler = pending.get(message.id); if (handler && !message.method) { pending.delete(message.id); handler(message); } } catch {}
 }});
 const prepare = (method, params = {}) => { const key = ++id; return {line: JSON.stringify({jsonrpc: '2.0', id: key, method, params}) + '\n', done: new Promise((accept, reject) => {
  const timer = setTimeout(() => { pending.delete(key); reject(new Error(`MCP ${method} timed out; stderr: ${stderr}`)); }, 10000);
  pending.set(key, message => { clearTimeout(timer); accept(message); });
 })}; };
 const request = (method, params) => { const r = prepare(method, params); child.stdin.write(r.line); return r.done; };
 return {home, project,
  request,
  // Requests in one write, so a fresh server receives them at the same moment.
  together: calls => { const rs = calls.map(([method, params]) => prepare(method, params)); child.stdin.write(rs.map(r => r.line).join('')); return Promise.all(rs.map(r => r.done)); },
  call: (name, args = {}) => request('tools/call', {name, arguments: args}),
  async initialize(capabilities = {}) {
   const response = await request('initialize', {protocolVersion: '2025-06-18', capabilities, clientInfo: {name: 'server-test', version: '1'}});
   child.stdin.write(JSON.stringify({jsonrpc: '2.0', method: 'notifications/initialized'}) + '\n');
   return response.result;
  },
  async close() { if (child.exitCode === null && child.signalCode === null) { const closed = new Promise(accept => child.once('close', accept)); child.stdin.end(); child.kill('SIGTERM'); await closed; } },
 };
}
async function file(path, content) { await mkdir(dirname(path), {recursive: true}); await writeFile(path, content); return path; }
const catalog = async s => JSON.parse(text(await s.call('tedata_data', {request: {action: 'evidence_catalog'}}))).documents;

test('Claude Code chat history under ~/.claude is refused as a document or a data file', async () => {
 const s = await start();
 try {
  await s.initialize();
  for (const relative of ['.claude/projects/-home-user-project/0b6f1c2e-5d4a-4e7b-9a43-2f1d8c7b6a50.jsonl', '.claude/history.jsonl']) {
   const added = await s.call('tedata_sources', {action: 'add', kind: 'document', path: await file(join(s.home, relative), '{"display":"chat transcript"}\n')});
   assert.equal(added.result.isError, true, `~/${relative} was connected`);
   assert.match(text(added), /TE Data does not read .*AI agent's chat history and settings folder/);
  }
  const csv = await file(join(s.home, '.claude', 'projects', '-home-user-project', 'export.csv'), 'a,b\n1,2\n');
  const source = await s.call('tedata_sources', {action: 'add', kind: 'source', path: csv});
  assert.equal(source.result.isError, true, 'a data file under ~/.claude was connected');
  assert.deepEqual(await catalog(s), []);
 } finally { await s.close(); }
});

test("Claude's app data folders and other agents' history folders are refused", async () => {
 const s = await start();
 try {
  await s.initialize();
  for (const relative of ['.config/Claude/claude-code-sessions/session.json', 'Library/Application Support/Claude/session.json', 'AppData/Roaming/Claude/session.json',
   '.codex/history.jsonl', '.gemini/tmp/project/chats/session.json', '.copilot/session-state/session.jsonl', '.local/share/opencode/storage/session/info.json', '.config/opencode/opencode.json']) {
   const added = await s.call('tedata_sources', {action: 'add', kind: 'document', path: await file(join(s.home, relative), '{"note":"history"}\n')});
   assert.equal(added.result.isError, true, `~/${relative} was connected`);
  }
  assert.deepEqual(await catalog(s), []);
 } finally { await s.close(); }
});

test('ordinary data files and documents still connect and read back', async () => {
 const s = await start();
 try {
  await s.initialize();
  const csv = await file(join(s.project, 'data', 'measurements.csv'), 'time,high,low\n2026-10-01,5,3\n');
  const events = await file(join(s.home, 'exports', 'events.jsonl'), '{"event":"ordinary record"}\n');
  const notes = await file(join(s.project, 'docs', 'claude-notes.md'), 'Notes that mention Claude.\n');
  for (const [kind, path] of [['source', csv], ['document', events], ['document', notes]]) {
   const added = await s.call('tedata_sources', {action: 'add', kind, path});
   assert.notEqual(added.result.isError, true, text(added));
  }
  const documents = await catalog(s);
  assert.deepEqual(documents.map(d => d.name).sort(), ['claude-notes.md', 'events.jsonl']);
  const read = await s.call('tedata_data', {request: {action: 'evidence_read', documentId: documents.find(d => d.name === 'events.jsonl').id}});
  assert.match(text(read), /ordinary record/);
 } finally { await s.close(); }
});

test('files connected by an earlier version from ~/.claude are no longer listed or read', async () => {
 const s = await start();
 try {
  const history = await file(join(s.home, '.claude', 'history.jsonl'), '{"display":"chat transcript"}\n');
  const notes = await file(join(s.home, 'notes', 'protocol.md'), 'Protocol.\n');
  const exported = await file(join(s.home, '.claude', 'projects', '-home-user-project', 'export.csv'), 'a,b\n1,2\n');
  const data = await file(join(s.project, 'data', 'measurements.csv'), 'a,b\n1,2\n');
  await file(join(s.project, '.tedata', 'workspace.json'), JSON.stringify({version: 1, sources: [{path: exported, kind: 'file'}, {path: data, kind: 'file'}], documents: [{path: history}, {path: notes}]}));
  await s.initialize();
  assert.deepEqual((await catalog(s)).map(d => d.name), ['protocol.md']);
  const files = JSON.parse(text(await s.call('tedata_data', {request: {action: 'catalog'}}))).files;
  assert.deepEqual(files.map(f => f.name), ['measurements.csv']);
 } finally { await s.close(); }
});

test('two tool calls at once on a fresh server both succeed', async () => {
 const s = await start();
 try {
  await s.initialize();
  const call = {name: 'tedata_data', arguments: {request: {action: 'evidence_catalog'}}};
  const responses = await s.together([['tools/call', call], ['tools/call', call]]);
  for (const response of responses) assert.notEqual(response.result?.isError, true, text(response));
 } finally { await s.close(); }
});

test('every tool declares annotations.title and its reviewed hints', async () => {
 // [readOnlyHint, destructiveHint, openWorldHint]. A change here must be deliberate.
 const reviewed = {
  tedata_inspect: [true, false, false], tedata_prepare: [false, false, false], tedata_validate: [true, false, false],
  tedata_derive: [false, false, false], tedata_preparation: [true, false, false], tedata_collection: [true, false, false],
  tedata_open: [true, false, false], tedata_refresh: [false, false, false], tedata_data: [false, false, false],
  tedata_sources: [false, false, false], tedata_export: [false, false, false], tedata_setup: [false, true, true],
 };
 const s = await start();
 try {
  // A host that shows panels also lists the panel-only tool, so all twelve are checked.
  await s.initialize({extensions: {'io.modelcontextprotocol/ui': {mimeTypes: ['text/html;profile=mcp-app']}}});
  const {tools} = (await s.request('tools/list')).result;
  assert.deepEqual(tools.map(t => t.name).sort(), Object.keys(reviewed).sort());
  for (const tool of tools) {
   assert.ok(tool.title, `${tool.name} has no title`);
   assert.equal(tool.annotations?.title, tool.title, `${tool.name} annotations.title`);
   const {readOnlyHint, destructiveHint, openWorldHint} = tool.annotations;
   assert.deepEqual([readOnlyHint, destructiveHint, openWorldHint], reviewed[tool.name], tool.name);
  }
  // Marked read-only, these three write TE Data's own profile cache; their descriptions say so.
  for (const name of ['tedata_open', 'tedata_inspect', 'tedata_validate']) assert.match(tools.find(t => t.name === name).description, /\.tedata\/cache\/profiles/, name);
  assert.match(tools.find(t => t.name === 'tedata_setup').description, /deletes/);
 } finally { await s.close(); }
});
