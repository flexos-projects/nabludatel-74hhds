---
id: doc-content
title: Nabludatel — Content
type: doc
subtype: content
status: published
sequence: 8
createdAt: "2026-04-20T11:46:05.338Z"
updatedAt: "2026-04-20T11:46:05.338Z"
---

# Content

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



---
