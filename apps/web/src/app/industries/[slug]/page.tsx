import { Claim, Page } from "@/components/Site";
import { serviceLd } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import { industries } from "@opralvin/content/bodies";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const row = industries[slug];
  if (!row) return {};
  return metaFor(row.path);
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const row = industries[slug];
  if (!row) notFound();
  return (
    <Page path={row.path} extraLd={[serviceLd(row.path)]}>
      <p className="max-w-prose text-lg">{row.scenario}</p>
      {row.blocks.map((block, index) => (
        <div key={index} className="space-y-4">
          {block.claims?.map((claim) => (
            <Claim key={claim.id} id={claim.id}>
              {claim.text}
            </Claim>
          ))}
        </div>
      ))}
      {row.limit ? <Claim id={row.limit.id}>{row.limit.text}</Claim> : null}
      <p>
        <Link href="/process-audit" className="underline">
          Book a free process audit
        </Link>
      </p>
    </Page>
  );
}
