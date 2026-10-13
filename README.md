# ToolsEnabled Data

ToolsEnabled Data (TE Data) is a local data workspace that runs on your computer. Connect CSV or TSV files (also gzip-compressed, or ZIP archives of them) to a project, and Claude can inspect them, interpret columns, run data checks, make transformed copies and build a saved table-and-chart layout with you. Your source files are never changed.

It works in Claude Code: the Claude desktop app's Code tab and the Claude Code CLI. It does not run in claude.ai chat, and it is not supported in Cowork. Cowork tasks now run in Anthropic's cloud and reach local plugins through the desktop app; if you use TE Data from one anyway, the tool results Claude requests are saved with that task's history in your Claude account.

## Getting started

1. Install the plugin and open a Claude Code session in your project folder.
2. Run `/toolsenabled-data:setup` once per computer. It installs the query engine (DuckDB 1.5.6) into TE Data's own data folder.
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

## Large collections

Collection preparations (the same interpretation and checks applied to every file of a source group) run several files at once, one worker per lane: by default up to 8 lanes, limited to half the processor threads and about 3 GB of memory per lane. Set `TEDATA_COLLECTION_WORKERS` to choose the number. Runs keep going while the Claude Code session stays open, and an interrupted run can be resumed. Claude follows a long run with Claude Code's Monitor tool, using a small read-only watcher that TE Data provides, so you hear about progress and the outcome without asking. Claude Code asks before it starts the watcher; allow it for that run. TE Data does not suggest a standing allow rule for it.

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

Exports include every plot as SVG, PNG, its Vega-Lite spec and its data.

## Cleaning steps

Recipes are ordered, declarative steps (no code or SQL): keep, remove or flag rows; transform columns (numbers, scales, fills, dates, local time of day, local calendar date, a part of the text matched by a pattern); drop missing values; deduplicate; select columns; and look up values from a grouped summary of another connected file, for example each day's opening price from a stock price file. Previews count every row; prepared copies keep every untouched value byte for byte.

## Panels

TE Data includes an interactive panel (tables, charts, setup, checks, transformations, layout editing). Claude Code shows such panels only where the host supports MCP App panels. Elsewhere TE Data works through Claude in text, and the panel appears automatically once your Claude Code host supports it; no plugin update is needed.


## Notes for 0.8.3

- A connected file whose path contains `*`, `?`, `[` or `]` is now read literally. Until 0.8.2 the query engine treated such a path as a pattern, so `data[1].csv` could show the rows of a `data1.csv` beside it under the connected file's name and fingerprint. If you made a derived copy before 0.8.3 from a file or folder named with one of these characters, derive it again (its lineage names the source file), and inspect such a file once more so that its saved interpretation is checked against its own columns.
- Saved state is read and written only through real folders. A symbolic link at `.tedata`, or at a folder or record below it (`data-state`, `cache`, `preparations`, `collections`, `derived-data` and its `exports`), is refused with a message naming the link. Replace the link with a folder; to keep derived copies and exports on another disk, set `derivedDirectory` (above) to a real folder instead of linking `derived-data`. Derived copies already behind a link stay listed; new copies and exports are refused until the link is replaced.
- Profile-cache cleanup removes only the cache records TE Data wrote, never another file in that folder.

## What it runs, writes and sends

- **Runs:** a local MCP server (Node.js) started by Claude Code, and a Python query worker using DuckDB. Both run on your computer only. During a long collection run, Claude may ask to start TE Data's small read-only watcher (`node .../tedata-watch.mjs`) with Claude Code's Monitor tool; it only reads the run's progress record.
- **Reads:** only the files and folders you connect, the reference documents you connect, and an installed system font for drawing plot previews. It refuses files it recognises as logins, tokens or keys.
- **Writes:** `<project>/.tedata/` (the list of connected sources, saved interpretations, views, derived copies, preparation and collection records), exports you ask for (beside the prepared copies unless you choose a folder) and TE Data's data folder (the Python environment: `~/.local/share/toolsenabled-data` on Linux, `%LOCALAPPDATA%\ToolsEnabled Data` on Windows, or the folder Claude Code provides to plugins). It never modifies source files.
- **Sends:** nothing, except the one-time setup download of DuckDB from PyPI, or from the package index your own pip or uv configuration names (and, if `uv` is used, anything `uv` itself downloads, such as a Python interpreter). Setup runs only from TE Data's data folder, never from the project folder. Data reaches Claude only through tool results Claude requests during your session.
- **Permissions:** TE Data asks for no special permissions. Claude Code's normal tool permission prompts apply to its tools, including those that save views and settings.

## Requirements

- Claude Code (desktop app Code tab or CLI) on Linux or Windows.
- Node.js 22 or newer on the PATH (tested with 22.14 and 22.19).
- Python 3.10 or newer, or `uv`, for the one-time setup. On Debian and Ubuntu, `python3-venv` is needed if `uv` is not installed.

## Support

support@toolsenabled.ai. See PRIVACY.md for the privacy notice and THIRD-PARTY-LICENSES.txt for bundled software licenses.
