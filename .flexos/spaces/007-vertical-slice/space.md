---
id: "space-vertical-slice"
title: "Vertical Slice: Anomaly Triage"
type: "space"
status: "active"
sequence: 7
description: "Defining and auditing the core vertical slice of the product."
relatesTo:
  - "docs/001-vision.md"
  - "docs/002-features.md"
createdAt: "2026-04-20T12:00:00Z"
---

# Vertical Slice: Anomaly Triage

## Slice Definition

**Name:** Anomaly Triage & Verification
**Persona:** Human Observer / Investigative Journalist
**Wedge Feature:** The Triage Dashboard & Instant Verification Links (the "if this doesn't work, nothing else matters" feature, as it surfaces the actual fraud).

**Journey (Pages):**
1. **Public Landing Page (`/landing`)** — First impression, understands the value prop, downloads the CLI.
2. **Command Dashboard (`/`)** — Monitors the live feed of anomalies overnight.
3. **Section Detail Overlay (`/section/:id`)** — Opens a specific critical anomaly to read Claude's reasoning and the transcript context.
4. **External Verification (`evideo.bg`)** — Clicks the direct timestamp link to watch the source video.

**Features Exercised:**
- Triage Dashboard (Live Anomaly Feed, Instant Verification Links)
- System Telemetry

**Database Collections Touched:**
- `sections` (Read)
- `processing_queue` (Read)
- `anomalies` (Read, Update review_status)
- `transcripts` (Read)

**Flows Walked:**
- `flow-user_anomaly-triage`

**Success State:**
The observer successfully identifies a critical anomaly, reads the exact transcript snippet, clicks the timestamp, verifies the fraud on the video, and marks the anomaly as "Verified".
