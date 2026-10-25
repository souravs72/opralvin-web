# Phase 7 — AUDIT-1B (Auditor B: engineering)

Scope: routes, sitemap, robots, canonicals, `llms.txt`, tests, no-thin-pages.
Auditor: fresh, independent. Did not build this phase. Every claim below was run.
Live site under test: `http://127.0.0.1:3010`. Vite on :5173 untouched.
Date: 25 Oct 2026.

## Verdict

**PASS** — zero Critical, zero Major, zero Minor issues.

All three exit criteria are met and proven by running the suite, the build, the four
lints, the dedicated launch test, and live `curl` against `:3010`. No tests were
skipped or weakened. The two lint-script edits are strengthening or are the exact
needle this audit was instructed to expect.

## Exit-criteria table

| # | Exit criterion | Result | Evidence (summary) |
|---|---|---|---|
| 1 | ≥12 original launch pieces, linked internally | PASS | 12 pieces in `launch.ts`; each body 846–1332 chars, 5 unique paragraphs, 3 internal links; all 12 listed on `/resources` index via `launchIndex`. |
| 2 | Sitemap, robots, canonicals, `llms.txt` | PASS | `sitemap.xml` 200 with 13 `/resources/` URLs (glossary + 12); `robots.txt` 200 includes `Sitemap:`; every launch page emits `rel="canonical"`; `llms.txt` 200 `text/plain` naming Opralvin One + process audit. |
| 3 | No thin programmatic pages | PASS | Bodies 846–1332 chars of bespoke prose; test enforces unique title/path/h1 + every paragraph unique + body ≥800 + ≥4 paragraphs; no title-swapped template paragraph. |

## A.7 evidence (commands run)

### `pnpm test`
Exit 0. 11 Python unittest + 15 node tests. `pass 15 / fail 0 / skipped 0 / todo 0`.
Includes `at least twelve original launch pieces`, `each piece has a unique title, path,
h1, and body`, `each piece links internally to at least two known paths`,
`llms.txt names the product, the audit, and the limits`.

### `pnpm --filter @opralvin/web build`
Exit 0. `✓ Compiled successfully`, `Finished TypeScript`, `Generating static pages (52/52)`.
Route tree shows `/resources/[slug]` prerendered with `process-audit-scope`,
`spreadsheet-not-a-company-file` + `[+10 more paths]` = 12 static slugs; plus
`/llms.txt ○`, `/sitemap.xml ○`, `/robots.txt ○`, `/resources/glossary ○`.

### `pnpm lint:copy`
Exit 0. `banned-word lint passed. 41 unique titles.`

### `pnpm lint:links`
Exit 0. `link check passed. 47 known paths.`

### `pnpm lint:jsonld`
Exit 0. `jsonld builders include Organization, BreadcrumbList, SoftwareApplication, Service, FAQPage.`

### `node --test packages/content/launch.test.ts`
Exit 0. `tests 4 / pass 4 / fail 0 / skipped 0`.

### `curl http://127.0.0.1:3010/llms.txt`
```
HTTP/1.1 200 OK
content-type: text/plain; charset=utf-8
```
Body opens `# Opralvin One`, line `...book a free process audit`, lists all 12
`/resources/*` pieces under `## Pages`, and a `## Limits` block
(`No desktop-company reader. No live GST portal demonstration.`). Names Opralvin One
and the process audit. ✓

### `curl http://127.0.0.1:3010/sitemap.xml` + count `/resources/`
```
HTTP/1.1 200 OK
content-type: application/xml
```
13 unique `/resources/` `<loc>` entries = `glossary` + the 12 pieces
(consent-for-the-call, day-rate, glossary, gst-file-you-can-open, opening-stock,
pos-not-in-the-offer, process-audit-scope, quotation-to-tax-invoice, salary-slip,
spreadsheet-not-a-company-file, two-godowns, what-we-do-not-move, work-order).
Total `<loc>` across site: 41. ✓

### `curl http://127.0.0.1:3010/robots.txt`
```
HTTP/1.1 200 OK
content-type: text/plain

User-Agent: *
Allow: /

Sitemap: http://localhost:3000/sitemap.xml
```
Sitemap directive present. ✓

