# ToolsEnabled Data

ToolsEnabled Data (TE Data) is a local data workspace that runs on your computer. Connect CSV or TSV files (also gzip-compressed, or ZIP archives of them) to a project, and Claude can inspect them, interpret columns, run data checks, make transformed copies and build a saved table-and-chart layout with you. Your source files are never changed.

Made and tested for Claude Code; not tested in Cowork; its tools do not load in claude.ai chat.

Codex is not supported. This repository's Codex marketplace file, `.agents/plugins/marketplace.json`, lists TE Data as not available for installation.

## Getting started

1. Install from a terminal, then open a Claude Code session in your project folder:

   ```sh
   claude plugin marketplace add ToolsEnabled/toolsenabled-data-claude-plugin
   claude plugin install toolsenabled-data@toolsenabled-data
   ```
2. Run `/toolsenabled-data:setup` once per computer. It downloads and installs the query engine (DuckDB 1.5.6) into TE Data's own data folder; if `uv` is installed, `uv` may also download a Python interpreter. If a TE Data tool finds that setup is still needed, Claude asks you before running it.
3. Connect data, for example: "connect data/measurements.csv" or `/toolsenabled-data:sources connect ~/exports`.
4. Run `/tedata` to open it.

| Command | What it does |
|---|---|
| `/tedata` | Open the workspace: the saved layout, or a raw table for new data |
| `/tedata update` | Re-read connected data in the saved layout |
| `/tedata redraw` | Claude reviews the data and builds a better interpretation and layout |
| `/tedata prepare` | Purpose-specific research preparation with recorded checks |
| `/tedata sources` | See what is connected |
| `/toolsenabled-data:export` | Save the current view (summaries, charts, table) as a report you can open or share |
| `/toolsenabled-data:sources` | Connect or disconnect files, folders and reference documents |
| `/toolsenabled-data:setup` | One-time setup on this computer |

## Try it

1. Install the plugin as above, save [`examples/sample.csv`](examples/sample.csv) as `sample.csv` in an empty folder, and open Claude Code in that folder.
2. Run `/toolsenabled-data:setup` once on this computer.
3. Ask Claude:

| Prompt | Expected result |
|---|---|
| "Connect sample.csv and check that high_c is never below low_c." | TE Data checks all 30 rows and finds 2 where high_c is below low_c: Oslo on 2026-01-06 and Lisbon on 2026-01-10. |
| "Make a copy of sample.csv without duplicate rows." | A new dataset of 28 rows (the 2 exact duplicate rows removed, the others in their original order) is saved under `.tedata/derived-data` and connected. `sample.csv` is unchanged. |
| "Chart the daily high for each city and export a report." | A line chart with one line per city, 14 days each. The export folder holds `report.html` and the chart as SVG with its Vega-Lite spec and data; Claude gives you the path of `report.html`. |

## Updating

```sh
claude plugin marketplace update toolsenabled-data
claude plugin update toolsenabled-data@toolsenabled-data
```

Restart Claude Code after updating.

## Verifying a release

The 0.8.9 release includes `toolsenabled-data-0.8.9.tar.gz` and its SHA-256 sidecar. Download both from the [release page](https://github.com/ToolsEnabled/toolsenabled-data-claude-plugin/releases/tag/toolsenabled-data--v0.8.9), then run:

```sh
sha256sum -c toolsenabled-data-0.8.9.tar.gz.sha256
tar -xzf toolsenabled-data-0.8.9.tar.gz
cd toolsenabled-data
node tools/verify-release.mjs
node --test test/*.test.mjs
```

The verifier checks every listed file's size and SHA-256 and refuses unlisted payload files. `RELEASE-MANIFEST.json` is the checksum list; it cannot hash itself. Its `sourceCommit` identifies the public payload commit before the manifest was refreshed. `bundledSourceCommit` identifies the internal 0.8.3 build source for the prebuilt server and panel; that internal source, its `release.mjs`, and its original suites are not distributed here. The tests above exercise the shipped watcher and MCP server; they are not the original source suites. The two in `test/duckdb.test.mjs` need the query engine: they run when `TEDATA_PYTHON` names a Python that has DuckDB 1.5.6 (for example `python/bin/python` in TE Data's data folder after setup) and are skipped otherwise. The bundled server is the 0.8.3 build with the changes CHANGELOG.md lists for each later version, made directly in the public payload. The panel is the 0.8.3 build with one local variable renamed in 0.8.8 (see CHANGELOG.md), and the Python workers are unchanged from 0.8.3 except the deduplicate step (0.8.8).

