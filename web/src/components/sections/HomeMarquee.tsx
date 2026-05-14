"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";

const marqueeItems = [
  "Digital Craftsmanship",
  "Clarity-First Design",
  "Premium Experiences",
  "Studio Excellence",
  "Innovation & Precision",
  "Thoughtful Engineering",
];

export function HomeMarquee() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => setPaused(true), []);
  const handleMouseLeave = useCallback(() => {
    setPaused(false);
    setHoveredIdx(null);
  }, []);

  // Duplicate items 4× to ensure seamless loop
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <section
      className="relative py-10 lg:py-14 overflow-hidden border-y border-border bg-surface-alt"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, var(--bg-surface-alt), transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, var(--bg-surface-alt), transparent)" }}
      />

      <div className="relative" ref={trackRef}>
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{
            x: reduce ? 0 : ["0%", "-50%"],
          }}
          transition={{
            x: {
              duration: 40,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            },
          }}
          style={{
            animationPlayState: paused && !reduce ? "paused" : "running",
          }}
        >
          {items.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={`${item}-${idx}`}
                className="shrink-0 flex items-center gap-10 px-5"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <motion.span
                  animate={{
                    scale: isHovered ? 1.08 : 1,
                    color: isHovered ? "var(--accent)" : "var(--fg-muted)",
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="text-base lg:text-lg font-medium whitespace-nowrap font-sans cursor-default select-none"
                >
                  {item}
                </motion.span>
                <motion.span
                  animate={{
                    scale: isHovered ? 1.6 : 1,
                    opacity: isHovered ? 0.9 : 0.35,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
