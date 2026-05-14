"use client";

import { Fragment, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Prose } from "@/components/ui/Prose";
import { easeOutExpo, easeOutQuint, viewportOnce } from "@/lib/motion";

interface LegalSection {
  title: string;
  lead?: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalPageLayoutProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
}

export function LegalPageLayout({ eyebrow, title, intro, sections }: LegalPageLayoutProps) {
  const reduce = useReducedMotion();

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20">
      <Container size="narrow">
        {/* Header — staggered entrance */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutQuint }}
        >
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease: easeOutQuint, delay: 0.1 }}
          className="mt-3 studio-h2 font-sans font-bold text-foreground"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.2 }}
          className="mt-4 studio-lede"
        >
          {intro}
        </motion.p>

        {/* Decorative divider — draw animation */}
        <motion.div
          initial={reduce ? false : { scaleX: 0 }}
          animate={reduce ? undefined : { scaleX: 1 }}
          transition={{ duration: 1, ease: easeOutExpo, delay: 0.35 }}
          className="mt-8 mb-2 h-px bg-border origin-left"
        />

        {/* Prose sections — staggered scroll reveals */}
        <Prose className="mt-10">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: idx < 3 ? idx * 0.08 : 0 }}
            >
              <h2>{section.title}</h2>
              {section.lead ? <p>{section.lead}</p> : null}
              {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          ))}
        </Prose>
      </Container>
    </div>
  );
}
