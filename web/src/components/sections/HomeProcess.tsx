"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce, easeOutExpo } from "@/lib/motion";

export function HomeProcess() {
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState(0);

  const steps = home.process;

  // Subtle hue gradient: warmer amber → amber-gold across phases
  const stepColors = [
    "oklch(0.72 0.18 55)",
    "oklch(0.72 0.18 60)",
    "oklch(0.72 0.18 65)",
    "oklch(0.72 0.18 72)",
  ];

  return (
    <Section className="relative py-[80px] lg:py-[120px] overflow-hidden bg-surface-alt">
      <Container className="relative z-10">
        {/* Section label */}
        <motion.div initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={transitionDefault} className="inline-flex items-center gap-3 mb-14 lg:mb-20">
          <span className="studio-eyebrow text-accent">Our Methodology</span>
        </motion.div>

        {/* Heading + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 mb-20 lg:mb-28">
          <motion.h2 initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: 0.05 }} className="lg:col-span-7 studio-h2 font-sans font-bold text-foreground">
            A proven process<br />
            <em className="font-serif font-normal text-accent" style={{ fontStyle: "italic" }}>for exceptional results.</em>
          </motion.h2>
          <motion.p initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: 0.1 }} className="lg:col-span-5 studio-body-serif text-muted-foreground self-end">
            Every project follows the same disciplined arc, from understanding the problem to crafting a solution that endures.
          </motion.p>
        </div>

        {/* ── Desktop: Horizontal number ticker ── */}
        <div className="hidden lg:block">
          {/* Number row */}
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.15 }}
            className="flex items-end justify-between mb-0"
          >
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              const num = String(idx + 1).padStart(2, "0");

              return (
                <button
                  key={idx}
                  onMouseEnter={() => setActiveStep(idx)}
                  onFocus={() => setActiveStep(idx)}
                  className="group relative outline-none cursor-pointer flex-1 text-center pb-6"
                  aria-label={`Phase ${idx + 1}: ${step.title}`}
                >
                  {/* Number */}
                  <motion.span
                    animate={{
                      opacity: isActive ? 1 : 0.12,
                      scale: isActive ? 1 : 0.9,
                    }}
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                    className="block font-mono studio-tabular select-none"
                    style={{
                      fontSize: "clamp(3rem, 4vw, 5rem)",
                      fontWeight: 700,
                      lineHeight: 1,
                      color: isActive ? stepColors[idx] : undefined,
                    }}
                  >
                    {num}
                  </motion.span>

                  {/* Step title preview under number */}
                  <motion.span
                    animate={{ opacity: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                    className="block text-xs uppercase tracking-[0.12em] mt-3 font-mono"
                    style={{
                      color: isActive ? "var(--accent)" : "var(--fg-muted)",
                      transition: "color 0.3s",
                    }}
                  >
                    {step.title}
                  </motion.span>

                  {/* Active indicator line */}
                  <motion.div
                    className="absolute bottom-0 left-[10%] right-[10%] h-[2px] bg-accent origin-center"
                    initial={false}
                    animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: easeOutExpo }}
                  />
                </button>
              );
            })}
          </motion.div>

          {/* Thin rule */}
          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }}
            className="border-t border-border/50 origin-left"
          />

          {/* Detail area — crossfades between steps */}
          <div className="pt-10 pb-4 min-h-[140px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: easeOutExpo }}
                className="max-w-xl"
              >
                <h3
                  className="font-serif text-foreground mb-2"
                  style={{
                    fontSize: "clamp(1.6rem, 1.5vw + 0.6rem, 2.2rem)",
                    fontWeight: 400,
                    lineHeight: 1.2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {steps[activeStep].title}
                </h3>
                <span
                  className="block studio-eyebrow text-accent mb-3"
                >
                  {steps[activeStep].subtitle}
                </span>
                <p
                  className="text-muted-foreground studio-body"
                >
                  {steps[activeStep].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: Stacked list fallback ── */}
        <div className="lg:hidden">
          {steps.map((step, idx) => {
            const num = String(idx + 1).padStart(2, "0");
            return (
              <motion.div
                key={idx}
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...transitionDefault, delay: idx * 0.06 }}
                className="border-t border-border/50 py-5"
                style={idx === steps.length - 1 ? { borderBottom: "0.5px solid var(--border)" } : undefined}
              >
                <span
                  className="block font-serif text-sm mb-2 studio-tabular"
                  style={{ fontStyle: "italic", color: stepColors[idx] }}
                >
                  {num}
                </span>
                <h3
                  className="font-serif text-foreground mb-1"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 400,
                    lineHeight: 1.2,
                  }}
                >
                  {step.title}
                </h3>
                <span
                  className="block studio-eyebrow text-accent mb-2"
                >
                  {step.subtitle}
                </span>
                <p
                  className="text-muted-foreground studio-body"
                >
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
