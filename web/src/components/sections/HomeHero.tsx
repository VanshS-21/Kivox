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
    <Section className="min-h-screen flex items-center relative overflow-hidden pt-20 bg-background">
      {/* Organic accent glow blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent/[0.08] blur-[120px]"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -30, 0],
          x: [0, -40, 0],
          y: [0, 20, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/[0.05] blur-[100px]"
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
            className="inline-flex items-center gap-3 mb-10"
          >
            <div className="w-2 h-2 rounded-full bg-accent" />
            <span className="studio-eyebrow text-subtle-foreground">
              [ Kivox Studio ]
            </span>
          </motion.div>

          {/* Large headline — with italic serif accent on key phrase */}
          <motion.h1
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.2 }}
            className="studio-h1 font-sans font-bold text-foreground mb-10"
          >
            Make your business
            <br />
            easier to{" "}
            <em className="font-serif font-normal text-accent not-italic" style={{ fontStyle: "italic" }}>
              trust online.
            </em>
          </motion.h1>

          {/* Editorial subhead — capped line length */}
          <motion.p
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.3 }}
            className="studio-body-serif text-muted-foreground max-w-2xl mb-12"
          >
            {home.hero.subhead}
          </motion.p>

          {/* CTAs — left-aligned row */}
          <motion.div
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <ButtonLink 
              href="/#contact" 
              variant="primary"
              className="text-base px-9 py-4 font-medium"
            >
              {home.hero.ctas.primary}
            </ButtonLink>
            
            <ButtonLink 
              href="/work" 
              variant="secondary"
              className="text-base px-9 py-4 font-medium"
            >
              {home.hero.ctas.secondary}
            </ButtonLink>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
