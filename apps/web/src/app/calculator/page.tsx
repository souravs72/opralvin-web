import { CalculatorForm } from "@/components/CalculatorForm";
import { Claim, Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/calculator");

export default function CalculatorPage() {
  const rate = process.env.NEXT_PUBLIC_DAY_RATE ?? "{{DAY_RATE}}";
  return (
    <Page path="/calculator">
      <Claim id="L49">Prices are unset unless the owner has put a day rate in the environment. Tokens are not rupees.</Claim>
      <CalculatorForm rateRaw={rate} />
      <p>
        <Link href="/pricing" className="underline">
          Pricing
        </Link>
        {" · "}
        <Link href="/process-audit" className="underline">
          Book a free process audit
        </Link>
      </p>
    </Page>
  );
}
