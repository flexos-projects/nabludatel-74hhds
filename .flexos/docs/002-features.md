---
id: doc-features
title: Nabludatel — Features
type: doc
subtype: features
status: published
sequence: 2
createdAt: "2026-04-20T11:46:05.337Z"
updatedAt: "2026-04-20T11:46:05.337Z"
---

# Features

### The Village-First Engine
Election fraud rarely happens in the center of Sofia under the eyes of international observers. It happens in villages. Nabludatel’s orchestration engine intelligently prioritizes the queue. It starts with the smallest municipalities and works its way up to the major cities, ensuring the most vulnerable sections are processed first while the servers still have maximum bandwidth.

### Local Whisper Transcription
To handle thousands of hours of video without incurring massive API costs, the system utilizes `faster-whisper` running locally. It downloads the `.mp4`, strips the audio, transcribes the Bulgarian dialogue with timestamps, and immediately deletes the heavy video file to preserve disk space. The raw audio becomes searchable, indexable text.

### Headless Forensic Analysis (Claude)
The transcripts are fed directly into Anthropic's Claude via the headless CLI interface. Claude operates under a strict forensic prompt, scanning the text for specific typologies of election manipulation: ballot tampering, intimidation of SIK (Section Election Commission) members, unauthorized persons, and unexplained counting delays. It doesn't just read; it reasons about the context of the conversation.

### Triage Dashboard
A local HTML dashboard that serves as the command center. It provides a live feed of processed sections, overall progress, and a prioritized list of alerts. An alert isn't just a flag; it contains the severity level, the exact timestamp of the suspicious conversation, a snippet of the transcript, and a direct link to the original `evideo.bg` URL so human observers can verify the footage instantly.

### Ephemeral Storage Lifecycle
A single election section can produce gigabytes of video. Multiply by 12,000, and local disks fill up in hours. Nabludatel features a ruthless storage lifecycle: Download → Extract Audio → Delete Video → Transcribe → Delete Audio → Store Transcript & Report in SQLite. The footprint remains tiny, allowing the entire country to be processed on a single consumer machine.



---

<flex_block type="feature-list" id="blk-001" name="Feature List">
{
  "core": [
    {
      "id": "f-001",
      "icon": "lucide:map",
      "title": "Village-First Processing",
      "summary": "Intelligently prioritizes rural and small-town sections where physical oversight is lowest."
    },
    {
      "id": "f-002",
      "icon": "lucide:mic",
      "title": "Local Transcription",
      "summary": "Converts Bulgarian audio to timestamped text locally, avoiding massive API costs."
    },
    {
      "id": "f-003",
      "icon": "lucide:brain-circuit",
      "title": "Forensic AI Analysis",
      "summary": "Claude scans transcripts for intimidation, ballot substitution, and protocol tampering."
    },
    {
      "id": "f-004",
      "icon": "lucide:layout-dashboard",
      "title": "Triage Dashboard",
      "summary": "Real-time HTML interface showing anomalies, timestamps, and direct video links for human verification."
    }
  ],
  "supporting": [
    {
      "id": "f-005",
      "icon": "lucide:trash-2",
      "title": "Ephemeral Storage",
      "summary": "Aggressively deletes heavy media files after text extraction to run on consumer hardware."
    },
    {
      "id": "f-006",
      "icon": "lucide:database",
      "title": "SQLite Ledger",
      "summary": "A lightweight, local database tracking the status of all 12,000+ sections to ensure zero gaps."
    }
  ]
}
</flex_block>
