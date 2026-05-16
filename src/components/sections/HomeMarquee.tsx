"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const marqueeItems = [
  "Digital Craftsmanship",
  "Clarity-First Design",
  "Premium Experiences",
  "Studio Excellence",
  "Innovation & Precision",
  "Thoughtful Engineering",
];

const marqueeGroups = [0, 1, 2];
const marqueeSpeed = 64; // px/s keeps motion consistent across device widths.

type MarqueeTrackStyle = CSSProperties & {
  "--marquee-distance"?: string;
};

export function HomeMarquee() {
  const reduce = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const [groupWidth, setGroupWidth] = useState(0);

  const handleMouseEnter = useCallback(() => setPaused(true), []);
  const handleMouseLeave = useCallback(() => {
    setPaused(false);
    setHoveredIdx(null);
  }, []);

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const measure = () => {
      setGroupWidth(group.getBoundingClientRect().width);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(group);

    return () => observer.disconnect();
  }, []);

  const duration = groupWidth > 0 ? groupWidth / marqueeSpeed : 0;
  const shouldAnimate = !reduce && groupWidth > 0;

  return (
    <section
      className="relative overflow-hidden border-y border-border bg-surface-alt py-8 lg:py-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Kivox studio qualities"
    >
      {/* Fade edges */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 sm:w-24"
        style={{
          background:
            "linear-gradient(to right, var(--bg-surface-alt), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 sm:w-24"
        style={{
          background:
            "linear-gradient(to left, var(--bg-surface-alt), transparent)",
        }}
      />

      <div className="relative">
        <div
          className="flex w-max items-center whitespace-nowrap will-change-transform"
          aria-hidden="true"
          style={
            {
              "--marquee-distance": `${groupWidth}px`,
              animationName: shouldAnimate ? "marquee-scroll" : "none",
              animationDuration: shouldAnimate ? `${duration}s` : "0s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState:
                paused && shouldAnimate ? "paused" : "running",
            } as MarqueeTrackStyle
          }
        >
          {marqueeGroups.map((group) => (
            <div
              key={group}
              ref={group === 0 ? groupRef : undefined}
              className="flex shrink-0 items-center"
            >
              {marqueeItems.map((item, idx) => {
                const isHovered = hoveredIdx === idx;
                return (
                  <div
                    key={`${group}-${item}`}
                    className="flex shrink-0 items-center gap-12 px-6"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <motion.span
                      animate={{
                        scale: isHovered ? 1.08 : 1,
                        color: isHovered ? "var(--accent)" : "var(--fg-muted)",
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="cursor-default select-none whitespace-nowrap font-sans text-xl font-semibold lg:text-2xl"
                    >
                      {item}
                    </motion.span>
                    <motion.span
                      animate={{
                        scale: isHovered ? 1.6 : 1,
                        opacity: isHovered ? 0.9 : 0.35,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="h-2 w-2 shrink-0 rounded-full bg-accent"
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
