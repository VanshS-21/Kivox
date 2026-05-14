"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Subtle amber glow that follows the cursor on desktop.
 * Fades when idle. Hidden on mobile and prefers-reduced-motion.
 *
 * Performance: uses a self-terminating rAF loop that only runs during
 * active mouse movement + trail convergence, not 24/7.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailPosRef = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const rafRef = useRef<number>(0);
  const isTickingRef = useRef(false);

  const tick = useCallback(() => {
    const glow = glowRef.current;
    const trail = trailRef.current;
    if (!glow || !trail) {
      isTickingRef.current = false;
      return;
    }

    // Lerp the trail position toward the glow position
    const tp = trailPosRef.current;
    const gp = posRef.current;
    const dx = gp.x - tp.x;
    const dy = gp.y - tp.y;
    tp.x += dx * 0.12;
    tp.y += dy * 0.12;

    glow.style.transform = `translate(${gp.x}px, ${gp.y}px) translate(-50%, -50%)`;
    trail.style.transform = `translate(${tp.x}px, ${tp.y}px) translate(-50%, -50%)`;

    // Self-terminating: stop when trail has converged (< 0.5px)
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
      isTickingRef.current = false;
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  /** Start the rAF loop if it's not already running */
  const ensureTicking = useCallback(() => {
    if (!isTickingRef.current) {
      isTickingRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    // Skip on mobile / reduced-motion
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    // Only show on devices with fine pointer (mouse)
    const pointer = window.matchMedia("(pointer: fine)");
    if (!pointer.matches) return;

    const glow = glowRef.current;
    const trail = trailRef.current;
    if (!glow || !trail) return;

    function handleMouseMove(e: MouseEvent) {
      posRef.current = { x: e.clientX, y: e.clientY };

      /* Hide glow inside carousel frames — clashes with tunnel canvas */
      const target = e.target as HTMLElement;
      const inFrame = target.closest?.(".carousel-frame");
      if (inFrame) {
        if (visibleRef.current) {
          glow!.style.opacity = "0";
          trail!.style.opacity = "0";
          visibleRef.current = false;
        }
        return;
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        glow!.style.opacity = "1";
        trail!.style.opacity = "1";
      }

      // Kick the rAF loop (self-terminates when trail converges)
      ensureTicking();

      // Reset idle timer
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (glow) glow.style.opacity = "0";
        if (trail) trail.style.opacity = "0";
        visibleRef.current = false;
      }, 3000);
    }

    function handleMouseLeave() {
      if (glow) glow.style.opacity = "0";
      if (trail) trail.style.opacity = "0";
      visibleRef.current = false;
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimerRef.current);
      isTickingRef.current = false;
    };
  }, [ensureTicking]);

  return (
    <>
      {/* Primary glow dot */}
      <div
        ref={glowRef}
        className="cursor-glow-element"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "var(--cursor-dot)",
          boxShadow: "var(--cursor-dot-glow)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "opacity 0.5s ease-out",
          willChange: "transform",
        }}
      />
      {/* Trailing glow — larger, softer, delayed */}
      <div
        ref={trailRef}
        className="cursor-glow-element"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "var(--cursor-trail)",
          boxShadow: "var(--cursor-trail-glow)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "opacity 0.8s ease-out",
          willChange: "transform",
        }}
      />
    </>
  );
}
