# Phase 0 — Independent Strict Audit (AUDIT-2)

Fresh audit. The auditor did not build this phase and did not take the fix log's word for anything. Every exit criterion below was re-checked from scratch by running a command, a grep, a `stat`/`md5sum`, or a direct file read against live disk on 25 Oct 2026. AUDIT-1 and FIXLOG were read only to know where to look; each former issue was independently re-verified, not assumed fixed. The bench at `~/Desktop/frappe-bench` was treated as read-only; no site database was opened and no client-app source was read. Over 30 capability file paths were opened (list at the end).

Starting assumption: broken until proven otherwise.

## Criteria table

| # | Criterion | How checked | Met? |
|---|---|---|---|
| 1 | All 6 repos cloned under `~/src` | `ls ~/src`, `git -C … rev-parse`, `git … --is-inside-work-tree`, cross-checked `evidence/repos.txt` | **Yes** |
| 2 | Skills installed, no existing skill overwritten; genuine before/copy/after, inodes compared | `stat` mtimes+inodes of the 3 files, `md5sum`, `diff`, live inode match for 5 skills, copy-log vs source set | **Yes** |
| 3 | `CAPABILITIES.md` lists ≥30 outcomes, each a real file path the auditor opens | extracted 94 `apps/…` paths, `test -e` all, opened 33 via Read + 5 via content grep, verified the described behaviour | **Yes** |
| 4 | Tally/Excel migration verified or marked absent | grep for a migrator across erpnext/india_compliance/frappe, `find -iname '*tally*'`, read the setup-wizard/changelog hits, confirmed spreadsheet importers | **Yes** |
| 5 | `TODO_FROM_OWNER.md` lists client-specific apps and accounts for other app dirs | `ls apps` (33), `ls sites` (12), cross-checked every entry against the TODO off-limits + generic lists | **Yes** |
| 6 | `.build/STATE.json` exists | `Read` the file | **Yes** |

Supplementary checks requested in the task: honesty contract (PROMPT §Brand) and `web/src` copy vs `CAPABILITIES.md`/`NOT_SUPPORTED.md` — both **pass**; see below.

---

## Criterion 1 — repos

```
$ ls ~/src
figcraft  motion-graphics-skills  open-seo  paperclip  PlacesToPostYourStartup  ui-ux-pro-max-skill  WanGP
$ git -C ~/src/<r> rev-parse --short HEAD
motion-graphics-skills: 229022e   figcraft: 1070231   paperclip: 470cb34
WanGP: 9d25c60   PlacesToPostYourStartup: 1941a95   open-seo: 0ca244b
```

All six required repos exist and are real git worktrees (`git rev-parse --is-inside-work-tree` → `true` for every directory, including each required repo). Heads match `evidence/repos.txt` exactly. The extra `ui-ux-pro-max-skill` directory is also a git repo; it is not required and does no harm. **Met.**

## Criterion 2 — skills, no overwrite (AUDIT-1 P0-001 re-check)

The former Major (two same-instant byte-identical snapshots) is genuinely resolved. The three files are three distinct writes with a copy between them:

```
skills-before.txt    mtime=18:34:47.0519  inode=16282617  size=13303
skills-copy-log.txt  mtime=18:34:50.0949  inode=16282625  size=743
skills-after.txt     mtime=18:34:53.1010  inode=16282618  size=13302
skills-diff.txt      mtime=18:34:53.1260  inode=16282619  size=468
```

Internal content timestamps agree with the file mtimes and are correctly ordered: `SNAPSHOT_BEFORE 13:04:47Z` → `COPY_START/COPY_END 13:04:50Z` → `SNAPSHOT_AFTER 13:04:53Z`. The two snapshots are no longer byte-identical (`md5` differ: `c65b140d…` vs `2472c9c4…`); `diff` shows the **only** difference is the header line, i.e. every one of the 286 skill `inode mtime name` rows is unchanged across the copy:

