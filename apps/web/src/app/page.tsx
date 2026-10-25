export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12">
      <header className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-[family-name:var(--font-display)] text-xl">Opralvin One</p>
        <a className="bg-ink px-4 py-3 text-center font-semibold text-on-ink" href="/process-audit">
          Book a free process audit
        </a>
      </header>
      <section className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl leading-tight sm:text-5xl">
            The register, the sheet, and the desktop books. Then one system.
          </h1>
          <p className="mt-7 max-w-prose text-lg">
            Opralvin One keeps the quotation, the sales order, the delivery note, the tax invoice, the stock in each
            godown, and who owes you money in the same books.
          </p>
          <p className="mt-7 max-w-prose text-sm text-muted">
            The audit is a written look at how you invoice, stock, and file. It is free. It does not include a build, a
            data move, or a price.
          </p>
        </div>
        <article className="border border-line bg-sheet p-4">
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
          <p className="mt-4 inline-block rounded-[2px] border-2 border-posted px-2 py-1 font-[family-name:var(--font-mono)] text-xs tracking-widest text-posted uppercase">
            Posted to stock
          </p>
        </article>
      </section>
    </main>
  );
}
