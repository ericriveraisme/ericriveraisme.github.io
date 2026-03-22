# Eric R. Rivera Portfolio (FF6 Theme)

Interactive, Final Fantasy VI-inspired portfolio site focused on infrastructure, NOC, and automation storytelling.

Live site: <https://ericriveraisme.github.io>

## What This Project Is

This is a React + Webpack single-page portfolio that combines:

- A canvas-driven FF6 visual style on the home page
- Resume and project content from source-controlled data modules
- A Lab Logs publishing area for technical writeups
- A Decap CMS-compatible content path for JSON-based article publishing

The goal is to present technical experience in a memorable format while keeping maintainability, performance, and deployment reliability high.

## Current State

Implemented and active:

- Home page FF6 scene and RPG-inspired UI sections
- HashRouter navigation for GitHub Pages deep-link reliability
- Lab Logs listing + article detail pages
- Merged article system (legacy JS modules + JSON CMS articles)
- New animated Lab Logs header rendered via React canvas
- Improved Lab Logs summary extraction for mixed content block formats
- CI workflows for build validation, deployment, and forensic change visibility

## Recently Completed

- Replaced the Lab Logs static hero with an animated pixel-art scene
- Added compile-state interaction in the Lab Logs header (screen state, wizard reaction, speech bubble)
- Upgraded wizard art direction to a mystical sage style (crimson, purple, gold accents)
- Improved visual polish: shoulders/arms anatomy, beard/goatee continuity, title glow behavior
- Centered and refined Lab Logs neon title rendering
- Fixed snippet extraction in Lab Logs to support typed paragraph blocks and legacy strings

## Near-Term Roadmap

- Final UX pass for mobile behavior and readability in Lab Logs header animation
- Optional: remove or gate the Trigger Compile button in production UX if desired
- Derive Active Quests dynamically from latest Lab Logs entries (reduce manual drift)
- Continue performance tuning (bundle strategy and selective code-splitting)
- Expand Lab Logs publishing cadence through CMS workflow

## Stack

- React 18
- React Router 6
- Webpack 5
- Tailwind CSS (local PostCSS build)
- Canvas 2D API
- Web Vitals
- Decap CMS tooling (local proxy + admin config switching)

## Key Files and Architecture

- `src/index.jsx`: router entrypoint and route wiring
- `src/FF6PortfolioApp.jsx`: home page shell + primary canvas animation
- `src/data/resumeData.js`: single source of truth for profile/resume content
- `src/data/labArticles.js`: merged article dataset used by Lab Logs pages
- `src/pages/LabLogsPage.jsx`: Lab Logs listing page
- `src/pages/LabLogsAnimatedHeader.jsx`: production animated Lab Logs header
- `src/pages/LabArticlePage.jsx`: article detail renderer
- `src/content/lab-articles/`: legacy JS-authored articles
- `src/content/lab-articles-json/`: CMS-managed JSON articles

## Commands

Prerequisite: Node.js 18+ and npm.

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm start
```

Run dev server on CMS port pairing:

```bash
npm run cms:local
```

Build production bundle:

```bash
npm run build
```

Validate article content:

```bash
npm run validate:content
```

Check CMS admin production readiness:

```bash
npm run check:admin-prod
```

Switch CMS config:

```bash
npm run admin:config:local
npm run admin:config:prod
```

## Deployment

Deployment is automated through GitHub Actions.

- Push to `main`/`master`
- CI runs content validation and build
- Deploy workflow publishes to `gh-pages`

Do not commit `dist/` to `main`; deploy automation handles build artifacts.

## Documentation

Additional project documentation is in `docs/`.

Useful starting points:

- `docs/README.md`
- `docs/PERFORMANCE_NOTES.md`
- `docs/DEVELOPMENT/PRE_PUSH_CHECKLIST.md`
- `docs/DEVELOPMENT/FORENSIC_VERSION_CONTROL.md`

## Notes

- `archive-delta-data/` is historical and treated as read-only archive content.
- `_headers` contains security headers used for static hosting behavior.

## Contact

- GitHub: <https://github.com/ericriveraisme>

© 2026 Eric R. Rivera
