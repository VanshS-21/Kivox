"use client";

import { motion } from "motion/react";

export function HomeMarquee() {
  const marqueeContent = [
    "Digital Craftsmanship",
    "Clarity-First Design", 
    "Premium Experiences",
    "Studio Excellence",
    "Innovation & Precision",
    "Award-Winning Work"
  ];

  return (
    <section className="relative py-16 overflow-hidden border-y border-border bg-surface-alt">
      <div className="relative">
        <motion.div
          animate={{ x: [0, -100] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="flex gap-16"
        >
          {[...marqueeContent, ...marqueeContent, ...marqueeContent].map((item, idx) => (
            <div
              key={`${item}-${idx}`}
              className="shrink-0 text-xl font-medium text-foreground/40 whitespace-nowrap tracking-tight uppercase font-mono"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
