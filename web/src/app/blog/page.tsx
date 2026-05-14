import type { Metadata } from "next";

import { getAllPosts } from "@/lib/blog";
import { BlogListingContent } from "./BlogListingContent";

export const metadata: Metadata = {
  title: "Blog | Kivox",
  description:
    "Practical writing on web design, trust, SEO, and building a business presence online. No filler, no jargon.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  /** Blog listing JSON-LD: CollectionPage with all articles */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Kivox Blog",
    description:
      "Practical writing on web design, trust, SEO, and building a business presence online.",
    url: "https://kivox.in/blog",
    publisher: {
      "@type": "Organization",
      name: "Kivox",
      url: "https://kivox.in",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.map((post, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: `https://kivox.in/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <>
      <BlogListingContent posts={posts} />
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </>
  );
}
