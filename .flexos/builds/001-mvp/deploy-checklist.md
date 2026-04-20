---
id: deploy-checklist
title: "Deploy Checklist — Nabludatel"
type: build
subtype: deploy
status: active
createdAt: "2026-04-20"
---

# Deploy Checklist — Nabludatel

## Pre-Deploy

### Build Status
- [x] All 4 build tasks verified PASS
- [x] No unresolved debug entries
- [x] Build log clean

### Environment Variables (set in local environment or .env)

**Required — app won't start without these:**
- [ ] `ANTHROPIC_API_KEY` — Required for Claude analysis. Get from console.anthropic.com.

**Optional:**
- [ ] `PORT` — Port for the Express server (defaults to 3000).
- [ ] `WHISPER_MODEL` — Whisper model to use (defaults to large-v3).
- [ ] `DATA_DIR` — Where the SQLite DB and temporary media files are stored.

### Deployment Target
- [ ] This is a local Node.js application. No cloud deployment required for the core app.
- [ ] Ensure Node.js 20+ and Python 3.10+ are installed on the target machine.
- [ ] Ensure `ffmpeg` is installed and available in the system PATH.
- [ ] Ensure `faster-whisper` is installed in the Python environment.

### Database
- [ ] Local SQLite database (`nabludatel.db`) will be created automatically on first run.
- [ ] Seed data is automatically loaded if the database is empty.

## SEO Verification (For Public Landing Page)
- [x] Homepage (`/landing.html`) title set to "Nabludatel | Forensic Election Monitoring"
- [ ] Missing meta description on `/landing.html`
- [ ] Missing OG tags on `/landing.html`
- [ ] Missing favicon

## Deploy

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start the application
npm start
```

## Post-Deploy Smoke Test

Run these checks on the local application:

### Critical Path
- [ ] CLI starts without errors
- [ ] Express server listens on port 3000
- [ ] Dashboard loads at `http://localhost:3000/`
- [ ] Telemetry stats update correctly
- [ ] Anomaly feed populates when mock data is generated

### Visual
- [ ] Dark mode renders correctly
- [ ] Monospace fonts load properly
- [ ] No console errors on any page

### Data
- [ ] SQLite database file is created
- [ ] Seed data is present in the database
- [ ] API routes (`/api/stats`, `/api/anomalies`) respond correctly

## Downstream Alerts
- ALERT: Missing SEO meta tags (description, og:title, og:description, og:image) on `public/landing.html`.
- ALERT: Missing favicon.ico in `public/`.
- ALERT: Hardcoded `http://localhost:${PORT}` in `server/index.ts` (acceptable for a local tool, but should be noted).
- ALERT: The landing page is currently served as a static HTML file within the local app. If it is meant to be a public marketing page, it needs to be deployed separately to a static host like Vercel or GitHub Pages.
