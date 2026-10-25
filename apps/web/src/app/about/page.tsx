import { Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/about");

export default function AboutPage() {
  return (
    <Page path="/about">
      <p className="max-w-prose text-lg">
        Opralvin Technologies is founder-led. Sourav Singh has posted books and has built systems. The team is small on
        purpose.
      </p>
      <p className="max-w-prose">
        We take work we can finish. India SMEs first. Owner-stated band ₹2 Cr to ₹200 Cr. UAE is phase 2, not this
        year&apos;s offer.
      </p>
      <p className="max-w-prose" data-claim="L50">
        Public email {"{{PUBLIC_EMAIL}}"}. City {"{{CITY}}"}.
      </p>
      <p>
        <Link href="/process-audit" className="underline">
          Book a free process audit
        </Link>
      </p>
    </Page>
  );
}
