import { Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import { solutions } from "@opralvin/content/bodies";
import { pageByPath } from "@opralvin/content/site";
import Link from "next/link";

export const metadata = metaFor("/solutions");

export default function SolutionsIndex() {
  return (
    <Page path="/solutions">
      <p className="max-w-prose text-lg">
        Each group is the work it changes. A licence catalogue is not this page. POS is listed so the limit is public.
      </p>
      <ul className="space-y-4">
        {Object.values(solutions).map((row) => {
          const meta = pageByPath(row.path);
          return (
            <li key={row.path}>
              <Link href={row.path} className="underline">
                {meta.title.split(" — ")[0]}
              </Link>
              <p className="mt-1 max-w-prose text-sm text-muted">{row.intro}</p>
            </li>
          );
        })}
      </ul>
    </Page>
  );
}
