---
description: See or change the data connected to this project's TE Data workspace
argument-hint: "[connect <path> | disconnect <path>]"
---
Arguments: $ARGUMENTS

If there are no arguments, call tedata_open once with view "sources" and briefly say what is connected.
If the arguments ask to connect or disconnect a file or folder, call tedata_sources with action "add" or "remove", kind "source" (or "document" for a .txt, .md, .json or .jsonl reference such as a codebook or protocol) and the given path, then confirm what changed in one sentence. Connecting never copies or changes the files. If the path is ambiguous, ask which file or folder is meant.
