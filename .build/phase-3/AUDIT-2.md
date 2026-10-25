# Phase 3 — Audit 2

Auditor stance: strict and adversarial. I did not build this phase. Every exit criterion was exercised by a command and the output is pasted below. I re-checked all criteria from scratch, not only the prior issue. FIXLOG.md (P3-001) was read and the claim was verified independently.

Run from `/home/ascra/Downloads/opralvin-web`. Toolchain: node v24.16.0, pnpm 11.18.0, Python 3.14.5. No money spent, no site DB opened, no client app source read, no bench install, no deploy.

## Commands run

| Command | Result |
|---|---|
| `rm -rf apps/web/.next && pnpm build` | `✓ Compiled successfully in 2.1s`, `Finished TypeScript in 1152ms`, routes `/`, `/_not-found`, `/api/leads`, `/process-audit`. `BUILD_EXIT=0` |
| `pnpm test` (run 1) | `Ran 9 tests … OK`, `TEST_EXIT1=0` |
| `pnpm test` (run 2) | `Ran 9 tests … OK`, `TEST_EXIT2=0` |
| `node scripts/scan-secrets.mjs` | `secret scan passed on 154 files`, `SECRETS_EXIT=0` |
| `node scripts/check-client-bundle.mjs` | `client bundle has no ERP credential strings (10 files)`, `BUNDLE_EXIT=0` |
| `grep -rni erpnext apps/web/src` | no match (exit 1) |
| `grep -rni frappe apps/web/src` | 3 matches, all `process.env.FRAPPE_*` server reads in `api/leads/route.ts:5-7` (allowed) |
| `grep -rniE 'erpnext\|frappe' apps/web/.next/static` | no match — stack names absent from built client bundle |
| `ls docs/adr/` | `0001`–`0009` present |
| `cat .env.example` | all vars present, no real secret (see below) |
| `grep -rniE '₹\|rs.[0-9]\|INR\|lakh\|crore\|[0-9]+%\|testimonial\|award' apps/web/src packages/content` | no match (exit 1) — no invented price/metric |

## Criteria table

| # | Criterion | How checked | Evidence | Met? |
|---|---|---|---|---|
| 1 | ADRs for every section-8 decision (front end, content, lead path, live demo, protection, DPDP, analytics, two rejected options) | `ls docs/adr/` + read all eight | `0002-frontend-next`, `0003-content-mdx`, `0004-lead-backend`, `0005-live-demo`, `0006-protection`, `0007-dpdp`, `0008-analytics`, `0009-rejected-options`. All `Status: accepted`. `0009` records both rejections (Frappe website module with a documented migration path back; FigCraft). Content is substantive, not stubbed. | Yes |
| 2 | Repo scaffold builds (`pnpm build` exits 0) | Deleted `.next`, rebuilt | `✓ Compiled successfully`, `BUILD_EXIT=0`. 4 routes generated. | Yes |
| 3 | `opralvin_site` app exists; installs on a named safe site or, absent one, tests pass against a mock with live install as an owner todo | `find apps/frappe-site`, read tests, `pnpm test` x2 | `hooks.py` (`app_name = "opralvin_site"`, `required_apps = ["crm"]`), `modules.txt` (`Opralvin Site`), `pyproject.toml` (`name = "opralvin_site"`), `api/lead.py`, `lead_contract.py`, `fixtures/custom_field.json`, `tests/`. 9 real tests (payload validation, consent/honeypot/phone rejection, origin allow-list, `create_lead` via injected insert, manifest) pass twice. Live install deferred in `STATE.json owner_todos` ("Name a non-client site … before installing opralvin_site") and ADR 0004 — compliant pending. | Yes |
| 4 | Env vars documented in `.env.example`; server secrets have no `NEXT_PUBLIC_` prefix | `cat .env.example` + `grep process.env` across code | Every env the code reads is listed: `FRAPPE_URL/API_KEY/API_SECRET`, `OPRALVIN_ALLOWED_ORIGINS`, `TURNSTILE_SECRET_KEY`, Upstash, Resend, GrowthBook under "Server only. Never prefix with NEXT_PUBLIC"; `NEXT_PUBLIC_BOOKING_LINK` (used in `process-audit/page.tsx`) is public and tokenised `{{BOOKING_LINK}}`. All server secrets empty, none `NEXT_PUBLIC_`. | Yes |
| 5 | No secret in repo (`scan-secrets.mjs` exits 0); client bundle carries no ERP credential | Ran both scripts post-build; independently read both scripts | Secret scan covers 154 files (incl. untracked phase-3 files via `git ls-files -co`), exit 0. Bundle check exit 0 and an independent `grep` of `.next/static` for `erpnext`/`frappe` found nothing. | Yes |
| + | Honesty contract (no invented clients/metrics/testimonials/prices; stack unnamed in customer copy and client JSON) | Read `page.tsx`, `process-audit/page.tsx`, `layout.tsx`, `route.ts`, `events.ts`; price/metric grep | Home challan labelled "Illustrative challan. Not a live document." with fictional "Sample Traders". Home and process-audit both state the audit "does not include … a price." Booking renders `{{BOOKING_LINK}}` token. No testimonials/logos/metrics. Client-visible JSON from `/api/leads` is generic on every branch. No stack name in any rendered copy. | Yes |

