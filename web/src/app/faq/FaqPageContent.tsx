"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { easeOutExpo, easeOutQuint } from "@/lib/motion";
import { faq } from "@/content/pages/faq";

export function FaqPageContent() {
  const reduce = useReducedMotion();

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-24">
      <Container size="narrow">
        {/* ── Header: staggered entrance with blur-to-sharp ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutQuint }}
        >
          <Eyebrow>Frequently Asked</Eyebrow>
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: easeOutQuint, delay: 0.08 }}
          className="mt-3 studio-h2 font-sans font-bold text-foreground"
        >
          {faq.title}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(4px)" }}
          animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.18 }}
          className="mt-4 studio-lede"
        >
          {faq.intro}
        </motion.p>

        {/* Decorative divider — draw-line animation */}
        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          animate={reduce ? undefined : { scaleX: 1 }}
          transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.3 }}
          className="mt-8 mb-2 h-px bg-border origin-left"
        />

        {/* Total question count — subtle ambient detail */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={reduce ? undefined : { opacity: 1 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.5 }}
          className="mt-2 mb-8 flex items-center gap-2"
        >
          <span
            className="font-mono text-subtle-foreground"
            style={{ fontSize: "0.625rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            {faq.categories.reduce((sum, c) => sum + c.items.length, 0)} questions across{" "}
            {faq.categories.length} topics
          </span>
        </motion.div>

        {/* ── Accordion ── */}
        <div className="mt-4">
          <FaqAccordion categories={faq.categories} />
        </div>

        {/* ── CTA — arrow translates right on hover ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="mt-16 sm:mt-20 pt-8 border-t border-border"
        >
          <p className="font-body text-muted-foreground text-base leading-relaxed">
            Didn't find what you're looking for?
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 mt-3 font-sans font-semibold text-accent hover:text-accent-hover transition-colors duration-200 text-base"
          >
            Get in touch
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
