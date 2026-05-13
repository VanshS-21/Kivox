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
            hidden: { opacity: 0.08, y: 6, filter: "blur(3px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
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
    <div ref={sectionRef}>
    <Section
      className="relative py-[180px] lg:py-[260px] overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--pov-wash) 40%, var(--pov-wash) 60%, var(--bg-primary) 100%)' }}
    >
      {/* Committed amber glow — with parallax */}
      <motion.div
        style={{ y: reduce ? 0 : glowY1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] rounded-full blur-[200px] pointer-events-none"
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
        className="absolute top-[30%] right-[15%] w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
        data-glow="secondary"
      >
        <div
          className="w-full h-full rounded-full"
          style={{ background: 'var(--accent-rose)', opacity: 'calc(var(--hero-glow-opacity) * 0.35)' }}
        />
      </motion.div>

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="flex justify-center mb-14 lg:mb-20"
        >
          <div className="inline-flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-2.5 h-2.5 rounded-full bg-accent"
            />
            <span className="studio-eyebrow text-accent">
              Philosophy
            </span>
          </div>
        </motion.div>

        {/* Large centered quote — word-by-word reveal */}
        <blockquote className="text-center max-w-6xl mx-auto">
          <p className="font-sans font-bold text-foreground" style={{ fontSize: 'clamp(2.25rem, 4vw + 1rem, 5rem)', lineHeight: 1.06, letterSpacing: '-0.02em' }}>
            <WordByWordReveal reduce={reduce}>
              We believe great digital platforms
            </WordByWordReveal>
            <br className="hidden lg:block" />
            <WordByWordReveal reduce={reduce}>
              are not built; they are
            </WordByWordReveal>{" "}
            {/* Special emphasis on "crafted." */}
            <motion.em
              initial={reduce ? false : { opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: easeOutQuint, delay: 0.9 }}
              className="font-serif font-normal text-accent inline-block relative"
              style={{ fontStyle: "italic" }}
            >
              crafted.
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
          className="text-center studio-body-serif text-muted-foreground max-w-2xl mx-auto mt-12 lg:mt-16"
        >
          {home.philosophy.body}
        </motion.p>

        {/* Decorative expanding lines — centered below quote */}
        <motion.div
          initial={reduce ? false : { scaleX: 0, opacity: 0 }}
          whileInView={reduce ? undefined : { scaleX: 1, opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1, ease: easeOutExpo, delay: 0.4 }}
          className="mx-auto mt-16 lg:mt-20 w-32 h-px bg-accent/20 origin-center"
        />
      </Container>
    </Section>
    </div>
  );
}
