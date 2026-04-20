---
id: feature-primary-triage-dashboard
title: "Triage Dashboard & Telemetry"
type: feature
subtype: primary
status: active
sequence: 12
description: "The core UI feature for monitoring anomalies and system health."
tags: [ui, dashboard, triage]
relatesTo:
  - docs/002-features.md
  - specs/001-page-route_dashboard.md
  - specs/002-page-overlay_section-detail.md
createdAt: "2026-04-20T12:00:00Z"
---

# Triage Dashboard & Telemetry

## What This Feature Does

This feature encompasses the real-time monitoring and verification interface of Nabludatel. It allows human observers to see the output of the background pipeline, triage flagged anomalies, and monitor the health of the system itself.

## 1. Live Anomaly Feed

The core triage queue.

### Key Behaviours
- **Real-time Updates:** As the background pipeline inserts new records into the `anomalies` SQLite table, the feed updates automatically (via polling or SSE from the Express server).
- **Urgent Arrival:** New critical alerts flash with a high-contrast border for 1 second to demand attention.
- **Contextual Snippets:** Each card displays the AI's reasoning and a monospace snippet of the transcript with the exact trigger quote.
- **Severity Sorting:** Critical alerts (red) are prioritized over warnings (amber).

## 2. Instant Verification Links

Connecting the AI's claim to the source evidence.

### Key Behaviours
- **Deep Linking:** Clicking "Watch Video" opens the official `evideo.bg` URL and appends the exact timestamp (e.g., `#t=1h45m22s`) so the user jumps directly to the violation.
- **Context Preservation:** The verification happens in a new tab, or alongside the Section Detail overlay, ensuring the user doesn't lose their place in the triage queue.

## 3. System Telemetry

Reassuring the user that the machine is working.

### Key Behaviours
- **Live Pulse:** A visual indicator (red dot) that pulses to show the pipeline is active.
- **Metrics:** Displays Sections Queued, Processed, Critical Alerts, and Disk Space Saved.
- **Hardware Monitoring:** If disk space drops below 5GB, the telemetry panel flashes a critical system alert and halts the pipeline to prevent OS crashes.

## 4. Triage Actions

Closing the loop on an anomaly.

### Key Behaviours
- **Mark Verified:** Confirms the AI's finding. The anomaly is logged for export to authorities.
- **Mark False Positive:** Rejects the AI's finding. The anomaly is removed from the active feed.
- **State Persistence:** Triage actions update the `review_status` field in the `anomalies` table.

## Out of Scope
- Automated reporting to authorities (must be done manually by the journalist).
- Video playback directly within the dashboard (we link out to preserve bandwidth and avoid hosting liabilities).
