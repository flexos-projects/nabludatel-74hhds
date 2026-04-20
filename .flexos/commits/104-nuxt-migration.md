---
id: commit-104
title: "Nuxt Migration — Vercel Deployment Setup"
type: commit
status: active
createdAt: "2026-04-20T13:30:00Z"
---

# Nuxt Migration — Vercel Deployment Setup

## Files Written
- app.vue (created)
- nuxt.config.ts (created)
- package.json (updated)
- .gitignore (created)
- assets/css/tokens.css (created)
- assets/css/components.css (created)
- pages/index.vue (created)
- pages/landing.vue (created)
- pages/coverage.vue (created)

## Summary
Converted the vanilla HTML prototypes into a Nuxt 3 application structure at the repository root. This prepares the frontend to be deployed to Vercel as requested by the user. The `app.vue` file acts as the root component, and the pages (`index.vue`, `landing.vue`, `coverage.vue`) have been migrated to Vue SFCs using the design system tokens and components.

## Downstream Alerts
- ALERT: The Express API (`server/api.ts`) is currently separate. For a full Vercel deployment, these endpoints should be migrated to Nuxt's `server/api/` directory (Nitro) or deployed alongside as a separate service.
