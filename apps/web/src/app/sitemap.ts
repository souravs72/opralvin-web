import { pages } from "@opralvin/content/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return pages.map((page) => ({
    url: new URL(page.path, site).toString(),
    changeFrequency: "monthly",
    priority: page.path === "/" ? 1 : 0.6,
  }));
}
