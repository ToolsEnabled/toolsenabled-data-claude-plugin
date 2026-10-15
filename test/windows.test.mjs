import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp, mkdir, writeFile, copyFile} from 'node:fs/promises';
import {join} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {monitorCommand} from '../server/tedata-server-03-tedata.mjs';

test('monitor commands preserve spaces, apostrophes, Unicode and shell metacharacters as literal arguments', async () => {
 const base = await mkdtemp(join(tmpdir(), 'tedata-command-'));
 const folder = join(base, "O'Brien & 音 []");
 await mkdir(folder);
 const script = join(folder, 'argv.mjs');
 await writeFile(script, 'console.log(JSON.stringify(process.argv.slice(2)));\n');
 if(process.platform==='win32')for(const name of ['tedata-monitor.ps1','windows-monitor-job.cs'])await copyFile(fileURLToPath(new URL('../server/'+name,import.meta.url)),join(folder,name));
 const workspace = process.platform === 'win32' ? "C:\\Work\\O'Brien & 音 [1]" : "/Work/O'Brien & 音 [1]";
 const run = "run-'& $(literal)";
 const command = monitorCommand(script, workspace, run);
 let result;
 if (process.platform === 'win32') {
  const prefix = 'C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -EncodedCommand ';
  assert.ok(command.startsWith(prefix));
  const powershell = join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
  result = spawnSync(powershell, ['-NoProfile', '-NonInteractive', '-ExecutionPolicy', 'Bypass', '-EncodedCommand', command.slice(prefix.length)], {encoding: 'utf8', timeout: 10000});
 } else {
  result = spawnSync('/bin/sh', ['-c', command], {encoding: 'utf8', timeout: 10000});
 }
 assert.equal(result.status, 0, result.error?.message || result.stderr);
 assert.deepEqual(JSON.parse(result.stdout.trim()), ['--workspace', workspace, '--run', run]);
});

test('Windows monitor command has only fixed switches and an encoded literal argv', () => {
 const command = monitorCommand("C:\\TE\\watch.mjs", "C:\\O'Brien\\data & notes", 'run-1', 'win32', "C:\\Program Files\\nodejs\\node.exe");
 assert.match(command, /^C:\\Windows\\System32\\WindowsPowerShell\\v1\.0\\powershell\.exe -NoProfile -NonInteractive -ExecutionPolicy Bypass -EncodedCommand [A-Za-z0-9+/]+=*$/);
 const decoded = Buffer.from(command.split(' ').at(-1), 'base64').toString('utf16le');
 assert.match(decoded, /O''Brien/);
 assert.doesNotMatch(decoded, /'\\''/);
});

test('native installer refuses foreign owners and dangerous ancestor ACLs', {skip: process.platform !== 'win32' ? 'native Windows security descriptor fixture' : false}, () => {
 const powershell = join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'WindowsPowerShell', 'v1.0', 'powershell.exe');
 const result = spawnSync(powershell, ['-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', fileURLToPath(new URL('./windows-install.test.ps1', import.meta.url))], {encoding: 'utf8', timeout: 10000});
 assert.equal(result.status, 0, result.error?.message || result.stderr);
 assert.match(result.stdout, /WINDOWS_INSTALL_ACL_CASES_PASS 10/);
});

test('installer rejects ambiguous raw Windows spelling before normalization',{skip:process.platform!=='win32'?'native PowerShell path fixture':false},()=>{
 const powershell=join(process.env.SystemRoot||'C:\\Windows','System32/WindowsPowerShell/v1.0/powershell.exe');
 const r=spawnSync(powershell,['-NoProfile','-ExecutionPolicy','Bypass','-File',fileURLToPath(new URL('./windows-path.test.ps1',import.meta.url))],{encoding:'utf8',timeout:15000});
 assert.equal(r.status,0,r.stdout+r.stderr);assert.match(r.stdout,/RAW_WINDOWS_PATH_CASES_PASS 16/);
});
test('native Monitor retains its watcher until completion and ends it on wrapper death',{skip:process.platform!=='win32'?'native Job Object lifetime fixture':false},()=>{
 const powershell=join(process.env.SystemRoot||'C:\\Windows','System32/WindowsPowerShell/v1.0/powershell.exe');
 const r=spawnSync(powershell,['-NoProfile','-ExecutionPolicy','Bypass','-File',fileURLToPath(new URL('./windows-monitor-lifetime.test.ps1',import.meta.url)),'-NodeExecutable',process.execPath],{encoding:'utf8',timeout:90000});
 assert.equal(r.status,0,r.stdout+r.stderr);assert.match(r.stdout,/WINDOWS_MONITOR_LIFETIME_PASS 5/);
});
test('native filesystem validates the volume and refuses unsafe real ACLs and junctions',{skip:process.platform!=='win32'?'native NTFS/security API fixture':false},()=>{
 const powershell=join(process.env.SystemRoot||'C:\\Windows','System32/WindowsPowerShell/v1.0/powershell.exe');
 const r=spawnSync(powershell,['-NoProfile','-ExecutionPolicy','Bypass','-File',fileURLToPath(new URL('./windows-filesystem.test.ps1',import.meta.url))],{encoding:'utf8',timeout:30000});
 assert.equal(r.status,0,r.stdout+r.stderr);assert.match(r.stdout,/NATIVE_INSTALL_FILESYSTEM_PASS 10/);
});
