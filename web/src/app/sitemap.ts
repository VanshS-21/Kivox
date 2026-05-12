import type { MetadataRoute } from "next";

import { getMetadataBase } from "@/lib/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getMetadataBase();
  const now = new Date();

  return ["/", "/work", "/contact", "/privacy", "/terms"].map((path) => ({
    url: new URL(path, base).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.6,
  }));
}

