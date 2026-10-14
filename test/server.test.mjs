// Behavioural tests of the bundled MCP server: agent chat history is refused, concurrent first calls,
// tool annotations, and the consent wording before setup downloads anything.
import test, {after} from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp, mkdir, writeFile, symlink, readFile, rm} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {join, dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath, pathToFileURL} from 'node:url';
const server = fileURLToPath(new URL('../server/tedata-server.mjs', import.meta.url));
const scratch = await mkdtemp(join(tmpdir(), 'tedata-server-test-'));
after(() => rm(scratch, {recursive: true, force: true}));
const text = response => (response.result?.content || []).map(part => part.text).join('\n') || JSON.stringify(response.error);

// Every server gets its own home, project and data folder and none of the caller's CLAUDE_* or
// TEDATA_* settings, so no test can reach a real project, chat history or Python environment.
// With roots, the workspace comes from this client's roots/list answer instead of TEDATA_WORKSPACE.
// extraEnv(home) adds variables after the filtering, for tests that need CLAUDE_CONFIG_DIR or CODEX_HOME.
// homeLink makes the home folder a link to its real folder, as on systems where /home links to /var/home.
async function start({roots = false, project: relativeProject = 'project', extraEnv = () => ({}), homeLink = false} = {}) {
 const base = await mkdtemp(join(scratch, 'case-'));
 const home = join(base, 'home'), project = join(base, relativeProject);
 if (homeLink) { await mkdir(join(base, 'real-home')); await symlink(join(base, 'real-home'), home, process.platform === 'win32' ? 'junction' : 'dir'); }
 await mkdir(home, {recursive: true}); await mkdir(project, {recursive: true});
 const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^(CLAUDE|TEDATA)_/.test(key)));
 Object.assign(env, {HOME: home, USERPROFILE: home, TEDATA_DATA_DIR: join(base, 'data')}, roots ? {} : {TEDATA_WORKSPACE: project}, extraEnv(home));
 const child = spawn(process.execPath, [server], {cwd: project, env, stdio: ['pipe', 'pipe', 'pipe']});
 let stderr = '', buffer = '', id = 0, rootRequests = 0; const pending = new Map();
 child.stderr.on('data', chunk => { stderr += chunk; });
 child.stdout.on('data', chunk => { buffer += chunk; let end; while ((end = buffer.indexOf('\n')) >= 0) {
  const line = buffer.slice(0, end); buffer = buffer.slice(end + 1); if (!line.trim()) continue;
  let message; try { message = JSON.parse(line); } catch { continue; }
  if (message.method === 'roots/list' && message.id !== undefined) { rootRequests++; child.stdin.write(JSON.stringify({jsonrpc: '2.0', id: message.id, result: {roots: [{uri: pathToFileURL(project).href, name: 'project'}]}}) + '\n'); continue; }
  const handler = pending.get(message.id); if (handler && !message.method) { pending.delete(message.id); handler(message); }
 }});
 const prepare = (method, params = {}) => { const key = ++id; return {line: JSON.stringify({jsonrpc: '2.0', id: key, method, params}) + '\n', done: new Promise((accept, reject) => {
  const timer = setTimeout(() => { pending.delete(key); reject(new Error(`MCP ${method} timed out; stderr: ${stderr}`)); }, 10000);
  pending.set(key, message => { clearTimeout(timer); accept(message); });
 })}; };
 const request = (method, params) => { const r = prepare(method, params); child.stdin.write(r.line); return r.done; };
 return {home, project, get rootRequests() { return rootRequests; },
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
   'AppData/Local/Packages/Claude_example/LocalCache/Roaming/Claude/session.json', '.claude-work/projects/-home-user-project/session.jsonl', '.codex-backup/history.jsonl',
   '.codex/history.jsonl', '.gemini/tmp/project/chats/session.json', '.copilot/session-state/session.jsonl', '.local/share/opencode/storage/session/info.json', '.config/opencode/opencode.json']) {
   const added = await s.call('tedata_sources', {action: 'add', kind: 'document', path: await file(join(s.home, relative), '{"note":"history"}\n')});
   assert.equal(added.result.isError, true, `~/${relative} was connected`);
  }
  assert.deepEqual(await catalog(s), []);
 } finally { await s.close(); }
});

