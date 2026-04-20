---
id: flow-backend-night-shift-pipeline
title: "The Night-Shift Pipeline"
type: flow
subtype: backend
status: active
sequence: 10
description: "Autonomous Pipeline Execution flow"
relatesTo:
  - docs/005-flows.md
createdAt: "2026-04-20T12:00:00Z"
---

# The Night-Shift Pipeline

<flex_block type="flow" id="blk-001" name="night-shift-pipeline">
{
  "id": "flow-night-shift-pipeline",
  "title": "The Night-Shift Pipeline",
  "actor": "Python/Node Orchestrator Script",
  "trigger": "Script execution starts",
  "outcome": "One section fully processed, disk space preserved, dashboard updated.",
  "steps": [
    "Query `processing_queue` for next section where `status = pending`, ordered by `Sections.is_rural DESC`.",
    "Update `status = downloading`.",
    "Download `.mp4` from `evideo.bg`.",
    "Extract audio to `.wav` and **DELETE** `.mp4`.",
    "Update `status = transcribing`.",
    "Run `faster-whisper` locally on `.wav` to generate JSON transcript.",
    "**DELETE** `.wav`.",
    "Update `status = analyzing`.",
    "Send transcript to Claude CLI (`claude -p`) with forensic prompt.",
    "Parse Claude's JSON response.",
    "If anomalies found, write to `anomalies` table.",
    "Write transcript to `transcripts` table.",
    "Update `status = complete`."
  ]
}
</flex_block>