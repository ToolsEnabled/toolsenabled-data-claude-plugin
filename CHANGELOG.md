# Changelog

## 0.8.5 — 2026-10-13

- Refuse AI agents' chat history and settings as data sources and documents: Claude Code's `.claude` folder, the Claude app's data folders, and the `.codex`, `.gemini`, `.copilot` and opencode folders. Files connected from them by an earlier version are no longer listed or read.
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
