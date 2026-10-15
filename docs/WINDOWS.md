# Native Windows installation (0.8.10 candidate)

This package runs natively with Node.js and Python. It uses no WSL, Cygwin or MSYS runtime. The Claude Code plugin commands remain the supported agent workflow; Codex is not supported. The installer can also print the underlying stdio MCP entry for inspection or a compatible host; that does not establish host qualification.

The unchanged 0.8.9 payload passed 48 non-query tests and both query tests on Windows 10 Pro 22H2 x64, build19045, Node22.14.0, Python3.13.3 and DuckDB1.5.6. Those runs were elevated engineering checks over SSH. The candidate installer, ordinary-user checks, independent fresh-user pass and real Claude Code host checks are pending. No Windows11 or GUI panel qualification is claimed.

## Verify and install

Requirements: Windows10/11 x64, Node.js22+, and Python3.10+ (or uv) if installing DuckDB. A local NTFS workspace folder must already exist. The installer needs no administrator privileges, service, policy change, PATH change or reboot. It refuses an existing install/data folder, a junction/reparse path, overlapping install/data/workspace folders, a foreign-owned folder or an ancestor another ordinary account can replace or reconfigure. It checks the owner and effective local grants of every existing ancestor, including the drive root; an untrusted ancestor owner is refused even with an apparently restrictive DACL. Create-only sibling grants on an existing ancestor are allowed. Existing state is inspected and never chmodded or reset. New state is accessible to your current account and SYSTEM; administrators remain privileged under Windows.

Download `toolsenabled-data-0.8.10-windows-x64.zip` and its `.sha256` sidecar into one folder. In PowerShell, compare the ZIP hash with the sidecar before extracting:

```powershell
$archive = '.\toolsenabled-data-0.8.10-windows-x64.zip'
$expected = ((Get-Content -LiteralPath ($archive + '.sha256') -Raw).Trim() -split '\s+')[0]
if ((Get-FileHash -LiteralPath $archive -Algorithm SHA256).Hash -ne $expected) { throw 'ZIP checksum mismatch' }
Expand-Archive -LiteralPath $archive -DestinationPath '.\data-install-source'
Set-Location '.\data-install-source\toolsenabled-data'
.\install.cmd -Workspace 'C:\Users\you\work\Data Project' -SetupDuckDB
```

Default new program folder: `%LOCALAPPDATA%\ToolsEnabled\Data\0.8.10`. Default new data folder: `%LOCALAPPDATA%\ToolsEnabled Data`. To choose new paths or a Python outside PATH:

```powershell
.\install.cmd -Workspace 'C:\Users\you\work\Data Project' -Prefix 'C:\Users\you\apps\TE Data 0.8.10' -DataDirectory 'C:\Users\you\data\TE Data 0.8.10' -BasePython 'C:\Python313\python.exe' -SetupDuckDB
```

`-SetupDuckDB` explicitly downloads the pinned DuckDB1.5.6 binary wheel using its SHA256 lock. It uses uv if installed, otherwise Python venv/pip, just like the plugin's setup. Your pip/uv package index, certificate and proxy settings remain in force. Setup/download caches and a uv-managed Python stay in the selected data folder for this installer run. Omit the switch to leave setup for the explicit `/toolsenabled-data:setup` command later. The installer prints an MCP entry and changes no host configuration. Keep the output's `TEDATA_DATA_DIR` when registering the printed entry.

The install creates a private `.tedata` directory in the selected workspace if absent; your CSV/TSV source files are unchanged. Existing folders are never replaced by the installer. A failed attempt retains its newly created folders; use a different new pair of paths for a fresh attempt, and keep the original for inspection.

## Use and limits

In Claude Code, use the README marketplace install commands, then `/toolsenabled-data:setup` and `/tedata`. For the standalone ZIP entry, use the printed absolute Node executable and server path, with its `TEDATA_DATA_DIR`, `TEDATA_WORKSPACE` and `TEDATA_COLLECTION_WORKERS` environment settings. Start with one collection worker on a small-memory computer. PowerShell uses `& 'C:\absolute\node.exe' 'C:\absolute\server\tedata-server.mjs'` when paths include spaces.

Python lives at `<data folder>\python\Scripts\python.exe`; no venv activation is required. Use `TEDATA_BASE_PYTHON` to select a base interpreter or `TEDATA_PYTHON` for an existing interpreter with DuckDB1.5.6. A long-run tool result identifies its Monitor command's shell; Windows commands use encoded PowerShell arguments and can contain paths with apostrophes or Unicode.

Files with `[` or `]` in their names need a literal alias because DuckDB treats those characters as patterns. TE Data tries a symbolic link then an identity-checked hard link. The hard-link route works without special symlink privileges on the same NTFS volume. A source on a different volume can be refused when neither link can be made: the error names the characters and asks you to rename the file/folder without them and reconnect. TE Data does not enable Developer Mode or fall back to reading a different matching file.

Junction/symlink state folders are refused. Case aliases, sharing violations, paths and encoding are checked by the native test packet; source files remain unchanged. PNG plots use installed Windows system fonts (Segoe UI or Arial), and exports need no LibreOffice or browser renderer. Interactive panel display depends on the host; an SSH stdio check does not prove GUI behavior.

## Verify an installed payload

```powershell
& 'C:\Program Files\nodejs\node.exe' 'C:\absolute\TE Data\tools\verify-release.mjs' 'C:\absolute\TE Data'
$env:TEDATA_PYTHON = 'C:\absolute\Data Runtime\python\Scripts\python.exe'
& 'C:\Program Files\nodejs\node.exe' --test --test-concurrency=1 'C:\absolute\TE Data\test\duckdb.test.mjs'
```

For the full test suite, expand the `test\*.test.mjs` paths with PowerShell (`Get-ChildItem`) and pass those full paths to `node --test --test-concurrency=1`; Node22.14 does not expand that Windows wildcard itself. The two DuckDB tests must run rather than skip. Unit tests create their own temporary homes and workspaces and never start a Claude agent. File-symlink fixture tests require Windows symlink privilege; ordinary-user product proof uses the hard-link fallback and separate junction fixtures instead of changing machine policy.
