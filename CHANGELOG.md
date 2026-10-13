# Changelog

## 0.8.4 — 2026-10-13

- Add literal first-install and update commands to the README.
- Make the watcher print usage and exit for `--help`; name and refuse invalid arguments, and announce continuous watching.
- Honor `--once` when watching a specific active run with `--run`.
- Publish file-verification and deterministic archive tools with behavioral tests. The manifest identifies a reachable public payload commit; the bundled server and panel continue to come from the 0.8.3 build.
- Include the public security policy in the manifest.

## 0.8.3 — 2026-10-13

- Read pattern-named connected files literally and refuse symbolic links in saved state.
- Preserve unrelated files when pruning profile caches.
