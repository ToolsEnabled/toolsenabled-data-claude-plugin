[CmdletBinding()]
param([Parameter(Mandatory=$true)][string]$NodeExecutable,[Parameter(Mandatory=$true)][string]$WatchScript,[Parameter(Mandatory=$true)][string]$Workspace,[Parameter(Mandatory=$true)][string]$RunId)
$ErrorActionPreference='Stop'
[Console]::InputEncoding=New-Object Text.UTF8Encoding($false)
[Console]::OutputEncoding=New-Object Text.UTF8Encoding($false)
try {
 foreach($file in @($NodeExecutable,$WatchScript)){if(-not [IO.Path]::IsPathRooted($file)-or-not [IO.File]::Exists($file)){throw 'Monitor executable and script must be existing absolute files'}}
 Add-Type -TypeDefinition ([IO.File]::ReadAllText((Join-Path $PSScriptRoot 'windows-monitor-job.cs')))
 $null=[DataMonitorJob]::Retain()
 $code=[DataMonitorJob]::Run($NodeExecutable,[string[]]@($WatchScript,'--workspace',$Workspace,'--run',$RunId))
 exit $code
}catch{[Console]::Error.WriteLine('Native TE Data monitor failed before completion.');exit 1}
