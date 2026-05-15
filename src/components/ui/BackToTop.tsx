"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Floating back-to-top button.
 * Appears once the user scrolls past ~100 vh (below the work section on the
 * home page) and smoothly scrolls to the top when clicked.
 */
export function BackToTop() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);

    const threshold = window.innerHeight; // 100vh

    function onScroll() {
      setVisible(window.scrollY > threshold);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted) return null;

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const baseStyle: CSSProperties = {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    zIndex: 90,
    display: "grid",
    placeItems: "center",
    width: 44,
    height: 44,
    borderRadius: "50%",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "var(--accent-glow)",
    background: "var(--bg-elevated)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "var(--accent)",
    cursor: "pointer",
    boxShadow: "0 2px 10px color-mix(in oklch, var(--fg-primary), transparent 88%), 0 0 0 0 var(--accent-glow)",
    transition:
      "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease",
    padding: 0,
    margin: 0,
    outline: "none",
  };

  const hoverStyle: CSSProperties = hovered
    ? {
        background: "var(--accent)",
        color: "var(--accent-ink)",
        borderColor: "var(--accent)",
        boxShadow:
          "0 4px 20px var(--accent-glow), 0 0 0 4px var(--accent-muted)",
        transform: "translateY(-2px)",
      }
    : {};

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          onClick={scrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 24, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.85 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ ...baseStyle, ...hoverStyle }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9 14V4m0 0L4 9m5-5l5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