```
$ diff skills-before.txt skills-after.txt
1c1
< SNAPSHOT_BEFORE 2026-10-25T13:04:47.049Z
---
> SNAPSHOT_AFTER 2026-10-25T13:04:53.099Z
```

Inodes in the snapshot match the live tree (no post-hoc rewrite):

```
openseo-seo-audit       live=10523287 snap=10523287 MATCH
openseo-keyword-research live=10523281 snap=10523281 MATCH
brainstorming           live=10012406 snap=10012406 MATCH
pair-agent              live=10130061 snap=10130061 MATCH
animated-chart          live=10520826 snap=10520826 MATCH
```

Live tree = 286 dirs = snapshot body count. The copy log records all 12 openseo skills as `kept` (skipped by `cp --update=none`), and that set maps 1:1 to the real source `~/src/open-seo/plugins/openseo/skills/` (12 dirs: `ai-prompt-research … seo-report`, installed with the `openseo-` prefix). So a copy really ran, it was non-destructive, and no pre-existing skill inode changed or was added/removed. **Met.**

## Criterion 3 — ≥30 capability outcomes with real, opened paths

```
$ grep -oE 'apps/[…]\.(py|js|json|txt|vue|webmanifest|md)' docs/CAPABILITIES.md | sort -u | wc -l
94
$ (test -e each under ~/Desktop/frappe-bench)   present=94 missing=0
```

94/94 referenced paths exist; the table carries far more than 30 outcome rows. I opened 33 paths with the file reader (list at end) plus 5 more by content grep, and verified the behaviour the row claims, not just presence:

- Versions, which drive the honest GST "Demo-able N": Frappe `16.18.2`, ERPNext `16.33.0`, India Compliance `17.0.0-dev`. `check_version_compatibility.py` reads `if IC_VERSION.major != app_version.major: show_error_and_exit(... raise SystemExit(1))` — 17 vs 16 aborts migrate. Matches CAPABILITIES.
- `setup_wizard.js:73` = `"Tally",` (a stored persona answer); `change_log/v12/v12_0_0.md:7` = old `[Tally Migrator](…/pull/17405)` link. Matches the "Do not claim" row.
- `e_invoice.py` operates on **Sales Invoice** (`frappe.has_permission("Sales Invoice", "submit", …)`, "Bulk generate e-Invoices for the given Sales Invoices"); `e_waybill.py` defines `generate_e_waybill` at 155. Confirms "from Sales Invoice, not the sales order".
- `taxpayer_returns.py:230` defines `file_gstr_3b(self, data, pan, evc_otp)` posting `RETFILE/EVC`; `grep -rn file_gstr_3b` returns that definition only (no external caller). Confirms the N on portal filing.
- `gstr_3b_report.py` defines `get_data` (70), `make_json` (253), `download_gstr3b_as_excel` (264). Confirms the "wired screen prepares + downloads" row.
- `validate_gstin` at `gst_india/utils/__init__.py:165`. `item.json` `valuation_method` options = `FIFO / Moving Average / LIFO`. `sales_invoice.json` has `update_stock`. `erpnext/modules.txt` = 21 modules.
- `crm_lead.json`: `grep -ci 'utm|consent|assessment_score|calculator'` = 0 → confirms the honest N on those fields.
- `razorpay_settings.py` INR at 29/135/347, `get_payment_url` at 327; `grep -ci upi` = 0 in Razorpay and Paytm controllers → confirms "no UPI claim".
- `whatsapp_message.py`: `grep -ci 'opt.?in|consent'` = 0 → confirms "opt-in not implemented in this file".
- HRMS has no own `doctype/employee`; `india_payroll/.../doctype/` holds only `__init__.py`/`__pycache__` → confirms both hedges.

**Met.**

## Criterion 4 — Tally/Excel migration

Marked **absent**, and the absence is real:

