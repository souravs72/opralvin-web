import { useState } from "react";
import { DEPTS, FAQ, CONTACT } from "../data.js";
import SlidingTabs from "../ui/SlidingTabs.jsx";

/* ---------------- We shape it around you ---------------- */
const SHAPES = [
  { id: "forms", label: "Your forms", text: "Batch numbers, vehicle numbers, site names. Those fields sit on the order screen, next to the customer and the item." },
  { id: "approvals", label: "Your approvals", text: "Set the rules once. Big purchases reach the owner, big discounts reach a manager, and the rest post without a chase." },
  { id: "numbers", label: "Your numbers", text: "Sales, stock and cash on one screen, updated as work happens." },
  { id: "routine", label: "Your routine", text: "Payment reminders, low-stock alerts and the morning report go out on your schedule." },
  { id: "people", label: "Your people", text: "Each role sees the screens for its job. New staff start on day one." },
];

function ShapePanel({ id }) {
  if (id === "forms")
    return (
      <div className="ui" data-ui key={id}>
        <p className="ui-h">Sales order SO-0001</p>
        <div className="fld"><span>Customer</span><b>Riverside Metals</b></div>
        <div className="fld"><span>Item</span><b>12 mm steel rod, 10 units</b></div>
        {[["Batch no.", "B-2410"], ["Vehicle no.", "MH 12 AB 4521"], ["Site", "Pune Plant"]].map(([k, v], i) => (
          <div className="fld new enter" style={{ animationDelay: `${120 + i * 90}ms` }} key={k}><span>{k}</span><b>{v}</b></div>
        ))}
      </div>
    );
  if (id === "approvals")
    return (
      <div className="ui" data-ui key={id}>
        <p className="ui-h">Approval rules</p>
        <div className="rule"><span>Purchase above ₹50,000</span><b>Owner</b></div>
        <div className="rule"><span>Discount above 10%</span><b>Manager</b></div>
        <div className="req enter" style={{ animationDelay: "120ms" }}>
          <div>
            <b>Purchase PO-0042</b>
            <span>₹75,000, sent to Owner</span>
          </div>
          <em className="ok">Approved</em>
        </div>
        <div className="req enter" style={{ animationDelay: "220ms" }}>
          <div>
            <b>Discount on SO-0001</b>
            <span>15%, sent to Manager</span>
          </div>
          <em className="wait">With manager</em>
        </div>
      </div>
    );
  if (id === "numbers") {
    const bars = [42, 54, 49, 68, 78, 100];
    return (
      <div className="ui" data-ui key={id}>
        <div className="ui-row"><p className="ui-h">Sales, last six weeks</p><span className="ui-note">Sample</span></div>
        <div className="bars">{bars.map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }} />)}</div>
      </div>
    );
  }
  if (id === "routine")
    return (
      <div className="ui" data-ui key={id}>
        <p className="ui-h">On your schedule</p>
        {[["Payment reminder", "Riverside Metals, ₹59,000 due 30 Oct", "8:00 AM"], ["Low stock alert", "12 mm steel rod, 8 units left", "8:15 AM"], ["Daily sales report", "To the owner", "9:00 AM"]].map(([a, b, c], i) => (
          <div className="note enter" style={{ animationDelay: `${100 + i * 110}ms` }} key={a}><div><b>{a}</b><span>{b}</span></div><time>{c}</time></div>
        ))}
      </div>
    );
  return (
    <div className="ui" data-ui key={id}>
      <p className="ui-h">Who sees what</p>
      {[["Owner", "Everything"], ["Accounts", "Finance only"], ["Store", "Stock only"], ["Sales team", "Customers and orders"]].map(([a, b], i) => (
        <div className="role enter" style={{ animationDelay: `${80 + i * 80}ms` }} key={a}><b>{a}</b><span>{b}</span></div>
      ))}
    </div>
  );
}

