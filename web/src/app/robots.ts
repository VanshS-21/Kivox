import type { MetadataRoute } from "next";

import { getMetadataBase } from "@/lib/metadata";

export default function robots(): MetadataRoute.Robots {
  const base = getMetadataBase();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", base).toString(),
  };
}

