# Deployment Notes

## Changes Made

### 1. Archived Delta Data Files
All files referencing "Delta Data Defense" have been moved to `archive-delta-data/`:
- `index-var-indust.html`
- `index-old.html`
- `WhitePaper.html`
- `OnePageSelfAuditFlyer.html`
- `backup/index-v2.0-hud-design-20251220.html`
- `backup/index-v2.1-production-20251220.html`
- `backup/index-v2.2-production-20251221.html`
- `backup/VERSION_NOTES.md`

### 2. FF6 Version is Now Main Site
- `index.html` now serves the FF6 React version
- Original standard portfolio backed up to `backup/index-standard.html`
- `ff6-react.html` remains as an alternative entry point

### 3. Build Configuration
- Webpack configured for GitHub Pages (relative paths: `./`)
- Production build script updated
- GitHub Actions workflow created for automatic deployment

### 4. Repository Structure
```
├── index.html              # FF6 version (main site)
├── FF6PortfolioApp.jsx     # React component
├── index.jsx              # React entry
├── webpack.config.js      # Build config
├── package.json           # Dependencies
├── .github/workflows/     # CI/CD
│   └── deploy.yml        # Auto-deploy to GitHub Pages
├── backup/               # Version backups
│   ├── index-standard.html  # Original portfolio
│   └── index-og.html
├── archive-delta-data/   # Archived Delta Data files
└── dist/                # Build output (gitignored)
```

## Deployment Process

### Automatic (Recommended)
1. Push to `main` or `master` branch
2. GitHub Actions automatically:
   - Installs dependencies
   - Builds React app (`npm run build`)
   - Deploys to GitHub Pages

### Manual
```bash
npm install
npm run build
# Commit and push dist/ folder (if not using GitHub Actions)
```

## Testing Locally

```bash
# Development
npm start
# Opens http://localhost:3000

# Production build test
npm run build
python -m http.server 8000
# Open http://localhost:8000
```

## Important Notes

- **dist/** folder is gitignored (built by GitHub Actions)
- **Node modules** are gitignored
- **Build artifacts** are generated during CI/CD
- The site will be available at: `https://ericriveraisme.github.io`

## GitHub Pages Settings

Ensure GitHub Pages is configured to:
- Source: `gh-pages` branch (created by GitHub Actions)
- OR: Source: `/ (root)` if using manual deployment

---

*Last Updated: January 2025*

