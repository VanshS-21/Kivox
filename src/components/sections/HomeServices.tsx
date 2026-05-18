"use client";

import { memo } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeServices() {
  const reduce = useReducedMotion();

  return (
    <Section
      spacing="loose"
      className="bg-surface-alt border-t border-border"
    >
      <Container>
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <p className="studio-eyebrow text-accent mb-4">[ Services ]</p>
            <h2 className="studio-h2-editorial text-foreground">
              What Kivox builds.
            </h2>
          </div>
          <p className="studio-body-large text-muted-foreground max-w-md">
            We build websites and digital tools designed to earn trust and make
            your business easier to run.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12">
          {home.services.map((service, idx) => (
            <ServiceCard
              key={service.id}
              service={service}
              idx={idx}
              reduce={reduce}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

const ServiceCard = memo(function ServiceCard({
  service,
  idx,
  reduce,
}: {
  service: { id: string; title: string; summary: string; examples: string[] };
  idx: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ ...transitionDefault, delay: reduce ? 0 : idx * 0.1 }}
      className="studio-surface p-8 lg:p-10 flex flex-col group transition-colors duration-200 ease-[var(--ease-out-expo)] hover:shadow-hover hover:border-accent/40"
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="inline-block">
          <span className="font-mono text-xl font-medium text-accent/40 studio-tabular select-none transition-all duration-[500ms] ease-[var(--ease-out-expo)] group-hover:text-accent group-hover:scale-[1.3] group-hover:-translate-y-2 block origin-bottom-left">
            {String(idx + 1).padStart(2, "0")}
          </span>
        </span>
        <h3 className="studio-h3-sans text-foreground">{service.title}</h3>
      </div>

      <p className="studio-body text-muted-foreground mb-8 flex-grow">
        {service.summary}
      </p>

      <div className="space-y-3 pt-6 border-t border-border/50">
        {service.examples.map((example: string) => (
          <div key={example} className="flex items-start gap-3">
            <Check
              className="w-5 h-5 text-accent shrink-0 mt-0.5 opacity-80"
              strokeWidth={2.5}
            />
            <span className="text-sm text-foreground/80 font-medium">
              {example}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
});
