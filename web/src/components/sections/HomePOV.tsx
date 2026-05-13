"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomePOV() {
  const reduce = useReducedMotion();

  return (
    <Section className="relative py-[180px] lg:py-[260px] overflow-hidden" style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--pov-wash) 40%, var(--pov-wash) 60%, var(--bg-primary) 100%)' }}>
      {/* Committed amber glow — large, visible, intentional */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full blur-[200px] pointer-events-none" style={{ background: 'var(--accent)', opacity: 'calc(var(--hero-glow-opacity) * 0.7)' }} />
      {/* Secondary rose depth */}
      <div className="absolute top-[30%] right-[15%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none" style={{ background: 'var(--accent-rose)', opacity: 'calc(var(--hero-glow-opacity) * 0.35)' }} />

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="flex justify-center mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="studio-eyebrow text-accent">
              Philosophy
            </span>
          </div>
        </motion.div>

        {/* Large centered quote — pushed to h1-level scale for impact */}
        <motion.blockquote
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...transitionDefault, delay: 0.1 }}
          className="text-center max-w-6xl mx-auto"
        >
          <p className="font-sans font-bold text-foreground" style={{ fontSize: 'clamp(2.25rem, 4vw + 1rem, 5rem)', lineHeight: 1.06, letterSpacing: '-0.02em' }}>
            We believe great digital platforms
            <br className="hidden lg:block" /> are not built; they are{" "}
            <em
              className="font-serif font-normal text-accent"
              style={{ fontStyle: "italic" }}
            >
              crafted.
            </em>
          </p>
        </motion.blockquote>

        {/* Supporting body text — generous spacing from the quote */}
        <motion.p
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...transitionDefault, delay: 0.2 }}
          className="text-center studio-body-serif text-muted-foreground max-w-2xl mx-auto mt-12 lg:mt-16"
        >
          {home.philosophy.body}
        </motion.p>
      </Container>
    </Section>
  );
}
