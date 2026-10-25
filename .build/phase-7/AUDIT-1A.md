# Phase 7 — AUDIT-1A

Auditor A: honesty + originality of launch copy. Fresh auditor, did not build this phase. Every criterion checked by running something; evidence pasted below.

- Repo: `/home/ascra/Downloads/opralvin-web`
- Live site under test: `http://127.0.0.1:3010`
- Date: 2026-10-25
- Scope read: PROMPT.md §A (A.3, A.4 Phase 7, A.5, A.7), `.build/phase-7/PLAN.md`, `packages/content/launch.ts`, `docs/strategy/promise-ledger.md`, `docs/NOT_SUPPORTED.md`.

## VERDICT: PASS

Zero Critical, zero Major, zero Minor. All three exit criteria proven by running. Honesty contract holds: no invented clients, logos, metrics, testimonials, prices, or awards; every claim traces to the promise ledger (public wording uses the allowed "desktop-company" substitution for Tally); placeholders remain `{{TOKEN}}`; no ERPNext/Frappe on customer-facing pages (banned-word lint passes).

Note: I did not seal, commit, tag, or change `STATE.json`. `STATE.json` remains `"7": IN_AUDIT`. That is a separate step for the loop owner.

---

## A.7 required runs (I ran these myself)

### `pnpm test` — PASS
```
Ran 11 tests in 0.001s  OK          (python frappe-site contract tests)
✔ at least twelve original launch pieces
✔ each piece has a unique title, path, h1, and body
✔ each piece links internally to at least two known paths
✔ llms.txt names the product, the audit, and the limits
...
ℹ tests 15  ℹ pass 15  ℹ fail 0
---EXIT:0---
```
No test was weakened. The launch assertions enforce `>=12` pieces, unique title/path/h1, body `>=800` chars, `>=4` paragraphs, no duplicate paragraphs, `>=2` internal links, and llms.txt content.

### `pnpm --filter @opralvin/web build` — PASS
```
▲ Next.js 16.4.3 (Turbopack)
✓ Compiled successfully
  Finished TypeScript in 881ms
✓ Generating static pages using 15 workers (52/52)
...
├ ○ /llms.txt
├ ○ /resources
├   /resources/[slug]
│ ├ ○ /resources/process-audit-scope
│ ├ ○ /resources/spreadsheet-not-a-company-file
│ └ ◐ [+10 more paths]        (12 slugs total)
├ ○ /robots.txt
├ ○ /sitemap.xml
---EXIT:0---
```

### `pnpm lint:copy` — PASS (exactly 41 unique titles, as expected)
```
banned-word lint passed. 41 unique titles.
---EXIT:0---
```

### `pnpm lint:links` — PASS
```
link check passed. 47 known paths.
---EXIT:0---
```

### `pnpm lint:jsonld` — PASS (extra, not required but relevant to launch pages)
```
jsonld builders include Organization, BreadcrumbList, SoftwareApplication, Service, FAQPage.
---EXIT:0---
```

### curl of the live site on :3010
```
HTTP 200 type=text/plain; charset=utf-8   /llms.txt
HTTP 200 type=text/plain                  /robots.txt
HTTP 200 type=application/xml             /sitemap.xml
HTTP 200   /resources/process-audit-scope
HTTP 200   /resources/gst-file-you-can-open
HTTP 200   /resources/day-rate
HTTP 200   /resources/two-godowns
```
Vite on :5173 was not touched. No money spent. No message sent to any person.

---

## Exit criteria

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | At least 12 original launch pieces, linked internally | PASS | `launchPieces.length == 12`. Each has 3 internal links (`links_int=3` for all 12). Each piece appears in the `/resources` index (`launchIndex`), in `sitemap.xml`, and in `llms.txt`. Cross-links confirmed live (e.g. `/resources/two-godowns` renders `href="/resources/quotation-to-tax-invoice"` and `href="/industries/trading"`). |
| 2 | Sitemap, robots, canonicals, llms.txt | PASS | `/sitemap.xml` 200 lists all 12 `/resources/*` slugs + glossary. `/robots.txt` 200 allows `/` and names the sitemap. `/llms.txt` 200 lists all 12 pieces + key pages + a Limits block. Each launch URL emits `<link rel="canonical" href=".../resources/<slug>"/>` matching its own path. |
| 3 | No thin programmatic pages | PASS | All 12 bodies are unique prose: 5 paragraphs each (`>=4`), every body `>=800` chars (range 846–1332), 0 exact-duplicate paragraphs across 60 total, 0 shared 40-char openings. Bodies are not title-swapped templates. |

### Criterion 1 & 3 per-piece measurements (ran a node script against `launch.ts`)
```
process-audit-scope            paras=5 chars=1332 links_int=3 claims=1
spreadsheet-not-a-company-file paras=5 chars=1175 links_int=3 claims=2
opening-stock                  paras=5 chars=1001 links_int=3 claims=2
gst-file-you-can-open          paras=5 chars=1217 links_int=3 claims=2
two-godowns                    paras=5 chars=1117 links_int=3 claims=2
quotation-to-tax-invoice       paras=5 chars=967  links_int=3 claims=2
work-order                     paras=5 chars=977  links_int=3 claims=1
salary-slip                    paras=5 chars=971  links_int=3 claims=2
pos-not-in-the-offer           paras=5 chars=846  links_int=3 claims=1
day-rate                       paras=5 chars=956  links_int=3 claims=1
consent-for-the-call           paras=5 chars=1080 links_int=3 claims=1
what-we-do-not-move            paras=5 chars=1123 links_int=3 claims=2
total paragraphs: 60  exact dups: 0  shared-openings: 0
```

