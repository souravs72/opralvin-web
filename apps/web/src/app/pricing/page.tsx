import { Claim, Page } from "@/components/Site";
import { faqLd } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/pricing");

const faqs = [
  {
    q: "What does the process audit cost",
    a: "The audit is free. It is a written look at how the firm invoices, stocks, and files. It does not include a build, a data move, or a price.",
  },
  {
    q: "How is paid work priced",
    a: "Paid work is a day rate times the days agreed after the audit. Starter, Growth, and Managed are names for that work. Rupee amounts are not set.",
  },
];

export default function PricingPage() {
  return (
    <Page path="/pricing" extraLd={[faqLd(faqs)]}>
      <Claim id="L47">The free process audit is the primary call to action.</Claim>
      <Claim id="L49">Prices are unset. The tokens below are not rupee amounts.</Claim>
      <table className="w-full max-w-xl border-collapse text-left">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2">Work</th>
            <th className="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-line">
            <td className="py-2">Starter</td>
            <td className="py-2 font-mono">{"{{STARTER_PRICE}}"}</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-2">Growth</td>
            <td className="py-2 font-mono">{"{{GROWTH_PRICE}}"}</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-2">Managed</td>
            <td className="py-2 font-mono">{"{{MANAGED_PRICE}}"}</td>
          </tr>
          <tr className="border-b border-line">
            <td className="py-2">Day rate</td>
            <td className="py-2 font-mono">{"{{DAY_RATE}}"}</td>
          </tr>
          <tr>
            <td className="py-2">CA referral fee</td>
            <td className="py-2 font-mono">{"{{CA_FEE}}"}</td>
          </tr>
        </tbody>
      </table>
      <Claim id="L48">A CA referral is compared with the audit. It is not the primary path.</Claim>
      <dl className="max-w-prose space-y-4">
        {faqs.map((item) => (
          <div key={item.q}>
            <dt className="font-semibold">{item.q}</dt>
            <dd className="mt-1">{item.a}</dd>
          </div>
        ))}
      </dl>
      <p>
        <Link href="/calculator" className="underline">
          Day-rate calculator
        </Link>
      </p>
      <p>
        <Link href="/process-audit" className="bg-ink px-4 py-3 text-sm font-semibold text-on-ink">
          Book a free process audit
        </Link>
      </p>
    </Page>
  );
}
