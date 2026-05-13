"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeServices() {
  const reduce = useReducedMotion();

  return (
    <Section id="services" className="relative py-[140px] lg:py-[200px] overflow-hidden bg-surface-alt">
      {/* Subtle amber wash bleeding in from bottom — hints at the POV section warmth */}
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
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="studio-eyebrow text-accent">
            [ Our Services ]
          </span>
        </motion.div>

        {/* Vertical service list — more generous spacing */}
        <div className="space-y-0">
          {home.services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: idx * 0.06 }}
              className={`group py-10 lg:py-14 ${
                idx < home.services.length - 1
                  ? "border-b border-border"
                  : ""
              }`}
            >
              {/* Service row */}
              <div className="flex items-start gap-6 lg:gap-10">
                {/* Arrow icon button — bolder, more committed */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-lg bg-accent flex items-center justify-center shrink-0 mt-1 group-hover:scale-110 group-hover:shadow-amber-glow transition-all duration-300">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-accent-ink group-hover:rotate-45 transition-transform duration-300"
                  >
                    <path
                      d="M5 15L15 5M15 5H7M15 5V13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Title and tags */}
                <div className="flex-1">
                  <h3 className="studio-h3 font-sans font-bold text-foreground group-hover:text-accent transition-colors duration-200">
                    {service.title}.
                  </h3>

                  {/* Sub-capability tags — more generous spacing */}
                  <div className="flex flex-wrap gap-2.5 mt-5 lg:mt-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 border border-border rounded-full studio-tag text-muted-foreground hover:border-accent/40 hover:text-accent hover:bg-accent/[0.04] transition-all duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
