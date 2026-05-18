import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  Clock3,
  LibraryBig,
  MousePointerClick,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { categoryToId, getArticleSignal } from "@/lib/blog-signals";
import type { BlogPostMeta } from "@/lib/blog-types";
import { formatDate } from "@/lib/blog-types";

const shelfNotes = [
  "Plain-language strategy for owners who do not want a lecture in tech jargon.",
  "Practical website decisions: trust, clarity, search, launch quality, and buyer confidence.",
  "No fabricated benchmarks, no generic marketing filler, no keyword-stuffed articles.",
];

export function BlogListingContent({ posts }: { posts: BlogPostMeta[] }) {
  const featured = posts[0];
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  if (!featured) {
    return (
      <Section className="pt-32" spacing="default">
        <Container>
          <p className="studio-eyebrow mb-5 text-accent">[ Articles ]</p>
          <h1 className="studio-h1-headline text-foreground">
            Articles for better business websites.
          </h1>
          <p className="mt-6 studio-lede">No articles published yet.</p>
        </Container>
      </Section>
    );
  }

  return (
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
              "radial-gradient(circle at 80% 20%, color-mix(in oklch, var(--accent) 12%, transparent), transparent 34%), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px), linear-gradient(180deg, var(--border-soft) 1px, transparent 1px)",
            backgroundSize: "auto, 88px 88px, 88px 88px",
          }}
        />

        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.66fr)] lg:items-end">
            <div className="max-w-4xl">
              <p className="studio-eyebrow mb-5 text-accent">
                [ Studio Notes ]
              </p>
              <h1 className="studio-h1-headline max-w-4xl text-foreground">
                Articles for better business websites.
              </h1>
              <p className="mt-6 max-w-2xl studio-lede">
                Practical writing on design, trust, SEO, and building a
                business presence online. No filler, no jargon.
              </p>
              <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                <a
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-28px_var(--accent)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  href="#articles"
                >
                  <LibraryBig aria-hidden="true" size={17} strokeWidth={2} />
                  Browse Articles
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
            </div>

            <aside className="studio-surface studio-surface--quiet p-5 shadow-rest sm:p-6">
              <div className="relative z-10">
                <p className="studio-eyebrow mb-5 text-accent">
                  [ Reading Shelf ]
                </p>
                <div className="space-y-4">
                  {shelfNotes.map((note, index) => (
                    <div
                      className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-4 first:border-t-0 first:pt-0"
                      key={note}
                    >
                      <span className="studio-tag studio-tabular text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="studio-body-small text-muted-foreground">
                        {note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="border-b border-border bg-surface-alt" spacing="tight">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.34fr_1fr] lg:items-start">
            <div>
              <p className="studio-eyebrow mb-3 text-accent">
                [ Topics ]
              </p>
              <h2 className="studio-h3-sans max-w-sm text-foreground">
                Written around the questions buyers actually ask.
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {categories.map((category) => {
                const signal = getArticleSignal(category);

                return (
                  <a
                    className="group min-h-36 rounded-[var(--radius-md)] border border-border-strong bg-elevated p-4 shadow-rest transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg-surface-alt)]"
                    href={`#${categoryToId(category)}`}
                    key={category}
                  >
                    <span className="studio-tag text-accent">
                      {signal.brief}
                    </span>
                    <h3 className="mt-4 text-base font-semibold leading-snug text-foreground">
                      {category}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {signal.question}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          <FeaturedPost articleCount={posts.length} post={featured} />
        </Container>
      </Section>

      <Section
        className="scroll-mt-28 border-y border-border bg-surface-alt"
        id="articles"
        spacing="default"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.36fr_1fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="studio-eyebrow mb-4 text-accent">
                [ Article Index ]
              </p>
              <h2 className="studio-h2-editorial text-foreground">
                Keep this close before rebuilding, hiring, or launching.
              </h2>
              <p className="mt-5 studio-body text-muted-foreground">
                The library is intentionally small. Each article answers one
                useful business question instead of padding the site with
                generic content.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <a
                    className="rounded-full border border-border-strong bg-elevated px-3 py-1.5 studio-tag text-muted-foreground transition-colors duration-200 hover:border-accent/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg-surface-alt)]"
                    href={`#${categoryToId(category)}`}
                    key={category}
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {posts.map((post, index) => (
                <PostListItem index={index} key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-elevated p-6 shadow-rest sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <p className="studio-eyebrow mb-4 text-accent">
                  [ Need the Short Version? ]
                </p>
                <h2 className="studio-h2-editorial max-w-3xl text-foreground">
                  We can look at your current website and tell you where trust
                  is leaking.
                </h2>
                <p className="mt-5 max-w-2xl studio-body text-muted-foreground">
                  Bring the link, the business context, and what you want the
                  site to achieve. We will keep the conversation plain and
                  useful.
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
                  href="/work"
                  prefetch={false}
                >
                  <BookOpenText aria-hidden="true" size={17} strokeWidth={2} />
                  See the Work
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function FeaturedPost({
  articleCount,
  post,
}: {
  articleCount: number;
  post: BlogPostMeta;
}) {
  const signal = getArticleSignal(post.category);

  return (
    <article className="grid overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-elevated shadow-strong lg:grid-cols-[1fr_0.76fr]">
      <Link
        aria-label={`Read article: ${post.title}`}
        className="group flex min-h-[420px] flex-col justify-between p-6 transition-colors duration-300 ease-[var(--ease-out-expo)] hover:bg-surface/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:p-8 lg:p-10"
        href={`/blog/${post.slug}`}
        prefetch={false}
      >
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <span className="studio-tag rounded-full bg-accent-muted px-3 py-1.5 text-accent">
              Latest
            </span>
            <span className="studio-tag text-subtle-foreground">
              {post.category}
            </span>
          </div>
          <h2 className="studio-h2-editorial max-w-3xl text-foreground transition-colors duration-300 group-hover:text-accent">
            {post.title}
          </h2>
          <p className="mt-5 max-w-2xl studio-lede">{post.description}</p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
          <PostMeta post={post} />
          <span className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent transition-colors duration-200 group-hover:text-accent-hover">
            Read Article
            <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />
          </span>
        </div>
      </Link>

      <aside className="flex min-h-[360px] flex-col justify-between border-t border-border bg-surface-alt p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
        <div>
          <p className="studio-eyebrow mb-5 text-accent">[ Why Read It ]</p>
          <p className="text-xl font-semibold leading-snug text-foreground">
            {signal.question}
          </p>
          <p className="mt-5 studio-body text-muted-foreground">
            {signal.situation}
          </p>
        </div>
        <div className="mt-8 grid gap-3 border-t border-border pt-5">
          <span className="studio-tag text-subtle-foreground">
            Current library
          </span>
          <span className="studio-h3-sans text-foreground">
            {String(articleCount).padStart(2, "0")}{" "}
            {articleCount === 1 ? "article" : "articles"}
          </span>
        </div>
      </aside>
    </article>
  );
}

function PostListItem({ post, index }: { post: BlogPostMeta; index: number }) {
  const signal = getArticleSignal(post.category);

  return (
    <article
      className="scroll-mt-28 overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-elevated shadow-rest transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-hover"
      id={categoryToId(post.category)}
    >
      <Link
        aria-label={`Read article: ${post.title}`}
        className="group grid gap-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg-surface-alt)] lg:grid-cols-[0.35fr_1fr]"
        href={`/blog/${post.slug}`}
        prefetch={false}
      >
        <div className="flex min-h-48 flex-col justify-between border-b border-border bg-surface p-5 sm:p-6 lg:border-b-0 lg:border-r">
          <div>
            <span className="studio-tag studio-tabular text-accent">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-6 text-lg font-semibold leading-tight text-foreground">
              {signal.brief}
            </h3>
          </div>
          <PostMeta post={post} compact />
        </div>

        <div className="p-5 sm:p-6 lg:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="studio-tag text-accent">{post.category}</span>
            <span className="studio-tag text-subtle-foreground">
              {formatDate(post.date)}
            </span>
          </div>
          <h3 className="studio-h3-sans text-foreground transition-colors duration-300 group-hover:text-accent">
            {post.title}
          </h3>
          <p className="mt-4 max-w-3xl studio-body text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-6 grid gap-5 border-t border-border pt-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <div>
              <p className="studio-tag text-subtle-foreground">
                Business question
              </p>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground">
                {signal.question}
              </p>
            </div>
            <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-5 text-sm font-semibold text-foreground transition-colors duration-200 group-hover:border-accent/40 group-hover:text-accent">
              Read Article
              <ArrowUpRight aria-hidden="true" size={17} strokeWidth={2} />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function PostMeta({
  compact = false,
  post,
}: {
  compact?: boolean;
  post: BlogPostMeta;
}) {
  return (
    <div
      className={
        compact
          ? "mt-6 flex flex-col gap-2"
          : "flex flex-wrap items-center gap-4"
      }
    >
      <span className="studio-tag inline-flex items-center gap-1.5 text-subtle-foreground">
        <CalendarDays aria-hidden="true" size={13} strokeWidth={2} />
        {formatDate(post.date)}
      </span>
      <span className="studio-tag inline-flex items-center gap-1.5 text-subtle-foreground">
        <Clock3 aria-hidden="true" size={13} strokeWidth={2} />
        {post.readingTime}
      </span>
    </div>
  );
}
