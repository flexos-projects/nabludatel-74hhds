---
id: flow-user-anomaly-triage
title: "Anomaly Triage"
type: flow
subtype: user
status: active
sequence: 11
description: "Triage and Verification User Flow"
relatesTo:
  - docs/005-flows.md
createdAt: "2026-04-20T12:00:00Z"
---

# Anomaly Triage

<flex_block type="flow" id="blk-001" name="anomaly-triage">
{
  "id": "flow-anomaly-triage",
  "title": "Anomaly Triage",
  "actor": "Human Observer / Journalist",
  "trigger": "A new anomaly appears on the dashboard",
  "outcome": "Potential fraud is verified with hard evidence in minutes instead of days.",
  "steps": [
    "User stares at Command Dashboard (`/`).",
    "New alert card flashes into the Anomaly Feed.",
    "User clicks the card.",
    "Section Detail overlay slides in.",
    "User reads Claude's reasoning and the surrounding transcript snippet.",
    "User decides if it warrants investigation.",
    "User clicks 'Watch Video @ [Time]'.",
    "New browser tab opens to `evideo.bg` at the exact timestamp.",
    "User watches the footage.",
    "User returns to dashboard and clicks either 'Mark Verified' or 'Mark False Positive'."
  ]
}
</flex_block>