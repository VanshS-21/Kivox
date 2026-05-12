"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { work } from "@/content/pages/work";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { StudioCard } from "@/components/ui/StudioCard";
import { fadeUp, stagger, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeWorkPreview() {
  const reduce = useReducedMotion();

  return (
    <Section>
      <Container>
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Eyebrow>{home.workPreview.label}</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Work that shows the decisions
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              {home.workPreview.summary}
            </p>
          </div>

          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={stagger}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {work.items.slice(0, 4).map((item) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                transition={transitionDefault}
              >
                <Link className="block" href="/work">
                  <StudioCard className="h-full">
                    <div className="flex flex-col gap-2">
                      <div className="text-base font-semibold text-foreground">{item.title}</div>
                      <p className="text-sm leading-6 text-muted-foreground">{item.demonstrates}</p>
                    </div>
                  </StudioCard>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div>
            <ButtonLink href="/work" variant="ghost" size="sm" className="px-0">
              View all studio demonstrations →
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
