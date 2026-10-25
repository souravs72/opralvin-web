import { Page } from "@/components/Site";
import { metaFor } from "@/lib/seo";
import { glossary } from "@opralvin/content/bodies";

export const metadata = metaFor("/resources/glossary");

export default function GlossaryPage() {
  return (
    <Page path="/resources/glossary">
      <dl className="max-w-prose space-y-6">
        {glossary.map((row) => (
          <div key={row.term}>
            <dt className="font-semibold">{row.term}</dt>
            <dd className="mt-1">{row.text}</dd>
          </div>
        ))}
      </dl>
    </Page>
  );
}
