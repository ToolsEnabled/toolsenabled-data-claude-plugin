// The worker protocol is UTF-8 bytes, independent of redirected Windows locale.
import test from 'node:test';
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp, mkdir, copyFile, readFile} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url)),python=process.env.TEDATA_PYTHON;
const skip=python?false:'needs pinned DuckDB: set TEDATA_PYTHON';
const scratch=await mkdtemp(join(tmpdir(),'tedata-worker-protocol-'));
// Retain the explicitly scoped synthetic protocol evidence for failed runs.
console.log('Retained worker protocol scratch: '+JSON.stringify(scratch));
async function run(input,serve){
 const env=Object.fromEntries(['PATH','SystemRoot','WINDIR','TEMP','TMP','TMPDIR'].filter(k=>process.env[k]!==undefined).map(k=>[k,process.env[k]]));
 Object.assign(env,{PYTHONIOENCODING:'cp1252:strict',PYTHONDONTWRITEBYTECODE:'1'});
 const child=spawn(python,[join(root,'worker/data_worker.py'),...(serve?['--serve']:[])],{cwd:root,env,stdio:['pipe','pipe','pipe'],windowsHide:true});
 const out=[],err=[];let bytes=0,overflow=false;
 for(const [stream,target] of [[child.stdout,out],[child.stderr,err]])stream.on('data',part=>{if((bytes+=part.length)>1024*1024){overflow=true;child.kill('SIGKILL')}else target.push(part)});
 child.stdin.on('error',()=>{});
 const close=new Promise((resolve,reject)=>{child.once('error',reject);child.once('close',(code,signal)=>resolve({code,signal}))});
 const timer=setTimeout(()=>child.kill('SIGKILL'),30000);child.stdin.end(input);
 let exit;try{exit=await close}finally{clearTimeout(timer)}
 assert(!overflow,'bounded raw worker output exceeded1MiB');
 const stdout=Buffer.concat(out),stderr=Buffer.concat(err);
 const decoded=new TextDecoder('utf-8',{fatal:true}).decode(stdout);
 return {...exit,stdout,stderr,replies:decoded.trim()?decoded.trim().split(/\r?\n/).map(line=>JSON.parse(line)):[]};
}
async function sample(directory,name='sample.csv'){
 await mkdir(directory,{recursive:true});const file=join(directory,name);await copyFile(join(root,'examples/sample.csv'),file);return file;
}
const frame=path=>Buffer.from(JSON.stringify({action:'profile',path})+'\n','utf8');
test('serving worker profiles exact BMP and astral paths under a legacy redirected locale',{skip},async()=>{
 const file=await sample(join(scratch,"owner's résumé 中文 🚀")),before=await readFile(file);
 const result=await run(frame(file),true);assert.equal(result.code,0,result.stderr.toString());assert.equal(result.stderr.length,0);assert.equal(result.replies.length,1);assert.equal(result.replies[0].kind,'profile');assert.equal(result.replies[0].rows,30);assert.deepEqual(await readFile(file),before);
});
test('single-request worker uses the same exact UTF-8 protocol under a legacy locale',{skip},async()=>{
 const file=await sample(join(scratch,"single résumé 中文 🚀"));const result=await run(frame(file),false);
 assert.equal(result.code,0,result.stderr.toString());assert.equal(result.stderr.length,0);assert.equal(result.replies[0].kind,'profile');assert.equal(result.replies[0].rows,30);
});
test('invalid UTF-8 is refused before profiling a path that a legacy decoder would accept',{skip},async()=>{
 const file=await sample(scratch,'read-ÿ.csv'),before=await readFile(file),valid=frame(file),needle=Buffer.from('ÿ','utf8'),at=valid.indexOf(needle);assert(at>=0);
 const malformed=Buffer.concat([valid.subarray(0,at),Buffer.from([255]),valid.subarray(at+needle.length)]);
 const served=await run(Buffer.concat([malformed,valid]),true);assert.equal(served.code,0,served.stderr.toString());assert.equal(served.stderr.length,0);assert.deepEqual(served.replies[0],{error:'Invalid data request.'});assert.equal(served.replies[1].rows,30);
 const single=await run(malformed,false);assert.equal(single.code,1);assert.equal(single.stdout.length,0);assert.match(single.stderr.toString(),/UnicodeDecodeError/);assert.deepEqual(await readFile(file),before);
});
