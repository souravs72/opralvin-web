import { Claim, Page } from "@/components/Site";
import { softwareLd } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/product");

const groups = [
  { href: "/solutions/sales-purchase", label: "Sell and buy", id: "L01" },
  { href: "/solutions/inventory", label: "Stock in each godown", id: "L14" },
  { href: "/solutions/manufacturing", label: "Make", id: "L20" },
  { href: "/solutions/hr-payroll", label: "Pay people", id: "L31" },
  { href: "/solutions/accounting-gst", label: "Account and GST paperwork", id: "L23" },
  { href: "/solutions/crm", label: "Leads and deals", id: "L30" },
];

export default function ProductPage() {
  return (
    <Page path="/product" extraLd={[softwareLd()]}>
      <p className="max-w-prose text-lg">
        The week is sell, buy, stock, make, pay people, and account. Opralvin One is that week in one set of books.
      </p>
      <ul className="max-w-prose space-y-4">
        {groups.map((group) => (
          <li key={group.href} data-claim={group.id}>
            <Link href={group.href} className="underline">
              {group.label}
            </Link>
            <span className="ml-2 font-mono text-xs text-muted">{group.id}</span>
          </li>
        ))}
      </ul>
      <Claim id="L51">
        A counter bill exists in the product. It is not in this year&apos;s offer. See the POS page for the written limit.
      </Claim>
      <Claim id="L40">There is no owner phone app for stock, sales, and receivables.</Claim>
      <Claim id="L41">UPI collection is not a claim.</Claim>
      <p>
        <Link href="/process-audit" className="bg-ink px-4 py-3 text-sm font-semibold text-on-ink">
          Book a free process audit
        </Link>
      </p>
    </Page>
  );
}
