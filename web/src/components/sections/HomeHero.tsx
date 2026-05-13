"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ConstellationCanvas } from "@/components/ui/ConstellationCanvas";
import { easeOutExpo, easeOutQuint } from "@/lib/motion";

/** Split text into words, preserving spaces for natural flow */
function SplitWords({
  children,
  className,
  delay = 0,
  reduce,
}: {
  children: string;
  className?: string;
  delay?: number;
  reduce: boolean | null;
}) {
  const words = children.split(" ");
  return (
    <motion.span
      className={className}
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "show"}
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
            hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
            show: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: easeOutQuint },
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

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <Section
      className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-32 lg:pb-44"
      style={{ background: "#0d0a05" }}
    >
      {/* Constellation canvas — always dark */}
      <ConstellationCanvas variant="dark" />

      {/* Radial amber glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 65% 55%, rgba(180,90,10,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.35,
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          className="max-w-6xl"
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
            className="inline-flex items-center gap-3 mb-12 lg:mb-14"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[7px] h-[7px] rounded-full"
              style={{
                background: "#e07b20",
                boxShadow: "0 0 8px rgba(224,123,32,0.65)",
              }}
            />
            <span
              className="text-[11px] font-normal tracking-[0.18em] uppercase"
              style={{ color: "#888", fontFamily: "var(--font-body)" }}
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
                background: "linear-gradient(90deg, rgba(224,123,32,0.4), transparent)",
              }}
            />
          </motion.div>

          {/* Headline */}
          <h1
            className="font-sans font-bold mb-10 lg:mb-12"
            style={{
              fontSize: "clamp(48px, 7vw, 88px)",
              lineHeight: 1.0,
              color: "#f0ece4",
              letterSpacing: "-0.02em",
            }}
          >
            <SplitWords delay={0.2} reduce={reduce}>
              Make your
            </SplitWords>
            <br />
            <SplitWords delay={0.35} reduce={reduce}>
              business
            </SplitWords>
            <br />
            <SplitWords delay={0.5} reduce={reduce}>
              easier to
            </SplitWords>{" "}
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.7, ease: easeOutQuint, delay: 0.65 }}
              className="inline-block font-serif"
              style={{ fontStyle: "italic", fontWeight: 300, color: "#e07b20" }}
            >
              trust online.
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.6, ease: easeOutExpo, delay: 0.75 },
              },
            }}
            className="max-w-[500px] mb-10 lg:mb-12"
            style={{
              fontSize: "14px",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "#888",
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
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.5, ease: easeOutExpo },
                },
              }}
            >
              <ButtonLink
                href="/contact"
                variant="primary"
                className="text-[13px] px-7 py-[13px] font-medium tracking-[0.02em] rounded-full"
              >
                {home.hero.ctas.primary}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
              </ButtonLink>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.5, ease: easeOutExpo },
                },
              }}
            >
              <ButtonLink
                href="/work"
                variant="secondary"
                className="text-[13px] px-6 py-[13px] font-normal tracking-[0.02em] rounded-full"
                style={{ color: "#aaa", borderColor: "#333" }}
              >
                {home.hero.ctas.secondary}
              </ButtonLink>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOutExpo, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: "#666" }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-6"
          style={{ background: "rgba(224,123,32,0.4)" }}
        />
      </motion.div>
    </Section>
  );
}
