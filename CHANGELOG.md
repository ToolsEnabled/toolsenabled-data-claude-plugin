# Changelog

## 0.8.6 — 2026-10-13

- Codex no longer offers TE Data. Codex reads `.agents/plugins/marketplace.json` before `.claude-plugin/marketplace.json`, so `codex plugin marketplace add` of this repository used to offer the plugin through the Claude marketplace file, although TE Data does not run in Codex. The new `.agents/plugins/marketplace.json` lists it with `"policy": {"installation": "NOT_AVAILABLE", "authentication": "ON_INSTALL"}` and `"category": "Productivity"`, so Codex shows it as not installable. Claude Code keeps using `.claude-plugin/marketplace.json`.
- README says that Codex is not supported.
- RELEASE-MANIFEST.json lists the new file: 29 files.
- The server, panel, watcher, skills, commands and PRIVACY.md are unchanged.

## 0.8.5 — 2026-10-13

- Refuse AI agents' chat history and settings as data sources and documents: Claude Code's `.claude` folder (or the folder `CLAUDE_CONFIG_DIR` names, and other accounts' `.claude-<name>` folders in the home folder), the Claude app's data folders, the `.codex` folder (or `CODEX_HOME`, and `.codex-<name>` folders in the home folder), and the `.gemini`, `.copilot` and opencode folders. Files connected from them by an earlier version are no longer listed or read. Projects in Claude Code worktrees (`.claude/worktrees`) keep working.
- Two tool calls that reach a fresh server at once both work; the second no longer fails with "Cannot read properties of null (reading 'request')".
- Every tool declares a title annotation. tedata_open, tedata_inspect and tedata_validate say that their only write is TE Data's own profile cache. tedata_setup is marked destructive, because installing first deletes TE Data's earlier Python environment.
- Claude asks the user before running the one-time setup, and says that uv may download a Python interpreter.
- README: Claude Code wording, a Try it section with `examples/sample.csv`, a Settings table and the platform tested. PRIVACY.md: what TE Data keeps, for how long, how to delete it, and the download hosts. The plugin's homepage is https://toolsenabled.ai/data/.

## 0.8.4 — 2026-10-13

- Add literal first-install and update commands to the README.
- Make the watcher print usage and exit for `--help`; name and refuse invalid arguments, and announce continuous watching.
- Honor `--once` when watching a specific active run with `--run`.
- Publish file-verification and deterministic archive tools with behavioral tests. The manifest identifies a reachable public payload commit; the bundled server and panel continue to come from the 0.8.3 build.
- Include the public security policy in the manifest.

## 0.8.3 — 2026-10-13

- Read pattern-named connected files literally and refuse symbolic links in saved state.
- Preserve unrelated files when pruning profile caches.
