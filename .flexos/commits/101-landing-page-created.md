---
id: commit-101-landing-page
title: "Landing Page Created and Design System Fixed"
type: commit
status: active
sequence: 101
createdAt: "2026-04-20T12:00:00Z"
---

# Landing Page Created and Design System Fixed

## What changed
- Created `specs/010-page-route_landing.md` for the public marketing landing page.
- Updated `docs/003-pages.md` to include the new `/landing` route.
- Fixed the design system architecture (Priority 1 from Audit):
  - Converted `design/tokens.json` to `design/tokens.md`.
  - Created `design/components.md` and `design/layouts.md`.
  - Compiled tokens and components to `prototype/shared/tokens.css` and `prototype/shared/components.css`.
- Generated the landing page prototype at `prototype/pages/landing-v1.html`.
- Updated `prototype/prototype.md` to include the landing page in the sitemap.

## Why
The user requested a high-converting, technical landing page to distribute the Nabludatel CLI to journalists and watchdogs. The design system architecture needed to be fixed first to support the prototype generation according to the MEGA-SPEC.

## Downstream Alerts
- None.
