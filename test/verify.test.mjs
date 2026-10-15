import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, symlink} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
const verify=fileURLToPath(new URL('../tools/verify-release.mjs',import.meta.url));
async function fixture(){
 const root=await mkdtemp(join(tmpdir(),'tedata-verifier-test-'));
 await mkdir(join(root,'.claude-plugin'));
 const files={'.claude-plugin/plugin.json':JSON.stringify({version:'0.8.4'}),'.claude-plugin/marketplace.json':JSON.stringify({metadata:{version:'0.8.4'}}),'sample.txt':'fixture\n'};
 const manifest={plugin:'toolsenabled-data',version:'0.8.4',files:[]};
 for(const [path,content]of Object.entries(files)){
  await writeFile(join(root,path),content);
  manifest.files.push({path,bytes:Buffer.byteLength(content),sha256:createHash('sha256').update(content).digest('hex')});
 }
 await writeFile(join(root,'RELEASE-MANIFEST.json'),JSON.stringify(manifest));
 return {root,manifest};
}
function run(root){return spawnSync(process.execPath,[verify,root],{encoding:'utf8',timeout:5000});}
test('valid manifest verifies every listed payload file',async()=>{
 const {root}=await fixture();const result=run(root);assert.equal(result.status,0,result.stderr);assert.match(result.stdout,/Verified 3 files/);
});
test('an invalid manifest plugin is refused',async()=>{
 const {root,manifest}=await fixture();manifest.plugin='another-plugin';await writeFile(join(root,'RELEASE-MANIFEST.json'),JSON.stringify(manifest));const result=run(root);assert.equal(result.status,1);assert.match(result.stderr,/Invalid release manifest/);
});
test('changed bytes are refused; restoring bytes returns GREEN',async()=>{
 const {root}=await fixture();const path=join(root,'sample.txt');
 await writeFile(path,'mutated\n');const red=run(root);assert.equal(red.status,1);assert.match(red.stderr,/sample.txt/);
 await writeFile(path,'fixture\n');const green=run(root);assert.equal(green.status,0,green.stderr);
});
test('an unlisted file is refused',async()=>{
 const {root}=await fixture();await writeFile(join(root,'unlisted.txt'),'extra');const result=run(root);assert.equal(result.status,1);assert.match(result.stderr,/unlisted.txt/);
});
test('unsafe manifest traversal is refused',async()=>{
 const {root,manifest}=await fixture();manifest.files[0].path='../outside';await writeFile(join(root,'RELEASE-MANIFEST.json'),JSON.stringify(manifest));const result=run(root);assert.equal(result.status,1);assert.match(result.stderr,/Invalid manifest path/);
});
test('listed symbolic link is refused even if target bytes match',async(t)=>{
 const {root,manifest}=await fixture();try{await symlink('sample.txt',join(root,'linked.txt'));}catch(error){if(process.platform==='win32'&&['EPERM','EACCES'].includes(error.code)){t.skip('File symlink creation privilege unavailable; junction refusal remains covered');return;}throw error;}manifest.files.push({...manifest.files[2],path:'linked.txt'});await writeFile(join(root,'RELEASE-MANIFEST.json'),JSON.stringify(manifest));const result=run(root);assert.equal(result.status,1);assert.match(result.stderr,/Symbolic link refused: linked.txt/);
});
test('duplicate entries cannot inflate the verified file count',async()=>{
 const {root,manifest}=await fixture();manifest.files.push(manifest.files[2]);await writeFile(join(root,'RELEASE-MANIFEST.json'),JSON.stringify(manifest));const result=run(root);assert.equal(result.status,1);assert.match(result.stderr,/Repeated manifest file/);
});
test('matching hashes do not hide disagreeing versions',async()=>{
 const {root,manifest}=await fixture();manifest.version='0.8.5';await writeFile(join(root,'RELEASE-MANIFEST.json'),JSON.stringify(manifest));const result=run(root);assert.equal(result.status,1);assert.match(result.stderr,/versions disagree/);
});
test('the one listing image in .claude-plugin verifies unlisted; a second image, or one elsewhere, is refused',async()=>{
 const {root}=await fixture();await writeFile(join(root,'.claude-plugin','listing.png'),'png bytes');
 const one=run(root);assert.equal(one.status,0,one.stderr);assert.match(one.stdout,/Verified 3 files/);
 await writeFile(join(root,'.claude-plugin','second.png'),'png bytes');const two=run(root);assert.equal(two.status,1);assert.match(two.stderr,/Only one listing image/);
 const {root:other}=await fixture();await mkdir(join(other,'images'));await writeFile(join(other,'images','listing.png'),'png bytes');
 const elsewhere=run(other);assert.equal(elsewhere.status,1);assert.match(elsewhere.stderr,/Unlisted or non-regular file: images\/listing.png/);
});

test('a linked directory is refused without reading its target payload',async()=>{
 const {root,manifest}=await fixture();await symlink(root,join(root,'linked-dir'),process.platform==='win32'?'junction':'dir');
 manifest.files.push({...manifest.files[2],path:'linked-dir/sample.txt'});await writeFile(join(root,'RELEASE-MANIFEST.json'),JSON.stringify(manifest));
 const r=run(root);assert.equal(r.status,1);assert.match(r.stderr,/Symbolic link refused: linked-dir/);
});
