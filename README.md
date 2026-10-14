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

The 0.8.8 release includes `toolsenabled-data-0.8.8.tar.gz` and its SHA-256 sidecar. Download both from the [release page](https://github.com/ToolsEnabled/toolsenabled-data-claude-plugin/releases/tag/toolsenabled-data--v0.8.8), then run:

```sh
sha256sum -c toolsenabled-data-0.8.8.tar.gz.sha256
tar -xzf toolsenabled-data-0.8.8.tar.gz
cd toolsenabled-data
node tools/verify-release.mjs
node --test test/*.test.mjs
```

The verifier checks every listed file's size and SHA-256 and refuses unlisted payload files. `RELEASE-MANIFEST.json` is the checksum list; it cannot hash itself. Its `sourceCommit` identifies the public payload commit before the manifest was refreshed. `bundledSourceCommit` identifies the internal 0.8.3 build source for the prebuilt server and panel; that internal source, its `release.mjs`, and its original suites are not distributed here. The tests above exercise the shipped watcher and MCP server; they are not the original source suites. The two in `test/duckdb.test.mjs` need the query engine: they run when `TEDATA_PYTHON` names a Python that has DuckDB 1.5.6 (for example `python/bin/python` in TE Data's data folder after setup) and are skipped otherwise. The bundled server is the 0.8.3 build with the changes CHANGELOG.md lists for each later version, made directly in the public payload. The panel is the 0.8.3 build with one local variable renamed in 0.8.8 (see CHANGELOG.md), and the Python workers are unchanged from 0.8.3 except the deduplicate step (0.8.8).

The server bundle is stored as 5 ES modules in `server/`, cut between top-level statements with no bundle text changed: TE Data's own code in `tedata-server-01-tedata.mjs`, `tedata-server-03-tedata.mjs` and `tedata-server.mjs` (the file Claude Code starts, which holds TE Data's MCP tools), each at most 256 KiB, and the bundled third-party libraries in `tedata-server-02-vendor-mcp.mjs` and `tedata-server-04-vendor-vega.mjs`, each over 1 MiB. Each part first imports the part before it, so the parts run in the bundle's order, and then the names it uses from other parts; without those import and export lines the parts join to the single bundle byte for byte, which a release test checks. The panel is stored as `panel/panel-01.html` to `panel-13.html`, which the server joins into one page when a host asks for the panel. The license texts are in `THIRD-PARTY-LICENSES.txt` and the three files it lists in `licenses/`.

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

- **Runs:** a local MCP server (Node.js) started by Claude Code, and a Python query worker using DuckDB. Both run on your computer only. The server is `server/tedata-server.mjs` and the 4 parts it imports from `server/`, and the panel is `panel/panel-01.html` to `panel-13.html` joined into one page (see Verifying a release); its content security policy lists no domains, so it can connect to nothing and load nothing from the network. TE Data starts two kinds of program and no others: setup runs `uv` if it is installed and your Python 3.10 or newer (`TEDATA_BASE_PYTHON`, `python3` or `python`, or `py -3` on Windows) to create TE Data's Python environment and install DuckDB into it (with `uv venv` and `uv pip`, or else that Python's `venv` and `pip`), then that environment's `python` once to check DuckDB; the query worker is that `python`, or the one `TEDATA_PYTHON` names, running `worker/data_worker.py`. During a long collection run, Claude may ask to start TE Data's small read-only watcher (`node .../tedata-watch.mjs`) with Claude Code's Monitor tool; it only reads the run's progress record.
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

support@toolsenabled.ai. See [PRIVACY.md](PRIVACY.md) for the privacy notice, [THIRD-PARTY-LICENSES.txt](THIRD-PARTY-LICENSES.txt) and the [licenses](licenses) folder for bundled software licenses, and [the security policy](https://toolsenabled.ai/security/) for private vulnerability reporting.
