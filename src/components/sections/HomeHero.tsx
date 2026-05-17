import Image from "next/image";
import * as motion from "motion/react-client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { RotatingText } from "@/components/ui/RotatingText";
import { ConstellationCanvas } from "@/components/ui/ConstellationCanvas";
import { StaggeredHeadline } from "@/components/ui/StaggeredHeadline";
import { ButtonLink } from "@/components/ui/Button";
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
      <div className="absolute inset-0 z-0 dark:hidden">
        <ConstellationCanvas variant="light" />
      </div>
      <div className="absolute inset-0 z-0 hidden dark:block">
        <ConstellationCanvas variant="dark" />
      </div>

      <Container className="relative z-10 w-full">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1fr] xl:gap-12">
          <div className="max-w-[38rem] pt-8 lg:pt-0">
            <StaggeredHeadline className="mb-4">
              We build <br className="hidden lg:block" />
              websites that turn
              <br />
              visitors into{" "}
              <RotatingText />
            </StaggeredHeadline>

            <p className="mb-6 max-w-[34rem] studio-body text-muted-foreground sm:mb-8 sm:text-base lg:max-w-[28rem]">
              {home.hero.subhead}
            </p>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <ButtonLink href="/contact" variant="primary">
                {home.hero.ctas.primary}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                {home.hero.ctas.secondary}
              </ButtonLink>
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative mx-auto w-full max-w-[18rem] sm:max-w-md lg:max-w-[420px] xl:max-w-[480px] mt-8 lg:mt-0"
          >
            <div className="relative overflow-hidden rounded-xl border border-border shadow-2xl ring-1 ring-black/5 dark:ring-white/10 bg-[#f4f4f4] dark:bg-[#1a1a1a]">
              <div className="flex h-10 items-center gap-2 border-b border-border/40 bg-[#f4f4f4] dark:bg-[#1a1a1a] px-4">
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
                  sizes="(max-width: 640px) 70vw, (max-width: 768px) 88vw, 480px"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-black/10 dark:ring-white/10" />
            </div>
            <div className="absolute -inset-8 z-[-1] rounded-full bg-accent/20 opacity-100 blur-[60px]" />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
