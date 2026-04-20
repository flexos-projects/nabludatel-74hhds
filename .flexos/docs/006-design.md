---
id: doc-design
title: Nabludatel — Design
type: doc
subtype: design
status: published
sequence: 6
createdAt: "2026-04-20T11:46:05.337Z"
updatedAt: "2026-04-20T11:46:05.337Z"
---

# Design

Nabludatel is a forensic tool. It does not use friendly consumer UI patterns. It borrows from the visual language of terminals, air traffic control, and financial trading platforms. Information density is high. Contrast is stark.

The palette is anchored in a deep, absolute dark mode. The background is a dense charcoal `oklch(15% 0.01 250)`, allowing the data to pop. Primary text is crisp and slightly cool. Accents are purely functional: Amber for warnings (procedural errors, delays), and an aggressive Crimson for critical alerts (intimidation, ballot tampering). 

Typography leans heavily on monospace fonts (JetBrains Mono or similar) for timestamps, section IDs, and statistical data. This ensures numbers align perfectly in columns, making it easy for the human eye to scan thousands of rows of telemetry. The body text for transcripts uses a highly legible sans-serif.

Motion is minimal and purposeful. When a new alert arrives, it doesn't bounce or fade softly; it flashes with a hard border, demanding attention. The UI communicates urgency and precision.

















---

<flex_block type="tokens" id="blk-001" name="colors">
{
  "category": "colors",
  "mode": "dark",
  "tokens": {
    "--color-bg": "oklch(15% 0.01 250)",
    "--color-surface": "oklch(20% 0.015 250)",
    "--color-surface-raised": "oklch(25% 0.02 250)",
    "--color-border": "oklch(35% 0.02 250)",
    "--color-text": "oklch(95% 0.01 250)",
    "--color-text-muted": "oklch(70% 0.02 250)",
    "--color-primary": "oklch(75% 0.12 250)",
    "--color-success": "oklch(70% 0.15 150)",
    "--color-warning": "oklch(75% 0.18 55)",
    "--color-danger": "oklch(65% 0.22 25)"
  }
}
</flex_block>

<flex_block type="tokens" id="blk-002" name="colors">
{
  "category": "colors",
  "mode": "light",
  "tokens": {
    "--color-bg": "oklch(98% 0.01 250)",
    "--color-surface": "oklch(100% 0 0)",
    "--color-surface-raised": "oklch(95% 0.02 250)",
    "--color-border": "oklch(85% 0.02 250)",
    "--color-text": "oklch(20% 0.02 250)",
    "--color-text-muted": "oklch(45% 0.02 250)",
    "--color-primary": "oklch(50% 0.12 250)",
    "--color-success": "oklch(50% 0.15 150)",
    "--color-warning": "oklch(60% 0.18 55)",
    "--color-danger": "oklch(55% 0.22 25)"
  }
}
</flex_block>

<flex_block type="tokens" id="blk-003" name="typography">
{
  "category": "typography",
  "tokens": {
    "--font-display": "system-ui, sans-serif",
    "--font-body": "system-ui, sans-serif",
    "--font-mono": "'JetBrains Mono', 'Fira Code', monospace"
  }
}
</flex_block>

<flex_block type="tokens" id="blk-004" name="spacing">
{
  "category": "spacing",
  "tokens": {
    "--space-1": "0.25rem",
    "--space-2": "0.5rem",
    "--space-3": "0.75rem",
    "--space-4": "1rem",
    "--space-6": "1.5rem",
    "--space-8": "2rem"
  }
}
</flex_block>

<flex_block type="tokens" id="blk-005" name="radii">
{
  "category": "radii",
  "tokens": {
    "--radius-sm": "0.125rem",
    "--radius-md": "0.25rem",
    "--radius-lg": "0.5rem",
    "--radius-full": "9999px"
  }
}
</flex_block>

<flex_block type="tokens" id="blk-006" name="shadows">
{
  "category": "shadows",
  "tokens": {
    "--shadow-sm": "0 1px 2px oklch(0% 0 0 / 0.5)",
    "--shadow-md": "0 4px 12px oklch(0% 0 0 / 0.5)",
    "--shadow-lg": "0 12px 32px oklch(0% 0 0 / 0.5)"
  }
}
</flex_block>

<flex_block type="tokens" id="blk-007" name="transitions">
{
  "category": "transitions",
  "tokens": {
    "--transition-fast": "150ms ease-out",
    "--transition-base": "280ms ease-out",
    "--transition-slow": "450ms cubic-bezier(0.4, 0, 0.2, 1)"
  }
}
</flex_block>
