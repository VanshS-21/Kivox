"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { brand } from "@/content/brand";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault } from "@/lib/motion";

export function HomeContact() {
  const reduce = useReducedMotion();

  return (
    <Section id="contact" className="relative pt-[180px] lg:pt-[240px] pb-[140px] lg:pb-[180px] overflow-hidden bg-background">
      {/* Larger, more committed ambient glow */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 60, 0],
          x: [0, 70, 0],
          y: [0, -50, 0]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] left-[20%] w-[800px] h-[800px] rounded-full blur-[160px]"
        style={{ background: 'var(--accent)', opacity: 'calc(var(--hero-glow-opacity) * 0.9)' }}
      />
      
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, -45, 0],
          x: [0, -60, 0],
          y: [0, 35, 0]
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[15%] right-[20%] w-[650px] h-[650px] rounded-full blur-[140px]"
        style={{ background: 'var(--accent-rose)', opacity: 'calc(var(--hero-glow-opacity) * 0.45)' }}
      />

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          variants={fadeUp}
          transition={{ ...transitionDefault, delay: 0.05 }}
          className="inline-flex items-center gap-3 mb-14 lg:mb-20"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="studio-eyebrow text-accent">
            Get In Touch
          </span>
        </motion.div>

        {/* Split layout — more generous gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — headline, body, CTA */}
          <motion.div
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="lg:col-span-7 space-y-10"
          >
            {/* Pushed headline scale — between h2 and h1 for impact */}
            <motion.h2
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: 0.1 }}
              className="font-sans font-bold text-foreground"
              style={{ fontSize: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)', lineHeight: 1.06, letterSpacing: '-0.02em' }}
            >
              Let&apos;s build
              <br />
              your next
              <br />
              <em
                className="font-serif font-normal text-accent"
                style={{ fontStyle: "italic" }}
              >
                big thing.
              </em>
            </motion.h2>
            
            <motion.p
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: 0.2 }}
              className="studio-body-serif text-muted-foreground max-w-lg"
            >
              {home.contact.line}
            </motion.p>

            {/* CTA with circle arrow — bolder, larger */}
            <motion.div
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: 0.3 }}
              className="flex items-center gap-5"
            >
              <Link
                href="/contact"
                className="w-[72px] h-[72px] rounded-full border-2 border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-accent-ink hover:shadow-amber-glow transition-all duration-300"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <div>
                <span className="studio-eyebrow text-foreground block">
                  Start a Project
                </span>
                <span className="studio-caption">
                  Takes less than 2 minutes
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — contact card */}
          <motion.div
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.25 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Say Hello card — more padded, bolder */}
            <div className="bg-elevated rounded-[20px] border border-border p-10 space-y-5 hover:border-accent/20 transition-colors duration-300">
              <span className="studio-eyebrow text-subtle-foreground">
                Say Hello
              </span>
              <div>
                <Link
                  href={`mailto:${brand.contact.email}`}
                  className="studio-h4 font-sans font-semibold text-foreground hover:text-accent transition-colors"
                >
                  {brand.contact.email}
                </Link>
              </div>
              <div className="flex gap-5 pt-2">
                <Link
                  href={brand.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-tag text-subtle-foreground hover:text-accent transition-colors"
                >
                  LinkedIn
                </Link>
                <Link
                  href={brand.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-tag text-subtle-foreground hover:text-accent transition-colors"
                >
                  Instagram
                </Link>
              </div>
            </div>

            {/* Location — more padded, bolder */}
            <div className="bg-elevated rounded-[20px] border border-border p-10 hover:border-accent/20 transition-colors duration-300">
              <span className="studio-eyebrow text-subtle-foreground">
                Based In
              </span>
              <div className="mt-5 flex items-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'oklch(0.72 0.17 155)' }} />
                <div>
                  <p className="text-xl text-foreground font-semibold tracking-tight">
                    Bengaluru
                  </p>
                  <p className="studio-caption">
                    India · Serving businesses worldwide
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