```
$ grep -rilE 'tally' apps/erpnext apps/india_compliance apps/frappe --include=*.py --include=*.json
apps/india_compliance/.../gst_india/data/hsn_codes.json   # "…CALCULATED ON A TOTALLY DEFATTED BASIS…" (substring of "totally")
apps/frappe/.../search/sqlite_search.py                   # "incrementally" (substring), not Tally
$ find apps -type d -iname '*tally*'    # (no output)
```

No Tally-migrator doctype or module anywhere. The only literal "Tally" hits are the persona answer and the v12 historical link (both already caveated). The spreadsheet-migration tooling that CAPABILITIES offers instead is present and verified: Data Import (`data_import.json`), Chart of Accounts Importer (`chart_of_accounts_importer.py`, imports `read_xls/xlsx_file`), Opening Invoice Creation Tool (`opening_invoice_creation_tool.py`), Stock Reconciliation (`stock_reconciliation.json`, "update or fix the quantity and valuation of stock"). `NOT_SUPPORTED.md` and the CAPABILITIES "Do not claim" row both state the Tally reader is absent. **Met.**

## Criterion 5 — client-app list and full app accounting

33 app directories on the bench; every one is accounted for:

- **20 client/third-party apps** — all present in the TODO off-limits list: `agency_billing, ascra_logistics, ascra_theme_2, clapgrow_app, clapgrow_workflow, commit, contract_management, erp_pos, huf, idp, jarvis, mcx_helpdesk, mcx_hrms, mcx_learning_ai, pos_next, taxmate, telephony, ucl_chemist, unicom_chemist, vsd_fleet_ms`.
- **12 product-stack apps** (named in CAPABILITIES, correctly omitted from the client list): `frappe, erpnext, crm, hrms, india_compliance, india_payroll, insights, payments, helpdesk, lms, raven, frappe_whatsapp`.
- **1 generic app** `wiki` — now explicitly recorded in TODO under "Other apps on the bench, not client work" (this was AUDIT-1 P0-004; re-verified fixed).

20 + 12 + 1 = 33 = `ls apps` count. The 12 off-limits site directories in the TODO (`agency-billing.localhost … tutorial.site`) match `ls sites` exactly (excluding `apps.json`/`currentsite.txt`). **Met.**

## Criterion 6 — STATE.json

Exists; valid JSON; `current_phase: 0`; phase 0 `status:"IN_AUDIT"` (valid per PROMPT §A.2) with `open_issues: []`; `owner_todos` populated with the 8 real gate decisions. **Met.**

## Supplementary — honesty contract and web/src (AUDIT-1 P0-002 re-check)

Phase-0 deliverables invent nothing: prices are `{{…_PRICE}}` tokens, public email/WhatsApp/city/booking are `{{…}}` tokens, testimonials/logos/metrics/case studies are empty, every capability row is tied to a file that exists.

The `web/src` Vite prototype was re-read in full (`data.js`, `sections/Sections.jsx`, `Story.jsx`). Every claim that `NOT_SUPPORTED.md` or the CAPABILITIES "Do not claim" table forbids has been scrubbed or negated:

| Forbidden claim | Current prototype text | OK? |
|---|---|---|
| e-invoice/e-way bill "from the order" | "An e-invoice comes from the sales invoice, not the sales order"; Docs intro "An e-invoice is not generated from the sales order" | Yes |
| Tally/desktop company reader | "There is no reader for a desktop company file" | Yes |
| Automatic cloud backups as a feature | "Hosting and automatic backups are not a product claim in this checkout" | Yes |
| Flat "Yes" on GST | "This checkout cannot show a live GST portal demo" | Yes |
| Owner phone app / UPI / GSTR-3B portal filing | not claimed anywhere in `web/src` | Yes |
| Invented client/metric | fictional "Example Traders"/"Your Company"; footer "Sample names and figures on this page are illustrative"; invoice total ₹59,000 is an internally-consistent illustrative figure (10×₹5,000 + CGST/SGST) labelled "Illustrative layout / Not a live GST document" | Yes |

