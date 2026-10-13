import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn, spawnSync} from 'node:child_process';
import {mkdtemp, mkdir, writeFile, readdir} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
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
