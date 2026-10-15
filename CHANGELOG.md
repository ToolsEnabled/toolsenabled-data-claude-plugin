# Changelog

## 0.8.10 — native Windows candidate (unpublished)

- Follow-up: retain a native Windows Monitor lifetime job before Node starts; use a fixed absolute PowerShell entry and verify normal completion/abrupt wrapper death with an owned fixture. Native proof remains pending.

- Follow-up: reject ambiguous raw installer paths and non-fixed/nonlocal/non-NTFS drive aliases before writes; native volume acceptance remains pending.

- Added a ZIP and per-user PowerShell/cmd install route: verifies the public payload, creates new install/data/state folders with current-user and SYSTEM ACLs, leaves existing folders and MCP host settings unchanged, and offers an explicit DuckDB setup step. Every existing path ancestor must have a trusted owner and no grants that let another account replace it or change its access; final private folders must belong to the current account.
- Added an explicit `tools/setup-runtime.mjs --install|--status` helper that uses the same pinned setup path as the plugin and starts no MCP server or model.
- Long-run Monitor commands use the current absolute Node executable. Windows uses an encoded PowerShell literal argument list, so spaces, apostrophes, Unicode and shell metacharacters in workspace paths are preserved. POSIX commands keep literal shell quoting.
- Native Windows engineering validation and the outstanding ordinary-user/fresh-user checks are recorded in `docs/WINDOWS.md`; no Windows 11 claim is made. Linux behavior and the pinned DuckDB version remain unchanged.


## 0.8.9 — 2026-10-14

- The bundled third-party libraries are in four files over 1 MiB again, which the plugin directory's validator does not read, and TE Data's own code stays in files of at most 256 KiB, which it reads in full. The validator timed out on every attempt to validate 0.8.8, which stored every file under 256 KiB and so gave it about 7 MB of text to read, most of it library code. Nothing the server or panel does changed:
  - The server bundle is stored as 5 ES modules in `server/` instead of 15: TE Data's code in `tedata-server-01-tedata.mjs`, `tedata-server-03-tedata.mjs` and `tedata-server.mjs`, and the libraries in `tedata-server-02-vendor-mcp.mjs` (ajv, zod, the MCP SDK and MCP Apps) and `tedata-server-04-vendor-vega.mjs` (Vega, Vega-Lite and d3). Three import statements of TE Data's server (`node:fs/promises`, `node:path`, `node:url`) that esbuild placed between ajv and zod stay in the first library file; `tedata-server.mjs` quotes them. The parts still run in the bundle's order and, without their import and export lines, join to the bundle byte for byte. The release test checks this, that undoing the listed edits gives 0.8.7's server exactly, and that TE Data's files hold no library module and the library files no TE Data module except those three imports.
  - The panel is stored as 5 files in `panel/` instead of 13: TE Data's page and code in `panel-01-tedata.html`, `panel-03-tedata.html` and `panel-05-tedata.html`, and the libraries in `panel-02-vendor-mcp.html` (after the licence notice the panel shows) and `panel-04-vendor-vega.html`. The server joins them into the same page as 0.8.8's, byte for byte. The list of files it joins, with its comment, and the version are the only changes to TE Data's server code.
  - The licence inventory is one file again, `THIRD-PARTY-LICENSES.txt`, as in 0.8.7: 0.8.8's four licence files joined, byte for byte. The `licenses` folder is removed. The validator reads the file up to 256 KiB.
  - tools/list, resources/list, the panel page and the README's Try it calls give byte-identical results to 0.8.8's, and the server starts as fast.
