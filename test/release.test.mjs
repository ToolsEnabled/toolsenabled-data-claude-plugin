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

test('the licence inventory is in files the directory can read in full, and no text was lost', async () => {
 const index = await readFile(join(root, 'THIRD-PARTY-LICENSES.txt'), 'utf8');
 const parts = [...index.matchAll(/^- (licenses\/[a-z0-9-]+\.txt): /gm)].map(match => match[1]);
 assert.deepEqual(parts, ['licenses/javascript-1.txt', 'licenses/javascript-2.txt', 'licenses/duckdb.txt']);
 assert.deepEqual((await readdir(join(root, 'licenses'))).sort(), ['duckdb.txt', 'javascript-1.txt', 'javascript-2.txt']);
 const texts = [index, ...await Promise.all(parts.map(path => readFile(join(root, path), 'utf8')))];
 for (const text of texts) assert.ok(Buffer.byteLength(text) <= 256 * 1024, Buffer.byteLength(text) + ' bytes');
 // The index's first six lines and the parts, joined, are THIRD-PARTY-LICENSES.txt as one file: 0.8.7's text with
 // TE Data named in place of Bench and no other byte changed (457,672 bytes). The licence texts of json-schema-typed
 // and tslib keep their CRLF line ends, as in 0.8.7: 68 carriage returns.
 const joined = index.split('\n').slice(0, 6).join('\n') + '\n' + texts.slice(1).join('');
 assert.equal(joined.split('\r').length - 1, 68, 'carriage returns');
 assert.equal(Buffer.byteLength(joined), 457672);
 assert.equal(createHash('sha256').update(joined).digest('hex'), '16ad26acad685d5e85ecf5c0bb476dc291513e80000333f45c03bd9c80beee6e');
});

// The bundled server's text changes since 0.8.7, each as [text now, text in 0.8.7]. Undoing them must give 0.8.7's
// server/tedata-server.mjs exactly, so the readable parts are that bundle plus these edits and nothing else.
const SERVER_EDITS_SINCE_087 = [
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
 ["// paths.mjs\n// The plugin stores the panel as panel/panel-01.html to panel-13.html, each under 256 KiB so that it can be read in\n// full; joined in order they are the one HTML document (panelFile) that the panel resource serves.\n",
  "// paths.mjs\n"],
 [", panelParts = packaged ? [\"panel-01.html\", \"panel-02.html\", \"panel-03.html\", \"panel-04.html\", \"panel-05.html\", \"panel-06.html\", \"panel-07.html\", \"panel-08.html\", \"panel-09.html\", \"panel-10.html\", \"panel-11.html\", \"panel-12.html\", \"panel-13.html\"].map((name2) => join8(pluginRoot, \"panel\", name2)) : [panelFile], requirementsFile",
  ", requirementsFile"],
 ["text: (await Promise.all(panelParts.map((part) => readFile7(part, \"utf8\")))).join(\"\"), _meta",
  "text: await readFile7(panelFile, \"utf8\"), _meta"],
];
test('the server is stored in ES modules the directory can read in full, and they join to the bundle', async () => {
 const server = join(root, 'server'), entry = 'tedata-server.mjs';
 const parts = [...(await readdir(server)).filter(name => /^tedata-server-\d\d-[a-z-]+\.mjs$/.test(name)).sort(), entry];
 assert.ok(parts.length > 1, parts.join(' '));
 let bundle = '';
 for (const [index, name] of parts.entries()) {
  const source = await readFile(join(server, name), 'utf8'), label = `part ${index + 1} of ${parts.length}`;
  assert.ok(Buffer.byteLength(source) <= 256 * 1024, name);
  const begin = `// Bundle text, ${label}\n`, end = `// End of bundle text, ${label}\n`;
  const from = source.indexOf(begin), to = source.lastIndexOf(end);
  assert.ok(from > 0 && to >= from + begin.length, name);
  // Outside the bundle text a part has only comments, imports of other parts and one export list.
  assert.match(source.slice(0, from), /^(\/\/ [^\n]*\n|import "\.\/tedata-server-\d\d-[a-z-]+\.mjs";\n|import \{[\w$,\s]+\} from "\.\/tedata-server(-\d\d-[a-z-]+)?\.mjs";\n)+$/, name);
  assert.match(source.slice(to + end.length), /^(export \{[\w$,\s]+\};\n)?$/, name);
  if (index > 0) assert.ok(source.includes(`\nimport "./${parts[index - 1]}";\n`), `${name} first loads the part before it`);
  bundle += source.slice(from + begin.length, to);
 }
 for (const [now, before] of SERVER_EDITS_SINCE_087) { assert.equal(bundle.split(now).length, 2, now); bundle = bundle.replace(now, before); }
 // 0.8.7's server/tedata-server.mjs: 3,227,443 bytes.
 assert.equal(Buffer.byteLength(bundle), 3227443);
 assert.equal(createHash('sha256').update(bundle).digest('hex'), '59459e7f9064d4a605b344968db7df5ac3621f5ac4c57038f3292451d8559b7e');
});
test('no file in the plugin is larger than 256 KiB, so the directory can read every file in full', async () => {
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
 assert.deepEqual(large, []);
});
