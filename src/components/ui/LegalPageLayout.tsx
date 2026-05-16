"use client";

import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
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

export function LegalPageLayout({
  title,
  intro,
  sections,
}: LegalPageLayoutProps) {
  const reduce = useReducedMotion();

  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20">
      <Container size="narrow">
        {/* Header — staggered entrance */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={
            reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{ duration: 0.7, ease: easeOutQuint }}
          className="studio-h1-headline text-foreground"
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
        <div className="mt-10 space-y-12">
          {sections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{
                duration: 0.6,
                ease: easeOutExpo,
                delay: idx < 3 ? idx * 0.08 : 0,
              }}
            >
              <h2 className="studio-h3-sans text-foreground mb-4">{section.title}</h2>
              {section.lead ? <p className="studio-body text-foreground font-medium mb-4">{section.lead}</p> : null}
              {section.paragraphs?.map((p) => (
                <p key={p} className="studio-body text-muted-foreground mb-4">{p}</p>
              ))}
              {section.bullets ? (
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  {section.bullets.map((b) => (
                    <li key={b} className="studio-body text-muted-foreground">{b}</li>
                  ))}
                </ul>
              ) : null}
            </motion.div>
          ))}
        </div>
      </Container>
    </div>
  );
}
