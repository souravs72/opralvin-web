import { useEffect, useRef, useState } from "react";
import { DEPTS, FAQ, CONTACT } from "../data.js";

/* ---------------- We shape it around you ---------------- */
const SHAPES = [
  { id: "forms", label: "Your forms", text: "We add the details your business actually tracks, like batch numbers, vehicle numbers or site names, right where your team enters them." },
  { id: "approvals", label: "Your approvals", text: "Set the rules once. Big purchases reach the owner, big discounts reach a manager, and everything else flows on without a chase." },
  { id: "numbers", label: "Your numbers", text: "Sales, stock and cash on one screen, updated as work happens, so decisions start from facts." },
  { id: "routine", label: "Your routine", text: "Payment reminders, low-stock alerts and the morning report go out on their own, on your schedule." },
  { id: "people", label: "Your people", text: "Every role sees exactly what it needs and nothing more. New staff get the screens for their job on day one." },
];

function ShapePanel({ id }) {
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    setSettled(false);
    const t = setTimeout(() => setSettled(true), 700);
    return () => clearTimeout(t);
  }, [id]);
  if (id === "forms")
    return (
      <div className="ui" data-ui key={id}>
        <p className="ui-h">Sales order SO-0001</p>
        <div className="fld"><span>Customer</span><b>Example Traders</b></div>
        <div className="fld"><span>Item</span><b>Steel Rod 12 mm, 10 units</b></div>
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
          <div><b>Purchase PO-0042</b><span>₹75,000, sent to Owner</span></div>
          <em className={settled ? "ok" : "wait"}>{settled ? "Approved" : "Waiting"}</em>
        </div>
        <div className="req enter" style={{ animationDelay: "220ms" }}>
          <div><b>Discount on SO-0001</b><span>15%, sent to Manager</span></div>
          <em className="wait">With manager</em>
        </div>
      </div>
    );
  if (id === "numbers") {
    const bars = [42, 54, 49, 68, 78, 100];
    return (
      <div className="ui" data-ui key={id}>
        <div className="ui-row"><p className="ui-h">Sales, last six weeks</p><span className="ui-note">Sample data</span></div>
        <div className="bars">{bars.map((h, i) => <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }} />)}</div>
        <div className="ui-row ui-note"><span>₹4.2 L</span><span>₹10.0 L this week</span></div>
        <div className="kpis">
          <div><b>₹1,84,000</b><span>Sales today</span></div>
          <div><b>₹1,12,500</b><span>Collected</span></div>
          <div><b>2</b><span>Items low on stock</span></div>
        </div>
      </div>
    );
  }
  if (id === "routine")
    return (
      <div className="ui" data-ui key={id}>
        <p className="ui-h">Sent today, automatically</p>
        {[["Payment reminder", "Example Traders, ₹59,000 due 30 Oct", "8:00 AM"], ["Low stock alert", "Steel Rod 12 mm, 8 units left", "8:15 AM"], ["Daily sales report", "To the owner", "9:00 AM"]].map(([a, b, c], i) => (
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
    <section className="shape wrap" id="shape" aria-labelledby="h-shape">
      <div className="shape-head">
        <h2 id="h-shape">We shape it around you.</h2>
        <p>Most software asks you to change how you work. We change the software instead. Pick one to see it.</p>
      </div>
      <div className="shape-grid">
        <div className="tabs" role="tablist" aria-label="What we customise">
          {SHAPES.map((s) => (
            <button key={s.id} role="tab" id={`tab-${s.id}`} aria-selected={cur === s.id} aria-controls="shape-panel" className="tab" onClick={() => setCur(s.id)} onMouseEnter={() => setCur(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="shape-stage" role="tabpanel" id="shape-panel" aria-labelledby={`tab-${cur}`}>
          <ShapePanel id={cur} />
          <p className="shape-text" key={cur}>{c.text}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Documents ---------------- */
const QR = Array.from({ length: 81 }, (_, i) => {
  const r = Math.floor(i / 9), c = i % 9;
  const finder = (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
  return finder ? !(r % 9 === 1 && (c === 1 || c === 7)) && !(r === 7 && c === 1) : (i * 37 + r * 11) % 7 < 3;
});
function Items() {
  return (
    <table>
      <thead><tr><th>Item</th><th className="n">Qty</th><th className="n">Rate</th><th className="n">Amount</th></tr></thead>
      <tbody>
        <tr><td>Steel Rod 12 mm</td><td className="n">10</td><td className="n">₹5,000</td><td className="n">₹50,000</td></tr>
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
      <div className="dh"><b className="co">Your Company Pvt. Ltd.</b><span className="kind">{kind}<br /><small>{no}</small></span></div>
      <div className="meta"><div>{to}<b>Example Traders</b></div><div>Date<b>{date}</b></div><div>GSTIN<b>27ABCDE1234F1Z5</b></div><div>Place of supply<b>Maharashtra (27)</b></div></div>
    </>
  );
}
const DOCS = [
  { id: "inv", name: "Tax invoice", w: 560, body: () => (<><Head kind="TAX INVOICE" no="SINV-0001" date="24 Oct 2026" /><Items /><p className="words">Rupees fifty-nine thousand only</p><div className="dfoot"><div className="qr" aria-hidden="true">{QR.map((on, i) => <i key={i} className={on ? "" : "o"} />)}</div><div className="irn"><span>Illustrative layout</span><span>Not a live GST document</span></div></div></>) },
  { id: "quo", name: "Quotation", w: 560, body: () => (<><Head kind="QUOTATION" no="QTN-0001" date="20 Oct 2026" to="For" /><Items /><p className="words">Valid until 3 Nov 2026. Delivery within 5 working days.</p></>) },
  { id: "dc", name: "Delivery challan", w: 460, body: () => (<><div className="dh"><b className="co">Your Company Pvt. Ltd.</b><span className="kind">DELIVERY CHALLAN<br /><small>DN-0001</small></span></div><div className="meta"><div>Deliver to<b>Example Traders</b></div><div>Date<b>24 Oct 2026</b></div><div>Vehicle no.<b>MH 12 AB 4521</b></div><div>Batch<b>B-2410</b></div></div><table><thead><tr><th>Item</th><th className="n">Qty</th></tr></thead><tbody><tr><td>Steel Rod 12 mm</td><td className="n">10</td></tr><tr className="tot"><td>Total units</td><td className="n">10</td></tr></tbody></table><p className="words">Received in good condition: ______________</p></>) },
  { id: "rem", name: "Payment reminder", w: 460, body: () => (<div className="mail"><div className="mh"><span>From <b>accounts@yourcompany.in</b></span><span>To <b>Example Traders</b></span><span>Subject <b>Payment due on 30 Oct: SINV-0001</b></span></div><p>Dear Example Traders,</p><p>This is a reminder that invoice SINV-0001 for ₹59,000 is due on 30 October 2026. The invoice is attached for your records.</p><p>If you have already paid, please ignore this message.</p><p>Regards,<br />Accounts, Your Company</p><p className="words">Illustrative reminder. Not a claim that messages send themselves.</p></div>) },
  { id: "rep", name: "Daily sales report", w: 380, body: () => (<><div className="dh"><b className="co">Daily sales</b><span className="kind">24 OCT 2026</span></div><div className="kpis two"><div><b>₹1,84,000</b><span>Sales today</span></div><div><b>7</b><span>Orders</span></div><div><b>₹1,12,500</b><span>Collected</span></div><div><b>2</b><span>Low on stock</span></div></div><p className="words">Sent to the owner at 9:00 AM. Sample figures.</p></>) },
];
export function Docs() {
  const [cur, setCur] = useState("inv");
  const d = DOCS.find((x) => x.id === cur);
  return (
    <section className="docs wrap" id="docs" aria-labelledby="h-docs">
      <div className="docs-left">
        <h2 id="h-docs">Your paperwork, already done.</h2>
        <p>These are illustrative layouts, not a live GST document. An e-invoice is not generated from the sales order. Pick one.</p>
        <div className="outs" role="group" aria-label="Documents">
          {DOCS.map((x) => (
            <button key={x.id} className="out" aria-pressed={cur === x.id} onClick={() => setCur(x.id)}>{x.name}</button>
          ))}
        </div>
      </div>
      <div className="dstage">
        <div className="doc enter" data-ui key={cur} style={{ width: d.w }}>{d.body()}</div>
      </div>
    </section>
  );
}

/* ---------------- Film ---------------- */
export function Film() {
  return (
    <section className="film" id="film" aria-labelledby="h-film">
      <div className="wrap film-in">
        <div className="film-copy">
          <h2 id="h-film">See it in two minutes.</h2>
          <p>Forms, approvals, documents, numbers and people, and what we do beyond the software.</p>
        </div>
        <video controls playsInline preload="metadata" poster="media/still-5.jpg" width="1920" height="1080">
          <source src="media/opralvin-pitch.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="wrap stills">
        <figure><img src="media/still-13.jpg" alt="Every business works differently: pricing, approvals, paperwork" width="1600" height="900" loading="lazy" /><figcaption>The problem: software that makes you work its way</figcaption></figure>
        <figure><img src="media/still-41.jpg" alt="A sales order with custom batch, vehicle and site fields" width="1600" height="900" loading="lazy" /><figcaption>Your forms, with the fields you track</figcaption></figure>
        <figure><img src="media/still-60.jpg" alt="An illustrative tax invoice layout, not a live GST document" width="1600" height="900" loading="lazy" /><figcaption>Illustrative document. Not a live GST demo.</figcaption></figure>
      </div>
    </section>
  );
}

/* ---------------- Rollout ---------------- */
const STEPS = [
  ["We sit with your team and map how work really moves.", "Who takes the order, who approves it, which register they write in. We learn the business before we touch the software."],
  ["We shape the system around what we saw.", "Your fields, approval rules, document formats and the reports you check every morning."],
  ["We move your data and train every person who uses it.", "The move is a spreadsheet import, opening invoices, opening stock, and a chart of accounts. There is no reader for a desktop company file. Each role learns the screens for its job."],
  ["We stay with you after go-live.", "Hosting and automatic backups are not a product claim yet. Support scope is agreed in writing before work starts."],
];
const ROWS = ["Study your business", "Design and customise", "Move data, train team", "Go live on secure cloud", "Ongoing support"];
export function Rollout() {
  const [cur, setCur] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setCur(+e.target.dataset.i)), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const state = (j) => (cur === 3 ? (j < 4 ? "done" : "now") : j < cur ? "done" : j === cur ? "now" : "");
  return (
    <section className="rollout wrap" id="how" aria-labelledby="h-how">
      <div className="steps">
        <h2 id="h-how">How we work.</h2>
        {STEPS.map(([a, b], i) => (
          <div className={`step ${cur === i ? "on" : ""}`} key={i} data-i={i} ref={(el) => (refs.current[i] = el)}>
            <p className="s">{a}</p>
            <p className="d">{b}</p>
          </div>
        ))}
      </div>
      <div className="pin">
        <div className="ui tracker" data-ui>
          <div className="ui-row"><p className="ui-h">Rollout plan</p><span className="ui-note">{["Starting", "Building", "Training", "Live"][cur]}</span></div>
          <div className="prog"><i style={{ transform: `scaleX(${[0.18, 0.45, 0.72, 1][cur]})` }} /></div>
          {ROWS.map((r, j) => (
            <div className={`trow ${state(j)}`} key={r}>
              <span className="tick" aria-hidden="true" />
              <span>{r}</span>
              <em>{state(j) === "done" ? "Done" : state(j) === "now" ? (j === 4 ? "Ongoing" : "In progress") : "Next"}</em>
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
    <section className="letter wrap" aria-labelledby="h-letter">
      <div className="letter-in">
        <h2 id="h-letter">Why Opralvin exists.</h2>
        <p>Every business has a vision to grow. But as it grows, managing finances, inventory, sales, employees and daily operations gets harder every month.</p>
        <p>I believe owners should spend less time managing that complexity and more time building their future. That is why I started Opralvin.</p>
        <p>Our mission is to make powerful business technology accessible, practical and valuable for businesses of every size. We don't stop at software: we implement it, shape it to your work, host it, and stay as your long-term technology partner.</p>
        <div className="sign"><span className="avatar" aria-hidden="true">SS</span><div><b>Sourav Singh</b><span>Founder, Opralvin Technologies</span></div></div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function Questions() {
  return (
    <section className="faq wrap" id="faq" aria-labelledby="h-faq">
      <h2 id="h-faq">Questions owners ask.</h2>
      <div className="qa">
        {FAQ.map(([q, a]) => (<p key={q}><b>{q}</b> {a}</p>))}
      </div>
    </section>
  );
}

/* ---------------- Book (the live thing) ---------------- */
export function Book() {
  const [picked, setPicked] = useState(["Sales", "Inventory", "Accounting"]);
  const [note, setNote] = useState("");
  const toggle = (n) => setPicked((p) => (p.includes(n) ? p.filter((x) => x !== n) : [...p, n]));
  const req = `Hello Opralvin, I'd like a free walkthrough.\nDepartments we run: ${picked.length ? picked.join(", ") : "not chosen yet"}.`;
  const mail = `mailto:${CONTACT}?subject=${encodeURIComponent("Free walkthrough request")}&body=${encodeURIComponent(req)}`;
  const copy = () => {
    const done = () => setNote("Copied. Paste it into an email or WhatsApp.");
    try {
      navigator.clipboard.writeText(req).then(done, () => setNote(`Select the text above and copy it, then send it to ${CONTACT}.`));
    } catch {
      setNote(`Select the text above and copy it, then send it to ${CONTACT}.`);
    }
  };
  return (
    <section className="book" id="book" aria-labelledby="h-book">
      <div className="wrap book-in">
        <div>
          <h2 id="h-book">Book a free walkthrough.</h2>
          <p className="lead">Tap the departments you run today. We'll show you Opralvin One set up around them, not a demo company.</p>
        </div>
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
            <p className="small">Or write to <span className="sel">{CONTACT}</span>. {note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <nav aria-label="Footer">
          <a href="#story">The model</a>
          <a href="#shape">What we shape</a>
          <a href="#docs">Documents</a>
          <a href="#film">Film</a>
          <a href="#how">How we work</a>
          <a href="#book">Book a walkthrough</a>
        </nav>
        <p className="foot-tag">Simplify today. Grow tomorrow.</p>
        <p className="wordmark" aria-hidden="true">Opralvin</p>
        <div className="legal"><span>© 2026 Opralvin Technologies</span><span>Sample names and figures on this page are illustrative.</span></div>
      </div>
    </footer>
  );
}
