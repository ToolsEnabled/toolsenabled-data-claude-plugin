---
description: Export the current TE Data view (charts, tables, summaries) as a report and files
argument-hint: "[dataset name or folder]"
---
Call the TE Data tool tedata_export to export what TE Data shows for the current dataset: the saved layout with its summaries, charts, filters, notes and table. If the user named a dataset in "$ARGUMENTS", find it with tedata_data action catalog (search) and pass its fileId; if they named an absolute folder, pass it as directory. If the current dataset has no saved layout yet and the user wants specific charts, build and save the layout first (tedata_inspect, then tedata_prepare), then export.

Reply with the path of report.html (it opens in any browser and prints to PDF) and say how many charts and tables were saved, with their folder. For a collection of files prepared together, use tedata_data action collection_export instead.
