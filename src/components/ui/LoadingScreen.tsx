"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate, useReducedMotion } from "motion/react";
import { useLoadingContext } from "@/lib/context/LoadingContext";
import { easeOutExpo, easeOutQuint } from "@/lib/motion";

export function LoadingScreen() {
  const { hasSeenLoader, setReady } = useLoadingContext();
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    // If the user has already seen the loader, unmount immediately
    if (hasSeenLoader) {
      setIsVisible(false);
      return;
    }

    if (reduce) {
      // Respect reduced motion: instantly jump to 100% and unmount
      sessionStorage.setItem("kivox_loaded", "true");
      setReady(true);
      setIsVisible(false);
      return;
    }

    // Sequence: Wait a beat, count up to 100 over ~1.2s, wait a beat, then hide
    let controls: any;
    
    const sequence = async () => {
      await new Promise((resolve) => setTimeout(resolve, 200));

      controls = animate(0, 100, {
        duration: 1.2,
        ease: easeOutQuint, // Fast start, slow finish
        onUpdate: (latest) => {
          setProgress(Math.floor(latest));
        }
      });

      await controls;
      
      // Mark as seen so we don't show it again on page loads
      sessionStorage.setItem("kivox_loaded", "true");
      
      // Wait a fraction of a second at 100% before lifting the curtain
      await new Promise((resolve) => setTimeout(resolve, 300));
      
      // Start exit animation and tell the rest of the app it can animate
      setIsVisible(false);
      setReady(true);
    };

    sequence();
    
    return () => {
      if (controls) controls.stop();
    };
  }, [hasSeenLoader, reduce, setReady]);

  return (
    <AnimatePresence>
      {isVisible && !hasSeenLoader && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "oklch(0.05 0.005 65)" }} // Fixed to Firelit Black
          initial={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
        >
          {/* Constellation Canvas faint background to bridge to hero */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-soft-light opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Eyebrow Label */}
            <span
              className="text-[0.6875rem] font-medium tracking-[0.18em] uppercase mb-8"
              style={{ color: "var(--hero-fg-muted)", fontFamily: "var(--font-mono)" }}
            >
              [ Kivox Studio ]
            </span>

            {/* Percentage Counter */}
            <motion.span
              className="studio-tabular block mb-6"
              style={{
                color: "var(--hero-fg)",
                fontFamily: "var(--font-mono)",
                fontSize: "clamp(3rem, 6vw + 1rem, 5rem)",
                fontWeight: 500,
                lineHeight: 1,
              }}
            >
              {String(progress).padStart(2, '0')}%
            </motion.span>

            {/* Expanding Amber Bar */}
            <div className="w-[200px] h-px relative overflow-hidden" style={{ background: "color-mix(in oklch, var(--accent) 20%, transparent)" }}>
              <motion.div
                className="absolute inset-y-0 left-0"
                style={{
                  background: "var(--accent)",
                  width: `${progress}%`,
                  boxShadow: "0 0 20px var(--accent)",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
