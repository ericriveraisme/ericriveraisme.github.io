# Eric R. Rivera — Portfolio (FF6 Edition)

Final Fantasy 6-inspired interactive portfolio website showcasing NetDevOps expertise and automation work.

**Live Site:** [https://ericriveraisme.github.io](https://ericriveraisme.github.io)

## Overview

An immersive, retro gaming-inspired portfolio featuring:
- **Animated Canvas Background**: FF6 party members (Terra, Locke, Edgar, Celes) walking through a snowy Narshe landscape
- **RPG-Style UI**: Character sheets, skill bars, quest logs, and adventure timeline
- **Interactive Elements**: Watch mode toggle with background music
- **React + Webpack**: Modern build system with hot module replacement

## Features

- **Animated Background Scene**
  - Dark Magitek night sky with parallax mountains (Narshe cityscape)
  - Four FF6 party members (Terra, Locke, Edgar, Celes) with walking animations
  - Cactuar enemy sprite bouncing horizontally across the screen
  - Twinkling city lights with glow effects
  - Snow drift and wind effects obscuring the city
  - Snow particle system (150 animated flakes)
  - Atmospheric fog gradients

- **Portfolio Sections** (2x2 Grid Layout)
  - **Row 1:** Character Sheet (bio) | Active Quests (current projects)
  - **Row 2:** Skills (with level progression bars) | (spacer)
  - **Below:** Adventure Log (full-width work history with achievements)
  - Featured Project showcase (NetDevOps Complete) above grid

- **Interactive Controls**
  - Watch Mode toggle (play/pause background music)
  - Smooth transitions and animations
  - Responsive design for all screen sizes

## Tech Stack

- **React 18** - Component-based UI
- **Webpack 5** - Module bundling
- **Tailwind CSS** - Utility-first styling (via CDN)
- **Canvas API** - 2D sprite rendering and animations
- **Babel** - JavaScript transpilation
- **16-bit SNES Sprites** - Custom pixel art assets (characters and enemies)

## Project Structure

```
ericriveraisme.github.io/
├── index.html              # Main entry point
├── FF6PortfolioApp.jsx     # Main React component
├── index.jsx               # React entry point
├── webpack.config.js       # Webpack configuration
├── package.json            # Dependencies
├── .babelrc               # Babel configuration
├── src/
│   └── data/
│       └── resumeData.js   # Centralized resume/portfolio data
├── assets/
│   ├── styles.css         # Global styles
│   ├── script.js          # Utility scripts
│   └── sprites/           # 16-bit SNES style sprite assets
│       ├── ff6-characters.js    # Character sprite definitions
│       ├── ff6-enemies.js       # Enemy sprite definitions
│       ├── sprite-preview.html  # Sprite preview page
│       └── README.md            # Sprite documentation
├── archive-delta-data/    # Archived versions and old files
├── docs/                  # Project documentation
│   ├── README.md         # Documentation index
│   ├── DEV_SERVER_GUIDE.md
│   ├── CODE_REVIEW.md
│   └── [other docs]
└── dist/                 # Build output (generated, gitignored)
```

## Local Development

### Prerequisites
- Node.js 18+ and npm

### Development Server

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm start

# Server runs on http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Output: dist/bundle.js

# Serve locally to test production build
python -m http.server 8000
# Open http://localhost:8000
```

## Deployment

### GitHub Pages (Automatic)

The repository uses GitHub Actions to automatically build and deploy:

1. Push to `main` or `master` branch
2. GitHub Actions builds the React app
3. Deploys to GitHub Pages automatically

**Workflow:** `.github/workflows/deploy.yml`

### Manual Deployment

```bash
# Build the app
npm run build

# Commit and push dist/ folder
git add dist/
git commit -m "Build for production"
git push
```

## Design

**Theme:** Final Fantasy 6 - Narshe Opening Scene

**Color Palette:**
- Background: `#02040a` (Dark Magitek Night)
- Accent: `#06b6d4` (Cyan), `#3b82f6` (Blue)
- Text: `#e2e8f0` (Slate-200)
- Mountains: `#000000` (Black silhouette)

**Typography:**
- Headings: Cinzel (serif, fantasy style)
- Body: Monospace (8-bit gaming aesthetic)

## Archived Versions

Previous portfolio versions and archived projects are located in `archive-delta-data/` folder:
- **FF6 React HTML version**: ff6-react.html
- **Standard Portfolio**: index-standard.html  
- **Original Portfolio**: index-og.html
- **Delta Data Defense**: Historical project files

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Canvas API required for background animation
- Web Audio API for background music (optional)

## Performance

- Canvas rendering optimized with `requestAnimationFrame`
- Snow particles limited to 150 for smooth performance
- Proper cleanup of event listeners and animation frames

## Contact

- **GitHub:** [@ericriveraisme](https://github.com/ericriveraisme)
- **Location:** Paragould, Arkansas

---

© 2026 Eric R. Rivera
