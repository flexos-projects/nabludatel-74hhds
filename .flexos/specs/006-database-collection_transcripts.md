---
id: database-collection-transcripts
title: "Transcripts Collection"
type: database
subtype: collection
status: active
sequence: 6
description: "Raw output from faster-whisper stored as JSON arrays"
tags: [database, audio, ai]
relatesTo:
  - docs/004-database.md
createdAt: "2026-04-20T12:00:00Z"
---

# Transcripts Collection

## Purpose

Stores the raw JSON output from the local `faster-whisper` transcription. Kept in the database rather than as flat files to ensure atomic backups and easy querying for the dashboard UI.

<flex_block id="blk-001" type="data-schema">
collection: transcripts
fields:
  - name: section_id
    type: string
    required: true
    description: "Foreign key to sections.section_id"
    references: sections
  - name: content_json
    type: string
    required: true
    description: "Stringified JSON array of timestamped text segments: [{ start: 0.0, end: 5.5, text: '...' }]"
  - name: duration_seconds
    type: number
    required: true
    description: "Total length of the audio processed"
  - name: word_count
    type: number
    required: true
    description: "Total words transcribed"
indexes:
  - name: idx_transcripts_section
    fields: [section_id]
    description: "Lookup for the Section Detail overlay"
</flex_block>

## Access Patterns

| Operation | Who | When | Frequency |
|---|---|---|---|
| Create one | Orchestrator | After Whisper completes | Medium |
| Read one | Dashboard API | User opens Section Detail | Medium |

## Relationships

- `section_id` → `sections.section_id` (1:1 relationship)

## Constraints

- `content_json` must be valid JSON.
- Inserted atomically alongside the `processing_queue` status update to `analyzing`.
