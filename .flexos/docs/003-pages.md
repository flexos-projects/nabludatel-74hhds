---
id: doc-pages
title: Nabludatel — Pages
type: doc
subtype: pages
status: published
sequence: 3
createdAt: "2026-04-20T11:46:05.337Z"
updatedAt: "2026-04-20T11:46:05.337Z"
---

# Pages

Nabludatel is a local tool, heavily reliant on a single-page command center. The user starts a background script in their terminal, and then opens the Dashboard in their browser to monitor the results as they roll in overnight.

The **Command Dashboard** is the default view. It splits into two primary zones. On the left, a telemetry sidebar: total sections discovered, videos queued, videos transcribed, sections analyzed, and disk space saved. On the right, the Anomaly Feed. This is where flagged sections appear in real time. 

Clicking on an anomaly opens the **Section Detail** overlay. This isn't a separate page; it slides over the dashboard so context isn't lost. The overlay shows the metadata for the polling station (Region, Municipality, Village), the specific AI reasoning ("Claude identified possible intimidation at 01:23:45"), the surrounding 5 minutes of transcript for context, and a large button to open the original `evideo.bg` link at that exact timestamp.

The **Coverage Map** tab provides a visual or tabular view of the country. It shows which municipalities have been fully processed, which are pending, and where the highest density of anomalies is clustering. If a specific region suddenly lights up with "Critical" alerts, observers can direct physical resources there the next morning.



---

<flex_block type="page-inventory" id="blk-001" name="Page Inventory">
{
  "pages": [
    {
      "route": "/",
      "name": "Command Dashboard",
      "type": "app",
      "description": "Live feed of anomalies, telemetry sidebar, and system status."
    },
    {
      "route": "/section/:id",
      "name": "Section Detail",
      "type": "app",
      "description": "Slide-over panel. Transcript context, AI reasoning, and direct video link."
    },
    {
      "route": "/coverage",
      "name": "Coverage Matrix",
      "type": "app",
      "description": "Tabular view of all 12,000 sections, filtering by status (Pending, Clean, Flagged)."
    },
    {
      "route": "/logs",
      "name": "System Logs",
      "type": "app",
      "description": "Raw pipeline logs for debugging transcription errors or network timeouts."
    }
  ]
}
</flex_block>
