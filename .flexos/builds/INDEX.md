# builds/

Build lifecycle. Each build is a named subfolder containing everything needed to produce production code for one milestone. Plural folder because each child is a distinct build instance.

## Structure

```
builds/
├── INDEX.md                       (this file)
└── 001-mvp/
    ├── build.md                   — Config + agent instructions
    ├── log.md                     — Append-only progress log
    ├── BUILD-MANIFEST.json        — Machine-readable task graph and state
    ├── tasks/
    │   ├── 001-task-setup.md
    │   ├── 002-task-auth.md
    │   └── 003-task-landing.md
    └── issues/
        ├── 001-issue-token-refresh.md
        └── 002-issue-mobile-nav.md
```

## Naming

- Folders: `NNN-{slug}/`
- Tasks: `NNN-task-{slug}.md` inside `tasks/`
- Issues: `NNN-issue-{slug}.md` inside `issues/`

## Files

- **`build.md`** — FlexDoc with `type: build`. Frontmatter + prose goal + `instructions` flex_block declaring the build's scope, visual target (link to prototype), and rules.
- **`log.md`** — Append-only progress log. Never edited after writing.
- **`BUILD-MANIFEST.json`** — Machine-readable state. Task dependencies, status, files produced. Read by the build runner; not a FlexDoc.
- **`tasks/*.md`** — Each task is a FlexDoc with `type: build, subtype: task`. Declares input specs, output files, acceptance criteria via an `acceptance` flex_block.
- **`issues/*.md`** — Each issue is a FlexDoc with `type: build, subtype: issue`. Bug reports discovered during build or test.

## Skills

- **`flexos-build-plan`** — reads all specs + prototypes → produces the ordered task manifest
- **`flexos-build-task`** — executes one task → writes production code for one vertical slice
- **`flexos-build-verify`** — smoke tests a completed task
- **`flexos-build-debug`** — diagnoses a failing task

See MEGA-SPEC §11 for the full pattern.
