export type LaunchPiece = {
  slug: string;
  path: string;
  title: string;
  description: string;
  h1: string;
  paragraphs: string[];
  claims: { id: string; text: string }[];
  links: { href: string; label: string }[];
};

export const launchPieces: LaunchPiece[] = [
  {
    slug: "process-audit-scope",
    path: "/resources/process-audit-scope",
    title: "What a free process audit actually opens",
    description:
      "The first meeting is a written look at invoices, stock, and GST paperwork. No build, no data move, and no price in that sitting.",
    h1: "We open the books you already keep. We do not start a build in that meeting.",
    paragraphs: [
      "A process audit is a sitting, not a kickoff. Someone from Opralvin Technologies sits with the owner and the person who posts, and writes down how a quotation becomes a tax invoice, where stock is counted, and which GST file leaves the office each month. The output is a note. It is not a statement of work and it is not a day count.",
      "We ask to see the register, the sheet, and the desktop books you already use. We do not copy a company file off a machine. We do not install software in that meeting. If a number would have to be invented to fill a cell, the cell stays empty.",
      "The audit is free. Paid work, if any, is a later conversation about days you can count. Starter, Growth, and Managed remain labels until the owner sets rupee amounts. Those amounts are not on this page.",
      "Bring the person who actually posts. Bring GSTIN if the firm is registered. Bring a list of godowns even if that list is a notebook. Do not bring a promise of a live portal demo. GST paperwork the product can prepare is a file you can open. A portal click is not offered until the owner names a tax-app revision that boots on this major version.",
      "If you want a shorter look first, four yes or no facts on the assessment page produce a score for the call. That score is for the conversation. The product CRM does not store it as a feature of Opralvin One.",
    ],
    claims: [
      {
        id: "L45",
        text: "A live GST portal demonstration is not offered until the owner names a tax-app revision that boots on this major version.",
      },
    ],
    links: [
      { href: "/process-audit", label: "Book a free process audit" },
      { href: "/assessment", label: "Four facts before the call" },
      { href: "/resources/spreadsheet-not-a-company-file", label: "Spreadsheets, not a company reader" },
    ],
  },
  {
    slug: "spreadsheet-not-a-company-file",
    path: "/resources/spreadsheet-not-a-company-file",
    title: "A spreadsheet we can load. Not a desktop company we can read.",
    description:
      "Parties, items, and opening bills can come from a sheet. There is no reader for a desktop accounts company in this version.",
    h1: "Fill a sheet. Do not hand over a company file and expect it to open.",
    paragraphs: [
      "Masters that allow import can be loaded from a spreadsheet. Customer Name, Type, GSTIN, Territory. Item Code, Item Name, Item Group, HSN, Stock UOM. Opening invoices as Party, Date, Amount, Outstanding Amount, Item. Those headers are a starting sheet, not a secret format.",
      "A desktop accounts company is a different object. This version has no reader for it. The setup wizard may store the word for what the business uses today. Storing the word is not a migrator. If a page on this site ever said otherwise, that page would be wrong.",
      "Opening stock is a count in a named godown, posted as a stock correction. It is not an extract from last year's company. Opening invoices are posted as opening invoices. The chart of accounts can start from an India template. That template is not last year's ledger copied across.",
      "The honest sequence is: agree the sheet, fill the sheet, load the sheet, count the godown, post the open bills, print the first tax invoice from the new books. Skip a step and the books will not match the godown.",
      "Trading firms with more than one godown are first in the calling order. That is who we ring. It is not a count of demand and it is not a logo wall.",
    ],
    claims: [
      { id: "L26", text: "We can import customers, items, and other importable masters from a spreadsheet." },
      { id: "L22", text: "We can start a company from an India chart-of-accounts template. This is not a desktop accounts company file." },
    ],
    links: [
      { href: "/migration", label: "What a spreadsheet and an opening tool can hold" },
      { href: "/resources/opening-stock", label: "Opening stock is a count" },
      { href: "/process-audit", label: "Book a free process audit" },
    ],
  },
  {
    slug: "opening-stock",
    path: "/resources/opening-stock",
    title: "Opening stock is a count in a godown",
    description:
      "Stock is a quantity in a named godown. Opening stock is posted after a count. It is not a desktop-company import.",
    h1: "Count the godown. Then post the count. Do not import a company and hope the bins match.",
    paragraphs: [
      "An item master names the thing. A godown names the place. Stock in each godown is a quantity you can open. Inward and outward movements are rows. After a physical count, stock can be corrected, including the opening count.",
      "That opening count is work. Someone walks the rack. Someone writes the quantity. Someone posts the correction. If the sheet said 140 and the rack holds 128, the books take 128. The sheet is not the godown.",
      "Batches and serial numbers can be tracked when the item needs them. Freight and other charges can be added onto item cost. None of that replaces the walk down the aisle.",
      "Valuation can be FIFO, moving average, or LIFO. The company picks the method. Picking a method is not a claim that last year's method copied itself across from a desktop company.",
      "Days 31 to 60 in how we work are when godowns, opening stock, purchase receipts, and who owes whom are supposed to sit still. If the count is late, the invoice in month one still posts. The stock report waits for the count.",
    ],
    claims: [
      { id: "L14", text: "We can see stock in each godown." },
      { id: "L16", text: "We can correct stock after a count, including opening stock. This is not a desktop-company import." },
    ],
    links: [
      { href: "/solutions/inventory", label: "Inventory and warehousing" },
      { href: "/resources/two-godowns", label: "Two godowns, one set of books" },
      { href: "/how-we-work", label: "Thirty, sixty, and ninety days" },
    ],
  },
  {
    slug: "gst-file-you-can-open",
    path: "/resources/gst-file-you-can-open",
    title: "A GST file you can open. Not a portal we click for you.",
    description:
      "GSTR-3B can be prepared and downloaded. Portal save, submit, and file are not a claim. A live portal demo is not offered yet.",
    h1: "The return is a file. The portal click is not in this offer.",
    paragraphs: [
      "An HSN or SAC can be stored on an item. A GSTIN can be checked for 15 characters and a valid check digit. That check is local. It does not prove the GSTIN is active on the portal.",
      "GSTR-1 can be prepared from the books and filed with PAN plus OTP. It is not automatic or unattended. GSTR-3B can be prepared and downloaded as JSON or Excel. Portal save, submit, and file are not a claim. GSTR-2B can be downloaded and matched to supplier bills when GST credentials exist.",
      "An e-invoice IRN can be generated from a sales invoice, with GST settings and the e-invoice API. Not from a sales order. An e-way bill can be generated from a delivery note, sales invoice, purchase invoice, purchase receipt, stock entry, subcontracting order, or subcontracting receipt. Not from a quotation or a sales order.",
      "None of those sentences is a live demonstration on this website. A live GST portal demonstration is not offered until the owner names a tax-app revision that boots on this major version.",
      "If a competitor page shows a portal screenshot as if it were already this product, treat that as their claim, not ours. Our honest page is the file you can open, and the meeting where we write down which file leaves your office today.",
    ],
    claims: [
      { id: "L37", text: "GSTR-3B can be prepared and downloaded as JSON or Excel. Portal save, submit, and file are not a claim." },
      { id: "L45", text: "A live GST portal demonstration is not offered until the owner names a tax-app revision that boots on this major version." },
    ],
    links: [
      { href: "/solutions/accounting-gst", label: "Accounting and GST paperwork" },
      { href: "/resources/what-we-do-not-move", label: "What we do not move" },
      { href: "/process-audit", label: "Book a free process audit" },
    ],
  },
  {
    slug: "two-godowns",
    path: "/resources/two-godowns",
    title: "Two godowns, one set of books",
    description:
      "Trading and distribution is first in the calling order: more than one godown, an owner and one accountant. That is who we ring, not a count of demand.",
    h1: "The second godown is why the sheet breaks. The books should hold both.",
    paragraphs: [
      "A trading firm with a city godown and a highway godown already knows the failure. The sheet in the accountant's laptop is last Thursday. The highway godown sold on Friday. The owner hears about it when a party asks for a bill that does not exist yet.",
      "Opralvin One keeps stock in each godown as a quantity you can open. The quotation, the order, the delivery note, and the tax invoice sit on the same party. Money in is matched to invoices. That is the work of the week, not a licence catalogue.",
      "We call trading and distribution first. Manufacturing, chemist retail, logistics, multi-branch retail, and services are on the list after that. The order is a calling order. It is not proof that we already serve each trade. There is no logo row and no invented client count.",
      "What moves: spreadsheet masters, opening invoices, opening stock, a chart of accounts. What does not move: a desktop company file. There is no reader for that file in this version.",
      "If you have one godown and a clean sheet, you can still book the audit. The first call still goes to the two-godown firm because that is where the sheet usually lies.",
    ],
    claims: [
      { id: "L14", text: "We can see stock in each godown." },
      { id: "L06", text: "We can see who owes money, and how old it is." },
    ],
    links: [
      { href: "/industries/trading", label: "Trading and distribution" },
      { href: "/resources/quotation-to-tax-invoice", label: "Quotation to tax invoice" },
      { href: "/process-audit", label: "Book a free process audit" },
    ],
  },
  {
    slug: "quotation-to-tax-invoice",
    path: "/resources/quotation-to-tax-invoice",
    title: "Quotation, order, challan, tax invoice on the same party",
    description:
      "The sales documents sit on one party. GST fields on the tax invoice are not a live demonstration.",
    h1: "The challan and the bill must name the same party. That is the whole point.",
    paragraphs: [
      "We can raise a quotation. We can take a sales order. We can dispatch goods on a delivery note. We can raise a tax invoice. GST fields on that invoice are not a live demonstration.",
      "When those four documents sit on different names for the same firm, the accountant spends the week reconciling people, not goods. One party master is the fix. It is not glamorous. It is the work.",
      "Money received is recorded and matched to invoices. Ageing is a report of who owes money. On the buy side: a supplier price, a purchase order, goods inward on a purchase receipt, a supplier bill, and what the business owes.",
      "None of this requires a case study. If your current path is WhatsApp photograph to Excel to a desktop invoice, the audit writes that path down. The build, if any, starts later, as days you can count.",
      "A counter POS invoice exists in the product. It is not in the current offer until the owner confirms it. Do not plan a retail counter on this year's statement of work.",
    ],
    claims: [
      { id: "L01", text: "We can raise a quotation." },
      { id: "L04", text: "We can raise a tax invoice. GST fields on that invoice are not a live demonstration." },
    ],
    links: [
      { href: "/solutions/sales-purchase", label: "Sales and purchase" },
      { href: "/resources/pos-not-in-the-offer", label: "POS is not in this year's offer" },
      { href: "/product", label: "The work of the week" },
    ],
  },
  {
    slug: "work-order",
    path: "/resources/work-order",
    title: "A work order instead of a notebook on the shop floor",
    description:
      "Bill of materials, production plan, work order, job card, and subcontracting exist. A notebook is not the record.",
    h1: "The job card is the shop-floor record. The notebook stays in the drawer.",
    paragraphs: [
      "A bill of materials names what goes into a finished good. A production plan is the week. A work order is the job. A job card is what the floor actually did. Subcontracting is when part of that job leaves the building.",
      "Light manufacturing is on the industry list after trading. The factory book and the accounts book can be the same book. That sentence is a capability, not a count of factories already live.",
      "GST paperwork for a manufacturer is still a file the product can prepare. It is not a live portal demo. Opening stock for components is still a count.",
      "If the firm makes to stock, the finished good is an item with a BOM. If the firm makes to order, the sales order still has to become a work order, not a WhatsApp to the supervisor. The audit writes down which of those two you actually do.",
      "Projects as a module are not in this offer until the owner adds them. A service firm that wants project accounting should read the services page and the limit list, not this page.",
    ],
    claims: [
      { id: "L20", text: "We can define a bill of materials, plan production, and run a work order with a job card." },
    ],
    links: [
      { href: "/solutions/manufacturing", label: "Manufacturing" },
      { href: "/industries/manufacturing", label: "Light manufacturing" },
      { href: "/resources/opening-stock", label: "Opening stock is a count" },
    ],
  },
  {
    slug: "salary-slip",
    path: "/resources/salary-slip",
    title: "Attendance and a salary slip. Not a PF promise.",
    description:
      "Employee, attendance, leave, and a printed salary slip exist. PF and ESI on that slip are not a claim until the owner says they may be named.",
    h1: "We can print a salary slip. We do not name PF or ESI on this site yet.",
    paragraphs: [
      "An employee master, attendance, leave, and a printed salary slip are in the product. That is the people-work we will talk about on an audit if payroll is in scope.",
      "PF and ESI as deductions on that slip are not a claim here. Report files for those names exist in the codebase the owner can read. The deduction path was not traced for marketing. Until the owner says those names may be used, this page does not use them as a promise.",
      "Days 61 to 90 mention a salary slip if payroll is in scope, and a written limit list. If payroll is out of scope, the slip is not in the statement of work. Do not assume it is included because the product can print one.",
      "There is no owner phone app for stock, sales, and receivables in this offer. The phone surfaces that exist elsewhere are not this marketing site's claim.",
      "If the accountant already runs salary in a separate tool, the audit writes that down. Moving payroll is a later day count, not a free extra in the first thirty days.",
    ],
    claims: [
      { id: "L31", text: "We can keep an employee, mark attendance, apply leave, and print a salary slip." },
      { id: "L43", text: "PF or ESI deducted on the salary slip is not a claim. Registers exist. The deduction path was not traced." },
    ],
    links: [
      { href: "/solutions/hr-payroll", label: "HR and payroll" },
      { href: "/how-we-work", label: "How we work" },
      { href: "/resources/what-we-do-not-move", label: "What we do not move" },
    ],
  },
  {
    slug: "pos-not-in-the-offer",
    path: "/resources/pos-not-in-the-offer",
    title: "A counter bill exists. It is not in this year's offer.",
    description:
      "Why the POS page exists, why a counter is not for sale this year, and what a trading desk can do instead.",
    h1: "The counter is real in the product. It is not for sale on this site yet.",
    paragraphs: [
      "A desk POS invoice exists. That is a product fact. The current commercial offer does not include it until the owner confirms which POS is the product and that it is in this year's work.",
      "Multi-branch retail can still be branches as godowns, with stock and invoices, without a counter. Chemist retail can still be stock with batches, without being a named chemist product, and without being the beachhead.",
      "If you need a counter this quarter, say so on the audit. The honest answer today is that the counter is not in the offer. An invented yes would be a worse answer.",
      "Trading firms that invoice from a desk, not a counter, are the first call. Their path is quotation to tax invoice, not a barcode gun.",
      "When the owner confirms the POS, this page will change. Until then the sentence stays: a counter bill exists. It is not in this year's offer yet.",
    ],
    claims: [
      { id: "L51", text: "POS Invoice exists in the checkout. It is not in this offer until the owner confirms the flagship list." },
    ],
    links: [
      { href: "/solutions/pos", label: "POS and retail" },
      { href: "/industries/retail", label: "Multi-branch retail" },
      { href: "/resources/quotation-to-tax-invoice", label: "Quotation to tax invoice" },
    ],
  },
  {
    slug: "day-rate",
    path: "/resources/day-rate",
    title: "Paid work is days times a day rate",
    description:
      "Starter, Growth, and Managed are labels until rupee amounts are set. The calculator multiplies days by the day rate. An unset rate stays a token.",
    h1: "If the rate is unset, the total stays a token. We do not invent a rupee figure.",
    paragraphs: [
      "The audit is free. Paid work is a day rate times agreed days. Starter, Growth, and Managed are names for scopes. The rupee amounts {{STARTER_PRICE}}, {{GROWTH_PRICE}}, {{MANAGED_PRICE}}, and {{DAY_RATE}} stay tokens until the owner sets them. A CA fee, if any, is {{CA_FEE}}.",
      "The calculator on this site multiplies a whole number of days from 1 to 90 by the day rate. If the rate is missing or junk, the output is the token {{DAY_RATE}}, not a guessed rupee amount. Indian grouping is used only when the rate is a real number.",
      "A hidden edition, a surprise licence band, or a from-price that is not the real price would break the honesty contract. This page does not have one.",
      "Days are agreed in writing after the audit. The audit itself does not produce a price. Anyone who quotes a rupee figure before the owner sets the tokens is inventing.",
      "Support hours are {{SUPPORT_HOURS}}. The owner has not set them. Do not read an all-hours promise into the blank.",
    ],
    claims: [
      { id: "L49", text: "Prices are unset. The tokens are not rupee amounts." },
    ],
    links: [
      { href: "/calculator", label: "Day-rate calculator" },
      { href: "/pricing", label: "Pricing" },
      { href: "/process-audit", label: "Book a free process audit" },
    ],
  },
  {
    slug: "consent-for-the-call",
    path: "/resources/consent-for-the-call",
    title: "Consent is for a call about a process audit",
    description:
      "Name, phone, email, company, and a yes to contact. The purpose is a process-audit call. The Digital Personal Data Protection Act, 2023 exists. Commencement is by notification.",
    h1: "We ask in order to call you about an audit. That is the only purpose on the form.",
    paragraphs: [
      "The form on the process-audit page asks for name, phone, email, and company. Consent is a checkbox. The purpose text is contact about a free process audit, as described on the privacy page. A hidden field catches bots. If that field is filled, the request is rejected.",
      "UTM values on the link, the landing page, and an assessment score from this browser can travel with the form. The product CRM of Opralvin One does not already store those extra fields as a marketed feature. The site's own lead path records them so we can call you about the audit you asked for.",
      "The Digital Personal Data Protection Act, 2023 exists. Commencement is by notification. This page does not pretend the whole Act is already in force as a marketing badge.",
      "We do not sell a list. We do not put a testimonial with a made-up name next to the form. Asha and Sample Traders appear only in tests, not as customers.",
      "Acknowledgements after a successful store are sandbox until the owner supplies mail and WhatsApp keys and confirms a live send. Until then, nothing is messaged to a real person from this site.",
    ],
    claims: [
      { id: "L44", text: "The product lead does not store UTM, consent time, assessment score, or a calculator result. The marketing form may collect those for the audit call. That is not the product CRM." },
    ],
    links: [
      { href: "/privacy", label: "Privacy notice" },
      { href: "/process-audit", label: "Book a free process audit" },
      { href: "/assessment", label: "The short look before the call" },
    ],
  },
  {
    slug: "what-we-do-not-move",
    path: "/resources/what-we-do-not-move",
    title: "What we do not move, on one page",
    description:
      "No desktop-company reader. No live GST portal demo. No PF or ESI promise. No owner phone app. No UPI claim. No invented clients.",
    h1: "The limit list is part of the product story. Hiding it would be the dishonest version.",
    paragraphs: [
      "There is no Tally company reader in this version. Spreadsheet import, opening invoices, opening stock, and a chart-of-accounts template exist. The wizard storing the word for today's books is not a migrator.",
      "e-Invoice is not generated from a sales order. GSTR-3B portal file, save, and submit are not a claim. A live GST portal demonstration is not offered yet. An owner phone app for stock, sales, and receivables was not found as a claimable feature. A verified UPI flow is not a claim.",
      "UTM, consent time, assessment score, and calculator result are not already fields on the product CRM of Opralvin One as marketed capabilities. Automatic cloud backups are not a product feature in the inventory we reviewed. PF or ESI deducted on the salary slip is not a marketing claim.",
      "POS exists and is not in the current offer. Projects wait for a written yes. Hosting and automatic backups are not product claims. One line, built on proven open-source foundations, belongs on the security page only.",
      "Ninety days after paid work starts, the signed limit list should match this page. If a salesperson says otherwise, this page wins.",
    ],
    claims: [
      { id: "L51", text: "POS Invoice exists in the checkout. It is not in this offer until the owner confirms the flagship list." },
      { id: "L45", text: "A live GST portal demonstration is not offered until the owner names a tax-app revision that boots on this major version." },
    ],
    links: [
      { href: "/migration", label: "Migration" },
      { href: "/security", label: "Security and data ownership" },
      { href: "/resources/gst-file-you-can-open", label: "A GST file you can open" },
    ],
  },
];

