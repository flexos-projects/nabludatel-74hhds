---
id: collection-context
title: "Context"
type: content
subtype: collection
collectionType: freeform
status: active
description: "Catch-all knowledge base. Company info, team bios, brand voice, research notes — anything the AI should know."
createdAt: "{{created_at}}"
---

<flex_block type="fields" id="blk-001" name="fields">
[
  { "id": "title", "label": "Name", "type": "text", "required": true, "identity": true }
]
</flex_block>

# Context

The default collection that ships with every FlexOS project. `collectionType: freeform` — no structured schema beyond the identity field. Records here are prose-first: the body is the signal, the `data` block can stay empty.

Use this for anything the AI should know about the project that doesn't belong in a structured collection:

- Company/product background
- Team bios
- Brand voice and tone guidelines
- Research notes
- Competitor references
- Anything pasted from Slack/email/Notion that provides context

Add records via `+ New record` in the Records tab — they land in `records/NNN-{slug}.md`.
