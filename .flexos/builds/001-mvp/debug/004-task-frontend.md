---
id: debug-task-frontend
title: "Debug: Frontend Dashboard"
type: build
subtype: debug
status: active
---

# Debug: Frontend Dashboard

## Failed Categories
- Category 4: Design Tokens Used
- Category 6: Visual Contract Matched

## Specific Findings
1. **Design Tokens**: Extensive use of inline styles with hardcoded pixel and rem values in `public/index.html`, `public/coverage.html`, `public/section.html`, and `public/landing.html`. For example, `padding: 2rem` instead of `var(--space-8)`, `border-radius: 0.25rem` instead of `var(--radius-md)`.
2. **Visual Contract**: The Section Detail view was implemented as a separate page (`public/section.html`) that navigates away from the dashboard. The spec and prototype (`prototype/pages/dashboard-v2.html`) explicitly require a slide-over panel (overlay) so the user does not lose sight of the main feed.
3. **Implementation Deviation**: The prototype uses Vue 3 for reactivity (to handle the overlay state), but the build task used vanilla JS and split the overlay into a separate HTML page.

## Suggested Fix Approach
1. Refactor `public/index.html` to include the Section Detail overlay within the same file, matching the structure of `prototype/pages/dashboard-v2.html`.
2. Introduce Vue 3 via CDN in `public/index.html` (as done in the prototype) to manage the state of the overlay and the anomaly feed, or implement the overlay toggle using vanilla JS without navigating away.
3. Replace all hardcoded inline styles with appropriate CSS classes from `components.css` or use design tokens from `tokens.css` (e.g., `var(--space-8)`, `var(--radius-md)`).
