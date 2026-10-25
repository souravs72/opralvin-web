# Phase 3 — Audit 1

Auditor stance: strict and adversarial. Every exit criterion was exercised by a command and the output is pasted below. Ran from `/home/ascra/Downloads/opralvin-web`. Toolchain: node v24.16.0, pnpm 11.18.0, python3. No money spent, no site DB opened, no client app source read, no bench install, no deploy.

## Criteria table

| # | Criterion | How checked | Evidence | Met? |
|---|---|---|---|---|
| 1 | ADRs for every section-8 decision (front end, content, lead path, live demo, protection, DPDP, analytics, two rejected options) | `ls docs/adr/` + read each file | `0002-frontend-next.md`, `0003-content-mdx.md`, `0004-lead-backend.md`, `0005-live-demo.md`, `0006-protection.md`, `0007-dpdp.md`, `0008-analytics.md`, `0009-rejected-options.md` all present; each `Status: accepted`. `0009` records both rejections: Frappe website module (with migration path back) and FigCraft. | Yes |
| 2 | Repo scaffold builds: `pnpm build` exits 0 | Deleted `apps/web/.next`, ran `pnpm build` | `✓ Compiled successfully in 2.1s` … `Finished TypeScript in 1138ms` … routes `/`, `/_not-found`, `/api/leads`, `/process-audit`. `BUILD_EXIT=0` | Yes |
| 3 | `opralvin_site` app exists with hooks.py, modules.txt, pyproject.toml, tests; tests pass against a mock (live install = owner todo) | `find apps/frappe-site`, `pnpm test` (x2) | `hooks.py`, `modules.txt` (`Opralvin Site`), `pyproject.toml` (`name = "opralvin_site"`), `tests/` present. `Ran 9 tests … OK`, `TEST_EXIT=0`; rerun `run1=0 run2=0`. Live install deferred via `owner_todos` ("Name a non-client site … before installing opralvin_site") and ADR 0004 — compliant pending branch. | Yes |
| 4 | Env vars in `.env.example`; `FRAPPE_API_KEY`/`FRAPPE_API_SECRET` listed, empty, no `NEXT_PUBLIC_` prefix | Read `.env.example` | `FRAPPE_API_KEY=` and `FRAPPE_API_SECRET=` present under "Server only. Never prefix with NEXT_PUBLIC", both empty. No `NEXT_PUBLIC_` on either. | Yes |
| 5 | No secret in repo (`node scripts/scan-secrets.mjs` exits 0); `node scripts/check-client-bundle.mjs` after build confirms no ERP creds in client bundle | Ran both scripts post-build | `secret scan passed on 152 files` `SECRETS_EXIT=0`; `client bundle has no ERP credential strings (10 files)` `BUNDLE_EXIT=0` | Yes |
| + | Grep `apps/web/src` for ERPNext and Frappe | `grep -rni erpnext/frappe apps/web/src` | ERPNext: no match (exit 1). Frappe: 4 matches, all in `src/app/api/leads/route.ts` — `FRAPPE_API_SECRET`/`FRAPPE_API_KEY`/`FRAPPE_URL` env reads plus a 503 error string naming those env vars. No rendered page copy names the stack. | Partial — see P3-001 |
| + | Honesty contract (no invented clients, metrics, testimonials, prices) | Read rendered pages; `grep ₹/Rs/INR/pricing` web/src + content | Home uses "Sample Traders / Ludhiana main / HSN 7214 / 240 bags" under the label "Illustrative challan. Not a live document." Process-audit states "It does not include … a price." Booking link renders the `{{BOOKING_LINK}}` placeholder token. Price grep: no match (exit 1). No testimonials/logos/metrics. Compliant. | Yes |
| + | Earlier sealed phases not broken; full build + test run (Phase 3+ rule) | `pnpm build` (0), `pnpm test` x2 (0), tokens present | Build green, 9 tests green twice, `design/tokens.json` present (3518 B). No regression surfaced. | Yes |

## Issues

**P3-001 — Minor — `apps/web/src/app/api/leads/route.ts:10`**
What is wrong: the required grep of `apps/web/src` for "Frappe" matches here. The env-var reads (`FRAPPE_API_SECRET`, `FRAPPE_API_KEY`, `FRAPPE_URL`) are mandated server config and are not customer-facing — that part is compliant. However the 503 misconfiguration response returns a JSON body that echoes the stack-named env vars to the client: `"Lead storage is not configured. FRAPPE_URL, FRAPPE_API_KEY, and FRAPPE_API_SECRET are owner todos."` A visitor submitting the form against an unconfigured backend receives a payload that names the underlying stack, which the brand rule wants kept off anything the public can see. ERPNext is never named and no rendered page names the stack, so the risk is low and misconfiguration-only.
Expected state: the client-visible error should be generic (e.g. "Lead storage is not configured yet.") with the specific `FRAPPE_*` env-var names logged server-side only, so no stack name can reach the browser.

## Verdict

**FAIL** — 0 Critical, 0 Major, 1 Minor (P3-001).

All five exit criteria are met with pasted command evidence (build exit 0, 9 tests green twice, both scan scripts exit 0, ADRs complete, `.env.example` correct). The honesty contract holds: no invented clients, metrics, testimonials, or prices; placeholders are correctly tokenised. The single open item is a Minor stack-name leak in a client-reachable misconfiguration error response. Per the rule that PASS requires zero Critical, zero Major and zero Minor, this round is FAIL; fix P3-001 and re-audit.
