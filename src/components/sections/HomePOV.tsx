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
            hidden: { opacity: 0.15, y: 6 },
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

  return (
    <div ref={sectionRef} className="relative">
    <Section
      className="relative py-12 md:py-16 lg:py-20 overflow-hidden bg-surface-alt"
    >
      {/* Committed amber glow — restrained size so it doesn't bleed into adjacent sections */}
      <motion.div
        style={{ y: reduce ? 0 : glowY1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-[600px] lg:w-[1000px] h-[320px] md:h-[600px] lg:h-[1000px] rounded-full blur-[80px] md:blur-[100px] lg:blur-[160px] pointer-events-none"
        data-glow="primary"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'var(--accent)', opacity: 'calc(var(--hero-glow-opacity) * 0.65)' }}
        />
      </motion.div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">
          <h2 className="sr-only">Our Philosophy</h2>
          {/* Large left-aligned quote — word-by-word reveal */}
          <blockquote className="lg:col-span-8">
            <span className="sr-only">We believe great digital platforms are not built; they are crafted.</span>
            <p aria-hidden="true" className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-foreground font-sans">
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
                initial={reduce ? false : { opacity: 0, scale: 0.8, rotate: -15 }}
                whileInView={reduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
                whileHover={reduce ? undefined : { scale: 1.15, rotate: 8 }}
                whileTap={reduce ? undefined : { scale: 0.9, rotate: -5 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: "spring", stiffness: 400, damping: 12, delay: 0.9 }}
                className="text-accent inline-block relative not-italic text-2xl sm:text-3xl lg:text-4xl font-serif"
                style={{
                  fontWeight: 300,
                  fontStyle: "italic",
                }}
              >
                crafted.
                <HandDrawnUnderline reduce={reduce} />
              </motion.em>
            </p>
          </blockquote>

          <div className="lg:col-span-4 flex flex-col items-start lg:items-end">
            {/* Decorative expanding lines — aligned left or right */}
            <motion.div
              initial={reduce ? false : { scaleX: 0, opacity: 0 }}
              whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1, ease: easeOutExpo, delay: 1.2 }}
              className="w-24 md:w-32 h-px bg-accent/30 origin-left lg:origin-right mb-6 lg:mb-8"
            />
            {/* Supporting body text — aligned left or right */}
            <motion.p
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: 1.4 }}
              className="studio-body-serif text-muted-foreground lg:text-right max-w-md"
            >
              {home.philosophy.body}
            </motion.p>
          </div>
        </div>
      </Container>
    </Section>
    </div>
  );
}
