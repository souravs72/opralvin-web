import { Claim, Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import { launchIndex } from "@opralvin/content/launch";
import Link from "next/link";

export const metadata = metaFor("/resources");

const sheets = [
  { name: "Customer", headers: "Customer Name, Type, GSTIN, Territory" },
  { name: "Item", headers: "Item Code, Item Name, Item Group, HSN, Stock UOM" },
  { name: "Opening invoices", headers: "Party, Date, Amount, Outstanding Amount, Item" },
];

export default function ResourcesPage() {
  return (
    <Page path="/resources">
      <p className="max-w-prose text-lg">
        Words the books use, and spreadsheet headers you can fill. These headers are a starting sheet, not a Tally
        company reader.
      </p>
      <p>
        <Link href="/resources/glossary" className="underline">
          Glossary
        </Link>
      </p>
      <ul className="max-w-prose list-disc space-y-2 pl-5">
        {launchIndex.map((piece) => (
          <li key={piece.path}>
            <Link href={piece.path} className="underline">
              {piece.title}
            </Link>
          </li>
        ))}
      </ul>
      <Claim id="L26">Masters that allow import can be loaded from a spreadsheet.</Claim>
      <table className="w-full max-w-3xl border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            <th className="py-2">Sheet</th>
            <th className="py-2">Headers</th>
          </tr>
        </thead>
        <tbody>
          {sheets.map((sheet) => (
            <tr key={sheet.name} className="border-b border-line">
              <td className="py-2">{sheet.name}</td>
              <td className="py-2 font-mono">{sheet.headers}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
}
