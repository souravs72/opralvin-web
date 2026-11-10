export const CONTACT = "{{PUBLIC_EMAIL}}";

export const BRAND = {
  name: "Opralvin",
  product: "Opralvin One",
  tag: "Simplify Today. Grow Tomorrow.",
  founder: "Sourav Singh",
  firm: "Opralvin Technologies",
};

export const NAV = {
  meta: "Inventory, books, HR · United States",
  links: [
    { label: "Posting", href: "#posting" },
    { label: "Desks", href: "#desks" },
    { label: "Papers", href: "#papers" },
    { label: "How we work", href: "#how" },
  ],
  cta: "Book the audit",
};

export const HERO = {
  headline: ["One receipt.", "Both ledgers."],
  accent: 1,
  sub: "Warehouse quantity and book value post on the same receipt. Sales, inventory, payroll, and the forms a US firm already files share that record. The first meeting is a free process audit.",
  cta1: "Book a free process audit",
  cta2: "See a sample posting",
  figure: "A sample posting in flight. Steer with the cursor.",
  terminal: {
    barL: "Harborline",
    barR: "PR-0001",
    command: "post PR-0001",
    steps: ["warehouse Main", "general ledger", "posted"],
    result: "stock +10 · books $50,000",
  },
  specTitle: "What we put in writing",
  specId: "OPR-01",
  stats: [
    { label: "to an invoice", value: "30 days" },
    { label: "to a matching count", value: "60 days" },
    { label: "to a signed limit list", value: "90 days" },
  ],
};

export const HUD = {
  title: "Readout",
  id: "R-01",
  label: "sample postings",
  median: "days to invoice",
  from: 90,
  to: 30,
  start: 128,
};

export const PIPELINE = {
  title: "Quote, ship, invoice, posted.",
  sub: "The quote, packing slip, and invoice share the customer. Quantity and value post together. Sales tax is a line on the invoice, not a second spreadsheet.",
  figure: "Sample Harborline, Nov 10, 2026",
  total: "quote → posted",
  totalTime: "one record",
  stages: [
    { key: "quote", label: "Quote", detail: "QTN-0001 · one party", time: "Day 0" },
    { key: "deliver", label: "Packing slip", detail: "PS-0001 · named warehouse", time: "Day 0" },
    { key: "invoice", label: "Invoice", detail: "INV-0001 · sales tax here", time: "Day 0" },
    { key: "posted", label: "Posted", detail: "Stock, ledger, who owes", time: "Once" },
  ],
  points: [
    {
      title: "Warehouse and books",
      body: "A purchase receipt posts quantity and value together. Freight sits on a landed-cost voucher. A count is a stock reconciliation, not a typed total.",
    },
    {
      title: "Papers you already file",
      body: "Sales tax is a line on the invoice. W-2 and 1099 sit on the same payroll run as the pay stub when payroll is included. The audit writes that list. We do not sell a certificate.",
    },
    {
      title: "Lead, student, employee",
      body: "A lead becomes a customer without retyping. An applicant becomes a student on the same record as tuition. Time and the pay stub share the employee.",
    },
  ],
};

export const DESKS = [
  { id: "sales", name: "Sales", sub: "Quotes, orders, invoices" },
  { id: "inventory", name: "Inventory", sub: "Warehouses, lots, counts" },
  { id: "accounting", name: "Accounts", sub: "Ledgers and sales tax" },
  { id: "purchase", name: "Purchasing", sub: "Vendors, receipts, bills" },
  { id: "manufacturing", name: "Manufacturing", sub: "BOM and work orders" },
  { id: "hr", name: "HR", sub: "Time, W-2, 1099" },
  { id: "crm", name: "Pipeline", sub: "Leads become customers" },
  { id: "school", name: "School", sub: "Admissions, attendance, tuition" },
];

export const STACK = {
  title: "Every desk on one record.",
  sub: "The owner and the person who posts sit with us. Fields, approvals, and the morning report follow that note. We do not drop a generic module menu on the firm.",
  figure: "Hover a desk. That ring is the same record. Mark the ones you run when you book the audit.",
};

export const PAPERS = {
  title: "The papers you already file.",
  sub: "Invoice with sales tax. Packing slip from the shipment. W-2 and 1099 on the same payroll run when payroll is included. We write the list in the audit. We do not sell a compliance certificate.",
};

export const DOCS = [
  { id: "inv", name: "Invoice" },
  { id: "quo", name: "Quote" },
  { id: "dc", name: "Packing slip" },
  { id: "pr", name: "Purchase receipt" },
  { id: "rem", name: "Payment reminder" },
  { id: "pay", name: "Pay stub" },
];

