// Local Codex entry: choose an external project explicitly; never store data in the plugin.
import {isAbsolute, relative, resolve, sep} from 'node:path';
import {realpath, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {absoluteProject} from './tedata-codex-path.mjs';
const inside = (parent, child) => {const r=relative(parent,child);return r===''||(!r.startsWith('..'+sep)&&r!=='..'&&!isAbsolute(r));};
try {
 const workspace=process.env.TEDATA_WORKSPACE;
 if(!absoluteProject(workspace))throw new Error('Set TEDATA_WORKSPACE to your existing absolute project folder before starting Codex (an ordinary local drive path on Windows).');
 const physical=await realpath(workspace), program=await realpath(fileURLToPath(new URL('../',import.meta.url)));
 if(!(await stat(physical)).isDirectory())throw new Error('TEDATA_WORKSPACE must be a directory.');
 if(inside(program,physical)||inside(physical,program))throw new Error('TEDATA_WORKSPACE and the Data plugin folder must not contain one another.');
 process.env.TEDATA_WORKSPACE=physical;
 await import('./tedata-server.mjs');
} catch(error) {console.error('TE Data Codex: '+error.message);process.exitCode=1;}
