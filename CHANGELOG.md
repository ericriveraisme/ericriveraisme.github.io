# Changelog

All notable changes to the FF6 Portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- 16-bit SNES style sprite assets in `assets/sprites/` folder
  - Character sprites (Terra, Locke, Edgar, Celes) with front and back views
  - Enemy sprites (Cactuar) with horizontal flipping support
  - Sprite preview page (`sprite-preview.html`) for viewing all sprites
- Cactuar enemy sprite bouncing horizontally across the screen
- Horizontal sprite flipping when enemy changes direction
- Twinkling city lights with intensity-based glow effects
- Snow drift and wind effects using Bezier curves for smooth animation
- Character staggering in zig-zag diagonal pattern across the roadway
- City background improvements with more visible structures and lighting

### Changed
- Refactored sprite definitions from hardcoded arrays to separate asset files
  - `assets/sprites/ff6-characters.js` - Character sprite definitions
  - `assets/sprites/ff6-enemies.js` - Enemy sprite definitions
- Character sprites redesigned to match actual FF6 game sprites
  - Updated colors and designs based on reference images
  - More accurate character appearances (Terra's purple top/red skirt, Locke's colorful bandana, etc.)
- Cactuar sprite refined to match classic FF6 Cactuar/Cactrot design
  - Compact rectangular body (12-14 pixels tall)
  - Square head with two black dot eyes
  - Horizontal arms and stubby legs
  - Dark green shading on right side for depth
- Characters now show only their backs as they walk toward city lights
- City lights made more visible with lighter background
- Snow drift effects smoothed and made more fluid with sectioned generation
- Camera scrolling direction reversed (upward movement)

### Fixed
- Sprite import/export compatibility (ES6 modules for webpack, CommonJS/global for direct HTML)
- Character positioning to ensure all characters are on dark road tiles
- Cactuar positioning to prevent overlap with characters
- Port conflicts during development (automatic cleanup)

### Technical
- Improved asset organization following web development best practices
- Sprite files support both ES6 module imports and direct script tag usage
- Webpack configuration handles sprite asset imports correctly
- Build process optimized for GitHub Pages deployment

## [1.0.0] - 2025-01-XX

### Added
- Initial FF6-inspired portfolio website
- Animated canvas background with FF6 party members
- RPG-style UI elements (character sheets, skill bars, quest logs)
- Watch mode toggle with background music
- GitHub Actions workflow for automatic deployment
- React + Webpack build system
- Responsive design for all screen sizes

### Changed
- Migrated from standard portfolio to FF6-themed design
- Archived Delta Data Defense files to `archive-delta-data/` folder

---

## Archive: Delta Data Defense (Pre-FF6)

Previous changelog entries for the Delta Data Defense portfolio are archived in `archive-delta-data/VERSION_NOTES.md`.