### `curl` a launch page + grep canonical
`/resources/process-audit-scope` → 200, `x-nextjs-prerender: 1`.
`<link rel="canonical" href="http://localhost:3000/resources/process-audit-scope"/>`
Unique `<title>`, unique `<meta name="description">`, JSON-LD types
`Article, Brand, BreadcrumbList, ListItem, Organization`.
Spot-checked `what-we-do-not-move`, `day-rate`, `pos-not-in-the-offer`: all 200,
each with its own canonical. ✓

## Confirmations requested

- **generateStaticParams covers all 12 slugs** — `page.tsx` returns
  `launchPieces.map((piece) => ({ slug: piece.slug }))`; build prerendered 12 static
  `/resources/[slug]` pages. ✓
- **metaFor sets canonicals** — `seo.ts` returns `alternates: { canonical: new URL(path, site) }`;
  verified live on four distinct launch pages, each canonical distinct. ✓
- **No tests skipped/weakened** — `grep` for `skip/.only/todo` in `launch.test.ts`,
  `packages/content/*.test.ts`, `packages/lead/*.test.ts`: none found. Runner reports
  `skipped 0 / todo 0`. Launch test thresholds are strong (≥12 pieces, body ≥800,
  ≥4 paragraphs, ≥2 internal links, unique title/path/h1/paragraph). ✓
- **Body lengths (not thin)** — process-audit-scope 1332, spreadsheet 1175,
  opening-stock 1001, gst-file 1217, two-godowns 1117, quotation 967, work-order 977,
  salary-slip 971, pos 846, day-rate 956, consent 1080, what-we-do-not-move 1123.
  All 5 paragraphs, all 3 internal links. ✓
- **Claim honesty (spot)** — all 15 claim IDs used in `launch.ts`
  (L01,L04,L06,L14,L16,L20,L22,L26,L31,L37,L43,L44,L45,L49,L51) resolve in
  `docs/strategy/promise-ledger.md`. ✓

## Issue list

None. No P7B-xxx issues raised.

## Observations (not issues)

- **O1 — bundle needle is `token ${`, as instructed.** `scripts/check-client-bundle.mjs`
  changed the needle from `"token "` to `"token ${"`. This is exactly the Authorization
  template-literal pattern this audit was told to treat as correct; the old `"token "`
  needle would false-positive on the legitimate copy (`"stay tokens"`, `"the token {{DAY_RATE}}"`).
  `pnpm bundle:check` passes: `client bundle has no ERP credential strings (17 files)`.
  The `FRAPPE_API_SECRET/KEY/URL` needles are intact. Not a weakening.
- **O2 — lint scripts were strengthened for launch content.** `check-banned-words.mjs`
  now also scans `launch.ts` titles/descriptions for duplicates and banned words;
  `check-links.mjs` now also validates `launch.ts` `href`s against the allowed path set
  and adds `/llms.txt` as a valid route. Both are additive guards, not relaxations.
- **O3 — `NEXT_PUBLIC_SITE_URL` unset on the dev server.** `llms.txt`, `sitemap.xml`,
  `robots.txt`, and canonicals all emit `http://localhost:3000` (the code's env fallback).
  The production domain is an existing owner TODO; the code reads `process.env.NEXT_PUBLIC_SITE_URL`
  with a localhost default. This is a placeholder, not a Phase-7 defect.
- **O4 — unknown `/resources/<slug>` returns a rendered 404 page with HTTP 200 in dev.**
  `page.tsx` correctly calls `notFound()`; the body renders the `404` not-found UI.
  The 200 status is the Next.js PPR / Cache Components static-shell behavior and is
  identical across the repo's other dynamic routes (`solutions/[slug]`, `industries/[slug]`).
  The sitemap exposes only the 13 real paths, so no thin/soft page is advertised to crawlers.
  Consistent prior-art behavior, not a Phase-7 regression.

## Scope note

Did not seal, commit, tag, or modify `STATE.json`. Did not weaken any test. No money
spent, no real person messaged. Vite on :5173 untouched.
