# Phase 1 — Audit 1

Auditor: fresh strict auditor. Did not build this phase. Posture: assume broken until evidence proves otherwise. No paid API called. No site database or client-app source opened. `docs/SPEND.md` stays at INR 0.

**Verdict: PASS** — zero Critical, zero Major, zero Minor. Every exit criterion was checked by running something and the evidence is pasted below.

Method: file reads, `grep`/`awk`/`wc` counts, and live read-only re-fetch of every competitor and regulatory URL in `docs/STRATEGY.md` §12 (no credentials, no spend).

---

## Exit criterion 1 — STRATEGY.md has all 6 sections

Required names: ICP matrix, Competitive frame, Messaging house, Offer architecture, Keyword and question map, KPIs.

Command and output (`grep -nE '^## ' docs/STRATEGY.md`):

```
7:## 1. Executive summary
17:## 2. ICP matrix
38:## 3. Competitive frame
62:## 4. Positioning statement
68:## 5. Messaging house
78:## 6. Objections
82:## 7. Offer architecture
140:## 8. Keyword and question map
146:## 9. KPIs
160:## 10. 90-day go-to-market
172:## 11. Risks
184:## 12. Sources
```

All six required sections are present as literal headings: `2. ICP matrix`, `3. Competitive frame`, `5. Messaging house`, `7. Offer architecture`, `8. Keyword and question map`, `9. KPIs`. The ICP matrix numbers reconcile against `docs/strategy/icp-scoring.csv` (Trading 5+4+3+3=15, Light mfg 4+4+3+3=14, Service 3+4+3+4=14, Multi-branch retail 4+4+2+3=13, Pharmacy 4+3+2+2=11, Logistics 4+3+2+2=11 — all match the table), and the highest total (Trading, 15) is the stated beachhead. **PASS.**

---

## Exit criterion 2 — Every competitor fact has a source link; re-fetched figures match

`docs/strategy/competitors.csv` has 9 rows. 8 real competitors each carry a `source_url`; the 9th ("Local custom vendor") has `source=none` and states **no numeric or competitive fact** ("Price not stated. There is no public page for an unnamed shop"; "No firm is named"). A row that asserts no figure needs no source link, so this is not a missing-source violation.

Every URL in §12 was re-fetched live today (2026-10-25). Comparison:

| Source | Pack claim | Re-fetched page | Match? |
|---|---|---|---|
| tallysolutions.com/buy-tally | Silver lifetime ₹22,500; Gold lifetime ₹67,500; Silver rental ₹750/mo; Gold rental ₹2,250/mo; +18% GST | Silver ₹22,500, Gold ₹67,500, Silver ₹750, Gold ₹2,250, all "+18% GST" | yes, exact |
| zoho.com/in/books/pricing | Free plan while FY revenue ≤ 25 lakh; Standard ₹749, Professional ₹1,499, Premium ₹2,999 (annual); Elite ₹4,999; Ultimate no rupee figure; GST not stated | ₹749 / ₹1,499 / ₹2,999 billed annually, Elite ₹4,999, Ultimate shows no price, free plan "does not exceed the threshold of 25 lakhs", no GST line | yes, exact |
| busy.in/pricing | Basic ₹11,000, Standard ₹16,500, Enterprise ₹22,000; Magic ₹5,000/₹8,000/₹12,000/₹50,000 per 360 days; excl GST | Basic ₹11,000, Standard ₹16,500, Enterprise ₹22,000; START ₹5,000, SMART ₹8,000, POWER ₹12,000, POWER+ ₹50,000 /360 days; "Prices exclude GST" | yes, exact |
| margcompusoft.com/marg-price-list | Nano ₹5,550, Basic ₹10,300, Silver ₹13,900, Gold ₹26,000; 18% GST extra | Nano ₹5,550, Basic ₹10,300, Silver ₹13,900, Gold ₹26,000, "18% GST Extra" | yes, exact |
| vyaparapp.in/pricing-detail | ₹242/month; struck ₹350; asterisk unexplained; GST not stated | "Buy Now @ 242/Month*", struck ₹350, asterisk present, no GST line | yes, exact |
| zoho.com/in/inventory/pricing | India URL returned USD, marked US-region; no INR recorded | Prices in USD ($29/$79/$129/$249), "Offer valid only for new customers in the US region", no INR | yes, exact |
| sap.com/.../business-one | Price not stated | Page describes one ERP system; no public price listed | yes, exact |
| odoo.com/pricing | One App Free; Standard US$31.10/user/mo; Custom US$61.00/user/mo; implementation not included; GST not stated | One App Free, Standard US$31.10, Custom US$61.00, "Implementation service … not included", no GST line | yes, exact |
| einvoice1.gst.gov.in/Others/EinvEnabled | AATO table 500 Cr -> 01-10-2020 … <5 Cr OPTIONAL; enablement is facilitation; obligation is Rule 48(4) | Identical AATO/date table; "only for facilitation purpose"; "legal obligation … Rule 48(4)" | yes, exact |
| einvoice1.gst.gov.in/Documents/advisory270325.pdf | From 01-04-2025, AATO >= 10 Cr cannot report e-invoices older than 30 days; < 10 Cr no restriction | Advisory text states exactly this (paras 2 and 5) | yes, exact |
| docs.ewaybillgst.gov.in FAQ | Movement of goods exceeding ₹50,000; intra-state thresholds can differ by state | FAQ: "value exceeding fifty thousand rupees"; intra-state threshold "refer to the relevant statute/provisions passed by the respective States" | yes, exact |
| meity.gov.in …/DPDP-Act-2023.pdf | Act 22 of 2023, 11 Aug 2023; §1(2) in force on notified date, different dates for different provisions | Title "No. 22 of 2023", "[11th August, 2023]", §1(2) verbatim | yes, exact |

