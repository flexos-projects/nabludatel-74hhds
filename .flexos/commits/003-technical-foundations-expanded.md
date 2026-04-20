---
id: commit-003
title: "Expanded Technical Foundations and Database Specs"
type: commit
status: active
sequence: 18
createdAt: "2026-04-20T12:00:00Z"
---

# Expanded Technical Foundations and Database Specs

## What changed

- Created `specs/004-database-collection_sections.md` — Extracted Sections schema from holy doc.
- Created `specs/005-database-collection_processing-queue.md` — Extracted Processing Queue schema from holy doc.
- Created `specs/006-database-collection_transcripts.md` — Extracted Transcripts schema from holy doc.
- Created `specs/007-database-collection_anomalies.md` — Extracted Anomalies schema from holy doc.
- Created `specs/008-feature-primary_audio-pipeline.md` — Deep dive into ffmpeg, faster-whisper (VAD), and Claude API token management.
- Created `specs/009-feature-primary_orchestrator.md` — Detailed Node.js concurrency model, SQLite WAL mode, and resilient downloading.
- Updated `docs/004-database.md` — Refactored to reference the new database specs and added WAL mode note.
- Updated `docs/007-technical.md` — Expanded on audio extraction, VAD filters, prompt caching, and Node.js concurrency.

## Why

The initial technical and database documentation provided a good high-level overview but lacked the production-level specifics required for actual implementation. Specifically:
1. The database schemas needed to be broken out into standard FlexOS spec files.
2. The concurrency model between the heavy background pipeline and the Express server needed definition (SQLite WAL mode, single-concurrency orchestrator loop).
3. The AI audio pipeline needed crucial parameters defined (e.g., `vad_filter=True` for Whisper to avoid hallucination loops on long silences, 16kHz mono extraction via ffmpeg).
4. Anthropic API cost management needed explicit Prompt Caching instructions.

## Cascade Impact

- Build plan: The orchestrator tasks now have explicit concurrency and SQLite configuration requirements.
- Build plan: The audio extraction tasks now have explicit ffmpeg parameters.
