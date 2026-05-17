"use client";

import { useReducedMotion } from "motion/react";
import * as motion from "motion/react-client";
import type { Variants } from "motion/react";

import { RotatingText } from "@/components/ui/RotatingText";
import { cn } from "@/lib/cn";

const wordVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)", y: 12 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (customDelay: number) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: customDelay,
    },
  }),
};

function AnimatedWords({ text, reduce }: { text: string; reduce: boolean }) {
  return (
    <>
      {text.split(/(\s+)/).map((word, i) => {
        if (!word.trim()) return <span key={i}>{word}</span>;

        return (
          <motion.span
            key={i}
            variants={reduce ? undefined : wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
        );
      })}
    </>
  );
}

export function HeroHeadline({
  className,
  delay = 0.1,
}: {
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion() ?? false;

  return (
    <motion.h1
      className={cn("studio-h1-headline text-foreground", className)}
      variants={reduce ? undefined : containerVariants}
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "visible"}
      custom={delay}
    >
      <AnimatedWords text="We build" reduce={reduce} />
      <br className="hidden lg:block" />
      <AnimatedWords text="websites that" reduce={reduce} />
      <br />
      <AnimatedWords text="turn visitors into" reduce={reduce} />{" "}
      <motion.span
        variants={reduce ? undefined : wordVariants}
        className="inline-block align-bottom"
      >
        <RotatingText />
      </motion.span>
    </motion.h1>
  );
}
