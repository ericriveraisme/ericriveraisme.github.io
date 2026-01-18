# Eric R. Rivera — Portfolio

Personal portfolio website showcasing IT expertise, NetDevOps projects, and automation work.

**Live Site:** [https://ericriveraisme.github.io](https://ericriveraisme.github.io)

## Overview

Responsive single-page portfolio with client-side GitHub API integration. Features a fantasy-inspired design with professional aesthetics, highlighting projects and technical skills.

## Features

- **Featured Project Section**: Automatically highlights the `netdevops-complete` repository when available, otherwise displays the most recently updated repository
- **Dynamic Repository List**: Fetches and displays up to 18 active public repositories with language composition percentages
- **Responsive Design**: Mobile-first layout optimized for all screen sizes
- **Fantasy-Inspired Aesthetics**: D20 SVG icon, background fantasy scene (mountains, castle silhouette), and Cinzel serif headings

## Design

**Color Palette:**
- Background: `#f6fbf9` (light, approachable)
- Accent: `#2f7f56` (deeper green)
- Text: `#0b2a20` / `#5e766a` (dark/muted)

**Typography:**
- Headings: Cinzel (Google Fonts)
- Body: Inter (Google Fonts)

## Files

- **index.html** - Portfolio structure with hero, bio, featured project, projects list, and skills sections
- **assets/styles.css** - Light theme with responsive grid layouts
- **assets/script.js** - GitHub API integration with featured repository preference

## Local Development

```bash
# Serve locally
python3 -m http.server 8000
# Open http://localhost:8000
```

**Note:** GitHub API integration works best when deployed. Local CORS restrictions may affect API calls during local testing.

## Technical Details

The portfolio uses client-side JavaScript to fetch repository data from the GitHub API:

```javascript
const preferredFeatured = 'netdevops-complete';
// Fetches repos, prefers netdevops-complete, falls back to most recent
```

- Fetches up to 200 repositories
- Displays 18 active repositories (excludes forks and archived)
- Computes language composition percentages

## Contact

- **GitHub:** [@ericriveraisme](https://github.com/ericriveraisme)
- **Location:** Paragould, Arkansas

---

© 2026 Eric R. Rivera
