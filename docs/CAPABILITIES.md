# Opralvin One — capability inventory

Phase 0 ground truth. Read on 25 October 2026 from the native bench at `~/Desktop/frappe-bench`. No site database was opened. No screen was clicked. A row is verified when the named file is in this checkout and implements the outcome.

Marketing may claim a row only when **Verified** is Y. A screenshot, live demo, or “watch it file” claim also needs **Demo-able** Y.

## How to read the table

| Column | Meaning |
|---|---|
| Verified | Y = this checkout contains the file and the behaviour described. N = searched, not found. |
| Demo-able | Y = a person can show the outcome with a fictional company and no government, WhatsApp, or payment credential. N = the useful action needs a credential, the tool is absent, or this pass did not find a wired user action. |
| Notes | The limit on the sentence we are allowed to write. |

Demo-able Y means the screen exists in code. It does not mean this pass launched the bench.

## Checkout

| App | Version in code | Git |
|---|---|---|
| Frappe | 16.18.2 | `version-16` @ `e61c3950fa` |
| ERPNext | 16.33.0 | `version-16` @ `b24c9eba55` |
| India Compliance | 17.0.0-dev | `develop` @ `a01f0ce9` |
| HRMS | 16.12.1 | `version-16` @ `2b0697ba8` |
| Frappe CRM | 2.0.0-dev | `develop` @ `38930940` |
| Helpdesk | untagged develop | `4e1150211` |
| Insights | untagged develop | `9b50f1b3` |
| Raven | untagged develop | `3836cc4` |
| Frappe WhatsApp | untagged master | `08bc1f6` |
| Payments | untagged version-16 | `3cebd94` |
| LMS | untagged develop | `3c86c570` |
| India Payroll | Frappe app, present | reports listed below |

India Compliance declares itself incompatible with a different major version of Frappe or ERPNext (`apps/india_compliance/india_compliance/patches/check_version_compatibility.py`). This checkout is India Compliance 17 against Frappe 16.18.2 and ERPNext 16.33.0. A migrate of this pair is written to abort. Every India Compliance row below is **Verified Y** for the source file and **Demo-able N** until a v16-compatible revision is installed and a clean company is clicked through.

Customer-facing pages do not name the underlying stack. This file does, because it is internal.

## Do not claim these

| Sentence that is tempting | Why it is not allowed yet |
|---|---|
| We import Tally. | No Tally migrator file in Frappe, ERPNext, or India Compliance. The setup wizard stores the choice “Tally” at `apps/erpnext/erpnext/public/js/setup_wizard.js` line 73. A v12 changelog mentions an old migrator at `apps/erpnext/erpnext/change_log/v12/v12_0_0.md` line 7. A search also hits the word inside a bundled banking script and inside `node_modules`. Those are not importers. |
| e-Invoice and e-way bill are generated from the sales order. | e-Invoice is generated from **Sales Invoice** (`generate_e_invoice` loads that DocType). e-Way bill actions are attached to Delivery Note, Sales Invoice, Purchase Invoice, Purchase Receipt, Stock Entry, Subcontracting Order, and Subcontracting Receipt. |
| We file GSTR-3B from the product. | `GSTR3bAPI.file_gstr_3b` exists. A name search found no caller outside that class. The screen that is wired prepares the return and downloads JSON/Excel. |
| The owner gets stock and receivables on a dedicated phone app. | HR has a phone web app. CRM has a mobile lead page. No owner app for stock and receivables was found. |
| We collect UPI in the product. | Razorpay and Paytm controllers are in the Payments app. This pass found no UPI method in those files. Do not say UPI is collected until that is shown. |
| Any client name, logo, metric, or screenshot from this bench. | See `docs/TODO_FROM_OWNER.md`. |
| The godown manager scans the inward bill and stock updates. | Not verified as a finished workflow in this pass. |

