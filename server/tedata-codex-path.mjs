import {posix,win32} from 'node:path';
// Node's win32.isAbsolute also accepts root-relative paths; those do not select a drive.
export function absoluteProject(value,platform=process.platform){
 if(typeof value!=='string'||!value||value.includes('\0'))return false;
 return platform==='win32'?/^[A-Za-z]:[\\/]/.test(value)&&!value.slice(2).includes(':')&&win32.isAbsolute(value):posix.isAbsolute(value);
}
