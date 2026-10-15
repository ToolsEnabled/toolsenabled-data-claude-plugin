# ToolsEnabled Data in Codex

Requires Node.js and a local Codex CLI with plugin support. This branch enables local stdio MCP use; it is not a public-directory listing, ChatGPT web deployment or OpenAI approval. Empty Codex hooks and a separate Codex skill leave the Claude Code package unchanged.

```sh
codex plugin marketplace add ToolsEnabled/toolsenabled-data-claude-plugin --ref main
codex plugin add toolsenabled-data@toolsenabled-data
```

These Git commands apply after publication of 0.8.10. Before publication, deliberately select `--ref windows-port` to evaluate the integrated candidate. The `openai-plugin` branch is the separately reviewed input and does not contain all final Windows fixes. Review the exact selected commit, refresh an existing marketplace after changing its ref, and start a new Codex session.

For exact Windows candidate bytes, first verify and install the release ZIP using [WINDOWS.md](WINDOWS.md). Use that installed program folder as the local marketplace, keeping the project and data folders separate. For example, replace these paths with the exact program, data and project paths selected during installation:

```powershell
codex plugin marketplace add 'C:\absolute\TE Data'
codex plugin add toolsenabled-data@toolsenabled-data
$env:TEDATA_DATA_DIR = 'C:\absolute\TE Data State'
$env:TEDATA_WORKSPACE = 'C:\absolute\Project'
```

Keep the installer's selected Python/runtime configuration and data directory; if selecting `TEDATA_PYTHON`, use that data directory's prepared interpreter. Start Codex from this configured environment with Node.js 22+ available to its plugin launcher. [OpenAI documents local marketplace root directories](https://developers.openai.com/plugins/build/plugins). Registering the exact local bytes is a preparation step; it does not establish a native Windows Codex host or UI result.

Before starting Codex, select an existing project outside the plugin folder (from that project in a POSIX shell):

```sh
export TEDATA_WORKSPACE="$PWD"
```

In PowerShell use `$env:TEDATA_WORKSPACE = (Get-Location).Path`. Restart Codex with that environment. Missing, relative or overlapping project selection is refused before serving. Ask “Use TE Data to report setup status.” `tedata_setup` with action `status` downloads nothing. If setup is needed, explicitly agree to install DuckDB 1.5.6 once: it creates a Python environment in TE Data's data folder and downloads the pinned package; uv may download Python. No API key or TE Data account is required. Codex sign-in is separate; no paid model API is part of this plugin.

Copy [examples/sample.csv](../examples/sample.csv) into your project and ask “Connect sample.csv and check that high_c is never below low_c.” With setup complete, expect 30 rows and two violations (Oslo January 6 and Lisbon January 10). “Make a copy without duplicate rows” should save 28 rows and leave the original unchanged. Codex CLI uses actual MCP results as text; interactive panel display and Claude Monitor are not required or qualified by this route. Poll returned run requests until terminal, and name failures/refusals.

The Codex entry requires TEDATA_WORKSPACE and passes its physical project path to the existing server. Select it for every project; a stale value selects the wrong project. TEDATA_DATA_DIR can choose a real private data folder; without it, see [PRIVACY.md](../PRIVACY.md). No hook is needed to protect credentials, agent settings/history, source files or state paths: those checks run inside the server. This is not a sandbox against arbitrary client tools; Codex/user approval still governs setup, source changes and exports.

Uninstall with `codex plugin remove toolsenabled-data@toolsenabled-data`. Project .tedata, exported/derived files and an external Python environment remain until you delete them. See [privacy, retention and deletion](../PRIVACY.md). MIT LICENSE governs this package; the website terms are not claimed to cover plugins. Real-host Codex proof is Linux-only so far; native Windows server qualification and the owner Windows host/UI check are separate gates recorded in the Windows release packet.
