"use client";

import { parseDayRate, quoteWork } from "@opralvin/content/calculator";
import { useMemo, useState } from "react";

export function CalculatorForm({ rateRaw }: { rateRaw: string }) {
  const [days, setDays] = useState(12);
  const rate = useMemo(() => parseDayRate(rateRaw), [rateRaw]);
  const quote = quoteWork(days, rate);

  return (
    <form
      className="max-w-xl space-y-5 border border-line bg-sheet p-5"
      onSubmit={(event) => event.preventDefault()}
      data-calculator="day-rate"
    >
      <p className="text-sm text-muted" data-claim="L49">
        Paid work is days times a day rate. If the rate is unset, the total stays a token. This is not a price list.
      </p>
      <label className="block">
        <span className="block text-sm">Days</span>
        <input
          type="number"
          min={1}
          max={90}
          step={1}
          value={days}
          onChange={(event) => setDays(Number(event.target.value))}
          className="mt-1 w-full border border-line bg-paper px-3 py-2 font-mono"
        />
      </label>
      <p className="font-[family-name:var(--font-mono)]" data-calculator-output>
        {quote.ok ? quote.display : "Enter a whole number of days from 1 to 90."}
      </p>
      {quote.labelled === "computed" ? (
        <p className="text-sm text-muted">Illustrative arithmetic from the day rate the owner set. Not a quote.</p>
      ) : null}
    </form>
  );
}