## Sell

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Quote a customer | Selling / Quotation. `apps/erpnext/erpnext/selling/doctype/quotation/quotation.json` | Y | Y | |
| Take a sales order | Selling / Sales Order. `apps/erpnext/erpnext/selling/doctype/sales_order/sales_order.json` | Y | Y | |
| Dispatch goods | Stock / Delivery Note. `apps/erpnext/erpnext/stock/doctype/delivery_note/delivery_note.json` | Y | Y | This is the outward challan equivalent. |
| Raise a tax invoice | Accounts / Sales Invoice. `apps/erpnext/erpnext/accounts/doctype/sales_invoice/sales_invoice.json` | Y | Y | GST fields come from India Compliance, which is Demo-able N. |
| Let the invoice itself reduce stock | Sales Invoice field `update_stock` in the same JSON | Y | Y | Off unless someone turns it on. Otherwise stock moves on the Delivery Note. |
| Record money received and match it to invoices | Payment Entry and Payment Reconciliation. `apps/erpnext/erpnext/accounts/doctype/payment_entry/payment_entry.json`, `apps/erpnext/erpnext/accounts/doctype/payment_reconciliation/payment_reconciliation.json` | Y | Y | |
| See who owes money, and how old it is | Accounts Receivable report. `apps/erpnext/erpnext/accounts/report/accounts_receivable/accounts_receivable.json` | Y | Y | |

## Buy

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Ask suppliers for a price | Buying / Request for Quotation. `apps/erpnext/erpnext/buying/doctype/request_for_quotation/request_for_quotation.json` | Y | Y | |
| Place a purchase order | Buying / Purchase Order. `apps/erpnext/erpnext/buying/doctype/purchase_order/purchase_order.json` | Y | Y | |
| Record goods inward | Stock / Purchase Receipt. `apps/erpnext/erpnext/stock/doctype/purchase_receipt/purchase_receipt.json` | Y | Y | Stock and the receipt post together when the receipt is submitted. |
| Book the supplier bill | Accounts / Purchase Invoice. `apps/erpnext/erpnext/accounts/doctype/purchase_invoice/purchase_invoice.json` | Y | Y | |
| See what the business owes suppliers | Accounts Payable. `apps/erpnext/erpnext/accounts/report/accounts_payable/accounts_payable.json` | Y | Y | |

## Stock

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Keep an item master | Stock / Item. `apps/erpnext/erpnext/stock/doctype/item/item.json` | Y | Y | |
| Value stock as FIFO, moving average, or LIFO | Item field `valuation_method`, options `FIFO`, `Moving Average`, `LIFO` | Y | Y | Say the method the company picks. Do not say FIFO is the only way. |
| Know stock in each godown | Warehouse, Bin, Stock Balance. `apps/erpnext/erpnext/stock/doctype/warehouse/warehouse.json`, `apps/erpnext/erpnext/stock/doctype/bin/bin.json`, `apps/erpnext/erpnext/stock/report/stock_balance/stock_balance.json` | Y | Y | |
| See every inward and outward movement | Stock Entry and Stock Ledger. `apps/erpnext/erpnext/stock/doctype/stock_entry/stock_entry.json`, `apps/erpnext/erpnext/stock/report/stock_ledger/stock_ledger.json` | Y | Y | |
| Correct stock after a physical count, including opening stock | Stock Reconciliation. `apps/erpnext/erpnext/stock/doctype/stock_reconciliation/stock_reconciliation.json` | Y | Y | This is the opening-stock tool. It is not a Tally import. |
| Track batches and serial numbers | Batch, Serial No. `apps/erpnext/erpnext/stock/doctype/batch/batch.json`, `apps/erpnext/erpnext/stock/doctype/serial_no/serial_no.json` | Y | Y | |
| Pick goods for a delivery | Pick List. `apps/erpnext/erpnext/stock/doctype/pick_list/pick_list.json` | Y | Y | |
| Add freight and other charges onto item cost | Landed Cost Voucher. `apps/erpnext/erpnext/stock/doctype/landed_cost_voucher/landed_cost_voucher.json` | Y | Y | |

## Make

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Define what goes into a finished good | Manufacturing / BOM. `apps/erpnext/erpnext/manufacturing/doctype/bom/bom.json` | Y | Y | |
| Plan what to make | Production Plan. `apps/erpnext/erpnext/manufacturing/doctype/production_plan/production_plan.json` | Y | Y | |
| Run a job on the shop floor | Work Order, Job Card. `apps/erpnext/erpnext/manufacturing/doctype/work_order/work_order.json`, `apps/erpnext/erpnext/manufacturing/doctype/job_card/job_card.json` | Y | Y | |
| Send material to a job worker and receive it back | Subcontracting Order. `apps/erpnext/erpnext/subcontracting/doctype/subcontracting_order/subcontracting_order.json` | Y | Y | |

