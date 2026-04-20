---
id: feature-primary-audio-pipeline
title: "Audio & AI Pipeline Foundations"
type: feature
subtype: primary
status: active
sequence: 8
description: "Production-grade configuration for ffmpeg, faster-whisper, and Anthropic API."
tags: [audio, ai, python, ffmpeg]
relatesTo:
  - docs/007-technical.md
  - docs/008-content.md
createdAt: "2026-04-20T12:00:00Z"
---

# Audio & AI Pipeline Foundations

## What This Feature Does

This defines the exact technical specifications and parameters for the three heavy-lifting components of the Nabludatel pipeline: extracting audio from massive video files, transcribing it locally using Voice Activity Detection (VAD), and feeding it to Claude for forensic analysis.

## 1. Audio Extraction (`ffmpeg`)

Video files from `evideo.bg` can be up to 10 hours long and several gigabytes in size. We do not need high-fidelity audio, nor do we need stereo.

### Technical Parameters
- **Tool:** `fluent-ffmpeg` (Node.js wrapper) calling local `ffmpeg` binary.
- **Sample Rate:** `16000 Hz` (Whisper models are trained natively on 16kHz audio. Resampling beforehand saves Whisper from doing it on the fly, saving CPU/RAM).
- **Channels:** `1` (Mono).
- **Bitrate:** `64k` (Sufficient for speech recognition, drastically reduces intermediate `.wav` file size).
- **Format:** `.wav` (Avoids compression artifacts that can confuse the Whisper model).

### Key Behaviours
- Streams the download directly into `ffmpeg` if possible, or downloads to a `.mp4` and extracts. Given network instability, downloading to `tmp/video.mp4` first, then extracting to `tmp/audio.wav`, then deleting `tmp/video.mp4` is the safest approach.

## 2. Local Transcription (`faster-whisper`)

`faster-whisper` is a reimplementation of OpenAI's Whisper using CTranslate2. It is up to 4x faster and uses less memory.

### Technical Parameters
- **Model:** `large-v3` (Required for accurate Bulgarian transcription).
- **Compute Type:** `float16` (if NVIDIA GPU available) or `int8` (for CPU/Mac to save RAM).
- **Language:** Hardcoded to `bg` (Bulgarian) to prevent the model from hallucinating translations or language-switching during long silences.
- **VAD Filter (Voice Activity Detection):** `vad_filter=True`. **CRITICAL.** Election videos contain hours of absolute silence. Without VAD, Whisper hallucinates repetitive text (e.g., "Thank you, thank you, thank you"). VAD strips silence before passing audio to the model, reducing a 10-hour video to perhaps 2 hours of actual speech processing.

### Implementation
- Node.js spawns a Python child process (`python3 scripts/transcribe.py --audio tmp/audio.wav`).
- The Python script outputs a strict JSON array to `stdout`.
- Node.js captures `stdout`, parses the JSON, and writes to SQLite.

## 3. Forensic Analysis (Anthropic API)

Claude 3.5 Sonnet has a 200,000 token context window. A typical 10-hour election section might yield 10,000 to 30,000 words (roughly 15k-40k tokens), which fits comfortably in a single prompt.

### Technical Parameters
- **SDK:** `@anthropic-ai/sdk` (Node.js).
- **Model:** `claude-3-5-sonnet-20241022`.
- **Temperature:** `0.0` (We want deterministic, forensic extraction, not creative writing).
- **Prompt Caching:** The massive system prompt (defined in Doc 8) is sent with `{"cache_control": {"type": "ephemeral"}}`. This reduces API costs by up to 90% since the system prompt is identical for all 12,000 sections.
- **Response Format:** Forced JSON output. We append "Respond ONLY with valid JSON" and pre-fill the assistant's response with `{` to force the output structure.

### Key Behaviours
- If the token count exceeds 150,000 tokens (an exceptionally chatty polling station), the Node.js orchestrator must chunk the transcript into two halves and make two parallel API calls, merging the resulting anomalies arrays.

## Not v1 (Explicitly Out of Scope)
- Speaker Diarization (identifying *who* is speaking). It is too computationally expensive for consumer hardware and not strictly necessary for the AI to detect the *content* of a violation.
- Cloud transcription fallback. If local Whisper fails, the section fails. We do not incur cloud costs.
