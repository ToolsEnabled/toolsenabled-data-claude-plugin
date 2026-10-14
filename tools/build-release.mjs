// Reproducible archive of a committed public payload. Run from the repository root.
import {execFileSync} from 'node:child_process';
import {mkdir, writeFile, readFile} from 'node:fs/promises';
import {gzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';
import {resolve, join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const output=resolve(process.argv[2]||'.');
const {version}=JSON.parse(await readFile(join(root,'.claude-plugin/plugin.json'),'utf8'));
// The one command this tool runs, as fixed text: git archive of the committed payload, from the repository root.
const tar=execFileSync('git',['archive','--format=tar','--prefix=toolsenabled-data/','HEAD'],{cwd:root,maxBuffer:32*1024*1024});
const archive=gzipSync(tar,{level:9});
const name='toolsenabled-data-'+version+'.tar.gz';
const sha256=createHash('sha256').update(archive).digest('hex');
await mkdir(output,{recursive:true});
await writeFile(join(output,name),archive);
await writeFile(join(output,name+'.sha256'),sha256+'  '+name+'\n');
console.log(sha256+'  '+name+' ('+archive.length+' bytes)');
