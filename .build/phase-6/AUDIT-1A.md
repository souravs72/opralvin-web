# Phase 6 — Independent Strict Audit (AUDIT-1A)

**Auditor role:** Auditor A — honesty, privacy, no live send. Fresh auditor; did not build this phase.
**Date:** 25 Oct 2026. **Live site:** Next production at `http://127.0.0.1:3010` (confirmed up). Vite proto on `:5173` left untouched (probed read-only, still `200`).
**Method:** Every criterion checked by running a command, a grep, or a file read against disk and the running server. No seal, no commit, no tag, no STATE.json change, no test weakened, no money spent, no real person messaged. `OPRALVIN_SEND_ACK=1` was **not** set (verified refusal by code inspection, per instruction).

GateGuard note: this Write targets `.build/phase-6/AUDIT-1A.md`. No code calls it; it is a terminal audit artifact consumed by the audit loop (PROMPT.md §A.1). No API, no schema beyond `.build/STATE.json` (unmodified). The user instruction is "continue" the autonomous loop.

---

## Verdict

**PASS** — zero Critical, zero Major, zero Minor issues.

All four Phase 6 exit criteria are proven with pasted command output. The code cannot send a live email or WhatsApp (no live API path exists; adapters are sandbox-only and additionally refuse `OPRALVIN_SEND_ACK=1`). No ERP credential reaches the client bundle. Customer-facing copy invents no clients, metrics, or prices. The only outstanding items are the deliberately-unset live keys (Turnstile / Resend / Upstash / WhatsApp / Frappe), which A.5 says must **not** cause a FAIL; they are logged as owner_todos with mock coverage in place.

---

## Criteria table

| # | Criterion | How checked (command) | Evidence | Met? |
|---|---|---|---|---|
| 1 | An e2e test submits the form and asserts a CRM Lead with UTM, consent, and score | `pnpm test`; `node --test scripts/phase-6-e2e.mjs`; `node --test scripts/phase-6-form-e2e.mjs`; read `custom_field.json` | `pnpm test` → 11 Python + 11 node tests, **0 fail**. Browser form-e2e (puppeteer, real Chrome `/usr/bin/google-chrome` against `:3010`) → `status 200`, `name ~ /^CRM-LEAD-/`, posted `utm_source=google utm_medium=cpc utm_campaign=audit consent=true assessment_score=3`, status text "Stored". Pipeline unit test asserts the **stored** `CrmFields` carry `custom_utm_source/medium/campaign`, `custom_consent=true`, `custom_assessment_score=3`. Fixture `custom_field.json` defines all 9 custom fields on `CRM Lead` (UTM×3, landing_page, segment, assessment_score Int, calculator_result JSON, consent Check, consent_purpose). | **Yes** |
| 2 | Turnstile, rate limit, and honeypot reject bad requests | Live `curl` to `:3010`; `node --test scripts/phase-6-e2e.mjs`; `pipeline.test.ts` | **Honeypot** live → `400` (`company_website` set). **Rate limit** live → `req1..5 = 200`, `req6 = 429`. **Turnstile** rejection proven by unit test `turnstile reject` (mock `verifyTurnstile=false` → `PipelineError code turnstile`); code fails closed when the secret is set and token missing (`adapters.ts:7-8` `if(!token) return false`). Live Cloudflare call pending (key unset — A.5, not a FAIL). | **Yes** (turnstile live pending per A.5) |
| 3 | Sandbox email and WhatsApp acknowledgement fire | Live `curl` POST; evidence JSON; read `adapters.ts` | Live POST returned `ack.mail.sandbox=true`, `ack.whatsapp.sandbox=true` (id `sandbox-mail-…`, `sandbox-wa-…`). Evidence files `http-e2e.json` and `form-e2e.json` both show `sandbox:true`. `adapters.ts` mail/whatsapp have **no** Resend/WhatsApp network call at all — they only `console.info({sandbox:true})` and return. No live send is reachable from code. | **Yes** |
| 4 | No ERP credential reaches the browser | `pnpm --filter @opralvin/web build`; `pnpm bundle:check`; grep `.next/static`; grep client components; `curl` HTML | Build succeeded (38 routes). `bundle:check` → "client bundle has no ERP credential strings (17 files)". Grep of `.next/static` for `FRAPPE_URL/FRAPPE_API/RESEND_API/UPSTASH_REDIS_REST_TOKEN/TURNSTILE_SECRET` → **none**; literal `token ` → **none**; `challenges.cloudflare.com/upstash/resend.com` hosts → **none**. No client component references a server env var. `/process-audit` HTML grep for `frappe/api_secret/token/resend/upstash` → **empty**. Live `POST /api/leads` response contains only `{name, ack}` — no credentials. | **Yes** |

---

## Requested specific checks