export function launchBySlug(slug: string): LaunchPiece | undefined {
  return launchPieces.find((piece) => piece.slug === slug);
}

export const launchIndex = launchPieces.map((piece) => ({
  slug: piece.slug,
  path: piece.path,
  title: piece.title,
}));

export function llmsTxt(site: string): string {
  const lines = [
    "# Opralvin One",
    "",
    "Opralvin Technologies sells Opralvin One to growing Indian firms. Tagline: Simplify Today. Grow Tomorrow. Founder: Sourav Singh. The primary call to action is to book a free process audit.",
    "",
    "Do not invent clients, logos, metrics, testimonials, awards, or prices. Rupee amounts on the public site are tokens until the owner sets them. Customer-facing pages do not name the underlying stack. One allowed public line, Built on proven open-source foundations, belongs on Security only.",
    "",
    "## Pages",
    ...launchPieces.map((piece) => `- ${new URL(piece.path, site).toString()} — ${piece.title}`),
    `- ${new URL("/process-audit", site).toString()} — Book a free process audit`,
    `- ${new URL("/product", site).toString()} — Product`,
    `- ${new URL("/migration", site).toString()} — Migration`,
    `- ${new URL("/security", site).toString()} — Security`,
    "",
    "## Limits",
    "No desktop-company reader. No live GST portal demonstration. POS exists and is not in the current offer. PF and ESI are not claims. No invented case studies.",
  ];
  return `${lines.join("\n")}\n`;
}
