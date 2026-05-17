import Image from "next/image";
import * as motion from "motion/react-client";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ConstellationCanvas } from "@/components/ui/ConstellationCanvas";
import { ButtonLink } from "@/components/ui/Button";
import { HeroHeadline } from "@/components/sections/HeroHeadline";
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
            <HeroHeadline className="mb-4" />

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
            className="relative mx-auto mt-8 w-full max-w-[20rem] sm:max-w-lg lg:mt-0 lg:max-w-[520px] xl:max-w-[560px]"
          >
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#141413]/85 shadow-[0_32px_90px_-52px_rgba(217,119,87,0.62)] ring-1 ring-white/10">
              <div className="relative aspect-[16/10] bg-[#141413]">
                <Image
                  src="/work/mockups/kivox-hero-atelier.webp"
                  alt="Abstract Kivox design system turning website visitors into business actions"
                  fill
                  className="object-cover"
                  fetchPriority="high"
                  loading="eager"
                  sizes="(max-width: 640px) 80vw, (max-width: 1024px) 520px, 560px"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