| Check | Evidence | Result |
|---|---|---|
| `POST /api/leads` JSON + HTML `/process-audit` never include `FRAPPE_URL/KEY/SECRET` | Live POST body = `{"name":"CRM-LEAD-0022","ack":{...sandbox:true}}`; HTML grep empty; bundle grep empty | Pass |
| Acks are `sandbox:true` and do not call Resend/WhatsApp when keys unset | `adapters.ts` mail/whatsapp contain no outbound API call on any path; live + evidence show `sandbox:true` | Pass |
| `OPRALVIN_SEND_ACK=1` is refused | `adapters.ts:40-42` (mail) and `:49-51` (whatsapp) `throw` when env `=== "1"`. `.env.example` leaves it commented (`# OPRALVIN_SEND_ACK=`) with a "Never set" warning. Flag was **not** set by the auditor; verified statically. | Pass |
| No invented real-person CRM names beyond test fixtures | `Asha`/`Sample Traders` appear only in tests/scripts and the explicitly-"Illustrative challan. Not a live document." hero demo. No testimonial/logo/client claim. | Pass |
| Placeholders stay tokens | `{{BOOKING_LINK}}`, `{{DAY_RATE}}`, `{{WHATSAPP_NUMBER}}`, `{{PUBLIC_EMAIL}}` render as tokens; no invented values. | Pass |
| Memory CRM insert is an A.5 mock, not a live ERP, and not shown publicly as a live Frappe install | `route.ts:12-16` memory fallback logs `{crm:"memory",sandbox:true}` and returns a synthetic `CRM-LEAD-NNNN`; nothing in customer-facing copy claims a live Frappe/ERPNext install (no `frappe/erpnext` in rendered pages). | Pass |
| No stubs / TODOs in Phase 6 code | grep `TODO|FIXME|XXX|STUB` across `apps/web/src`, `packages/lead`, `scripts/phase-6-*`, `apps/frappe-site` → **none** | Pass |
| Secret scan | `pnpm secrets` → "secret scan passed on 381 files" | Pass |
| Banned-word / stack-name lint | `pnpm lint:copy` → "banned-word lint passed. 29 unique titles." No `Frappe/ERPNext` in customer copy; `Tally` appears only in honest "no Tally reader" disclaimers. | Pass |

### Evidence transcript (key commands)

```
$ pnpm test
… Ran 11 tests … OK   (python)
ℹ tests 11  ℹ pass 11  ℹ fail 0   (node: content + lead)

$ pnpm --filter @opralvin/web build
✓ Compiled successfully … Finished TypeScript … 38 routes

$ pnpm bundle:check
client bundle has no ERP credential strings (17 files)

$ pnpm secrets
secret scan passed on 381 files

$ node --test scripts/phase-6-e2e.mjs
✔ http e2e: CRM Lead with UTM, consent, score, and sandbox ack
✔ http: honeypot rejects
✔ http: rate limit rejects the sixth request   (pass 3 / fail 0)

$ node --test scripts/phase-6-form-e2e.mjs
✔ html form submit becomes a CRM Lead with UTM, consent, score, and sandbox ack   (pass 1 / fail 0)

# live server probes
POST /api/leads (valid)      -> 200 {"name":"CRM-LEAD-0022","ack":{"mail":{"sandbox":true},"whatsapp":{"sandbox":true}}}
POST /api/leads (honeypot)   -> 400
POST /api/leads (no consent) -> 400
rate limit req1..6           -> 200 200 200 200 200 429
/process-audit HTML secret grep -> (empty)
.next/static FRAPPE/token/resend/upstash grep -> (empty)
```

---

## Issue list

**None.** Zero Critical, zero Major, zero Minor.

---

## Placeholders / owner_todos (pending, not failures — A.5)

These keys are unset on purpose; mock adapters are in place and the live checks are correctly pending:

- **Turnstile** (`TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`): unset → `verifyTurnstile` mock-passes; live Cloudflare siteverify pending. Owner to supply keys to prove live rejection.
- **Upstash** (`UPSTASH_REDIS_REST_URL/TOKEN`): unset → in-memory rate limiter (per-process, resets on restart). Owner to supply for distributed limiting.
- **Resend** (`RESEND_API_KEY`) / **WhatsApp**: unset, and there is **no live send path** in code. When the owner later enables live acks they must add a guarded live adapter; today everything is sandbox.
- **Frappe** (`FRAPPE_URL/API_KEY/API_SECRET`, `OPRALVIN_ALLOWED_ORIGINS`): unset → in-memory CRM mock. Live insert against a non-client Frappe Cloud site pending owner credentials.
- Existing booking/day-rate/WhatsApp/email/number placeholders remain `{{…}}` tokens.

---

## Observations (not issues)

1. **Defense in depth on the honeypot.** The field is rejected in three places: the Zod `.refine(!company_website)` (web), `toCrmFields` (`PipelineError honeypot`), and the Python `validate_payload`. Good redundancy.
2. **`OPRALVIN_SEND_ACK=1` is a tripwire, not a switch.** Setting it does not enable live send — it throws. Combined with the absence of any live Resend/WhatsApp call, live acknowledgement is impossible without a deliberate code change. This exceeds the no-live-send bar.
3. **Turnstile fails open only while the secret is unset** (A.5 mock state) and fails closed as soon as the secret is present (`if(!token) return false`). Correct posture for the current pending state.
4. **`Sample Traders` in `HeroChallan.tsx`** is explicitly labelled "Illustrative challan. Not a live document." and is a Phase-5 product-demo widget, not a client claim. Honest; out of Phase 6 scope.
5. **Frappe `capture_lead` is `whitelist(allow_guest=False)` plus an origin allow-list** — not guest-reachable, and the Next route only calls it with the server-held API key. Credential never crosses to the client.
6. The web→Frappe forward body carries all of UTM, consent, segment, assessment_score, **and** calculator_result (`route.ts:35-41`), matching the `custom_field.json` fixture — no silent field drop on the live path.

---

## Scope / safety confirmations

- Did **not** seal, commit, tag, or modify `STATE.json` (still `IN_AUDIT`).
- Did **not** set `OPRALVIN_SEND_ACK=1`, call live Resend/WhatsApp/Cloudflare/Upstash, or install on any Frappe site.
- Did **not** disrupt the Vite proto on `:5173`.
- No test was weakened; the suite was run as-is.
