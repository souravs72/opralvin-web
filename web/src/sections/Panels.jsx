import { useState } from "react";

function Items() {
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th className="n">Qty</th>
          <th className="n">Rate</th>
          <th className="n">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>A36 steel bar</td>
          <td className="n">10</td>
          <td className="n">$5,000</td>
          <td className="n">$50,000</td>
        </tr>
        <tr>
          <td>Ohio sales tax 6%</td>
          <td />
          <td />
          <td className="n">$3,000</td>
        </tr>
        <tr className="tot">
          <td>Total</td>
          <td />
          <td />
          <td className="n">$53,000</td>
        </tr>
      </tbody>
    </table>
  );
}

function Head({ kind, no, date, to = "Bill to" }) {
  return (
    <>
      <div className="dh">
        <b className="co">Harborline</b>
        <span className="kind">
          {kind}
          <br />
          <small>{no}</small>
        </span>
      </div>
      <div className="meta">
        <div>
          {to}
          <b>Riverside Metals</b>
        </div>
        <div>
          Date<b>{date}</b>
        </div>
        <div>
          Ship from<b>Cleveland, OH</b>
        </div>
        <div>
          Ship to<b>Ohio</b>
        </div>
      </div>
    </>
  );
}

const DOCS = [
  {
    id: "inv",
    name: "Invoice",
    body: () => (
      <>
        <Head kind="INVOICE" no="INV-0001" date="Nov 10, 2026" />
        <Items />
        <p className="words">Sample. Fifty-three thousand dollars even.</p>
      </>
    ),
  },
  {
    id: "quo",
    name: "Quote",
    body: () => (
      <>
        <Head kind="QUOTE" no="QTN-0001" date="Nov 6, 2026" to="For" />
        <Items />
        <p className="words">Valid until Nov 20, 2026. Ship within 5 business days.</p>
      </>
    ),
  },
  {
    id: "dc",
    name: "Packing slip",
    body: () => (
      <>
        <div className="dh">
          <b className="co">Harborline</b>
          <span className="kind">
            Packing slip
            <br />
            <small>PS-0001</small>
          </span>
        </div>
        <div className="meta">
          <div>
            Ship to<b>Riverside Metals</b>
          </div>
          <div>
            Date<b>Nov 10, 2026</b>
          </div>
          <div>
            Trailer<b>OH-G42-1844</b>
          </div>
          <div>
            Lot<b>B-2410</b>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th className="n">Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A36 steel bar</td>
              <td className="n">10</td>
            </tr>
            <tr className="tot">
              <td>Total units</td>
              <td className="n">10</td>
            </tr>
          </tbody>
        </table>
        <p className="words">Received in good condition: ______________</p>
      </>
    ),
  },
  {
    id: "pr",
    name: "Purchase receipt",
    body: () => (
      <>
        <div className="dh">
          <b className="co">Harborline</b>
          <span className="kind">
            Purchase receipt
            <br />
            <small>PR-0001</small>
          </span>
        </div>
        <div className="meta">
          <div>
            Supplier<b>Apex Mill</b>
          </div>
          <div>
            Date<b>Nov 10, 2026</b>
          </div>
          <div>
            Warehouse<b>Main</b>
          </div>
          <div>
            Lot<b>B-2410</b>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th className="n">Qty</th>
              <th className="n">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A36 steel bar</td>
              <td className="n">10</td>
              <td className="n">$50,000</td>
            </tr>
            <tr className="tot">
              <td>Total quantity</td>
              <td className="n">10</td>
              <td className="n">$50,000</td>
            </tr>
          </tbody>
        </table>
        <p className="words">Sample. Quantity and value post together. Freight is a landed-cost voucher.</p>
      </>
    ),
  },
  {
    id: "rem",
    name: "Payment reminder",
    body: () => (
      <div className="mail">
        <div className="mh">
          <span>
            From <b>Accounts, Harborline</b>
          </span>
          <span>
            To <b>Riverside Metals</b>
          </span>
          <span>
            Subject <b>Payment due Nov 24: INV-0001</b>
          </span>
        </div>
        <p>Dear Riverside Metals,</p>
        <p>Invoice INV-0001 for $53,000 is due on November 24, 2026.</p>
        <p>
          Regards,
          <br />
          Accounts, Harborline
        </p>
      </div>
    ),
  },
  {
    id: "pay",
    name: "Pay stub",
    body: () => (
      <>
        <div className="dh">
          <b className="co">Harborline</b>
          <span className="kind">
            Pay stub
            <br />
            <small>Oct 2026 · Sample</small>
          </span>
        </div>
        <div className="meta">
          <div>
            Employee<b>J. Hale</b>
          </div>
          <div>
            Days present<b>22</b>
          </div>
          <div>
            Gross<b>$4,800</b>
          </div>
          <div>
            Net<b>$3,610</b>
          </div>
        </div>
        <p className="words">When payroll is included, the stub and time share the employee. W-2 and 1099 sit on the same run.</p>
      </>
    ),
  },
];

