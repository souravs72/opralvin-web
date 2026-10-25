# Phase 3 — Audit 3

Auditor stance: strict and adversarial. I did not build this phase. I assumed it was broken until a command proved otherwise. I re-checked every exit criterion from scratch — not only the prior issues — and I read FIXLOG.md, AUDIT-1.md, and AUDIT-2.md, then verified each claim myself by opening files and running commands.

Run from `/home/ascra/Downloads/opralvin-web`. Toolchain: node v24.16.0, pnpm 11.18.0, Python 3.14. No money spent, no site DB opened, no client app source read, no bench install, no deploy.

## Commands run (evidence)

| Command | Result |
|---|---|
| `rm -rf apps/web/.next && pnpm build` | `✓ Compiled successfully in 2.2s`, `Finished TypeScript in 1174ms`, routes `/`, `/_not-found`, `/api/leads` (ƒ dynamic), `/process-audit`. `BUILD_EXIT=0` |
| `pnpm test` (run 1) | `Ran 11 tests … OK`, `TEST_EXIT1=0` |
| `pnpm test` (run 2) | `Ran 11 tests … OK`, `TEST_EXIT2=0` |
| `node scripts/scan-secrets.mjs` | `secret scan passed on 155 files`, `SECRETS_EXIT=0` |
| `node scripts/check-client-bundle.mjs` | `client bundle has no ERP credential strings (10 files)`, `BUNDLE_EXIT=0` |
| `grep -rni erpnext apps/web/src` | no match (exit 1) |
| `grep -rni frappe apps/web/src` | 3 matches, all `process.env.FRAPPE_*` server reads in `api/leads/route.ts:5-7` (allowed server env reads in a Route Handler) |
| `grep -rniE 'erpnext\|frappe' apps/web/.next/static` | no match (exit 1) — stack names absent from the built client bundle |
| `grep -rniE 'TODO\|FIXME\|XXX\|stub\|not implemented' apps/web/src apps/frappe-site` | only a correctly-labelled `{{BOOKING_LINK}}` placeholder note and `owner@placeholder.invalid` — no code stubs or TODOs |
| `ls docs/adr/` | `0001`–`0009` present |
| `cat .env.example` | every env var the code reads is listed; no real secret; no `NEXT_PUBLIC_` on a server key |
| `git tag` | `phase-0-passed`, `phase-1-passed`, `phase-2-passed` present (earlier phases sealed) |

## Criteria table

