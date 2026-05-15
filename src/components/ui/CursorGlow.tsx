"use client";

import { useEffect, useRef, useCallback } from "react";

/**
 * A beautiful, minimal difference-blended cursor.
 * Features a single, smooth-tracking dot that elegantly scales
 * on interactive elements without overwhelming the UI.
 */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const tailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const lerpPosRef = useRef({ x: -100, y: -100 });
  const tailPosRef = useRef({ x: -100, y: -100 });
  const scaleRef = useRef(1);
  const currentScaleRef = useRef(1);
  const visibleRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const rafRef = useRef<number>(0);
  const isTickingRef = useRef(false);

  const tick = useCallback(() => {
    const dot = dotRef.current;
    const tail = tailRef.current;
    if (!dot || !tail) {
      isTickingRef.current = false;
      return;
    }

    const tp = lerpPosRef.current;
    const tlp = tailPosRef.current;
    const gp = posRef.current;
    
    // Smooth trailing physics for main dot
    tp.x += (gp.x - tp.x) * 0.25;
    tp.y += (gp.y - tp.y) * 0.25;

    // Fluid trailing physics for tail (follows the main dot)
    tlp.x += (tp.x - tlp.x) * 0.15;
    tlp.y += (tp.y - tlp.y) * 0.15;

    // Smooth scaling physics
    currentScaleRef.current += (scaleRef.current - currentScaleRef.current) * 0.2;
    const s = currentScaleRef.current;
    
    // Tail shrinks when hovering over interactive elements
    const tailScale = s > 1.1 ? 0 : 1;

    dot.style.transform = `translate(${tp.x}px, ${tp.y}px) translate(-50%, -50%) scale(${s})`;
    tail.style.transform = `translate(${tlp.x}px, ${tlp.y}px) translate(-50%, -50%) scale(${tailScale})`;

    // Stop ticking if we've converged
    const dx = gp.x - tp.x;
    const dy = gp.y - tp.y;
    if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(scaleRef.current - s) < 0.01) {
      isTickingRef.current = false;
      return;
    }

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  const ensureTicking = useCallback(() => {
    if (!isTickingRef.current) {
      isTickingRef.current = true;
      rafRef.current = requestAnimationFrame(tick);
    }
  }, [tick]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const pointer = window.matchMedia("(pointer: fine)");
    if (!pointer.matches) return;

    const dot = dotRef.current;
    const tail = tailRef.current;
    if (!dot || !tail) return;

    function handleMouseMove(e: MouseEvent) {
      posRef.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement;
      if (target.closest?.(".carousel-frame")) {
        if (visibleRef.current) {
          dot!.style.opacity = "0";
          tail!.style.opacity = "0";
          visibleRef.current = false;
        }
        return;
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        dot!.style.opacity = "1";
        tail!.style.opacity = "1";
        // Snap the lerp position to cursor on first appearance to prevent flying in
        lerpPosRef.current = { x: e.clientX, y: e.clientY };
        tailPosRef.current = { x: e.clientX, y: e.clientY };
      }

      ensureTicking();
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (dot) dot.style.opacity = "0";
        if (tail) tail.style.opacity = "0";
        visibleRef.current = false;
      }, 3000);
    }

    function handleMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      
      if (target.closest?.("[data-cursor='logo']")) {
        scaleRef.current = 2.5; // Larger pop for the brand logo
      } else if (target.closest?.("a, button, [role='button'], input, textarea, select")) {
        scaleRef.current = 1.5; // Slight elegant pop
      } else {
        scaleRef.current = 1;
      }
      ensureTicking();
    }

    function handleMouseLeave() {
      if (dot) dot.style.opacity = "0";
      if (tail) tail.style.opacity = "0";
      visibleRef.current = false;
    }

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(idleTimerRef.current);
      isTickingRef.current = false;
    };
  }, [ensureTicking]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
      }}
    >
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#fff",
          opacity: 0,
          transition: "opacity 0.3s ease-out",
          willChange: "transform",
        }}
      />
      <div
        ref={tailRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#fff",
          opacity: 0,
          transition: "opacity 0.3s ease-out",
          willChange: "transform",
        }}
      />
    </div>
  );
}
