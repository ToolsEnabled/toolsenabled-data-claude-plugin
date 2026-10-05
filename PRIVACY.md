# Privacy

ToolsEnabled Data (TE Data) runs entirely on your computer.

- It collects no telemetry, analytics or usage data, and ToolsEnabled receives nothing from it.
- It reads only the files, folders and documents you connect, and never modifies them.
- It stores its records in the `.tedata` folder of your project and its Python environment in its data folder on your computer.
- Its only network access is the one-time setup, which downloads DuckDB from the Python Package Index (PyPI), or uses `uv`, which may download Python and DuckDB.
- Claude sees data only through the tool results it requests during your session. How Anthropic handles your conversations is governed by your agreement with Anthropic.
- TE Data never reads, stores or sends logins, tokens or keys. It refuses to connect or read files in credential locations (for example `.ssh`, `.aws`, `.codex`, `.config/gcloud`, keychains) or with credential names (for example `.netrc`, `auth.json`, `.env`, private key files), and it will not return a document whose text is a private key or a list of tokens.

Questions: support@toolsenabled.ai
