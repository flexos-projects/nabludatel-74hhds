---
id: task-dashboard-api
title: "Dashboard API Endpoints"
type: build
subtype: task
status: pending
dependsOn: []
---

# Dashboard API Endpoints

<flex_block type="instructions" id="blk-001">
INPUT SPECS:
- specs/009-feature-primary_orchestrator.md
- specs/004-database-collection_sections.md
- specs/005-database-collection_processing-queue.md
- specs/006-database-collection_transcripts.md
- specs/007-database-collection_anomalies.md

OUTPUT FILES:
- server/api.ts
</flex_block>

<flex_block type="acceptance" id="blk-002">
- GET /api/stats returns telemetry counts.
- GET /api/anomalies returns the latest anomalies.
- GET /api/sections/:id returns full section details and transcript.
- POST /api/anomalies/:id/review updates the review_status.
</flex_block>
