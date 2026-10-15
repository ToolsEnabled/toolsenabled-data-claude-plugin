[CmdletBinding()]
param(
    [string]$Prefix,
    [Parameter(Mandatory=$true)][string]$Workspace,
    [string]$DataDirectory,
    [string]$NodeExecutable,
    [string]$BasePython,
    [switch]$SetupDuckDB
)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version 2.0
$sourceRoot = [IO.Path]::GetFullPath($PSScriptRoot)
$version = (Get-Content -Raw -LiteralPath (Join-Path $sourceRoot '.claude-plugin\plugin.json') | ConvertFrom-Json).version
$accountSid = [Security.Principal.WindowsIdentity]::GetCurrent().User
$trustedSids = @($accountSid.Value, 'S-1-5-18', 'S-1-5-32-544')
# Measured C: owner only. This does not authorize its grants or private terminal ownership.
$trustedInstallerOwner = 'S-1-5-80-956008885-3418522649-1831038044-1853292631-2271478464'
$trustedOwners = $trustedSids + @($trustedInstallerOwner)
$accountProfile = [Environment]::GetFolderPath('UserProfile')
if (-not $Prefix) { $Prefix = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) ('ToolsEnabled\Data\' + $version) }
if (-not $DataDirectory) { $DataDirectory = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) 'ToolsEnabled Data' }
function Assert-PlainLocalInput([string]$Value) {
    if (-not $Value -or $Value -notmatch '^[A-Za-z]:[\\/]' -or $Value.Substring(2).Contains(':')) { throw 'Use an absolute ordinary local drive path.' }
    foreach ($part in $Value.Replace('/', '\').Substring(3).Split('\')) {
        if (-not $part) { continue }
        if ($part -in @('.', '..') -or $part -match '[<>"|?*\x00-\x1f]' -or $part -match '[. ]$' -or $part -match '^(?i:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)') { throw 'Ambiguous, device or stream path spelling is refused.' }
    }
}
function Full-LocalPath([string]$Value) {
    Assert-PlainLocalInput $Value
    $result = [IO.Path]::GetFullPath($Value)
    $root = [IO.Path]::GetPathRoot($result)
    if (-not ('TEInstallVolume' -as [type])) { Add-Type -Path (Join-Path $sourceRoot 'tools\windows-volume.cs') }
    [TEInstallVolume]::Check($root)
    if ($result -ne $root) { $result = $result.TrimEnd('\') }
    return $result
}
function Inside([string]$Parent, [string]$Child) {
    return $Child.Equals($Parent, [StringComparison]::OrdinalIgnoreCase) -or $Child.StartsWith($Parent.TrimEnd('\') + '\', [StringComparison]::OrdinalIgnoreCase)
}
function Assert-DirectPath([string]$Value) {
    $cursor = [IO.Path]::GetPathRoot($Value)
    Assert-AccountAccess $cursor $false
    foreach ($part in $Value.Substring($cursor.Length).Split('\')) {
        if (-not $part) { continue }
        $cursor = Join-Path $cursor $part
        if (-not (Test-Path -LiteralPath $cursor)) { break }
        $item = Get-Item -Force -LiteralPath $cursor
        if (([int]$item.Attributes -band [int][IO.FileAttributes]::ReparsePoint) -ne 0 -or -not $item.PSIsContainer) { throw ('Path crosses a reparse point or file: ' + $cursor) }
        Assert-AccountAccess $cursor $false
    }
}
function Assert-AccountAccess([string]$Value, [bool]$Private) {
    $acl = Get-Acl -LiteralPath $Value
    $ownerSid = $acl.GetOwner([Security.Principal.SecurityIdentifier]).Value
    if (($Private -and $ownerSid -ne $accountSid.Value) -or (-not $Private -and $trustedOwners -notcontains $ownerSid)) { throw ('Folder has a different owner: ' + $Value) }
    $raw = [Security.AccessControl.RawSecurityDescriptor]::new($acl.GetSecurityDescriptorBinaryForm(), 0)
    if ($null -eq $raw.DiscretionaryAcl) { throw ('Folder has a null DACL: ' + $Value) }
    foreach ($ace in $raw.DiscretionaryAcl) {
        if ($ace.AceType -ne [Security.AccessControl.AceType]::AccessAllowed -and $ace.AceType -ne [Security.AccessControl.AceType]::AccessDenied) { throw ('Folder has an unrecognized ACL entry: ' + $Value) }
    }
    # Existing ancestors may allow sibling creation. They must not let another
    # account replace/delete an existing path or change its attributes, owner or DACL.
    $dangerous = [int]0x500D0140
    foreach ($rule in $acl.GetAccessRules($true, $true, [Security.Principal.SecurityIdentifier])) {
        $appliesHere = ([int]$rule.PropagationFlags -band [int][Security.AccessControl.PropagationFlags]::InheritOnly) -eq 0
        if ($rule.AccessControlType -eq [Security.AccessControl.AccessControlType]::Allow -and $trustedSids -notcontains $rule.IdentityReference.Value -and ($Private -or ($appliesHere -and (([int]$rule.FileSystemRights -band [int]$dangerous) -ne 0)))) {
            throw ('Folder grants another account access incompatible with this install: ' + $Value)
        }
    }
}
function New-PrivateFolder([string]$Value) {
    if (Test-Path -LiteralPath $Value) { throw ('Refusing to overwrite an existing install or data folder: ' + $Value) }
    $parent = Split-Path -Parent $Value
    if (-not (Test-Path -LiteralPath $parent)) { New-PrivateFolder $parent }
    Assert-DirectPath $parent
    Assert-AccountAccess $parent $false
    $acl = New-Object Security.AccessControl.DirectorySecurity
    $acl.SetOwner($accountSid)
    $acl.SetAccessRuleProtection($true, $false)
    foreach ($sidText in @($accountSid.Value, 'S-1-5-18')) {
        $sid = New-Object Security.Principal.SecurityIdentifier($sidText)
        $rule = New-Object Security.AccessControl.FileSystemAccessRule($sid, [Security.AccessControl.FileSystemRights]::FullControl, [Security.AccessControl.InheritanceFlags]'ContainerInherit,ObjectInherit', [Security.AccessControl.PropagationFlags]::None, [Security.AccessControl.AccessControlType]::Allow)
        $acl.AddAccessRule($rule)
    }
    [IO.Directory]::CreateDirectory($Value, $acl) | Out-Null
    Assert-AccountAccess $Value $true
}
$Prefix = Full-LocalPath $Prefix
$DataDirectory = Full-LocalPath $DataDirectory
$Workspace = Full-LocalPath $Workspace
$accountProfile = Full-LocalPath $accountProfile
foreach ($folder in @($Prefix, $DataDirectory)) {
    if (-not (Inside $accountProfile $folder) -or $folder -eq $accountProfile) { throw 'Install and data folders must be below your own Windows profile.' }
    Assert-DirectPath $folder
    if (Test-Path -LiteralPath $folder) { throw ('Choose a new empty path; this installer never replaces existing folders: ' + $folder) }
}
if (-not (Test-Path -LiteralPath $Workspace -PathType Container)) { throw 'Choose an existing workspace folder.' }
Assert-DirectPath $Workspace
Assert-AccountAccess $Workspace $false
foreach ($pair in @(@($Prefix, $DataDirectory), @($Prefix, $Workspace), @($DataDirectory, $Workspace), @($sourceRoot, $Prefix), @($sourceRoot, $DataDirectory), @($sourceRoot, $Workspace))) {
    if ((Inside $pair[0] $pair[1]) -or (Inside $pair[1] $pair[0])) { throw 'Source, install, data and workspace folders must not overlap.' }
}
$state = Join-Path $Workspace '.tedata'
if (Test-Path -LiteralPath $state) { Assert-DirectPath $state; Assert-AccountAccess $state $true }
if (-not $NodeExecutable) { $NodeExecutable = (Get-Command node.exe -CommandType Application -ErrorAction Stop | Select-Object -First 1).Source }
$NodeExecutable = [IO.Path]::GetFullPath($NodeExecutable)
if (-not (Test-Path -LiteralPath $NodeExecutable -PathType Leaf)) { throw 'Select an installed Node.js executable.' }
$nodeVersion = (& $NodeExecutable --version).Trim()
if ($LASTEXITCODE -ne 0 -or ([version]$nodeVersion.TrimStart('v')).Major -lt 22) { throw 'Node.js 22 or newer is required.' }
& $NodeExecutable (Join-Path $sourceRoot 'tools\verify-release.mjs') $sourceRoot
if ($LASTEXITCODE -ne 0) { throw 'Source payload verification failed; nothing installed.' }
New-PrivateFolder $Prefix
New-PrivateFolder $DataDirectory
if (-not (Test-Path -LiteralPath $state)) { New-PrivateFolder $state }
$manifest = Get-Content -Raw -LiteralPath (Join-Path $sourceRoot 'RELEASE-MANIFEST.json') | ConvertFrom-Json
$files = @($manifest.files | ForEach-Object { $_.path }) + @('RELEASE-MANIFEST.json')
$files += @(Get-ChildItem -LiteralPath (Join-Path $sourceRoot '.claude-plugin') -Filter '*.png' -File | ForEach-Object { '.claude-plugin/' + $_.Name })
foreach ($relative in $files) {
    $destination = Join-Path $Prefix $relative
    $parent = Split-Path -Parent $destination
    if (-not (Test-Path -LiteralPath $parent)) { [IO.Directory]::CreateDirectory($parent) | Out-Null }
    Copy-Item -LiteralPath (Join-Path $sourceRoot $relative) -Destination $destination
}
& $NodeExecutable (Join-Path $Prefix 'tools\verify-release.mjs') $Prefix
if ($LASTEXITCODE -ne 0) { throw 'Installed payload failed verification. Retain the folder for review.' }
$runtimeResult = $null
if ($SetupDuckDB) {
    $names = @('TEDATA_DATA_DIR', 'TEDATA_BASE_PYTHON', 'TEDATA_PYTHON', 'TEMP', 'TMP', 'PIP_CACHE_DIR', 'UV_CACHE_DIR', 'UV_PYTHON_INSTALL_DIR')
    $previous = @{}
    foreach ($name in $names) { $previous[$name] = [Environment]::GetEnvironmentVariable($name, 'Process') }
    try {
        $env:TEDATA_DATA_DIR = $DataDirectory
        $env:TEDATA_PYTHON = $null
        if ($BasePython) { $env:TEDATA_BASE_PYTHON = [IO.Path]::GetFullPath($BasePython) }
        $env:TEMP = Join-Path $DataDirectory 'temp'
        [IO.Directory]::CreateDirectory($env:TEMP) | Out-Null
        $env:TMP = $env:TEMP
        $env:PIP_CACHE_DIR = Join-Path $DataDirectory 'pip-cache'
        $env:UV_CACHE_DIR = Join-Path $DataDirectory 'uv-cache'
        $env:UV_PYTHON_INSTALL_DIR = Join-Path $DataDirectory 'uv-python'
        & $NodeExecutable (Join-Path $Prefix 'tools\setup-runtime.mjs') --install
        if ($LASTEXITCODE -ne 0) { throw 'Explicit DuckDB setup failed. Retain the installed folders and logs; use a new data path for a fresh attempt.' }
        $runtimeResult = Get-Content -Raw -LiteralPath (Join-Path $DataDirectory 'python-setup.json') | ConvertFrom-Json
    } finally {
        foreach ($name in $names) { [Environment]::SetEnvironmentVariable($name, $previous[$name], 'Process') }
    }
}
$config = [ordered]@{mcpServers=[ordered]@{tedata=[ordered]@{command=$NodeExecutable;args=@((Join-Path $Prefix 'server\tedata-server.mjs'));env=[ordered]@{TEDATA_DATA_DIR=$DataDirectory;TEDATA_WORKSPACE=$Workspace;TEDATA_COLLECTION_WORKERS='1'}}}}
Write-Output 'Installed per user. Copy this entry into your chosen MCP host; no host settings were changed:'
$config | ConvertTo-Json -Depth 8
if (-not $SetupDuckDB) { Write-Output 'DuckDB setup remains explicit: run /toolsenabled-data:setup after plugin installation, or rerun setup-runtime.mjs --install with TEDATA_DATA_DIR set to the selected data folder.' }
