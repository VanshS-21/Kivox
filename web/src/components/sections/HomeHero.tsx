"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault } from "@/lib/motion";

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <Section className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-32 lg:pb-44 bg-background">
      {/* Larger, more committed ambient glow — primary amber */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          rotate: [0, 50, 0],
          x: [0, 60, 0],
          y: [0, -40, 0]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[15%] left-[18%] w-[750px] h-[750px] rounded-full blur-[150px]"
        style={{ background: 'var(--accent)', opacity: 'var(--hero-glow-opacity)' }}
      />
      
      {/* Secondary warm rose glow — adds depth to the ambient color field */}
      <motion.div
        animate={{
          scale: [1, 1.35, 1],
          rotate: [0, -35, 0],
          x: [0, -50, 0],
          y: [0, 25, 0]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] rounded-full blur-[130px]"
        style={{ background: 'var(--accent-rose)', opacity: 'calc(var(--hero-glow-opacity) * 0.6)' }}
      />

      <Container className="relative z-10">
        {/* Left-aligned asymmetric layout */}
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          className="max-w-6xl"
        >
          {/* Studio indicator with accent dot */}
          <motion.div
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.1 }}
            className="inline-flex items-center gap-3 mb-12 lg:mb-14"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            <span className="studio-eyebrow text-subtle-foreground">
              [ Kivox Studio ]
            </span>
          </motion.div>

          {/* Large headline — pushed scale, extreme weight contrast on italic */}
          <motion.h1
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.2 }}
            className="studio-h1 font-sans font-bold text-foreground mb-12 lg:mb-14"
          >
            Make your business
            <br />
            easier to{" "}
            <em className="font-serif font-normal text-accent not-italic" style={{ fontStyle: "italic" }}>
              trust online.
            </em>
          </motion.h1>

          {/* Editorial subhead — lighter weight for extreme contrast against the heavy headline */}
          <motion.p
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.3 }}
            className="studio-body-serif text-muted-foreground max-w-2xl mb-14 lg:mb-16"
            style={{ fontWeight: 300 }}
          >
            {home.hero.subhead}
          </motion.p>

          {/* CTAs — left-aligned row, bolder primary */}
          <motion.div
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-5"
          >
            <ButtonLink 
              href="/#contact" 
              variant="primary"
              className="text-base px-10 py-[18px] font-semibold tracking-tight"
            >
              {home.hero.ctas.primary}
            </ButtonLink>
            
            <ButtonLink 
              href="/work" 
              variant="secondary"
              className="text-base px-10 py-[18px] font-medium"
            >
              {home.hero.ctas.secondary}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
