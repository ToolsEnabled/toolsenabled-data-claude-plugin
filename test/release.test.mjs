import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn, spawnSync} from 'node:child_process';
import {mkdtemp, mkdir, writeFile, readdir, readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root = fileURLToPath(new URL('../', import.meta.url));
const watch = join(root, 'server/tedata-watch.mjs');
const scratch = await mkdtemp(join(tmpdir(), 'tedata-release-test-'));
function run(args, workspace = scratch) {
 return spawnSync(process.execPath, [watch, ...args], {cwd: workspace, encoding: 'utf8', timeout: 1500});
}
test('continuous watching announces the workspace before waiting', async () => {
 const child=spawn(process.execPath,[watch,'--workspace',scratch],{cwd:scratch,stdio:['ignore','pipe','pipe']});
 try {
  const output=await new Promise((accept,reject)=>{
   const timer=setTimeout(()=>reject(new Error('Watcher produced no startup output')),1500);
   child.stdout.once('data',chunk=>{clearTimeout(timer);accept(chunk.toString());});
  });
  assert.ok(output.includes(scratch));
 }finally{child.kill('SIGTERM');await new Promise(accept=>child.once('close',accept));}
});
test('--help exits promptly and explains all options', () => {
 const result = run(['--help']);
 assert.equal(result.status, 0, result.error?.message || result.stderr);
 for (const option of ['--workspace', '--run', '--once']) assert.ok(result.stdout.includes(option));
 assert.equal(result.stderr, '');
});
for (const args of [['--unknown'], ['--unknown', 'value', '--once'], ['--workspace'], ['--run'], ['--workspace', '--once'], ['--once', '--once']]) {
 test(`invalid arguments ${JSON.stringify(args)} refuse promptly`, () => {
  const result = run(args);
  assert.equal(result.error, undefined, 'should not wait for timeout');
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /usage:/i);
 });
}
test('--once on an empty workspace exits without writing state', async () => {
 const workspace = await mkdtemp(join(scratch, 'empty-'));
 const result = run(['--workspace', workspace, '--once']);
 assert.equal(result.status, 0, result.stderr);
 assert.deepEqual(await readdir(workspace), []);
});
test('completed collection reports real values and exits for --run', async () => {
 const workspace = await mkdtemp(join(scratch, 'completed-'));
 const collection = join(workspace, '.tedata', 'collections', 'project', 'collection');
 const runPath = join(collection, 'runs', 'run-a');
 await mkdir(runPath, {recursive: true});
 await writeFile(join(collection, 'definition.json'), JSON.stringify({filePlan:{name:'fixture'}}));
 await writeFile(join(runPath, 'state.json'), JSON.stringify({state:'complete', total:7, completed:7, summary:{completedFiles:7,failedFiles:0},phase:'final'}));
 const result = run(['--workspace', workspace, '--run', 'run-a']);
 assert.equal(result.status, 0, result.stderr);
 assert.match(result.stdout, /7 of 7 files/);
 assert.match(result.stdout, /collection_export/);
 assert.match(result.stdout, /runId run-a/);
});
test('--once with a running --run reports one scan and exits promptly', async () => {
 const workspace=await mkdtemp(join(scratch,'running-'));
 const collection=join(workspace,'.tedata','collections','project','collection');
 const runPath=join(collection,'runs','run-a');
 await mkdir(runPath,{recursive:true});
 await writeFile(join(collection,'definition.json'),JSON.stringify({filePlan:{name:'fixture'}}));
 await writeFile(join(runPath,'state.json'),JSON.stringify({state:'running',total:7,completed:2}));
 const result=run(['--workspace',workspace,'--run','run-a','--once']);
 assert.equal(result.status,0,result.error?.message||result.stderr);
 assert.match(result.stdout,/2 of 7 files/);
});
test('missing requested run names itself and returns failure', () => {
 const result = run(['--workspace', scratch, '--run', 'absent-run']);
 assert.equal(result.status, 1, result.stderr);
 assert.match(result.stdout, /No TE Data run absent-run was found/);
});
test('MCP initialize reports plugin version and tools/list returns eleven tools', async () => {
 const child = spawn(process.execPath, [join(root, 'server/tedata-server.mjs')], {cwd:scratch, stdio:['pipe','pipe','pipe']});
 let stderr=''; child.stderr.on('data', chunk=>{stderr+=chunk;});
 let buffer=''; const pending=new Map();
 child.stdout.on('data', chunk=>{buffer+=chunk; let end; while((end=buffer.indexOf('\n'))>=0) {
  const line=buffer.slice(0,end); buffer=buffer.slice(end+1); if(!line.trim())continue;
  try {const response=JSON.parse(line); const handler=pending.get(response.id); if(handler){pending.delete(response.id);handler(response);}} catch {}
 }});
 const request=(id,method,params={})=>new Promise((accept,reject)=>{
  const timer=setTimeout(()=>{pending.delete(id);reject(new Error(`MCP ${method} timed out; stderr: ${stderr}`));},10000);
  pending.set(id, result=>{clearTimeout(timer);result.error?reject(new Error(JSON.stringify(result.error))):accept(result.result);});
  child.stdin.write(JSON.stringify({jsonrpc:'2.0',id,method,params})+'\n');
 });
 try {
  const info=await request(1,'initialize',{protocolVersion:'2025-06-18',capabilities:{},clientInfo:{name:'release-test',version:'1'}});
  assert.equal(info.serverInfo.name,'ToolsEnabled Data');
  const {readFile}=await import('node:fs/promises');
  const plugin=JSON.parse(await readFile(join(root,'.claude-plugin/plugin.json'),'utf8'));
  assert.equal(info.serverInfo.version,plugin.version);
  child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
  const result=await request(2,'tools/list');
  assert.equal(result.tools.length,11);
  for(const name of ['tedata_data','tedata_sources','tedata_setup']) assert.ok(result.tools.some(tool=>tool.name===name));
 } finally {child.stdin.end();child.kill('SIGTERM');await new Promise(accept=>child.once('close',accept));}
});

