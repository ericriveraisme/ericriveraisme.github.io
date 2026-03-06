# GitHub Copilot Instructions — FF6 Portfolio

## Project Purpose
FF6-themed interactive portfolio site for Eric Rivera. Built with React 18 + Webpack 5, served via GitHub Pages. The main entry is `index.jsx` → `FF6PortfolioApp.jsx`; the production build outputs to `dist/bundle.js` (gitignored on `main`, committed to `gh-pages`).

## Architecture Overview

```
index.jsx → FF6PortfolioApp.jsx     # App shell + Canvas animation
src/data/resumeData.js              # Single source of truth for all resume content
src/data/activeQuests.js            # Active quests sidebar data (manually maintained)
src/data/labArticles.js             # Merge point: combines both article systems
src/content/lab-articles/*.js       # JS-module articles (legacy/hand-authored)
src/content/lab-articles-json/*.json # CMS-managed articles (Decap CMS output)
src/pages/LabArticlePage.jsx        # Article detail renderer
src/pages/LabLogsPage.jsx           # Article listing page
admin/config.yml                    # Decap CMS config (production backend)
```

## Article Data Flow

Both article systems are merged into a single unified array in `src/data/labArticles.js`, which is the only import used by `LabLogsPage.jsx` and `LabArticlePage.jsx`:

1. **JSON articles** (`lab-articles-json/*.json`) — loaded automatically via webpack `require.context`; no manual registration needed.
2. **JS-module articles** (`lab-articles/*.js`) — must be manually imported and pushed into the `labArticles` array in `src/content/lab-articles/index.js`.
3. `labArticles.js` normalizes both into a common shape with typed content blocks (`paragraph`, `heading`, `list`, `code`). Legacy string arrays in JS modules are auto-upgraded to `paragraph` blocks.
4. `LabLogsPage` sorts all articles newest-first by `publishedAt`. `LabArticlePage` looks up by `slug` via `useParams`.
5. JSON article fields: `title` (or `questTitle`), `slug`, `publishedAt`, `author`, `summary`, `tags`, `content` (typed block array).

> **⚠️ Area to improve:** `src/data/activeQuests.js` is a **manually maintained static array** — it is not derived from lab articles. The sidebar Active Quests panel and the top-5 newest articles in the quests view drift out of sync whenever articles are published. Ideally, `activeQuests` should be auto-derived from the merged `labArticles` array (e.g., 5 newest by `publishedAt`).

- **`src/data/resumeData.js`** is the authoritative source for bio, skills, experience, and featured project — edit only here, never inline in JSX.
- The Canvas animation (FF6 sprites, snow, fog) lives inside `FF6PortfolioApp.jsx` and uses the browser Canvas 2D API — no external animation libraries.

## Developer Workflows

| Task | Command |
|------|---------|
| Local dev server (port 3000, HMR) | `npm start` |
| Local dev + CMS proxy (port 3003 + 8082) | `npm run cms:local` |
| Production build → `dist/` | `npm run build` |
| Validate JSON article content | `npm run validate:content` |
| Check CMS admin readiness | `npm run check:admin-prod` |
| Switch CMS to local backend | `npm run admin:config:local` |
| Switch CMS to production backend | `npm run admin:config:prod` |
| Install git hooks | `npm run hooks:install` |

`npm start` stays running by design — it is the webpack dev server watch mode. Stop with `Ctrl+C`.

## CI/CD & Deployment
- **`deploy.yml`**: triggers on push to `main`/`master` → runs `validate:content` + `npm run build` → deploys to `gh-pages` branch via `peaceiris/actions-gh-pages`. The entire `src/` directory is copied to the deploy package so JSON articles are reachable at runtime.
- **`ci.yml`**: runs on PRs and pushes — validates articles, audits prod deps, builds.
- **`forensic-visibility.yml`**: on every push/PR, generates a change diff report uploaded as a GitHub Actions artifact and step summary. Do not remove this workflow.
- **Never commit `dist/`** to `main`; the Actions workflow handles building for `gh-pages`.

## Content: Adding a Lab Article

### JS module article (hand-authored)
1. Create `src/content/lab-articles/<slug>.js` following the shape in `templates/lab-article.template.js`.
2. Register it in `src/content/lab-articles/index.js` (add import + push to `labArticles` array).
3. Required fields: `slug` (lowercase-dash), `questTitle`, `publishedAt` (YYYY-MM-DD), `content` (string array).

### CMS-managed JSON article
1. Use the Decap CMS admin at `/admin/` or run `npm run cms:local`.
2. JSON lands in `src/content/lab-articles-json/`.
3. Run `npm run validate:content` — CI enforces this; it checks slugs (unique, lowercase-dash), `publishedAt` format, and required fields.

## Project-Specific Conventions
- **Canvas performance**: 60 fps cap, debounced resize (250ms), fixed-timestep wind animation. When touching canvas code, preserve these constraints; do not reintroduce uncapped `requestAnimationFrame` loops.
- **Tailwind CSS**: local build via PostCSS (`src/tailwind.css` → `assets/styles.css`). Do not re-add the CDN `<script>` tag for Tailwind — it was intentionally removed to eliminate `unsafe-eval` CSP warnings.
- **Security headers** live in `_headers` (GitHub Pages / Netlify format). Keep `X-Frame-Options` and `X-Content-Type-Options` intact.
- **CMS auth**: production CMS authenticates via OAuth at `https://eric-cms-auth.onrender.com`. The `admin/config.yml` templates in `admin/config.local.template.yml` and `config.production.template.yml` are the canonical sources; `switch-admin-config.mjs` swaps which is active.
- **Webpack public path** is `./` (relative) to work correctly under GitHub Pages subdirectory serving.
- **`archive-delta-data/`** contains old Delta Data Defense branding artifacts — treat as read-only historical archive; do not edit or restore these files.
