"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function HeroMockupFrame({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
      animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.72,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.28,
      }}
      className="hero-mockup-frame relative mx-auto mt-8 w-full max-w-[20rem] sm:max-w-lg lg:mt-0 lg:max-w-[520px] xl:max-w-[560px]"
    >
      {children}
    </motion.div>
  );
}
