# Changelog

All notable changes to the FF6 Portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Documentation
- Reworked `README.md` for clearer project purpose, architecture, current status, and near-term roadmap
- Clarified command usage and deployment expectations for contributors and future maintenance

## [1.3.1] - 2026-04-08

### Added
- New Lab Logs article: `hubris-hardening-and-the-resurrection-of-the-sovereign-lab` (JSON content format)
- Preserved original longform source draft in `raw-articles/Sovereign_Lab_DR_Chronicle_Draft.md`
- Standardized article sign-off block at the end of article pages:
  - *See you in the terminal.*
  - Author name (from article metadata)
  - *Sovereign Lab Architect (in training)*

### Changed
- Lab article detail rendering in `src/pages/LabArticlePage.jsx` to improve scannability and narrative flow:
  - Distinct visual hierarchy for H2 vs H3 headings
  - Section divider treatment before major act headings
  - Styled lesson callouts for paragraphs beginning with `Lesson:`
  - Improved list styling and spacing for faster visual parsing
  - Enhanced uncaptioned code blocks with terminal-style header chrome
- Updated article tone with conversational contractions for more natural voice
- Restored emoji/personality markers across section headers, lesson callouts, and key narrative beats

### Fixed
- Removed duplicated closing line from article body so global sign-off renders once in a consistent location

## [1.3.0] - 2026-03-22

### Added
- Production animated Lab Logs header component: `src/pages/LabLogsAnimatedHeader.jsx`
- Layered pixel-art Lab Logs scene including background props, CRT monitor, wizard animation, runes, particles, and neon title
- Compile interaction states in header scene (monitor compile output, wizard expression change, speech bubble)
- Standalone animation reference/tuning artifact: `assets/lab-logs-animation/animated-preview.html`

### Changed
- Lab Logs listing hero switched from static image to animated canvas header
- Wizard art direction iterated to mystical sage profile (crimson/purple/gold styling, improved silhouette, improved arm/shoulder anatomy)
- Lab Logs title glow treatment centered and constrained to lettering for cleaner neon effect
- Flask color/glow styling updated to stronger toxic green theme

### Fixed
- Lab Logs snippet extraction now supports both legacy string arrays and typed paragraph content blocks
- Multiple visual alignment issues in wizard layering and facial-hair continuity during expression changes

### Added
- Adaptive quality for low-power devices (reduced wind layers/sections and snow count)
- Mobile responsiveness issue documented for follow-up
- Performance testing checklist and updated optimization notes
- Forensic version-control runbook and PR evidence template for higher rollout visibility
- Automated forensic visibility workflow that emits per-run change reports in Actions
- LinkedIn header button (positioned left of GitHub)
- Character Sheet profile photo asset and framed avatar rendering
- Dedicated Active Quests data module (`src/data/activeQuests.js`)
- Active Quest status tags (Completed, In Progress, Next Up)
- New Active Quest: Hypervisor I Proxmox Home Lab (Future)
- Lab Logs animation concept-art asset pack in `assets/lab-logs-animation/`
- Static Lab Logs hero placeholder image for near-term production use
- **Hash-based routing for SPA compatibility**: Switched from BrowserRouter to HashRouter for all client-side navigation. Deep links now work reliably on GitHub Pages and always load the app, improving SEO and social preview reliability for all URLs.

### Changed
- Wind animation now uses a fixed 30fps timestep with offscreen caching
- Wind rendering uses an offscreen buffer to reduce per-frame CPU cost
- Performance documentation updated with measured LCP gains and deferred 1a
- LinkedIn and GitHub header links now open in new tabs
- Active Quests now sourced directly from the dedicated quests module (decoupled from resume data)
- Resume content refreshed with updated professional verbiage, core skills, contact details, and stronger experience bullets
- Character Sheet avatar now supports image fallback logic in place of emoji-only rendering
- Lab Logs page header now uses an edge-to-edge hero image with overlay Back to Home action
- Lab Logs placeholder image trimmed to remove bottom-right watermark artifact

### Documentation
- Added a new "Suggested Performance Enhancements (2026-02-26)" section in `docs/PERFORMANCE_NOTES.md`
- Updated README structure/details to reflect modularized Active Quests data and current behavior
- Added `.github/copilot-instructions.md` with codebase-specific AI guidance
- Added phased rollout/testing note for future Lab Logs header animation in `docs/NICE_TO_HAVE.md`
- **Documented hash-based routing update and SPA SEO implications in README and deployment notes.**

