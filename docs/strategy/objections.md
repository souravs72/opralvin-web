# Objections

Each reply cites a promise-ledger row, or it is labelled an assumption. These are not testimonials. Readers are `docs/STRATEGY.md` section 6 and the Phase 1 checklist. There is no API and no schema beyond this list. The user said: "Audit phase 1 strictly. If not complete or has any issue, please fix it and correct it."

1. You will import our Tally company.
Reply: no. There is no Tally company reader (L39). The mechanism is a spreadsheet import of masters, the opening-invoice tool, stock reconciliation for opening stock, and the chart-of-accounts importer (L16, L26, L28, L29). Whether that is enough for a given firm is what the Process Audit is for (L47, assumption).

2. e-Invoice and e-way bill come off the sales order.
Reply: no. The mechanism is the e-invoice action, which loads the sales invoice (L34), and the e-way action, which is attached to the delivery note, invoice, or stock documents named in L35. Neither action reads a sales order.

3. You file GSTR-3B on the GST portal for us.
Reply: no. The mechanism that is wired prepares GSTR-3B and downloads JSON or Excel (L37). The portal save, submit, and file methods have no caller outside their own class.

4. The owner can see stock, sales, and dues on a phone app.
Reply: no. The mechanism that exists is an HR phone web app and a CRM lead page. A search found no owner app for stock, sales, and receivables (L40).

5. You collect UPI.
Reply: no. The mechanism in the payment controllers does not include a UPI method (L41).

6. The hosting includes automatic backups.
Reply: no. The mechanism was searched for and not found. Automatic backups are not a product claim (L42). Hosting itself is not in this offer.

7. PF and ESI are deducted on the salary slip.
Reply: no. The mechanism that is verified prints a salary slip (L31). The PF and ESI deduction path onto that slip was not traced (L43).

8. What does it cost?
Reply: the mechanism is a day rate times the days written in the statement of work. The three paid offers use `{{STARTER_PRICE}}`, `{{GROWTH_PRICE}}`, and `{{MANAGED_PRICE}}`, each equal to `{{DAY_RATE}}` times those days. No rupee amount is set (L49, placeholder). The Process Audit is free. It has no price token.

9. Show me GST on a live company.
Reply: not until the owner names an India Compliance revision that boots on a clean company (L45). The mechanism that blocks a demo is the version check, which aborts a migrate when the compliance app's major version does not match. The files exist. A live portal demo is not offered.

10. You are the same as any other implementation shop.
Reply, labelled a recommendation, not a measured difference: the mechanism is the written scope and the written refusals, produced before any build day is sold. A packaged product sells a licence. A generic shop often sells days without that written refusal list. Whether this reason scales past a two-person team is an assumption (L47). The test is in STRATEGY section 11.

11. The free audit is a trick to start a build.
Reply: the mechanism is the audit's scope-out: no build, no data move, and no price (L47, assumption). It qualifies whether the first work is inside L01 to L38 and outside L39 to L45. The two-person capacity ceiling is an assumption. The test is to stop booking when both people are already in audits.

12. If we leave, do we keep our data?
Reply: records can be exported. The mechanism is the data export (L27). The exit term on each paid offer says the firm keeps the export. We do not keep a copy of their books after handover unless they ask in writing.
