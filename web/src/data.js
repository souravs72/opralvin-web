export const DEPTS = [
  { id: "sales", name: "Sales", sub: "Orders and quotes" },
  { id: "inventory", name: "Stock", sub: "Godowns and counts" },
  { id: "accounting", name: "Accounts", sub: "Ledgers and GST files" },
  { id: "purchase", name: "Purchase", sub: "Vendors and bills" },
  { id: "manufacturing", name: "Make", sub: "BOM and work orders" },
  { id: "hr", name: "People", sub: "Attendance and slips" },
  { id: "school", name: "School", sub: "Admissions, attendance, and fees" },
];

export const CH = {
  hero: [0, 0.14],
  scatter: [0.14, 0.34],
  connect: [0.34, 0.54],
  flow: [0.54, 0.88],
  settle: [0.88, 1],
};

export const FLOW = [
  { dept: "sales", title: "Quotation", detail: "Illustrative. A quote on one party." },
  { dept: "inventory", title: "Delivery note", detail: "Illustrative challan. Stock in a named godown." },
  { dept: "accounting", title: "Tax invoice", detail: "Illustrative invoice. An e-invoice comes from the sales invoice, not the sales order." },
  { dept: "hub", title: "Posted", detail: "Ledger, stock, and who owes money agree." },
];

export const FAQ = [
  [
    "What is Opralvin One?",
    "One system for the books and the stock. A purchase receipt posts quantity and value together. A delivery note and the tax invoice share the customer. Sales, purchase, inventory, accounting, manufacturing, and a salary slip when payroll is included.",
  ],
  [
    "Do we have to change how we work?",
    "We sit with the owner and the person who posts. Fields, approvals, and the morning report follow that note. The first meeting is a free process audit.",
  ],
  [
    "Is it ready for GST?",
    "A tax invoice can be raised. An e-invoice comes from the sales invoice. An e-way bill comes from the delivery or the invoice. GSTR-3B opens as a file.",
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
    "A purchase receipt posts the warehouse quantity and the stock value together. Freight is added on a landed cost voucher. There is no second export to repair at month-end.",
  ],
  [
    "Can a school use the same system?",
    "An applicant becomes a student without retyping the name. Attendance, a grade book, a fee schedule, and a sales invoice share that record. Paying from the student screen needs a gateway the school already has.",
  ],
];

export const CONTACT = "{{PUBLIC_EMAIL}}";
