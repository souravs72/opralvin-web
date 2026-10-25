import { breadcrumbLd, organizationLd } from "@/lib/jsonld";
import { crumbs } from "@/lib/seo";
import { nav, orgName, pageByPath, productName } from "@opralvin/content/site";
import Link from "next/link";
import type { ReactNode } from "react";

export function JsonLd({ data }: { data: object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function Claim({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p data-claim={id} className="max-w-prose">
      {children}{" "}
      <span className="font-mono text-xs text-muted" aria-hidden="true">
        {id}
      </span>
    </p>
  );
}

export function Stamp({ children }: { children: ReactNode }) {
  return (
    <p className="inline-block rounded-[2px] border-2 border-posted px-2 py-1 font-[family-name:var(--font-mono)] text-xs tracking-widest text-posted uppercase">
      {children}
    </p>
  );
}

function whatsappHref(): string | null {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP ?? "{{WHATSAPP_NUMBER}}";
  if (raw.includes("{{")) return null;
  const digits = raw.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}

export function SiteHeader() {
  return (
    <header className="border-b border-line bg-paper">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-20 focus:bg-sheet focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl">
          {productName}
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/process-audit"
          className="inline-block bg-ink px-4 py-3 text-center text-sm font-semibold text-on-ink"
        >
          Book a free process audit
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const email = process.env.NEXT_PUBLIC_PUBLIC_EMAIL ?? "{{PUBLIC_EMAIL}}";
  const city = "{{CITY}}";
  const links = [
    { href: "/product", label: "Product" },
    { href: "/solutions", label: "Solutions" },
    { href: "/industries", label: "Industries" },
    { href: "/migration", label: "Migration" },
    { href: "/pricing", label: "Pricing" },
    { href: "/how-we-work", label: "How we work" },
    { href: "/resources", label: "Resources" },
    { href: "/about", label: "About" },
    { href: "/security", label: "Security" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/process-audit", label: "Book a free process audit" },
  ];
  return (
    <footer className="mt-auto border-t border-line">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-10">
        <p className="font-[family-name:var(--font-display)] text-lg">{orgName}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className="hover:underline">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-muted">
          {email}. {city}.
        </p>
      </div>
    </footer>
  );
}

export function WhatsAppSticky() {
  const href = whatsappHref();
  if (!href) return null;
  return (
    <a
      href={href}
      className="fixed bottom-4 right-4 bg-ink px-4 py-3 text-sm font-semibold text-on-ink"
    >
      WhatsApp
    </a>
  );
}

export function Page({
  path,
  extraLd = [],
  children,
}: {
  path: string;
  extraLd?: object[];
  children: ReactNode;
}) {
  const page = pageByPath(path);
  const trail = crumbs(path);
  return (
    <>
      <JsonLd data={[organizationLd(), breadcrumbLd(path), ...extraLd]} />
      <main id="main" className="mx-auto w-full max-w-5xl px-4 py-12">
        {path !== "/" ? (
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
            <ol className="flex flex-wrap gap-2">
              {trail.map((crumb, index) => (
                <li key={crumb.path} className="flex gap-2">
                  {index > 0 ? <span aria-hidden="true">/</span> : null}
                  {index === trail.length - 1 ? (
                    <span>{crumb.name}</span>
                  ) : (
                    <Link href={crumb.path} className="hover:underline">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        ) : null}
        <h1 className="max-w-3xl text-[34px] leading-tight sm:text-[56px]">{page.h1}</h1>
        <div className="mt-8 space-y-7">{children}</div>
      </main>
    </>
  );
}
