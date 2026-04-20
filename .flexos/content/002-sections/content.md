---
id: collection-sections
title: "Sections Seed Data"
type: content
subtype: collection
collectionType: catalog
status: active
description: "Geographic seed data for polling stations."
createdAt: "2026-04-20T12:00:00Z"
---

<flex_block type="fields" id="blk-001" name="fields">
[
  { "id": "title", "label": "Section ID", "type": "text", "required": true, "identity": true },
  { "id": "region", "label": "Region", "type": "text" },
  { "id": "municipality", "label": "Municipality", "type": "text" },
  { "id": "settlement", "label": "Settlement", "type": "text" },
  { "id": "is_rural", "label": "Is Rural", "type": "boolean" },
  { "id": "video_url", "label": "Video URL", "type": "url" }
]
</flex_block>

# Sections Seed Data

Master list of all sections mapped to rural/urban status.
