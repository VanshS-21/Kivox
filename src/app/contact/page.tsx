"use client";

import { motion, useReducedMotion } from "motion/react";

import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Container } from "@/components/ui/Container";
import { contact } from "@/content/pages/contact";
import { easeOutExpo, easeOutQuint } from "@/lib/motion";

export default function ContactPage() {
  const reduce = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.2, 1], rotate: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] right-[10%] w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] rounded-full blur-[80px] lg:blur-[200px]"
          style={{
            background: "var(--accent)",
            opacity: "calc(var(--hero-glow-opacity) * 0.5)",
          }}
        />
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.3, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[5%] w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] rounded-full blur-[80px] lg:blur-[180px]"
          style={{
            background: "var(--accent-rose)",
            opacity: "calc(var(--hero-glow-opacity) * 0.3)",
          }}
        />
      </div>

      <Container size="narrow" className="relative z-10 pt-24 sm:pt-32 pb-20">
        {/* Header — editorial, confident */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOutQuint }}
          className="mb-14 lg:mb-20"
        >
          <h1 className="studio-h1-headline text-foreground mb-5">
            Tell us what
            <br />
            you&apos;re{" "}
            <em
              className="font-serif font-normal text-accent"
              style={{ fontStyle: "italic" }}
            >
              building.
            </em>
          </h1>

          <p className="studio-body-serif text-muted-foreground max-w-xl">
            {contact.intro}
          </p>
        </motion.div>

        {/* Form container — clean, no grid artifacts */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={
            reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.15 }}
        >
          <InquiryForm />
        </motion.div>

        {/* What happens next — horizontal timeline */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.3 }}
          className="mt-16 lg:mt-24"
        >
          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            animate={reduce ? undefined : { scaleX: 1 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.35 }}
            className="h-px bg-border mb-10 origin-left"
          />
          <h2 className="studio-h3-sans text-foreground mb-8">
            What happens next
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                text: "Confirm receipt: you'll hear from us within 24 hours.",
              },
              {
                step: "02",
                text: "Ask 2 to 3 clarifying questions to scope it correctly.",
              },
              { step: "03", text: "Propose scope + timeline + the next call." },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: easeOutExpo,
                  delay: 0.45 + idx * 0.15,
                }}
                className="flex flex-col gap-3"
              >
                <span className="studio-eyebrow text-accent studio-tabular">
                  {item.step}
                </span>
                <p className="studio-body text-muted-foreground">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
