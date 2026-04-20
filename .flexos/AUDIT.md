# Project Audit: Nabludatel
**Date:** 2026-04-20
**Type:** Standard Audit (Completeness, Consistency, Quality)

## 1. Completeness
*Is everything that should exist actually there?*

**Findings: INCOMPLETE**
- **Docs:** ✅ Complete (001-008 exist).
- **Specs:** ⚠️ Partial. Page specs (001-003), Database specs (004-007), and Feature specs (008-009) exist. **Missing:** Flow specs for "The Night-Shift Pipeline" and "Anomaly Triage" defined in `docs/005-flows.md`.
- **Design:** ❌ Broken structure. `design/tokens.json` exists, which violates the MEGA-SPEC. The source files (`tokens.md`, `components.md`, `layouts.md`) and compiled CSS (`tokens.css`, `components.css`) are missing.
- **Prototypes:** ❌ Missing. `prototype/pages/` contains an irrelevant `home-v1.html` instead of the required `dashboard`, `section-detail`, and `coverage` prototypes. `prototype/shared/` is empty (missing `mock-data.json`, `tokens.css`, `components.css`).
- **Content:** ⚠️ Partial. `001-context` exists. The geographic seed data mentioned in `docs/008-content.md` is not yet scaffolded.

## 2. Consistency
*Do specs match prototypes match content?*

**Findings: OUT OF SYNC**
- **Specs vs Docs:** ✅ Perfect alignment. The page, database, and feature specs perfectly reflect the requirements laid out in the holy docs.
- **Specs vs Prototypes:** ❌ Disconnected. Page specs explicitly reference `dashboard-v1.html`, `section-detail-v1.html`, and `coverage-v1.html` (all pending). They also reference `MOCK_DB.stats` and `MOCK_DB.anomalies`, which do not exist because `mock-data.json` hasn't been generated.
- **Downstream Alerts:** ❌ Unresolved. Page specs have active alerts requesting CSS classes (e.g., `.anomaly-card`, `.telemetry-panel`, `.pulse-indicator`) to be added to the design system, and mock data to be generated.

## 3. Quality
*Is the content good enough to ship?*

**Findings: EXCELLENT (Where it exists)**
- The holy docs and specs are exceptionally high quality. They perfectly capture the "Bloomberg Terminal meets Palantir" vision.
- The technical specifications (SQLite WAL mode, Node.js concurrency, `faster-whisper` VAD filters) are robust, production-ready, and highly specific.
- The forensic prompt engineering in `docs/008-content.md` is precise and well-constrained.

---

## Prioritised Action List
*What to fix first for maximum impact.*

### Priority 1: Fix the Design System Architecture
The design system is currently violating the MEGA-SPEC.
- **Action:** Convert `design/tokens.json` into a proper `design/tokens.md` file using `<flex_block type="tokens">`.
- **Action:** Create `design/components.md` and `design/layouts.md` to define the HTML structure for the components requested in the page specs (e.g., `.anomaly-card`, `.telemetry-panel`, `.slide-over`).
- **Action:** Compile these into `tokens.css` and `components.css` in `prototype/shared/`.

### Priority 2: Generate Mock Data
The prototypes cannot be built without the data structure.
- **Action:** Run `flexos-mock-data` to generate `prototype/mock-data.json` based on the SQLite database specs (`sections`, `processing_queue`, `transcripts`, `anomalies`). Ensure it includes `MOCK_DB.stats` as requested by the Dashboard spec.

### Priority 3: Build the Prototypes
The visual targets are missing.
- **Action:** Delete the irrelevant `prototype/pages/home-v1.html`.
- **Action:** Run `flexos-prototype` for `specs/001-page-route_dashboard.md`, `specs/002-page-overlay_section-detail.md`, and `specs/003-page-route_coverage.md`.

### Priority 4: Complete the Specs
- **Action:** Run `flexos-spec` to generate `specs/010-flow-backend_night-shift-pipeline.md` and `specs/011-flow-user_anomaly-triage.md` based on `docs/005-flows.md`.