### How the server and panel are stored

The server and the panel are each one esbuild build. TE Data's own code is in files of at most 256 KiB, which the plugin directory's validator reads in full (apart from three import statements, below); the third-party libraries bundled with it are in four files over 1 MiB, which the validator does not read and lists as files it could not inspect. `THIRD-PARTY-LICENSES.txt` (457,672 bytes of licence texts, one file as in 0.8.7) is read up to 256 KiB. This layout is new in 0.8.9: 0.8.8 stored every file under 256 KiB, and the directory's validator timed out on it, with about 7 MB of text to read, most of it bundled library code. Apart from the version and the list of panel files that the server joins, 0.8.9 changes where the code is stored, not the code.

The server bundle is stored as 5 ES modules in `server/`, cut between top-level statements with no bundle text changed. Each part first imports the part before it, so the parts run in the bundle's order, and then the names it uses from other parts. The panel is one HTML page stored as 5 files in `panel/`, which the server joins in order when a host asks for the panel. `RELEASE-MANIFEST.json` gives each file's size and SHA-256.

- `server/tedata-server-01-tedata.mjs`, TE Data: the line that creates the bundle's `require` function (`createRequire`) and esbuild's module helpers.
- `server/tedata-server-02-vendor-mcp.mjs`, over 1 MiB: ajv 8.20.0, ajv-formats 3.0.1, fast-deep-equal 3.1.3, fast-uri 3.1.8, json-schema-traverse 1.0.0, topojson-client 3.1.0, zod 4.6.5, zod-to-json-schema 3.25.2, @modelcontextprotocol/sdk 1.32.0 and @modelcontextprotocol/ext-apps 2.0.3. It also holds the only lines of TE Data's code in a library file: three import statements of TE Data's server (from `node:fs/promises`, `node:path` and `node:url`) that esbuild placed between ajv and zod; `tedata-server.mjs` quotes them in its opening comment.
- `server/tedata-server-03-tedata.mjs`, TE Data: the modules data-service, plot-spec, chart-theme, data-schema, evidence-schema, collection-schema, preparation-schema, preparation, interpretation-quality, assessment-model, workspace, credential-guard, atomic-rename, evidence, collection, collection-export, data-state, derived-data, layout, paths and python-env.
- `server/tedata-server-04-vendor-vega.mjs`, over 1 MiB: vega 6.4.0, vega-lite 6.4.3 and vega-interpreter 2.3.2, with the packages they use: vega-canvas 2.0.0, vega-crossfilter 5.1.3, vega-dataflow 6.1.3, vega-encode 5.2.2, vega-event-selector 4.0.0, vega-expression 6.2.2 (and vega-lite's own copy, 6.1.0), vega-force 5.1.3, vega-format 2.1.3, vega-functions 6.2.0, vega-geo 5.1.3, vega-hierarchy 5.1.3, vega-label 2.1.3, vega-loader 5.1.3, vega-parser 7.1.3, vega-projection 2.1.3, vega-regression 2.1.3, vega-runtime 7.1.3, vega-scale 8.1.3, vega-scenegraph 5.3.0, vega-selections 6.1.5, vega-statistics 2.0.0, vega-time 3.3.0, vega-transforms 5.2.2, vega-util 2.1.3, vega-view 6.2.0, vega-view-transforms 5.2.2, vega-voronoi 5.1.3, vega-wordcloud 5.1.3, d3-array 3.2.4, d3-color 3.1.0, d3-delaunay 6.0.4, d3-dispatch 3.0.1, d3-dsv 3.0.1, d3-ease 3.0.1, d3-force 3.0.0, d3-format 3.1.2, d3-geo 3.1.1, d3-geo-projection 4.0.0, d3-hierarchy 3.1.2, d3-interpolate 3.0.1, d3-path 3.1.0, d3-quadtree 3.0.1, d3-scale 4.0.2, d3-scale-chromatic 3.1.0, d3-shape 3.2.0, d3-time 3.1.0, d3-time-format 4.1.0, d3-timer 3.0.1, delaunator 5.1.0, internmap 2.0.3 and robust-predicates 3.0.3 (55 packages).
- `server/tedata-server.mjs`, TE Data, the file Claude Code starts: the modules chart, raster, font-outline, plot-image, data-service, catalog, preparation-instructions, collection-instructions, durable-poll, view-export and plugin-server (the MCP server and its tools).
- `panel/panel-01-tedata.html`, TE Data: the page head, styles and markup.
- `panel/panel-02-vendor-mcp.html`, over 1 MiB: the licence notice the panel shows (TE Data's MIT licence and the licence texts of 64 npm packages, every library in the panel among them), the start of the page's script with esbuild's helpers, then @modelcontextprotocol/client 2.3.0, @modelcontextprotocol/core 2.3.0, @modelcontextprotocol/ext-apps 2.0.3, pkce-challenge 5.0.1 and zod 4.6.5.
- `panel/panel-03-tedata.html`, TE Data: the modules plot-spec, chart-theme and data-schema.
- `panel/panel-04-vendor-vega.html`, over 1 MiB: the same 55 packages as `server/tedata-server-04-vendor-vega.mjs`, and topojson-client 3.1.0.
- `panel/panel-05-tedata.html`, TE Data: the modules chart, layout, button-style, layout-editor, validation-editor, derivation-editor, evidence-schema, collection-schema, preparation-schema, interpretation-quality-view, preparation-editor, evidence-editor, collection-editor, explorer, panel-result and panel, and the page's closing tags.

To check the large files:

- `node --test test/release.test.mjs` joins the five server files without the lines outside "Bundle text", undoes the edits since 0.8.7 that the test lists, and compares the result with 0.8.7's single `server/tedata-server.mjs` (in the 0.8.7 release archive) by size and SHA-256. It also checks that TE Data's files contain no `// node_modules/` module and the library files no TE Data module except those three import statements, and which files are over 256 KiB. `test/server.test.mjs` does the same for the panel: the page the server serves, with 0.8.8's one rename undone, is 0.8.7's `panel/panel.html` exactly.
- `node tools/verify-release.mjs` checks every file's size and SHA-256 against `RELEASE-MANIFEST.json`, the four library files included.
- To compare a library with its npm package: each module in the library files begins with a line `// node_modules/<package>/<file>` naming the npm file it came from, at the version listed above and in `THIRD-PARTY-LICENSES.txt`. esbuild joined the modules into one scope: it removed their `import` and `export` statements (or wrapped a CommonJS module in a function), renamed names that clash (for example `name` to `name2`) and reprinted the code, so a module is compared with its npm file by reading, not byte for byte. The library files cannot be rebuilt from this repository: the build's own source and configuration are internal (`bundledSourceCommit` above).

## Large collections

Collection preparations (the same interpretation and checks applied to every file of a source group) run several files at once, one worker per lane: by default up to 8 lanes, limited to half the processor threads and about 3 GB of memory per lane. Set `TEDATA_COLLECTION_WORKERS` to choose the number. Runs keep going while the Claude Code session stays open, and an interrupted run can be resumed. Claude follows a long run with Claude Code's Monitor tool, using a small read-only watcher that TE Data provides, so you hear about progress and the outcome without asking. For usage, run `node .../tedata-watch.mjs --help`; it prints the options and exits. Continuous watching announces the workspace; `--once` scans once and exits. Claude Code asks before it starts the watcher; allow it for that run. TE Data does not suggest a standing allow rule for it.

When a collection's final check has run, ask Claude to export it: you get one folder with every prepared file under its original name, `index.csv` (each source file, its prepared file, SHA-256 hashes, rows before and after, and every requirement's result), `export.json` (full provenance) and a README describing exactly what was done. Your analysis code can read the folder or the index directly.

To keep or share what Claude built for a dataset, ask Claude to export it (or run `/toolsenabled-data:export`). You get `report.html`, which opens in any browser and prints to PDF, plus every chart as SVG with its Vega-Lite spec and data, and the table as CSV.

Cleaned copies are written under `.tedata/derived-data` in the project. To keep them on a larger disk, add an absolute folder path to `.tedata/workspace.json`:

```json
{ "version": 1, "sources": [...], "derivedDirectory": "/data/tedata-derived/my-project" }
```

## Charts, plots and colour

Layouts combine summaries, tables, filters and notes with:

- **Plots:** Claude writes a Vega-Lite chart over a grouped summary that TE Data computes from all matching rows: calendar buckets in any time zone, numeric bins, and measures such as count, sum, mean, median, quantiles, first and last. Small multiples, log scales, layered annotations, heatmaps and histograms all work. Specs are checked first: nothing in them can load a URL, follow a link or show an image.
- **Grouped tables:** the same summaries as a table, for example the top ten days by volume.
- **One colour theme per workspace:** five validated series orders (standard, distinct, warm, cool, vivid) and seven magnitude ramps, all checked for colour-blind readers in light and dark mode. Claude names colours by role (`te:series-2`, `te:orange`, `te:muted`), so every chart follows the theme.
- **A check before saving:** before a layout is saved, every plot is drawn once. Claude gets each plot's preview image, the values it actually draws and any warnings, and fixes problems before you see them. Previews are drawn on your computer with an installed system font; nothing is sent anywhere.

Exports include every plot block as SVG and PNG with its Vega-Lite spec and its data. A chart block (the simple chart of the main view) is exported as SVG with its Vega-Lite spec and data, without a PNG.

## Cleaning steps

Recipes are ordered, declarative steps (no code or SQL): keep, remove or flag rows; transform columns (numbers, scales, fills, dates, local time of day, local calendar date, a part of the text matched by a pattern); drop missing values; deduplicate; select columns; and look up values from a grouped summary of another connected file, for example each day's opening price from a stock price file. Previews count every row; prepared copies keep every untouched value byte for byte.

## Panels

TE Data includes an interactive panel (tables, charts, setup, checks, transformations, layout editing). Claude Code shows such panels only where the host supports MCP App panels. Elsewhere TE Data works through Claude in text, and the panel appears automatically once your Claude Code host supports it; no plugin update is needed.


## Upgrading from 0.8.2 or earlier

- A connected file whose path contains `*`, `?`, `[` or `]` is now read literally. Until 0.8.2 the query engine treated such a path as a pattern, so `data[1].csv` could show the rows of a `data1.csv` beside it under the connected file's name and fingerprint. If you made a derived copy before 0.8.3 from a file or folder named with one of these characters, derive it again (its lineage names the source file), and inspect such a file once more so that its saved interpretation is checked against its own columns.
- Saved state is read and written only through real folders. A symbolic link at `.tedata`, or at a folder or record below it (`data-state`, `cache`, `preparations`, `collections`, `derived-data` and its `exports`), is refused with a message naming the link. Replace the link with a folder; to keep derived copies and exports on another disk, set `derivedDirectory` (above) to a real folder instead of linking `derived-data`. Derived copies already behind a link stay listed; new copies and exports are refused until the link is replaced.
- Profile-cache cleanup removes only the cache records TE Data wrote, never another file in that folder.

## What it runs, writes and sends

- **Runs:** a local MCP server (Node.js) started by Claude Code, and a Python query worker using DuckDB. Both run on your computer only. The server is `server/tedata-server.mjs` and the 4 parts it imports from `server/`, and the panel is `panel/panel-01-tedata.html` to `panel-05-tedata.html` joined into one page (see Verifying a release); its content security policy lists no domains, so it can connect to nothing and load nothing from the network. TE Data starts two kinds of program and no others: setup runs `uv` if it is installed and your Python 3.10 or newer (`TEDATA_BASE_PYTHON`, `python3` or `python`, or `py -3` on Windows) to create TE Data's Python environment and install DuckDB into it (with `uv venv` and `uv pip`, or else that Python's `venv` and `pip`), then that environment's `python` once to check DuckDB; the query worker is that `python`, or the one `TEDATA_PYTHON` names, running `worker/data_worker.py`. During a long collection run, Claude may ask to start TE Data's small read-only watcher (`node .../tedata-watch.mjs`) with Claude Code's Monitor tool; it only reads the run's progress record.
- **Files the directory's validator does not read:** the four library files in `server/` and `panel/`, each over 1 MiB, hold the third-party libraries bundled with TE Data, named with their versions in Verifying a release, and the first panel library file also the licence notice the panel shows. The only lines of TE Data's own code in them are three import statements of its server (from `node:fs/promises`, `node:path` and `node:url`), which `server/tedata-server.mjs` quotes. All other code of TE Data is in files of at most 256 KiB, which the validator reads in full. `THIRD-PARTY-LICENSES.txt` holds only licence texts and is read up to 256 KiB.
- **Reads:** only the files and folders you connect, the reference documents you connect, and an installed system font for drawing plot previews. It refuses files it recognises as logins, tokens or keys, and files in AI agents' chat history and settings folders, such as Claude Code's `.claude` folder (the full list is in [PRIVACY.md](PRIVACY.md)).
- **Writes:** `<project>/.tedata/` (the list of connected sources, saved interpretations, views, derived copies, preparation and collection records, and caches that speed up later reads), exports you ask for (beside the prepared copies unless you choose a folder) and TE Data's data folder (the Python environment: in Claude Code, the folder Claude Code provides to plugins; otherwise `~/.local/share/toolsenabled-data` on Linux or `%LOCALAPPDATA%\ToolsEnabled Data` on Windows). It never modifies source files.
- **Sends:** nothing, except the one-time setup. Setup downloads DuckDB from the Python Package Index (pypi.org and files.pythonhosted.org), or from the package index your own pip or uv configuration names. If `uv` is installed, setup uses it, and `uv` may also download a Python interpreter (uv 0.12 downloads it from releases.astral.sh). Setup runs only from TE Data's data folder, never from the project folder. Setup's `uv` or `pip` and the query worker run with the environment Claude Code starts TE Data with, so that your own package index, proxy and certificate settings apply; TE Data itself reads no login, token or key from that environment. What TE Data keeps, and how to delete it, is in [PRIVACY.md](PRIVACY.md). Data reaches Claude only through tool results Claude requests during your session.
- **Permissions:** TE Data asks for no special permissions. Claude Code's normal tool permission prompts apply to its tools, including those that save views and settings.
- **Release tools:** `tools/build-release.mjs` and `tools/verify-release.mjs` are release tools you run yourself, and no command, skill or tool of TE Data runs them: build-release runs `git archive` on this repository and writes the archive and its `.sha256` file on your computer, verify-release reads the files `RELEASE-MANIFEST.json` lists, and neither sends anything.
- **Publisher:** ToolsEnabled, Inc. publishes TE Data from the GitHub organisation `ToolsEnabled` (website toolsenabled.ai); it is not related to any other directory listing with a similar name, such as the "nabled" connector, and ToolsEnabled is not affiliated with or endorsed by Anthropic.

