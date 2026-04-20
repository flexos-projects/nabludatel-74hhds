---
id: feature-primary-orchestrator
title: "Node.js Orchestrator & Concurrency"
type: feature
subtype: primary
status: active
sequence: 9
description: "Architecture for the local Node.js pipeline and Express server"
tags: [architecture, nodejs, sqlite]
relatesTo:
  - docs/007-technical.md
createdAt: "2026-04-20T12:00:00Z"
---

# Node.js Orchestrator & Concurrency

## What This Feature Does

Defines how the single Node.js process manages the heavy background processing loop (downloading, ffmpeg, python child processes) without blocking the Express.js server that serves the real-time UI to the user.

## Architecture: The Two Loops

The system runs a single `index.ts` file that initializes two independent asynchronous domains:

### 1. The Express Server Loop
- Runs on the main event loop on port `3000`.
- Serves static HTML/JS/CSS from a `public/` directory.
- Exposes lightweight JSON endpoints (`/api/stats`, `/api/anomalies`).
- Queries SQLite synchronously using `better-sqlite3`. Because queries are simple `SELECT` statements, they take < 1ms and do not block the event loop.

### 2. The Orchestrator Loop
- An async recursive function `processNextSection()` that runs continually.
- **Concurrency Limit:** Strictly `1`. Processing multiple videos simultaneously will exhaust consumer RAM/VRAM and disk space.
- Uses `child_process.spawn` for heavy lifting (`ffmpeg` and Python). This offloads the CPU-bound work to the OS, keeping the Node.js event loop completely free to handle API requests from the dashboard.

## Database Concurrency (WAL Mode)

Because the Orchestrator is writing to the database (updating statuses, inserting anomalies) at the exact same time the Express Server is reading from it (polling for dashboard updates), SQLite must be configured correctly to avoid `SQLITE_BUSY` locks.

### Required `better-sqlite3` Configuration
```javascript
const db = new Database('nabludatel.db');
db.pragma('journal_mode = WAL'); // Write-Ahead Logging
db.pragma('synchronous = NORMAL');
db.pragma('busy_timeout = 5000'); // Wait up to 5s if locked
```
WAL mode allows simultaneous readers and writers. This is the secret sauce that makes a zero-config local database viable for a real-time dashboard.

## Resilient Networking (Downloader)

Downloading 2GB files from government servers over consumer internet will fail frequently.

### Key Behaviours
- Use a robust HTTP client like `got` or standard `fetch` with manual chunking/streams.
- **Stream directly to disk:** `response.body.pipe(fs.createWriteStream('tmp/video.mp4'))`. Never load the video into RAM.
- **Timeouts:** Set strict read timeouts. If the server hangs for 30 seconds, abort the request, increment `retry_count` in the DB, and restart the download.
- **Cleanup on abort:** If a download fails halfway, the partial `.mp4` file MUST be deleted before retrying to prevent disk bloat.

## Graceful Shutdown

If the user hits `Ctrl+C`:
1. The Express server stops accepting new connections.
2. The Orchestrator loop halts (does not pick up the next section).
3. Any running `ffmpeg` or `python` child processes are sent a `SIGTERM` signal to kill them immediately.
4. The current section's status is reverted from `downloading` or `transcribing` back to `pending`.
5. Temporary files in `tmp/` are deleted.
6. The SQLite connection is closed safely.
