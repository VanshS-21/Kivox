import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RotatingText } from "@/components/ui/RotatingText";
import { home } from "@/content/pages/home";

export function HomeHero() {
  return (
    <Section
      spacing="none"
      className="relative flex items-center overflow-hidden pt-[calc(5rem+env(safe-area-inset-top))] pb-12 sm:pt-24 sm:pb-16 md:pt-[calc(6rem+env(safe-area-inset-top))] md:pb-20 lg:pt-28 lg:pb-24"
      style={{
        background: "var(--background)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 75% 25%, color-mix(in oklch, var(--accent) 5%, transparent), transparent 50%)",
        }}
      />

      <Container className="relative z-10 w-full">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr] xl:gap-12">
          <div className="max-w-[38rem] pt-8 lg:pt-0">
            <h1 className="mb-4 studio-h1-headline text-foreground">
              We build <br className="hidden lg:block" />
              websites that turn
              <br />
              visitors into{" "}
              <RotatingText />
            </h1>

            <p className="mb-6 max-w-[34rem] studio-body text-muted-foreground sm:mb-8 sm:text-base lg:max-w-[28rem]">
              {home.hero.subhead}
            </p>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-medium text-accent-ink shadow-rest transition hover:-translate-y-0.5 hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {home.hero.ctas.primary}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
              <Link
                href="/work"
                prefetch={false}
                className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-surface px-6 text-sm font-medium text-foreground shadow-rest transition hover:-translate-y-0.5 hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {home.hero.ctas.secondary}
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative mx-auto w-full max-w-[18rem] sm:max-w-md lg:max-w-[420px] xl:max-w-[480px]">
            <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
              <div className="flex h-10 items-center gap-2 border-b border-border bg-muted/50 px-4">
                <div className="h-3 w-3 rounded-full bg-red-400/80 shadow-sm" />
                <div className="h-3 w-3 rounded-full bg-amber-400/80 shadow-sm" />
                <div className="h-3 w-3 rounded-full bg-green-400/80 shadow-sm" />
              </div>
              <div className="relative aspect-[16/10] bg-muted/20">
                <Image
                  src="/work/mockups/Cafe-1.webp"
                  alt="Kivox Website Showcase"
                  fill
                  className="object-cover object-top"
                  fetchPriority="high"
                  loading="eager"
                  preload
                  sizes="(max-width: 640px) 70vw, (max-width: 768px) 88vw, 480px"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
            </div>
            <div className="absolute -inset-4 z-[-1] rounded-full bg-accent/20 opacity-100 blur-3xl" />
          </div>
        </div>
      </Container>
    </Section>
  );
}