export function Shape() {
  const [cur, setCur] = useState("forms");
  const c = SHAPES.find((s) => s.id === cur);
  return (
    <section className="shape band" id="shape" aria-labelledby="h-shape">
      <div className="wrap plate" data-tilt>
      <div className="shape-head">
        <h2 id="h-shape">We shape it around how you already post.</h2>
        <p>
          The audit writes down who takes the order, who approves it, and which report you open in the morning. The screens follow that note.
        </p>
      </div>
      <div className="shape-grid">
        <SlidingTabs label="What we customise" current={cur}>
          {SHAPES.map((s) => (
            <button key={s.id} role="tab" id={`tab-${s.id}`} aria-selected={cur === s.id} aria-controls="shape-panel" className="tab" onClick={() => setCur(s.id)}>
              {s.label}
            </button>
          ))}
        </SlidingTabs>
        <div className="shape-stage" role="tabpanel" id="shape-panel" aria-labelledby={`tab-${cur}`}>
          <ShapePanel id={cur} />
          <p className="shape-text" key={cur}>{c.text}</p>
        </div>
      </div>
      </div>
    </section>
  );
}

/* ---------------- Documents ---------------- */
function Items() {
  return (
    <table>
      <thead><tr><th>Item</th><th className="n">Qty</th><th className="n">Rate</th><th className="n">Amount</th></tr></thead>
      <tbody>
        <tr><td>12 mm steel rod</td><td className="n">10</td><td className="n">₹5,000</td><td className="n">₹50,000</td></tr>
        <tr><td>CGST 9%</td><td /><td /><td className="n">₹4,500</td></tr>
        <tr><td>SGST 9%</td><td /><td /><td className="n">₹4,500</td></tr>
        <tr className="tot"><td>Total</td><td /><td /><td className="n">₹59,000</td></tr>
      </tbody>
    </table>
  );
}
function Head({ kind, no, date, to = "Bill to" }) {
  return (
    <>
      <div className="dh"><b className="co">Northline</b><span className="kind">{kind}<br /><small>{no}</small></span></div>
      <div className="meta"><div>{to}<b>Riverside Metals</b></div><div>Date<b>{date}</b></div><div>GSTIN<b>27ABCDE1234F1Z5</b></div><div>Place of supply<b>Maharashtra (27)</b></div></div>
    </>
  );
}
const DOCS = [
  { id: "inv", name: "Tax invoice", w: 560, body: () => (<><Head kind="TAX INVOICE" no="SINV-0001" date="24 Oct 2026" /><Items /><p className="words">Rupees fifty-nine thousand only. Sample.</p></>) },
  { id: "quo", name: "Quotation", w: 560, body: () => (<><Head kind="QUOTATION" no="QTN-0001" date="20 Oct 2026" to="For" /><Items /><p className="words">Valid until 3 Nov 2026. Delivery within 5 working days.</p></>) },
  { id: "dc", name: "Delivery note", w: 460, body: () => (<><div className="dh"><b className="co">Northline</b><span className="kind">Delivery note<br /><small>DN-0001</small></span></div><div className="meta"><div>Deliver to<b>Riverside Metals</b></div><div>Date<b>24 Oct 2026</b></div><div>Vehicle no.<b>MH 12 AB 4521</b></div><div>Batch<b>B-2410</b></div></div><table><thead><tr><th>Item</th><th className="n">Qty</th></tr></thead><tbody><tr><td>12 mm steel rod</td><td className="n">10</td></tr><tr className="tot"><td>Total units</td><td className="n">10</td></tr></tbody></table><p className="words">Received in good condition: ______________</p></>) },
          { id: "pr", name: "Purchase receipt", w: 560, body: () => (<><div className="dh"><b className="co">Northline</b><span className="kind">Purchase receipt<br /><small>PR-0001</small></span></div><div className="meta"><div>Supplier<b>Apex Mills</b></div><div>Date<b>24 Oct 2026</b></div><div>Accepted warehouse<b>Main</b></div><div>Batch<b>B-2410</b></div></div><table><thead><tr><th>Item</th><th className="n">Qty</th><th className="n">Amount</th></tr></thead><tbody><tr><td>12 mm steel rod</td><td className="n">10</td><td className="n">₹50,000</td></tr><tr className="tot"><td>Total quantity</td><td className="n">10</td><td className="n">₹50,000</td></tr></tbody></table><p className="words">Sample. Quantity and value post together. Freight is a landed cost voucher.</p></>) },
  { id: "rem", name: "Payment reminder", w: 460, body: () => (<div className="mail"><div className="mh"><span>From <b>Accounts, Northline</b></span><span>To <b>Riverside Metals</b></span><span>Subject <b>Payment due on 30 Oct: SINV-0001</b></span></div><p>Dear Riverside Metals,</p><p>Invoice SINV-0001 for ₹59,000 is due on 30 October 2026.</p><p>Regards,<br />Accounts, Northline</p></div>) },
  { id: "rep", name: "Daily sales report", w: 380, body: () => (<><div className="dh"><b className="co">Daily sales</b><span className="kind">24 Oct 2026<br /><small>Sample</small></span></div><div className="kpis two"><div><b>₹1,84,000</b><span>Sales today</span></div><div><b>7</b><span>Orders</span></div><div><b>₹1,12,500</b><span>Collected</span></div><div><b>2</b><span>Low on stock</span></div></div></>) },
];
export function Docs() {
  const [cur, setCur] = useState("inv");
  const d = DOCS.find((x) => x.id === cur);
  return (
    <section className="docs band" id="docs" aria-labelledby="h-docs">
      <div className="wrap plate docs-plate" data-tilt>
      <div className="docs-left">
        <h2 id="h-docs">The papers a buyer already asks for.</h2>
        <p>
          An e-invoice is raised from the sales invoice. A sales order cannot raise one.
        </p>
        <div className="outs" role="group" aria-label="Documents">
          {DOCS.map((x) => (
            <button key={x.id} className="out" aria-pressed={cur === x.id} onClick={() => setCur(x.id)}>{x.name}</button>
          ))}
        </div>
      </div>
      <div className="dstage">
        <div className="doc enter" data-ui key={cur}>{d.body()}</div>
      </div>
      </div>
    </section>
  );
}