Every re-fetchable figure matches the pack exactly. No competitor fact is unsourced, and no invented figure was found. **PASS.**

---

## Exit criterion 3 — >= 40 keywords with volume/difficulty from OpenSEO, or each marked "unverified — no API key"

Row count (`tail -n +2 docs/strategy/keywords.csv | sed '/^$/d' | wc -l`): **40**.

Marks check (`awk` flagging any row whose volume or difficulty is not exactly `unverified — no API key`): **no rows returned** — i.e. all 80 cells (40 volume + 40 difficulty) read `unverified — no API key`. STRATEGY §8 states the same and explicitly says "That is not a search count." This is the compliant placeholder branch of the criterion (there is no DataForSEO key; an owner_todo tracks it). No invented volume or difficulty appears anywhere. Each keyword also maps to one of the 9 proposed paths, which match §8. **PASS.**

---

## Exit criterion 4 — Each objection has an answer that names a mechanism

`docs/strategy/objections.md` numbered-objection count (`grep -cE '^[0-9]+\. '`): **12**.

Replies missing the word "mechanism" (`awk '/^Reply:/{if ($0 !~ /mechanism/) print}'`): **none**. Each of the 12 replies names a concrete mechanism, e.g. #1 spreadsheet import + opening-invoice tool + stock reconciliation + CoA importer (L16/L26/L28/L29); #2 the e-invoice action loads the sales invoice (L34); #3 the wired screen downloads JSON/Excel (L37); #9 the version check aborts a migrate (L45); #12 Data Export (L27). Every reply cites a ledger row or is labelled an assumption. **PASS.**

---

## Exit criterion 5 — No claim exceeds CAPABILITIES.md

`docs/strategy/promise-ledger.md` rows L01–L38 are all `promise` with Verified Y and map to a named CAPABILITIES row; the demo-N GST rows (L32–L38, and the GST-field note on L04) carry the "not a live demo" limit, matching CAPABILITIES which marks those Demo-able N. L39–L45 are `limit` refusals that correspond one-to-one with the `docs/NOT_SUPPORTED.md` ban list (Tally reader; e-invoice/e-way from sales order; GSTR-3B portal filing; owner phone app; UPI; CRM UTM/consent/score fields; automatic backups; PF/ESI on slip). L46–L50 are assumptions/placeholders.

Cross-checks run:
- NOT_SUPPORTED items appear in customer docs only as refusals, never as promises (`grep` of BRIEF.md and STRATEGY.md returns the "We will not say…" / "Do not say:" / scope-out ban-list lines only).
- No rupee figure substitutes a price token anywhere in the offers: prices use `{{STARTER_PRICE}}`, `{{GROWTH_PRICE}}`, `{{MANAGED_PRICE}}`, `{{DAY_RATE}}`, `{{CA_FEE}}` (BRIEF.md rupee/lakh/cr grep: NONE). KPIs §9 explicitly refuses to set a target percentage "because a target percentage would be an invented metric."
- ICP scores and the ₹2 Cr–₹200 Cr band are labelled assumptions / the owner's brief, "not a measured market", so they are not invented metrics.

No claim exceeds the ceiling. **PASS.**

---

## Additional constraint — BRIEF.md: no stack name, no banned words

`docs/strategy/BRIEF.md` is the customer-facing sample set.

- Stack names (`grep -niE 'erpnext|frappe' docs/strategy/BRIEF.md`): **NONE FOUND**. (The only `ERPNext` hits in `docs/strategy/` are inside the internal `promise-ledger.md` source column, which is allowed — the ledger is internal, not customer-facing.)
- Banned words Unlock / Elevate / Seamless / Supercharge / Revolutionise / Empower / Cutting-edge / Next-gen / Game-changer (`grep -niE` over BRIEF.md): **NONE FOUND**. (Also clean across STRATEGY.md.)

Note: the words "empowered" / "Seamlessly" / "next-level" that appear in the re-fetched competitor pages are those vendors' own marketing copy, not Opralvin's, and are irrelevant to this check. **PASS.**

---

## Honesty contract (PROMPT.md)

- No invented clients, logos, testimonials, awards: none present; the pack repeatedly refuses them ("no other firm's name"; "naming one would invent a competitor").
- No invented metrics or keyword volumes: all keyword cells are `unverified — no API key`; no target rates set.
- No invented prices: all prices are tokens; the only rupee figures are sourced competitor prices, each re-verified above.
- Claim ceiling respected; NOT_SUPPORTED never promised.

Compliant.

---

## Observations (not issues, no action required)

1. The keyword set sits exactly at the floor (40 of a required >= 40). Compliant, but there is no margin — if any row is later removed it will drop below the threshold.
2. `competitors.csv` "Local custom vendor" intentionally has `source=none`; correct because the row asserts no figure, but a future reader should not mistake it for a dropped source.

## Evidence that could not be independently re-run by this auditor

None. All 12 §12 URLs (including both PDFs) were re-fetched and compared. No credential-gated or paid lookup was needed or performed.

---

### Decision

All five exit criteria plus the BRIEF.md constraint and the PROMPT.md honesty contract pass with pasted evidence. Zero Critical, zero Major, zero Minor. **Verdict: PASS.** Recommend sealing Phase 1 as `PASSED_WITH_PLACEHOLDERS`, since prices and the DataForSEO key remain correctly-marked `{{PLACEHOLDER}}` tokens in `owner_todos`.
