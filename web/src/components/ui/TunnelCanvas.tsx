"use client";

import { useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   Tunnel Canvas — One-Point Perspective Lines
   
   Draws converging lines from every edge of the frame toward the inner
   image boundary, creating a corridor/tunnel depth illusion. Lines pulse
   gently with staggered animation. Concentric depth rings reinforce the
   perspective effect.
   ═══════════════════════════════════════════════════════════════════════════ */

interface TunnelCanvasProps {
  className?: string;
}

/* Amber palette */
const AMBER = { r: 224, g: 123, b: 32 };
const AMBER_DIM = { r: 180, g: 100, b: 25 };

function rgba(c: typeof AMBER, a: number) {
  return `rgba(${c.r},${c.g},${c.b},${a})`;
}

export function TunnelCanvas({ className }: TunnelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;
    let padX = 0;
    let padY = 0;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;

      /* Read actual CSS padding from the frame container */
      const style = getComputedStyle(parent);
      padX = parseFloat(style.paddingLeft) || canvas.width * 0.1;
      padY = parseFloat(style.paddingTop) || canvas.height * 0.15;
    }

    resize();
    window.addEventListener("resize", resize);

    const LINE_COUNT_H = 12;  /* lines per horizontal edge (top/bottom) */
    const LINE_COUNT_V = 8;   /* lines per vertical edge (left/right) */
    const RING_COUNT = 4;     /* concentric depth rings */

    function frame(timestamp: number) {
      if (!ctx || !canvas || !isVisible) return;
      const W = canvas.width;
      const H = canvas.height;
      const t = timestamp * 0.001;

      /* Inner rectangle — where the image lives */
      const ix = padX;
      const iy = padY;
      const iw = W - padX * 2;
      const ih = H - padY * 2;
      const ir = ix + iw; /* inner right */
      const ib = iy + ih; /* inner bottom */

      ctx.clearRect(0, 0, W, H);

      /* ── Converging lines: TOP edge ── */
      for (let i = 0; i <= LINE_COUNT_H; i++) {
        const frac = i / LINE_COUNT_H;
        const ox = frac * W;
        const innerX = ix + frac * iw;

        const pulse = Math.sin(t * 0.6 + i * 0.4) * 0.5 + 0.5;
        const alpha = 0.03 + pulse * 0.08;

        ctx.beginPath();
        ctx.moveTo(ox, 0);
        ctx.lineTo(innerX, iy);
        ctx.strokeStyle = rgba(AMBER, alpha);
        ctx.lineWidth = 0.3 + pulse * 0.3;
        ctx.stroke();
      }

      /* ── Converging lines: BOTTOM edge ── */
      for (let i = 0; i <= LINE_COUNT_H; i++) {
        const frac = i / LINE_COUNT_H;
        const ox = frac * W;
        const innerX = ix + frac * iw;

        const pulse = Math.sin(t * 0.6 + i * 0.4 + 2.0) * 0.5 + 0.5;
        const alpha = 0.03 + pulse * 0.08;

        ctx.beginPath();
        ctx.moveTo(ox, H);
        ctx.lineTo(innerX, ib);
        ctx.strokeStyle = rgba(AMBER, alpha);
        ctx.lineWidth = 0.3 + pulse * 0.3;
        ctx.stroke();
      }

      /* ── Converging lines: LEFT edge ── */
      for (let i = 0; i <= LINE_COUNT_V; i++) {
        const frac = i / LINE_COUNT_V;
        const oy = frac * H;
        const innerY = iy + frac * ih;

        const pulse = Math.sin(t * 0.7 + i * 0.5) * 0.5 + 0.5;
        const alpha = 0.03 + pulse * 0.08;

        ctx.beginPath();
        ctx.moveTo(0, oy);
        ctx.lineTo(ix, innerY);
        ctx.strokeStyle = rgba(AMBER, alpha);
        ctx.lineWidth = 0.3 + pulse * 0.3;
        ctx.stroke();
      }

      /* ── Converging lines: RIGHT edge ── */
      for (let i = 0; i <= LINE_COUNT_V; i++) {
        const frac = i / LINE_COUNT_V;
        const oy = frac * H;
        const innerY = iy + frac * ih;

        const pulse = Math.sin(t * 0.7 + i * 0.5 + 2.0) * 0.5 + 0.5;
        const alpha = 0.03 + pulse * 0.08;

        ctx.beginPath();
        ctx.moveTo(W, oy);
        ctx.lineTo(ir, innerY);
        ctx.strokeStyle = rgba(AMBER, alpha);
        ctx.lineWidth = 0.3 + pulse * 0.3;
        ctx.stroke();
      }

      /* ── Depth rings — concentric rectangles between frame & image ── */
      for (let i = 1; i <= RING_COUNT; i++) {
        const frac = i / (RING_COUNT + 1);
        const rx = frac * ix;
        const ry = frac * iy;
        const rw = W - 2 * rx;
        const rh = H - 2 * ry;
        const rr = 4 + frac * 8;

        const pulse = Math.sin(t * 0.4 + i * 0.8) * 0.5 + 0.5;
        const alpha = 0.02 + pulse * 0.05;

        ctx.beginPath();
        ctx.roundRect(rx, ry, rw, rh, rr);
        ctx.strokeStyle = rgba(AMBER_DIM, alpha);
        ctx.lineWidth = 0.3 + pulse * 0.3;
        ctx.stroke();
      }

      /* ── Corner accent: subtle diagonal lines at corners ── */
      const cornerAlpha = 0.06 + Math.sin(t * 0.5) * 0.04;
      ctx.strokeStyle = rgba(AMBER, cornerAlpha);
      ctx.lineWidth = 0.6;

      ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(ix, iy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W, 0); ctx.lineTo(ir, iy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, H); ctx.lineTo(ix, ib); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(W, H); ctx.lineTo(ir, ib); ctx.stroke();

      /* ── Traveling light dots along corner diagonals ── */
      const dotT = (t * 0.7) % 1;
      const dotAlpha = 0.2 + Math.sin(dotT * Math.PI) * 0.2;
      const dotR = 1.2 + Math.sin(dotT * Math.PI) * 0.8;

      ctx.fillStyle = rgba(AMBER, dotAlpha);

      ctx.beginPath();
      ctx.arc(dotT * ix, dotT * iy, dotR, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(W - dotT * (W - ir), dotT * iy, dotR, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(dotT * ix, H - dotT * (H - ib), dotR, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(W - dotT * (W - ir), H - dotT * (H - ib), dotR, 0, Math.PI * 2);
      ctx.fill();

      animRef.current = requestAnimationFrame(frame);
    }

    // Pause when off-screen, resume when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animRef.current = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(animRef.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    animRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className || ""}`}
      style={{ pointerEvents: "none" }}
    />
  );
}
