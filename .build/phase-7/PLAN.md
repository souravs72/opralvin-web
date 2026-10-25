# Phase 7 plan

Readers: Phase 7 auditors. User: Continue.

Phase 6 sealed `7e712a0` tag `phase-6-passed`. Dual auditors.

## Scope

Twelve original launch pieces on `/resources/*`, each with its own title, description, and body. Internally linked. Sitemap, robots, canonicals already exist and must include the new paths. `llms.txt` at the site root. No thin programmatic pages: each body is unique prose, not a title swapped into one template paragraph.

Do not invent clients, metrics, prices, or case studies. Claims stay inside CAPABILITIES.md. Missing prices stay tokens.

## Exit criteria (copied from §A.4)

1. At least 12 original launch pieces, linked internally.
2. Sitemap, robots, canonicals, `llms.txt`.
3. No thin programmatic pages.

## Files

`packages/content/launch.ts` plus tests, `apps/web/src/app/resources/[slug]/page.tsx`, `apps/web/src/app/llms.txt/route.ts`, `packages/content/site.ts`, resources index.
