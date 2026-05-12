"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";
import { fadeUp, stagger, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeProcess() {
  const reduce = useReducedMotion();

  return (
    <Section id="process">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Eyebrow>Process</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              A disciplined sequence that keeps you moving
            </h2>
          </div>

          <motion.ol
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={stagger}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {home.process.map((step, idx) => (
              <motion.li
                key={step}
                variants={fadeUp}
                transition={transitionDefault}
              >
                <Panel padding="md">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-0 font-mono text-xs text-foreground shadow-[var(--shadow-1)]">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="pt-1 text-sm leading-6 text-muted-foreground">{step}</div>
                  </div>
                </Panel>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </Container>
    </Section>
  );
}
