"use client";

import { useState, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce, easeOutExpo } from "@/lib/motion";

function TimelineArrow({ progress }: { progress: import("motion/react").MotionValue<string> }) {
  return (
    <motion.div
      className="absolute -left-[5px] flex flex-col items-center pointer-events-none"
      style={{ top: progress, marginTop: -4 }}
      aria-hidden="true"
    >
      {/* Glow behind the arrow */}
      <div
        className="absolute -top-2 w-3 h-6 rounded-full"
        style={{
          background: "oklch(0.72 0.18 65 / 0.5)",
          filter: "blur(6px)",
        }}
      />
      {/* Downward chevron arrow */}
      <svg
        width="11"
        height="14"
        viewBox="0 0 11 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Arrow body */}
        <line x1="5.5" y1="0" x2="5.5" y2="10" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
        {/* Arrow head pointing down */}
        <path d="M1.5 8L5.5 13L9.5 8" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

export function HomeProcess() {
  const reduce = useReducedMotion();
  const [hoveredStep, setHoveredStep] = useState(-1);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.8", "end 0.4"] });
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  // Arrow position tracks the fill height
  const arrowTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const totalSteps = home.process.length;

  return (
    <Section className="relative py-[140px] lg:py-[200px] overflow-hidden bg-surface-alt">
      <Container className="relative z-10">
        <motion.div initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={transitionDefault} className="inline-flex items-center gap-3 mb-14 lg:mb-20">
          <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="studio-eyebrow text-accent">Our Methodology</span>
          <motion.span initial={reduce ? false : { scaleX: 0 }} whileInView={reduce ? undefined : { scaleX: 1 }} viewport={viewportOnce} transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.3 }} className="hidden lg:block w-20 h-px bg-accent/20 origin-left" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 mb-16 lg:mb-24">
          <motion.h2 initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: 0.05 }} className="lg:col-span-7 studio-h2 font-sans font-bold text-foreground">
            A proven process<br />
            <em className="font-serif font-normal text-accent" style={{ fontStyle: "italic" }}>for exceptional results.</em>
          </motion.h2>
          <motion.p initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: 0.1 }} className="lg:col-span-5 studio-body-serif text-muted-foreground self-end">
            Every project follows the same disciplined arc, from understanding the problem to crafting a solution that endures.
          </motion.p>
        </div>

        <motion.div initial={reduce ? false : { scaleX: 0 }} whileInView={reduce ? undefined : { scaleX: 1 }} viewport={viewportOnce} transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.15 }} className="border-t border-border mb-0 origin-left" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-20">
          <div className="lg:col-span-5 py-10 lg:py-14 relative" ref={timelineRef}>
            <div className="absolute left-[1.1rem] top-10 bottom-10 w-px bg-border-soft hidden lg:block">
              <motion.div style={{ height: timelineHeight }} className="w-full bg-accent/40 origin-top" />
              {/* Scroll-driven arrow at the tip of the fill */}
              <TimelineArrow progress={arrowTop} />
            </div>

            {home.process.map((step, idx) => (
              <motion.div key={idx} initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: idx * 0.08 }}
                className={`group flex items-start gap-6 py-6 lg:py-8 cursor-pointer relative ${idx < home.process.length - 1 ? "border-b border-border-soft" : ""}`}
                onMouseEnter={() => setHoveredStep(idx)} onMouseLeave={() => setHoveredStep(-1)}
              >
                <motion.span
                  animate={{ scale: hoveredStep === idx ? 1.15 : 1, opacity: hoveredStep === idx ? 1 : 0.5 }}
                  transition={{ duration: 0.3, ease: easeOutExpo }}
                  className="text-[1.75rem] font-bold text-accent font-mono leading-none shrink-0 pt-0.5 studio-tabular relative z-10"
                >
                  {String(idx + 1).padStart(2, "0")}
                  <motion.span
                    animate={{ scale: hoveredStep === idx ? 1 : 0.5, opacity: hoveredStep === idx ? 0.2 : 0 }}
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                    className="absolute inset-[-8px] rounded-full bg-accent pointer-events-none -z-10"
                    style={{ filter: "blur(8px)" }}
                    aria-hidden="true"
                  />
                </motion.span>
                <div>
                  <motion.h3 animate={{ color: hoveredStep === idx ? 'var(--accent)' : 'var(--fg-primary)' }} transition={{ duration: 0.3 }} className="studio-h4 font-sans font-semibold mb-2">{step.title}</motion.h3>
                  <span className="studio-eyebrow text-accent">{step.subtitle}</span>
                  <div className="overflow-hidden transition-all duration-500" style={{ display: "grid", gridTemplateRows: hoveredStep === idx ? "1fr" : "0fr" }}>
                    <div className="min-h-0 overflow-hidden">
                      <p className="studio-body-small text-muted-foreground pt-3">{step.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={reduce ? false : { opacity: 0, scale: 0.96, filter: "blur(8px)" }} whileInView={reduce ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.2 }} className="lg:col-span-7 relative hidden lg:flex items-center">
            <div className="w-full aspect-[16/10] relative rounded-[20px] overflow-hidden bg-elevated border border-border">
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 40% 40%, var(--accent), transparent 70%)", opacity: 0.06 }} />
              <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 70% 70%, var(--accent-rose), transparent 60%)", opacity: 0.04 }} />
              <div className="absolute inset-0 flex items-center justify-center gap-4">
                {home.process.map((_, idx) => (
                  <motion.span key={idx} animate={{ opacity: hoveredStep === idx ? 0.12 : 0.04, scale: hoveredStep === idx ? 1.1 : 1 }} transition={{ duration: 0.4, ease: easeOutExpo }} className="text-[5rem] lg:text-[6rem] font-bold font-mono leading-none select-none studio-tabular text-accent">
                    {String(idx + 1).padStart(2, "0")}
                  </motion.span>
                ))}
              </div>
              <div className="absolute bottom-6 left-8 flex items-center gap-3 z-10">
                <div className="w-6 h-px bg-accent/30" />
                <span className="studio-tag text-subtle-foreground">
                  {hoveredStep >= 0 ? `Phase ${hoveredStep + 1}: ${home.process[hoveredStep]?.title || ""}` : "Five-Phase Methodology"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
