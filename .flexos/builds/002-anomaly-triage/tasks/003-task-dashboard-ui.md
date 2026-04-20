---
id: task-dashboard-ui
title: "Triage Dashboard UI"
type: build
subtype: task
status: pending
dependsOn: [task-dashboard-api]
---

# Triage Dashboard UI

<flex_block type="instructions" id="blk-001">
INPUT SPECS:
- specs/001-page-route_dashboard.md
- specs/002-page-overlay_section-detail.md
- specs/012-feature-primary_triage-dashboard.md
- specs/011-flow-user_anomaly-triage.md

OUTPUT FILES:
- public/index.html

VISUAL TARGET: prototype/pages/dashboard-v2.html
</flex_block>

<flex_block type="acceptance" id="blk-002">
- Dashboard fetches real data from /api/stats and /api/anomalies.
- New anomalies flash with high contrast.
- Clicking an anomaly opens the Section Detail overlay.
- Overlay shows AI reasoning and highlighted transcript snippet.
- "Watch Video" button opens evideo.bg at the correct timestamp.
- "Mark Verified" and "Mark False Positive" call the POST API.
</flex_block>
