"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce, easeOutExpo, easeOutQuint } from "@/lib/motion";

/** Word-by-word reveal that triggers when the section scrolls into view */
function WordByWordReveal({
  children,
  className,
  reduce,
}: {
  children: string;
  className?: string;
  reduce: boolean | null;
}) {
  const words = children.split(" ");

  return (
    <motion.span
      className={className}
      aria-hidden="true"
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.15,
          },
        },
      }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0.08, y: 6 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.45, ease: easeOutQuint },
            },
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * Hand-drawn SVG underline that draws itself beneath a word.
 * Uses stroke-dasharray/dashoffset for the drawing animation.
 */
function HandDrawnUnderline({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.svg
      viewBox="0 0 200 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute -bottom-1 left-[-4%] overflow-visible"
      style={{ pointerEvents: "none", width: "108%", height: "0.22em" }}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      {/* Primary stroke — bold, wobbly, hand-drawn feel */}
      <motion.path
        d="M3 10 C 12 5, 22 13, 38 8 C 52 3, 62 14, 80 9 C 95 4, 108 13, 125 7 C 140 2, 155 12, 170 8 C 182 5, 192 10, 197 8"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1, ease: easeOutQuint, delay: 1.0 }}
      />
      {/* Ghost stroke — fainter, slightly offset for a natural double-pass look */}
      <motion.path
        d="M5 12 C 18 7, 28 14, 42 10 C 58 6, 68 13, 85 10 C 100 7, 115 14, 130 9 C 148 5, 160 12, 175 10 C 188 8, 195 11, 198 10"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity={0.3}
        initial={reduce ? { pathLength: 1, opacity: 0.3 } : { pathLength: 0, opacity: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1, opacity: 0.3 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: easeOutQuint, delay: 1.3 }}
      />
    </motion.svg>
  );
}

export function HomePOV() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax for background glows
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const glowY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={sectionRef} className="relative">
    <Section
      className="relative py-[100px] md:py-[160px] lg:py-[300px] overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Committed amber glow — with parallax */}
      <motion.div
        style={{ y: reduce ? 0 : glowY1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] lg:w-[1100px] h-[300px] md:h-[600px] lg:h-[1100px] rounded-full blur-[60px] md:blur-[80px] lg:blur-[200px] pointer-events-none"
        data-glow="primary"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'var(--accent)', opacity: 'calc(var(--hero-glow-opacity) * 0.7)' }}
        />
      </motion.div>

      {/* Secondary rose depth — with parallax */}
      <motion.div
        style={{ y: reduce ? 0 : glowY2 }}
        className="absolute top-[30%] right-[15%] w-[150px] md:w-[300px] lg:w-[600px] h-[150px] md:h-[300px] lg:h-[600px] rounded-full blur-[40px] md:blur-[80px] lg:blur-[160px] pointer-events-none"
        data-glow="secondary"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'var(--accent-rose)', opacity: 'calc(var(--hero-glow-opacity) * 0.35)' }}
        />
      </motion.div>

      <Container className="relative z-10">
        {/* No section label — the quote speaks for itself */}

        {/* Large centered quote — word-by-word reveal */}
        <blockquote className="text-center max-w-6xl mx-auto">
          <span className="sr-only">We believe great digital platforms are not built; they are crafted.</span>
          <p aria-hidden="true" className="font-sans font-bold text-foreground" style={{ fontSize: 'clamp(2.5rem, 5vw + 1rem, 6rem)', lineHeight: 1.06, letterSpacing: '-0.02em' }}>
            <WordByWordReveal reduce={reduce}>
              We believe great digital platforms
            </WordByWordReveal>
            {" "}
            <br className="hidden lg:block" />
            <WordByWordReveal reduce={reduce}>
              are not built; they are
            </WordByWordReveal>{" "}
            {/* Special emphasis on "crafted." with hand-drawn underline */}
            <motion.em
              aria-hidden="true"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: easeOutQuint, delay: 0.9 }}
              className="text-accent inline-block relative not-italic"
              style={{
                fontFamily: "var(--font-handwritten)",
                fontWeight: 700,
                fontSize: "1.25em",
                lineHeight: 1,
              }}
            >
              crafted.
              <HandDrawnUnderline reduce={reduce} />
            </motion.em>
          </p>
        </blockquote>

        {/* Supporting body text — generous spacing from the quote */}
        <motion.p
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...transitionDefault, delay: 0.2 }}
          className="text-center studio-body-serif text-muted-foreground max-w-2xl mx-auto mt-8 md:mt-12 lg:mt-16"
        >
          {home.philosophy.body}
        </motion.p>

        {/* Decorative expanding lines — centered below quote */}
        <motion.div
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: easeOutExpo, delay: 0.4 }}
          className="mx-auto mt-10 md:mt-16 lg:mt-20 w-48 h-px bg-accent/30 origin-center"
        />
      </Container>
    </Section>
    </div>
  );
}
