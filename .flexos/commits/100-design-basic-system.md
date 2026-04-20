---
id: commit-001-design-system
title: "Initialize Design System — Nabludatel"
type: commit
status: active
sequence: 100
createdAt: "2026-04-20T13:00:00Z"
---

# Initialize Design System

## What changed
- Created `design/design-system.html` in `system` mode.
- Established OKLCH color tokens for both dark (primary) and light (forensic report) themes.
- Defined high-density, monospaced typography scale using JetBrains Mono.
- Created clinical UI primitives:
  - Sharp-edged buttons with terminal-inspired hover states.
  - Monospaced form inputs.
  - Functional badges and alerts for forensic status.
  - Telemetry and anomaly cards.
- Implemented live pulsing status indicator for pipeline state.
- Added theme toggle with local storage persistence.

## Rationale
The design system reflects the "Bloomberg Terminal meets Palantir" vision. It prioritizes information density and objective data presentation over consumer friendliness. Dark mode is optimized for night-shift observation, while light mode provides a "printed dossier" aesthetic for daytime review.

## Metrics
- Tokens: 24 color, 12 typography, 10 spacing.
- Primitives: 6 button variants, 4 input types, 4 badge types, 4 alert types, 2 card archetypes.
