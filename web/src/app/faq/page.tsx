import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { FaqPageContent } from "./FaqPageContent";
import { faq } from "@/content/pages/faq";

export const metadata: Metadata = {
  title: "FAQ | Kivox",
  description:
    "Answers to common questions about working with Kivox: process, pricing, timelines, ownership, and what to expect.",
};

/** Generate JSON-LD FAQPage structured data for SEO */
function getFaqJsonLd() {
  const items = faq.categories.flatMap((cat) => cat.items);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function FaqPage() {
  const jsonLd = getFaqJsonLd();

  return (
    <>
      <FaqPageContent />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </>
  );
}
