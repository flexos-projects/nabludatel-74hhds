---
id: prototype-dashboard
title: "Prototypes"
type: prototype
subtype: dashboard
status: active
description: "Section dashboard — sitemap, versions, deploy config"
relatesTo:
  - docs/003-pages.md
  - docs/005-flows.md
createdAt: "{{created_at}}"
---

# Prototypes

This is the dashboard for the prototype section. Three flex_blocks below drive the UI — sitemap (which prototype represents which route), version history (per-page `{slug}-v{N}.html` files), and deploy config (preview URL + publish state).

See MEGA-SPEC §10 for the full pattern.

<flex_block type="instructions" id="blk-001" name="Prototype Chat">
You're helping the user iterate on HTML prototypes. Prototypes are visual and interaction targets — not production code.

When asked to build a new prototype:
1. Read the relevant page spec from `specs/` (look for `type: page, subtype: route`).
2. Read `design/tokens.md` and `design/components.md` for the visual vocabulary.
3. Write the prototype to `prototype/pages/{slug}-v{N}.html` with N = latest + 1.
4. Link to other pages using this file's sitemap `current` field, never runtime route paths.
5. Link shared CSS via `../shared/tokens.css` and `../shared/components.css`.
6. Load mock data from `../mock-data.json`.

When asked to deploy: run the html-rollup skill, then update the `deploy-config` block below with the new URL + sha.
</flex_block>

<flex_block type="sitemap" id="blk-002" name="Site Map">
{
  "entry": "dashboard-v2.html",
  "routes": [
    {
      "path": "/",
      "pageSpec": "specs/001-page-route_dashboard.md",
      "label": "Command Dashboard",
      "current": "dashboard-v2.html",
      "versions": ["dashboard-v1.html", "dashboard-v2.html"]
    },
    {
      "path": "/section/:id",
      "pageSpec": "specs/002-page-overlay_section-detail.md",
      "label": "Section Detail Overlay",
      "current": "section-detail-v1.html",
      "versions": ["section-detail-v1.html"]
    },
    {
      "path": "/coverage",
      "pageSpec": "specs/003-page-route_coverage.md",
      "label": "Coverage Matrix",
      "current": "coverage-v1.html",
      "versions": ["coverage-v1.html"]
    },
    {
      "path": "/landing",
      "pageSpec": "specs/010-page-route_landing.md",
      "label": "Public Landing Page",
      "current": "landing-v1.html",
      "versions": ["landing-v1.html"]
    }
  ]
}
</flex_block>

<flex_block type="prototype-versions" id="blk-003" name="Versions">
{
  "dashboard": [
    { "version": 1, "file": "dashboard-v1.html", "createdAt": "2026-04-20T12:00:00Z" },
    { "version": 2, "file": "dashboard-v2.html", "createdAt": "2026-04-20T13:00:00Z", "current": true }
  ],
  "section-detail": [
    { "version": 1, "file": "section-detail-v1.html", "createdAt": "2026-04-20T12:00:00Z", "current": true }
  ],
  "coverage": [
    { "version": 1, "file": "coverage-v1.html", "createdAt": "2026-04-20T12:00:00Z", "current": true }
  ],
  "landing": [
    { "version": 1, "file": "landing-v1.html", "createdAt": "2026-04-20T12:00:00Z", "current": true }
  ]
}
</flex_block>

<flex_block type="deploy-config" id="blk-004" name="Deploy">
{
  "target": "vercel-blob",
  "url": null,
  "protected": false,
  "lastDeployedAt": null,
  "lastDeployedSha": null,
  "history": []
}
</flex_block>
