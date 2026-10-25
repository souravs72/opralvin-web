export type BodyBlock = {
  claims?: { id: string; text: string }[];
  paragraphs?: string[];
  rows?: { label: string; text: string; id?: string }[];
  links?: { href: string; label: string }[];
};

export const solutions: Record<
  string,
  { path: string; intro: string; blocks: BodyBlock[]; limit?: { id: string; text: string } }
> = {
  "accounting-gst": {
    path: "/solutions/accounting-gst",
    intro:
      "The accountant posts a journal. The ledger, trial balance, profit and loss, and balance sheet come from those posts. GST paperwork is a file the product can prepare. It is not a live portal demonstration.",
    blocks: [
      {
        claims: [
          { id: "L23", text: "We can pass a journal and read the general ledger, trial balance, profit and loss, and balance sheet." },
          { id: "L22", text: "We can start a company from an India chart-of-accounts template. This is not a desktop accounts company file." },
          { id: "L24", text: "We can match a bank statement in the bank reconciliation tool." },
          { id: "L25", text: "We can close the books for a period." },
          { id: "L32", text: "An HSN or SAC can be stored on an item. This is not a live GST demonstration." },
          { id: "L33", text: "A GSTIN can be checked for 15 characters and a valid check digit. The check is local. It does not prove the GSTIN is active." },
          { id: "L34", text: "An e-invoice IRN can be generated from a sales invoice, with GST settings and the e-invoice API. Not from a sales order. Not a live demonstration." },
          { id: "L35", text: "An e-way bill can be generated from a delivery note, sales invoice, purchase invoice, purchase receipt, stock entry, subcontracting order, or subcontracting receipt. Not from a quotation or a sales order." },
          { id: "L36", text: "GSTR-1 can be prepared from the books and filed with PAN plus OTP. It is not automatic or unattended. Not a live demonstration." },
          { id: "L37", text: "GSTR-3B can be prepared and downloaded as JSON or Excel. Portal save, submit, and file are not a claim." },
          { id: "L38", text: "GSTR-2B can be downloaded and matched to supplier bills when GST credentials exist. Not a live demonstration." },
        ],
      },
    ],
    limit: {
      id: "L45",
      text: "A live GST portal demonstration is not offered until the owner names a tax-app revision that boots on this major version.",
    },
  },
  inventory: {
    path: "/solutions/inventory",
    intro: "Stock is a quantity in a named godown, not a column on a laptop. Opening stock is a count, not a desktop-company import.",
    blocks: [
      {
        claims: [
          { id: "L12", text: "We can keep an item master." },
          { id: "L13", text: "Stock can be valued as FIFO, moving average, or LIFO. The company picks the method." },
          { id: "L14", text: "We can see stock in each godown." },
          { id: "L15", text: "We can see each inward and outward stock movement." },
          { id: "L16", text: "We can correct stock after a count, including opening stock. This is not a desktop-company import." },
          { id: "L17", text: "We can track batches and serial numbers." },
          { id: "L18", text: "We can pick goods for a delivery." },
          { id: "L19", text: "We can add freight and other charges onto item cost." },
        ],
      },
    ],
  },
  "sales-purchase": {
    path: "/solutions/sales-purchase",
    intro: "The quotation, the order, the challan, and the bill sit on the same party. Money in is matched to invoices. Money out is matched to supplier bills.",
    blocks: [
      {
        claims: [
          { id: "L01", text: "We can raise a quotation." },
          { id: "L02", text: "We can take a sales order." },
          { id: "L03", text: "We can dispatch goods on a delivery note." },
          { id: "L04", text: "We can raise a tax invoice. GST fields on that invoice are not a live demonstration." },
          { id: "L05", text: "We can record money received and match it to invoices." },
          { id: "L06", text: "We can see who owes money, and how old it is." },
          { id: "L07", text: "We can ask a supplier for a price." },
          { id: "L08", text: "We can place a purchase order." },
          { id: "L09", text: "We can record goods inward on a purchase receipt." },
          { id: "L10", text: "We can book a supplier bill." },
          { id: "L11", text: "We can see what the business owes suppliers." },
        ],
      },
    ],
  },
  manufacturing: {
    path: "/solutions/manufacturing",
    intro: "A bill of materials names what goes into a finished good. A work order and a job card are the shop-floor record. A notebook is not.",
    blocks: [
      {
        claims: [
          { id: "L20", text: "We can define a bill of materials, plan production, and run a work order with a job card." },
          { id: "L21", text: "We can send material to a job worker and receive it back." },
        ],
      },
    ],
  },
  "hr-payroll": {
    path: "/solutions/hr-payroll",
    intro: "An employee record, attendance, leave, and a printed salary slip. Deduction of PF or ESI on that slip is not a claim.",
    blocks: [
      {
        claims: [
          { id: "L31", text: "We can keep an employee, mark attendance, apply leave, and print a salary slip." },
        ],
      },
    ],
    limit: {
      id: "L43",
      text: "PF or ESI deducted on the salary slip is not a claim. Registers exist. The deduction path was not traced.",
    },
  },
  crm: {
    path: "/solutions/crm",
    intro: "A lead you can open has a name, a phone, an email, an organisation, a source, and a status. A deal moves through a pipeline. That is the claim. Extra marketing fields are not.",
    blocks: [
      {
        claims: [
          { id: "L30", text: "We can keep a lead with name, phone, email, organisation, source, and status, and move a deal through a pipeline." },
        ],
      },
    ],
    limit: {
      id: "L44",
      text: "The product lead does not store UTM, consent time, assessment score, or a calculator result. The marketing form may collect those for the audit call. That is not the product CRM.",
    },
  },
  pos: {
    path: "/solutions/pos",
    intro: "A counter bill and a shift close exist in the product. They are not in this year's offer until the owner confirms the flagship list.",
    blocks: [
      {
        paragraphs: [
          "The desk can raise a POS invoice, keep a POS profile, and close a shift. That file is in the checkout.",
          "This page exists so a reader is not left guessing. It is not an invitation to buy a counter this year.",
        ],
      },
    ],
    limit: {
      id: "L51",
      text: "POS Invoice exists in the checkout. It is not in this offer until the owner confirms the flagship list.",
    },
  },
};

