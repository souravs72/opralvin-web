import { Claim, Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import { industries } from "@opralvin/content/bodies";
import { pageByPath } from "@opralvin/content/site";
import Link from "next/link";

export const metadata = metaFor("/industries");

export default function IndustriesIndex() {
  return (
    <Page path="/industries">
      <Claim id="L46">
        The first call is a trading firm with more than one godown. That is a calling order, not proof of demand.
      </Claim>
      <ul className="space-y-4">
        {Object.values(industries).map((row) => {
          const meta = pageByPath(row.path);
          return (
            <li key={row.path}>
              <Link href={row.path} className="underline">
                {meta.title.split(" — ")[0]}
              </Link>
              <p className="mt-1 max-w-prose text-sm text-muted">{row.scenario}</p>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
