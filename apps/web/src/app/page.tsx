import { HeroChallan, MoveTour } from "@/components/HeroChallan";
import { Claim, Page } from "@/components/Site";
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
        <HeroChallan />
      </div>
      <hr className="border-rule" />
      <MoveTour />
      <p className="max-w-prose" data-claim="L46">
        The first calls are a trading firm with more than one godown. That is a calling order, not a count of demand.
      </p>
      <p>
        <Link href="/calculator" className="underline">
          Calculator
        </Link>
        {" · "}
        <Link href="/assessment" className="underline">
          Assessment
        </Link>
        {" · "}
        <Link href="/migration" className="underline">
          Migration
        </Link>
      </p>
    </Page>
  );
}
