"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const words = ["customers.", "growth.", "revenue."];

export function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className="inline-flex overflow-hidden align-bottom font-serif text-accent" 
      style={{ fontStyle: "italic", fontWeight: 300, minWidth: "5em" }}
    >
      <AnimatePresence mode="popLayout">
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
