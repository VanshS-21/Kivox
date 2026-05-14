import { homeSeo } from "@/content/seo/home";

export function getMetadataBase(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) return new URL(raw);
  return new URL("https://kivox.in");
}

export function getHomeMetadata() {
  return {
    title: homeSeo.title,
    description: homeSeo.description,
    alternates: {
      canonical: homeSeo.canonicalPath,
    },
  };
}