/* ---------------- One posting ---------------- */
export function Ledger() {
  return (
    <section className="ledger band" id="ledger" aria-labelledby="h-ledger">
      <div className="wrap ledger-plate">
        <div className="ledger-head">
          <h2 id="h-ledger">One receipt.</h2>
          <p>Quantity and value post together.</p>
        </div>
        <div className="posting" data-ui>
          <article className="voucher">
            <div className="dh">
              <b className="co">Northline</b>
              <span className="kind">Purchase receipt<br /><small>PR-0001</small></span>
            </div>
            <div className="meta">
              <div>Supplier<b>Apex Mills</b></div>
              <div>Date<b>24 Oct 2026</b></div>
              <div>Accepted warehouse<b>Main</b></div>
              <div>Batch<b>B-2410</b></div>
            </div>
            <table>
              <thead><tr><th>Item</th><th className="n">Qty</th><th className="n">Amount</th></tr></thead>
              <tbody>
                <tr><td>12 mm steel rod</td><td className="n">10</td><td className="n">₹50,000</td></tr>
                <tr className="tot"><td>Received</td><td className="n">10</td><td className="n">₹50,000</td></tr>
              </tbody>
            </table>
          </article>
          <div className="post-targets">
            <div>
              <p>Stock ledger</p>
              <p className="amt">+10</p>
              <p>Main. Inward.</p>
            </div>
            <div>
              <p>General ledger</p>
              <p className="amt">₹50,000</p>
              <p>Stock in hand.</p>
            </div>
          </div>
        </div>
        <p className="words">Sample. Freight is a landed cost voucher. A count is a stock reconciliation.</p>
      </div>
    </section>
  );
}

/* ---------------- School ---------------- */
const SCHOOLS = [
  {
    id: "record",
    label: "One student",
    text: "The office enters the child once. An approved applicant becomes the student. Attendance, the grade book, and the fee invoice use that record.",
  },
  {
    id: "term",
    label: "The term",
    text: "A batch can be marked present, late, or absent. An assessment plan and a grade book hold the marks. A report can be generated from that book.",
  },
  {
    id: "fees",
    label: "Fees",
    text: "A fee schedule can raise a sales invoice for each student on it. That invoice is the same books as every other sale. Hostel rent can be invoiced from an allocation.",
  },
  {
    id: "portal",
    label: "Signed in",
    text: "A logged-in student can open schedule, attendance, grades, and fee invoices, and can download an invoice that is already paid. Paying on that screen needs a gateway the school already has.",
  },
];

