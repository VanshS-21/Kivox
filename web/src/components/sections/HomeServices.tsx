"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce, easeOutExpo } from "@/lib/motion";

export function HomeServices() {
  const reduce = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <Section
      id="services"
      className="relative py-[120px] lg:py-[180px] overflow-hidden bg-surface-alt"
      style={{ perspective: "1200px" }}
    >
      <Container className="relative z-10">
        {/* Section eyebrow */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="mb-20 lg:mb-28"
        >
          <span className="studio-eyebrow text-accent">[ Our Services ]</span>
        </motion.div>

        {/* Service list — depth fan on hover */}
        <div>
          {home.services.map((service, idx) => {
            const isHovered = hoveredIdx === idx;
            const isSibling = hoveredIdx !== null && hoveredIdx !== idx;
            const distance = hoveredIdx !== null ? Math.abs(idx - hoveredIdx) : 0;

            return (
              <motion.div
                key={service.id}
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...transitionDefault, delay: idx * 0.06 }}
                className="group cursor-pointer outline-none"
                tabIndex={0}
                role="button"
                aria-expanded={isHovered}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onFocus={() => setHoveredIdx(idx)}
                onBlur={() => setHoveredIdx(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setHoveredIdx(isHovered ? null : idx);
                  }
                }}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
              >
                {/* Top border on first item */}
                {idx === 0 && <div className="h-px bg-border" />}

                <motion.div
                  animate={{
                    y: isHovered ? -4 : isSibling ? distance * 2 : 0,
                    rotateX: isHovered ? 0 : isSibling ? distance * 1.2 : 0,
                    scale: isHovered ? 1.01 : isSibling ? 1 - distance * 0.008 : 1,
                    opacity: isHovered ? 1 : isSibling ? Math.max(0.5, 1 - distance * 0.15) : 1,
                    z: isHovered ? 30 : isSibling ? -distance * 10 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="py-12 lg:py-16 xl:py-20"
                >
                  {/* Arrow + Title row */}
                  <div className="flex items-center gap-5 sm:gap-7 lg:gap-10 mb-6 lg:mb-8">
                    {/* Arrow icon with pulse ring */}
                    <div className="relative shrink-0">
                      {/* Pulse ring — expands and fades on hover */}
                      <motion.div
                        animate={{
                          scale: isHovered ? [1, 1.8] : 1,
                          opacity: isHovered ? [0.4, 0] : 0,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: easeOutExpo,
                          repeat: isHovered ? Infinity : 0,
                          repeatDelay: 0.6,
                        }}
                        className="absolute inset-0 rounded-xl bg-accent pointer-events-none"
                        aria-hidden="true"
                      />
                      <motion.div
                        animate={{
                          backgroundColor: isHovered ? 'var(--accent)' : 'transparent',
                          borderColor: isHovered ? 'var(--accent)' : 'var(--border-strong)',
                          scale: isHovered ? 1.12 : 1,
                          rotate: isHovered ? 45 : 0,
                        }}
                        transition={{ duration: 0.4, ease: easeOutExpo }}
                        className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl border-[1.5px] flex items-center justify-center relative z-10 transition-shadow duration-300"
                        style={{
                          boxShadow: isHovered
                            ? 'var(--shadow-service-glow)'
                            : 'none',
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          style={{ color: isHovered ? 'var(--bg-primary)' : 'var(--fg-muted)' }}
                        >
                          <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Service title */}
                    <motion.h3
                      animate={{
                        color: isHovered ? 'var(--accent)' : 'var(--fg-primary)',
                      }}
                      transition={{ duration: 0.3 }}
                      className="font-sans font-bold"
                      style={{
                        fontSize: 'clamp(2rem, 3.5vw + 0.5rem, 4.5rem)',
                        lineHeight: 1.08,
                        letterSpacing: '-0.025em',
                      }}
                    >
                      {service.title}.
                    </motion.h3>
                  </div>

                  {/* Expandable summary */}
                  <div
                    className="overflow-hidden transition-all duration-500 pl-[4.25rem] sm:pl-[5.25rem] lg:pl-[6.5rem]"
                    style={{
                      display: "grid",
                      gridTemplateRows: isHovered ? "1fr" : "0fr",
                    }}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <p className="studio-body text-muted-foreground max-w-lg pb-2">
                        {service.summary}
                      </p>
                    </div>
                  </div>

                  {/* Sub-capability pill tags */}
                  <div className="flex flex-wrap gap-2.5 mt-5 lg:mt-6 pl-[4.25rem] sm:pl-[5.25rem] lg:pl-[6.5rem]">
                    {service.tags.map((tag, tagIdx) => (
                      <motion.span
                        key={tag}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.4, ease: easeOutExpo, delay: idx * 0.06 + tagIdx * 0.04 }}
                        className="px-4 py-2 border border-border rounded-full studio-tag text-muted-foreground transition-all duration-200 hover:border-accent/40 hover:text-accent hover:bg-accent-muted"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Bottom divider */}
                <div className="h-px bg-border" />
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
