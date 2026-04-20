---
id: design-tokens
title: "Design Tokens"
type: design
status: active
sequence: 25
createdAt: "2026-04-20T11:46:23.871Z"
updatedAt: "2026-04-20T12:00:00Z"
---

# Design Tokens

<flex_block type="tokens" id="blk-007" name="colors-dark">
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

<flex_block type="tokens" id="blk-008" name="colors-light">
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

<flex_block type="tokens" id="blk-009" name="typography">
{
  "category": "typography",
  "tokens": {
    "--font-display": "system-ui, sans-serif",
    "--font-body": "system-ui, sans-serif",
    "--font-mono": "'JetBrains Mono', 'Fira Code', monospace"
  }
}
</flex_block>

<flex_block type="tokens" id="blk-010" name="spacing">
{
  "category": "spacing",
  "tokens": {
    "--space-1": "0.25rem",
    "--space-2": "0.5rem",
    "--space-3": "0.75rem",
    "--space-4": "1rem",
    "--space-6": "1.5rem",
    "--space-8": "2rem",
    "--space-12": "3rem",
    "--space-16": "4rem",
    "--space-24": "6rem"
  }
}
</flex_block>

<flex_block type="tokens" id="blk-011" name="radii">
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

<flex_block type="tokens" id="blk-012" name="shadows">
{
  "category": "shadows",
  "tokens": {
    "--shadow-sm": "0 1px 2px oklch(0% 0 0 / 0.5)",
    "--shadow-md": "0 4px 12px oklch(0% 0 0 / 0.5)",
    "--shadow-lg": "0 12px 32px oklch(0% 0 0 / 0.5)"
  }
}
</flex_block>

<flex_block type="tokens" id="blk-013" name="transitions">
{
  "category": "transitions",
  "tokens": {
    "--transition-fast": "150ms ease-out",
    "--transition-base": "280ms ease-out",
    "--transition-slow": "450ms cubic-bezier(0.4, 0, 0.2, 1)"
  }
}
</flex_block>
