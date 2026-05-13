"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeProcess() {
  const reduce = useReducedMotion();

  return (
    <Section className="relative py-[140px] lg:py-[200px] overflow-hidden bg-surface-alt">
      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="inline-flex items-center gap-3 mb-14 lg:mb-20"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="studio-eyebrow text-accent">
            Our Methodology
          </span>
        </motion.div>

        {/* Headline + description row — more generous gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 mb-16 lg:mb-24">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-20">
          {/* Left — numbered step list (40%) */}
          <div className="lg:col-span-5 py-10 lg:py-14">
            {home.process.map((step, idx) => (
              <motion.div
                key={idx}
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...transitionDefault, delay: idx * 0.06 }}
                className={`group flex items-start gap-6 py-6 lg:py-8 ${
                  idx < home.process.length - 1
                    ? "border-b border-border-soft"
                    : ""
                }`}
              >
                {/* Step number — larger, more presence */}
                <span className="text-[1.75rem] font-bold text-accent/50 font-mono leading-none shrink-0 pt-0.5 studio-tabular group-hover:text-accent/80 transition-colors duration-300">
                  {String(idx + 1).padStart(2, "0")}
                </span>

                {/* Step content */}
                <div>
                  <h3 className="studio-h4 font-sans font-semibold text-foreground mb-2 group-hover:text-accent transition-colors duration-200">
                    {step.title}
                  </h3>
                  <span className="studio-eyebrow text-accent">
                    {step.subtitle}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — decorative visual (60%) — bolder, more committed */}
          <div className="lg:col-span-7 relative hidden lg:flex items-center">
            <div className="w-full aspect-[16/10] rounded-[20px] overflow-hidden bg-elevated border border-border relative">
              {/* Bold amber gradient fill — committed, not tentative */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, var(--bg-elevated) 0%, var(--bg-surface) 40%, var(--bg-elevated) 100%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.10]"
                style={{
                  background: 'radial-gradient(ellipse at 30% 40%, var(--accent), transparent 65%)',
                }}
              />
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  background: 'radial-gradient(ellipse at 80% 70%, var(--accent-rose), transparent 55%)',
                }}
              />

              {/* Refined geometric accents — fewer, larger, more confident */}
              <div className="absolute top-10 left-10 w-40 h-40 border border-accent/[0.12] rounded-full" />
              <div className="absolute top-16 left-16 w-24 h-24 border-2 border-accent/[0.08] rounded-full" />
              <div className="absolute bottom-10 right-10 w-52 h-52 border border-border rounded-full" />

              {/* Large step count watermark — bold presence */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-[8rem] font-bold font-mono leading-none select-none studio-tabular"
                  style={{ color: 'var(--accent)', opacity: 0.06 }}
                >
                  05
                </span>
              </div>

              {/* Methodology label */}
              <div className="absolute bottom-8 left-10 flex items-center gap-3">
                <div className="w-8 h-px bg-accent/30" />
                <span className="studio-tag text-subtle-foreground">Five-phase methodology</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
