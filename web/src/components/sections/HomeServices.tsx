"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { StudioCard } from "@/components/ui/StudioCard";
import { fadeUp, stagger, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeServices() {
  const reduce = useReducedMotion();

  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Eyebrow>Services</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              High-craft design and build, end to end
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              A small set of systems — typography, tokens, motion, and structured content — executed with discipline.
            </p>
          </div>

          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={stagger}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {home.services.map((service, idx) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                transition={transitionDefault}
              >
                <StudioCard className="h-full">
                  <div className="flex h-full flex-col gap-3">
                    <div className="text-base font-semibold text-foreground">{service.title}</div>
                    <p className="text-sm leading-6 text-muted-foreground">{service.summary}</p>
                    <div className="mt-auto pt-2 text-xs text-muted-foreground">
                      <span className="font-mono text-foreground">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <span className="mx-2 opacity-50">/</span>
                      <span>Clarity-first delivery</span>
                    </div>
                  </div>
                </StudioCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