## Account

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Start a company with an India chart of accounts | Standard template `apps/erpnext/erpnext/accounts/doctype/account/chart_of_accounts/verified/in_standard_chart_of_accounts.json` | Y | Y | This is a template. It is not a Tally company file. |
| Pass a journal entry | Journal Entry. `apps/erpnext/erpnext/accounts/doctype/journal_entry/journal_entry.json` | Y | Y | |
| Read the general ledger | General Ledger. `apps/erpnext/erpnext/accounts/report/general_ledger/general_ledger.json` | Y | Y | |
| See a trial balance, profit and loss, and balance sheet | `trial_balance.json`, `profit_and_loss_statement.json`, `balance_sheet.json` under `apps/erpnext/erpnext/accounts/report/` | Y | Y | |
| Match the bank statement | Bank Reconciliation Tool. `apps/erpnext/erpnext/accounts/doctype/bank_reconciliation_tool/bank_reconciliation_tool.json` | Y | Y | |
| Close the books for a period | Period Closing Voucher. `apps/erpnext/erpnext/accounts/doctype/period_closing_voucher/period_closing_voucher.json` | Y | Y | |

## GST and India tax

All rows in this section are Demo-able N until the version mismatch above is resolved and a clean company is exercised. Filing and portal lookups also need GST credentials and, for filing, an OTP.

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Put an HSN or SAC on an item | Custom field `gst_hsn_code` on Item, link to GST HSN Code. `apps/india_compliance/india_compliance/gst_india/constants/custom_fields.py` (Item block) and `apps/india_compliance/india_compliance/gst_india/doctype/gst_hsn_code/gst_hsn_code.json` | Y | N | Can be required for sales items when GST Settings say so. |
| Set GST rate and treatment (taxable, nil, exempt, non-GST) | Custom fields on Item Tax Template in the same `custom_fields.py` | Y | N | |
| Check that a GSTIN has 15 characters and a valid check digit | `validate_gstin` in `apps/india_compliance/india_compliance/gst_india/utils/__init__.py` | Y | N | This check is local. It does not prove the GSTIN is active. |
| Fetch a party’s details from a GSTIN | `get_gstin_info` in `apps/india_compliance/india_compliance/gst_india/utils/gstin_info.py`, via `PublicAPI` | Y | N | Needs the India Compliance API. Setup wizard can call it when a company GSTIN is entered. |
| Generate an e-invoice IRN for a sales invoice | `generate_e_invoice` in `apps/india_compliance/india_compliance/gst_india/utils/e_invoice.py`. Log: `e_invoice_log.json` | Y | N | Sales Invoice only. Needs GST Settings and the e-invoice API. |
| Generate an e-way bill | `generate_e_waybill` in `apps/india_compliance/india_compliance/gst_india/utils/e_waybill.py`. Actions wired in `apps/india_compliance/india_compliance/hooks.py` `doctype_js` | Y | N | Not from Quotation or Sales Order. |
| Prepare GSTR-1 from the books, compare it, and file it with PAN plus OTP | `file_gstr1` in `apps/india_compliance/india_compliance/gst_india/doctype/gst_return_log/generate_gstr_1.py`, which calls `GSTR1API.file_gstr_1`. DocType `gstr_1.json` | Y | N | Filing posts `RETFILE` with EVC. Do not describe it as automatic or unattended. |
| Prepare GSTR-3B and download it | `GSTR3BReport` in `apps/india_compliance/india_compliance/gst_india/doctype/gstr_3b_report/gstr_3b_report.py` (`get_data`, `make_json`, `download_gstr3b_as_excel`) | Y | N | This is the wired screen. |
| Save, submit, or file GSTR-3B on the GST portal from the product | `GSTR3bAPI.save_gstr3b`, `submit_gstr3b`, `file_gstr_3b` in `apps/india_compliance/india_compliance/gst_india/api_classes/taxpayer_returns.py` | N | N | Methods exist. No caller outside that class was found. Do not claim portal filing of GSTR-3B. |
| Download GSTR-2B and match supplier bills | `download_gstr_2b` in `apps/india_compliance/india_compliance/gst_india/utils/gstr_2/__init__.py`. Screen: Purchase Reconciliation Tool, `purchase_reconciliation_tool.py` | Y | N | Also has GSTR-2A paths in the same package. Needs GST credentials. |
| Work the invoice management system | GST Invoice Management System. `apps/india_compliance/india_compliance/gst_india/doctype/gst_invoice_management_system/gst_invoice_management_system.json` | Y | N | |
| Record an import bill of entry | Bill of Entry. `apps/india_compliance/india_compliance/gst_india/doctype/bill_of_entry/bill_of_entry.json` | Y | N | |
| See GST sales and purchase registers, HSN summaries, and ITC | Reports under `apps/india_compliance/india_compliance/gst_india/report/` including `gst_sales_register`, `gst_purchase_register`, `hsn_wise_summary_of_outward_supplies`, `summary_of_itc_availed` | Y | N | |
| Use Schedule III layouts for P&L and balance sheet | `apps/india_compliance/india_compliance/income_tax_india/financial_report_template/standard_profit_and_loss_(schedule_iii)/` and `standard_balance_sheet_(schedule_iii)/` | Y | N | Templates, not a filed MCA form. |
| See a TDS computation summary | `apps/india_compliance/india_compliance/income_tax_india/report/tds_computation_summary_india/tds_computation_summary_india.json` | Y | N | |
| Turn on an audit trail during setup | Setup wizard checkbox `enable_audit_trail` in `apps/india_compliance/india_compliance/public/js/setup_wizard.js`, applied by `configure_audit_trail` in `setup_wizard.py` | Y | N | The wizard says that once enabled it cannot be disabled. |

