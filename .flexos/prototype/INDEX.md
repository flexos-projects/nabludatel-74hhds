# prototype/

HTML prototypes — standalone pages viewable in an iframe or opened directly. One cohesive system, not multiple instances, so the folder is singular.

## Structure

```
prototype/
├── INDEX.md            (this file)
├── prototype.md        — Dashboard: sitemap, versions, deploy config, AI instructions
├── index.html          — Hub page with links to each current prototype
├── mock-data.json      — Mock data for all prototypes (generated from database specs)
├── pages/              — Versioned prototype HTML files
│   ├── home-v1.html
│   ├── home-v2.html
│   └── products-v1.html
└── shared/             — CSS + shared helpers
    ├── tokens.css      — Copied from design/tokens.css on publish
    ├── components.css  — Copied from design/components.css on publish
    └── context.md      — Optional shared content/tone decisions
```

## Rules

- **Versioned per page:** `{slug}-v{N}.html`. Latest version = highest N. Multiple versions coexist.
- **Standalone:** each page works by being opened in a browser. No build step.
- **Relative linking** between pages via relative paths. Use the sitemap's `current` field to resolve route → filename. Never use runtime route paths.
- **Shared assets:** link `../shared/tokens.css` and `../shared/components.css`. Never reach into `../../design/`.
- **Mock data:** fetch `../mock-data.json` from inline JS.
- **Never edit** `shared/tokens.css` or `shared/components.css` directly — they're copies compiled from `design/`.

## The Dashboard

`prototype.md` is the section's "root" — it renders as a pinned item in the workspace Preview rail. Three flex_blocks drive the tabs:

- **`sitemap`** — route → current prototype file. Routes auto-populated from page specs; `current` is user-chosen.
- **`prototype-versions`** — version history per slug. Auto-populated from filenames in `pages/`.
- **`deploy-config`** — preview URL, last deployed SHA, deploy history. Maintained by the deploy skill.

See MEGA-SPEC §10 for the full pattern.