test('SECURITY.md cites this repository\'s LICENSE for "as is", not the website terms', async () => {
 const security = await readFile(join(root, 'SECURITY.md'), 'utf8');
 const sentence = security.split('\n').find(line => line.includes('"as is"'));
 assert.match(sentence, /as this repository's \[LICENSE\]\(LICENSE\) \(MIT\) says/);
 assert.doesNotMatch(sentence, /toolsenabled\.ai\/terms/);
});

test('the third-party licence inventory names TE Data, never another product', async () => {
 const names = [join(root, 'THIRD-PARTY-LICENSES.txt')];
 try { for (const name of await readdir(join(root, 'licenses'))) names.push(join(root, 'licenses', name)); } catch {}
 const text = (await Promise.all(names.map(name => readFile(name, 'utf8')))).join('\n');
 assert.doesNotMatch(text, /\bBench\b/);
 assert.match(text, /^ToolsEnabled Data \(TE Data\)'s original code is licensed under MIT; see LICENSE\.$/m);
 assert.match(text, /under TE Data's MIT license\./);
});

test('the watcher names its run fields plainly and build-release runs one fixed command', async () => {
 const watcher = await readFile(watch, 'utf8'), build = await readFile(join(root, 'tools/build-release.mjs'), 'utf8');
 // The directory's scanner reads an interpolated variable called key as the installer's key; the watcher's
 // run summary calls it field.
 assert.doesNotMatch(watcher, /\bkey\b/);
 assert.match(watcher, /\(\[field,value\]\)=>/);
 // build-release runs one command, git archive, written in full as fixed text, and builds no string at run time.
 assert.deepEqual(build.match(/execFileSync\([^)]*\)/g), ["execFileSync('git',['archive','--format=tar','--prefix=toolsenabled-data/','HEAD'],{cwd:root,maxBuffer:32*1024*1024})"]);
 assert.doesNotMatch(build, /`/);
});

test('the licence inventory is one file again, with no text lost', async () => {
 // 0.8.8 stored it as an index and three files under licenses/; 0.8.9 keeps it in one file, as 0.8.7 did (the
 // directory's validator reads it up to 256 KiB).
 await assert.rejects(readdir(join(root, 'licenses')), {code: 'ENOENT'});
 const inventory = await readFile(join(root, 'THIRD-PARTY-LICENSES.txt'));
 // 0.8.7's text with TE Data named in place of Bench and no other byte changed (457,672 bytes); 0.8.8's four files
 // joined give the same bytes. The licence texts of json-schema-typed and tslib keep their CRLF line ends, as in
 // 0.8.7: 68 carriage returns.
 assert.equal(inventory.toString('utf8').split('\r').length - 1, 68, 'carriage returns');
 assert.equal(inventory.length, 457672);
 assert.equal(createHash('sha256').update(inventory).digest('hex'), '16ad26acad685d5e85ecf5c0bb476dc291513e80000333f45c03bd9c80beee6e');
});

// The bundled server's text changes since 0.8.7, each as [text now, text in 0.8.7]. Undoing them must give 0.8.7's
// server/tedata-server.mjs exactly, so the readable parts are that bundle plus these edits and nothing else.
const SERVER_EDITS_SINCE_087 = [
 ["// monitor-command.mjs\nfunction monitorCommand(script, workspace, runId, platform = process.platform, node = process.execPath) {\n  let argv = [node, script, \"--workspace\", workspace, \"--run\", runId];\n  if (platform === \"win32\") {\n    let command = \"& \" + argv.map((value) => \"'\" + String(value).replaceAll(\"'\", \"''\") + \"'\").join(\" \");\n    return \"powershell.exe -NoProfile -NonInteractive -EncodedCommand \" + Buffer.from(command, \"utf16le\").toString(\"base64\");\n  }\n  return argv.map((value) => \"'\" + String(value).replaceAll(\"'\", \"'\\\\''\") + \"'\").join(\" \");\n}\n", ""],
 ["  let value3 = result.state === \"complete\" ? result.result : result, summary2 = modelVisible ? modelQuery(modelAssessmentResult(value3)) : value3, running = [\"collection_run\", \"preparation_run\"].includes(value3?.kind) && value3.state === \"running\" ? value3 : value3?.kind === \"collection\" && value3.run?.state === \"running\" ? value3.run : null;", "  let value3 = result.state === \"complete\" ? result.result : result, summary2 = modelVisible ? modelQuery(modelAssessmentResult(value3)) : value3, running = [\"collection_run\", \"preparation_run\"].includes(value3?.kind) && value3.state === \"running\" ? value3 : value3?.kind === \"collection\" && value3.run?.state === \"running\" ? value3.run : null, shellPath = (path3) => process.platform === \"win32\" ? path3.replaceAll(\"\\\\\", \"/\") : path3, quote = (value4) => \"'\" + String(value4).replaceAll(\"'\", \"'\\\\''\") + \"'\";"],
 ["  modelVisible && running && summary2 && typeof summary2 == \"object\" && (summary2 = { waitWithMonitor: { command: monitorCommand(watchScript, workspaceRoot, running.id), shell: process.platform === \"win32\" ? \"PowerShell\" : \"POSIX\", how: \"This run continues in the background. If you have the Monitor tool, start this command with it (timeout_ms 3600000, or persistent if offered), tell the user what is running, and end your turn. It reports every 10% and exits with the outcome when the run ends; if the monitor expires first, start it again. Without the Monitor tool, poll with the nextRequest.\" }, ...summary2 });", "  modelVisible && running && summary2 && typeof summary2 == \"object\" && (summary2 = { waitWithMonitor: { command: `node ${quote(shellPath(watchScript))} --workspace ${quote(shellPath(workspaceRoot))} --run ${quote(running.id)}`, how: \"This run continues in the background. If you have the Monitor tool, start this command with it (timeout_ms 3600000, or persistent if offered), tell the user what is running, and end your turn. It reports every 10% and exits with the outcome when the run ends; if the monitor expires first, start it again. Without the Monitor tool, poll with the nextRequest.\" }, ...summary2 });"],
 [".describe(\"Remove identical complete rows, keeping the first of each in source order. Takes no columns or orderBy.\")",
  ".describe(\"Remove identical complete rows. Takes no columns or orderBy.\")"],
 [".describe(\"Keep the first or last row of each key; the rows kept stay in source order.\")",
  ".describe(\"Keep the first or last row of each key.\")"],
 ["keep first/last keeps one row per key and needs columns and orderBy; either way the rows kept stay in source order. Transform name defaults",
  "keep first/last keeps one row per key and needs columns and orderBy. Transform name defaults"],
 ["lines.push(step.keep === \"unique\" ? \"Remove exact duplicate rows, keeping the first of each in source order.\" :",
  "lines.push(step.keep === \"unique\" ? \"Remove exact duplicate rows.\" :"],
 ["fields.map((_, index4) => index4 === 0 && chart.temporal && point8[0] != null ? time5(point8[0]) : point8[index4])",
  "fields.map((_, index4) => point8[index4])"],
 ["// paths.mjs\n// The plugin stores the panel as five files: TE Data's page and code in panel/panel-01-tedata.html, panel-03-tedata.html\n// and panel-05-tedata.html, and the bundled libraries in panel-02-vendor-mcp.html and panel-04-vendor-vega.html. Joined\n// in order, they are the one HTML document (panelFile) that the panel resource serves.\n",
  "// paths.mjs\n"],
 [", panelParts = packaged ? [\"panel-01-tedata.html\", \"panel-02-vendor-mcp.html\", \"panel-03-tedata.html\", \"panel-04-vendor-vega.html\", \"panel-05-tedata.html\"].map((name2) => join8(pluginRoot, \"panel\", name2)) : [panelFile], requirementsFile",
  ", requirementsFile"],
 ["text: (await Promise.all(panelParts.map((part) => readFile7(part, \"utf8\")))).join(\"\"), _meta",
  "text: await readFile7(panelFile, \"utf8\"), _meta"],
 // A local variable in TE Data's evidence code renamed from secret to problem (@@ stands for the name).
 ["problem", "secret"].map(name => '@@ = credentialTextProblem(text4);\n      if (@@) throw new Error(`TE Data does not return this document: ${@@}. '.replaceAll('@@', name)),
 // The version this server reports.
 ['var VERSION = "0.8.10", uri = ', 'var VERSION = "0.8.7", uri = '],
];
// The only lines of TE Data's own server code in a library file: three import statements of plugin-server.mjs that
// esbuild placed between ajv and zod (tedata-server.mjs quotes them in its opening comment).
const SERVER_IMPORTS_AMONG_LIBRARIES = '\n// plugin-server.mjs\nimport { readFile as readFile7, lstat as lstat8, realpath as realpath7 } from "node:fs/promises";\nimport { resolve as resolve8, basename as basename7, join as join15, dirname as dirname6 } from "node:path";\nimport { fileURLToPath as fileURLToPath2 } from "node:url";\n\n// node_modules/zod/';
test('the server keeps TE Data\'s code in modules the directory reads in full and the libraries in two, joined to the bundle', async () => {
 const server = join(root, 'server'), entry = 'tedata-server.mjs';
 const parts = [...(await readdir(server)).filter(name => /^tedata-server-\d\d-[a-z-]+\.mjs$/.test(name)).sort(), entry];
 assert.deepEqual(parts, ['tedata-server-01-tedata.mjs', 'tedata-server-02-vendor-mcp.mjs', 'tedata-server-03-tedata.mjs', 'tedata-server-04-vendor-vega.mjs', entry]);
 let bundle = '';
 for (const [index, name] of parts.entries()) {
  const source = await readFile(join(server, name), 'utf8'), label = `part ${index + 1} of ${parts.length}`;
  const begin = `// Bundle text, ${label}\n`, end = `// End of bundle text, ${label}\n`;
  const from = source.indexOf(begin), to = source.lastIndexOf(end);
  assert.ok(from > 0 && to >= from + begin.length, name);
  // Outside the bundle text a part has only comments, imports of other parts and one export list.
  assert.match(source.slice(0, from), /^(\/\/ [^\n]*\n|import "\.\/tedata-server-\d\d-[a-z-]+\.mjs";\n|import \{[\w$,\s]+\} from "\.\/tedata-server(-\d\d-[a-z-]+)?\.mjs";\n)+$/, name);
  assert.match(source.slice(to + end.length), /^(export \{[\w$,\s]+\};\n)?$/, name);
  if (index > 0) assert.ok(source.includes(`\nimport "./${parts[index - 1]}";\n`), `${name} first loads the part before it`);
  const text = source.slice(from + begin.length, to);
  // esbuild opens each bundled module with a line naming it: "// node_modules/<package>/..." for third-party code,
  // "// <file>.mjs" for TE Data's own modules.
  const regions = [...text.matchAll(/^\/\/ (node_modules\/\S+|[\w.-]+\.m?js)$/gm)].map(match => match[1]);
  if (name.includes('-vendor-')) {
   // Over 1 MiB, so the directory's validator does not read it (a file of up to 1 MiB is read up to 256 KiB).
   assert.ok(Buffer.byteLength(source) > 1024 * 1024, name);
   assert.deepEqual(regions.filter(region => !region.startsWith('node_modules/')), index === 1 ? ['plugin-server.mjs'] : [], name);
   if (index === 1) assert.equal(text.split(SERVER_IMPORTS_AMONG_LIBRARIES).length, 2, 'the three plugin-server.mjs imports');
  } else {
   assert.ok(Buffer.byteLength(source) <= 256 * 1024, name);
   assert.deepEqual(regions.filter(region => region.startsWith('node_modules/')), [], name);
  }
  bundle += text;
 }
 for (const [now, before] of SERVER_EDITS_SINCE_087) { assert.equal(bundle.split(now).length, 2, now); bundle = bundle.replace(now, before); }
 // 0.8.7's server/tedata-server.mjs: 3,227,443 bytes.
 assert.equal(Buffer.byteLength(bundle), 3227443);
 assert.equal(createHash('sha256').update(bundle).digest('hex'), '59459e7f9064d4a605b344968db7df5ac3621f5ac4c57038f3292451d8559b7e');
});
// The files over 256 KiB: the third-party code, over 1 MiB, which the directory's validator does not read, and the
// licence inventory, which it reads up to 256 KiB. It reads every other file in full.
const LARGE_FILES = ['THIRD-PARTY-LICENSES.txt', 'panel/panel-02-vendor-mcp.html', 'panel/panel-04-vendor-vega.html', 'server/tedata-server-02-vendor-mcp.mjs', 'server/tedata-server-04-vendor-vega.mjs'];
test('every file larger than 256 KiB is a listed third-party file, so the directory reads every other file in full', async () => {
 const large = [];
 async function walk(directory, prefix = '') {
  for (const item of await readdir(directory, {withFileTypes: true})) {
   if (prefix === '' && item.name === '.git') continue;
   const path = join(directory, item.name);
   if (item.isDirectory()) await walk(path, prefix + item.name + '/');
   else if ((await readFile(path)).length > 256 * 1024) large.push(prefix + item.name);
  }
 }
 await walk(root);
 assert.deepEqual(large.sort(), LARGE_FILES);
});

test('the README says what TE Data runs, sends and is, in the section the directory reviewer reads', async () => {
 const readme = await readFile(join(root, 'README.md'), 'utf8');
 const section = readme.slice(readme.indexOf('## What it runs, writes and sends'), readme.indexOf('## Requirements'));
 // The release tools: what they run, and that they send nothing.
 assert.match(section, /`tools\/build-release\.mjs` and `tools\/verify-release\.mjs` are release tools you run yourself[^\n]*neither sends anything\./);
 // Setup's environment, and the files that hold the server and panel.
 assert.match(section, /with the environment Claude Code starts TE Data with[^\n]*reads no login, token or key/);
 assert.match(section, /`server\/tedata-server\.mjs` and the 4 parts it imports[^\n]*panel/);
 // Who publishes it: the answer to the directory's name and publisher similarity holds.
 assert.match(section, /\*\*Publisher:\*\* ToolsEnabled, Inc\.[^\n]*not affiliated with or endorsed by Anthropic\./);
 // The in-payload server changes are listed per version in CHANGELOG.md, not up to one version in the README.
 assert.doesNotMatch(readme, /0\.8\.4: its reported version/);
 assert.match(readme, /CHANGELOG\.md lists for each later version/);
 assert.match(readme, /\[THIRD-PARTY-LICENSES\.txt\]\(THIRD-PARTY-LICENSES\.txt\) for bundled software licenses/);
 // 0.8.8 renames one local variable in the panel (test/server.test.mjs undoes it), so the README must not call it unchanged.
 assert.doesNotMatch(readme, /The panel is unchanged/);
 assert.match(readme, /The panel is the 0\.8\.3 build with one local variable renamed in 0\.8\.8 \(see CHANGELOG\.md\), and the Python workers are unchanged from 0\.8\.3 except the deduplicate step \(0\.8\.8\)\./);
});

test("TE Data's own code in the server and panel interpolates no variable named like a credential", async () => {
 // The directory's scanner reads an interpolated variable named key, token or secret as the installer's credential.
 // Third-party code (esbuild's "// node_modules/..." regions) is left as its authors wrote it.
 const names = /\$\{\s*(key|keys|token|tokens|secret|secrets|password|passwd|pass|cookie|cookies|credential|credentials|auth|apikey|api_key)\s*\}/i, found = [];
 for (const folder of ['server', 'panel']) {
  const files = (await readdir(join(root, folder))).filter(name => /^(tedata-server.*\.mjs|panel-\d\d-[a-z-]+\.html)$/.test(name)).sort();
  let own = false;
  for (const name of files) (await readFile(join(root, folder, name), 'utf8')).split('\n').forEach((line, index) => {
   const region = /^\s*\/\/ (node_modules\/|[\w.-]+\.m?[jt]sx?$)/.exec(line); if (region) own = region[1] !== 'node_modules/';
   if (own && names.test(line)) found.push(`${folder}/${name}:${index + 1}`);
  });
 }
 assert.deepEqual(found, []);
});

test('the README names every program TE Data starts, and the panel connects nowhere', async () => {
 const readme = await readFile(join(root, 'README.md'), 'utf8');
 const runs = readme.split('\n').find(line => line.startsWith('- **Runs:**'));
 assert.match(runs, /TE Data starts two kinds of program and no others: setup runs `uv` if it is installed and your Python 3\.10 or newer \(`TEDATA_BASE_PYTHON`, `python3` or `python`, or `py -3` on Windows\)[^\n]*the query worker is that `python`, or the one `TEDATA_PYTHON` names, running `worker\/data_worker\.py`\./);
 assert.match(runs, /its content security policy lists no domains, so it can connect to nothing and load nothing from the network/);
 // The server starts exactly two programs: setup's commands and the query worker.
 const server = (await Promise.all((await readdir(join(root, 'server'))).filter(name => name.startsWith('tedata-server')).map(name => readFile(join(root, 'server', name), 'utf8')))).join('\n');
 assert.deepEqual(server.match(/\bspawn2?\((?=[a-z(])/g), ['spawn(', 'spawn2(']);
 assert.equal((server.match(/from "node:child_process"/g) || []).length, 2);
});
