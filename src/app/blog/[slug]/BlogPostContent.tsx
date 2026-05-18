"use client";

import type React from "react";
import { useState, useEffect } from "react";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

import { Container } from "@/components/ui/Container";
import { easeOutExpo, easeOutQuint } from "@/lib/motion";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";

/* ─── Reading progress bar ─── */
function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  // Only show after slight scroll to avoid flash at top
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setVisible(v > 0.02);
    });
    return unsub;
  }, [scrollYProgress]);

  if (reduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        backgroundColor: "var(--accent)",
        opacity: visible ? 0.8 : 0,
        transition: "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
  );
}

export function BlogPostContent({
  post,
  children,
}: {
  post: BlogPostMeta;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  return (
    <>
      {/* Reading progress indicator */}
      <ReadingProgress />

      <div className="pt-28 sm:pt-32 pb-16 sm:pb-24">
        <Container size="narrow">
          {/* ── Back link — arrow translates left on hover ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -8 }}
            animate={reduce ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: easeOutExpo }}
          >
            <Link
              href="/blog"
              className="studio-tag group mb-8 inline-flex min-h-11 items-center gap-2 text-muted-foreground transition-colors duration-200 hover:text-accent"
            >
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
                className="transition-transform duration-300 group-hover:-translate-x-1"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <path d="M12 7H2M6 11l-4-4 4-4" />
              </svg>
              All articles
            </Link>
          </motion.div>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutQuint, delay: 0.05 }}
            className="studio-h1-headline text-foreground"
          >
            {post.title}
          </motion.h1>

          {/* Meta row: date + reading time + category pill */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
            className="mt-5 flex items-center gap-4 flex-wrap"
          >
            <time
              dateTime={post.date}
              className="studio-tag text-muted-foreground"
            >
              {formatDate(post.date)}
            </time>
            <span
              className="w-1 h-1 rounded-full bg-border-strong"
              aria-hidden="true"
            />
            <span
              className="studio-tag inline-flex items-center gap-1.5 text-muted-foreground"
            >
              {/* Book icon */}
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
              {post.readingTime}
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
              {post.category}
            </span>
          </motion.div>

          {/* Lead paragraph — article description as lede */}
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOutExpo, delay: 0.28 }}
            className="mt-6 studio-lede"
          >
            {post.description}
          </motion.p>

          {/* Decorative draw-line divider */}
          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            animate={reduce ? undefined : { scaleX: 1 }}
            transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.35 }}
            className="mt-8 mb-10 h-px bg-border origin-left"
          />

          {/* ── Article body (MDX) ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.4 }}
            className="prose-kivox"
          >
            {children}
          </motion.div>

          {/* ── End-of-article CTA ── */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="mt-16 sm:mt-20 pt-8 border-t border-border"
          >
            <p className="studio-body text-muted-foreground max-w-xl">
              If this resonated, we should talk. We build websites that earn
              trust from the first visit.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group inline-flex min-h-11 items-center gap-2 text-base font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                Book a free call
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
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
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </Link>
              <Link
                href="/blog"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
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
                  className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <path d="M12 7H2M6 11l-4-4 4-4" />
                </svg>
                More articles
              </Link>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  );
}
