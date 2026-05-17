import Link from "next/link";

import { Container } from "@/components/ui/Container";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";

function ReadingTimeIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="opacity-50"
    >
      <path d="M2 3h4.5a2 2 0 0 1 2 2v9a1.5 1.5 0 0 0-1.5-1.5H2V3Z" />
      <path d="M14 3H9.5a2 2 0 0 0-2 2v9A1.5 1.5 0 0 1 9 12.5H14V3Z" />
    </svg>
  );
}

function FeaturedPost({ post }: { post: BlogPostMeta }) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        prefetch={false}
        className="group block border-b border-border py-10 transition-colors duration-500 hover:border-accent/20 sm:py-14"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="mb-4 flex items-center gap-3">
          <span
            className="inline-flex items-center rounded-full bg-accent/10 px-2.5 py-1 font-mono text-accent"
            style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            Latest
          </span>
          <span className="studio-tag text-accent">{post.category}</span>
          <span className="studio-tag text-subtle-foreground">
            {formatDate(post.date)}
          </span>
        </div>

        <h2
          className="studio-h1-headline max-w-4xl text-foreground transition-colors duration-300 group-hover:text-accent"
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {post.title}
        </h2>

        <p className="mt-4 max-w-3xl studio-lede">{post.description}</p>

        <div className="mt-6 flex items-center gap-4">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all duration-300 group-hover:gap-3">
            Read article
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </span>
          <span
            className="inline-flex items-center gap-1.5 font-mono text-subtle-foreground"
            style={{ fontSize: "0.6875rem", letterSpacing: "0.05em" }}
          >
            <ReadingTimeIcon />
            {post.readingTime}
          </span>
        </div>
      </Link>
    </article>
  );
}

function PostListItem({ post, index }: { post: BlogPostMeta; index: number }) {
  return (
    <article>
      <Link
        href={`/blog/${post.slug}`}
        prefetch={false}
        className="group flex flex-col gap-2 border-b border-border py-6 transition-colors duration-400 hover:border-accent/20 sm:flex-row sm:items-baseline sm:gap-6 sm:py-7"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <span
          className="studio-tabular shrink-0 select-none font-mono text-accent transition-opacity duration-200 group-hover:opacity-100"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.05em",
            opacity: 0.35,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="studio-h4-sans text-foreground transition-colors duration-200 group-hover:text-accent">
            {post.title}
          </h2>
          <p className="mt-1.5 line-clamp-2 max-w-2xl studio-body text-muted-foreground">
            {post.description}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <span
            className="hidden items-center rounded bg-accent/5 px-2 py-0.5 font-mono text-subtle-foreground sm:inline-flex"
            style={{
              fontSize: "0.5625rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {post.category}
          </span>
          <span
            className="inline-flex items-center gap-1 font-mono text-subtle-foreground"
            style={{ fontSize: "0.625rem", letterSpacing: "0.05em" }}
          >
            <ReadingTimeIcon />
            {post.readingTime}
          </span>
        </div>
      </Link>
    </article>
  );
}

export function BlogListingContent({ posts }: { posts: BlogPostMeta[] }) {
  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <div className="pt-28 sm:pt-32 pb-16 sm:pb-24">
        <Container size="default">
          <h1 className="studio-h1-headline text-foreground">
            Thinking, out loud
          </h1>
          <p className="mt-6 studio-lede">No articles published yet.</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-24">
      <Container size="default">
        <h1 className="studio-h1-headline text-foreground">
          Thinking, out loud
        </h1>

        <p className="mt-4 max-w-2xl studio-lede">
          Practical writing on design, trust, and building a business presence
          that works. No keyword stuffing. No filler paragraphs.
        </p>

        <div className="mt-8 h-px bg-border" />

        <FeaturedPost post={featured} />

        {rest.length > 0 && (
          <div className="mt-2">
            <div className="mb-4 mt-10 flex items-baseline gap-3">
              <h2 className="studio-h3-sans text-foreground">
                More articles
              </h2>
              <span
                className="select-none font-mono text-subtle-foreground"
                style={{ fontSize: "0.5625rem", letterSpacing: "0.05em" }}
              >
                {String(rest.length).padStart(2, "0")}
              </span>
            </div>
            {rest.map((post, idx) => (
              <PostListItem key={post.slug} post={post} index={idx} />
            ))}
          </div>
        )}

        <div className="mt-12 border-t border-border pt-6">
          <span
            className="font-mono text-subtle-foreground"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {posts.length} {posts.length === 1 ? "article" : "articles"}{" "}
            published
          </span>
        </div>
      </Container>
    </div>
  );
}
