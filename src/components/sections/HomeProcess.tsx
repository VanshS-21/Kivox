"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useInView } from "motion/react";
import { ChevronDown } from "lucide-react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { fadeUp, transitionDefault, viewportOnce, easeOutExpo } from "@/lib/motion";

export function HomeProcess() {
  const reduce = useReducedMotion();
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-10% 0px -10% 0px" });

  // Removed isInView effect to ensure the first step is always visible by default.

  const steps = home.process;

  // Allow desktop step to be null to support closing
  const desktopActiveStep = activeStep;

  return (
    <Section id="process" spacing="default" className="relative overflow-hidden bg-surface-alt">
      <Container className="relative z-10" ref={containerRef}>

        {/* Heading + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 mb-10 md:mb-16 lg:mb-20">
          <motion.h2 initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: 0.05 }} className="lg:col-span-7 studio-h2-editorial text-foreground">
            A proven process<br />
            <em className="text-accent" style={{ fontStyle: "italic" }}>for exceptional results.</em>
          </motion.h2>
          <motion.p initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: 0.1 }} className="lg:col-span-5 studio-body-serif text-muted-foreground self-end">
            Every project follows the same disciplined arc, from understanding the problem to crafting a solution that endures.
          </motion.p>
        </div>

        {/* ── Desktop: Horizontal Stepper (Inside Floating Card) ── */}
        <motion.div 
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={{ ...transitionDefault, delay: 0.15 }}
          className="hidden lg:flex w-full flex-col studio-surface rounded-2xl p-10 lg:p-14 relative overflow-hidden shadow-[0_20px_60px_oklch(0_0_0_/_0.05)] dark:shadow-[0_20px_60px_oklch(0_0_0_/_0.3)]"
        >
          {/* Stepper Track */}
          <div className="flex w-full mb-16 relative">
            {/* Base track line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-border/40" />
            
            {steps.map((step, idx) => {
              const isActive = desktopActiveStep === idx;
              const isPast = desktopActiveStep !== null && idx < desktopActiveStep;
              
              return (
                <button 
                  key={idx}
                  onClick={() => setActiveStep(isActive ? null : idx)}
                  className="flex-1 relative text-left group pt-6 outline-none pr-4"
                  aria-label={`Phase ${idx + 1}: ${step.title}`}
                >
                  {/* Animated Active/Past line */}
                  <motion.div 
                    className="absolute top-0 left-0 h-[2px] origin-left"
                    initial={false}
                    animate={{ 
                      scaleX: isActive || isPast ? 1 : 0, 
                      backgroundColor: isActive ? "var(--accent)" : "var(--foreground)" 
                    }}
                    style={{ 
                      width: "100%",
                      opacity: isPast && !isActive ? 0.3 : 1 
                    }}
                    transition={{ duration: 0.4, ease: easeOutExpo }}
                  />
                  
                  {/* Step Info */}
                  <div className="flex flex-col gap-2 transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0.5 }}>
                    <span className="font-mono text-xs studio-tabular tracking-widest text-accent">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="font-serif tracking-wide text-xl text-foreground">
                      {step.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Detail Area */}
          <div className="relative min-h-[140px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {desktopActiveStep !== null && (
                <motion.div
                  key={desktopActiveStep}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="max-w-3xl"
                >
                  <h3 className="studio-h3-sans mb-3 text-foreground">
                    {steps[desktopActiveStep].subtitle}
                  </h3>
                  <p className="studio-body text-muted-foreground text-lg leading-relaxed">
                    {steps[desktopActiveStep].description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Mobile: Accordion ── */}
        <div className="lg:hidden flex flex-col gap-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            const num = String(idx + 1).padStart(2, "0");
            
            return (
              <motion.div 
                key={idx}
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...transitionDefault, delay: idx * 0.05 }}
                className="studio-surface rounded-xl overflow-hidden shadow-[0_10px_40px_oklch(0_0_0_/_0.03)] dark:shadow-[0_10px_40px_oklch(0_0_0_/_0.2)] border border-border/50"
              >
                <button 
                  onClick={() => setActiveStep(isActive ? null : idx)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left outline-none"
                  aria-expanded={isActive}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-accent studio-tabular">{num}</span>
                    <span className="font-serif text-xl text-foreground">{step.title}</span>
                  </div>
                  <motion.div 
                    animate={{ rotate: isActive ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: easeOutExpo }}
                    className="text-muted-foreground"
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: easeOutExpo }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-7">
                        <div className="pt-4 border-t border-border/40">
                          <h4 className="studio-eyebrow text-foreground mb-2 block">{step.subtitle}</h4>
                          <p className="studio-body text-muted-foreground">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
