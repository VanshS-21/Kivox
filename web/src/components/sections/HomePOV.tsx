"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomePOV() {
  const reduce = useReducedMotion();

  return (
    <Section className="relative py-[140px] lg:py-[200px] overflow-hidden bg-background">
      {/* Subtle accent glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/[0.04] blur-[160px] pointer-events-none" />

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="flex justify-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="studio-eyebrow text-accent">
              Philosophy
            </span>
          </div>
        </motion.div>

        {/* Large centered quote — uses h2 scale but bold sans for impact */}
        <motion.blockquote
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...transitionDefault, delay: 0.1 }}
          className="text-center max-w-5xl mx-auto"
        >
          <p className="studio-h2 font-sans font-bold text-foreground">
            We believe great digital platforms
            <br className="hidden lg:block" /> are not built — they are{" "}
            <em
              className="font-serif font-normal text-accent"
              style={{ fontStyle: "italic" }}
            >
              crafted.
            </em>
          </p>
        </motion.blockquote>

        {/* Supporting body text */}
        <motion.p
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...transitionDefault, delay: 0.2 }}
          className="text-center studio-body-serif text-muted-foreground max-w-2xl mx-auto mt-10 lg:mt-14"
        >
          {home.philosophy.body}
        </motion.p>
      </Container>
    </Section>
  );
}