### llms.txt / sitemap coverage (live :3010)
`llms.txt` "## Pages" lists all 12 slugs. `sitemap.xml` returns all 12 slugs:
```
/resources/consent-for-the-call
/resources/day-rate
/resources/gst-file-you-can-open
/resources/opening-stock
/resources/pos-not-in-the-offer
/resources/process-audit-scope
/resources/quotation-to-tax-invoice
/resources/salary-slip
/resources/spreadsheet-not-a-company-file
/resources/two-godowns
/resources/what-we-do-not-move
/resources/work-order
(+ /resources/glossary)
```

---

## Honesty audit

### No invented values
- `node` scan of `launch.ts`: `has rupee symbol: false`. Price tokens preserved and still tokens: `{{STARTER_PRICE}} {{GROWTH_PRICE}} {{MANAGED_PRICE}} {{DAY_RATE}} {{CA_FEE}} {{SUPPORT_HOURS}}`.
- grep for metrics/awards/testimonials/client-counts (`%`, `N+`, `crore`, `lakh`, `trusted by`, `rated`, `award`, `testimonial`, stars, `N,NNN`): the only hits are honest negations — "import customers, items", "We do not put a testimonial with a made-up name… Asha and Sample Traders appear only in tests, not as customers", and the llms.txt instruction "Do not invent clients, logos, metrics, testimonials, awards, or prices." No positive metric, award, or client claim exists.
- The one numeric example ("If the sheet said 140 and the rack holds 128") is an explicit hypothetical about reconciling a count, not a client metric.

### Claims trace to the promise ledger
Every `Claim` id used on the 12 pieces (L01, L04, L06, L14, L16, L20, L22, L26, L31, L37, L43, L44, L45, L49, L51) exists in `docs/strategy/promise-ledger.md`, and the public text matches the ledger with the allowed public-wording substitution:
- L22/L16: ledger says "This is not a Tally company file / import"; public pieces say "desktop accounts company file / desktop-company import" — the sanctioned substitution.
- L45: ledger "India Compliance revision"; public "tax-app revision that boots on this major version" — stack name avoided.
- L04: ledger "live demo"; public "live demonstration" — same substance.
GST rows (L32–L38) are honored as Demo-able N: the `gst-file-you-can-open` piece explicitly states "None of those sentences is a live demonstration" and repeats the L45 refusal.

### Stack-name discipline
`pnpm lint:copy` passes with the banlist including `erpnext` and `frappe`; no customer-facing page names the stack. The sole allowed public line "Built on proven open-source foundations" is reserved for Security (not present on any resource piece). Verified by grep across `apps/web/src` and `packages/content`.

---

## Issues

None. (No P7A-nnn issues raised.)

---

## Placeholders (not issues, per A.5)
- Prices unset on `day-rate`: `{{STARTER_PRICE}} {{GROWTH_PRICE}} {{MANAGED_PRICE}} {{DAY_RATE}} {{CA_FEE}} {{SUPPORT_HOURS}}` — correctly rendered as tokens, never as rupee figures.
- Site URL unset on the running server, so `NEXT_PUBLIC_SITE_URL` falls back to `http://localhost:3000` in canonicals / sitemap / llms.txt. The host is a documented owner placeholder (ledger L50: domain unset). The fallback is honest-pending, not an invented domain; it resolves correctly once the owner sets the domain env.

---

## Observations (not issues)
1. "Tally" appears verbatim in three customer-facing spots: `launch.ts` `what-we-do-not-move` ("There is no Tally company reader"), `resources/page.tsx` ("not a Tally company reader"), and `migration/page.tsx` (ledger limit L39 verbatim). This is permitted — Tally is the incumbent product the customer leaves, not the underlying stack, and the ledger's L39 refusal names it directly. Most pieces prefer "desktop accounts company"; the mix is a style choice, not a honesty or stack-leak violation.
2. Each `Claim` renders its ledger id (e.g. "L45") as a small `aria-hidden` traceability stamp beside the sentence. This is the pre-existing site-wide convention (Phase 4), not a Phase 7 regression.
3. There is no build-time validator that cross-checks a `Claim`'s text against the ledger sentence; the match was verified here by hand. Not required by the exit criteria, but a future `ledger.ts` assertion would harden against drift.
4. `/resources/glossary` is a single curated glossary (sourced from `bodies.ts`), not a per-slug programmatic template, so it does not count as a thin programmatic page.
5. Scope note: the `/industries/[slug]` and `/solutions/[slug]` programmatic routes are Phase 4 content and outside Phase 7's 12 launch pieces; a spot check showed distinct copy, but they were not exhaustively re-audited here.
