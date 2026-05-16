"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";

import { home } from "@/content/pages/home";
import { ButtonLink } from "@/components/ui/Button";
import { CanvasErrorBoundary } from "@/components/ui/CanvasErrorBoundary";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Section } from "@/components/ui/Section";
import { useLoadingContext } from "@/lib/context/LoadingContext";
import { easeOutExpo, easeOutQuint } from "@/lib/motion";

const heroAccent = "var(--hero-accent, oklch(0.72 0.18 65))";
const heroAccentInk = "var(--hero-accent-ink, oklch(0.99 0.008 80))";

const ConstellationCanvas = dynamic(
  () => import("@/components/ui/ConstellationCanvas").then((m) => m.ConstellationCanvas),
  { ssr: false },
);

const apertureLines = [
  { width: "100%", opacity: 0.46 },
  { width: "88%", opacity: 0.36 },
  { width: "76%", opacity: 0.28 },
  { width: "62%", opacity: 0.22 },
  { width: "48%", opacity: 0.16 },
] as const;

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
  return (
    <motion.span
      className={className}
      aria-hidden="true"
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : isReady ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: {
            delayChildren: delay,
            staggerChildren: 0.045,
          },
        },
      }}
    >
      {children.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
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
          {index < children.split(" ").length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </motion.span>
  );
}

function SunlitAperture({
  reduce,
  isReady,
  scale,
  y,
}: {
  reduce: boolean | null;
  isReady: boolean;
  scale: MotionValue<number>;
  y: MotionValue<string>;
}) {
  return (
    <motion.div
      aria-hidden="true"
      initial={reduce ? false : { opacity: 0, x: 24 }}
      animate={reduce ? undefined : isReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
      transition={{ duration: 1.1, ease: easeOutExpo, delay: 0.18 }}
      className="pointer-events-none absolute right-[-14rem] top-20 z-[1] aspect-square w-[27rem] sm:right-[-9rem] sm:top-8 sm:w-[34rem] md:right-[-6rem] md:top-2 md:w-[39rem] lg:right-[-2rem] lg:top-[calc(50%-21.5rem)] lg:w-[43rem] xl:right-[4vw] xl:top-[calc(50%-24rem)] xl:w-[48rem] 2xl:right-[8vw] 2xl:top-[calc(50%-26rem)] 2xl:w-[52rem]"
      style={{
        scale: reduce ? 1 : scale,
        y: reduce ? "0%" : y,
      }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-90"
        style={{
          background:
            `radial-gradient(circle at 38% 34%, oklch(0.9 0.13 82 / 0.62), color-mix(in oklch, ${heroAccent} 54%, transparent) 35%, oklch(0.36 0.11 45 / 0.24) 54%, transparent 71%)`,
          filter: "blur(0.2px)",
        }}
      />
      <div
        className="absolute inset-[8%] rounded-full border"
        style={{
          borderColor: "oklch(0.98 0.012 80 / 0.18)",
          boxShadow:
            `0 0 80px color-mix(in oklch, ${heroAccent} 20%, transparent), inset 0 0 64px oklch(0.98 0.012 82 / 0.07)`,
        }}
      />
      <div className="absolute inset-[22%] rounded-full border" style={{ borderColor: "oklch(0.98 0.012 80 / 0.12)" }} />
      <div className="absolute inset-[36%] rounded-full border" style={{ borderColor: `color-mix(in oklch, ${heroAccent} 26%, transparent)` }} />

      <div
        className="absolute bottom-[18%] right-[18%] grid w-[58%] gap-3"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 18%, black 82%, transparent)",
        }}
      >
        {apertureLines.map((line, index) => (
          <span
            key={`aperture-line-${index}`}
            className="block h-px justify-self-end"
            style={{
              width: line.width,
              opacity: line.opacity,
              background: "linear-gradient(90deg, transparent, oklch(0.98 0.016 82 / 0.82), transparent)",
            }}
          />
        ))}
      </div>

      <div
        className="absolute -left-[8%] top-[46%] h-[16%] w-[78%] -rotate-12 opacity-70"
        style={{
          background:
            `linear-gradient(90deg, transparent, color-mix(in oklch, ${heroAccent} 22%, transparent), transparent)`,
          filter: "blur(18px)",
        }}
      />
    </motion.div>
  );
}

