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
    <Section id="contact" className="relative pt-[160px] lg:pt-[200px] pb-[120px] lg:pb-[160px] overflow-hidden bg-background">
      {/* Organic accent glow blobs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 60, 0],
          x: [0, 60, 0],
          y: [0, -40, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-accent/[0.08] blur-[140px]"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          rotate: [0, -45, 0],
          x: [0, -50, 0],
          y: [0, 30, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-accent/[0.05] blur-[120px]"
      />

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "show"}
          variants={fadeUp}
          transition={{ ...transitionDefault, delay: 0.05 }}
          className="inline-flex items-center gap-3 mb-12 lg:mb-16"
        >
          <div className="w-2 h-2 rounded-full bg-accent" />
          <span className="studio-eyebrow text-accent">
            Get In Touch
          </span>
        </motion.div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — headline, body, CTA */}
          <motion.div
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="lg:col-span-7 space-y-8"
          >
            <motion.h2
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: 0.1 }}
              className="studio-h2 font-sans font-bold text-foreground"
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

            {/* CTA with circle arrow */}
            <motion.div
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <Link
                href="/contact"
                className="w-16 h-16 rounded-full border-2 border-accent flex items-center justify-center text-accent hover:bg-accent hover:text-accent-ink transition-all duration-300"
              >
                <svg
                  width="22"
                  height="22"
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
            {/* Say Hello card */}
            <div className="bg-elevated rounded-[16px] border border-border p-8 space-y-4">
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
              <div className="flex gap-4 pt-2">
                <Link
                  href={brand.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-tag text-subtle-foreground hover:text-foreground transition-colors"
                >
                  LinkedIn
                </Link>
                <Link
                  href={brand.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="studio-tag text-subtle-foreground hover:text-foreground transition-colors"
                >
                  Instagram
                </Link>
              </div>
            </div>

            {/* Location */}
            <div className="bg-elevated rounded-[16px] border border-border p-8">
              <span className="studio-eyebrow text-subtle-foreground">
                Based In
              </span>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div>
                  <p className="text-lg text-foreground font-semibold tracking-tight">
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
