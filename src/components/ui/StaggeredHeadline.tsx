"use client";

import { useReducedMotion } from "motion/react";
import * as motion from "motion/react-client";
import { isValidElement, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface StaggeredHeadlineProps {
  className?: string;
  children: ReactNode;
  delay?: number;
}

import { Variants } from "motion/react";

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

/**
 * Helper to split text nodes into words while keeping React elements (like <br /> or <RotatingText />) intact.
 * We'll do a simpler approach: we accept children, but if you want staggered words, 
 * it's better to pass text strings and components sequentially, and we wrap strings in motion.spans.
 */
function StaggerChildren({ children }: { children: ReactNode }) {
  if (typeof children === "string") {
    return (
      <>
        {children.split(/(\s+)/).map((word, i) => {
          if (!word.trim()) return <span key={i}>{word}</span>;
          return (
            <motion.span
              key={i}
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          );
        })}
      </>
    );
  }
  
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((child, i) => (
          <StaggerChildren key={i}>{child}</StaggerChildren>
        ))}
      </>
    );
  }

  if (isValidElement(children) && children.type === "br") {
    return children;
  }

  // If it's a React element, we can wrap it in a motion span so it staggers as a single block
  return (
    <motion.span variants={wordVariants} className="inline-block align-bottom">
      {children}
    </motion.span>
  );
}

export function StaggeredHeadline({ className, children, delay = 0.1 }: StaggeredHeadlineProps) {
  const reduce = useReducedMotion();

  return (
    <motion.h1
      className={cn("studio-h1-headline text-foreground", className)}
      variants={reduce ? undefined : containerVariants}
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "visible"}
      custom={delay}
    >
      <StaggerChildren>{children}</StaggerChildren>
    </motion.h1>
  );
}
