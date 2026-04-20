# spaces/

Conversation workspaces. Each space is a numbered subfolder — plural name because each child is a distinct instance.

## Structure

```
spaces/
├── INDEX.md                      (this file)
└── 001-welcome/
    ├── space.md                  — Config + AI instructions (space-config flex_block)
    ├── log.md                    — Append-only decisions log
    ├── tasks/                    — Lightweight task files (optional)
    │   └── 001-task-{slug}.md
    └── files/                    — Reference material dump (any format, optional)
        └── brainstorm.md
```

## Naming

- Folders: `NNN-{slug}/` — sequentially numbered, monotonic
- Files inside: `space.md` (always), `log.md` (always), `tasks/NNN-task-{slug}.md`, `files/*`

## space.md

The main config file. Holds:

- Frontmatter with `type: space`, `status`, `relatesTo` (reading list)
- A `space-config` flex_block containing:
  - `purpose` — one-liner
  - `starterMessage` — Flexi's opening line when the user enters the space
  - `instructions` — how Flexi should behave inside this space
  - `starterActions` — clickable chips that trigger skills or canned replies

## log.md

Append-only. Records decisions, outcomes, agreements. New entries always at the bottom, old entries never edited.

## tasks/

Lightweight task files for work tracked inside the space. Same format as build tasks, without the build infrastructure. Each is a FlexDoc with `type: space, subtype: task`.

## files/

Reference material dump. Any format — brainstorm notes, screenshots, exported docs, pasted code, competitor references. User-managed. AI reads from here when the space's `relatesTo` points at specific files.

## Status

| Status | Column | Meaning |
|--------|--------|---------|
| `active` | Active | Working on it now |
| `planned` | Roadmap | Want to do, not yet |
| `archived` | Done | Parked, completed, or abandoned |

See MEGA-SPEC §12 for the full pattern.
