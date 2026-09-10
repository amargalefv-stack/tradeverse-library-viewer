# V06 import manifest

- Source: `tradeverse-project-master/01_LIBRARY/STRUCTURE/V06/ARBRE_EDITORIAL_V06_CANDIDATE.csv`
- Source blob SHA: `a9b46e58ab3c5115013a63c0a403b23b200e8c1c`
- Source size: 297430 bytes
- Expected data rows: 1016 nodes
- Imported coverage: source lines 1–1017 inclusive (header + 1016 rows)
- Chunks: `v06_001.csv` … `v06_032.csv`
- Coverage rule:
  - `v06_001.csv`: lines 1–101 (header + 100 rows)
  - `v06_002.csv` … `v06_031.csv`: consecutive blocks of 30 data rows
  - `v06_032.csv`: lines 1002–1017 (16 data rows)
- Viewer: `index.html` loads all 32 chunks, parses CSV, reconstructs hierarchy from `path` / `parent_path`, and overlays editorial card/article content from `tree.json`.
- Status: working visual base; importing V06 does **not** freeze or declare V06 definitive.
