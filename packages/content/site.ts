export type Claim = { id: string; text: string };

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  h1: string;
};

export const orgName = "Opralvin Technologies";
export const productName = "Opralvin One";

export const pages: PageMeta[] = [
  {
    path: "/",
    title: "Opralvin One — one system after the register",
    description:
      "Opralvin One keeps quotations, orders, delivery notes, tax invoices, stock in each godown, and who owes you money in the same books. Book a free process audit.",
    h1: "The register, the sheet, and the desktop books. Then one system.",
  },
  {
    path: "/product",
    title: "Opralvin One product — sell, buy, stock, make, pay, account",
    description:
      "A tour of Opralvin One by the work of the week: sell, buy, stock, make, pay people, account, and file GST paperwork that the product actually has.",
    h1: "The work of the week, in one set of books.",
  },
  {
    path: "/solutions",
    title: "Solutions — books, stock, sales, people",
    description: "Module groups in Opralvin One, written as the work they change, not as a catalogue of licences.",
    h1: "What changes in the books, not a list of licences.",
  },
  {
    path: "/solutions/accounting-gst",
    title: "Accounting and GST paperwork — Opralvin One",
    description:
      "Journals, ledgers, receivables, and GST files the product can prepare. GSTR-3B is a download. A live portal demo is not offered yet.",
    h1: "The accountant posts once. GST is a file you can open.",
  },
  {
    path: "/solutions/inventory",
    title: "Inventory and warehousing — Opralvin One",
    description: "Item masters, stock in each godown, movements, counts, batches, and landed cost.",
    h1: "Stock in each godown, not a sheet on a laptop.",
  },
  {
    path: "/solutions/sales-purchase",
    title: "Sales and purchase — Opralvin One",
    description: "Quotation, sales order, delivery note, tax invoice, purchase order, goods inward, and supplier bills.",
    h1: "The order, the challan, and the bill sit on the same party.",
  },
  {
    path: "/solutions/manufacturing",
    title: "Manufacturing — Opralvin One",
    description: "Bill of materials, production plan, work order, job card, and subcontracting.",
    h1: "A work order instead of a notebook on the shop floor.",
  },
  {
    path: "/solutions/hr-payroll",
    title: "HR and payroll — Opralvin One",
    description: "Employee, attendance, leave, and a printed salary slip. PF and ESI on that slip are not a claim.",
    h1: "Attendance and a salary slip. Not a PF promise.",
  },
  {
    path: "/solutions/crm",
    title: "CRM and sales pipeline — Opralvin One",
    description: "A lead with name, phone, email, organisation, source, and status, and a deal that moves through a pipeline.",
    h1: "A lead you can open, not a chat you cannot search.",
  },
  {
    path: "/solutions/pos",
    title: "POS and retail — Opralvin One",
    description: "A desk POS invoice exists in the product. It is not in the current offer until the owner confirms it.",
    h1: "A counter bill exists. It is not in this year's offer yet.",
  },
  {
    path: "/industries",
    title: "Industries — who we call first",
    description: "Trading, manufacturing, chemist retail, logistics, multi-branch retail, and services. The first call is a trading firm. That is a calling order, not a count of demand.",
    h1: "A calling order, not a claim that we already serve each trade.",
  },
  {
    path: "/industries/trading",
    title: "Trading and distribution — Opralvin One",
    description: "More than one godown, an owner and one accountant. Stock, parties, and opening bills move from spreadsheets. There is no desktop-company reader.",
    h1: "Two godowns, one set of books.",
  },
  {
    path: "/industries/manufacturing",
    title: "Light manufacturing — Opralvin One",
    description: "Bill of materials and work orders for a small factory. GST paperwork is in the product and is not a live portal demo.",
    h1: "The factory book and the accounts book can be the same book.",
  },
  {
    path: "/industries/pharma",
    title: "Pharma and chemist retail — Opralvin One",
    description: "Retail stock and invoices. Batch tracking exists. This is not a named chemist product, and it is not the beachhead.",
    h1: "Retail stock with batches. Not a named chemist chain.",
  },
  {
    path: "/industries/logistics",
    title: "Logistics and fleet — Opralvin One",
    description: "Parties, bills, and stock if you hold inventory. A fleet product on the bench is not this offer.",
    h1: "Bills and parties. Not a fleet product.",
  },
  {
    path: "/industries/retail",
    title: "Multi-branch retail — Opralvin One",
    description: "More than one location as godowns, with stock and invoices. POS is not in the current offer.",
    h1: "Branches as godowns, until the owner confirms a counter.",
  },
  {
    path: "/industries/services",
    title: "Service firms — Opralvin One",
    description: "Quotations, invoices, and who owes money. There is no project module in this offer until the owner adds it.",
    h1: "Invoices and dues. Projects wait for a written yes.",
  },
  {
    path: "/migration",
    title: "Leaving the register, the sheet, and the desktop books",
    description:
      "What we move with spreadsheet import, opening invoices, opening stock, and a chart of accounts. There is no reader for a desktop accounts company.",
    h1: "We move what a spreadsheet and an opening tool can hold.",
  },
  {
    path: "/calculator",
    title: "Day-rate calculator — days you can count",
    description: "Paid work is a day rate times agreed days. If the day rate is unset, the total stays a token. Rupee amounts are not invented.",
    h1: "Days times a day rate. Not a hidden edition.",
  },
  {
    path: "/assessment",
    title: "A short look before the process audit",
    description: "Four yes or no questions that produce a score for the audit call. The product CRM does not store this score.",
    h1: "Four facts about the books, then a score for the call.",
  },
  {
    path: "/pricing",
    title: "Pricing — process audit, then days you can count",
    description: "A free process audit, then Starter, Growth, and Managed work priced as a day rate times agreed days. Rupee amounts are not set.",
    h1: "The audit is free. Paid work is days, not a hidden edition.",
  },
  {
    path: "/how-we-work",
    title: "How we work — thirty, sixty, and ninety days",
    description: "Who does what in onboarding, what the firm must bring, and support hours still marked as owner placeholders.",
    h1: "Thirty days to an invoice. Ninety days to a signed limit list.",
  },
  {
    path: "/resources",
    title: "Resources — glossary and import sheets",
    description: "Plain definitions of GST, HSN, e-way bill, BOM, and FIFO, plus spreadsheet headers you can fill.",
    h1: "Words the books use, and a sheet you can open.",
  },
  {
    path: "/resources/glossary",
    title: "Glossary — GST, HSN, e-way bill, BOM, FIFO",
    description: "Short definitions for the terms used on this site, without naming the underlying stack.",
    h1: "The words, in the owner's language.",
  },
  {
    path: "/about",
    title: "About Opralvin Technologies",
    description: "Sourav Singh, a founder-led specialist team, and how we choose work. No inflated headcount.",
    h1: "A founder who has posted books, and who has built systems.",
  },
  {
    path: "/process-audit",
    title: "Book a free process audit",
    description: "A written look at how the firm invoices, stocks, and files. No build, no data move, and no price in that meeting.",
    h1: "Book a free process audit",
  },
  {
    path: "/security",
    title: "Security and data ownership",
    description: "The firm keeps its export. Hosting and automatic backups are not product claims. One line on open-source foundations is allowed here.",
    h1: "Your books stay yours. We do not keep a silent copy.",
  },
  {
    path: "/privacy",
    title: "Privacy — DPDP notice for a process audit",
    description: "Purpose-bound consent for contacting you about a process audit. The Digital Personal Data Protection Act, 2023 exists. Commencement is by notification.",
    h1: "We ask in order to call you about an audit. That is the purpose.",
  },
  {
    path: "/terms",
    title: "Terms of use",
    description: "The website is information. A paid statement of work is the contract. Prices on this site are placeholders until the owner sets them.",
    h1: "This site is not the statement of work.",
  },
];

export const nav = [
  { href: "/product", label: "Product" },
  { href: "/solutions", label: "Solutions" },
  { href: "/industries", label: "Industries" },
  { href: "/migration", label: "Migration" },
  { href: "/pricing", label: "Pricing" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function pageByPath(path: string): PageMeta {
  const found = pages.find((page) => page.path === path);
  if (!found) throw new Error(`Missing page meta for ${path}`);
  return found;
}
