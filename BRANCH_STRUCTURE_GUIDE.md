# Branch Structure Guide - GitHub Pages

## How It Works

### Main Branch (Source Code)
**Location:** `main` branch  
**Contains:**
- ✅ React source files (`FF6PortfolioApp.jsx`, `index.jsx`)
- ✅ Webpack configuration (`webpack.config.js`)
- ✅ Package files (`package.json`, `package-lock.json`)
- ✅ Source `index.html` (references `./dist/bundle.js`)
- ✅ All documentation and config files

**Purpose:** This is where you develop and make changes.

---

### gh-pages Branch (Built Site)
**Location:** `gh-pages` branch  
**Contains:**
- ✅ Built `index.html` (the one that gets served)
- ✅ `dist/bundle.js` (compiled React app)
- ✅ Any other static assets needed

**Purpose:** This is what GitHub Pages serves to visitors.

---

## How Deployment Works

1. **You push to `main`** with your source code changes
2. **GitHub Actions automatically:**
   - Builds the React app (`npm run build`)
   - Creates/updates `dist/bundle.js`
   - Deploys everything to `gh-pages` branch
3. **GitHub Pages serves** the `gh-pages` branch
4. **Visitors see** your live site at `https://ericriveraisme.github.io`

---

## Current Issue & Fix

**Problem:** The `gh-pages` branch is empty/blank, so the site shows nothing.

**Solution:** 
- ✅ Recreated GitHub Actions workflow
- ✅ Next: Push to main to trigger automatic deployment
- ✅ OR: Manually copy built files to gh-pages (quick fix)

---

## Quick Manual Fix (If Needed)

If you want to fix it immediately without waiting for GitHub Actions:

```bash
# On main branch
npm run build  # Build the app

# Switch to gh-pages
git checkout gh-pages

# Copy the built files
git checkout main -- index.html
git checkout main -- dist/

# Commit and push
git add .
git commit -m "Deploy FF6 portfolio"
git push origin gh-pages

# Switch back to main
git checkout main
```

---

## Automatic Deployment (Recommended)

Just push to main and GitHub Actions will handle everything:

```bash
# On main branch
git add .
git commit -m "Add GitHub Actions workflow for deployment"
git push origin main
```

Then check the Actions tab - it will build and deploy automatically!

---

*Last Updated: January 2025*

