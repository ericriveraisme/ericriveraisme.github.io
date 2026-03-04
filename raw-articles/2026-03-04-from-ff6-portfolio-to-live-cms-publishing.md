# Learning in Public at 40: Turning My Portfolio into a Real Publishing System

*Published draft: 2026-03-04*  
*Author: Eric Rivera (built with Copilot pair support)*

---

## Why I Took This On

I’m 40, I’ve been in IT a long time, and I still believe the best way to grow is to build things that make me uncomfortable.

This portfolio started as a creative React project with an FF6 vibe. What I wanted next was bigger: a real browser-based publishing flow that could hold up like production, even if it’s “just” a portfolio site.

I wanted to learn by doing:
- modern content operations,
- OAuth plumbing,
- safer deployment practices,
- and how to troubleshoot the messy middle when things don’t work the first time.

---

## The End State (What Works Today)

The workflow is now:

**Write in `/admin` → Publish → Commit to `main` → Validate/Build in CI → Deploy to GitHub Pages**

And it’s proven in live usage:
- login works,
- create works,
- edit works,
- delete works,
- and content updates on the public site.

---

## Tech Stack and What Each Part Does

### App Layer
- **React 18** for UI and route rendering
- **Webpack 5** for build output and bundling
- **Tailwind CSS v3** for consistent styling
- **react-router-dom** for `/`, `/lab-logs`, and `/lab-logs/:slug`

### Content Layer
- **Decap CMS** at `/admin` for browser editing
- JSON article files in `src/content/lab-articles-json/`
- Normalization/ingestion in `src/data/labArticles.js`

### Auth + Hosting
- **GitHub OAuth App** for identity and permissions
- **Render OAuth proxy service** for auth handshake
- **GitHub Pages** for live hosting

### Guardrails
- `npm run validate:content` to enforce content structure
- CI/deploy checks before publishing changes live
- local pre-commit secret scanning hook
- `.gitignore` hardening for env and key artifacts

---

## Timeline of the Build

## Phase 1 — Add a Real Lab Logs Surface

Started with navigation and route structure so content had a proper place to live.

### Delivered
- `Lab Logs` route + nav button
- active-state navigation behavior
- sitemap/SPA routing support for GitHub Pages

---

## Phase 2 — Make Content First-Class

Moved from “quest text in UI” to article-driven rendering.

### Delivered
- homepage `Active Quests` fed by article data
- `Lab Logs` list view and full article view linked together
- newest-first sorting with top 5 on homepage

---

## Phase 3 — Migrate to CMS-Friendly Content Structure

Moved content into dedicated JSON files and made the app consume that source cleanly.

### Delivered
- canonical folder: `src/content/lab-articles-json/`
- content normalization for editor compatibility
- optional inline image insertion support per paragraph index

---

## Phase 4 — Add Browser Editing

Implemented Decap CMS and local/prod config modes.

### Delivered
- `/admin` scaffold
- local CMS mode (no OAuth) and production template mode
- admin readiness checks and switch scripts

---

## Phase 5 — Make Production Auth Real

This was the hardest part and the most educational.

### Delivered
- Render auth service deployed
- GitHub OAuth app configured
- production CMS config wired to live auth base URL
- live `/admin` publishing and deletion validated

---

## Tribulations (The Stuff That Actually Taught Me)

### 1) Port collisions (`EADDRINUSE`)
Local startup commands failed repeatedly.

**What fixed it:** dedicated ports and cleaner local/prod mode separation.

### 2) “Repo not found” in admin
CMS loaded but couldn’t access the repository.

**What fixed it:** correcting repo target in backend config.

### 3) Content schema mismatches
Some entries wouldn’t appear as expected in admin.

**What fixed it:** aligning JSON content format with CMS schema and updating validation to handle compatible cases.

### 4) OAuth callback confusion
Callback page looked blank, and there was uncertainty if login worked.

**What fixed it:** confirming callback behavior is often UI-silent, plus setting missing auth env values (`REDIRECT_URL`) to eliminate `redirectURI=undefined`.

### 5) “Published but not visible” anxiety
The content existed, but the homepage didn’t always show it immediately.

**What fixed it:** checking deploy completion, cache refresh, and understanding top-5 display logic.

### 6) Git divergence near the finish line
Local and remote each had unique commits.

**What fixed it:** rebase onto `origin/main`, then push cleanly.

---

## What This Feature Actually Gives Me Now

- I can publish from a browser without manually editing source files.
- I still keep everything in Git, with full history and ownership.
- Content has structure checks before it goes live.
- The portfolio feels alive instead of frozen.
- I got hands-on reps with OAuth, CI guardrails, and deployment discipline.

For me, that’s the point: not perfection, but steady capability growth.

---

## Code Snapshot Spots (Great for Screenshot Images)

> If you want “pictures of code” in the final published article, grab screenshots from these sections.

### Snapshot A — Production CMS auth wiring
**File:** `admin/config.yml`

```yaml
backend:
  name: github
  repo: ericriveraisme/ericriveraisme.github.io
  branch: main
  base_url: https://eric-cms-auth.onrender.com
  auth_endpoint: auth

site_url: https://ericriveraisme.github.io
display_url: https://ericriveraisme.github.io
```

### Snapshot B — JSON loader normalization
**File:** `src/data/labArticles.js`

```js
const context = require.context('../content/lab-articles-json', false, /\.json$/);

const normalizeContent = (content = []) =>
  content.map((entry) => {
    if (typeof entry === 'string') return entry;
    if (entry && typeof entry === 'object' && typeof entry.text === 'string') {
      return entry.text;
    }
    return '';
  }).filter(Boolean);
```

### Snapshot C — Homepage newest-five logic
**File:** `FF6PortfolioApp.jsx`

```js
const activeQuestArticles = [...labArticles]
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
  .slice(0, 5);
```

### Snapshot D — Production readiness gate
**File:** `scripts/check-admin-production-readiness.mjs`

```js
const checks = [
  { label: 'backend.base_url is set', pass: /\n\s*base_url\s*:\s*https?:\/\//.test(raw) },
  { label: 'backend.auth_endpoint is set', pass: /\n\s*auth_endpoint\s*:\s*\S+/.test(raw) },
  { label: 'site_url is set', pass: /\n\s*site_url\s*:\s*https?:\/\//.test(raw) },
  { label: 'display_url is set', pass: /\n\s*display_url\s*:\s*https?:\/\//.test(raw) }
];
```

---

## Closing Thought

I’m not trying to cosplay as a “10x engineer.” I’m trying to stay curious, keep improving, and build with intention.

This project gave me exactly what I wanted: a better system, real deployment confidence, and another honest step forward in the craft.

---

## Optional Alternate Titles

1. **Learning in Public: Shipping a Live CMS at 40**
2. **From Portfolio to Publishing Pipeline**
3. **A Humble Build Log: OAuth, CI, and Real-World Friction**
