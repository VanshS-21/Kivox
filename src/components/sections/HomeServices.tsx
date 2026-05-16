"use client";

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
      id="services"
      spacing="loose"
      className="bg-surface-alt"
    >
      <Container>
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="mb-12 md:mb-16 lg:mb-20 text-center flex flex-col items-center"
        >
          <p className="studio-eyebrow text-accent mb-4">[ Services ]</p>
          <h2 className="studio-h2-editorial max-w-3xl text-foreground">
            What Kivox builds.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {home.services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: reduce ? 0 : idx * 0.1 }}
              className="bg-card border border-border rounded-2xl p-8 flex flex-col hover:shadow-lg transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-start gap-4 mb-6">
                <span className="font-mono text-xl font-medium text-accent/40 studio-tabular select-none pt-0.5 transition-colors group-hover:text-accent">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <h3 className="studio-h3-sans text-foreground">
                  {service.title}
                </h3>
              </div>
              
              <p className="studio-body text-muted-foreground mb-8 flex-grow">
                {service.summary}
              </p>
              
              <div className="space-y-3 border-t border-border/50 pt-6">
                {service.examples.map((example) => (
                  <div key={example} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5 opacity-80" strokeWidth={2.5} />
                    <span className="text-sm text-foreground/80 font-medium">{example}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
