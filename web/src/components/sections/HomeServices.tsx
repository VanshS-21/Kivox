"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeServices() {
  const reduce = useReducedMotion();

  return (
    <Section id="services" className="relative py-[120px] lg:py-[160px] overflow-hidden bg-surface-alt">
      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="inline-flex items-center gap-3 mb-16 lg:mb-20"
        >
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="studio-eyebrow text-accent">
            [ Our Services ]
          </span>
        </motion.div>

        {/* Vertical service list */}
        <div className="space-y-0">
          {home.services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: idx * 0.06 }}
              className={`group py-8 lg:py-10 ${
                idx < home.services.length - 1
                  ? "border-b border-border"
                  : ""
              }`}
            >
              {/* Service row */}
              <div className="flex items-start gap-5 lg:gap-8">
                {/* Arrow icon button */}
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-md bg-accent flex items-center justify-center shrink-0 mt-1 group-hover:scale-105 transition-transform duration-200">
                  <svg
                    width="20"
                    height="20"
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

                  {/* Sub-capability tags */}
                  <div className="flex flex-wrap gap-2 mt-4 lg:mt-5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 border border-border rounded-full studio-tag text-muted-foreground"
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
