param([string]$NodeExecutable='C:\Program Files\nodejs\node.exe')
$ErrorActionPreference='Stop'
[Console]::OutputEncoding=New-Object Text.UTF8Encoding($false)
$sourceRoot=[IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
Add-Type -Path (Join-Path $sourceRoot 'server\windows-monitor-job.cs')
$ownerJob=[DataMonitorJob]::Retain()
Add-Type @'
using System;using System.Runtime.InteropServices;
public static class MonitorLifetimeProbe {
 [StructLayout(LayoutKind.Sequential)] struct Accounting {public long a,b,c,d;public uint faults,total,active,terminated;}
 [DllImport("kernel32.dll",SetLastError=true)] static extern bool QueryInformationJobObject(IntPtr job,int kind,out Accounting info,uint bytes,IntPtr returned);
 [DllImport("kernel32.dll",SetLastError=true)] public static extern bool IsProcessInJob(IntPtr process,IntPtr job,out bool member);
 [DllImport("kernel32.dll")] public static extern uint WaitForSingleObject(IntPtr handle,uint milliseconds);
 [DllImport("kernel32.dll",SetLastError=true)] public static extern bool TerminateProcess(IntPtr process,uint exitCode);
 public static uint Active(IntPtr job){Accounting info;if(!QueryInformationJobObject(job,1,out info,(uint)Marshal.SizeOf(typeof(Accounting)),IntPtr.Zero))throw new System.ComponentModel.Win32Exception(Marshal.GetLastWin32Error());return info.active;}
}
'@
$root=Join-Path ([IO.Path]::GetTempPath()) ("tedata monitor's r$([char]0xe9)sum$([char]0xe9) "+[guid]::NewGuid().ToString('N'))
[IO.Directory]::CreateDirectory($root)|Out-Null
$results=@()
foreach($case in @('completion-after-stdin-EOF','abrupt-wrapper-death','startup-cancel-50','startup-cancel-500','startup-cancel-1000')){
 $folder=Join-Path $root $case;[IO.Directory]::CreateDirectory($folder)|Out-Null
 foreach($name in @('tedata-monitor.ps1','windows-monitor-job.cs')){Copy-Item -LiteralPath (Join-Path $sourceRoot ('server\'+$name)) -Destination (Join-Path $folder $name)}
 $run=Join-Path $folder '.tedata\collections\project\collection\runs\run-native';[IO.Directory]::CreateDirectory($run)|Out-Null
 $state=Join-Path $run 'state.json'
 [IO.File]::WriteAllText($state,'{"state":"running","phase":"final","total":1,"completed":0}')
 $watcher=Join-Path $folder 'probe.mjs'
 $watchPath=(Join-Path $sourceRoot 'server\tedata-watch.mjs')|ConvertTo-Json -Compress
 [IO.File]::WriteAllText($watcher,('import fs from "node:fs";import {join} from "node:path";import {pathToFileURL} from "node:url";fs.writeFileSync(join(process.argv[3],"watcher.json"),JSON.stringify({pid:process.pid}));await import(pathToFileURL('+$watchPath+').href);'),(New-Object Text.UTF8Encoding($false)))
 $command=(& $NodeExecutable (Join-Path $PSScriptRoot 'windows-monitor-command.mjs') $watcher $folder 'run-native').Trim()
 if($LASTEXITCODE -ne 0 -or $command -notmatch ' -EncodedCommand ([A-Za-z0-9+/]+=*)$'){throw 'Monitor command generation failed'}
 $start=New-Object Diagnostics.ProcessStartInfo
 $start.FileName='C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe'
 $start.Arguments='-NoProfile -NonInteractive -ExecutionPolicy Bypass -EncodedCommand '+$Matches[1]
 $start.UseShellExecute=$false;$start.CreateNoWindow=$true;$start.WorkingDirectory=$folder
 $start.RedirectStandardInput=$true;$start.RedirectStandardOutput=$true;$start.RedirectStandardError=$true
 $start.EnvironmentVariables['TEDATA_WATCH_INTERVAL_MS']='25'
 $wrapper=$null;$process=$null;$member=$false;$handle=[IntPtr]::Zero
 try{
  $wrapper=[Diagnostics.Process]::Start($start)
  $stdout=$wrapper.StandardOutput.ReadToEndAsync();$stderr=$wrapper.StandardError.ReadToEndAsync()
  $wrapper.StandardInput.Close() # A monitor can start with stdin already at EOF; that is not cancellation.
  if($case.StartsWith('startup-cancel-')){
   Start-Sleep -Milliseconds ([int]$case.Substring('startup-cancel-'.Length))
   if($wrapper.HasExited){throw 'Running synthetic watch ended before startup cancellation'}
   $wrapper.Kill();if(-not$wrapper.WaitForExit(10000)){throw 'Startup-cancelled wrapper did not exit'}
   $until=[DateTime]::UtcNow.AddSeconds(10)
   while([MonitorLifetimeProbe]::Active($ownerJob)-ne1-and[DateTime]::UtcNow-lt$until){Start-Sleep -Milliseconds 25}
   if([MonitorLifetimeProbe]::Active($ownerJob)-ne1){throw 'A startup-cancelled wrapper left a process in the fixture job'}
   [IO.File]::WriteAllText((Join-Path $folder 'stdout.log'),$stdout.GetAwaiter().GetResult());[IO.File]::WriteAllText((Join-Path $folder 'stderr.log'),$stderr.GetAwaiter().GetResult())
   $results+=@{case=$case;pass=$true;wrapperExit=$wrapper.ExitCode;watcherStarted=[IO.File]::Exists((Join-Path $folder 'watcher.json'));ownedJobActive=1}
   continue
  }
  $receipt=Join-Path $folder 'watcher.json';$until=[DateTime]::UtcNow.AddSeconds(12)
  while(-not [IO.File]::Exists($receipt)-and[DateTime]::UtcNow-lt$until-and-not$wrapper.HasExited){Start-Sleep -Milliseconds 25}
  if(-not[IO.File]::Exists($receipt)){throw 'Watcher did not start'}
  $watchPid=(Get-Content -Raw -LiteralPath $receipt|ConvertFrom-Json).pid
  $process=[Diagnostics.Process]::GetProcessById($watchPid);$handle=$process.Handle
  if(-not[MonitorLifetimeProbe]::IsProcessInJob($handle,$ownerJob,[ref]$member)-or-not$member){throw 'Fixture process is not in our owned job'}
  if([MonitorLifetimeProbe]::WaitForSingleObject($handle,0)-ne258){throw 'EOF unexpectedly stopped a running watch'}
  if($case-eq'completion-after-stdin-EOF'){
   [IO.File]::WriteAllText($state,'{"state":"complete","phase":"final","total":1,"completed":1}')
  }else{$wrapper.Kill()} # Retained Process from Start; no PID-based termination.
  if(-not$wrapper.WaitForExit(10000)){throw 'Wrapper did not exit'}
  if([MonitorLifetimeProbe]::WaitForSingleObject($handle,5000)-ne0){throw 'Watcher survived its wrapper'}
  if($case-eq'completion-after-stdin-EOF'-and$wrapper.ExitCode-ne0){throw 'Completed wrapper returned failure'}
  if([MonitorLifetimeProbe]::Active($ownerJob)-ne1){throw 'Completed native Monitor job is not quiescent'}
  [IO.File]::WriteAllText((Join-Path $folder 'stdout.log'),$stdout.GetAwaiter().GetResult())
  [IO.File]::WriteAllText((Join-Path $folder 'stderr.log'),$stderr.GetAwaiter().GetResult())
  $results+=@{case=$case;pass=$true;wrapperExit=$wrapper.ExitCode;watcherPid=$watchPid}
 }finally{
  if($wrapper-and-not$wrapper.HasExited){$wrapper.Kill();$null=$wrapper.WaitForExit(5000)}
  if($handle-ne[IntPtr]::Zero-and$member-and[MonitorLifetimeProbe]::WaitForSingleObject($handle,0)-eq258){$null=[MonitorLifetimeProbe]::TerminateProcess($handle,1)}
  if($wrapper){if($stdout.IsCompleted){[IO.File]::WriteAllText((Join-Path $folder 'stdout.log'),$stdout.GetAwaiter().GetResult())};if($stderr.IsCompleted){[IO.File]::WriteAllText((Join-Path $folder 'stderr.log'),$stderr.GetAwaiter().GetResult())}}
  if($process){$process.Dispose()};if($wrapper){$wrapper.Dispose()}
 }
}
$results|ConvertTo-Json -Depth 5|Set-Content -LiteralPath (Join-Path $root 'result.json') -Encoding UTF8
Write-Output ('WINDOWS_MONITOR_LIFETIME_PASS '+$results.Count+' '+$root)
