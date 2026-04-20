---
id: space-forensic-analysis
title: "Forensic Intelligence"
type: space
status: planned
sequence: 22
relatesTo:
  - docs/002-features.md
  - docs/008-content.md
createdAt: "2026-04-20T11:46:23.871Z"
updatedAt: "2026-04-20T11:46:23.871Z"
---

# Forensic Intelligence

## Goal

Define the forensic prompts that Claude will use to scan transcripts. We need to identify specific Bulgarian linguistic markers for intimidation and ballot tampering to minimize false positives.

<flex_block type="space-config" id="blk-004" name="Config">
{
  "purpose": "Fine-tuning Claude's analysis of Bulgarian election transcripts.",
  "starterMessage": "Claude needs a forensic eye, not just a reading habit. We need to define the exact typologies of fraud it should look for in the Bulgarian transcripts. Which specific type of intimidation—verbal threats or procedural interference—should we train it to spot first?",
  "instructions": "Push for specific phrases or situational contexts that indicate fraud. Don't let the founder settle for generic 'suspicious activity' definitions. Demand high-signal reasoning."
}
</flex_block>
