"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from "motion/react";

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

export function HomeHero() {
  const reduce = useReducedMotion();
  const { isReady } = useLoadingContext();
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const words = ["customers.", "growth.", "revenue."];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
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
      className="relative flex items-center overflow-hidden pt-[calc(5rem+env(safe-area-inset-top))] pb-12 sm:pt-24 sm:pb-16 md:pt-[calc(6rem+env(safe-area-inset-top))] md:pb-20 lg:pt-28 lg:pb-24"
      style={{
        background: "var(--background)",
      }}
    >
      {/* Subtle background glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0"
        animate={
          reduce
            ? undefined
            : {
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.05, 1],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
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
          className="grid items-center gap-8 lg:grid-cols-[1fr_1fr] xl:gap-12"
        >
          {/* Left Column: Text & CTAs */}
          <div className="max-w-[38rem] pt-8 lg:pt-0">
            <h1
              className="mb-4 studio-h1-headline text-foreground"
              aria-label="We build websites that turn visitors into customers, growth, and revenue."
            >
              <SplitWords delay={0.18} reduce={reduce} isReady={isReady}>
                We build
              </SplitWords>
              {" "}
              <br className="hidden lg:block" />
              <SplitWords delay={0.34} reduce={reduce} isReady={isReady}>
                websites that turn
              </SplitWords>
              <br />
              <SplitWords delay={0.5} reduce={reduce} isReady={isReady}>
                visitors into
              </SplitWords>
              {" "}
              <span 
                className="inline-flex overflow-hidden align-bottom font-serif text-accent" 
                style={{ fontStyle: "italic", fontWeight: 300, minWidth: "5em" }}
              >
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.6, ease: easeOutQuint }}
                    className="inline-block"
                  >
                    {words[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
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
              className="mb-6 max-w-[34rem] studio-body sm:text-base text-muted-foreground sm:mb-8 lg:max-w-[28rem]"
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
                whileTap={reduce ? undefined : { scale: 0.95 }}
              >
                <Magnetic strength={0.15}>
                  <ButtonLink
                    href="/contact"
                    variant="primary"
                    className="group w-full justify-center sm:w-auto transition-transform duration-200"
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
                whileTap={reduce ? undefined : { scale: 0.95 }}
              >
                <Magnetic strength={0.15}>
                  <ButtonLink
                    href="/work"
                    variant="secondary"
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
            className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-[420px] xl:max-w-[480px]"
          >
            <motion.div
              animate={reduce ? undefined : { y: [-6, 6, -6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
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
                    src="/work/mockups/Cafe-1.webp" 
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
              <div className="absolute -inset-4 z-[-1] bg-accent/20 blur-3xl rounded-full opacity-100 transition-opacity duration-1000" />
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