test('chat history and memory in a moved Claude or Codex folder (CLAUDE_CONFIG_DIR, CODEX_HOME) are refused', async () => {
 // Folder names without a .claude or .codex prefix, so only the environment can mark them.
 const s = await start({extraEnv: home => ({CLAUDE_CONFIG_DIR: join(home, 'accounts', 'work', 'claude'), CODEX_HOME: join(home, 'codex-home')})});
 try {
  await s.initialize();
  for (const relative of ['accounts/work/claude/projects/-home-user-project/0b6f1c2e-5d4a-4e7b-9a43-2f1d8c7b6a50.jsonl', 'accounts/work/claude/projects/-home-user-project/memory/MEMORY.md', 'codex-home/sessions/2026/10/13/rollout.jsonl']) {
   const added = await s.call('tedata_sources', {action: 'add', kind: 'document', path: await file(join(s.home, relative), '{"display":"chat transcript"}\n')});
   assert.equal(added.result.isError, true, `~/${relative} was connected`);
   assert.match(text(added), /AI agent's chat history and settings folder/);
  }
  const notes = await s.call('tedata_sources', {action: 'add', kind: 'document', path: await file(join(s.home, 'notes', 'protocol.md'), 'Protocol.\n')});
  assert.notEqual(notes.result.isError, true, text(notes));
 } finally { await s.close(); }
});

test('a CLAUDE_CONFIG_DIR that names the home folder itself does not refuse ordinary files', async () => {
 for (const homeLink of [false, true]) {
  const s = await start({homeLink, extraEnv: home => ({CLAUDE_CONFIG_DIR: home})});
  try {
   await s.initialize();
   const notes = await s.call('tedata_sources', {action: 'add', kind: 'document', path: await file(join(s.home, 'notes', 'protocol.md'), 'Protocol.\n')});
   assert.notEqual(notes.result.isError, true, `${homeLink ? 'linked home: ' : ''}${text(notes)}`);
  } finally { await s.close(); }
 }
});

test('only account folders directly in the home folder are refused by their .claude- or .codex- name', async () => {
 const s = await start({project: join('home', 'work', 'plugin-repo')});
 try {
  await s.initialize();
  // Other tools' worktrees, plugin repositories' .claude-plugin folders and dot-files are not agent history.
  for (const [kind, path] of [
   ['document', join(s.project, '.claude-plugin', 'marketplace.json')], ['document', join(s.project, '.codex-plugin', 'plugin.json')],
   ['source', join(s.home, '.claude-squad', 'worktrees', 'feature', 'data', 'measurements.csv')], ['source', join(s.home, '.claude-usage.csv')]]) {
   const added = await s.call('tedata_sources', {action: 'add', kind, path: await file(path, kind === 'source' ? 'a,b\n1,2\n' : '{}\n')});
   assert.notEqual(added.result.isError, true, `${path}: ${text(added)}`);
  }
 } finally { await s.close(); }
});

test('a session in <CLAUDE_CONFIG_DIR>/worktrees still connects its own files', async () => {
 const s = await start({project: join('home', '.claude', 'worktrees', 'feature'), extraEnv: home => ({CLAUDE_CONFIG_DIR: join(home, '.claude')})});
 try {
  await s.initialize();
  const added = await s.call('tedata_sources', {action: 'add', kind: 'source', path: await file(join(s.project, 'data', 'measurements.csv'), 'a,b\n1,2\n')});
  assert.notEqual(added.result.isError, true, text(added));
  const history = await s.call('tedata_sources', {action: 'add', kind: 'document', path: await file(join(s.home, '.claude', 'history.jsonl'), '{"display":"chat transcript"}\n')});
  assert.equal(history.result.isError, true, 'history beside the worktrees was connected');
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

test('a project in a Claude Code worktree (.claude/worktrees) still connects its own files', async () => {
 const s = await start({project: join('repo', '.claude', 'worktrees', 'feature')});
 try {
  await s.initialize();
  const csv = await file(join(s.project, 'data', 'measurements.csv'), 'time,high,low\n2026-10-01,5,3\n');
  const notes = await file(join(s.project, 'docs', 'protocol.md'), 'Protocol.\n');
  for (const [kind, path] of [['source', csv], ['document', notes]]) {
   const added = await s.call('tedata_sources', {action: 'add', kind, path});
   assert.notEqual(added.result.isError, true, text(added));
  }
  const settings = await s.call('tedata_sources', {action: 'add', kind: 'document', path: await file(join(s.project, '.claude', 'settings.local.json'), '{}\n')});
  assert.equal(settings.result.isError, true, "the worktree's own .claude settings were connected");
  // A folder in ~/.claude/worktrees that links into ~/.claude/projects is judged by where it leads.
  await file(join(s.home, '.claude', 'projects', '-home-user-project', 'session.jsonl'), '{"display":"chat transcript"}\n');
  await mkdir(join(s.home, '.claude', 'worktrees'), {recursive: true});
  await symlink(join(s.home, '.claude', 'projects', '-home-user-project'), join(s.home, '.claude', 'worktrees', 'linked'), process.platform === 'win32' ? 'junction' : 'dir');
  const linked = await s.call('tedata_sources', {action: 'add', kind: 'document', path: join(s.home, '.claude', 'worktrees', 'linked', 'session.jsonl')});
  assert.equal(linked.result.isError, true, 'a transcript reached through .claude/worktrees was connected');
  assert.deepEqual((await catalog(s)).map(d => d.name), ['protocol.md']);
  const files = JSON.parse(text(await s.call('tedata_data', {request: {action: 'catalog'}}))).files;
  assert.deepEqual(files.map(f => f.name), ['measurements.csv']);
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

test('two tool calls at once on a fresh server both succeed and share one workspace lookup', async () => {
 const call = {name: 'tedata_data', arguments: {request: {action: 'evidence_catalog'}}};
 for (const roots of [false, true]) {
  const s = await start({roots});
  try {
   await s.initialize(roots ? {roots: {}} : {});
   const responses = await s.together([['tools/call', call], ['tools/call', call]]);
   for (const response of responses) assert.notEqual(response.result?.isError, true, text(response));
   if (roots) assert.equal(s.rootRequests, 1, 'the server looked up its workspace more than once');
  } finally { await s.close(); }
 }
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

test('setup is offered only with the user\'s agreement and names what uv may download', async () => {
 const s = await start();
 try {
  const info = await s.initialize();
  assert.match(info.instructions, /ask the user, and call tedata_setup only after they agree/);
  assert.match(info.instructions, /uv may also download a Python interpreter/);
  assert.doesNotMatch(info.instructions, /then call tedata_setup/);
  const opened = JSON.parse(text(await s.call('tedata_open', {})));
  assert.equal(opened.setupReady, false);
  assert.match(opened.setupNeeded, /Ask the user, and call tedata_setup only after they agree/);
  assert.match(opened.setupNeeded, /uv may also download a Python interpreter/);
  // Only the user can run the setup command; Claude cannot invoke it on its own.
  const command = await readFile(fileURLToPath(new URL('../commands/setup.md', import.meta.url)), 'utf8');
  assert.match(command, /^---\n(?:.*\n)*?disable-model-invocation: true\n(?:.*\n)*?---\n/);
  assert.match(command, /uv may also download a Python interpreter/);
 } finally { await s.close(); }
});

test('the export description says that only plot blocks also get a PNG', async () => {
 const s = await start();
 try {
  await s.initialize();
  const {tools} = (await s.request('tools/list')).result;
  assert.match(tools.find(t => t.name === 'tedata_export').description, /plot block[^.]*PNG/);
 } finally { await s.close(); }
});

test('the deduplicate schema itself refuses key columns with unique and names the missing field for first/last', async () => {
 const s = await start();
 try {
  await s.initialize();
  const {tools} = (await s.request('tools/list')).result;
  const forms = [];
  (function walk(node) {
   if (!node || typeof node !== 'object') return;
   if (Array.isArray(node)) { node.forEach(walk); return; }
   if (node.properties?.op?.const === 'deduplicate') forms.push(node);
   for (const value of Object.values(node)) walk(value);
  })(tools.find(t => t.name === 'tedata_data').inputSchema);
  // Two distinct forms (the recipe schema appears once per action that takes one), so a reader of the
  // schema sees the rule the validator applies.
  assert.ok(forms.length >= 2, JSON.stringify(forms));
  assert.equal(new Set(forms.map(f => JSON.stringify(f))).size, 2, JSON.stringify(forms));
  const unique = forms.find(f => f.properties.keep.const === 'unique'), keyed = forms.find(f => Array.isArray(f.properties.keep.enum));
  assert.ok(unique && keyed, JSON.stringify(forms));
  assert.equal(unique.properties.keep.default, 'unique');
  assert.deepEqual(Object.keys(unique.properties).sort(), ['keep', 'op']);
  assert.deepEqual(keyed.properties.keep.enum, ['first', 'last']);
  for (const field of ['columns', 'orderBy']) assert.ok(keyed.required.includes(field), `${field} is optional for first/last`);
  // The validator agrees with the schema, and a refusal names the field and the step.
  const fileId = 'a'.repeat(24), fingerprint = 'sha256:' + 'b'.repeat(64);
  const derive = steps => s.call('tedata_data', {request: {action: 'preview_derive', fileId, fingerprint, revision: 0, recipe: {version: 1, basis: 'raw', steps}}});
  // The server answers an invalid call as a tool error whose text starts with the -32602 code.
  const refused = (response, detail) => { assert.equal(response.result?.isError, true, text(response)); assert.match(text(response), /^MCP error -32602: /); assert.match(text(response), detail); };
  refused(await derive([{op: 'deduplicate', columns: ['date', 'city'], keep: 'unique'}]), /"columns" at request\.recipe\.steps\[0\]/);
  refused(await derive([{op: 'deduplicate', columns: ['date', 'city'], keep: 'first'}]), /at request\.recipe\.steps\[0\]\.orderBy/);
  // Both valid forms pass the schema; with no such file connected the server then answers in its own words.
  for (const steps of [[{op: 'deduplicate'}], [{op: 'deduplicate', keep: 'unique'}], [{op: 'deduplicate', keep: 'last', columns: ['date'], orderBy: [{column: 'city'}]}]]) {
   const accepted = await derive(steps);
   assert.doesNotMatch(text(accepted), /-32602/);
   assert.match(text(accepted), /Choose a connected CSV, TSV, or ZIP file/);
  }
  // An unknown action is refused with the list of actions, not "Invalid input".
  refused(await s.call('tedata_data', {request: {action: 'nope'}}), /'catalog'.*'evidence_catalog'.*at request\.action/);
 } finally { await s.close(); }
});

test('a layout saved before a column interpretation names the configure action', async () => {
 // A profile cache record written by this test stands in for the Python worker, which no test runs.
 const s = await start();
 try {
  await s.initialize();
  const csv = await file(join(s.project, 'data', 'measurements.csv'), 'date,city,high\n2026-10-01,Oslo,5\n2026-10-02,Oslo,7\n');
  const added = await s.call('tedata_sources', {action: 'add', kind: 'source', path: csv});
  assert.notEqual(added.result.isError, true, text(added));
  const fileId = JSON.parse(text(await s.call('tedata_data', {request: {action: 'catalog'}}))).files[0].id;
  const {fingerprint, revision} = JSON.parse(text(await s.call('tedata_data', {request: {action: 'state', fileId}})));
  const workerText = [];
  for (const name of ['data_worker.py', 'summary_worker.py', 'validation_worker.py', 'derivation_worker.py']) workerText.push(await readFile(fileURLToPath(new URL(`../worker/${name}`, import.meta.url)), 'utf8'));
  const worker = createHash('sha256').update(workerText.join('\0')).digest('hex'), key = `${fileId}:${fingerprint}:null:undefined`;
  const record = `${worker.slice(0, 12)}-${createHash('sha256').update(JSON.stringify({version: 1, worker, key})).digest('hex')}.json`;
  const profile = {kind: 'profile', fileId, fingerprint, revision, rows: 2, rawColumns: ['date', 'city', 'high'], rawRows: [['2026-10-01', 'Oslo', '5']],
   columns: ['date', 'city', 'high'].map(name => ({name, source: name, type: 'text', missing: 0, invalid: 0}))};
  await file(join(s.project, '.tedata', 'cache', 'profiles', record), JSON.stringify({version: 1, worker, key, profile}));
  const poll = async response => { let job = JSON.parse(text(response)); while (job.state === 'running') job = JSON.parse(text(await s.call('tedata_data', {request: {action: 'poll', jobId: job.jobId}}))); return job; };
  assert.equal((await poll(await s.call('tedata_data', {request: {action: 'profile', fileId}}))).kind, 'profile');
  const layout = {version: 1, title: 'Highs', sections: [{title: 'Highs', blocks: [{id: 'highs', type: 'chart', title: 'High by date', chart: {x: 'date', y: 'high', series: 'city', chartType: 'line'}}, {id: 'rows', type: 'table'}]}]};
  const job = await poll(await s.call('tedata_data', {request: {action: 'save_view', fileId, fingerprint, revision, view: {layout}}}));
  assert.equal(job.state, 'error', JSON.stringify(job));
  assert.match(job.error, /^Save a column interpretation before composing a layout \(tedata_data action configure, or tedata_prepare with a configuration\)\.$/);
 } finally { await s.close(); }
});

test('tedata_derive says that a preview lives only in the running server', async () => {
 const s = await start();
 try {
  await s.initialize();
  const {tools} = (await s.request('tools/list')).result;
  assert.match(tools.find(t => t.name === 'tedata_derive').description, /restart[^.]*preview/i);
 } finally { await s.close(); }
});
