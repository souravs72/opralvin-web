import { LeadForm } from "@/components/LeadForm";
import { Claim, Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/process-audit");

export default function ProcessAuditPage() {
  const booking = process.env.NEXT_PUBLIC_BOOKING_LINK ?? "{{BOOKING_LINK}}";
  return (
    <Page path="/process-audit">
      <Claim id="L47">
        The audit is a written look at how the firm invoices, stocks, and files. It does not include a build, a data
        move, or a price.
      </Claim>
      <p className="max-w-prose text-sm text-muted" data-claim="L50">
        Calendar booking is {booking}. It stays a placeholder until the owner supplies one. The form below is the path
        that exists now.
      </p>
      <LeadForm />
      <p className="text-sm">
        <Link href="/privacy" className="underline">
          Privacy
        </Link>
      </p>
    </Page>
  );
}
