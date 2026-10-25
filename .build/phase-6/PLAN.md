# Phase 6 plan

Readers: Phase 6 auditors. User: Continue.

Phase 5 sealed `9996f86` tag `phase-5-passed`. Dual auditors.

## Scope

End-to-end lead path. A test submits the process-audit form and asserts a lead with UTM, consent, and score. Turnstile, rate limit, and honeypot reject bad requests. Sandbox email and WhatsApp acknowledgement fire, or mock when keys are unset (A.5). No ERP credential in the client bundle.

Do not spend on Turnstile, Resend, Upstash, or WhatsApp. Mock those adapters. Do not install on client sites.

## Exit criteria (copied from §A.4)

1. An end-to-end test submits the form and asserts a CRM Lead with UTM, consent, and score.
2. Turnstile, rate limit, and honeypot reject bad requests.
3. Sandbox email and WhatsApp acknowledgement fire.
4. No ERP credential reaches the browser.

## Files

`apps/web` route hardening, `apps/frappe-site` lead tests, mock mail/WhatsApp, Playwright or fetch e2e against a test insert, `.build/phase-6/evidence/`.
