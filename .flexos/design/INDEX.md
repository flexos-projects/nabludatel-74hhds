# design/

The design system. Three source files + one rulebook + compiled CSS + generated HTML reference files. Singular folder — one cohesive system, not multiple instances.

## Structure

```
design/
├── INDEX.md                (this file)
│
├── tokens.md               — SOURCE: token flex_blocks (colors, type, spacing, etc.)
├── components.md           — SOURCE: component HTML flex_blocks
├── layouts.md              — SOURCE: layout HTML flex_blocks (page shells)
├── AI-INSTRUCTIONS.md      — Rulebook: how the AI must use the design system
│
├── tokens.css              — COMPILED from tokens.md (never edit directly)
├── components.css          — COMPILED from components.md (never edit directly)
│
├── design-system.html      — REFERENCE: every token rendered (swatches, scale)
├── components.html         — REFERENCE: every component rendered
├── layouts.html            — REFERENCE: every page shell rendered
└── compositions.html       — REFERENCE: full page patterns
```

## Three File Categories

**Source (`*.md`)** — editable by skills and humans. Flex_blocks enable surgical updates.

**Compiled (`*.css`)** — generated outputs. Prototype HTML files link to these. Never edited directly — always regenerated from source.

**Reference (`*.html`)** — generated from source. Used by the prototype skill as the copy-paste composition library. Also rendered in the Design rail's Preview tab.

## Three Layers

1. **Tokens** (`tokens.css`) — CSS custom properties. All visual values live here. Never hardcode — always `var(--token-name)`.
2. **Components** (`components.css`) — CSS classes that compose tokens into reusable visual components. Never reinvent — always use the class.
3. **Composition** (`components.html`, `layouts.html`, `compositions.html`) — HTML structure reference. The prototype skill copies blocks verbatim, never interprets.

## The Consistency Chain

```
Edit source (*.md)
  → flexos-design-css compiles tokens.css + components.css
  → flexos-design-system regenerates HTML reference files
  → flexos-prototype regenerates affected prototypes in prototype/pages/
  → all prototypes inherit the change automatically
```

See MEGA-SPEC §9 and `AI-INSTRUCTIONS.md` (the rulebook) for usage rules.
