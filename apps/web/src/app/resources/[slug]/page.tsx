import { Claim, Page } from "@/components/Site";
import { articleLd } from "@/lib/jsonld";
import { metaFor } from "@/lib/seo";
import { launchBySlug, launchPieces } from "@opralvin/content/launch";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return launchPieces.map((piece) => ({ slug: piece.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const piece = launchBySlug(slug);
  if (!piece) return {};
  return metaFor(piece.path);
}

export default async function LaunchPage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const piece = launchBySlug(slug);
  if (!piece) notFound();
  return (
    <Page path={piece.path} extraLd={[articleLd(piece.path)]}>
      {piece.paragraphs.map((text) => (
        <p key={text} className="max-w-prose">
          {text}
        </p>
      ))}
      {piece.claims.map((claim) => (
        <Claim key={claim.id} id={claim.id}>
          {claim.text}
        </Claim>
      ))}
      <ul className="max-w-prose list-disc space-y-2 pl-5">
        {piece.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="underline">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </Page>
  );
}