function SchoolPanel({ id }) {
  if (id === "record")
    return (
      <div className="ui" data-ui key={id}>
        <div className="ui-row"><p className="ui-h">Student record</p><span className="ui-note">Sample</span></div>
        {[["Applicant", "Grade 6, form received"], ["Student", "Diya P., guardians linked"], ["Batch", "Grade 6-A"], ["Ceremony", "Guest limit and documents"]].map(([k, v]) => (
          <div className="fld" key={k}><span>{k}</span><b>{v}</b></div>
        ))}
      </div>
    );
  if (id === "term")
    return (
      <div className="ui" data-ui key={id}>
        <div className="ui-row"><p className="ui-h">Grade 6-A, today</p><span className="ui-note">Sample</span></div>
        {[["Aarav S.", "Present"], ["Diya P.", "Present"], ["Kabir M.", "Absent, leave approved"], ["Meera N.", "Late"]].map(([k, v]) => (
          <div className="role" key={k}><b>{k}</b><span>{v}</span></div>
        ))}
      </div>
    );
  if (id === "fees")
    return (
      <div className="ui" data-ui key={id}>
        <div className="ui-row"><p className="ui-h">Fee schedule to invoice</p><span className="ui-note">Sample</span></div>
        {[["Structure", "Program and components"], ["Schedule", "This term, this batch"], ["Invoice", "One sales invoice per student"], ["Books", "The same general ledger"]].map(([k, v]) => (
          <div className="fld" key={k}><span>{k}</span><b>{v}</b></div>
        ))}
      </div>
    );
  return (
    <div className="ui" data-ui key={id}>
      <div className="ui-row"><p className="ui-h">Diya P., Grade 6-A</p><span className="ui-note">Sample</span></div>
      {[["Schedule", "This week"], ["Attendance", "Open"], ["Grades", "Open"], ["Fees", "Invoice, download if paid"]].map(([k, v]) => (
        <div className="role" key={k}><b>{k}</b><span>{v}</span></div>
      ))}
    </div>
  );
}

