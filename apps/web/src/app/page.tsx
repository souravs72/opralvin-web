import { Claim, Page, Stamp } from "@/components/Site";
import { softwareLd } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/");

export default function Home() {
  return (
    <Page path="/" extraLd={[softwareLd()]}>
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-7">
          <p className="max-w-prose text-lg">
            Opralvin One keeps the quotation, the sales order, the delivery note, the tax invoice, the stock in each
            godown, and who owes you money in the same books.
          </p>
          <Claim id="L01">We can raise a quotation.</Claim>
          <Claim id="L02">We can take a sales order.</Claim>
          <Claim id="L03">We can dispatch goods on a delivery note.</Claim>
          <Claim id="L04">We can raise a tax invoice. GST fields on that invoice are not a live demonstration.</Claim>
          <Claim id="L14">We can see stock in each godown.</Claim>
          <Claim id="L06">We can see who owes money, and how old it is.</Claim>
          <p className="max-w-prose text-sm text-muted" data-claim="L47">
            The audit is a written look at how you invoice, stock, and file. It is free. It does not include a build, a
            data move, or a price.
          </p>
          <p>
            <Link href="/process-audit" className="bg-ink px-4 py-3 text-sm font-semibold text-on-ink">
              Book a free process audit
            </Link>
          </p>
        </div>
        <article className="sheet-settle border border-line bg-sheet p-4">
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
      </div>
      <hr className="border-rule" />
      <h2 className="text-2xl">What we move</h2>
      <ul className="max-w-prose space-y-3">
        <li data-claim="L26">The spreadsheet of parties and items. L26</li>
        <li data-claim="L29">Opening sales and purchase invoices. L29</li>
        <li data-claim="L16">Opening stock from a count. Not a desktop-company file. L16</li>
        <li data-claim="L28">A chart of accounts from the eight-column template, before any ledger entries exist. L28</li>
      </ul>
      <p className="max-w-prose" data-claim="L46">
        The first calls are a trading firm with more than one godown. That is a calling order, not a count of demand.
      </p>
      <p>
        <Link href="/product" className="underline">
          Product
        </Link>
        {" · "}
        <Link href="/migration" className="underline">
          Migration
        </Link>
        {" · "}
        <Link href="/pricing" className="underline">
          Pricing
        </Link>
      </p>
    </Page>
  );
}
