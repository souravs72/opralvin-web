# Not supported in this checkout

Marketing must not promise these. Each line is something we looked for and did not find as a claimable feature. Paths are in `docs/CAPABILITIES.md`.

| Claim | Status |
|---|---|
| A Tally migrator that reads a Tally company and loads it | Not in this version. Spreadsheet import, opening invoices, opening stock, and a chart-of-accounts template exist. The setup wizard only stores the word Tally as the answer to what the business uses today. |
| e-Invoice or e-way bill generated from a sales order | e-Invoice is generated from Sales Invoice. e-Way bill is attached to delivery, invoice, and stock documents. |
| Filing GSTR-3B on the GST portal from the product | The screen prepares the return and downloads JSON or Excel. The portal file, save, and submit methods have no caller outside their own class. |
| An owner phone app for stock, sales, and receivables | Not found. The phone surfaces that exist are the HR web app and a CRM lead page. |
| A verified UPI flow | Razorpay and Paytm controllers exist and need credentials. No UPI method was found in those files, so UPI itself is not a claim. |
| UTM, consent time, assessment score, or calculator result already stored on a CRM Lead | Those fields are not on the DocType. |
| Automatic cloud backups as a product feature | Not in the code reviewed for the inventory. |
| PF or ESI deducted on the salary slip | EPF, ESIC, and LWF report files exist. The deduction path was not traced. |
