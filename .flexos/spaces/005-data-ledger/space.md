---
id: "005-data-ledger"
title: "Data Integrity"
type: "space"
status: "planned"
priority: "later"
purpose: "Finalizing the SQLite schema for the election-night state machine."
starterMessage: "The SQLite database is our single source of truth for the entire night. If the power goes out, the ledger needs to tell us exactly where we left off. How should we structure the retry logic in the queue to handle sections that fail to download multiple times?"
instructions: "Be opinionated about data normalization. Ensure the relationship between Transcripts and Anomalies is rigid to prevent data loss. Push for a 'ledger-first' mentality."
relatesTo:
  - "docs/004-database.md"
created: "2026-04-20T11:46:23.871Z"
updated: "2026-04-20T11:46:23.871Z"
---

# Data Integrity

## Goal

Design a resilient schema that acts as an unbreakable ledger for all 12,000 sections. We need to ensure the ProcessingQueue can survive crashes and handle thousands of concurrent updates.