export function HomeHero() {
  const reduce = useReducedMotion();
  const { isReady } = useLoadingContext();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 1.045]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);
  const grainY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const apertureScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const apertureY = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);

  return (
    <Section
      ref={ref}
      spacing="none"
      className="relative isolate flex min-h-[min(100svh,47rem)] items-center overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top))] pb-8 [min-height:min(100dvh,47rem)] sm:min-h-[100svh] sm:pt-28 sm:pb-12 sm:[min-height:100dvh] md:min-h-[min(100svh,54rem)] md:items-start md:pt-[calc(8rem+env(safe-area-inset-top))] md:pb-16 md:[min-height:min(100dvh,54rem)] lg:min-h-[100svh] lg:items-center lg:pt-24 lg:pb-14 lg:[min-height:100dvh] xl:pb-16"
      style={{
        background: "var(--hero-bg)",
        colorScheme: "dark",
      }}
    >
      <CanvasErrorBoundary>
        <ConstellationCanvas className="opacity-65" variant="dark" />
      </CanvasErrorBoundary>

      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.055 0.008 65 / 0.96) 0%, oklch(0.045 0.007 65 / 0.72) 52%, oklch(0.058 0.009 65) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            `radial-gradient(ellipse 88% 62% at 82% 34%, color-mix(in oklch, ${heroAccent} 24%, transparent) 0%, transparent 66%), radial-gradient(ellipse 70% 54% at 54% 98%, oklch(0.48 0.1 35 / 0.18) 0%, transparent 68%)`,
        }}
      />

      <SunlitAperture reduce={reduce} isReady={isReady} scale={apertureScale} y={apertureY} />

      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          opacity: 0.34,
          y: reduce ? "0%" : grainY,
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : isReady ? "show" : "hidden"}
          style={{
            opacity: reduce ? 1 : contentOpacity,
            scale: reduce ? 1 : contentScale,
          }}
          className="grid min-h-[31.5rem] origin-left items-center gap-10 sm:min-h-[36rem] md:min-h-0 md:items-start lg:min-h-[34rem] lg:grid-cols-[minmax(0,0.82fr)_minmax(18rem,0.62fr)] lg:items-center xl:min-h-[36rem]"
        >
          <div className="max-w-[38rem] lg:max-w-[45rem] xl:max-w-[47rem]">
            <h1
              className="mb-6 max-w-[13ch] studio-h1-headline sm:mb-7 lg:mb-6"
              aria-label={home.hero.headline}
              style={{
                color: "var(--hero-fg)",
              }}
            >
              <SplitWords delay={0.18} reduce={reduce} isReady={isReady}>
                Make your
              </SplitWords>
              {" "}
              <br className="hidden lg:block" />
              <SplitWords delay={0.34} reduce={reduce} isReady={isReady}>
                business
              </SplitWords>
              <br />
              <SplitWords delay={0.5} reduce={reduce} isReady={isReady}>
                easier to
              </SplitWords>
              {" "}
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={reduce ? undefined : isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.7, ease: easeOutQuint, delay: 0.66 }}
                className="inline-block font-serif"
                style={{
                  color: heroAccent,
                  fontStyle: "italic",
                  fontWeight: 300,
                }}
              >
                trust online.
              </motion.span>
            </h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 12 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.6, ease: easeOutExpo, delay: 0.78 },
                },
              }}
              className="mb-7 max-w-[34rem] studio-body sm:mb-8 md:max-w-[40rem] lg:mb-7 lg:max-w-[33rem] xl:max-w-[34rem]"
              style={{
                color: "var(--hero-fg-muted)",
              }}
            >
              {home.hero.subhead}
            </motion.p>

            <motion.div
              variants={{
                hidden: {},
                show: {
                  transition: {
                    delayChildren: 0.92,
                    staggerChildren: 0.12,
                  },
                },
              }}
              className="flex flex-col items-stretch sm:flex-row sm:items-start"
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
                    className="group w-full rounded-full px-8 py-[15px] text-[15px] font-medium tracking-normal sm:w-auto"
                    style={{
                      backgroundColor: heroAccent,
                      boxShadow:
                        `0 18px 48px -28px color-mix(in oklch, ${heroAccent} 70%, transparent)`,
                      color: heroAccentInk,
                      letterSpacing: 0,
                    }}
                  >
                    {home.hero.ctas.primary}
                    <ArrowRight
                      aria-hidden="true"
                      className="ml-2 size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </ButtonLink>
                </Magnetic>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            aria-hidden="true"
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: easeOutExpo, delay: 0.62 },
              },
            }}
            className="relative hidden min-h-[25rem] lg:block"
          >
            <div
              className="absolute bottom-8 right-0 w-[25rem] max-w-full"
              style={{
                maskImage: "linear-gradient(90deg, transparent 0%, black 18%, black 88%, transparent 100%)",
              }}
            >
              {apertureLines.map((line, index) => (
                <span
                  key={`desktop-line-${index}`}
                  className="mb-5 block h-px justify-self-end"
                  style={{
                    width: line.width,
                    opacity: line.opacity,
                    background: `linear-gradient(90deg, transparent, color-mix(in oklch, ${heroAccent} 58%, oklch(0.98 0.012 80) 42%) 52%, transparent)`,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, y: -10 }}
        animate={reduce ? undefined : isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.6, ease: easeOutExpo, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 xl:flex"
      >
        <span
          className="font-mono text-[0.625rem] uppercase tracking-normal"
          style={{ color: "var(--hero-fg-subtle)", letterSpacing: 0 }}
        >
          Scroll
        </span>
        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-6 w-px"
          style={{ background: `color-mix(in oklch, ${heroAccent} 40%, transparent)` }}
        />
      </motion.div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-20"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.055 0.008 65 / 0.28) 54%, oklch(0.052 0.008 65 / 0.86) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-px"
        style={{
          background:
            `linear-gradient(90deg, transparent 0%, color-mix(in oklch, ${heroAccent} 38%, transparent) 18%, oklch(0.98 0.012 80 / 0.24) 50%, color-mix(in oklch, ${heroAccent} 26%, transparent) 82%, transparent 100%)`,
        }}
      />
    </Section>
  );
}
