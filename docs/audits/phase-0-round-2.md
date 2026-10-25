# Phase 0 audit round 2

Recorded from the independent auditor on 2026-10-25. Findings were not softened.

Nothing in the app imports this file. `docs/audits/` had no round-2 report. It stores no data records and calls no API. The runner says: "AUDIT → docs/audits/phase-{N}-round-{R}.md".

## Verdict

**FAIL** — BLOCKER: 1 · MAJOR: 0 · MINOR: 2

## Item table

| Item | Result | Severity | Evidence |
|---|---|---|---|
| 0.1–0.15 | PASS | | Re-run by the auditor. 93 Verified=Y path tokens existed. Versions matched. |
| 0.16 | FAIL | BLOCKER | Payments text said Stripe and Paymob only. `razorpay_settings` and other gateways are on disk. |
| 0.17–0.21 | PASS | | Off-limits list, no client leak, no stack names in `web/`, README present, TODO unknowns present. |

## Findings

### P0-R2-F01 · 0.16 · BLOCKER

`docs/CAPABILITIES.md` and `docs/NOT_SUPPORTED.md` said the Payments app was Stripe and Paymob only and that Razorpay was absent. `ls apps/payments/payments/payment_gateways/doctype/` includes `razorpay_settings`, `paytm_settings`, `paypal_settings`, `braintree_settings`, `gocardless_settings`, and `mpesa_settings`. `razorpay_settings.py` is a controller with INR as a currency.

Smallest fix from the auditor: name the gateways that exist, keep Demo-able N, and stop saying Razorpay is missing.

### P0-R2-F02 · 0.5 · MINOR

Star count in `ENVIRONMENT.md` was 140040. A later `gh api` read the same day returned a higher number. URL, owner, license, and commit still matched.

### P0-R2-F03 · 0.20 · MINOR

README said Opralvin Technologies and did not name the product Opralvin One.

## 0.16 note

The auditor found no row that over-promises a capability. The Payments note was a false negative.
