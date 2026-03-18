# AGENTS

## Purpose
- This repository contains a static campaign website export/rebuild.
- Primary working area is `website/`.

## Project Layout
- `website/index.html`: Main campaign homepage.
- `website/css/styles.css`: Global styles.
- `website/js/main.js`: Core interaction logic.
- `website/js/lazy-load.js`: Lazy-load behavior.
- `website/platform/*.html`: Issue-specific platform pages.

## Working Rules
- Keep changes minimal and scoped to the request.
- Preserve existing structure and vanilla HTML/CSS/JS approach.
- Do not add frameworks or build tooling unless explicitly requested.
- Reuse existing CSS variables and design patterns before adding new ones.
- Keep copy edits politically neutral unless user requests messaging changes.

## Local Verification
- Open `website/index.html` directly, or run a local static server from repo root:
  - `python -m http.server 8000`
  - Then visit `http://localhost:8000/website/`

## Content Source
- `tedbrown.WordPress.2025-10-31.xml` is a source/export artifact.
- Treat it as reference data unless explicitly asked to transform/import content.