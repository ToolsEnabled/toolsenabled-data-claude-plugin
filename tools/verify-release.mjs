// Verify the complete payload without an internal source repository or dependencies.
import {readFile, readdir, lstat} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(process.argv[2]||fileURLToPath(new URL('../',import.meta.url)));
try {
 const manifest=JSON.parse(await readFile(join(root,'RELEASE-MANIFEST.json'),'utf8'));
 if(manifest.plugin!=='toolsenabled-data'||!Array.isArray(manifest.files))throw new Error('Invalid release manifest');
 const listed=new Set();
 for(const entry of manifest.files){
  if(typeof entry.path!=='string'||entry.path.split('/').some(part=>!part||part==='.'||part==='..')||entry.path.startsWith('/')||entry.path.includes('\\')||entry.path==='RELEASE-MANIFEST.json'||entry.path==='.git'||entry.path.startsWith('.git/'))throw new Error('Invalid manifest path');
  if(listed.has(entry.path))throw new Error(`Repeated manifest file: ${entry.path}`);
  listed.add(entry.path);
  let path=root;
  for(const part of entry.path.split('/')){path=join(path,part);if((await lstat(path)).isSymbolicLink())throw new Error(`Symbolic link refused: ${entry.path}`);}
  const bytes=await readFile(path);
  if(bytes.length!==entry.bytes||createHash('sha256').update(bytes).digest('hex')!==entry.sha256)throw new Error(`File verification failed: ${entry.path}`);
 }
 // The plugin directory's listing image, the one PNG in .claude-plugin, is read by the directory and never by
 // TE Data, so the manifest does not list it; a second image there, or an image anywhere else, must be listed.
 let images=0;
 async function walk(directory,prefix=''){
  for(const item of await readdir(directory,{withFileTypes:true})){
   const name=prefix+item.name;
   if(name==='.git'||name==='RELEASE-MANIFEST.json')continue;
   if(item.isDirectory()){await walk(join(directory,item.name),name+'/');continue;}
   if(item.isFile()&&listed.has(name))continue;
   if(item.isFile()&&/^\.claude-plugin\/[^/]+\.png$/.test(name)&&++images===1)continue;
   throw new Error(images>1?`Only one listing image may sit in .claude-plugin: ${name}`:`Unlisted or non-regular file: ${name}`);
  }
 }
 await walk(root);
 const plugin=JSON.parse(await readFile(join(root,'.claude-plugin/plugin.json'),'utf8'));
 const marketplace=JSON.parse(await readFile(join(root,'.claude-plugin/marketplace.json'),'utf8'));
 if(plugin.version!==manifest.version||marketplace.metadata.version!==manifest.version)throw new Error('Release versions disagree');
 console.log(`Verified ${listed.size} files for ToolsEnabled Data ${manifest.version}; RELEASE-MANIFEST.json is the checksum list and is not self-hashed.`);
}catch(error){console.error(`Verification refused: ${error.message}`);process.exitCode=1;}
