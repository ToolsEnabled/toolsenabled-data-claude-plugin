---
description: One-time setup of TE Data's query engine on this computer
disable-model-invocation: true
---
The user typed this command, which is their agreement to the one-time setup. Call the TE Data tool tedata_setup with action "install". It creates a Python environment in TE Data's own data folder and installs exactly DuckDB 1.5.6 with pinned hashes; nothing is installed system-wide. If uv is installed, uv may also download a Python interpreter. Report the result in one or two sentences. If it succeeded, suggest opening TE Data with /tedata. If it failed, explain the returned reason plainly (for example, Python 3.10+ or an internet connection is needed once) and what the user can do.
