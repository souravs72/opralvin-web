import { Claim, Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/terms");

export default function TermsPage() {
  return (
    <Page path="/terms">
      <p className="max-w-prose text-lg">
        This website is information about Opralvin One and a way to request a process audit. A paid statement of work is
        the contract.
      </p>
      <Claim id="L49">Prices on this site are placeholders until the owner sets them.</Claim>
      <p className="max-w-prose">
        Illustrative challans, godowns, and parties are samples. They are not clients. They are not metrics.
      </p>
      <p>
        <Link href="/process-audit" className="underline">
          Book a free process audit
        </Link>
      </p>
    </Page>
  );
}
