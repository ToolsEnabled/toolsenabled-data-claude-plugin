import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp, mkdir, writeFile, readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(await readFile(join(root, '.codex-plugin/plugin.json'), 'utf8'));

test('Codex manifest launches real MCP without Claude context; local sources work and secrets refuse', {timeout: 30000}, async () => {
 const market = JSON.parse(await readFile(join(root, '.agents/plugins/marketplace.json'), 'utf8'));
 assert.equal(market.plugins.find(p => p.name === manifest.name).policy.installation, 'AVAILABLE');
 // Explicit empty hooks prevent default-file discovery; no lifecycle script is trusted.
 assert.deepEqual(manifest.hooks, {});
 const config = JSON.parse(await readFile(resolve(root, manifest.mcpServers), 'utf8'));
 const entry = Object.values(config.mcpServers)[0];
 const base = await mkdtemp(join(tmpdir(), 'data-codex-'));
 const project = join(base, 'project'), home = join(base, 'home');
 await mkdir(project); await mkdir(home);
 await writeFile(join(project, 'sample.csv'), 'label,value\nowned,7\n');
 await writeFile(join(project, '.env'), 'EXAMPLE_FAKE_TOKEN=synthetic-fixture\n');
 const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => !/^(CLAUDE|TEDATA|CODEX)_/.test(key)));
 Object.assign(env, {HOME:home, USERPROFILE:home, TEDATA_DATA_DIR:join(base, 'data'), CODEX_HOME:join(home, 'custom-codex')});
 const child = spawn(entry.command, entry.args.map(a => a.replaceAll('${CLAUDE_PLUGIN_ROOT}', root)), {cwd:project, env, stdio:['pipe','pipe','pipe']});
 let buffer='', stderr='', id=0; const pending=new Map();
 child.stderr.on('data', c => {stderr+=c;});
 child.stdout.on('data', c => {buffer+=c; let end; while((end=buffer.indexOf('\n'))>=0) {
  const line=buffer.slice(0,end); buffer=buffer.slice(end+1); if(!line.trim())continue;
  const r=JSON.parse(line), h=pending.get(r.id); if(h&&!r.method){pending.delete(r.id);h(r);}
 }});
 const request=(method,params={})=>new Promise((accept,reject)=>{const key=++id;
  const timer=setTimeout(()=>{pending.delete(key);reject(new Error(method+' timed out: '+stderr));},10000);
  pending.set(key,r=>{clearTimeout(timer);accept(r);});child.stdin.write(JSON.stringify({jsonrpc:'2.0',id:key,method,params})+'\n');});
 const call=(name,args)=>request('tools/call',{name,arguments:args});
 const text=r=>(r.result?.content||[]).filter(c=>c.type==='text').map(c=>c.text).join('\n');
 try {
  const init=await request('initialize',{protocolVersion:'2025-06-18',capabilities:{},clientInfo:{name:'codex-compatible',version:'1'}});
  assert.equal(init.error,undefined); child.stdin.write(JSON.stringify({jsonrpc:'2.0',method:'notifications/initialized'})+'\n');
  const status=await call('tedata_setup',{action:'status'}); assert.notEqual(status.result?.isError,true,text(status));
  const connected=await call('tedata_sources',{action:'add',kind:'source',path:'sample.csv'});
  assert.notEqual(connected.result?.isError,true,text(connected));
  const listed=await call('tedata_sources',{action:'list'}); assert.match(text(listed),/sample\.csv/);
  const refused=await call('tedata_sources',{action:'add',kind:'document',path:'.env'}); assert.equal(refused.result?.isError,true);
  assert.equal(await readFile(join(project,'sample.csv'),'utf8'),'label,value\nowned,7\n');
 } finally {child.stdin.end(); if(child.exitCode===null&&child.signalCode===null){const done=new Promise(r=>child.once('close',r));child.kill('SIGTERM');await done;}}
});