- README: Verifying a release says why the layout changed, what each of the ten server and panel files holds (TE Data's modules by name, each library by npm name and version) and how to check the large files; "What it runs, writes and sends" answers the directory's "couldn't inspect" hold.
- The layout tests check the new files; 50 tests, as in 0.8.8. Everything else in 0.8.8 is unchanged: deduplicate order, UTC CSV times, the licence inventory naming TE Data, the renamed variables, PRIVACY.md, the skills, the commands and the watcher.

## 0.8.8 — 2026-10-14

- Every file of the plugin can now be read in full: no file is larger than 256 KiB. The plugin directory's validator reads text files only up to 256 KiB and held three files for review: the server and panel bundles (over its 1 MiB read limit) and the licence inventory. Nothing they do changed:
  - The server bundle is stored as 15 ES modules in `server/`, cut between top-level statements with no bundle text changed. `tedata-server.mjs`, the file Claude Code starts, holds TE Data's MCP tools and loads `tedata-server-01-ajv.mjs` to `tedata-server-14-vega-lite.mjs`. Each part first imports the part before it, so the parts run in the bundle's order, then the names it uses from other parts. Without those import and export lines the parts join to the single bundle byte for byte; a release test checks this and that undoing the listed edits gives 0.8.7's server exactly. tools/list, resources/list and the README's Try it calls give the same results before and after the split, and the server starts as fast.
  - The panel is stored as `panel/panel-01.html` to `panel-13.html`, which the server joins into one page when a host asks for the panel.
  - The licence texts are in `licenses/javascript-1.txt`, `licenses/javascript-2.txt` and `licenses/duckdb.txt`; `THIRD-PARTY-LICENSES.txt` keeps its opening lines and lists them. Joined, they are the whole inventory, with no text lost.
- Deduplicate keeps the rows it keeps in their source order. "Make a copy of sample.csv without duplicate rows" used to start at 2026-01-02, with 2026-01-01 Oslo 15th; it now gives source rows 1 to 28 in order. `keep: "first"` and `"last"` also return the kept rows in source order. The schema and recipe descriptions say so.
- An exported chart block's data CSV writes its time column as UTC ISO text (`2026-01-01T00:00:00.000Z`), the time the chart's tooltip shows, where it wrote Unix seconds.
- The licence inventory names ToolsEnabled Data (TE Data); it said "Bench" in four places.
- The directory's "Uses a credential from the user's machine" hold named two files that neither read a credential nor send anything: the watcher's loop variable for a run's ids is now `field`, and `tools/build-release.mjs` runs `git archive` with fixed arguments and builds no string at run time (its archives are byte-identical to the old tool's). Two local variables in TE Data's own server and panel code are also renamed plainly (`problem` in the evidence reader, `cssVar` in the panel's chart code); the refusal message and what the panel shows are unchanged.
- README: "What it runs, writes and sends" names every program TE Data starts, says that setup and the query worker run with Claude Code's environment so your own package index, proxy and certificate settings apply, that the panel connects nowhere, what the release tools do (neither sends anything), and who publishes TE Data (ToolsEnabled is not affiliated with or endorsed by Anthropic). Verifying a release points to this changelog for the in-payload server changes and explains the new files.
- Eleven new tests, 50 in all. The two in `test/duckdb.test.mjs` need the query engine: they run when `TEDATA_PYTHON` names a Python with DuckDB 1.5.6 and are skipped otherwise. PRIVACY.md, the skills, the commands and the watcher's behaviour are unchanged.

## 0.8.7 — 2026-10-13

- A deduplicate step has two forms in the tedata_data schema, as the recipe validator always required: `keep: "unique"` (the default) takes no `columns` or `orderBy`; `keep: "first"` or `"last"` requires both. A step with `columns` and `keep: "unique"` is refused by the schema with the key named, where 0.8.6's schema accepted it and the validator then refused it.
- A refused tedata_data call names the field and its path, for example `expected array, received undefined at request.recipe.steps[0].orderBy`, where 0.8.6 said `Invalid input at request`; an unknown action is answered with the list of actions.
- The error for a layout saved before a column interpretation says what to do: "Save a column interpretation before composing a layout (tedata_data action configure, or tedata_prepare with a configuration)."
- tedata_derive says that a restart of Claude Code requires a new preview, as a fingerprint or revision change does.
- README: exports include a PNG for plot blocks; a chart block is exported as SVG with its Vega-Lite spec and data. The tedata_export description says the same. The export is unchanged.
- SECURITY.md cites this repository's LICENSE for "as is", not the website terms.
- RELEASE-MANIFEST.json no longer lists the plugin directory's listing image, the one PNG in the plugin manifest folder: `tools/verify-release.mjs` exempts exactly that file and refuses a second one. 28 files are listed.
- Six new tests, 39 in all. The panel, watcher, Python workers, skills, commands and PRIVACY.md are unchanged.

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
