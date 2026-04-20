---
id: database-collection-sections
title: "Sections Collection"
type: database
subtype: collection
status: active
sequence: 4
description: "Master list of all polling stations in Bulgaria"
tags: [database, core]
relatesTo:
  - docs/004-database.md
createdAt: "2026-04-20T12:00:00Z"
---

# Sections Collection

## Purpose

Stores the master list of all 12,000+ polling stations in Bulgaria. This collection is pre-seeded before the pipeline starts and acts as the foundational geographic lookup table.

<flex_block id="blk-001" type="data-schema">
collection: sections
fields:
  - name: section_id
    type: string
    required: true
    description: "Unique 9-digit official section code (e.g., '152400019')"
  - name: region
    type: string
    required: true
    description: "Administrative region (Oblast)"
  - name: municipality
    type: string
    required: true
    description: "Municipality (Obshtina)"
  - name: settlement
    type: string
    required: true
    description: "City or village name"
  - name: is_rural
    type: boolean
    required: true
    description: "Flag indicating if the settlement is a village/rural area. Drives the village-first prioritization."
  - name: video_url
    type: string
    required: false
    description: "The constructed evideo.bg URL for the section's recording"
indexes:
  - name: idx_sections_is_rural
    fields: [is_rural]
    description: "Supports the prioritization query for the processing queue"
  - name: idx_sections_region
    fields: [region]
    description: "Supports filtering in the Coverage Matrix"
</flex_block>

## Access Patterns

| Operation | Who | When | Frequency |
|---|---|---|---|
| Read all by `is_rural` | Orchestrator | Queue initialization | Low (on startup) |
| Read one by `section_id` | Dashboard | User opens section detail | Medium |
| Read all | Dashboard | User opens Coverage Matrix | Medium |
| Create | Seed Script | Pre-election setup | Once |

## Relationships

- Referenced by `processing_queue.section_id`
- Referenced by `transcripts.section_id`
- Referenced by `anomalies.section_id`

## Constraints

- `section_id` must be exactly 9 digits.
- Read-only during pipeline execution (only seeded once).
