import { brand } from "@/content/brand";

import { getMetadataBase } from "./metadata";

export function getOrganizationJsonLd() {
  const base = getMetadataBase();

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brand.name,
    url: base.toString(),
    email: brand.contact.email,
    telephone: brand.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    sameAs: Object.values(brand.socials),
  };
}

