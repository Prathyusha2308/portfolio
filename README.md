# Portfolio — engineering demonstrations

Upload ALL extracted contents including assets, samples, and all JS/JSON files to your GitHub Pages repository root. Commit changes; keep Pages set to main and /(root). No build required.

Includes:
- Follow the data: browser-only synthetic pipeline with play/pause, manual stages, validation, quarantine, and accepted-only reporting.
- Quality gate: inject errors and download a validation report.
- Explore the code: Python, SQL, dbt model and YAML test examples. See samples/README.md for prerequisites.
- Project Architecture tabs: conceptual connected-tool diagrams with interactive stage detail.

All demo records are synthetic. Code examples are educational, not employer code. No production cloud services run in these demos. Python sample runs standalone. SQL/dbt samples require the described source schema and dbt setup; no credentials are included.

After uploading, code is available in your GitHub repository under samples/. You can copy that folder URL from GitHub to share it with recruiters. This package does not create or update your GitHub repository automatically.

Local preview: python -m http.server 8000, then http://localhost:8000. Use HTTP instead of file:// for JSON and source-code previews.
