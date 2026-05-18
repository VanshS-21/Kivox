"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  LibraryBig,
  MousePointerClick,
} from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { getArticleSignal } from "@/lib/blog-signals";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";
import { easeOutExpo, easeOutQuint } from "@/lib/motion";

function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 50,
    restDelta: 0.001,
    stiffness: 200,
  });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setVisible(value > 0.02);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  if (reduce) return null;

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        backgroundColor: "var(--accent)",
        opacity: visible ? 0.85 : 0,
        scaleX,
        transition: "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    />
  );
}

export function BlogPostContent({
  children,
  post,
}: {
  children: ReactNode;
  post: BlogPostMeta;
}) {
  const reduce = useReducedMotion();
  const signal = getArticleSignal(post.category);

  return (
    <>
      <ReadingProgress />

      <div className="min-h-screen bg-background">
        <Section
          className="overflow-hidden border-b border-border pt-32 pb-12 lg:pt-40 lg:pb-16"
          spacing="none"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-80"
            style={{
              background:
                "radial-gradient(circle at 78% 18%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 34%), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px), linear-gradient(180deg, var(--border-soft) 1px, transparent 1px)",
              backgroundSize: "auto, 88px 88px, 88px 88px",
            }}
          />

          <Container className="relative z-10">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.5fr)] lg:items-end">
              <motion.div
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                className="max-w-4xl"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                transition={{ duration: 0.6, ease: easeOutQuint }}
              >
                <Link
                  className="studio-tag group mb-7 inline-flex min-h-11 items-center gap-2 text-muted-foreground transition-colors duration-200 hover:text-accent"
                  href="/blog"
                  prefetch={false}
                >
                  <ArrowLeft
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-x-1"
                    size={15}
                    strokeWidth={2}
                  />
                  All articles
                </Link>

                <p className="studio-eyebrow mb-5 text-accent">
                  [ {post.category} ]
                </p>
                <h1 className="studio-h1-headline max-w-4xl text-foreground">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-2xl studio-lede">
                  {post.description}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <MetaPill icon="date" label={formatDate(post.date)} />
                  <MetaPill icon="time" label={post.readingTime} />
                </div>

                <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                  <a
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-28px_var(--accent)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    href="#article"
                  >
                    <LibraryBig aria-hidden="true" size={17} strokeWidth={2} />
                    Read Article
                  </a>
                  <Link
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-5 text-sm font-semibold text-foreground transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    href="/contact"
                    prefetch={false}
                  >
                    <MousePointerClick
                      aria-hidden="true"
                      size={17}
                      strokeWidth={2}
                    />
                    Book a Free Call
                  </Link>
                </div>
              </motion.div>

              <motion.aside
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                className="studio-surface studio-surface--quiet p-5 shadow-rest sm:p-6"
                initial={reduce ? false : { opacity: 0, y: 18 }}
                transition={{
                  delay: reduce ? 0 : 0.08,
                  duration: 0.65,
                  ease: easeOutExpo,
                }}
              >
                <div className="relative z-10">
                  <p className="studio-eyebrow mb-5 text-accent">
                    [ Reading Brief ]
                  </p>
                  <p className="text-xl font-semibold leading-snug text-foreground">
                    {signal.question}
                  </p>
                  <p className="mt-5 studio-body text-muted-foreground">
                    {signal.situation}
                  </p>
                  <div className="mt-6 border-t border-border pt-5">
                    <p className="studio-tag text-subtle-foreground">
                      Good for
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground">
                      {signal.brief}
                    </p>
                  </div>
                </div>
              </motion.aside>
            </div>
          </Container>
        </Section>

        <Section
          className="scroll-mt-28 border-b border-border bg-surface-alt"
          id="article"
          spacing="default"
        >
          <Container>
            <div className="grid gap-10 lg:grid-cols-[minmax(180px,0.34fr)_minmax(0,760px)_minmax(180px,0.22fr)] lg:items-start">
              <aside className="lg:sticky lg:top-28">
                <p className="studio-eyebrow mb-4 text-accent">
                  [ Reader Guide ]
                </p>
                <div className="space-y-4 border-t border-border pt-4">
                  <GuideItem label="Category" value={post.category} />
                  <GuideItem label="Published" value={formatDate(post.date)} />
                  <GuideItem label="Read time" value={post.readingTime} />
                </div>
              </aside>

              <motion.article
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                className="rounded-[var(--radius-lg)] border border-border-strong bg-elevated p-6 shadow-rest sm:p-8 lg:p-10"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                transition={{ duration: 0.65, ease: easeOutExpo }}
              >
                <div className="mb-8 border-b border-border pb-6">
                  <p className="studio-eyebrow text-accent">[ Kivox Note ]</p>
                  <p className="mt-3 max-w-[65ch] studio-body text-muted-foreground">
                    Written for business owners and operators who want a better
                    website without needing to become web experts first.
                  </p>
                </div>

                <div className="prose-kivox">{children}</div>
              </motion.article>

              <aside className="hidden lg:sticky lg:top-28 lg:block">
                <div className="border-t border-border pt-4">
                  <p className="studio-eyebrow text-subtle-foreground">
                    Next step
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    If this article describes your current site, bring the link
                    to a call and we will make the problem concrete.
                  </p>
                  <Link
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
                    href="/contact"
                    prefetch={false}
                  >
                    Talk to Kivox
                    <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
                  </Link>
                </div>
              </aside>
            </div>
          </Container>
        </Section>

        <Section spacing="default">
          <Container>
            <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-elevated p-6 shadow-rest sm:p-8 lg:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
                <div>
                  <p className="studio-eyebrow mb-4 text-accent">
                    [ After Reading ]
                  </p>
                  <h2 className="studio-h2-editorial max-w-3xl text-foreground">
                    Want the same clarity applied to your own website?
                  </h2>
                  <p className="mt-5 max-w-2xl studio-body text-muted-foreground">
                    We can review the current experience, spot trust leaks, and
                    map the next practical step without burying you in jargon.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[420px]:flex-row lg:justify-end">
                  <Link
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-28px_var(--accent)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    href="/contact"
                    prefetch={false}
                  >
                    <MousePointerClick
                      aria-hidden="true"
                      size={17}
                      strokeWidth={2}
                    />
                    Book a Free Call
                  </Link>
                  <Link
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-5 text-sm font-semibold text-foreground transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    href="/blog"
                    prefetch={false}
                  >
                    <LibraryBig aria-hidden="true" size={17} strokeWidth={2} />
                    More Articles
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </div>
    </>
  );
}

function MetaPill({
  icon,
  label,
}: {
  icon: "date" | "time";
  label: string;
}) {
  const Icon = icon === "date" ? CalendarDays : Clock3;

  return (
    <span className="studio-tag inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1.5 text-muted-foreground">
      <Icon aria-hidden="true" size={13} strokeWidth={2} />
      {label}
    </span>
  );
}

function GuideItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="studio-tag text-subtle-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold leading-relaxed text-foreground">
        {value}
      </p>
    </div>
  );
}
