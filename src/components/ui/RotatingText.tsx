"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const words = ["customers.", "inquiries.", "trust."];

export function RotatingText() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    if (reduce) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [reduce]);

  if (reduce) {
    return (
      <span
        className="inline-flex align-bottom font-serif text-accent"
        style={{ fontStyle: "italic", fontWeight: 300 }}
      >
        {words[0]}
      </span>
    );
  }

  return (
    <span
      className="inline-flex align-bottom font-serif text-accent"
      style={{ fontStyle: "italic", fontWeight: 300, minWidth: "5em" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
