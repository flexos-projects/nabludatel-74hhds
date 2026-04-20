---
id: seed
title: "Nabludatel (Observer)"
type: seed
status: draft
createdAt: "2026-04-20"
updatedAt: "2026-04-20"
---

<flex_block type="seed-header">
{
  "name": "Nabludatel",
  "tagline": "Automated forensic monitoring for democratic elections.",
  "description": "An autonomous pipeline that downloads, transcribes, and forensically analyzes thousands of hours of election counting video in real-time, surfacing anomalies before the final protocols are signed.",
  "logo": null,
  "domain": null,
  "inputType": "mixed"
}
</flex_block>

---

# Nabludatel

## 1. Vision

At 20:00 on election night in Bulgaria, over 12,000 polling stations close their doors. The cameras turn on, and the counting begins. This generates roughly 40,000 hours of video content. The Central Election Commission provides the footage online, fulfilling the requirement for transparency. 

But transparency without attention is useless. No human organization can watch 40,000 hours of video overnight. Fraud, intimidation, and "corrected" protocols hide easily in the sheer volume of boring, static footage. 

Nabludatel (Observer) changes the asymmetry of election monitoring. It is an automated, tireless watchdog. It doesn't sleep, and it doesn't get bored. Working backward from the most vulnerable locations—remote villages and small towns where local bosses exert the most pressure and independent monitors are rare—Nabludatel downloads the footage, runs it through local voice-to-text models, and feeds the transcripts to a forensic AI. 

The AI isn't looking for typos. It's listening for specific democratic violations: "Just write 45 instead of 25." "Put the camera down." "These ballots don't match." It finds the anomalies, flags the exact timestamp, and drops them into a high-visibility dashboard for human journalists and election observers to verify.

This isn't just a script; it's a command center for election integrity. It takes an unmanageable ocean of data and distills it into an actionable list of prioritized alerts. By the time the sun comes up the day after the election, Nabludatel will have watched everything.

<flex_block type="brand">
{
  "personality": ["vigilant", "forensic", "unrelenting", "clinical"],
  "voiceAttributes": ["speaks in facts and timestamps", "high signal-to-noise ratio", "objective and unbribable"],
  "values": ["radical transparency", "protection of the vulnerable", "data over narrative"],
  "visualMood": "A late-night command center. Dark screens, dense data, monospace typography, and stark, high-contrast alerts in amber and red.",
  "references": ["Bloomberg Terminal", "Palantir Gotham", "Air traffic control interfaces"]
}
</flex_block>

---

## 2. Features

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

<flex_block type="feature-list">
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

---

## 3. Pages

Nabludatel is a local tool, heavily reliant on a single-page command center. The user starts a background script in their terminal, and then opens the Dashboard in their browser to monitor the results as they roll in overnight.

The **Command Dashboard** is the default view. It splits into two primary zones. On the left, a telemetry sidebar: total sections discovered, videos queued, videos transcribed, sections analyzed, and disk space saved. On the right, the Anomaly Feed. This is where flagged sections appear in real time. 

Clicking on an anomaly opens the **Section Detail** overlay. This isn't a separate page; it slides over the dashboard so context isn't lost. The overlay shows the metadata for the polling station (Region, Municipality, Village), the specific AI reasoning ("Claude identified possible intimidation at 01:23:45"), the surrounding 5 minutes of transcript for context, and a large button to open the original `evideo.bg` link at that exact timestamp.

The **Coverage Map** tab provides a visual or tabular view of the country. It shows which municipalities have been fully processed, which are pending, and where the highest density of anomalies is clustering. If a specific region suddenly lights up with "Critical" alerts, observers can direct physical resources there the next morning.