export function DocsStage() {
  const [cur, setCur] = useState("inv");
  const d = DOCS.find((x) => x.id === cur);
  return (
    <div className="docs-plate">
      <div className="outs" role="group" aria-label="Documents">
        {DOCS.map((x) => (
          <button key={x.id} className="out" aria-pressed={cur === x.id} onClick={() => setCur(x.id)}>
            {x.name}
          </button>
        ))}
      </div>
      <div className="dstage">
        <div className="doc enter" data-ui key={cur}>
          {d.body()}
        </div>
      </div>
    </div>
  );
}

export function ShapePanel({ id }) {
  if (id === "forms")
    return (
      <div className="ui" data-ui key={id}>
        <p className="ui-h">Sales order SO-0001</p>
        <div className="fld">
          <span>Customer</span>
          <b>Riverside Metals</b>
        </div>
        <div className="fld">
          <span>Item</span>
          <b>A36 steel bar, 10 units</b>
        </div>
        {[["Lot no.", "B-2410"], ["Trailer", "OH-G42-1844"], ["Site", "Cleveland Plant"]].map(([k, v], i) => (
          <div className="fld new enter" style={{ animationDelay: `${120 + i * 90}ms` }} key={k}>
            <span>{k}</span>
            <b>{v}</b>
          </div>
        ))}
      </div>
    );
  if (id === "approvals")
    return (
      <div className="ui" data-ui key={id}>
        <p className="ui-h">Approval rules</p>
        <div className="rule">
          <span>Purchase above $50,000</span>
          <b>Owner</b>
        </div>
        <div className="rule">
          <span>Discount above 10%</span>
          <b>Manager</b>
        </div>
        <div className="req enter" style={{ animationDelay: "120ms" }}>
          <div>
            <b>Purchase PO-0042</b>
            <span>$75,000, sent to Owner</span>
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
        <div className="ui-row">
          <p className="ui-h">Sales, last six weeks</p>
          <span className="ui-note">Sample</span>
        </div>
        <div className="bars">
          {bars.map((h, i) => (
            <i key={i} style={{ height: `${h}%`, animationDelay: `${i * 60}ms` }} />
          ))}
        </div>
      </div>
    );
  }
  if (id === "routine")
    return (
      <div className="ui" data-ui key={id}>
        <p className="ui-h">On your schedule</p>
        {[
          ["Payment reminder", "Riverside Metals, $53,000 due Nov 24", "8:00 AM"],
          ["Low stock alert", "A36 steel bar, 8 units left", "8:15 AM"],
          ["Daily sales report", "To the owner", "9:00 AM"],
        ].map(([a, b, c], i) => (
          <div className="note enter" style={{ animationDelay: `${100 + i * 110}ms` }} key={a}>
            <div>
              <b>{a}</b>
              <span>{b}</span>
            </div>
            <time>{c}</time>
          </div>
        ))}
      </div>
    );
  return (
    <div className="ui" data-ui key={id}>
      <p className="ui-h">Who sees what</p>
      {[
        ["Owner", "Everything"],
        ["Accounts", "Finance only"],
        ["Warehouse", "Stock only"],
        ["Sales team", "Customers and orders"],
      ].map(([a, b], i) => (
        <div className="role enter" style={{ animationDelay: `${80 + i * 80}ms` }} key={a}>
          <b>{a}</b>
          <span>{b}</span>
        </div>
      ))}
    </div>
  );
}