### Deferred
- DPR-aware canvas scaling (1a) rolled back due to shimmer and alignment issues

## [1.2.1] - 2026-02-12

### Added
- **Canvas Performance Optimizations**
  - Frame rate limiting (60fps cap) to prevent CPU overload on low-end devices
  - Resize event debouncing (250ms throttle) to reduce expensive canvas dimension updates
  - Dynamic wind effect optimization: skip wind rendering every other frame
  - Performance tracking infrastructure for FPS monitoring
  - Comprehensive performance comments documenting optimization rationale

### Changed
- Wind/snow drift effect now renders at 30fps (every other frame) instead of 60fps
- Resize events now debounced instead of firing on every pixel change
- Frame rate globally limited to 60fps max for consistent performance across hardware
- Updated loop() function JSDoc to document performance optimizations

### Performance
- Significant CPU reduction on lower-end devices (10-30% improvement estimated)
- View button toggle no longer lags on work laptops with integrated graphics
- Wind effect (most expensive operation) now 50% less frequent
- Resize performance improved by reducing canvas dimension calculations
- All visual quality preserved while improving responsiveness

## [1.2.0] - 2026-02-12

### Added
- **Code Quality & Documentation**
  - Comprehensive JSDoc comments for main App component
  - JSDoc documentation for `drawCharacter()` function (sprite rendering)
  - JSDoc documentation for `drawEnemy()` function (enemy animation)
  - JSDoc documentation for `loop()` function (main animation loop)
  - Detailed component overview with rendering pipeline documentation
  - Function signatures with parameter types and return values
  - Created `docs/NICE_TO_HAVE.md` with 12 future enhancement suggestions
  - Organized enhancements by priority and implementation effort
  - Added `_headers` file for HTTPS security headers on GitHub Pages

- **Security Headers** 
  - X-Content-Type-Options: nosniff (prevent MIME-type sniffing)
  - X-Frame-Options: DENY (prevent clickjacking)
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: disabled camera, microphone, geolocation

### Changed
- Removed Sentry error monitoring (overkill for small portfolio)
- Removed Sentry and @sentry/tracing npm packages
- Simplified monitoring to Web Vitals only (lightweight)
- Reduced bundle size by removing external dependencies

### Fixed
- Resolved Sentry initialization error ("t is not a function")
- Removed BrowserTracing integration causing compatibility issues
- Removed deprecated onFID Web Vitals API (replaced with onINP)

### Security
- Removed personal phone number from resumeData (prevent bot scraping)
- Removed specific location info (keep to "USA" only)
- Removed fake certifications (CKA, AWS) that didn't match work history
- Added Open Graph meta tags for secure social sharing
- Added security headers for HTTPS reinforcement

## [1.1.0] - 2026-02-12

### Changed
- **Content Layout Redesign**
  - Restructured grid from 3-column to responsive 2-column layout (`md:grid-cols-2`)
  - Character Sheet and Active Quests now display side-by-side in equal-width boxes
  - Skills moved to align with Character Sheet/Active Quests row
  - Adventure Log relocated below grid as full-width section with `mt-8` spacing
  - All grid boxes constrained to `max-h-96` with `overflow-y-auto` for consistent heights (except Adventure Log)
  - Adventure Log height unrestricted to display all work history entries

- **Header Layout**
  - Removed email display from header for cleaner aesthetic
  - Summon button maintains `mailto:` link functionality
  - Header improved with `flex-1` for better space distribution

- **UI/UX Improvements**
  - Character Sheet internal layout changed to always stack vertically (`flex-col`)
  - Better visual hierarchy with consistent box sizing
  - Improved breathing room between content sections
  - Fixed npm start script to not auto-open browser (prevents port conflict errors)

- **Project Organization**
  - Moved archived files to `archive-delta-data/` folder for cleaner structure
  - Removed unnecessary `backup/` directory
  - Updated `.gitignore` to maintain standards

### Fixed
- Portfolio box overflow causing content to extend entire page height
- Port 3000 already in use errors during development
- Grid layout inconsistency across breakpoints

## [1.0.0] - Previous Release
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
