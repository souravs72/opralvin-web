import { Page } from "@/components/Site";
import { faqLd } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/how-we-work");

const faqs = [
  {
    q: "What happens in the first thirty days",
    a: "A company, a chart of accounts, parties, items, and the first tax invoice. Opening stock from a count. Not a desktop-company import.",
  },
  {
    q: "What the firm must bring",
    a: "A named owner, an accountant who can post, GSTIN if registered, and spreadsheets of parties, items, and open bills.",
  },
];

export default function HowWeWorkPage() {
  return (
    <Page path="/how-we-work" extraLd={[faqLd(faqs)]}>
      <p className="max-w-prose text-lg">Thirty days to an invoice. Sixty days to stock that matches a count. Ninety days to a signed list of what is in and what is out.</p>
      <ol className="max-w-prose list-decimal space-y-4 pl-5">
        <li>Days 1 to 30. Company, chart of accounts, parties, items, first tax invoice.</li>
        <li>Days 31 to 60. Godowns, opening stock, purchase receipts, and who owes whom.</li>
        <li>Days 61 to 90. GST files the product can prepare, a salary slip if payroll is in scope, and a written limit list.</li>
      </ol>
      <p className="max-w-prose" data-claim="L50">
        Support hours are {"{{SUPPORT_HOURS}}"}. The owner has not set them.
      </p>
      <dl className="max-w-prose space-y-4">
        {faqs.map((item) => (
          <div key={item.q}>
            <dt className="font-semibold">{item.q}</dt>
            <dd className="mt-1">{item.a}</dd>
          </div>
        ))}
      </dl>
      <p>
        <Link href="/process-audit" className="underline">
          Book a free process audit
        </Link>
      </p>
    </Page>
  );
}
