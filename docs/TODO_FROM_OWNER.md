# Things only you can confirm

Phase 0 stopped here. Nothing in this file is approved for a public page. I did not open a site database, copy a client record, or take a screenshot.

## Decide before Phase 1

1. Approve `docs/CAPABILITIES.md`, or strike the rows you do not want the site to be able to say.
2. India Compliance in this checkout is **17.0.0-dev**. ERPNext is **16.33.0**. The app’s own check aborts a migrate when the major versions differ. Tell me which India Compliance revision is the one we are allowed to demo. Until that boots on a clean company, every GST row stays Demo-able N.
3. Confirm the flagship sentence. The brief says accounting, GST, inventory, sales, purchase, manufacturing, HR and payroll, CRM, and POS. This bench also has projects, assets, helpdesk, Insights, LMS, Raven, and Payments. Say which of those are part of Opralvin One.
4. Indian statutory payroll. EPF, ESIC, and LWF report files exist in the India Payroll app. I did not trace them onto a salary slip. Say whether the public site may mention PF and ESI.
5. POS. The verified counter is ERPNext POS Invoice. `pos_next` and `erp_pos` are separate apps on this bench, published as Ascra Technologies. Say whether either of them is Opralvin One, or whether the site stays with POS Invoice.
6. UAE. The brief says UAE is phase 2. `taxmate` is a separate app on this bench for UAE VAT and e-invoicing. Do not fold it into Opralvin One unless you say so.
7. Domain, public email, WhatsApp number, city, and whether `hello@opralvin.com` in the prototype is real. The brief says the domain is TBD.

## Still missing, and must stay as placeholders

Prices, support hours, SLAs, office address, founder photo, and any client quote or logo. The brief’s lists for testimonials, logos, case studies, and metrics are empty. They stay empty.

Price tokens used in the strategy pack, with no rupee amount behind them yet: `{{STARTER_PRICE}}`, `{{GROWTH_PRICE}}`, `{{MANAGED_PRICE}}`, `{{DAY_RATE}}`, `{{CA_FEE}}`. Also still unset, and already named above: `{{WHATSAPP_NUMBER}}`, `{{BOOKING_LINK}}`, `{{PUBLIC_EMAIL}}`, `{{CITY}}`.

Also unknown, and not to be invented:

- Trademark status of the name and the domain. The brief marks the domain TBD. Nothing here has been checked against a trademark register.
- Cal.com link, or any other booking link, for the process audit.
- DataForSEO key. It is not in the environment. See `docs/ENVIRONMENT.md`. Keyword volumes stay relative until you provide a key and a budget.
- Frappe Cloud API credentials. None have been supplied. The site app is not created.

## Do not use on the site without written approval

These apps are on the bench. Their names alone are enough to identify clients or other products. I did not read their business records.

- `agency_billing`
- `ascra_logistics`
- `ascra_theme_2`
- `clapgrow_app`
- `clapgrow_workflow`
- `commit`
- `contract_management`
- `erp_pos`
- `huf`
- `idp`
- `jarvis`
- `mcx_helpdesk`
- `mcx_hrms`
- `mcx_learning_ai`
- `pos_next`
- `taxmate`
- `telephony` (Frappe app, still not in the flagship sentence)
- `ucl_chemist`
- `unicom_chemist`
- `vsd_fleet_ms`

## Other apps on the bench, not client work

- `wiki` is the generic wiki app. It is not a client product, it is not in the flagship sentence, and it is not used as an example. Every other directory under `apps/` is either this client list or the product stack named in `docs/CAPABILITIES.md`.

Site directories present, also off limits for screenshots and examples:

- `agency-billing.localhost`
- `clapgrow.site`
- `clapgrow-v16.localhost`
- `contract.localhost`
- `fleet.site`
- `huf.site`
- `mcx.site`
- `pos.site`
- `salasar.site`
- `taxmate.site`
- `test.site`
- `tutorial.site`

A demo has to be a new company with fictional data, on a site you name. Nightly reset and a read-only guest are not set up.

## Prototype copy that goes past the inventory

`web/src/data.js` is an earlier Vite page. It was not edited. These lines should not ship:

| Line in the prototype | What the code actually supports |
|---|---|
| “Tax invoices, e-invoices and e-way bills are generated from the order” | e-Invoice is generated from Sales Invoice. e-Way bill is on the delivery, invoice, and stock documents listed in CAPABILITIES, not on the sales order. |
| “We move customers, items, opening stock and balances across” | Data Import, Stock Reconciliation, Opening Invoice Creation Tool, and the Chart of Accounts Importer can do pieces of this from spreadsheets. There is no Tally migrator in this version. |
| “On a secure cloud we host for you, with automatic backups” | Hosting and backup are not in the product code reviewed here. |
| Projects and POS as equal departments | Projects are in ERPNext. POS Invoice is verified. Both need your yes before they sit in the flagship sentence. The other POS apps are not approved. |
| A flat “Yes” on GST | The compliance app in this checkout does not match ERPNext’s major version, and portal actions need credentials. |

## Lead desk, when we get there

CRM Lead can hold name, mobile, email, organisation, source, and status. It cannot yet hold UTM, the page they landed on, consent time, an assessment score, or a calculator result. Those fields are new work. WhatsApp sending exists and needs a business account plus a recorded opt-in, which this message DocType does not store.

## What I need from you at this gate

Reply with approval, or with the rows to cut. The five answers that unblock Phase 1 are the India Compliance revision, the flagship module list, whether PF/ESI can be named, which POS is the product, and whether TaxMate stays a separate product.
