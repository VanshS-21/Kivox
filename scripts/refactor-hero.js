const fs = require('fs');
const path = require('path');

const heroPath = path.join(__dirname, '../src/components/sections/HomeHero.tsx');

const content = `"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { home } from "@/content/pages/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { Section } from "@/components/ui/Section";
import { useLoadingContext } from "@/lib/context/LoadingContext";
import { easeOutExpo, easeOutQuint } from "@/lib/motion";

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
          key={\`\${word}-\${index}\`}
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
          {index < children.split(" ").length - 1 && "\\u00A0"}
        </motion.span>
      ))}
    </motion.span>
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

  return (
    <Section
      ref={ref}
      spacing="none"
      className="relative flex min-h-[min(100svh,47rem)] items-center overflow-hidden pt-[calc(5.5rem+env(safe-area-inset-top))] pb-8 [min-height:min(100dvh,47rem)] sm:min-h-[100svh] sm:pt-28 sm:pb-12 sm:[min-height:100dvh] md:min-h-[min(100svh,54rem)] md:items-start md:pt-[calc(8rem+env(safe-area-inset-top))] md:pb-16 md:[min-height:min(100dvh,54rem)] lg:min-h-[100svh] lg:items-center lg:pt-24 lg:pb-14 lg:[min-height:100dvh] xl:pb-16"
      style={{
        background: "var(--background)",
      }}
    >
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 75% 25%, color-mix(in oklch, var(--accent) 5%, transparent), transparent 50%)",
        }}
      />

      <Container className="relative z-10 w-full">
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : isReady ? "show" : "hidden"}
          style={{
            opacity: reduce ? 1 : contentOpacity,
            scale: reduce ? 1 : contentScale,
          }}
          className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:gap-16"
        >
          {/* Left Column: Text & CTAs */}
          <div className="max-w-[38rem] pt-8 lg:pt-0">
            <h1
              className="mb-6 studio-h1-headline sm:mb-7 lg:mb-6 text-foreground"
              aria-label={home.hero.headline}
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
                className="inline-block font-serif text-accent"
                style={{
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
              className="mb-8 max-w-[34rem] studio-body text-muted-foreground sm:mb-10 md:max-w-[40rem] lg:mb-10 lg:max-w-[33rem] xl:max-w-[36rem]"
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
              className="flex flex-col items-stretch sm:flex-row sm:items-center gap-4"
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
                    className="group w-full justify-center sm:w-auto"
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
                    href="/work"
                    variant="outline"
                    className="w-full justify-center sm:w-auto"
                  >
                    {home.hero.ctas.secondary}
                  </ButtonLink>
                </Magnetic>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Device Mockup */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 30, rotateX: 10 },
              show: {
                opacity: 1,
                y: 0,
                rotateX: 0,
                transition: { duration: 1, ease: easeOutExpo, delay: 0.5 },
              },
            }}
            style={{ perspective: 1000 }}
            className="relative mx-auto w-full max-w-2xl lg:max-w-none"
          >
            <div 
              className="relative rounded-xl border border-border bg-card shadow-2xl overflow-hidden aspect-[16/10] ring-1 ring-black/5 dark:ring-white/10"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {/* Browser Title Bar */}
              <div className="h-10 border-b border-border bg-muted/50 flex items-center px-4 gap-2 backdrop-blur-md">
                <div className="w-3 h-3 rounded-full bg-red-400/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-amber-400/80 shadow-sm" />
                <div className="w-3 h-3 rounded-full bg-green-400/80 shadow-sm" />
              </div>
              {/* Browser Content */}
              <div className="relative w-full h-[calc(100%-2.5rem)] bg-muted/20">
                <Image 
                  src="/work/hotel copy.webp" 
                  alt="Kivox Website Showcase" 
                  fill 
                  className="object-cover object-top"
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              
              {/* Soft overlay gradient to ensure it looks embedded */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10 dark:ring-white/10 rounded-xl" />
            </div>
            
            {/* Ambient shadow glow behind the mockup */}
            <div className="absolute -inset-4 z-[-1] bg-accent/20 blur-3xl rounded-full opacity-0 lg:opacity-100 transition-opacity duration-1000" />
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
`;

fs.writeFileSync(heroPath, content);
console.log('HomeHero.tsx refactored successfully.');