`grep -rn '@opralvin'` in `web/src` returns only `CONTACT = "{{PUBLIC_EMAIL}}"` — the real-email concern from the gate is tokenised. No forbidden claim remains live.

Two non-blocking observations (recorded for transparency; neither is a forbidden claim and neither is fake):

- The "routine" panel says reminders/low-stock/morning-report "go out on their own, on your schedule" / "Sent today, automatically". This is **not** on the ban list and is in fact supportable by features that exist on this bench but were not inventoried in CAPABILITIES: `frappe/.../email/doctype/notification`, `auto_email_report`, ERPNext `email_digest`, and `accounts/doctype/dunning` (payment reminders). The reminder document itself is hedged ("Not a claim that messages send themselves"), which correctly covers the one gap (WhatsApp opt-in is not stored). Not an issue; noted as an inventory-coverage gap for Phase 4 to formalise.
- The prototype lists Projects and POS as departments. Both are **Verified Y / Demo-able Y** in CAPABILITIES; the only open question is the brand/flagship-sentence scope decision, which is already tracked as owner TODO items #3 and #5 and is placeholder-acceptable under PROMPT §A.5. Not a false capability claim.

## AUDIT-1 issue re-check (independent, not trusting FIXLOG)

- **P0-001 (Major)** — RESOLVED. Snapshots are now three distinct timed writes with the copy log between; `diff` shows only the header line changed; live inodes match the snapshot; copy log maps 1:1 to the real `open-seo` source skill set.
- **P0-002 (Minor)** — RESOLVED. All forbidden claims scrubbed/negated; illustrative figures labelled and disclaimed; email tokenised.
- **P0-003 (Minor)** — RESOLVED. `skills-diff-note.txt` is gone; the evidence dir holds exactly the 5 files the PLAN now lists (`repos.txt, skills-before.txt, skills-copy-log.txt, skills-after.txt, skills-diff.txt`).
- **P0-004 (Minor)** — RESOLVED. `wiki` is now named in TODO as a reviewed generic app; all 33 bench apps reconcile.

## Capability file paths opened (record)

Opened with the file reader (33): `quotation.json`, `sales_order.json`, `delivery_note.json`, `sales_invoice.json`, `payment_entry.json`, `accounts_receivable.json`, `request_for_quotation.json`, `purchase_order.json`, `purchase_receipt.json`, `purchase_invoice.json`, `warehouse.json`, `stock_reconciliation.json`, `bom.json`, `work_order.json`, `journal_entry.json`, `general_ledger.json`, `bank_reconciliation_tool.json`, `gst_india/utils/e_invoice.py`, `gst_india/utils/e_waybill.py`, `gst_india/api_classes/taxpayer_returns.py`, `patches/check_version_compatibility.py`, `crm_lead.json`, `pos_invoice.json`, `crm/frontend/src/pages/MobileLead.vue`, `salary_slip.json`, `erpnext/.../employee.json`, `frappe/.../data_import.json`, `chart_of_accounts_importer.py`, `razorpay_settings.py`, `whatsapp_message.py`, `gstr_3b_report.py`, `opening_invoice_creation_tool.py`, `insights_workbook.json`.

Additionally inspected by content grep/sed (5): `erpnext/.../item/item.json`, `erpnext/public/js/setup_wizard.js`, `change_log/v12/v12_0_0.md`, `erpnext/modules.txt`, `gst_india/utils/__init__.py`. Existence confirmed by `test -e` for all 94 referenced paths (0 missing).

## Verdict

**PASS** — all 6 exit criteria met with pasted, re-run evidence; zero Critical, zero Major, zero Minor issues. All four AUDIT-1 issues independently re-verified as genuinely fixed (not taken on the fix log's word). The honesty contract holds and no `web/src` prototype copy makes a claim that `CAPABILITIES.md` or `NOT_SUPPORTED.md` forbids.