## Pay people

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Keep an employee record | Setup / Employee, inside ERPNext. `apps/erpnext/erpnext/setup/doctype/employee/employee.json` | Y | Y | HRMS does not ship its own Employee DocType in this checkout. |
| Mark attendance, apply leave, and check in | Attendance, Leave Application, Employee Checkin. `apps/hrms/hrms/hr/doctype/attendance/attendance.json`, `leave_application.json`, `employee_checkin.json` | Y | Y | |
| Run payroll and print a salary slip | Salary Structure, Payroll Entry, Salary Slip. `apps/hrms/hrms/payroll/doctype/salary_structure/salary_structure.json`, `payroll_entry.json`, `salary_slip.json` | Y | Y | |
| Let staff do HR tasks on a phone | Frappe HR web app, `start_url` `/hrms`. `apps/hrms/hrms/public/frontend/manifest.webmanifest` | Y | Y | Built assets are in the repo. This pass did not open the app. Scope is HR, not the full business. |
| Print EPF, ESIC, and LWF registers | India Payroll reports `employee_provident_fund_register.json`, `esic_register`, `lwf_register` under `apps/india_payroll/india_payroll/india_payroll/report/` | Y | N | Report JSON exists. The DocType folder in this app is empty. The calculation path was not traced, so do not claim PF or ESI is deducted on the slip until that is clicked through. |

## Customers and the pipeline

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Keep a lead with name, phone, email, organisation, source, and status | CRM Lead. `apps/crm/crm/fcrm/doctype/crm_lead/crm_lead.json` | Y | Y | Import is allowed on the DocType. |
| Move a deal through a pipeline | CRM Deal. `apps/crm/crm/fcrm/doctype/crm_deal/crm_deal.json` | Y | Y | |
| Open a lead on a narrow screen | `apps/crm/frontend/src/pages/MobileLead.vue` | Y | Y | |
| Store UTM, consent time, assessment score, and calculator result on the lead | CRM Lead field list | N | N | Those fields are not in this DocType. The site app has to add them. Do not claim they already exist. |

## Counter billing

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Bill at a counter and close the shift | POS Invoice, POS Profile, POS Closing Entry. `apps/erpnext/erpnext/accounts/doctype/pos_invoice/pos_invoice.json`, `pos_profile.json`, `pos_closing_entry.json` | Y | Y | This is the POS in the flagship sentence. Other POS apps on the bench are excluded until you approve them. |

## Seeing the business

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Build a dashboard on the company’s own data | Insights Workbook, Query, Dashboard. `apps/insights/insights/insights/doctype/insights_workbook/insights_workbook.json`, `insights_dashboard.json` | Y | N | The app is installed. No owner dashboard is seeded. Do not show a fake one. |
| An owner phone app for stock, sales, and receivables | Searched HRMS, CRM, and ERPNext frontends | N | N | HR phone app and CRM mobile lead are the only phone surfaces verified. |

