import { Claim, Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/security");

export default function SecurityPage() {
  return (
    <Page path="/security">
      <p className="max-w-prose text-lg">
        The firm keeps its export. We do not keep a silent copy of the books after a statement of work ends.
      </p>
      <p className="max-w-prose">Built on proven open-source foundations.</p>
      <Claim id="L27">We can export records.</Claim>
      <Claim id="L42">Automatic backups are not a product claim.</Claim>
      <p className="max-w-prose text-sm text-muted">
        Hosting location and a named host are not claims until the owner names them.
      </p>
      <p>
        <Link href="/privacy" className="underline">
          Privacy
        </Link>
      </p>
    </Page>
  );
}