## Requirements

- Claude Code (the desktop app's Code tab or the CLI). Tested on Linux; native Windows and macOS have not been tested.
- Node.js 22 or newer on the PATH (tested with 22.14 and 22.19).
- Python 3.10 or newer, or `uv`, for the one-time setup. On Debian and Ubuntu, `python3-venv` is needed if `uv` is not installed.

## Settings

TE Data reads these environment variables from the environment you start Claude Code from. None is needed for normal use.

| Variable | Effect |
|---|---|
| `TEDATA_WORKSPACE` | The project folder to use as the workspace. Without it, the server uses the folder Claude Code names (its first root, or `CLAUDE_PROJECT_DIR`), then the current folder; the watcher uses it when `--workspace` is not given. |
| `TEDATA_DATA_DIR` | TE Data's data folder (Python environment and setup record), instead of the folder Claude Code provides to plugins or the system default. |
| `TEDATA_PYTHON` | A Python that already has DuckDB 1.5.6. TE Data uses it instead of its own environment, and setup reports it as ready. |
| `TEDATA_BASE_PYTHON` | The Python 3.10 or newer that setup tries first when it creates TE Data's environment (with `uv`, the Python version `uv` should use). |
| `TEDATA_COLLECTION_WORKERS` | Lanes for collection runs, 1 to 16 (default: up to 8, half the processor threads and about 3 GB of memory per lane). |
| `TEDATA_WATCH_INTERVAL_MS` | How often the watcher reads run records, in milliseconds (default 10000). |
| `TEDATA_WATCH_STALL_MS` | How long a running run may record no progress before the watcher says so, in milliseconds (default 900000, 15 minutes). |

## Support

support@toolsenabled.ai. See [PRIVACY.md](PRIVACY.md) for the privacy notice, [THIRD-PARTY-LICENSES.txt](THIRD-PARTY-LICENSES.txt) for bundled software licenses, and [the security policy](https://toolsenabled.ai/security/) for private vulnerability reporting.
