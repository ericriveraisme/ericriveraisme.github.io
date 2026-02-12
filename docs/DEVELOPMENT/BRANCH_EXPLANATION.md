# Branch Structure - Simple Explanation

## The Two Branches

### 🌿 **Main Branch** (Where You Work)
**This is your development branch - where ALL your source code lives:**
- ✅ React source files (`FF6PortfolioApp.jsx`, `index.jsx`)
- ✅ Webpack config (`webpack.config.js`)
- ✅ Package files (`package.json`)
- ✅ Source `index.html` (references `./dist/bundle.js`)
- ✅ All documentation
- ✅ GitHub Actions workflow (`.github/workflows/deploy.yml`)

**You develop here, make changes here, commit here.**

---

### 📦 **gh-pages Branch** (What Visitors See)
**This is your DEPLOYED site - only built files:**
- ✅ `index.html` (the one that gets served)
- ✅ `dist/bundle.js` (compiled React app - 158 KB)

**That's it!** No source code, no node_modules, no config files.

**GitHub Pages serves this branch to visitors at `https://ericriveraisme.github.io`**

---

## How It Works

### Current Setup (Manual)
1. You work on `main` branch
2. You build: `npm run build` (creates `dist/bundle.js`)
3. You manually copy files to `gh-pages`:
   ```bash
   git checkout gh-pages
   git checkout main -- index.html dist/
   git add .
   git commit -m "Update site"
   git push origin gh-pages
   git checkout main
   ```

### Future Setup (Automatic - Already Configured!)
1. You push to `main`
2. GitHub Actions automatically:
   - Builds the app
   - Deploys to `gh-pages`
3. Site updates automatically!

---

## Why It's Blank

**The site was blank because:**
- ❌ `gh-pages` branch was empty (only had README)
- ❌ No `index.html` to serve
- ❌ No `dist/bundle.js` to load

**Now fixed:**
- ✅ `index.html` is on `gh-pages`
- ✅ `dist/bundle.js` is on `gh-pages`
- ✅ Site should work!

---

## Quick Reference

**To see what's on each branch:**
```bash
# Check main branch
git checkout main
ls

# Check gh-pages branch  
git checkout gh-pages
ls
```

**To update the site manually:**
```bash
# On main branch
npm run build

# Switch to gh-pages
git checkout gh-pages

# Get the built files
git checkout main -- index.html dist/

# Commit and push
git add .
git commit -m "Update site"
git push origin gh-pages

# Back to main
git checkout main
```

---

## Summary

- **Main** = Your workspace (source code)
- **gh-pages** = The live site (built files only)
- **GitHub Pages** serves `gh-pages` branch
- **Site URL:** `https://ericriveraisme.github.io`

---

*Last Updated: January 2025*

