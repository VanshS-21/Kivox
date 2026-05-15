"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useSpring, useReducedMotion } from "motion/react";
import { useCursor } from "@/lib/context/CursorContext";
import { usePathname } from "next/navigation";

export function CursorGlow() {
  const { state, setCursor, resetCursor } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  // We use springs for that buttery smooth "magnetic" feel
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Reset cursor on route changes
  useEffect(() => {
    resetCursor();
  }, [pathname, resetCursor]);

  useEffect(() => {
    if (typeof window === "undefined" || reduceMotion) return;

    // Only enable on devices with fine pointer (mouse)
    const pointer = window.matchMedia("(pointer: fine)");
    if (!pointer.matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      // Handle custom target data attributes
      const target = e.target as HTMLElement;
      if (target.closest?.(".carousel-frame") || target.closest?.("[data-cursor='hidden']")) {
        if (isVisible) setIsVisible(false);
        return;
      }

      if (!isVisible) setIsVisible(true);

      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Event delegation for standard interactive elements (if they don't have a CursorTrigger)
      // We check if the current variant is default to not override CursorTrigger contexts
      if (state.variant === "default") {
        if (target.closest?.("[data-cursor='logo']")) {
          setCursor({ variant: "hover" });
        } else if (target.closest?.("a, button, [role='button'], input, textarea, select")) {
          setCursor({ variant: "hover" });
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (state.variant === "hover" && target.closest?.("a, button, [role='button'], input, textarea, select")) {
        resetCursor();
      }
    };

    const handleGlobalLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseLeave, { passive: true });
    document.addEventListener("mouseleave", handleGlobalLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mouseleave", handleGlobalLeave);
      clearTimeout(idleTimerRef.current);
    };
  }, [cursorX, cursorY, isVisible, reduceMotion, state.variant, setCursor, resetCursor]);

  if (reduceMotion || pathname?.startsWith("/showcase/medqueue")) return null;

  // Define variants
  const variants = {
    default: {
      width: 8,
      height: 8,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "0px solid rgba(255, 255, 255, 0)",
      opacity: isVisible ? 1 : 0,
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(255, 255, 255, 0)",
      border: "1.5px solid rgba(255, 255, 255, 0.4)",
      opacity: isVisible ? 1 : 0,
    },
    text: {
      width: 100,
      height: 100,
      backgroundColor: "rgba(255, 255, 255, 1)",
      border: "0px solid rgba(255, 255, 255, 0)",
      opacity: isVisible ? 1 : 0,
    },
    video: {
      width: 90,
      height: 90,
      backgroundColor: "rgba(255, 123, 71, 1)", // brand orange
      opacity: isVisible ? 1 : 0,
    },
    hidden: {
      opacity: 0,
      width: 14,
      height: 14,
    },
  };

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] flex items-center justify-center rounded-full overflow-hidden"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      variants={variants}
      animate={state.variant}
      transition={{
        width: { type: "spring", mass: 0.5, stiffness: 400, damping: 25 },
        height: { type: "spring", mass: 0.5, stiffness: 400, damping: 25 },
        opacity: { duration: 0.2 },
      }}
    >
      <motion.div
        className="text-black font-semibold text-sm whitespace-nowrap"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: state.variant === "text" || state.variant === "video" ? 1 : 0,
          scale: state.variant === "text" || state.variant === "video" ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      >
        {state.text && <span>{state.text}</span>}
        {state.icon && !state.text && <span>{state.icon}</span>}
      </motion.div>
    </motion.div>
  );
}
