"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import dynamic from "next/dynamic";

import { home } from "@/content/pages/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CanvasErrorBoundary } from "@/components/ui/CanvasErrorBoundary";
import { Magnetic } from "@/components/ui/Magnetic";
import { easeOutExpo, easeOutQuint } from "@/lib/motion";
import { useLoadingContext } from "@/lib/context/LoadingContext";

const ConstellationCanvas = dynamic(
  () => import("@/components/ui/ConstellationCanvas").then((m) => m.ConstellationCanvas),
  { ssr: false },
);

/** Split text into words, preserving spaces for natural flow */
function SplitWords({
  children,
  className,
  delay = 0,
  reduce,
  isReady = true,
}: {
  children: string;
  className?: string;
  delay?: number;
  reduce: boolean | null;
  isReady?: boolean;
}) {
  const words = children.split(" ");
  return (
    <>
      {/* Screen reader only complete text */}
      <span className="sr-only">{children}</span>
      
      {/* Animated text hidden from screen readers */}
      <motion.span
        className={className}
        aria-hidden="true"
        initial={reduce ? false : "hidden"}
        animate={reduce ? undefined : (isReady ? "show" : "hidden")}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.045,
              delayChildren: delay,
            },
          },
        }}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            className="inline-block"
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: easeOutQuint },
              },
            }}
          >
            {word}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        ))}
      </motion.span>
    </>
  );
}

export function HomeHero() {
  const reduce = useReducedMotion();
  const { isReady } = useLoadingContext();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <Section
      ref={ref}
      className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-32 lg:pb-44"
      style={{ background: "var(--hero-bg)" }}
    >
      {/* Constellation canvas — always dark */}
      <CanvasErrorBoundary>
        <ConstellationCanvas variant="dark" />
      </CanvasErrorBoundary>

      {/* Radial amber glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 65% 55%, color-mix(in oklch, var(--accent) 25%, transparent) 0%, transparent 70%)",
        }}
      />

      {/* Film grain texture */}
      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.35,
          backgroundSize: "200px 200px",
          y: useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : (isReady ? "show" : "hidden")}
          style={{ 
            scale: reduce ? 1 : scale, 
            opacity: reduce ? 1 : opacity
          }}
          className="max-w-6xl origin-left"
        >
          {/* Studio indicator */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: -20 },
              show: {
                opacity: 1,
                x: 0,
                transition: { duration: 0.7, ease: easeOutExpo, delay: 0.1 },
              },
            }}
            className="inline-flex items-center gap-3 mb-8 sm:mb-12 lg:mb-14"
          >
            <span
              className="text-[0.6875rem] font-normal tracking-[0.18em] uppercase"
              style={{ color: "var(--hero-fg-muted)", fontFamily: "var(--font-mono)" }}
            >
              Kivox Studio
            </span>
            <motion.span
              variants={{
                hidden: { scaleX: 0, opacity: 0 },
                show: {
                  scaleX: 1,
                  opacity: 1,
                  transition: { duration: 0.8, ease: easeOutExpo, delay: 0.5 },
                },
              }}
              className="hidden lg:block w-16 h-px origin-left"
              style={{
                background: "linear-gradient(90deg, color-mix(in oklch, var(--accent) 40%, transparent), transparent)",
              }}
            />
          </motion.div>

          {/* Headline */}
          <h1
            className="font-sans font-bold mb-10 lg:mb-12"
            aria-label="Make your business easier to trust online."
            style={{
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 1.0,
              color: "var(--hero-fg)",
              letterSpacing: "-0.02em",
            }}
          >
            <SplitWords delay={0.2} reduce={reduce} isReady={isReady}>
              Make your
            </SplitWords>
            {" "}<br className="hidden sm:block" />
            <SplitWords delay={0.35} reduce={reduce} isReady={isReady}>
              business
            </SplitWords>
            {" "}<br className="hidden sm:block" />
            <SplitWords delay={0.5} reduce={reduce} isReady={isReady}>
              easier to
            </SplitWords>{" "}
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={reduce ? undefined : (isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 })}
              transition={{ duration: 0.7, ease: easeOutQuint, delay: 0.65 }}
              className="inline-block font-serif"
              style={{ fontStyle: "italic", fontWeight: 300, color: "var(--accent)" }}
            >
              trust online.
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.6, ease: easeOutExpo, delay: 0.75 },
              },
            }}
            className="max-w-[500px] mb-10 lg:mb-12"
            style={{
              fontSize: "1.125rem",
              fontWeight: 450,
              lineHeight: 1.7,
              color: "var(--hero-fg-muted)",
            }}
          >
            {home.hero.subhead}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.12,
                  delayChildren: 0.9,
                },
              },
            }}
            className="flex flex-col sm:flex-row items-stretch sm:items-start gap-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: easeOutExpo },
                },
              }}
            >
              <Magnetic strength={0.15}>
                <ButtonLink
                  href="/contact"
                  variant="primary"
                  className="w-full sm:w-auto text-[15px] px-8 py-[15px] font-medium tracking-[0.02em] rounded-full"
                >
                  {home.hero.ctas.primary}
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </ButtonLink>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, ease: easeOutExpo },
                },
              }}
            >
              <Magnetic strength={0.1}>
                <ButtonLink
                  href="/work"
                  variant="secondary"
                  className="w-full sm:w-auto text-[15px] px-7 py-[15px] font-normal tracking-[0.02em] rounded-full inline-block"
                  style={{ color: "var(--hero-fg)", borderColor: "color-mix(in oklch, var(--hero-fg) 30%, transparent)" }}
                >
                  {home.hero.ctas.secondary}
                </ButtonLink>
              </Magnetic>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={reduce ? undefined : (isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 })}
        transition={{ duration: 0.6, ease: easeOutExpo, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[0.625rem] tracking-[0.15em] uppercase font-mono" style={{ color: "var(--hero-fg-subtle)" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6"
          style={{ background: "color-mix(in oklch, var(--accent) 40%, transparent)" }}
        />
      </motion.div>
    </Section>
  );
}
