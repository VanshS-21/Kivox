"use client";

import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeProcess() {
  const reduce = useReducedMotion();
  const steps = home.process;
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleNext = useCallback(() => {
    if (scrollRef.current) {
      // scroll by approximate width of one card + gap (85vw + gap)
      const scrollAmount = window.innerWidth * 0.85;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  }, []);

  return (
    <Section id="process" spacing="default" className="relative overflow-hidden bg-surface-alt border-t border-border">
      <Container className="relative z-10">
        
        {/* Heading + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 mb-10 md:mb-16 lg:mb-20 items-end">
          <div className="lg:col-span-7 flex justify-between items-end">
            <motion.h2 initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: 0.05 }} className="studio-h2-editorial text-foreground">
              A proven process<br />
              <em className="text-accent" style={{ fontStyle: "italic" }}>for exceptional results.</em>
            </motion.h2>
          </div>
          <motion.p initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: 0.1 }} className="lg:col-span-5 studio-body-serif text-muted-foreground self-end">
            Every project follows the same disciplined arc, from understanding the problem to crafting a solution that endures.
          </motion.p>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:snap-none md:pb-0 md:mx-0 md:px-0 gap-5 md:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {steps.map((step, idx) => (
            <ProcessStep key={idx} step={step} idx={idx} reduce={reduce} onNext={handleNext} />
          ))}
          {/* Spacer for last item right padding on mobile */}
          <div className="w-1 shrink-0 md:hidden" aria-hidden="true" />
        </div>

      </Container>
    </Section>
  );
}

import { memo, useRef, useCallback } from "react";

const ProcessStep = memo(function ProcessStep({ step, idx, reduce, onNext }: { step: { title: string; subtitle: string; description: string; }; idx: number; reduce: boolean | null; onNext?: () => void }) {
  // Bento spans: 2-1, 1-2, 3 pattern
  let spanClass = "";
  const isDark = false;
  
  if (idx === 0) spanClass = "md:col-span-2 lg:col-span-2"; // Discover
  if (idx === 1) spanClass = "md:col-span-1 lg:col-span-1"; // Define
  if (idx === 2) { spanClass = "md:col-span-1 lg:col-span-1"; } // Design
  if (idx === 3) spanClass = "md:col-span-1 lg:col-span-2"; // Build
  if (idx === 4) { spanClass = "md:col-span-2 lg:col-span-3"; } // Launch & Evolve
  
  const isFullWidth = idx === 4;

  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ ...transitionDefault, delay: idx * 0.1 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className={cn(
        "relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 lg:p-10 shadow-rest border transition-transform duration-200 ease-[var(--ease-out-expo)] hover:-translate-y-1",
        "w-[85vw] shrink-0 snap-center md:w-auto md:shrink md:snap-none",
        spanClass,
        isDark 
          ? "bg-[var(--bg-primary)] text-[var(--fg-primary)] border-transparent" 
          : "studio-surface border-border/50",
        isFullWidth ? "lg:flex-row lg:items-center lg:p-12 lg:gap-16" : "gap-12"
      )}
    >
      {/* Decorative background number */}
      <motion.div 
        className={cn(
          "absolute -right-4 -bottom-8 text-[8rem] font-serif italic leading-none select-none pointer-events-none",
          isDark ? "text-[var(--fg-primary)]" : "text-foreground"
        )}
        style={{ opacity: isDark ? 0.05 : 0.03 }}
        animate={reduce ? undefined : {
          scale: [1, 1.05, 1],
          opacity: isDark ? [0.05, 0.08, 0.05] : [0.03, 0.06, 0.03],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: idx * 0.5,
        }}
        aria-hidden="true"
      >
        {idx + 1}
      </motion.div>

      {/* Number & Title */}
      <div className={cn("flex flex-col gap-4 relative z-10", isFullWidth ? "lg:w-1/3 shrink-0" : "")}>
        <span className={cn(
          "font-mono text-sm studio-tabular font-semibold tracking-widest",
          isDark ? "text-[var(--fg-primary)]/70" : "text-accent"
        )}>
          STEP {String(idx + 1).padStart(2, "0")}
        </span>
        <h3 className={cn(
          "studio-h3-sans",
          isDark ? "text-[var(--fg-primary)]" : "text-foreground"
        )}>
          {step.title}
        </h3>
      </div>
      
      {/* Content */}
      <div className={cn("flex flex-col gap-3 relative z-10", isFullWidth ? "lg:flex-1" : "")}>
        <p className={cn(
          "studio-eyebrow",
          isDark ? "text-[var(--fg-primary)]/90" : "text-foreground"
        )}>
          {step.subtitle}
        </p>
        <p className={cn(
          "studio-body text-lg leading-relaxed pr-6", // Added pr-6 for mobile arrow spacing
          isDark ? "text-[var(--fg-primary)]/70" : "text-muted-foreground"
        )}>
          {step.description}
        </p>
      </div>

      {/* Mobile Swipe Arrow (Centered on card edge) */}
      {idx < 4 && (
        <button 
          onClick={onNext}
          className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 text-accent/40 hover:text-accent p-2 cursor-pointer z-20 focus:outline-none"
          aria-label="Next step"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}
    </motion.div>
  );
});
