import { pageByPath, type PageMeta } from "@opralvin/content/site";
import type { Metadata } from "next";

export function metaFor(path: string): Metadata {
  const page = pageByPath(path);
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: new URL(path, site).toString() },
    openGraph: {
      title: page.title,
      description: page.description,
      locale: "en_IN",
      type: "website",
      url: new URL(path, site).toString(),
      images: [{ url: `/og?title=${encodeURIComponent(page.title)}` }],
    },
  };
}

export function crumbs(path: string): { name: string; path: string }[] {
  const parts = path.split("/").filter(Boolean);
  const list = [{ name: "Home", path: "/" }];
  let cursor = "";
  for (const part of parts) {
    cursor += `/${part}`;
    let page: PageMeta | undefined;
    try {
      page = pageByPath(cursor);
    } catch {
      page = undefined;
    }
    list.push({ name: page?.h1 ?? part, path: cursor });
  }
  return list;
}
