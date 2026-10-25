// Departments shown in the 3D model. `sub` is the line printed on each tile.
export const DEPTS = [
  { id: "sales", name: "Sales", sub: "Orders & quotes" },
  { id: "inventory", name: "Inventory", sub: "Stock & godowns" },
  { id: "accounting", name: "Accounting", sub: "Ledgers & GST" },
  { id: "purchase", name: "Purchase", sub: "Vendors & bills" },
  { id: "manufacturing", name: "Manufacturing", sub: "BOM & production" },
  { id: "hr", name: "HR & Payroll", sub: "People & salaries" },
  { id: "projects", name: "Projects", sub: "Tasks & costing" },
  { id: "pos", name: "Point of Sale", sub: "Counter billing" },
];

// Scroll chapters of the story section, as fractions of its scroll length.
export const CH = {
  hero: [0, 0.14],
  scatter: [0.14, 0.34],
  connect: [0.34, 0.54],
  flow: [0.54, 0.88],
  settle: [0.88, 1],
};

// The order that travels through the model in the "flow" chapter.
export const FLOW = [
  { dept: "sales", title: "Sales order", detail: "Example Traders, 10 units, ₹50,000" },
  { dept: "inventory", title: "Delivery", detail: "Stock 120 → 110, challan printed" },
  { dept: "accounting", title: "GST invoice", detail: "₹59,000 with e-invoice and e-way bill" },
  { dept: "accounting", title: "Payment", detail: "₹59,000 received, matched to the invoice" },
  { dept: "hub", title: "Books updated", detail: "Ledger, stock and reports agree" },
];

export const FAQ = [
  ["What is Opralvin One?", "One business management system covering accounting, inventory, sales, purchase, manufacturing, HR and payroll, projects and point of sale, set up and customised for your business."],
  ["Do I have to change how we work?", "No. We study how you work first, then shape fields, approvals, documents and reports around it."],
  ["Is it ready for GST?", "Yes. Tax invoices, e-invoices and e-way bills are generated from the order, in your format and branding."],
  ["What happens to our existing data?", "We move customers, items, opening stock and balances across, and check them with you before going live."],
  ["Who trains the team?", "We do. Each role learns the screens for its own job, so the store sees stock and accounts sees finance."],
  ["Where does it run?", "On a secure cloud we host for you, with automatic backups. Your team works in a browser on any computer or phone."],
  ["Can it change as we grow?", "Yes. New fields, reports, rules and departments are added later without starting over."],
  ["What does it cost?", "It depends on the departments and the customisation you need. After the free walkthrough you get a written quote with the scope spelled out."],
  ["How long does setup take?", "It depends on your size and how much we customise. We agree the timeline with you, phase by phase, before work starts."],
  ["Who owns the data?", "You do. It is your business record, and you can export it whenever you want."],
];

export const CONTACT = "hello@opralvin.com";
