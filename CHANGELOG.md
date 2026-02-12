# Changelog

All notable changes to the FF6 Portfolio project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