export const SHAPES = [
  {
    id: "forms",
    label: "Your forms",
    text: "Lot numbers, trailer numbers, site names. Those fields sit on the order screen, next to the customer and the item.",
  },
  {
    id: "approvals",
    label: "Your approvals",
    text: "Set the rules once. Large purchases reach the owner, large discounts reach a manager, and the rest post without a chase.",
  },
  {
    id: "numbers",
    label: "Your numbers",
    text: "Sales, stock, and cash on one screen, updated as work happens.",
  },
  {
    id: "routine",
    label: "Your routine",
    text: "Payment reminders, low-stock alerts, and the morning report go out on your schedule.",
  },
  {
    id: "people",
    label: "Your people",
    text: "Each role sees the screens for its job. New staff start on day one.",
  },
];

export const OFFER = {
  title: "Sit with the people who post.",
  sub: "The first meeting is a free process audit. Paid work is a day rate for the days we agree. Thirty days to an invoice. Sixty to stock that matches a count. Ninety to a signed limit list.",
  figure: "How an engagement runs",
  plans: [
    {
      id: "audit",
      name: "Process audit",
      price: "Free",
      unit: "first meeting",
      blurb: "Who takes the order, who approves it, which report opens in the morning.",
      feats: ["Sit with the owner and the poster", "Written note of fields and limits", "Desks you actually run"],
      cta: "Book the audit",
      featured: false,
    },
    {
      id: "shape",
      name: "Shape the books",
      price: "Day rate",
      unit: "days we agree",
      blurb: "Screens follow the audit note. Opening invoices, stock, and a chart of accounts come from a spreadsheet.",
      feats: ["Your fields on the order", "Approval rules that post", "Document formats you already use", "Each role learns its screens"],
      cta: "Start from the audit",
      featured: true,
    },
    {
      id: "stay",
      name: "Stay on",
      price: "In writing",
      unit: "support hours",
      blurb: "Support hours are agreed in writing. You own the data. The firm keeps its export.",
      feats: ["Hours named in the note", "Export stays with you", "No second package to repair"],
      cta: "Ask in the audit",
      featured: false,
    },
  ],
};

export const HOW = [
  ["Sit with the people who post.", "Who takes the order, who approves it, and which register they write in. That meeting is the free process audit."],
  ["Shape the books.", "Your fields, approval rules, document formats, and the reports you check every morning."],
  ["Bring the opening balances.", "Opening invoices, opening stock, and a chart of accounts come from a spreadsheet. Each role then learns its screens."],
  ["Stay on, in writing.", "Support hours are agreed in writing."],
];

export const FAQ = [
  [
    "What is Opralvin One?",
    "One system for the books and the stock. A purchase receipt posts quantity and value together. A packing slip and the invoice share the customer. Sales, purchasing, inventory, accounting, manufacturing, a pay stub when payroll is included, a lead that becomes a customer, and a school record when you run one.",
  ],
  [
    "Do we have to change how we work?",
    "We sit with the owner and the person who posts. Fields, approvals, and the morning report follow that note. The first meeting is a free process audit.",
  ],
  [
    "Does it handle sales tax?",
    "Sales tax is a line on the invoice. The audit writes the jurisdictions you already collect. We do not sell a compliance certificate.",
  ],
  [
    "What about payroll papers?",
    "W-2 and 1099 sit on the same payroll run as the pay stub when payroll is included. The audit writes the list of papers you already file.",
  ],
  [
    "Can we keep a sales pipeline on the same record?",
    "A lead becomes a customer without retyping the name. Follow-ups sit on that party. The quote and the sales order use it.",
  ],
  [
    "What happens to our existing data?",
    "Opening invoices, opening stock, and a chart of accounts come across from a spreadsheet.",
  ],
  [
    "Who trains the team?",
    "We do. Each role learns the screens for its own job.",
  ],
  [
    "Where does it run?",
    "The team works in a browser. Support hours are agreed in writing.",
  ],
  [
    "What does it cost?",
    "The audit is free. Paid work is a day rate for the days we agree.",
  ],
  [
    "How long does setup take?",
    "Thirty days to an invoice. Sixty days to stock that matches a count. Ninety days to a signed limit list.",
  ],
  [
    "Who owns the data?",
    "You do. The firm keeps its export.",
  ],
  [
    "What if stock and the books live in two packages?",
    "A purchase receipt posts the warehouse quantity and the stock value together. Freight is added on a landed-cost voucher. There is no second export to repair at month-end.",
  ],
  [
    "Can a school use the same system?",
    "An applicant becomes a student without retyping the name. Attendance, a grade book, a tuition schedule, and a sales invoice share that record. Paying from the student screen needs a gateway the school already has.",
  ],
];

export const BOOK = {
  title: "Book a free process audit.",
  lead: "The audit is free. Paid work is a day rate for the days we agree. Mark the desks you run today so we know who to sit with.",
};

export const FOOTER = {
  tagline: "One receipt for the warehouse and the books. HR, pipeline, and school records when you run them.",
  status: "Audit bookings open",
};
