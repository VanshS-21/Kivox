"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce, easeOutExpo } from "@/lib/motion";

export function HomeServices() {
  const reduce = useReducedMotion();
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <Section
      id="services"
      className="relative py-[140px] lg:py-[200px] overflow-hidden bg-surface-alt"
      style={{ perspective: "1200px" }}
    >
      {/* Subtle amber wash bleeding in from bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--pov-wash), transparent)' }}
      />

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="inline-flex items-center gap-3 mb-16 lg:mb-24"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-2.5 h-2.5 rounded-full bg-accent"
          />
          <span className="studio-eyebrow text-accent">
            [ Our Services ]
          </span>
          <motion.span
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.3 }}
            className="hidden lg:block w-20 h-px bg-accent/20 origin-left"
          />
        </motion.div>

        {/* Vertical service list — depth fan on hover */}
        <div className="space-y-0" ref={sectionRef}>
          {home.services.map((service, idx) => {
            const isExpanded = expandedIdx === idx;
            const isSibling = expandedIdx !== null && expandedIdx !== idx;
            // Distance from hovered item (for graduated dimming)
            const distance = expandedIdx !== null ? Math.abs(idx - expandedIdx) : 0;

            return (
              <motion.div
                key={service.id}
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...transitionDefault, delay: idx * 0.06 }}
                className={`group cursor-pointer ${
                  idx < home.services.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
                onMouseEnter={() => setExpandedIdx(idx)}
                onMouseLeave={() => setExpandedIdx(null)}
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "center center",
                }}
              >
                <motion.div
                  animate={{
                    // Lift the hovered row, compress/tilt siblings
                    y: isExpanded ? -4 : isSibling ? distance * 2 : 0,
                    rotateX: isExpanded ? 0 : isSibling ? distance * 1.2 : 0,
                    scale: isExpanded ? 1.01 : isSibling ? 1 - distance * 0.008 : 1,
                    opacity: isExpanded ? 1 : isSibling ? Math.max(0.5, 1 - distance * 0.15) : 1,
                    z: isExpanded ? 30 : isSibling ? -distance * 10 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1], // easeOutQuint
                  }}
                  className="py-10 lg:py-14"
                >
                  {/* Service row */}
                  <div className="flex items-start gap-6 lg:gap-10">
                    {/* Arrow icon button */}
                    <motion.div
                      animate={{
                        scale: isExpanded ? 1.12 : 1,
                        rotate: isExpanded ? 45 : 0,
                      }}
                      transition={{ duration: 0.4, ease: easeOutExpo }}
                      className="w-14 h-14 lg:w-16 lg:h-16 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-1 transition-shadow duration-300"
                      style={{
                        boxShadow: isExpanded
                          ? '0 0 40px oklch(0.72 0.18 65 / 0.3), 0 8px 32px oklch(0.72 0.18 65 / 0.15)'
                          : 'none',
                      }}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-accent-ink"
                      >
                        <path
                          d="M5 15L15 5M15 5H7M15 5V13"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>

                    {/* Title and tags */}
                    <div className="flex-1">
                      <motion.h3
                        animate={{
                          color: isExpanded ? 'var(--accent)' : 'var(--fg-primary)',
                        }}
                        transition={{ duration: 0.3 }}
                        className="studio-h3 font-sans font-bold"
                      >
                        {service.title}.
                      </motion.h3>

                      {/* Expandable summary */}
                      <div
                        className="overflow-hidden transition-all duration-500"
                        style={{
                          display: "grid",
                          gridTemplateRows: isExpanded ? "1fr" : "0fr",
                        }}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <p className="studio-body text-muted-foreground max-w-lg pt-4 pb-2">
                            {service.summary}
                          </p>
                        </div>
                      </div>

                      {/* Sub-capability tags */}
                      <div className="flex flex-wrap gap-2.5 mt-5 lg:mt-6">
                        {service.tags.map((tag, tagIdx) => (
                          <motion.span
                            key={tag}
                            initial={reduce ? false : { opacity: 0, y: 6 }}
                            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                            viewport={viewportOnce}
                            transition={{ duration: 0.4, ease: easeOutExpo, delay: idx * 0.06 + tagIdx * 0.04 }}
                            className="px-4 py-2 border border-border rounded-full studio-tag text-muted-foreground hover:border-accent/40 hover:text-accent hover:bg-accent/[0.04] transition-all duration-200"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
