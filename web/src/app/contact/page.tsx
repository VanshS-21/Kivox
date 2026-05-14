"use client";

import { motion, useReducedMotion } from "motion/react";

import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Container } from "@/components/ui/Container";
import { brand } from "@/content/brand";
import { contact } from "@/content/pages/contact";
import { easeOutExpo, easeOutQuint } from "@/lib/motion";

export default function ContactPage() {
  const reduce = useReducedMotion();
  const tel = brand.contact.phone.replace(/\s+/g, "");

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.2, 1], rotate: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[5%] right-[10%] w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] rounded-full blur-[80px] lg:blur-[200px]"
          style={{ background: 'var(--accent)', opacity: 'calc(var(--hero-glow-opacity) * 0.5)' }}
        />
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.3, 1], rotate: [0, -20, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] left-[5%] w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] rounded-full blur-[80px] lg:blur-[180px]"
          style={{ background: 'var(--accent-rose)', opacity: 'calc(var(--hero-glow-opacity) * 0.3)' }}
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
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-accent"
            />
            <span className="studio-eyebrow text-accent">[ Start a Project ]</span>
          </div>

          <h1
            className="font-sans font-bold text-foreground mb-5"
            style={{ fontSize: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)', lineHeight: 1.06, letterSpacing: '-0.025em' }}
          >
            Tell us what
            <br />
            you&apos;re{" "}
            <em className="font-serif font-normal text-accent" style={{ fontStyle: "italic" }}>
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
          animate={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
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
          <div className="h-px bg-border mb-10" />
          <h2 className="text-sm font-semibold text-foreground tracking-tight mb-8">What happens next</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "01", text: "Confirm receipt: you'll hear from us within 24 hours." },
              { step: "02", text: "Ask 2 to 3 clarifying questions to scope it correctly." },
              { step: "03", text: "Propose scope + timeline + the next call." },
            ].map((item, idx) => (
              <motion.div
                key={item.step}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.4 + idx * 0.1 }}
                className="flex flex-col gap-3"
              >
                <span className="text-accent font-mono text-xs tracking-wider">{item.step}</span>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
