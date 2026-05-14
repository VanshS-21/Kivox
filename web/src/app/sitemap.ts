import type { MetadataRoute } from "next";

import { getMetadataBase } from "@/lib/metadata";
import { getAllSlugs } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getMetadataBase();
  const now = new Date();

  const staticPages = ["/", "/work", "/blog", "/contact", "/faq", "/privacy", "/terms"];
  const blogSlugs = getAllSlugs();

  const staticEntries: MetadataRoute.Sitemap = staticPages.map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : ["/work", "/contact", "/blog"].includes(path) ? 0.8 : 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: new URL(`/blog/${slug}`, base).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
