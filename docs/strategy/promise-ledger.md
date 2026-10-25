# Promise ledger

Written 2026-10-25. A customer-facing sentence may use a row only when the label is `promise` and Verified is Y. `limit` rows are refusals. `assumption` rows are not product claims. `placeholder` rows are not prices.

Demo-able N means the file exists and a live showing is not allowed yet. The India Compliance checkout does not match the ERP major version, so every GST row stays Demo-able N until the owner names a revision that boots.

| ID | Sentence we may use | Label | Verified | Demo-able | Source row in docs/CAPABILITIES.md |
|---|---|---|---|---|---|
| L01 | We can raise a quotation. | promise | Y | Y | Sell: Quote a customer |
| L02 | We can take a sales order. | promise | Y | Y | Sell: Take a sales order |
| L03 | We can dispatch goods on a delivery note. | promise | Y | Y | Sell: Dispatch goods |
| L04 | We can raise a tax invoice. GST fields on that invoice are not a live demo. | promise | Y | Y | Sell: Raise a tax invoice. Note: GST fields are Demo-able N |
| L05 | We can record money received and match it to invoices. | promise | Y | Y | Sell: Payment Entry and Payment Reconciliation |
| L06 | We can see who owes money, and how old it is. | promise | Y | Y | Sell: Accounts Receivable |
| L07 | We can ask a supplier for a price. | promise | Y | Y | Buy: Request for Quotation |
| L08 | We can place a purchase order. | promise | Y | Y | Buy: Place a purchase order |
| L09 | We can record goods inward on a purchase receipt. | promise | Y | Y | Buy: Record goods inward |
| L10 | We can book a supplier bill. | promise | Y | Y | Buy: Book the supplier bill |
| L11 | We can see what the business owes suppliers. | promise | Y | Y | Buy: Accounts Payable |
| L12 | We can keep an item master. | promise | Y | Y | Stock: Keep an item master |
| L13 | Stock can be valued as FIFO, moving average, or LIFO. The company picks the method. | promise | Y | Y | Stock: valuation method |
| L14 | We can see stock in each godown. | promise | Y | Y | Stock: Warehouse, Bin, Stock Balance |
| L15 | We can see each inward and outward stock movement. | promise | Y | Y | Stock: Stock Entry and Stock Ledger |
| L16 | We can correct stock after a count, including opening stock. This is not a Tally import. | promise | Y | Y | Stock: Stock Reconciliation |
| L17 | We can track batches and serial numbers. | promise | Y | Y | Stock: Batch, Serial No |
| L18 | We can pick goods for a delivery. | promise | Y | Y | Stock: Pick List |
| L19 | We can add freight and other charges onto item cost. | promise | Y | Y | Stock: Landed Cost Voucher |
| L20 | We can define a bill of materials, plan production, and run a work order with a job card. | promise | Y | Y | Make: BOM, Production Plan, Work Order, Job Card |
| L21 | We can send material to a job worker and receive it back. | promise | Y | Y | Make: Subcontracting Order |
| L22 | We can start a company from an India chart-of-accounts template. This is not a Tally company file. | promise | Y | Y | Account: India chart of accounts |
| L23 | We can pass a journal and read the general ledger, trial balance, profit and loss, and balance sheet. | promise | Y | Y | Account: Journal Entry, General Ledger, trial balance, profit and loss, balance sheet |
| L24 | We can match a bank statement in the bank reconciliation tool. | promise | Y | Y | Account: Bank Reconciliation Tool |
| L25 | We can close the books for a period. | promise | Y | Y | Account: Period Closing Voucher |
| L26 | We can import customers, items, and other importable masters from a spreadsheet. | promise | Y | Y | Messages: Data Import |
| L27 | We can export records. | promise | Y | Y | Messages: Data Export |
| L28 | We can import a chart of accounts from the spreadsheet template before any ledger entries exist. | promise | Y | Y | Messages: Chart of Accounts Importer |
| L29 | We can create opening sales and purchase invoices. | promise | Y | Y | Messages: Opening Invoice Creation Tool |
| L30 | We can keep a lead with name, phone, email, organisation, source, and status, and move a deal through a pipeline. | promise | Y | Y | Customers: CRM Lead, CRM Deal |
| L31 | We can keep an employee, mark attendance, apply leave, and print a salary slip. | promise | Y | Y | Pay people: Employee, Attendance, Leave, Salary Slip |
| L32 | An HSN or SAC can be stored on an item. This is not a live GST demo. | promise | Y | N | GST: gst_hsn_code |
| L33 | A GSTIN can be checked for 15 characters and a valid check digit. The check is local. It does not prove the GSTIN is active. | promise | Y | N | GST: validate_gstin |
| L34 | An e-invoice IRN can be generated from a sales invoice, with GST settings and the e-invoice API. Not from a sales order. Not a live demo. | promise | Y | N | GST: generate_e_invoice |
| L35 | An e-way bill can be generated from a delivery note, sales invoice, purchase invoice, purchase receipt, stock entry, subcontracting order, or subcontracting receipt. Not from a quotation or a sales order. Not a live demo. | promise | Y | N | GST: generate_e_waybill |
| L36 | GSTR-1 can be prepared from the books and filed with PAN plus OTP. It is not automatic or unattended. Not a live demo. | promise | Y | N | GST: file_gstr1 |
| L37 | GSTR-3B can be prepared and downloaded as JSON or Excel. Portal save, submit, and file are not a claim. | promise | Y | N | GST: GSTR-3B prepare and download. Portal file is Verified N |
| L38 | GSTR-2B can be downloaded and matched to supplier bills when GST credentials exist. Not a live demo. | promise | Y | N | GST: download_gstr_2b |
| L39 | There is no Tally company reader. The setup wizard only stores the word Tally. | limit | N | N | Do not claim: We import Tally |
| L40 | There is no owner phone app for stock, sales, and receivables. | limit | N | N | Seeing the business: owner phone app |
| L41 | UPI collection is not a claim. | limit | N | N | Do not claim: We collect UPI |
| L42 | Automatic backups are not a product claim. | limit | N | N | Not supported: automatic cloud backups |
| L43 | PF or ESI deducted on the salary slip is not a claim. Registers exist. The deduction path was not traced. | limit | N | N | Pay people: EPF, ESIC, and LWF registers. Demo-able N |
| L44 | CRM Lead does not store UTM, consent time, assessment score, or a calculator result. | limit | N | N | Customers: those fields are Verified N |
| L45 | A live GST portal demo is not offered until the owner names an India Compliance revision that boots. | limit | Y | N | Checkout note: India Compliance 17 against ERPNext 16 |
| L46 | The first calls are a calling order, not proof of demand. | assumption |  |  | Owner must test with discovery conversations before Phase 2 |
| L47 | The free Process Audit is the primary call to action. A two-person team can only take a limited number. | assumption |  |  | Test named in STRATEGY section 9 and section 11 |
| L48 | The CA referral is compared with the audit and is not the primary path. | assumption |  |  | Test named in STRATEGY section 10 |
| L49 | Prices are unset. The tokens are not rupee amounts. | placeholder |  |  | docs/TODO_FROM_OWNER.md |
| L50 | Domain, public email, WhatsApp number, city, and booking link are unset. | placeholder |  |  | docs/TODO_FROM_OWNER.md |
| L51 | POS Invoice exists in the checkout. It is not in this offer until the owner confirms the flagship list. | limit | Y | Y | Counter billing. Excluded from the offer by the owner list |
| L52 | Projects, assets, helpdesk, and the other extra modules are not in this offer until the owner adds them. | limit | Y | Y | Also in ERPNext, not in the flagship sentence |
