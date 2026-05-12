"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault } from "@/lib/motion";

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <Section spacing="tight">
      <Container>
        <Panel className="relative" noise padding="lg">
          <div className="flex flex-col gap-8 md:gap-10">
            <Eyebrow className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 rounded-full bg-accent" aria-hidden />
              Kivox Studio
            </Eyebrow>

            <motion.div
              initial={reduce ? false : "hidden"}
              animate={reduce ? undefined : "show"}
              variants={fadeUp}
              transition={transitionDefault}
            >
              <h1 className="text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {home.hero.headline}
              </h1>
            </motion.div>

            <motion.p
              initial={reduce ? false : "hidden"}
              animate={reduce ? undefined : "show"}
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: 0.06 }}
              className="max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg"
            >
              {home.hero.subhead}
            </motion.p>

            <motion.div
              initial={reduce ? false : "hidden"}
              animate={reduce ? undefined : "show"}
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: 0.1 }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href="/#contact" variant="primary">
                {home.hero.ctas.primary}
              </ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                {home.hero.ctas.secondary}
              </ButtonLink>
            </motion.div>

            {/* Small “console readout” footer */}
            <div className="grid grid-cols-1 gap-3 pt-4 text-xs text-muted-foreground sm:grid-cols-3">
              <div className="flex items-center justify-between rounded-[var(--radius-sm)] border border-border bg-surface-0/70 px-4 py-3">
                <span className="uppercase tracking-[0.12em]">Mode</span>
                <span className="font-mono text-foreground">studio</span>
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-sm)] border border-border bg-surface-0/70 px-4 py-3">
                <span className="uppercase tracking-[0.12em]">Signal</span>
                <span className="font-mono text-foreground">clarity</span>
              </div>
              <div className="flex items-center justify-between rounded-[var(--radius-sm)] border border-border bg-surface-0/70 px-4 py-3">
                <span className="uppercase tracking-[0.12em]">Output</span>
                <span className="font-mono text-foreground">trust</span>
              </div>
            </div>
          </div>
        </Panel>
      </Container>
    </Section>
  );
}