## Issues

**P3-001 — RESOLVED (was Minor) — `apps/web/src/app/api/leads/route.ts:8-13`**
Prior leak: the 503 misconfiguration body echoed `FRAPPE_URL, FRAPPE_API_KEY, FRAPPE_API_SECRET` to the client. Verified fixed: the handler now `console.error`s a generic server-side line and returns `{ error: "Lead storage is not configured yet. The form cannot be stored until the owner supplies the server credentials." }`. `grep -rni frappe apps/web/src` now returns only the three mandated server `process.env.FRAPPE_*` reads (lines 5-7); no client-visible string names the stack. Claim in FIXLOG confirmed by reading the file, not by trusting the log.

**P3-002 — Minor — `apps/web/src/app/api/leads/route.ts:28-35` vs `apps/frappe-site/opralvin_site/api/lead.py:11`**
What is wrong: the Route Handler and the whitelisted method it calls do not share a contract. The route POSTs `body: JSON.stringify(parsed.data)` — a flat lead object `{ name, phone, email, company, consent, utm_*, landing_page, segment, assessment_score, calculator_result }` — to `/api/method/opralvin_site.api.lead.capture_lead`. The whitelisted method signature is `capture_lead(origin, allow_list, payload)`. Frappe maps request params to parameter names by keyword, so this call would raise a `TypeError` (missing `origin`, `allow_list`, `payload`; unexpected `name`, `phone`, …) the moment it is wired. Separately, the route never reads `OPRALVIN_ALLOWED_ORIGINS` nor forwards an origin, so the method's `origin_allowed` CORS gate (ADR 0006) can never receive its inputs from the web path as scaffolded.
Why it is not a dishonesty or build break: it does not violate the honesty contract, does not fail the build, the tests, or any of the five exit criteria (the unit tests exercise `lead_contract`/`capture_lead` directly with correct arguments, so they stay green; the live call is gated behind owner-todo server credentials and is unreachable now). It is a latent fragility introduced this phase, not a declared stub.
Expected state: the Route Handler should send a body whose shape matches the whitelisted method (e.g. pass `payload` plus `origin`/`allow_list` from `OPRALVIN_ALLOWED_ORIGINS`), or the method signature should accept the fields the route actually sends. Either way the two created-this-phase halves of the lead path must line up before Phase 6 wires live keys.

## Verdict

**FAIL** — 0 Critical, 0 Major, 1 Minor (P3-002). P3-001 is verified resolved.

All five exit criteria are met with pasted command evidence: build exits 0, 9 tests green twice, both scan scripts exit 0 (and an independent bundle grep is clean), ADRs complete and accepted, `.env.example` documents every env var with no real secret and no `NEXT_PUBLIC_` on a server key. The honesty contract holds: no invented clients, metrics, testimonials, or prices; placeholders are correctly tokenised; no stack name reaches customer copy or client-visible JSON. The one open item is a Minor contract mismatch between the lead Route Handler and the whitelisted Frappe method it calls, which would break the lead path when wired. Per the rule that PASS requires zero Critical, zero Major and zero Minor, this round is FAIL; fix P3-002 and re-audit.
