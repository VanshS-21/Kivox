"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeProcess() {
  const reduce = useReducedMotion();

  return (
    <Section className="relative py-[120px] lg:py-[160px] overflow-hidden bg-surface-alt">
      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="inline-flex items-center gap-3 mb-12 lg:mb-16"
        >
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="studio-eyebrow text-accent">
            Our Methodology
          </span>
        </motion.div>

        {/* Headline + description row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-20">
          <motion.h2
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.05 }}
            className="lg:col-span-7 studio-h2 font-sans font-bold text-foreground"
          >
            A proven process
            <br />
            <em
              className="font-serif font-normal text-accent"
              style={{ fontStyle: "italic" }}
            >
              for exceptional results.
            </em>
          </motion.h2>

          <motion.p
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.1 }}
            className="lg:col-span-5 studio-body-serif text-muted-foreground self-end"
          >
            Every project follows the same disciplined arc, from understanding the problem to crafting a solution that endures.
          </motion.p>
        </div>

        {/* Hairline divider */}
        <div className="border-t border-border mb-0" />

        {/* Process steps — split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-16">
          {/* Left — numbered step list (40%) */}
          <div className="lg:col-span-5 py-8 lg:py-12">
            {home.process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...transitionDefault, delay: idx * 0.06 }}
                className={`group flex items-start gap-5 py-5 lg:py-6 ${
                  idx < home.process.length - 1
                    ? "border-b border-border-soft"
                    : ""
                }`}
              >
                {/* Step number */}
                <span className="text-[1.375rem] font-bold text-accent/50 font-mono leading-none shrink-0 pt-0.5 studio-tabular">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Step content */}
                <div>
                  <h3 className="studio-h4 font-sans font-semibold text-foreground mb-1">
                    {step.title}
                  </h3>
                  <span className="studio-eyebrow text-accent">
                    {step.subtitle}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — decorative visual (60%) */}
          <div className="lg:col-span-7 relative hidden lg:flex items-center">
            {/* Abstract gradient visual */}
            <div className="w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-elevated border border-border relative">
              {/* Layered gradient fills */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-transparent to-accent/[0.03]" />
              <div className="absolute inset-0 bg-gradient-to-tl from-elevated via-transparent to-surface" />

              {/* Geometric accents */}
              <div className="absolute top-8 left-8 w-24 h-24 border border-accent/10 rounded-full" />
              <div className="absolute top-12 left-12 w-16 h-16 border border-accent/15 rounded-full" />
              <div className="absolute bottom-12 right-12 w-32 h-32 border border-border rounded-full" />
              <div className="absolute bottom-16 right-16 w-20 h-20 border border-accent/10 rounded-full" />

              {/* Center text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[6.25rem] font-bold text-accent/[0.05] font-mono leading-none select-none studio-tabular">
                  05
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