<flex_block type="page-inventory">
{
  "pages": [
    { "route": "/", "name": "Command Dashboard", "type": "app", "description": "Live feed of anomalies, telemetry sidebar, and system status." },
    { "route": "/section/:id", "name": "Section Detail", "type": "app", "description": "Slide-over panel. Transcript context, AI reasoning, and direct video link." },
    { "route": "/coverage", "name": "Coverage Matrix", "type": "app", "description": "Tabular view of all 12,000 sections, filtering by status (Pending, Clean, Flagged)." },
    { "route": "/logs", "name": "System Logs", "type": "app", "description": "Raw pipeline logs for debugging transcription errors or network timeouts." }
  ]
}
</flex_block>

---

## 4. Data

The data model is optimized for local SQLite processing. It acts as an unbreakable ledger, ensuring that if the machine crashes or the internet drops, Nabludatel knows exactly which video to download next when it restarts. 

At the center is the `Sections` table. This is pre-seeded before the election begins, containing the geographic hierarchy of Bulgaria's polling stations. Each Section has a `ProcessingQueue` record that tracks its journey through the pipeline: Pending → Downloading → Transcribing → Analyzing → Complete. 

When Claude flags an issue, it generates an `Anomaly`. Anomalies are strongly typed: they belong to a section, have a severity level (Low, Medium, Critical), a specific timestamp, and the exact quote that triggered the alert.

<flex_block type="data-model">
{
  "collections": [
    {
      "name": "Sections",
      "icon": "lucide:map-pin",
      "description": "The master list of all polling stations. Pre-seeded with geographic data to enable village-first sorting.",
      "keyFields": ["section_id", "region", "municipality", "settlement", "is_rural", "video_url"],
      "relationships": ["queue → ProcessingQueue", "anomalies → Anomalies", "transcript → Transcripts"]
    },
    {
      "name": "ProcessingQueue",
      "icon": "lucide:list-ordered",
      "description": "The state machine for the pipeline. Ensures no section is missed or processed twice.",
      "keyFields": ["section_id", "status", "retry_count", "download_started_at", "completed_at"],
      "relationships": ["section → Sections"]
    },
    {
      "name": "Transcripts",
      "icon": "lucide:file-text",
      "description": "The raw output from local Whisper. Stored as JSON arrays of timestamped text blocks.",
      "keyFields": ["section_id", "content_json", "duration_seconds", "word_count"],
      "relationships": ["section → Sections"]
    },
    {
      "name": "Anomalies",
      "icon": "lucide:alert-triangle",
      "description": "Alerts generated by Claude. The core output of the system.",
      "keyFields": ["section_id", "severity", "category", "timestamp", "trigger_quote", "ai_reasoning"],
      "relationships": ["section → Sections"]
    }
  ]
}
</flex_block>

---

## 5. Flows

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

<flex_block type="flow">
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

<flex_block type="flow">
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

---

## 6. Design

Nabludatel is a forensic tool. It does not use friendly consumer UI patterns. It borrows from the visual language of terminals, air traffic control, and financial trading platforms. Information density is high. Contrast is stark.

The palette is anchored in a deep, absolute dark mode. The background is a dense charcoal `oklch(15% 0.01 250)`, allowing the data to pop. Primary text is crisp and slightly cool. Accents are purely functional: Amber for warnings (procedural errors, delays), and an aggressive Crimson for critical alerts (intimidation, ballot tampering). 

Typography leans heavily on monospace fonts (JetBrains Mono or similar) for timestamps, section IDs, and statistical data. This ensures numbers align perfectly in columns, making it easy for the human eye to scan thousands of rows of telemetry. The body text for transcripts uses a highly legible sans-serif.

Motion is minimal and purposeful. When a new alert arrives, it doesn't bounce or fade softly; it flashes with a hard border, demanding attention. The UI communicates urgency and precision.

<flex_block type="tokens">
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

<flex_block type="tokens">
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

<flex_block type="tokens">
{
  "category": "typography",
  "tokens": {
    "--font-display": "system-ui, sans-serif",
    "--font-body": "system-ui, sans-serif",
    "--font-mono": "'JetBrains Mono', 'Fira Code', monospace"
  }
}
</flex_block>

