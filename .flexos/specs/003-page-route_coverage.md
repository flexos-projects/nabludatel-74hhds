---
id: coverage
title: "Coverage Matrix"
type: page
subtype: route
status: active
sequence: 3
route: /coverage
prototype: ~
description: "A macro-level view of the entire country's processing status."
relatesTo:
  - docs/003-pages.md
  - docs/006-design.md
  - specs/002-page-overlay_section-detail.md
createdAt: "2026-04-20T12:00:00Z"
updatedAt: "2026-04-20T12:00:00Z"
---

<flex_block type="instructions">
This is a page spec for the Coverage Matrix.
Route: /coverage
Prototype: coverage-v1.html (pending generation)

Key decisions:
- Layout: app shell (desktop-only, fixed 280px left sidebar, fluid right table)
- Primary data source: MOCK_DB.sections, MOCK_DB.processing_queue
- Main interaction: Sorting by Alert Count, filtering by status
- Visuals: Dense, sortable data table. Clinical and exhaustive. Geometric status shapes.
</flex_block>

## Page Planning
1. **Who arrives here?** A macro-level observer looking for geographic patterns of anomalies or checking overall progress.
2. **What story does this page tell?** "Here is the status of all 12,000 sections at a glance."
3. **What's the conversion/action goal?** Identify geographic hotspots of anomalies and drill down into specific sections.
4. **What's the UX vision?** A hyper-compressed data table. No padding. Statuses as geometric shapes to allow scanning thousands of rows visually.
5. **What sections create that story?** Filter Bar, The Matrix (Table).
6. **What would make someone call someone over to look at this?** Sorting by "Alert Count" and instantly seeing a cluster of critical violations in a specific rural municipality.

## Route
`/coverage`
Prototype file: `coverage-v1.html`
Theme: `dark`
Auth required: `no`

## Purpose
A macro-level view of the entire country's processing status.

## Layout Shell
- Shell: `app` (Desktop-Only App Shell)
- Sidebar: `yes — active item: "Coverage"`
- Topbar: `no`
- Wrapper classes: `.app-shell`, `.theme-dark`

## Sections (top to bottom)

### Filter Bar
- **Wrapper:** `.filter-bar`
- **Data:** Static dropdown options
- **Copy:** "Region", "Municipality", "Status"
- **Components used:** `.select-dense`, `.filter-group`
- **Notes:** Sticky top above the table.

### The Matrix (Table)
- **Wrapper:** `.matrix-container`, `.table-dense`
- **Data:** `MOCK_DB.sections` joined with `MOCK_DB.processing_queue`
- **Copy:** `dynamic: section_id`, `dynamic: location`, `dynamic: status`, `dynamic: alert_count`
- **Components used:** `.data-table`, `.status-shape-square`, `.status-shape-triangle`, `.status-shape-circle`
- **Notes:** Virtualized list. Columns: ID, Location, Rural/Urban, Status, Alert Count. Statuses are geometric shapes (square=complete, triangle=flagged, circle=pending).

## Interactive States

### Sort by Alert Count
- **Trigger:** User clicks "Alert Count" column header
- **Vue ref:** `const sortKey = ref('alert_count')`, `const sortDesc = ref(true)`
- **Implementation:**
  ```js
  const sortedSections = computed(() => {
    return [...sections.value].sort((a, b) => b.alert_count - a.alert_count);
  });
  ```
- **Before:** Default sort (by ID or processing order)
- **After:** Table re-renders with highest alert counts at the top.

### Open Section Detail
- **Trigger:** User clicks a row in the table
- **Vue ref:** `const selectedSectionId = ref(null)`
- **Implementation:**
  ```js
  const openOverlay = (id) => {
    selectedSectionId.value = id;
    // Trigger overlay logic (shared with dashboard)
  };
  ```
- **Before:** Table view
- **After:** Section Detail overlay slides in from the right.

## Data Bindings
| UI Element | MOCK_DB Path | Notes |
|---|---|---|
| Table Rows | `MOCK_DB.sections` | Master list of stations |
| Status Shapes | `MOCK_DB.processing_queue` | Current pipeline status |

## Edge Cases
| Scenario | How to trigger in prototype | UI response |
|---|---|---|
| No Sections Processed | Toggle button: "Empty State" | Show `.empty-state` with copy: "No sections processed yet." |
| Loading Data | Toggle button: "Loading" | Show `.skeleton-table` rows. |

## Navigation Links
| Label | Target slug | data-slug | Condition |
|---|---|---|---|
| Dashboard | `dashboard` | `data-slug="dashboard"` | always (sidebar tab) |
| Coverage | `coverage` | `data-slug="coverage"` | always (sidebar tab) |
| Row Click | `section-detail` | `data-slug="section-detail"` | on row click |

## Prototype Controls
- Toggle: "Empty State"
- Toggle: "Loading State"

## Plan Gates
| Feature | Visible to | Hidden from | Fallback UI |
|---|---|---|---|
| N/A | all | none | N/A |

## Responsive
**Mobile (320-639px):**
- Table requires horizontal scrolling (`.overflow-x-auto`). Sidebar collapses to top header.

**Tablet (640-1023px):**
- Table takes full width, horizontal scroll if necessary.

**Desktop (1024px+):**
- Full layout. 280px sidebar, fluid table taking remaining width.

## Downstream Alerts
- ALERT: CSS classes `.table-dense`, `.status-shape-square`, `.status-shape-triangle`, `.status-shape-circle` used but may not be in components.css.
- ALERT: MOCK_DB needs a joined representation of sections and processing_queue for the matrix.

<flex_block type="prototypes">
{
  "versions": []
}
</flex_block>
