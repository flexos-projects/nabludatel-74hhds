---
id: database-collection-processing-queue
title: "Processing Queue Collection"
type: database
subtype: collection
status: active
sequence: 5
description: "State machine tracking each section's journey through the pipeline"
tags: [database, queue, state-machine]
relatesTo:
  - docs/004-database.md
  - docs/005-flows.md
createdAt: "2026-04-20T12:00:00Z"
---

# Processing Queue Collection

## Purpose

Acts as the unbreakable ledger and state machine for the 12,000 records. If the power goes out, SQLite ensures the system boots back up exactly where it left off by reading this table.

<flex_block id="blk-001" type="data-schema">
collection: processing_queue
fields:
  - name: section_id
    type: string
    required: true
    description: "Foreign key to sections.section_id"
    references: sections
  - name: status
    type: enum
    required: true
    description: "Current state in the pipeline"
    enum_values: [pending, downloading, transcribing, analyzing, complete, failed]
  - name: retry_count
    type: number
    required: true
    description: "Number of times the current step has been retried"
    default: 0
  - name: error_log
    type: string
    required: false
    description: "Last error message if status is failed or retrying"
  - name: updated_at
    type: date
    required: true
    description: "ISO timestamp of the last state change"
indexes:
  - name: idx_queue_status
    fields: [status]
    description: "Crucial for the orchestrator to find the next pending task and for dashboard stats"
</flex_block>

## Access Patterns

| Operation | Who | When | Frequency |
|---|---|---|---|
| Read next `pending` | Orchestrator | Every pipeline loop | High |
| Update `status` | Orchestrator | Step transitions | High |
| Count by `status` | Dashboard API | Telemetry polling | High (every 5s) |

## Relationships

- `section_id` → `sections.section_id` (1:1 relationship)

## Constraints

- Only one record per `section_id`.
- `retry_count` resets to 0 when successfully transitioning to a forward state.
- If `retry_count` > 3, status is forced to `failed`.
