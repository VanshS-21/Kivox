import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { getMdxComponents } from "@/components/ui/MdxComponents";
import { getMetadataBase } from "@/lib/metadata";
import { BlogPostContent } from "./BlogPostContent";

type Props = {
  params: Promise<{ slug: string }>;
};

/** Static generation for all blog slugs */
export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

/** Dynamic metadata per post */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | Kivox Blog`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      siteName: "Kivox",
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content, ...meta } = post;
  const components = getMdxComponents();
  const metadataBase = getMetadataBase();

  /** Article schema JSON-LD */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Kivox",
      url: metadataBase.toString(),
    },
    publisher: {
      "@type": "Organization",
      name: "Kivox",
      url: metadataBase.toString(),
    },
  };

  return (
    <>
      <BlogPostContent post={meta}>
        <MDXRemote source={content} components={components} />
      </BlogPostContent>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />
    </>
  );
}
