"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { brand } from "@/content/brand";
import { home } from "@/content/pages/home";
import { easeOutExpo, easeOutQuint, viewportOnce } from "@/lib/motion";

export function HomeContact() {
  const reduce = useReducedMotion();

  return (
    <Section
      className="relative overflow-hidden border-t border-border bg-background pb-[40px] pt-[60px] md:pb-[60px] md:pt-[80px] lg:pb-[80px] lg:pt-[100px]"
    >
      <div
        aria-hidden="true"
        className="absolute left-[15%] top-[15%] h-[240px] w-[240px] rounded-full blur-[80px] pointer-events-none md:h-[400px] md:w-[400px] md:blur-[120px] lg:h-[600px] lg:w-[600px] lg:blur-[200px]"
        style={{
          background: "var(--accent)",
          opacity: "calc(var(--hero-glow-opacity) * 0.58)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[20%] right-[15%] h-[160px] w-[160px] rounded-full blur-[70px] pointer-events-none md:h-[280px] md:w-[280px] md:blur-[100px] lg:h-[480px] lg:w-[480px] lg:blur-[180px]"
        style={{
          background: "var(--accent-rose)",
          opacity: "calc(var(--hero-glow-opacity) * 0.24)",
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col items-start text-left">
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.55, ease: easeOutQuint, delay: 0.05 }}
              className="studio-h1-headline mb-6 text-foreground"
            >
              Ready to build
              <br />
              something{" "}
              <em
                className="font-serif italic text-accent"
                style={{ fontStyle: "italic" }}
              >
                exceptional?
              </em>
            </motion.h2>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 10 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.12 }}
              className="studio-lede mb-8 max-w-md lg:mb-12"
            >
              {home.contact.line}
            </motion.p>
          </div>

          <div className="flex flex-col items-start text-left lg:items-end lg:text-right">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.45, ease: easeOutExpo, delay: 0.2 }}
              className="mb-8"
            >
              <Link
                href="/contact"
                prefetch={false}
                className="inline-flex items-center gap-3 rounded-full bg-accent px-10 py-5 text-base font-semibold tracking-tight text-accent-ink transition-colors duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
              >
                Book a Free Call
                <span className="text-base" aria-hidden="true">
                  -&gt;
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.4, ease: easeOutExpo, delay: 0.32 }}
            >
              <span className="mb-1 block text-base text-muted-foreground">
                or reach us directly at
              </span>
              <a
                href={`mailto:${brand.contact.email}`}
                className="text-lg font-medium text-accent underline-offset-4 transition-colors hover:underline md:text-xl"
              >
                {brand.contact.email}
              </a>
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
