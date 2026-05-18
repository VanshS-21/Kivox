"use client";

import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

interface ConstellationCanvasProps {
  className?: string;
  variant?: "light" | "dark";
}

const palettes = {
  dark: {
    nodeNeutral: (a: number) => `oklch(0.85 0.008 65 / ${a})`,
    nodeAmber: (a: number) => `oklch(0.72 0.18 78 / ${a})`,
    nodeGlow: (a: number) => `oklch(0.72 0.18 78 / ${a})`,
    edgeNeutral: (a: number) => `oklch(0.85 0.008 65 / ${a})`,
    edgeAmber: (a: number) => `oklch(0.72 0.18 78 / ${a})`,
    neutralAlpha: (glow: number) => 0.26 + glow * 0.18,
    amberAlpha: (glow: number) => 0.52 + glow * 0.28,
    edgeNeutralMul: 0.08,
    edgeAmberMul: 0.24,
    edgeWidthNeutral: 0.5,
    edgeWidthAmber: 0.85,
    glowMul: 0.12,
  },
  light: {
    nodeNeutral: (a: number) => `oklch(0.42 0.035 65 / ${a})`,
    nodeAmber: (a: number) => `oklch(0.56 0.20 78 / ${a})`,
    nodeGlow: (a: number) => `oklch(0.63 0.19 78 / ${a})`,
    edgeNeutral: (a: number) => `oklch(0.44 0.032 65 / ${a})`,
    edgeAmber: (a: number) => `oklch(0.56 0.20 78 / ${a})`,
    neutralAlpha: (glow: number) => 0.2 + glow * 0.14,
    amberAlpha: (glow: number) => 0.58 + glow * 0.2,
    edgeNeutralMul: 0.08,
    edgeAmberMul: 0.23,
    edgeWidthNeutral: 0.55,
    edgeWidthAmber: 0.85,
    glowMul: 0.05,
  },
} as const;

type Palette = (typeof palettes)[keyof typeof palettes];

const NODE_DRIFT_SPEED = 0.46;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

class Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  amber: boolean;
  pulse: number;
  pulseSpeed: number;

  constructor(id: number, w: number, h: number, init: boolean) {
    this.id = id;
    this.x = Math.random() * w;
    this.y = init ? Math.random() * h : Math.random() < 0.5 ? -5 : h + 5;
    this.vx = (Math.random() - 0.5) * NODE_DRIFT_SPEED;
    this.vy = (Math.random() - 0.5) * NODE_DRIFT_SPEED;
    this.r = Math.random() * 1.8 + 0.6;
    this.amber = Math.random() < 0.22;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.008 + Math.random() * 0.012;
  }

  reset(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() < 0.5 ? -5 : h + 5;
    this.vx = (Math.random() - 0.5) * NODE_DRIFT_SPEED;
    this.vy = (Math.random() - 0.5) * NODE_DRIFT_SPEED;
    this.r = Math.random() * 1.8 + 0.6;
    this.amber = Math.random() < 0.22;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.008 + Math.random() * 0.012;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.pulse += this.pulseSpeed;

    if (this.x < -20 || this.x > w + 20 || this.y < -20 || this.y > h + 20) {
      this.reset(w, h);
    }
  }

  draw(ctx: CanvasRenderingContext2D, p: Palette) {
    const glow = Math.sin(this.pulse) * 0.5 + 0.5;
    const alpha = this.amber ? p.amberAlpha(glow) : p.neutralAlpha(glow);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * (1 + glow * 0.35), 0, Math.PI * 2);
    ctx.fillStyle = this.amber ? p.nodeAmber(alpha) : p.nodeNeutral(alpha);
    ctx.fill();

    if (this.amber && glow > 0.68) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = p.nodeGlow((glow - 0.68) * p.glowMul);
      ctx.fill();
    }
  }
}

function drawEdges(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  maxDistSq: number,
  maxDist: number,
  p: Palette,
) {
  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];

    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distanceSq = dx * dx + dy * dy;

      if (distanceSq >= maxDistSq) continue;

      const t = 1 - Math.sqrt(distanceSq) / maxDist;
      const isAmber = a.amber || b.amber;
      const alpha = isAmber ? t * t * p.edgeAmberMul : t * t * p.edgeNeutralMul;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineWidth = isAmber ? p.edgeWidthAmber : p.edgeWidthNeutral;
      ctx.strokeStyle = isAmber ? p.edgeAmber(alpha) : p.edgeNeutral(alpha);
      ctx.stroke();
    }
  }
}

function getNodeCount(width: number, height: number): number {
  const areaCount = Math.round((width * height) / 8600);

  if (width < 640) return clamp(areaCount, 54, 66);
  if (width < 1024) return clamp(areaCount, 78, 98);
  if (width < 1440) return clamp(areaCount, 110, 128);

  return clamp(areaCount, 126, 148);
}

export function ConstellationCanvas({
  className,
  variant = "dark",
}: ConstellationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const reduce = useReducedMotion();
  const palette = palettes[variant];

  const initNodes = useCallback((w: number, h: number) => {
    const nodes: Node[] = [];

    for (let i = 0; i < getNodeCount(w, h); i++) {
      nodes.push(new Node(i, w, h, true));
    }

    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const canvasEl = canvas;
    const context = ctx;

    let isVisible = true;
    let resizeFrame = 0;
    let lastFrame = 0;

    function resize() {
      const parent = canvasEl.parentElement;
      if (!parent) return;

      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      if (width === 0 || height === 0) return;

      const sizeChanged =
        canvasEl.width !== width || canvasEl.height !== height;
      if (sizeChanged) {
        canvasEl.width = width;
        canvasEl.height = height;
        initNodes(width, height);
      } else if (nodesRef.current.length === 0) {
        initNodes(width, height);
      }
    }

    function scheduleResize() {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resize);
    }

    resize();
    window.addEventListener("resize", scheduleResize);

    const parent = canvasEl.parentElement;
    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(scheduleResize);

    if (parent && resizeObserver) {
      resizeObserver.observe(parent);
    }

    const themeObserver = new MutationObserver(scheduleResize);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const maxDist = 130;
    const maxDistSq = maxDist * maxDist;
    const frameInterval = 1000 / 40;

    function frame(now: number) {
      if (!isVisible) return;

      if (now - lastFrame < frameInterval) {
        animationRef.current = requestAnimationFrame(frame);
        return;
      }

      lastFrame = now;

      const w = canvasEl.width;
      const h = canvasEl.height;

      if (w === 0 || h === 0) {
        scheduleResize();
        animationRef.current = requestAnimationFrame(frame);
        return;
      }

      context.clearRect(0, 0, w, h);
      drawEdges(context, nodesRef.current, maxDistSq, maxDist, palette);
      nodesRef.current.forEach((node) => {
        node.update(w, h);
        node.draw(context, palette);
      });

      animationRef.current = requestAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animationRef.current = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0 },
    );

    observer.observe(canvasEl);
    animationRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", scheduleResize);
      resizeObserver?.disconnect();
      themeObserver.disconnect();
      observer.disconnect();
    };
  }, [reduce, initNodes, palette]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-none ${className || ""}`}
    />
  );
}
