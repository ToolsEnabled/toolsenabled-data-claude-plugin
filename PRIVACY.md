# Privacy

ToolsEnabled Data (TE Data) runs entirely on your computer.

- It collects no telemetry, analytics or usage data, and ToolsEnabled receives nothing from it.
- It reads only the files, folders and documents you connect, and never modifies them.
- It stores its records in the `.tedata` folder of your project and its Python environment in its data folder on your computer.
- Its only network access is the one-time setup. Setup downloads DuckDB from the Python Package Index (pypi.org and files.pythonhosted.org), or from the package index your own pip or uv configuration names. If `uv` is installed, setup uses it, and `uv` may also download a Python interpreter (uv 0.12 downloads it from releases.astral.sh).
- The connected assistant sees data through the tool results it requests during your session. Anthropic handles Claude conversations under your agreement with Anthropic; OpenAI handles Codex conversations under your agreement with OpenAI.
- Made for Claude Code and local Codex CLI; not qualified in Cowork or ChatGPT web. Its local tools do not load in claude.ai chat.
- TE Data never reads, stores or sends logins, tokens or keys. It refuses to connect or read files in credential locations (for example `.ssh`, `.aws`, `.config/gcloud`, keychains) or with credential names (for example `.netrc`, `auth.json`, `.env`, private key files), and it will not return a document whose text is a private key or a list of tokens.
- It refuses to connect or read files in AI agents' chat history and settings folders: Claude Code's `.claude` folder, or the folder `CLAUDE_CONFIG_DIR` names when it is set, and other accounts' `.claude-<name>` folders in your home folder; the Claude app's data folder (`.config/Claude`, `Library/Application Support/Claude`, `AppData/Roaming/Claude`, or `LocalCache/Roaming/Claude` for a packaged Windows install); the `.codex` folder, the folder `CODEX_HOME` names, and `.codex-<name>` folders in your home folder; and the `.gemini`, `.copilot` and opencode (`.config/opencode`, `.local/share/opencode`) folders. Files connected from these folders with an earlier version are no longer listed or read. A project that Claude Code keeps as a git worktree in `.claude/worktrees` is an ordinary project folder; the `.claude` folder inside it is refused.

## What TE Data keeps, and for how long

Everything TE Data writes stays on your computer, and ToolsEnabled keeps nothing. Nothing expires: it stays until you delete it.

- `<project>/.tedata`: the list of connected sources and documents, saved interpretations and views, preparation and collection records, and caches. These hold sample rows and summaries of your data.
- Derived copies and exports: `<project>/.tedata/derived-data` and its `exports` folder, or the `derivedDirectory` you set in `.tedata/workspace.json`, and any folder you choose for an export. These are full copies of the data you transform or export.
- TE Data's data folder: its Python environment and setup record, with none of your data. In Claude Code this is the plugin data folder Claude Code provides (`~/.claude/plugins/data/<plugin id>/`); otherwise `~/.local/share/toolsenabled-data` on Linux or `%LOCALAPPDATA%\ToolsEnabled Data` on Windows. `TEDATA_DATA_DIR` overrides both.

Uninstalling TE Data leaves `.tedata`, the derived copies and the exports where they are. `claude plugin uninstall` also removes the plugin data folder unless you add `--keep-data`; a data folder elsewhere stays. To remove everything, delete the project's `.tedata` folder, any derived-copy and export folders outside it, and TE Data's data folder. Setup can also leave files in pip's and uv's own folders: their download caches keep the DuckDB package (`pip cache purge` or `uv cache clean` empties them), and a Python interpreter that uv downloaded stays in uv's Python folder until you remove it with `uv python uninstall <version>`.

Questions: support@toolsenabled.ai
