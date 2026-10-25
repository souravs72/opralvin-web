import { Claim, Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import Link from "next/link";

export const metadata = metaFor("/migration");

export default function MigrationPage() {
  return (
    <Page path="/migration">
      <p className="max-w-prose text-lg">
        We move what a spreadsheet and an opening tool can hold. A desktop accounts-company file is not read.
      </p>
      <Claim id="L26">We can import customers, items, and other importable masters from a spreadsheet.</Claim>
      <Claim id="L29">We can create opening sales and purchase invoices.</Claim>
      <Claim id="L16">We can correct stock after a count, including opening stock. This is not a desktop-company import.</Claim>
      <Claim id="L28">
        We can import a chart of accounts from the spreadsheet template before any ledger entries exist.
      </Claim>
      <Claim id="L22">We can start a company from an India chart-of-accounts template. This is not a desktop company file.</Claim>
      <Claim id="L27">We can export records.</Claim>
      <Claim id="L39">There is no Tally company reader. The setup wizard only stores the word Tally.</Claim>
      <p>
        <Link href="/resources" className="underline">
          Import sheet headers
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
