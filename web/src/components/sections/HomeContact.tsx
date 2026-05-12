"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { brand } from "@/content/brand";
import { home } from "@/content/pages/home";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeContact() {
  const reduce = useReducedMotion();

  return (
    <Section id="contact">
      <Container>
        <Panel padding="lg" className="relative">
          <div className="flex flex-col gap-4">
            <motion.h2
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={viewportOnce}
              variants={fadeUp}
              transition={transitionDefault}
              className="text-3xl font-semibold tracking-tight text-foreground"
            >
              Start a project
            </motion.h2>
            <motion.p
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: 0.06 }}
              className="max-w-2xl text-pretty text-sm leading-6 text-muted-foreground"
            >
              {home.contact.line}
            </motion.p>
            <motion.div
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: 0.1 }}
              className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <ButtonLink href="/contact" variant="primary">
                Open inquiry form
              </ButtonLink>
              <Link
                className="text-sm font-medium text-foreground/80 underline decoration-border underline-offset-4 transition hover:text-foreground"
                href={`mailto:${brand.contact.email}`}
              >
                Email instead: {brand.contact.email}
              </Link>
            </motion.div>
          </div>
        </Panel>
      </Container>
    </Section>
  );
}
