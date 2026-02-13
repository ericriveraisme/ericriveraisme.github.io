# Mobile Responsiveness Issue

## Issue Found (2026-02-13)

**Problem:** Background characters and path are not visible on mobile devices in DevTools device toolbar.

**Observed Behavior:**
- Desktop view: Characters positioned correctly on path
- Mobile view (DPR 2, device toolbar enabled): Characters and path disappear or are off-screen

**Root Cause Analysis:**
The character positioning uses fixed offset calculations based on screen center and hardcoded pixel offsets that do not scale proportionally on mobile viewports:

```javascript
// Line 413 in FF6PortfolioApp.jsx
drawCharacter(p, cx + p.x * SCALE - (8*SCALE), partyY + p.y * SCALE, ...);
```

- `cx` = `canvas.width / 2` (responsive)
- `p.x` and `p.y` are fixed offsets (8, 36, 12, 40 tiles) designed for desktop
- `SCALE` is constant (3x), not responsive
- `horizonY` uses fixed percentage (40% of height), which may not adapt to mobile aspect ratios

On mobile (360px width), characters positioned at `cx + 36*SCALE = 180 + 108 = 288px` may fall outside visible bounds depending on actual canvas size.

---

## Impact

- Mobile users cannot see the portfolio background animation
- Affects user experience on primary mobile viewing
- Likely affects tablets and smaller screens

---

## Solution (Proposed)

### Option A: Adaptive positioning (Recommended)
- Calculate character positions as percentages of viewport rather than fixed pixel offsets
- Adjust horizon line and background layers based on aspect ratio
- Scale particle count and wind layers for smaller screens

### Option B: Separate mobile stylesheet
- Use CSS media queries to hide/show canvas background
- Display static background image or simplified animation on mobile

### Option C: Canvas scaling
- Keep fixed positioning but scale all objects by screen size ratio

**Recommendation:** Implement Option A alongside existing DPR scaling and adaptive quality (task 4b).

---

## Testing Checklist

- [ ] Test DevTools Device Toolbar (DPR 2, 375px widths)
- [ ] Test real mobile device (iOS Safari, Android Chrome)
- [ ] Test tablet dimensions (768px+)
- [ ] Verify responsive behavior on window resize down to mobile width

---

## Blocked By

- [ ] Complete DPR scaling (1a) - ✅ Done
- [ ] Complete adaptive quality (4b) - In progress

## Related Tasks

- Performance optimization plan: 1a, 2b, 3c, 4b