<flex_block type="tokens">
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

<flex_block type="tokens">
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

<flex_block type="tokens">
{
  "category": "shadows",
  "tokens": {
    "--shadow-sm": "0 1px 2px oklch(0% 0 0 / 0.5)",
    "--shadow-md": "0 4px 12px oklch(0% 0 0 / 0.5)",
    "--shadow-lg": "0 12px 32px oklch(0% 0 0 / 0.5)"
  }
}
</flex_block>

<flex_block type="transitions">
{
  "category": "transitions",
  "tokens": {
    "--transition-fast": "150ms ease-out",
    "--transition-base": "280ms ease-out",
    "--transition-slow": "450ms cubic-bezier(0.4, 0, 0.2, 1)"
  }
}
</flex_block>

<flex_block type="mockup-html" id="dashboard-preview">
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nabludatel | Command Center</title>
  <style>
    :root {
      --color-bg: oklch(15% 0.01 250);
      --color-surface: oklch(20% 0.015 250);
      --color-surface-raised: oklch(25% 0.02 250);
      --color-border: oklch(35% 0.02 250);
      --color-text: oklch(95% 0.01 250);
      --color-text-muted: oklch(70% 0.02 250);
      --color-primary: oklch(75% 0.12 250);
      --color-warning: oklch(75% 0.18 55);
      --color-danger: oklch(65% 0.22 25);
      --font-body: system-ui, sans-serif;
      --font-mono: 'JetBrains Mono', ui-monospace, monospace;
    }
    
    [data-theme="light"] {
      --color-bg: oklch(98% 0.01 250);
      --color-surface: oklch(100% 0 0);
      --color-surface-raised: oklch(95% 0.02 250);
      --color-border: oklch(85% 0.02 250);
      --color-text: oklch(20% 0.02 250);
      --color-text-muted: oklch(45% 0.02 250);
      --color-primary: oklch(50% 0.12 250);
      --color-warning: oklch(60% 0.18 55);
      --color-danger: oklch(55% 0.22 25);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      background-color: var(--color-bg);
      color: var(--color-text);
      font-family: var(--font-body);
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    .sidebar {
      width: 280px;
      background-color: var(--color-surface);
      border-right: 1px solid var(--color-border);
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .brand {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .status-dot {
      width: 8px;
      height: 8px;
      background-color: var(--color-danger);
      border-radius: 50%;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 oklch(65% 0.22 25 / 0.7); }
      70% { box-shadow: 0 0 0 6px oklch(65% 0.22 25 / 0); }
      100% { box-shadow: 0 0 0 0 oklch(65% 0.22 25 / 0); }
    }

    .metrics-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .metric {
      background: var(--color-bg);
      border: 1px solid var(--color-border);
      padding: 1rem;
      border-radius: 0.25rem;
    }

    .metric-label {
      font-size: 0.75rem;
      color: var(--color-text-muted);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    .metric-value {
      font-family: var(--font-mono);
      font-size: 1.5rem;
      font-weight: 600;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 2rem;
      overflow-y: auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .feed {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .alert-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-left: 4px solid var(--color-danger);
      border-radius: 0.25rem;
      padding: 1.5rem;
    }

    .alert-card.warning {
      border-left-color: var(--color-warning);
    }

    .alert-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
      font-family: var(--font-mono);
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }

    .alert-title {
      font-size: 1.125rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .alert-body {
      font-size: 0.875rem;
      line-height: 1.5;
      margin-bottom: 1.5rem;
      color: var(--color-text-muted);
    }

    .transcript-snippet {
      background: var(--color-bg);
      padding: 1rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      border-radius: 0.25rem;
      border: 1px solid var(--color-border);
      margin-bottom: 1.5rem;
    }

    .actions {
      display: flex;
      gap: 1rem;
    }

    .btn {
      background: var(--color-surface-raised);
      color: var(--color-text);
      border: 1px solid var(--color-border);
      padding: 0.5rem 1rem;
      font-family: var(--font-mono);
      font-size: 0.75rem;
      cursor: pointer;
      border-radius: 0.25rem;
      transition: all 0.2s;
    }

    .btn:hover {
      background: var(--color-border);
    }

    .btn.primary {
      background: var(--color-primary);
      color: oklch(15% 0.01 250);
      border: none;
    }
    
    .theme-toggle {
      background: none;
      border: none;
      color: var(--color-text-muted);
      cursor: pointer;
      font-family: var(--font-mono);
    }
  </style>
</head>
<body>

  <aside class="sidebar">
    <div class="brand">
      Nabludatel
      <div class="status-dot"></div>
    </div>

    <div class="metrics-grid">
      <div class="metric">
        <div class="metric-label">Sections Queued</div>
        <div class="metric-value">12,450</div>
      </div>
      <div class="metric">
        <div class="metric-label">Processed</div>
        <div class="metric-value">3,421</div>
      </div>
      <div class="metric">
        <div class="metric-label">Critical Alerts</div>
        <div class="metric-value" style="color: var(--color-danger)">42</div>
      </div>
    </div>
  </aside>

  <main class="main-content">
    <header class="header">
      <h2>Anomaly Feed</h2>
      <button class="theme-toggle" onclick="document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'">Toggle Theme</button>
    </header>

    <div class="feed">
      
      <div class="alert-card">
        <div class="alert-header">
          <span>SEC: 152400019 (Pleven / Gorno Uino)</span>
          <span>@ 01:45:22</span>
        </div>
        <div class="alert-title">Intimidation of SIK Member</div>
        <div class="alert-body">
          Claude detected hostile language and direct threats towards a commission member attempting to log a dispute regarding ballot validity.
        </div>
        <div class="transcript-snippet">
          [01:45:10] Speaker A: I need to write this in the protocol, these 5 are invalid.<br>
          [01:45:18] Speaker B: You are not writing anything. Put the pen down.<br>
          [01:45:22] Speaker B: Put the phone away or I will break it. Just write 45.
        </div>
        <div class="actions">
          <button class="btn primary">Watch @ 01:45:22</button>
          <button class="btn">Mark Reviewed</button>
        </div>
      </div>

      <div class="alert-card warning">
        <div class="alert-header">
          <span>SEC: 030600045 (Varna)</span>
          <span>@ 03:12:05</span>
        </div>
        <div class="alert-title">Unexplained Counting Delay</div>
        <div class="alert-body">
          Transcription indicates a prolonged pause in counting while members wait for a "phone call from the boss" before sealing the bags.
        </div>
        <div class="transcript-snippet">
          [03:10:00] Speaker C: Are we tying the bags now?<br>
          [03:12:05] Speaker A: No, wait. Don't seal them yet. We have to wait for Ivan to call and confirm the numbers match.
        </div>
        <div class="actions">
          <button class="btn primary">Watch @ 03:12:05</button>
          <button class="btn">Mark Reviewed</button>
        </div>
      </div>

    </div>
  </main>

</body>
</html>
</flex_block>

---

## 7. Technical

The architecture is designed to be monolithic, local, and robust. It relies on standard tools composed in a pipeline that prioritizes reliability over microservice complexity.

The orchestrator is a **Python** or **Node.js** script. It manages the queue, handles the network requests to `evideo.bg`, and orchestrates the child processes. 

The database is **SQLite**. It requires no setup, lives in a single file in the same directory, and acts as the state machine for the entire operation. If the power goes out, SQLite ensures the system boots back up exactly where it left off.

Transcription is handled by **faster-whisper**. Running locally on the machine's GPU (or CPU, though slower), it incurs zero API cost. Given the audio quality of security cameras, `large-v3` is recommended for Bulgarian.

Analysis is outsourced to **Anthropic Claude** via the official `claude` CLI running in headless mode (`claude -p`). This abstracts away API boilerplate. The orchestrator simply passes the transcript text to the CLI with a predefined prompt and parses the JSON output.

The dashboard is a static **HTML/JS** file that reads directly from the SQLite database (or a JSON dump generated by the orchestrator every 60 seconds). It requires no heavy frontend framework.

<flex_block type="stack">
{
  "orchestrator": { "name": "Python/Node.js", "why": "Simple scripting to manage queues, downloads, and child processes." },
  "database": { "name": "SQLite", "why": "Zero-config, local, bulletproof state management for 12,000 records." },
  "transcription": { "name": "faster-whisper", "why": "Free, local, private voice-to-text. Preserves budget for the reasoning layer." },
  "analysis": { "name": "Claude CLI (Headless)", "why": "Leverages Sonnet's deep reasoning and prompt caching via a simple command-line interface." },
  "dashboard": { "name": "Vanilla HTML/JS", "why": "Lightweight, responsive, reads directly from local data dumps." }
}
</flex_block>

---

## 8. Content

Nabludatel requires two critical pieces of content to function: the geographic seed data, and the forensic prompt engineering for the AI.

**What we have:**
The base URL pattern for tomorrow's election (`https://evideo.bg/pe202604/index.html`). We know the general structure of the Central Election Commission's data.

**What we need to create:**
1. **The Seed List**: A master list of all sections, mapping the section ID to its municipality and determining if it is a village or a city. This can be scraped from the `europe2024` archive as a baseline, and cross-referenced with the new election data.
2. **The Forensic Prompt**: Claude needs strict instructions on what constitutes an anomaly. 

*Draft Forensic Prompt for Claude:*
> "You are a forensic election observer. You are reviewing a timestamped transcript from a Bulgarian polling station's security camera. The counting occurs after 20:00. Look for any of the following violations:
> 1. Ballot Tampering: Instructions to alter, destroy, or misclassify ballots.
> 2. Protocol Falsification: Discrepancies between spoken counts and what is written, or instructions to write specific numbers.
> 3. Intimidation: Threats, aggressive language, or coercion directed at SIK members or observers.
> 4. Unauthorized Presence: Mentions of mayors, party bosses, or police interfering with the count.
> 5. Procedural Violations: Unexplained delays, waiting for phone calls to confirm numbers, or sealing bags improperly.
> 
> Respond ONLY in JSON format. If no violations are found, return { "anomalies": [] }. If violations are found, return { "anomalies": [ { "severity": "CRITICAL|WARNING", "timestamp": "[time]", "trigger_quote": "exact quote", "reasoning": "brief explanation" } ] }."

<flex_block type="content-inventory">
{
  "have": [
    { "type": "url", "source": "user", "notes": "Target URL: evideo.bg/pe202604/index.html" },
    { "type": "strategy", "source": "user", "notes": "Village-first prioritization established." }
  ],
  "need": [
    { "type": "data", "description": "Master list of all Bulgarian sections (approx 12,000) mapped to rural/urban status." },
    { "type": "copy", "description": "Refined forensic prompt for Claude CLI, optimized for prompt caching." },
    { "type": "code", "description": "The Python/Node orchestrator script to tie the pipeline together." }
  ]
}
</flex_block>

---

## 9. Downstream Alerts
- ALERT: [Hardware constraints] → local `faster-whisper` on a standard CPU will be too slow to process 12,000 hours in one night. If GPU is unavailable, we must fallback to Groq API for speed. Confirm hardware specs with founder.
- ALERT: [Storage Lifecycle] → The script MUST implement the delete-video-after-transcription logic immediately. 12k videos will instantly fill any consumer hard drive.
- ALERT: [Claude CLI Rate Limits] → Headless mode uses the Anthropic API. Ensure the account has sufficient tier limits to handle thousands of concurrent or rapid-fire requests. Prompt caching is essential here. 
- ALERT: [Data Seeding] → Need to write the scraper for `europe2024` archive immediately to generate the SQLite seed file before the election starts tomorrow.