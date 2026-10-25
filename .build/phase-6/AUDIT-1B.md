# Phase 6 — AUDIT-1B (Auditor B: engineering)

Scope: pipeline, tests, API route, client bundle, rate limit, turnstile, honeypot.
Independent auditor. Did not build this phase. All claims below are backed by commands I ran.

- Repo: `/home/ascra/Downloads/opralvin-web`
- Live site under test: `http://127.0.0.1:3010` (responded `200`)
- STATE.json phase 6: `IN_AUDIT`, audit_rounds 0 (not sealed; I did not change it)
- Chrome: `/usr/bin/google-chrome` (used by the puppeteer form e2e)

## VERDICT: PASS

Zero Critical, zero Major, zero Minor. All four exit criteria proven by running code. Every A.7 command passes. No ERP credential strings reach the client bundle. No tests were weakened (the two pre-existing scripts I checked were *strengthened*). I did not seal, commit, tag, set STATE.json, weaken tests, set `OPRALVIN_SEND_ACK=1`, or call any live vendor.

## Exit criteria

| # | Criterion | Result | Evidence |
|---|---|---|---|
| 1 | E2E test submits form and asserts a CRM Lead with UTM, consent, score | PASS | `node --test packages/lead/*.test.ts` → first test asserts `doctype === "CRM Lead"`, `custom_utm_source/medium/campaign`, `custom_consent === true`, `custom_assessment_score === 3`. HTTP e2e `http-e2e.json` → `status 200`, `name "CRM-LEAD-0015"`. Form e2e (real Chrome) posts `utm_*`, `consent:true`, `assessment_score:3` and asserts `Stored`. All pass. |
| 2 | Turnstile, rate limit, honeypot reject bad requests | PASS | Unit: `turnstile reject` (403 path), `honeypot rejects`, `rate limit reject on the sixth request` all pass. HTTP e2e: honeypot → `400`, sixth request → `429`. Turnstile reject proven at the adapter/pipeline level (live secret unset → A.5 mock; see Observations). |
| 3 | Sandbox email and WhatsApp acknowledgement fire | PASS | HTTP e2e `ack.mail.sandbox === true`, `ack.whatsapp.sandbox === true` (`http-e2e.json`). Unit test asserts `result.mail.sandbox`, `result.whatsapp.sandbox`, and the body matches `/process audit/`. |
| 4 | No ERP credential reaches the browser | PASS | `pnpm bundle:check` → `client bundle has no ERP credential strings (17 files)`, exit 0. Independent `grep -rl "token " apps/web/.next/static` → no hits. Needles include `FRAPPE_API_SECRET`, `FRAPPE_API_KEY`, `FRAPPE_URL`, `token `. |

## A.7 command evidence

| Command | Result |
|---|---|
| `pnpm test` | PASS. Python: `Ran 11 tests ... OK`. Node: `tests 11 / pass 11 / fail 0`. |
| `pnpm --filter @opralvin/web build` | PASS. Exit 0; full route table printed; `/api/leads` dynamic. |
| `pnpm bundle:check` | PASS. `client bundle has no ERP credential strings (17 files)`, exit 0. |
| `node --test packages/lead/*.test.ts` | PASS. `tests 4 / pass 4 / fail 0`. |
| `node --test scripts/phase-6-e2e.mjs` | PASS (vs :3010). `tests 3 / pass 3 / fail 0`. |
| `node --test scripts/phase-6-form-e2e.mjs` | PASS (real Chrome vs :3010). `tests 1 / pass 1 / fail 0`. |

Raw counts:
- `pnpm test` Python → `Ran 11 tests in 0.000s / OK`; Node → `pass 11, fail 0`.
- lead unit → `pass 4, fail 0`.
- http e2e → `pass 3, fail 0`.
- form e2e → `pass 1, fail 0`.

## Targeted verification checklist

| Check | Result | Evidence |
|---|---|---|
| `@opralvin/lead` is a workspace dep | PASS | `apps/web/package.json`: `"@opralvin/lead": "workspace:*"`. |
| `@opralvin/lead` in `transpilePackages` | PASS | `apps/web/next.config.ts`: `transpilePackages: ["@opralvin/content", "@opralvin/lead"]`. |
| LeadForm posts `turnstile_token` when present | PASS | `LeadForm.tsx:32` `turnstile_token: String(data.get("cf-turnstile-response") ?? "") || undefined`; `lead.ts` schema accepts `turnstile_token`. |
| Score 0 is not dropped | PASS | `toCrmFields` uses direct assignment `custom_assessment_score: payload.assessment_score` (no `?? ""`). Runtime check with `assessment_score:0` → `custom_assessment_score= 0 (type number)`. LeadForm keeps `0` (`Number.isFinite(0)` → true). |
| Sandbox adapters throw if `OPRALVIN_SEND_ACK=1` | PASS (by code read; not executed per instruction) | `adapters.ts:40-42` (mail) and `:49-51` (whatsapp) both `throw new Error(...)` when `process.env.OPRALVIN_SEND_ACK === "1"`. |
| Memory rate limit 5/hour/IP | PASS | `pipeline.ts` `memoryRateLimit(windowMs = 3_600_000, max = 5)` = 1h window, 5 max; `adapters.ts` uses `memoryRateLimit()` defaults. HTTP e2e confirms 6th request → 429. |
| Python lead contract tests still 11 OK | PASS | `python3 -m unittest discover` → `Ran 11 tests ... OK` (8 `test_lead` + 3 `test_manifest`). |
| No weakened tests | PASS | `git diff`: `package.json` test script *added* `packages/lead/*.test.ts`; `check-client-bundle.mjs` *added* `FRAPPE_URL` needle. No `.skip/.only/xit/assert(true)` in any test. |

## Issues

None.

## Observations (not issues)

1. **Turnstile cannot be rejected over live HTTP in this environment** — by design, not a defect. `verifyTurnstile` returns `true` when `TURNSTILE_SECRET_KEY` is unset (A.5 mock path), so the HTTP e2e exercises the success path. The reject path is proven by the `turnstile reject` unit test. This matches A.5 ("missing keys → mock + pending live check"); it is correctly a pending live check, not a FAIL.

2. **Unreachable 503 branch in `route.ts`** — `frappeInsert` never throws `"storage-unconfigured"` (it falls back to an in-memory lead name when FRAPPE_* are unset), so the `err.message === "storage-unconfigured"` branch in `POST` is defensive dead code. Harmless; does not affect any exit criterion. Optional cleanup for a later phase.

3. **In-process memory stores** — `memoryLeads` and the memory rate limiter are module-level singletons (per server process). Correct for the sandbox/dev target on :3010 and for the Upstash-less A.5 path. Production rate limiting falls through to Upstash when `UPSTASH_REDIS_REST_URL`/`TOKEN` are set (`adapters.ts`).

4. **Bundle scan size** — the client bundle is 17 `.js/.css` files / ~976K in `apps/web/.next/static`; scan is substantive, and an independent `grep` across the entire static tree for `token ` also returned no hits.

## Constraints honored

Did not seal / commit / tag / edit STATE.json / weaken tests / spend money / message a real person / set `OPRALVIN_SEND_ACK=1` / call live Resend or WhatsApp / install on client Frappe sites. Did not disturb the Vite proto on :5173.