## Messages, pages, and money in

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Send a WhatsApp template and keep the message | `send_template` in `apps/frappe_whatsapp/frappe_whatsapp/frappe_whatsapp/doctype/whatsapp_message/whatsapp_message.py`. Templates DocType beside it | Y | N | Needs a WhatsApp Business account. Opt-in is not implemented in this file. |
| Publish a web form | Web Form. `apps/frappe/frappe/website/doctype/web_form/web_form.json`. Routing in `apps/frappe/frappe/website/router.py` | Y | Y | Suitable for a simple form. The planned marketing site is still a separate Next.js app. |
| Import masters from a spreadsheet | Data Import. `apps/frappe/frappe/core/doctype/data_import/data_import.json` and `importer.py` | Y | Y | Any DocType that allows import, including Customer, Item, and CRM Lead. |
| Export records | Data Export. `apps/frappe/frappe/core/doctype/data_export/data_export.json` | Y | Y | |
| Import a chart of accounts from a spreadsheet before any transactions exist | Chart of Accounts Importer. `apps/erpnext/erpnext/accounts/doctype/chart_of_accounts_importer/chart_of_accounts_importer.py` | Y | Y | Rejects a file that is not the 8-column template. Refuses a company that already has ledger entries. Not a Tally backup. |
| Create opening sales and purchase invoices | Opening Invoice Creation Tool. `apps/erpnext/erpnext/accounts/doctype/opening_invoice_creation_tool/opening_invoice_creation_tool.py` (`invoice_type` Sales or Purchase) | Y | Y | Can create a missing party. This is the open-bills tool. |
| Take a card or online payment through the Payments app | Gateway controllers under `apps/payments/payments/payment_gateways/doctype/`: Stripe, Paymob, Razorpay, Paytm, PayPal, Braintree, GoCardless, M-Pesa. Razorpay controller: `razorpay_settings/razorpay_settings.py` (`RazorpaySettings`, default currency INR at lines 29 and 135, `get_payment_url` at line 327) | Y | N | Each gateway needs its own credentials. This pass found no method named for UPI in the Razorpay or Paytm controllers. |
| Run an internal chat for the team | Raven modules in `apps/raven/raven/modules.txt` | Y | N | Useful later for a new-lead alert. Not a customer-facing claim. |
| Track a support ticket | HD Ticket. `apps/helpdesk/helpdesk/helpdesk/doctype/hd_ticket/hd_ticket.json` | Y | Y | Installed. Not in the flagship sentence until you add it. |
| Host courses | LMS module. `apps/lms/lms/modules.txt` | Y | N | Not in the flagship sentence. |

## Also in ERPNext, not in the flagship sentence

| Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|
| Track a project | Project. `apps/erpnext/erpnext/projects/doctype/project/project.json` | Y | Y | The current prototype lists Projects. The brand sentence in the brief does not. |
| Track a fixed asset | Asset. `apps/erpnext/erpnext/assets/doctype/asset/asset.json` | Y | Y | Same limit. |

## Every module in this ERPNext checkout

`apps/erpnext/erpnext/modules.txt` lists 21 modules. The sections above already cover Accounts, Buying, Selling, Stock, Manufacturing, Subcontracting, Projects, Assets, and the Frappe CRM app (which is separate from the ERPNext CRM module). The rows below are the modules that had no row of their own. None of them is in the flagship sentence until you add it.