export function School() {
  const [cur, setCur] = useState("record");
  const c = SCHOOLS.find((s) => s.id === cur);
  return (
    <section className="school band" id="school" aria-labelledby="h-school">
      <div className="wrap plate" data-tilt>
        <div className="shape-head">
          <h2 id="h-school">One student record.</h2>
          <p>
            Admission, attendance, the grade book, and the fee invoice share one student record. A salary slip can sit in the same company.
          </p>
        </div>
        <div className="shape-grid">
          <div className="tabs" role="tablist" aria-label="What a school keeps on one record">
            {SCHOOLS.map((s) => (
              <button key={s.id} role="tab" id={`school-tab-${s.id}`} aria-selected={cur === s.id} aria-controls="school-panel" className="tab" onClick={() => setCur(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="shape-stage" role="tabpanel" id="school-panel" aria-labelledby={`school-tab-${cur}`}>
            <SchoolPanel id={cur} />
            <p className="shape-text" key={cur}>{c.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- How we work ---------------- */
const STEPS = [
  ["Sit with the people who post.", "Who takes the order, who approves it, and which register they write in. That meeting is the free process audit."],
  ["Shape the books.", "Your fields, approval rules, document formats, and the reports you check every morning."],
  ["Bring the opening balances.", "Opening invoices, opening stock, and a chart of accounts come from a spreadsheet. Each role then learns its screens."],
  ["Stay on, in writing.", "Support hours are agreed in writing."],
];
export function Rollout() {
  return (
    <section className="rollout band" id="how" aria-labelledby="h-how">
      <div className="wrap plate rollout-plate">
        <h2 id="h-how">How we work.</h2>
        <div className="steps">
          {STEPS.map(([a, b], i) => (
            <div className="step" key={a}>
              <p className="s"><span>{i + 1}</span>{a}</p>
              <p className="d">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Founder ---------------- */
export function Letter() {
  return (
    <section className="letter band" id="letter" aria-labelledby="h-letter">
      <div className="wrap letter-mosaic">
        <div className="letter-in">
          <h2 id="h-letter">From the founder.</h2>
          <p>
            I posted books, then built the system around that posting. Opralvin One keeps the warehouse and the books on one record. A school can keep the student and the fees there too.
          </p>
          <p>The first meeting is a free process audit. Paid work is a day rate for the days we agree.</p>
          <div className="sign"><span className="avatar" aria-hidden="true">SS</span><div><b>Sourav Singh</b><span>Founder, Opralvin Technologies</span></div></div>
        </div>
        <aside className="letter-facts" aria-label="Setup times we commit to in writing">
          <p><b>30 days</b><span>to an invoice</span></p>
          <p><b>60 days</b><span>to stock that matches a count</span></p>
          <p><b>90 days</b><span>to a signed limit list</span></p>
        </aside>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Questions() {
  return (
    <section className="faq" id="faq" aria-labelledby="h-faq">
      <div className="faq-head">
        <div className="wrap">
          <h2 id="h-faq">Questions owners ask.</h2>
        </div>
      </div>
      {FAQ.map(([q, a], i) => (
        <article className="faq-band" key={q} data-tone={i % 2 === 0 ? "sheet" : "ground"}>
          <div className="wrap faq-row">
            <h3>{q}</h3>
            <p>{a}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

/* ---------------- Book (the live thing) ---------------- */
export function Book() {
  const [picked, setPicked] = useState(["Sales", "Stock", "Accounts"]);
  const [note, setNote] = useState("");
  const toggle = (n) => setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const req = `Hello Opralvin, I would like a free process audit.\nDesks we run: ${picked.length ? picked.join(", ") : "not chosen yet"}.`;
  const mail = CONTACT.includes("{{")
    ? "#book"
    : `mailto:${CONTACT}?subject=${encodeURIComponent("Free process audit")}&body=${encodeURIComponent(req)}`;
  const copy = () => {
    const done = () => setNote("Copied. Paste it into an email or WhatsApp.");
    try {
      const dest = CONTACT.includes("{{") ? "the public address, once it is set" : CONTACT;
      navigator.clipboard.writeText(req).then(done, () => setNote(`Select the text above and copy it, then send it to ${dest}.`));
    } catch {
      const dest = CONTACT.includes("{{") ? "the public address, once it is set" : CONTACT;
      setNote(`Select the text above and copy it, then send it to ${dest}.`);
    }
  };
  return (
    <section className="book band" id="book" aria-labelledby="h-book">
      <div className="wrap book-close">
        <h2 id="h-book">Book a free process audit.</h2>
        <p className="lead">The audit is free. Paid work is a day rate for the days we agree. Mark the desks you run today so we know who to sit with.</p>
      </div>
      <div className="wrap book-in">
        <div className="book-right">
          <fieldset className="depts">
            <legend className="sr">Departments you run</legend>
            {DEPTS.map((d) => (
              <label className="dept" key={d.id}>
                <input type="checkbox" checked={picked.includes(d.name)} onChange={() => toggle(d.name)} />
                <span>{d.name}</span>
              </label>
            ))}
          </fieldset>
          <div className="req-box">
            <pre aria-live="polite">{req}</pre>
            <div className="acts">
              <a className="btn amber" href={mail}>Email this request</a>
              <button type="button" className="btn ghost" onClick={copy}>Copy request</button>
            </div>
            {CONTACT.includes("{{") ? (
              <p className="small">Copy the request and send it. The address is added when this page is published. {note}</p>
            ) : (
              <p className="small">Or write to <span className="sel">{CONTACT}</span>. {note}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="foot" id="foot">
      <div className="wrap foot-in">
        <p className="wordmark">Opralvin</p>
        <div className="foot-row">
          <div className="foot-places">
            <p className="foot-tag">Simplify Today. Grow Tomorrow.</p>
            <a href="#book">Book a free process audit</a>
            <span>Sourav Singh</span>
          </div>
          <nav aria-label="Footer">
            <a href="#story">Start</a>
            <a href="#shape">What we change</a>
            <a href="#ledger">One posting</a>
            <a href="#school">Schools</a>
            <a href="#docs">The papers</a>
            <a href="#how">How we work</a>
          </nav>
        </div>
        <div className="legal">
          <span>© 2026 Opralvin Technologies</span>
          <a href="#story">Back to start</a>
          <span>Sample names and figures on this page are illustrative.</span>
        </div>
      </div>
    </footer>
  );
}
