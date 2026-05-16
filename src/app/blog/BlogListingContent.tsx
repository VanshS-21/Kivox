"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { easeOutExpo, easeOutQuint, fadeUp, viewportOnce } from "@/lib/motion";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";
/* ─── Reading time icon — small book glyph ─── */
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

/* ─── Featured post (latest) ─── */
function FeaturedPost({ post }: { post: BlogPostMeta }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(6px)" }}
      animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: easeOutQuint, delay: 0.25 }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group block py-10 sm:py-14 border-b border-border hover:border-accent/20 transition-colors duration-500"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Category + date + "Latest" pill */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full bg-accent/10 font-mono text-accent"
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

        {/* Title — large, editorial */}
        <h2
          className="studio-h2 font-sans font-bold text-foreground group-hover:text-accent transition-colors duration-300 max-w-4xl"
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p className="mt-4 studio-lede max-w-3xl">{post.description}</p>

        {/* Read more + reading time */}
        <div className="mt-6 flex items-center gap-4">
          <span className="font-sans font-semibold text-accent text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
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
    </motion.article>
  );
}

/* ─── Post list row ─── */
function PostListItem({ post, index }: { post: BlogPostMeta; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      transition={{ duration: 0.5, ease: easeOutExpo }}
    >
      <Link
        href={`/blog/${post.slug}`}
        className="group flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-6 sm:py-7 border-b border-border hover:border-accent/20 transition-colors duration-400"
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        {/* Index number — brightens on hover */}
        <span
          className="font-mono text-accent studio-tabular select-none shrink-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.05em",
            opacity: 0.35,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h2 className="font-sans font-semibold text-foreground text-base sm:text-lg leading-snug group-hover:text-accent transition-colors duration-200">
            {post.title}
          </h2>
          <p className="mt-1.5 font-body text-muted-foreground text-sm leading-relaxed line-clamp-2 max-w-2xl">
            {post.description}
          </p>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="inline-flex items-center px-2 py-0.5 rounded bg-accent/5 font-mono text-subtle-foreground hidden sm:inline-flex"
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
    </motion.article>
  );
}

/* ─── Main listing ─── */
export function BlogListingContent({ posts }: { posts: BlogPostMeta[] }) {
  const reduce = useReducedMotion();
  const [featured, ...rest] = posts;

  if (!featured) {
    return (
      <div className="pt-28 sm:pt-32 pb-16 sm:pb-24">
        <Container size="default">
          <h1 className="studio-h2 font-sans font-bold text-foreground">
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
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={
            reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{ duration: 0.8, ease: easeOutQuint }}
          className="studio-h2 font-sans font-bold text-foreground"
        >
          Thinking, out loud
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={
            reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.18 }}
          className="mt-4 studio-lede max-w-2xl"
        >
          Practical writing on design, trust, and building a business presence
          that works. No keyword stuffing. No filler paragraphs.
        </motion.p>

        {/* Decorative divider — draw-line */}
        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          animate={reduce ? undefined : { scaleX: 1 }}
          transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.3 }}
          className="mt-8 h-px bg-border origin-left"
        />

        {/* ── Featured post (latest) ── */}
        <FeaturedPost post={featured} />

        {/* ── Remaining posts — staggered scroll-reveal ── */}
        {rest.length > 0 && (
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.07,
                  delayChildren: 0.12,
                },
              },
            }}
            className="mt-2"
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: easeOutExpo }}
              className="mb-4 mt-10 flex items-baseline gap-3"
            >
              <h2 className="font-sans text-xl font-semibold tracking-tight text-foreground">
                More articles
              </h2>
              <span
                className="font-mono text-subtle-foreground select-none"
                style={{ fontSize: "0.5625rem", letterSpacing: "0.05em" }}
              >
                {String(rest.length).padStart(2, "0")}
              </span>
            </motion.div>
            {rest.map((post, idx) => (
              <PostListItem key={post.slug} post={post} index={idx} />
            ))}
          </motion.div>
        )}

        {/* ── Article count ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mt-12 pt-6 border-t border-border"
        >
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
        </motion.div>
      </Container>
    </div>
  );
}
