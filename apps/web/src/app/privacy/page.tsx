import { Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/privacy");

export default function PrivacyPage() {
  return (
    <Page path="/privacy">
      <p className="max-w-prose text-lg">
        We collect name, phone, email, company, and optional campaign tags from the process-audit form. The purpose is
        to contact you about a free process audit. That is the only purpose written here.
      </p>
      <p className="max-w-prose">
        The Digital Personal Data Protection Act, 2023 exists. Commencement is by notification. Consent on the form is
        purpose-bound. You may ask us to stop using the details for that purpose.
      </p>
      <p className="max-w-prose" data-claim="L44">
        Campaign tags on the marketing form are for the audit call. They are not a claim that the product CRM already
        stores UTM, consent time, score, or a calculator result.
      </p>
      <p>
        <Link href="/process-audit" className="underline">
          Book a free process audit
        </Link>
      </p>
    </Page>
  );
}
