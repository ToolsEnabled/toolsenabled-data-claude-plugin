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
 assert.match(result.stdout, /WINDOWS_INSTALL_ACL_CASES_PASS 13/);
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
 assert.equal(r.status,0,r.stdout+r.stderr);assert.match(r.stdout,/NATIVE_INSTALL_FILESYSTEM_PASS 11/);
});

const portablePowerShell=process.platform==='win32'?join(process.env.SystemRoot||'C:\\Windows','System32/WindowsPowerShell/v1.0/powershell.exe'):'pwsh';
const powerShellAvailable=process.platform==='win32'||spawnSync(portablePowerShell,['-NoLogo','-NoProfile','-NonInteractive','-Command','exit 0'],{timeout:5000}).status===0;
const psLiteral=value=>"'"+String(value).replaceAll("'","''")+"'";
test('the actual encoded monitor command binds a literal script file and exact Unicode arguments in the same process',{skip:!powerShellAvailable?'PowerShell parser seam; full Windows command case remains required':false},async()=>{
 const base=await mkdtemp(join(tmpdir(),'tedata-literal-'));
 const folder=join(base,"O'Brien & 音 []");await mkdir(folder);
 const script=join(folder,'watch.mjs');await writeFile(script,'');
 // A protocol stub observes the actual production encoded command's script
 // binding. It deliberately has no Job/native authority or watcher behavior.
 await writeFile(join(folder,'tedata-monitor.ps1'),'\ufeffparam($NodeExecutable,$WatchScript,$Workspace,$RunId)\n[Console]::OutputEncoding=New-Object Text.UTF8Encoding($false)\n[Console]::Out.WriteLine((@($NodeExecutable,$WatchScript,$Workspace,$RunId,$PSScriptRoot)|ConvertTo-Json -Compress))\n');
 const workspace="C:\\Work\\O'Brien & 音 [] 🚀";const run='run-\'& $(literal)';
 const command=monitorCommand(script,workspace,run,'win32',process.execPath);
 const encoded=command.split(' ').at(-1);const decoded=Buffer.from(encoded,'base64').toString('utf16le');
 assert.ok(decoded.includes('音'));assert.ok(decoded.includes('🚀'));
 const r=spawnSync(portablePowerShell,['-NoLogo','-NoProfile','-NonInteractive','-ExecutionPolicy','Bypass','-EncodedCommand',encoded],{encoding:'utf8',timeout:10000});
 assert.equal(r.status,0,r.error?.message||r.stderr);
 assert.deepEqual(JSON.parse(r.stdout.trim()),[process.execPath,script,workspace,run,folder]);
});
test('the actual native watcher runner passes literal argv through direct process creation',{skip:!powerShellAvailable?'PowerShell/C# argv seam; native Monitor lifetime proof remains required':false},async()=>{
 const base=await mkdtemp(join(tmpdir(),'tedata-run-'));const script=join(base,'argv.mjs');
 await writeFile(script,'console.log(JSON.stringify(process.argv.slice(2)));\n');
 const values=['',"O'Brien & 音 [] 🚀",'quoted "value"','trailing\\','before\\"quote','$(literal); & x'];
 const source=fileURLToPath(new URL('../server/windows-monitor-job.cs',import.meta.url));
 // Calls the production ProcessStartInfo/quoting method without Retain().
 // This checks literal argv only; it does not claim Windows Job semantics.
 const code='[Console]::OutputEncoding=New-Object Text.UTF8Encoding($false);Add-Type -TypeDefinition ([IO.File]::ReadAllText('+psLiteral(source)+'));exit [DataMonitorJob]::Run('+psLiteral(process.execPath)+',[string[]]@('+[script,...values].map(psLiteral).join(',')+'))';
 const r=spawnSync(portablePowerShell,['-NoLogo','-NoProfile','-NonInteractive','-ExecutionPolicy','Bypass','-EncodedCommand',Buffer.from(code,'utf16le').toString('base64')],{encoding:'utf8',timeout:10000});
 assert.equal(r.status,0,r.error?.message||r.stderr);assert.deepEqual(JSON.parse(r.stdout.trim()),values);
});