| # | Criterion | How checked | Evidence | Met? |
|---|---|---|---|---|
| 1 | ADRs for every architecture decision in section 8 (front end, content, lead path, live demo, protection, DPDP, analytics, two rejected options) | `ls docs/adr/` + opened each | `0002-frontend-next`, `0003-content-mdx`, `0004-lead-backend`, `0005-live-demo`, `0006-protection`, `0007-dpdp`, `0008-analytics`, `0009-rejected-options`. All `Status: accepted`. `0009` records both rejections (Frappe website module with a documented migration path that keeps the lead contract unchanged; FigCraft). Content is substantive, not stubbed. | Yes |
| 2 | Repo scaffold builds (`pnpm build` exits 0) | Deleted `.next`, rebuilt | `✓ Compiled successfully`, `BUILD_EXIT=0`, 4 routes generated. | Yes |
| 3 | `opralvin_site` app exists; installs on a named safe site or, absent one, tests pass against a mock with live install an owner todo | `find apps/frappe-site`, read tests + manifest, `pnpm test` x2 | `hooks.py` (`app_name = "opralvin_site"`, `required_apps = ["crm"]`), `modules.txt`, `patches.txt`, `pyproject.toml` (`name = "opralvin_site"`), `api/lead.py`, `lead_contract.py`, `fixtures/custom_field.json` (all 9 `custom_*` fields the validator writes are defined), `tests/`. 11 real tests (payload validation, consent/honeypot/phone rejection, origin allow-list, `create_lead` via injected insert, web-route-shape `handle_request`, manifest) pass twice. Live install deferred in `STATE.json owner_todos` ("Name a non-client site … before installing opralvin_site") and ADR 0004 — a correctly-marked pending install, compliant. | Yes |
| 4 | Env vars documented in `.env.example`; server secrets have no `NEXT_PUBLIC_` prefix | `cat .env.example` + `grep process.env` across code | Every env the code reads is listed: `FRAPPE_URL/API_KEY/API_SECRET`, `OPRALVIN_ALLOWED_ORIGINS`, `TURNSTILE_SECRET_KEY`, Upstash pair, `RESEND_API_KEY`, `GROWTHBOOK_CLIENT_KEY` under "Server only. Never prefix with NEXT_PUBLIC"; public `NEXT_PUBLIC_SITE_URL` (route origin fallback) and `NEXT_PUBLIC_BOOKING_LINK` (`{{BOOKING_LINK}}`) tokenised. All server secrets empty; none `NEXT_PUBLIC_`. | Yes |
| 5 | No secret in repo (`scan-secrets.mjs` exits 0); client bundle carries no ERP credential | Ran both scripts post-build; independently read both scripts | Secret scan covers 155 files via `git ls-files -co` (incl. untracked phase-3 files), checks private-key/AWS/stripe/github patterns and assigned-secret env lines, exit 0. Bundle check walks `.next/static` for `FRAPPE_API_SECRET`/`FRAPPE_API_KEY`/`token `, exit 0; an independent grep of `.next/static` for `erpnext`/`frappe` is also clean. | Yes |
| + | Lead contract parity (required check) | Opened `apps/web/src/app/api/leads/route.ts` and `apps/frappe-site/opralvin_site/api/lead.py` + `lead_contract.py` | The route POSTs `{ origin, allow_list, payload }` to `/api/method/opralvin_site.api.lead.capture_lead`; the whitelisted method signature is `capture_lead(origin, allow_list, payload)`, which delegates to `handle_request(origin, allow_list, payload, insert)`. Origin = request `Origin` header (fallback `NEXT_PUBLIC_SITE_URL`); allow_list = `OPRALVIN_ALLOWED_ORIGINS`; payload = Zod-parsed lead object whose keys match the Python validator's `REQUIRED`/optional reads. The two files agree on origin, allow_list, and payload. `test_handle_request_matches_the_web_route_shape` and `test_handle_request_rejects_a_foreign_origin` pin this. **P3-002 resolved — verified.** | Yes |
| + | Honesty contract (no invented clients/metrics/testimonials/prices; stack unnamed in customer copy and client JSON) | Read `page.tsx`, `process-audit/page.tsx`, `layout.tsx`, `route.ts`, `events.ts` | Home challan labelled "Illustrative challan. Not a live document." with fictional "Sample Traders"; both pages state the audit "does not include … a price." Booking renders the `{{BOOKING_LINK}}` token. No testimonials/logos/metrics. Every `/api/leads` client JSON branch is generic (503 says "Lead storage is not configured yet…", no `FRAPPE_` leak — **P3-001 resolved, verified**). `FRAPPE_*` only appears as server env reads in the Route Handler, which the honesty contract explicitly allows. No customer-facing copy names ERPNext or Frappe. | Yes |
| + | Earlier sealed phases not broken (Phase 3+ rule) | `pnpm build`, `pnpm test` x2, `git tag`, `design/tokens.json` | Build green, 11 tests green twice, `phase-0/1/2-passed` tags intact, `design/tokens.json` present (3518 B). No regression surfaced. | Yes |

## Issues

No Critical, Major, or Minor issues found this round.

- **P3-001 (prior Minor) — RESOLVED, verified.** `apps/web/src/app/api/leads/route.ts:9-13` now `console.error`s a generic server-side line and returns a client body that does not name any env var or stack. Confirmed by reading the file, not by trusting FIXLOG.
- **P3-002 (prior Minor) — RESOLVED, verified.** The Route Handler and `capture_lead` now share one contract: both use `{ origin, allow_list, payload }`, the route sources `allow_list` from `OPRALVIN_ALLOWED_ORIGINS` and `origin` from the request header, and the Zod payload shape matches the Python validator. Pinned by two unit tests that pass twice. Confirmed by opening both files.

## Verdict

**PASS** — 0 Critical, 0 Major, 0 Minor.

All five exit criteria are met with pasted command evidence: `pnpm build` exits 0, 11 Frappe-app tests pass twice, `scan-secrets.mjs` and `check-client-bundle.mjs` both exit 0 (with an independent bundle grep also clean), ADRs 0002–0009 cover every section-8 decision and are accepted, and `.env.example` documents every env var with no real secret and no `NEXT_PUBLIC_` on a server key. The required lead-contract parity check passes: the Next.js route and `opralvin_site.api.lead.capture_lead` share one `{ origin, allow_list, payload }` contract. The honesty contract holds — no invented clients, metrics, testimonials, or prices; placeholders are correctly tokenised; no stack name reaches customer-facing copy or client-visible JSON, and the only `FRAPPE_*` references are allowed server env reads in the Route Handler. Both previously open Minors (P3-001, P3-002) are independently verified resolved. Earlier sealed phases (0, 1, 2) remain intact. Phase 3 is ready to seal.
