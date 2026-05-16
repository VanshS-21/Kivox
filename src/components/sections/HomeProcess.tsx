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

  return (
    <Section id="process" spacing="default" className="relative overflow-hidden bg-surface-alt">
      <Container className="relative z-10">
        
        {/* Heading + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-20 mb-12 md:mb-16 lg:mb-20">
          <motion.h2 initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: 0.05 }} className="lg:col-span-7 studio-h2-editorial text-foreground">
            A proven process<br />
            <em className="text-accent" style={{ fontStyle: "italic" }}>for exceptional results.</em>
          </motion.h2>
          <motion.p initial={reduce ? false : "hidden"} whileInView={reduce ? undefined : "show"} viewport={viewportOnce} variants={fadeUp} transition={{ ...transitionDefault, delay: 0.1 }} className="lg:col-span-5 studio-body-serif text-muted-foreground self-end">
            Every project follows the same disciplined arc, from understanding the problem to crafting a solution that endures.
          </motion.p>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {steps.map((step, idx) => {
            // Bento spans: 2-1, 1-2, 3 pattern
            let spanClass = "";
            let isDark = false;
            
            if (idx === 0) spanClass = "md:col-span-2 lg:col-span-2"; // Discover
            if (idx === 1) spanClass = "md:col-span-1 lg:col-span-1"; // Define
            if (idx === 2) { spanClass = "md:col-span-1 lg:col-span-1"; isDark = true; } // Design (Dark accent card)
            if (idx === 3) spanClass = "md:col-span-1 lg:col-span-2"; // Build
            if (idx === 4) { spanClass = "md:col-span-2 lg:col-span-3"; } // Launch & Evolve
            
            const isFullWidth = idx === 4;

            return (
              <motion.div
                key={idx}
                initial={reduce ? false : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={viewportOnce}
                variants={fadeUp}
                transition={{ ...transitionDefault, delay: idx * 0.1 }}
                className={cn(
                  "relative flex flex-col justify-between overflow-hidden rounded-2xl p-8 lg:p-10 shadow-[0_10px_40px_oklch(0_0_0_/_0.03)] dark:shadow-[0_10px_40px_oklch(0_0_0_/_0.2)] border transition-transform duration-500 hover:-translate-y-1",
                  spanClass,
                  isDark 
                    ? "bg-[oklch(0.20_0_0)] text-white border-transparent" 
                    : "studio-surface border-border/50",
                  isFullWidth ? "lg:flex-row lg:items-center lg:p-12 lg:gap-16" : "gap-12"
                )}
              >
                {/* Decorative background number */}
                <div 
                  className={cn(
                    "absolute -right-4 -bottom-8 text-[8rem] font-serif italic leading-none select-none pointer-events-none",
                    isDark ? "text-white opacity-[0.05]" : "text-foreground opacity-[0.03]"
                  )}
                  aria-hidden="true"
                >
                  {idx + 1}
                </div>

                {/* Number & Title */}
                <div className={cn("flex flex-col gap-4 relative z-10", isFullWidth ? "lg:w-1/3 shrink-0" : "")}>
                  <span className={cn(
                    "font-mono text-sm studio-tabular font-semibold tracking-widest",
                    isDark ? "text-white/70" : "text-accent"
                  )}>
                    STEP {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className={cn(
                    "font-serif text-3xl",
                    isDark ? "text-white" : "text-foreground"
                  )}>
                    {step.title}
                  </h3>
                </div>
                
                {/* Content */}
                <div className={cn("flex flex-col gap-3 relative z-10", isFullWidth ? "lg:flex-1" : "")}>
                  <h4 className={cn(
                    "studio-eyebrow",
                    isDark ? "text-white/90" : "text-foreground"
                  )}>
                    {step.subtitle}
                  </h4>
                  <p className={cn(
                    "studio-body text-lg leading-relaxed",
                    isDark ? "text-white/70" : "text-muted-foreground"
                  )}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </Container>
    </Section>
  );
}
