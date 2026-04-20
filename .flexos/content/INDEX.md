# content/

CMS-style structured data. Each collection is a **numbered subfolder** (`NNN-{slug}/`). Records live in a `records/` subfolder. Schema lives on the collection, values live on each record, body markdown is always available.

## Structure

```
content/
├── INDEX.md                      (this file)
├── 001-context/                  — Default catch-all (ships with every project)
│   ├── content.md                — fields schema + collection config
│   └── records/
│       └── NNN-{slug}.md
├── 002-roasts/
│   ├── content.md
│   └── records/
│       ├── 001-gunung-batur.md
│       └── 002-kintamani-classic.md
└── 003-blog-posts/
    ├── content.md
    └── records/
        ├── 001-welcome.md
        └── 002-getting-started.md
```

## Naming

- Collection folders: `NNN-{slug}/` — zero-padded, monotonic
- Collection config: `content.md` (exactly, one per collection)
- Records: `content/{col}/records/NNN-{slug}.md` — slug derived from identity field on create, frozen after

## The Core Model

**Schema lives on the collection. Values live on the record. Body is always-present markdown.**

- **`content.md`** declares editable fields in a `fields` flex_block + carries collection metadata in frontmatter (`type: content, subtype: collection, collectionType: ...`).
- **Record files** hold field values in a `data` flex_block + their prose body.

## `collectionType` (frontmatter field)

Every collection declares its kind. Seeds the initial field list — fully editable afterwards.

| Value | Intent | Seed fields |
|-------|--------|-------------|
| `freeform` | Free notes, unstructured dumps | `title` |
| `docs` | Structured prose — blog, FAQ, guides | `title`, `excerpt`, `date`, `author` |
| `catalog` | Products, inventory, structured records | `title`, `description`, `price`, `image` |
| `media` | Images, video, audio library | `title`, `asset-url` (required), `caption` |
| `record` | Default one-off record type | `title` |

## Identity Field

Every collection's `fields` block auto-includes `title` as the identity field (`required: true, identity: true`). Non-deletable, label can be renamed. Drives record filename and list display.

## Field Types

`text | textarea | richtext | number | boolean | select | multiselect | url | image | date | reference`

See MEGA-SPEC §6 `fields` block for the full definition and §13 for the complete pattern.
