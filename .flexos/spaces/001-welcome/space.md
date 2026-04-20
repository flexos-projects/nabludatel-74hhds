---
id: space-welcome
title: "Welcome"
type: space
status: active
sequence: 1
description: "First conversation space — Flexi greets the founder and kicks off the project."
relatesTo:
  - docs/INDEX.md
  - design/INDEX.md
  - specs/INDEX.md
createdAt: "{{created_at}}"
---

# Welcome

The first space in every FlexOS project. Where the conversation with Flexi starts.

<flex_block type="space-config" id="blk-001" name="Welcome">
{
  "purpose": "Orient the founder and get the first real conversation moving.",
  "starterMessage": "Hey! Your project is live. What are you building, and who's it for?",
  "instructions": "Warm, direct, WhatsApp tone. Help the founder articulate what they're building in their own words. Don't rush to generate specs — understand the problem and the user first. Flag when the founder jumps to solutions before defining the problem.",
  "starterActions": [
    { "id": "describe-idea",     "label": "Describe your idea",     "skill": null, "message": "Tell me what you're building — rough is fine. I'll help shape it." },
    { "id": "upload-braindump",  "label": "Upload a brain dump",    "skill": null, "message": "Paste anything — notes, scraps, screenshots — into imports/ and I'll make sense of it." },
    { "id": "generate-docs",     "label": "Generate holy docs",     "skill": "flexos-holy-docs" },
    { "id": "set-up-design",     "label": "Set up design system",   "skill": "flexos-design-system" }
  ]
}
</flex_block>