| Module | Business outcome | What delivers it | Verified | Demo-able | Notes |
|---|---|---|---|---|---|
| CRM | Keep an ERPNext lead and opportunity, separate from the Frappe CRM app | `apps/erpnext/erpnext/crm/doctype/lead/lead.json`, `apps/erpnext/erpnext/crm/doctype/opportunity/opportunity.json` | Y | Y | Two CRMs are installed. The pipeline described above is Frappe CRM. This row is the ERPNext CRM module. |
| Setup | Company, branch, and the employee master live in Setup | `apps/erpnext/erpnext/setup/doctype/company/company.json`, `apps/erpnext/erpnext/setup/doctype/branch/branch.json`, `apps/erpnext/erpnext/setup/doctype/employee/employee.json` | Y | Y | Employee is also cited in the payroll section. |
| Support | Track an issue and a warranty claim inside ERPNext | `apps/erpnext/erpnext/support/doctype/issue/issue.json`, `apps/erpnext/erpnext/support/doctype/warranty_claim/warranty_claim.json` | Y | Y | This is not the Helpdesk app's HD Ticket. |
| Utilities | Rename a record, or store a video link | `apps/erpnext/erpnext/utilities/doctype/rename_tool/rename_tool.json`, `apps/erpnext/erpnext/utilities/doctype/video/video.json` | Y | Y | Housekeeping. Not a product claim. |
| Portal | Extra fields for the website item filter | `apps/erpnext/erpnext/portal/doctype/website_attribute/website_attribute.json` | Y | Y | Not a customer portal we have designed. |
| Maintenance | Schedule a maintenance visit for a machine | `apps/erpnext/erpnext/maintenance/doctype/maintenance_visit/maintenance_visit.json` | Y | Y | |
| Regional | Store a lower-deduction certificate, and an ERPNext UAE VAT settings record | `apps/erpnext/erpnext/regional/doctype/lower_deduction_certificate/lower_deduction_certificate.json`, `apps/erpnext/erpnext/regional/doctype/uae_vat_settings/uae_vat_settings.json` | Y | Y | The UAE record is a standard template in this module. It is not the separate UAE app, and it is not a phase-2 promise. |
| ERPNext Integrations | Connect Plaid for a US bank feed | `apps/erpnext/erpnext/erpnext_integrations/doctype/plaid_settings/plaid_settings.json` | Y | N | Needs a Plaid account. Not an India banking claim. |
| Quality Management | Write a quality procedure and record a non-conformance | `apps/erpnext/erpnext/quality_management/doctype/quality_procedure/quality_procedure.json`, `apps/erpnext/erpnext/quality_management/doctype/non_conformance/non_conformance.json` | Y | Y | |
| Communication | Set a communication medium and a timeslot | `apps/erpnext/erpnext/communication/doctype/communication_medium/communication_medium.json` | Y | Y | A setting. Not a WhatsApp product. |
| Telephony | Log a call inside ERPNext | `apps/erpnext/erpnext/telephony/doctype/call_log/call_log.json` | Y | N | Needs a telephony provider. Separate from the Frappe telephony app on the bench. |
| Bulk Transaction | Keep a log of a bulk job | `apps/erpnext/erpnext/bulk_transaction/doctype/bulk_transaction_log/bulk_transaction_log.json` | Y | Y | A log. Not a customer-facing feature. |
| EDI | Store a code list | `apps/erpnext/erpnext/edi/doctype/code_list/code_list.json` | Y | Y | Code lists only. This is not e-invoice. |

Installed beside ERPNext, and already covered above: india_compliance, hrms, crm (Frappe CRM), frappe_whatsapp, payments, insights. Helpdesk, LMS, and Raven are covered in the messages section and are not in the flagship sentence.

## What setup actually asks

The questions are in `apps/erpnext/erpnext/public/js/setup_wizard.js`. The server stages that run after submit are in `apps/erpnext/erpnext/setup/setup_wizard/setup_wizard.py`.

1. Persona slide, `name: "persona"` at line 24. It asks who the setup is for, team size, industry, and what the business uses today. The option `"Tally"` is line 73. Accounting, stock, manufacturing, and projects checkboxes start at line 91. Saving those answers does not import the old system. `capture_user_persona` at `setup_wizard.py` lines 53–70 only sends the answers to telemetry.
2. Organisation slide, `name: "organization"` at line 119. Chart of accounts is line 137. The demo-data checkbox is line 148. `load_chart_of_accounts` at line 221 calls `get_charts_for_country`. It loads a template. It does not read a Tally file.
3. After submit, `get_setup_stages` at `setup_wizard.py` lines 13–48 installs presets, sets up the company, sets defaults, stores the persona, and, only if `setup_demo` is set (line 41), creates demo data.

India Compliance adds fields in `apps/india_compliance/india_compliance/public/js/setup_wizard.js`: the field list is line 41, company GSTIN is line 62, default GST rate is line 68, and the audit-trail checkbox is line 90. On completion, `apps/india_compliance/india_compliance/setup_wizard.py` `get_setup_wizard_stages` (line 32) calls `configure_audit_trail` (line 65) and `setup_company_taxes` (line 70). Tax setup validates the GSTIN at line 83, fetches GSTIN details at line 89 when the API is available, and writes tax templates at line 131.

## Phase 0 environment

Install paths, commits, the skill table, and OpenSEO access are in `docs/ENVIRONMENT.md`. This file does not repeat them. The bench read was code only. `web/` was not edited in the inventory pass. Claims in that prototype that go past this table are in `docs/TODO_FROM_OWNER.md`.

## Gate

Phase 1 does not start until you approve this table, or mark the rows you want changed. The decisions that block that approval are in `docs/TODO_FROM_OWNER.md`.
