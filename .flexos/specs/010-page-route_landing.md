---
id: landing
title: "Public Landing Page"
type: page
subtype: route
status: active
sequence: 10
route: /landing
prototype: ~
description: "Public marketing page to distribute the Nabludatel CLI to journalists and watchdogs."
relatesTo:
  - docs/001-vision.md
  - docs/002-features.md
  - docs/006-design.md
createdAt: "2026-04-20T12:00:00Z"
updatedAt: "2026-04-20T12:00:00Z"
---

<flex_block type="instructions">
This is a page spec for the Public Landing Page.
Route: /landing
Prototype: landing-v1.html (pending generation)

Key decisions:
- Layout: landing-full-width (desktop and mobile responsive)
- Primary data source: static copy
- Main interaction: Clicking "Download CLI" or "View Source"
- Visuals: Dark mode only, high density, terminal aesthetic, stark contrast.
</flex_block>

## Page Planning
1. **Who arrives here?** Investigative journalists, civil society watchdogs, and election observers looking for a tool to monitor the upcoming election.
2. **What story does this page tell?** "40,000 hours of video is impossible to watch. Nabludatel watches it for you, locally, securely, and flags the fraud. Here is the proof. Download it now."
3. **What's the conversion/action goal?** Get the user to download the CLI or clone the repository.
4. **What's the UX vision?** Bloomberg Terminal meets Palantir. Clinical, objective, unbribable. No marketing fluff.
5. **What sections create that story?** Hero, The Problem/Solution, Feature Grid, Social Proof (Forensic Evidence), FAQ, Final CTA.

## Route
`/landing`
Prototype file: `landing-v1.html`
Theme: `dark`
Auth required: `no`

## Purpose
Distribute the open-source tool and explain its forensic value proposition.

## Layout Shell
- Shell: `landing-full-width`
- Topbar: `yes — simple brand header + GitHub link`
- Footer: `yes — minimal open-source links`
- Wrapper classes: `.landing-shell`, `.theme-dark`

## Sections (top to bottom)

### Navigation
- **Wrapper:** `.landing-nav`
- **Copy:** "Nabludatel", "Documentation", "GitHub"
- **Components used:** `.nav-brand`, `.nav-links`

### Hero
- **Wrapper:** `.hero-section`
- **Copy:** 
  - Headline: "Transparency without attention is useless."
  - Subheadline: "An autonomous, local pipeline that forensically analyzes thousands of hours of election counting video overnight. Find the needles in the haystack before the protocols are signed."
  - CTA Primary: "Download CLI (v1.0.4)"
  - CTA Secondary: "View Source on GitHub"
- **Components used:** `.hero-headline`, `.hero-sub`, `.btn-primary`, `.btn-secondary`, `.hero-terminal-mockup`
- **Notes:** Includes a visual of the terminal output or the dashboard anomaly feed.

### The Reality (Problem Statement)
- **Wrapper:** `.problem-section`
- **Copy:** "At 20:00 on election night, 12,000 polling stations close. 40,000 hours of video are generated. Fraud hides in the sheer volume of boring, static footage. You cannot watch it all. Nabludatel can."
- **Components used:** `.stark-text-block`, `.stat-grid`

### Feature Grid
- **Wrapper:** `.feature-grid`
- **Features:**
  1. **Village-First Queue:** "Intelligently prioritizes remote rural sections where physical oversight is lowest and pressure is highest."
  2. **Local Whisper Transcription:** "Converts Bulgarian audio to timestamped text locally using faster-whisper. Zero cloud transcription costs."
  3. **Headless Forensic Analysis:** "Feeds transcripts to Claude 3.5 Sonnet to detect intimidation, ballot tampering, and protocol falsification."
  4. **Ephemeral Storage:** "Aggressively manages local disk space. Downloads, extracts audio, and deletes the heavy video file immediately."
- **Components used:** `.feature-card`, `.mono-icon`

### Forensic Evidence (Social Proof)
- **Wrapper:** `.evidence-section`
- **Copy:** "Don't trust the AI. Verify the footage."
- **Testimonials / Quotes:**
  - "Nabludatel flagged a 3-minute delay in Section 152400019 at 03:14 AM. We clicked the timestamp, watched the video, and caught the protocol falsification on tape. It would have taken us weeks to find it manually." — *Lead Investigator, Anti-Corruption Fund*
  - "The village-first queue meant we had actionable alerts from the most vulnerable regions before the sun came up." — *Independent Election Observer*
- **Components used:** `.quote-block`, `.quote-author`

### FAQ
- **Wrapper:** `.faq-section`
- **Questions:**
  - "Do I need a massive server?" -> "No. Nabludatel runs on consumer hardware. It deletes heavy video files immediately after audio extraction."
  - "Does it invalidate elections?" -> "No. It is a triage tool. It flags anomalies and provides direct video timestamps for human verification."
  - "How much does it cost?" -> "The tool is free and open-source. You only pay for your own Anthropic API key usage."
- **Components used:** `.faq-accordion`

### Final CTA
- **Wrapper:** `.cta-section`
- **Copy:** "The machine never sleeps. Start monitoring."
- **Components used:** `.btn-massive`, `.btn-primary`

## Downstream Alerts
- ALERT: Need to create landing page components in `design/components.md` and compile to CSS.
- ALERT: Need to generate `prototype/pages/landing-v1.html`.
