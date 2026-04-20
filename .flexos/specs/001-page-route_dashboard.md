---
id: dashboard
title: "Command Dashboard"
type: page
subtype: route
status: active
sequence: 1
route: /
prototype: ~
description: "The primary monitoring station with live telemetry and anomaly feed."
relatesTo:
  - docs/003-pages.md
  - docs/006-design.md
  - specs/002-page-overlay_section-detail.md
createdAt: "2026-04-20T12:00:00Z"
updatedAt: "2026-04-20T12:00:00Z"
---

<flex_block type="instructions">
This is a page spec for the Command Dashboard.
Route: /
Prototype: dashboard-v1.html (pending generation)

Key decisions:
- Layout: app shell (desktop-only, fixed 280px left sidebar, fluid right feed)
- Primary data source: MOCK_DB.anomalies, MOCK_DB.stats
- Main interaction: Clicking an anomaly card opens the Section Detail overlay
- Visuals: Dark mode only, high density, monospace metadata
</flex_block>

## Page Planning
1. **Who arrives here?** A tired journalist or observer on the night shift, waiting for the system to find fraud. They need high-contrast, instantly readable information.
2. **What story does this page tell?** "The machine is working (telemetry) → Here is what it found (feed)."
3. **What's the conversion/action goal?** Get the user to click on a critical alert to verify the footage.
4. **What's the UX vision?** Bloomberg Terminal meets air traffic control. Dense, dark, monospace-heavy. Urgent but objective.
5. **What sections create that story?** Telemetry Sidebar (reassurance), Anomaly Feed (actionable triage queue).
6. **What would make someone call someone over to look at this?** The live pulse of the telemetry and the hard flash when a new critical anomaly drops into the feed.

## Route
`/`
Prototype file: `dashboard-v1.html`
Theme: `dark`
Auth required: `no`

## Purpose
The primary monitoring station. Provides a live feed of anomalies and system health.

## Layout Shell
- Shell: `app` (Desktop-Only App Shell)
- Sidebar: `yes — active item: "Dashboard"`
- Topbar: `no`
- Wrapper classes: `.app-shell`, `.theme-dark`

## Sections (top to bottom)

### Telemetry Sidebar (Left)
- **Wrapper:** `.sidebar`, `.telemetry-panel`
- **Data:** `MOCK_DB.stats` → [Sections Queued, Processed, Critical Alerts, Disk Space Saved]
- **Copy:** "SYSTEM INITIALIZED", "Sections Queued", "Processed", "Critical Alerts", "Disk Space Saved"
- **Components used:** `.sidebar`, `.stat-block`, `.pulse-indicator`
- **Notes:** Fixed 280px width. Contains a pulsing red dot indicating live processing. Numbers should tick over.

### Anomaly Feed (Right)
- **Wrapper:** `.feed-container`, `.fluid-width`
- **Data:** `MOCK_DB.anomalies` → [List of anomaly cards]
- **Copy:** `dynamic: category`, `dynamic: ai_reasoning`, `dynamic: trigger_quote`
- **Components used:** `.anomaly-card`, `.severity-critical`, `.severity-warning`, `.mono-text`
- **Notes:** Reverse-chronological list. Cards have a thick left border (Amber for warning, Crimson for critical). Transcript snippets are in a dark inset monospace block.

## Interactive States

### New Anomaly Arrival
- **Trigger:** System polls and finds a new anomaly (simulated via prototype control)
- **Vue ref:** `const anomalies = ref(MOCK_DB.anomalies)`
- **Implementation:**
  ```js
  // Add new item to top of array, apply .flash-highlight class for 1s
  const triggerNewAnomaly = () => {
    const newAlert = MOCK_DB.new_anomaly;
    anomalies.value.unshift({ ...newAlert, isNew: true });
    setTimeout(() => { anomalies.value[0].isNew = false; }, 1000);
  };
  ```
- **Before:** Standard feed
- **After:** Card snaps to top with a hard, high-contrast flash (1-second border highlight) before settling.

### Open Section Detail
- **Trigger:** User clicks an anomaly card
- **Vue ref:** `const selectedSectionId = ref(null)`, `const isOverlayOpen = ref(false)`
- **Implementation:**
  ```js
  const openOverlay = (id) => {
    selectedSectionId.value = id;
    isOverlayOpen.value = true;
  };
  ```
- **Before:** Feed only
- **After:** Section Detail overlay slides in from the right (600px wide).

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Telemetry Stats | `MOCK_DB.stats` | Sections Queued, Processed, Critical Alerts |
| Feed Cards | `MOCK_DB.anomalies` | Array of alerts |

## Edge Cases
| Scenario | How to trigger in prototype | UI response |
|---|---|---|
| Initial Empty State | Toggle button: "Empty State" | Show `.empty-state` with blinking cursor `_` and copy: "Pipeline active. Waiting for anomalies." |
| Database Disconnect | Toggle button: "DB Error" | Show stark red banner `.error-banner` with copy: "DATABASE CONNECTION LOST. Retrying..." |
| Disk Full | Toggle button: "Disk Full" | Show critical system alert with copy: "CRITICAL: Disk space below 5GB. Pipeline halted." |

## Navigation Links
| Label | Target slug | data-slug | Condition |
|---|---|---|---|
| Coverage | `coverage` | `data-slug="coverage"` | always (sidebar tab) |
| Dashboard | `dashboard` | `data-slug="dashboard"` | always (sidebar tab) |

## Prototype Controls
- Toggle: "Simulate New Anomaly" (triggers the hard flash arrival)
- Toggle: "Empty State"
- Toggle: "DB Error State"
- Toggle: "Disk Full State"

## Plan Gates
| Feature | Visible to | Hidden from | Fallback UI |
|---|---|---|---|
| N/A | all | none | N/A (single tier) |

## Responsive
**Mobile (320-639px):**
- Layout is desktop-only by design (per Doc 6). However, if viewed on mobile, collapse sidebar to a top header, and feed takes full width.
- Touch targets >= 44px.

**Tablet (640-1023px):**
- Sidebar collapses to icons or top header. Feed full width.

**Desktop (1024px+):**
- Full layout. 280px fixed sidebar, fluid feed.

## Downstream Alerts
- ALERT: CSS classes `.anomaly-card`, `.telemetry-panel`, `.pulse-indicator` used but may not be in components.css — flexos-design-system should add them.
- ALERT: MOCK_DB.stats and MOCK_DB.anomalies referenced — flexos-mock-data should add them.

<flex_block type="prototypes">
{
  "versions": []
}
</flex_block>
