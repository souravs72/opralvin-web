"use client";

import { Stamp } from "@/components/Site";
import { useEffect, useState } from "react";

function allowMotion(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const memory = "deviceMemory" in navigator ? Number(navigator.deviceMemory) : 8;
  const cores = navigator.hardwareConcurrency || 8;
  const save = "connection" in navigator && Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
  if (save || memory <= 2 || cores <= 2) return false;
  return true;
}

export function HeroChallan() {
  const [motion, setMotion] = useState(false);
  useEffect(() => {
    setMotion(allowMotion());
  }, []);

  return (
    <div data-hero="challan" data-motion={motion ? "on" : "off"}>
      <article className={`border border-line bg-sheet p-4 ${motion ? "hero-challan" : ""}`}>
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-muted">
          Illustrative challan. Not a live document.
        </p>
        <dl className="mt-4 space-y-3 text-base">
          <div className="flex justify-between border-b border-line pb-2">
            <dt>Party</dt>
            <dd className="font-[family-name:var(--font-mono)]">Sample Traders</dd>
          </div>
          <div className="flex justify-between border-b border-line pb-2">
            <dt>Godown</dt>
            <dd className="font-[family-name:var(--font-mono)]">Ludhiana main</dd>
          </div>
          <div className="flex justify-between border-b border-line pb-2">
            <dt>Item</dt>
            <dd className="font-[family-name:var(--font-mono)]">HSN 7214</dd>
          </div>
          <div className="flex justify-between border-b border-line pb-2">
            <dt>Qty inward</dt>
            <dd className="font-[family-name:var(--font-mono)]">240 bags</dd>
          </div>
        </dl>
        <div className="mt-4">
          <Stamp>Posted to stock</Stamp>
        </div>
      </article>
      <p
        className={`mt-4 border-b border-line pb-2 font-[family-name:var(--font-mono)] text-sm ${motion ? "hero-row" : ""}`}
        data-hero="ledger-row"
      >
        Sample Traders · Ludhiana main · 240 bags · Posted
      </p>
    </div>
  );
}

export function MoveTour() {
  return (
    <section data-tour="move">
      <h2 className="text-2xl">What we move</h2>
      <ul className="mt-4 max-w-prose space-y-3">
        <li data-claim="L26">The spreadsheet of parties and items. L26</li>
        <li data-claim="L29">Opening sales and purchase invoices. L29</li>
        <li data-claim="L16">Opening stock from a count. Not a desktop-company file. L16</li>
        <li data-claim="L28">A chart of accounts from the eight-column template, before any ledger entries exist. L28</li>
      </ul>
    </section>
  );
}
