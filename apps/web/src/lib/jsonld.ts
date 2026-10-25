import { crumbs } from "@/lib/seo";
import { orgName, pageByPath, productName } from "@opralvin/content/site";

export function siteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: orgName,
    brand: { "@type": "Brand", name: productName },
    url: siteUrl(),
  };
}

export function softwareLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: productName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      description: "A free process audit. Paid work is a day rate times agreed days. Rupee amounts are not set.",
    },
  };
}

export function serviceLd(path: string) {
  const page = pageByPath(path);
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    description: page.description,
    provider: { "@type": "Organization", name: orgName },
    areaServed: "IN",
  };
}

export function faqLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbLd(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs(path).map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.path, siteUrl()).toString(),
    })),
  };
}
