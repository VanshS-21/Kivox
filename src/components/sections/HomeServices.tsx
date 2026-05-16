"use client";

import { useState, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import {
  fadeUp,
  transitionDefault,
  viewportOnce,
  easeOutExpo,
} from "@/lib/motion";

export function HomeServices() {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress: enterProgress } = useScroll({
    target: ref,
    offset: ["start end", "start center"],
  });

  const sectionScale = useTransform(enterProgress, [0, 1], [0.95, 1]);
  const sectionRotateX = useTransform(enterProgress, [0, 1], [10, 0]);
  const sectionOpacity = useTransform(enterProgress, [0, 0.5], [0, 1]);

  return (
    <Section
      id="services"
      spacing="loose"
      className="relative overflow-hidden bg-surface-alt"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        ref={ref}
        style={{
          scale: reduce ? 1 : sectionScale,
          rotateX: reduce ? 0 : sectionRotateX,
          opacity: reduce ? 1 : sectionOpacity,
          transformOrigin: "top center",
        }}
      >
        <Container className="relative z-10">
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={fadeUp}
            transition={transitionDefault}
            className="mb-12 md:mb-20 lg:mb-24"
          >
            <p className="studio-eyebrow text-accent mb-5">[ Services ]</p>
            <h2 className="studio-h2-editorial max-w-3xl text-foreground">
              What Kivox builds.
            </h2>
          </motion.div>

          {/* Desktop: Interactive Index Layout */}
          <div className="hidden lg:grid grid-cols-[1fr_1.1fr] gap-12 xl:gap-20 items-center">
            {/* Left: Titles */}
            <div className="flex flex-col relative py-4">
              {/* Vertical track */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40" />

              {home.services.map((service, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={service.id}
                    onMouseEnter={() => setActiveIdx(idx)}
                    onClick={() => setActiveIdx(idx)}
                    className="text-left py-6 xl:py-7 pl-8 xl:pl-12 relative group focus:outline-none"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="services-active-indicator"
                        className="absolute left-[-1px] top-0 bottom-0 w-[3px] bg-accent z-10 rounded-r-full shadow-[0_0_12px_var(--accent)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <h3
                      className="studio-h3-sans transition-all duration-300"
                      style={{
                        color: isActive
                          ? "var(--accent)"
                          : "var(--fg-subtle)",
                        transform: isActive ? "translateX(8px)" : "none",
                      }}
                    >
                      {service.title}.
                    </h3>
                  </button>
                );
              })}
            </div>

            {/* Right: Floating Elevated Card (The Lens) */}
            <div className="relative h-[480px] xl:h-[540px]" style={{ perspective: "1200px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, rotateX: 4, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, rotateX: 0, y: 0, scale: 1 }}
                  exit={{ opacity: 0, rotateX: -4, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: easeOutExpo }}
                  className="absolute inset-0 studio-surface rounded-2xl p-10 xl:p-14 flex flex-col justify-between overflow-hidden border border-border/40"
                  style={{
                     boxShadow: "0 20px 60px oklch(0 0 0 / 0.15), 0 1px 3px oklch(0 0 0 / 0.05)"
                  }}
                >
                  {/* Subtle internal glow */}
                  <div className="absolute top-0 right-0 w-72 h-72 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

                  <div className="relative z-10">
                    {/* Numbered index — differentiates each service, replaces generic icon */}
                    <p className="font-mono text-4xl xl:text-5xl font-medium text-accent/25 mb-6 studio-tabular select-none leading-none">
                      {String(activeIdx + 1).padStart(2, "0")}
                    </p>

                    <h4 className="studio-h4-sans text-foreground mb-4">
                      {home.services[activeIdx].title}
                    </h4>
                    <p className="studio-body text-muted-foreground text-lg xl:text-xl max-w-md leading-relaxed">
                      {home.services[activeIdx].summary}
                    </p>
                  </div>

                  <div className="relative z-10 mt-8 pt-8 border-t border-border/40">
                    <p className="text-sm leading-6 text-subtle-foreground mb-5">
                      Good for: <span className="text-muted-foreground">{home.services[activeIdx].examples.join(", ")}.</span>
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {home.services[activeIdx].tags.map((tag, tagIdx) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 + tagIdx * 0.05 }}
                          className="px-4 py-2 border border-border/60 rounded-full studio-tag text-muted-foreground bg-surface/30"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile: Accordion / Stack Layout */}
          <div className="flex flex-col gap-6 lg:hidden">
            {home.services.map((service, idx) => {
              return (
                <motion.article
                  key={service.id}
                  initial={reduce ? false : "hidden"}
                  whileInView={reduce ? undefined : "show"}
                  viewport={viewportOnce}
                  variants={fadeUp}
                  transition={{ ...transitionDefault, delay: idx * 0.05 }}
                  className="studio-surface rounded-2xl p-6 sm:p-8 flex flex-col relative overflow-hidden"
                >
                  <div className="flex items-start gap-5 mb-6">
                    {/* Zero-padded index — identifies service without generic iconography */}
                    <span className="font-mono text-2xl font-medium text-accent/30 studio-tabular select-none leading-none shrink-0 pt-1">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="studio-h3-sans text-foreground">
                      {service.title}.
                    </h3>
                  </div>
                  
                  <p className="studio-body text-muted-foreground mb-6">
                    {service.summary}
                  </p>
                  
                  <div className="mt-auto pt-5 border-t border-border/40">
                    <p className="text-sm text-subtle-foreground mb-4">
                      Good for: <span className="text-muted-foreground">{service.examples.join(", ")}.</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1.5 border border-border/60 rounded-full studio-tag text-xs text-muted-foreground bg-surface/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </motion.div>
    </Section>
  );
}
