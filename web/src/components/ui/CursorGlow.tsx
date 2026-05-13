"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * Subtle amber glow that follows the cursor on desktop.
 * Fades when idle. Hidden on mobile and prefers-reduced-motion.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const trailPosRef = useRef({ x: -100, y: -100 });
  const visibleRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const rafRef = useRef<number>(0);

  const tick = useCallback(() => {
    const glow = glowRef.current;
    const trail = trailRef.current;
    if (!glow || !trail) return;

    // Lerp the trail position toward the glow position
    const tp = trailPosRef.current;
    const gp = posRef.current;
    tp.x += (gp.x - tp.x) * 0.12;
    tp.y += (gp.y - tp.y) * 0.12;

    glow.style.transform = `translate(${gp.x}px, ${gp.y}px) translate(-50%, -50%)`;
    trail.style.transform = `translate(${tp.x}px, ${tp.y}px) translate(-50%, -50%)`;

    rafRef.current = requestAnimationFrame(tick);
  }, []);

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

      if (!visibleRef.current) {
        visibleRef.current = true;
        glow!.style.opacity = "1";
        trail!.style.opacity = "1";
      }

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
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimerRef.current);
    };
  }, [tick]);

  return (
    <>
      {/* Primary glow dot */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: "oklch(0.72 0.18 65 / 0.5)",
          boxShadow: "0 0 20px 8px oklch(0.72 0.18 65 / 0.15)",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transition: "opacity 0.5s ease-out",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />
      {/* Trailing glow — larger, softer, delayed */}
      <div
        ref={trailRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "oklch(0.72 0.18 65 / 0.12)",
          boxShadow: "0 0 30px 12px oklch(0.72 0.18 65 / 0.06)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transition: "opacity 0.8s ease-out",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