export const industries: Record<
  string,
  { path: string; scenario: string; blocks: BodyBlock[]; limit?: { id: string; text: string } }
> = {
  trading: {
    path: "/industries/trading",
    scenario:
      "Illustrative. A trading firm with two godowns, an owner, and one accountant. Stock lives in a sheet. Opening bills live in another. There is no desktop-company reader.",
    blocks: [
      {
        claims: [
          { id: "L14", text: "We can see stock in each godown." },
          { id: "L26", text: "We can import customers, items, and other importable masters from a spreadsheet." },
          { id: "L29", text: "We can create opening sales and purchase invoices." },
          { id: "L16", text: "We can correct stock after a count, including opening stock. This is not a desktop-company import." },
        ],
      },
    ],
    limit: {
      id: "L39",
      text: "There is no desktop accounts-company reader. The setup wizard only stores a word for the old system.",
    },
  },
  manufacturing: {
    path: "/industries/manufacturing",
    scenario:
      "Illustrative. A small factory that already knows the mix for a finished good. The accounts book and the factory book can be the same book. GST paperwork is in the product and is not a live portal demonstration.",
    blocks: [
      {
        claims: [
          { id: "L20", text: "We can define a bill of materials, plan production, and run a work order with a job card." },
          { id: "L21", text: "We can send material to a job worker and receive it back." },
          { id: "L23", text: "We can pass a journal and read the general ledger, trial balance, profit and loss, and balance sheet." },
        ],
      },
    ],
    limit: {
      id: "L45",
      text: "A live GST portal demonstration is not offered yet.",
    },
  },
  pharma: {
    path: "/industries/pharma",
    scenario:
      "Illustrative. A chemist counter with batch-tracked stock. This is not a named chemist product, and it is not the first call.",
    blocks: [
      {
        claims: [
          { id: "L17", text: "We can track batches and serial numbers." },
          { id: "L12", text: "We can keep an item master." },
          { id: "L04", text: "We can raise a tax invoice. GST fields on that invoice are not a live demonstration." },
        ],
      },
    ],
  },
  logistics: {
    path: "/industries/logistics",
    scenario:
      "Illustrative. A transporter who bills parties and, if they hold inventory, keeps stock. A fleet product on another bench is not this offer.",
    blocks: [
      {
        claims: [
          { id: "L04", text: "We can raise a tax invoice." },
          { id: "L06", text: "We can see who owes money, and how old it is." },
          { id: "L14", text: "We can see stock in each godown when the firm holds inventory." },
        ],
      },
    ],
    limit: {
      id: "L52",
      text: "A separate fleet product is not in this offer.",
    },
  },
  retail: {
    path: "/industries/retail",
    scenario:
      "Illustrative. More than one shop, treated as godowns, with stock and invoices. A counter bill exists in the product. It is not in this offer yet.",
    blocks: [
      {
        claims: [
          { id: "L14", text: "We can see stock in each godown." },
          { id: "L04", text: "We can raise a tax invoice." },
        ],
      },
    ],
    limit: {
      id: "L51",
      text: "POS Invoice exists. It is not in this offer until the owner confirms it.",
    },
  },
  services: {
    path: "/industries/services",
    scenario:
      "Illustrative. A service firm that quotes, invoices, and collects. There is no project module in this offer until the owner adds it.",
    blocks: [
      {
        claims: [
          { id: "L01", text: "We can raise a quotation." },
          { id: "L04", text: "We can raise a tax invoice." },
          { id: "L06", text: "We can see who owes money, and how old it is." },
        ],
      },
    ],
    limit: {
      id: "L52",
      text: "Projects, assets, helpdesk, and the other extra modules are not in this offer until the owner adds them.",
    },
  },
};

export const glossary = [
  { term: "GST", text: "Goods and Services Tax. Paperwork the product can prepare. A live portal demonstration is not offered yet." },
  { term: "HSN", text: "Harmonized System of Nomenclature. A code stored on an item. Not a live GST demonstration." },
  { term: "SAC", text: "Services Accounting Code. Stored the same way as HSN." },
  { term: "e-way bill", text: "A movement document. Generated from a delivery note, invoice, or stock document. Not from a quotation or a sales order. Not a live demonstration." },
  { term: "e-invoice", text: "An IRN generated from a sales invoice, with GST settings and the e-invoice API. Not from a sales order." },
  { term: "BOM", text: "Bill of materials. What goes into a finished good." },
  { term: "FIFO", text: "First in, first out. One of three stock valuation methods the company can pick, with moving average and LIFO." },
  { term: "GSTR-3B", text: "A return the product can prepare and download as JSON or Excel. Portal save, submit, and file are not a claim." },
  { term: "Godown", text: "A named warehouse. Stock is a quantity in that place." },
  { term: "Challan", text: "On this site, the delivery note: goods leaving a godown." },
];
