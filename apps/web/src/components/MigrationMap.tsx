"use client";

import { useState } from "react";

const moves = [
  { id: "L26", label: "Parties and items from a spreadsheet" },
  { id: "L29", label: "Opening sales and purchase invoices" },
  { id: "L16", label: "Opening stock from a count" },
  { id: "L28", label: "Chart of accounts from the eight-column template" },
];

const stays = [
  { id: "L39", label: "A desktop accounts-company file. There is no reader." },
  { id: "L51", label: "A counter bill. Not in this offer yet." },
  { id: "L40", label: "An owner phone app for stock and receivables. Not in the product." },
];

export function MigrationMap() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  return (
    <div data-map="migration" className="grid gap-8 lg:grid-cols-2">
      <section>
        <h2 className="text-2xl">What we move</h2>
        <ul className="mt-4 space-y-3">
          {moves.map((row) => (
            <li key={row.id} data-claim={row.id}>
              <label className="flex gap-3">
                <input
                  type="checkbox"
                  checked={Boolean(checked[row.id])}
                  onChange={() => setChecked((prev) => ({ ...prev, [row.id]: !prev[row.id] }))}
                />
                <span>
                  {row.label} <span className="font-mono text-xs text-muted">{row.id}</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-2xl">What we do not move</h2>
        <ul className="mt-4 space-y-3">
          {stays.map((row) => (
            <li key={row.id} data-claim={row.id}>
              {row.label} <span className="font-mono text-xs text-muted">{row.id}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
