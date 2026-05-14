"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

interface MagneticProps {
  children: React.ReactNode;
  /** Controls how far the element moves towards the cursor. Default 0.2 */
  strength?: number;
  /** Optional class name for the wrapper div */
  className?: string;
}

/**
 * A high-craft interactive wrapper that subtly pulls the element towards the user's cursor.
 * Disables automatically for users who prefer reduced motion.
 */
export function Magnetic({ children, strength = 0.2, className = "inline-block" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * strength, y: middleY * strength });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
