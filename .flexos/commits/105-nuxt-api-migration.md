---
id: commit-105-nuxt-api-migration
title: "Nuxt API Migration & Vercel Setup"
type: commit
status: active
sequence: 105
createdAt: "2026-04-20T14:00:00Z"
---

# Nuxt API Migration & Vercel Setup

## What changed
- Created `app.vue` at the repository root to correctly mount the Nuxt application with `<NuxtLayout>` and `<NuxtPage />`.
- Migrated the Express API (`server/api.ts`) to Nuxt 3 Nitro API routes in `server/api/`:
  - `server/api/stats.get.ts`
  - `server/api/anomalies.get.ts`
  - `server/api/sections/index.get.ts`
  - `server/api/sections/[id].get.ts`
  - `server/api/anomalies/[id]/review.post.ts`
- Updated `pages/index.vue` to fetch data from the new Nitro API endpoints (`/api/stats` and `/api/anomalies`) and correctly fetch transcript data on demand.
- Updated `pages/coverage.vue` to fetch from the correct `/api/sections` endpoint.
- Created `vercel.json` to configure the Vercel deployment explicitly.

## Why
The user requested that the app be ready to run and deploy to Vercel as a Vue Nuxt app. The previous commit (104) migrated the frontend pages but left the Express API separate. By migrating the API to Nitro and setting up `app.vue` and `vercel.json`, the application is now a fully integrated Nuxt 3 project ready for zero-config Vercel deployment.

## Files affected
- `app.vue` (created)
- `vercel.json` (created)
- `server/api/stats.get.ts` (created)
- `server/api/anomalies.get.ts` (created)
- `server/api/sections/index.get.ts` (created)
- `server/api/sections/[id].get.ts` (created)
- `server/api/anomalies/[id]/review.post.ts` (created)
- `pages/index.vue` (updated)
- `pages/coverage.vue` (updated)
