# specs/

Per-item specifications. One file per thing. Flat folder — all spec types coexist. Type and subtype encoded in filename so the rail filters by path.

## Naming

```
NNN-{type}-{subtype}_{slug}.md
```

Zero-padded, monotonic. Subtypes are always singular (`route` not `routes`).

## Types and Subtypes

| Type | Subtypes | Filename example |
|------|----------|-----------------|
| `page` | `route`, `component`, `layout`, `overlay` | `001-page-route_home.md` |
| `feature` | `primary`, `secondary` | `005-feature-primary_auth.md` |
| `database` | `collection`, `api`, `store` | `007-database-collection_users.md` |
| `flow` | `user`, `auth`, `backend` | `010-flow-user_onboarding.md` |

## Examples

```
001-page-route_home.md
002-page-component_navbar.md
003-page-layout_app-shell.md
004-page-overlay_login-modal.md
005-feature-primary_auth.md
006-feature-secondary_email-notifications.md
007-database-collection_users.md
008-database-api_stripe.md
009-database-store_favorites.md
010-flow-user_onboarding.md
011-flow-auth_google-login.md
012-flow-backend_email-notifications.md
```

## Anatomy

Frontmatter carries universal fields only (`id`, `title`, `type`, `subtype`, `status`, `relatesTo`, etc.). Type-specific detail (route path, component props, collection schema) lives in the prose body or in flex_blocks — never in frontmatter fields.

Specs reference holy docs via `relatesTo`. Route specs declare `**Route:** \`/path\`` in the body so the sitemap rollup can pick them up.

See MEGA-SPEC §8 for the full anatomy.
