---
id: doc-flows
title: Nabludatel — Flows
type: doc
subtype: flows
status: published
sequence: 5
createdAt: "2026-04-20T11:46:05.337Z"
updatedAt: "2026-04-20T11:46:05.337Z"
---

# Flows

### The Night-Shift Pipeline
It is 21:00. The script is running. The `ProcessingQueue` queries SQLite for the next available section, sorting by `is_rural = true`. It finds Section 152400019 (a village in Pleven). 
The system pings `evideo.bg` and downloads the 2-hour `.mp4` file (1.2GB). As soon as the download finishes, `faster-whisper` spins up, converting the audio to text. This takes 15 minutes. 
The system deletes the 1.2GB video file. It bundles the transcript and passes it to the `claude` CLI via a headless command. Claude returns a JSON response: "No anomalies detected. Routine counting protocol followed." The section is marked Complete. The system moves to the next village.

### Triage and Verification
It is 02:00. A journalist is watching the Command Dashboard. A new card flashes red: **CRITICAL: Intimidation Detected**. 
The journalist clicks the card. The overlay opens. Claude's reasoning reads: *"At 01:45:22, a voice instructs another SIK member to 'put the phone away or I will break it', followed by a dispute over invalid ballots."*
The journalist reads the surrounding transcript. It matches the AI's summary. They click "Watch Video @ 01:45:22". A new tab opens directly to the `evideo.bg` archive, jumping to that exact moment. The journalist hears the threat themselves, records the screen, and sends it to the Central Election Commission and national news desks. 

### Graceful Recovery
At 04:00, the local internet connection drops. A 2GB video download fails halfway through. The Python script catches the exception. It updates the `ProcessingQueue` for that section: `status = 'pending', retry_count = 1`. The script sleeps for 30 seconds and checks the connection. When the internet returns, it doesn't skip a beat. It resumes the download queue. No data is corrupted, and no section is left behind.





---

<flex_block type="flow" id="blk-001" name="Flow 1">
{
  "id": "flow-pipeline",
  "title": "The Night-Shift Pipeline",
  "actor": "Autonomous System",
  "trigger": "Script execution starts",
  "steps": [
    "Query SQLite for next unassigned rural section",
    "Download .mp4 from evideo.bg",
    "Extract audio and delete heavy video file",
    "Transcribe audio locally using faster-whisper",
    "Send transcript to Claude CLI for forensic analysis",
    "Save AI report to SQLite and mark section complete"
  ],
  "outcome": "One section fully processed, disk space preserved, dashboard updated."
}
</flex_block>

<flex_block type="flow" id="blk-002" name="Flow 2">
{
  "id": "flow-triage",
  "title": "Triage and Verification",
  "actor": "Human Observer / Journalist",
  "trigger": "A new anomaly appears on the dashboard",
  "steps": [
    "Notice high-severity alert on dashboard feed",
    "Click alert to read Claude's forensic reasoning",
    "Read surrounding transcript for context",
    "Click direct link to jump to the exact timestamp on evideo.bg",
    "Watch video to verify the AI's claim",
    "Export report to share with authorities"
  ],
  "outcome": "Potential fraud is verified with hard evidence in minutes instead of days."
}
</flex_block>
