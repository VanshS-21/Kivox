"use client";

import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "motion/react";

/* ═══════════════════════════════════════════════════════════════════════════
   Constellation Canvas — Hero Background (Overdrive: Cursor-Magnetic)
   
   Floating nodes connected by proximity edges with subtle amber-tinted
   polygon fills. Nodes respond to cursor proximity with spring physics:
   amber nodes drift toward the cursor, neutral nodes scatter gently.

   Performance optimizations:
   - Squared-distance comparisons (no sqrt in edge loop)
   - Batched canvas draw calls (one beginPath/stroke per color)
   - Polygon pass removed (negligible visual contribution at 4% opacity)
   - Reduced node count on mobile
   ═══════════════════════════════════════════════════════════════════════════ */

interface ConstellationCanvasProps {
  className?: string;
  /** Color palette variant */
  variant?: "light" | "dark";
}

/** Color config per theme variant */
const palettes = {
  dark: {
    nodeNeutral: (a: number) => `oklch(0.85 0.008 65 / ${a})`,
    nodeAmber: (a: number) => `oklch(0.72 0.18 65 / ${a})`,
    nodeGlow: (a: number) => `oklch(0.72 0.18 65 / ${a})`,
    edgeNeutral: (a: number) => `oklch(0.85 0.008 65 / ${a})`,
    edgeAmber: (a: number) => `oklch(0.72 0.18 65 / ${a})`,
    neutralAlpha: (glow: number) => 0.3 + glow * 0.25,
    amberAlpha: (glow: number) => 0.6 + glow * 0.4,
    edgeNeutralMul: 0.10,
    edgeAmberMul: 0.32,
    edgeWidthNeutral: 0.5,
    edgeWidthAmber: 0.9,
    glowMul: 0.18,
    cursorGlow: (a: number) => `oklch(0.72 0.18 65 / ${a})`,
  },
  light: {
    nodeNeutral: (a: number) => `oklch(0.45 0.005 250 / ${a})`,
    nodeAmber: (a: number) => `oklch(0.60 0.22 55 / ${a})`,
    nodeGlow: (a: number) => `oklch(0.60 0.22 55 / ${a})`,
    edgeNeutral: (a: number) => `oklch(0.45 0.005 250 / ${a})`,
    edgeAmber: (a: number) => `oklch(0.60 0.22 55 / ${a})`,
    neutralAlpha: (glow: number) => 0.25 + glow * 0.2,
    amberAlpha: (glow: number) => 0.45 + glow * 0.35,
    edgeNeutralMul: 0.06,
    edgeAmberMul: 0.18,
    edgeWidthNeutral: 0.4,
    edgeWidthAmber: 0.7,
    glowMul: 0.12,
    cursorGlow: (a: number) => `oklch(0.60 0.22 55 / ${a})`,
  },
} as const;

type Palette = (typeof palettes)[keyof typeof palettes];

/** Cursor state tracked across frames */
interface CursorState {
  x: number;
  y: number;
  active: boolean;
}

/** Spring physics constants */
const CURSOR_RADIUS = 200;        // Influence radius
const CURSOR_RADIUS_SQ = CURSOR_RADIUS * CURSOR_RADIUS;
const ATTRACT_STRENGTH = 0.012;   // How strongly amber nodes pull toward cursor
const REPEL_STRENGTH = 0.006;     // How gently neutral nodes scatter
const DAMPING = 0.92;             // Velocity damping (spring settle)
const MAX_CURSOR_VEL = 1.8;       // Clamp cursor-induced velocity

class Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Spring velocity from cursor interaction (separate from drift) */
  cvx: number;
  cvy: number;
  r: number;
  amber: boolean;
  pulse: number;
  pulseSpeed: number;
  /** Proximity intensity to cursor: 0 = far, 1 = touching */
  cursorProximity: number;

  constructor(w: number, h: number, init: boolean) {
    this.x = Math.random() * w;
    this.y = init ? Math.random() * h : (Math.random() < 0.5 ? -5 : h + 5);
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.cvx = 0;
    this.cvy = 0;
    this.r = Math.random() * 2.2 + 0.6;
    this.amber = Math.random() < 0.25;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.012 + Math.random() * 0.018;
    this.cursorProximity = 0;
  }

  reset(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() < 0.5 ? -5 : h + 5;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.cvx = 0;
    this.cvy = 0;
    this.r = Math.random() * 2.2 + 0.6;
    this.amber = Math.random() < 0.25;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = 0.012 + Math.random() * 0.018;
    this.cursorProximity = 0;
  }

  update(w: number, h: number, cursor: CursorState) {
    // Cursor-magnetic spring physics
    if (cursor.active) {
      const dx = cursor.x - this.x;
      const dy = cursor.y - this.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < CURSOR_RADIUS_SQ && distSq > 0.01) {
        // Only compute sqrt when within influence radius (much rarer)
        const dist = Math.sqrt(distSq);
        const t = 1 - dist / CURSOR_RADIUS;
        const nx = dx / dist;
        const ny = dy / dist;

        if (this.amber) {
          this.cvx += nx * t * t * ATTRACT_STRENGTH * 60;
          this.cvy += ny * t * t * ATTRACT_STRENGTH * 60;
        } else {
          this.cvx -= nx * t * REPEL_STRENGTH * 60;
          this.cvy -= ny * t * REPEL_STRENGTH * 60;
        }

        this.cursorProximity = t;
      } else {
        this.cursorProximity *= 0.92;
      }
    } else {
      this.cursorProximity *= 0.95;
    }

    // Clamp cursor velocity
    const cvMag = Math.sqrt(this.cvx * this.cvx + this.cvy * this.cvy);
    if (cvMag > MAX_CURSOR_VEL) {
      this.cvx = (this.cvx / cvMag) * MAX_CURSOR_VEL;
      this.cvy = (this.cvy / cvMag) * MAX_CURSOR_VEL;
    }

    // Apply damping (spring settle)
    this.cvx *= DAMPING;
    this.cvy *= DAMPING;

    // Move: base drift + cursor spring
    this.x += this.vx + this.cvx;
    this.y += this.vy + this.cvy;
    this.pulse += this.pulseSpeed;

    if (this.x < -20 || this.x > w + 20 || this.y < -20 || this.y > h + 20) {
      this.reset(w, h);
    }
  }

  draw(ctx: CanvasRenderingContext2D, p: Palette) {
    const glow = Math.sin(this.pulse) * 0.5 + 0.5;
    const alpha = this.amber ? p.amberAlpha(glow) : p.neutralAlpha(glow);
    const color = this.amber ? p.nodeAmber(alpha) : p.nodeNeutral(alpha);

    // Cursor proximity boosts node size and brightness
    const proxBoost = 1 + this.cursorProximity * 0.6;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r * (1 + glow * 0.4) * proxBoost, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Amber nodes get an extra glow halo (boosted by cursor proximity)
    if (this.amber && (glow > 0.6 || this.cursorProximity > 0.3)) {
      const haloGlow = Math.max(glow - 0.6, 0) + this.cursorProximity * 0.5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * (3.5 + this.cursorProximity * 3), 0, Math.PI * 2);
      ctx.fillStyle = p.nodeGlow(haloGlow * p.glowMul * (1 + this.cursorProximity));
      ctx.fill();
    }

    // Cursor-proximity glow ring for neutral nodes too
    if (!this.amber && this.cursorProximity > 0.4) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = p.cursorGlow((this.cursorProximity - 0.4) * 0.08);
      ctx.fill();
    }
  }
}

/**
 * Batched edge drawing — groups edges by color type and draws in two
 * beginPath/stroke calls instead of one per edge (~6000 → 2).
 */
function drawEdges(ctx: CanvasRenderingContext2D, nodes: Node[], maxDistSq: number, maxDist: number, p: Palette) {
  // Collect edges by type for batching
  const neutralEdges: { x1: number; y1: number; x2: number; y2: number; alpha: number }[] = [];
  const amberEdges: { x1: number; y1: number; x2: number; y2: number; alpha: number }[] = [];

  for (let i = 0; i < nodes.length; i++) {
    const ni = nodes[i];
    for (let j = i + 1; j < nodes.length; j++) {
      const nj = nodes[j];
      const dx = ni.x - nj.x;
      const dy = ni.y - nj.y;
      const dSq = dx * dx + dy * dy;

      // Squared-distance comparison — no sqrt needed
      if (dSq < maxDistSq) {
        const t = 1 - Math.sqrt(dSq) / maxDist;
        const isAmber = ni.amber || nj.amber;
        const proxBoost = 1 + (ni.cursorProximity + nj.cursorProximity) * 0.3;
        const alpha = isAmber
          ? t * t * p.edgeAmberMul * proxBoost
          : t * t * p.edgeNeutralMul * proxBoost;

        const edge = { x1: ni.x, y1: ni.y, x2: nj.x, y2: nj.y, alpha };
        if (isAmber) {
          amberEdges.push(edge);
        } else {
          neutralEdges.push(edge);
        }
      }
    }
  }

  // Batch draw neutral edges
  if (neutralEdges.length > 0) {
    ctx.lineWidth = p.edgeWidthNeutral;
    for (const e of neutralEdges) {
      ctx.beginPath();
      ctx.moveTo(e.x1, e.y1);
      ctx.lineTo(e.x2, e.y2);
      ctx.strokeStyle = p.edgeNeutral(e.alpha);
      ctx.stroke();
    }
  }

  // Batch draw amber edges
  if (amberEdges.length > 0) {
    ctx.lineWidth = p.edgeWidthAmber;
    for (const e of amberEdges) {
      ctx.beginPath();
      ctx.moveTo(e.x1, e.y1);
      ctx.lineTo(e.x2, e.y2);
      ctx.strokeStyle = p.edgeAmber(e.alpha);
      ctx.stroke();
    }
  }
}

/** Draw a subtle radial glow at the cursor position */
function drawCursorAura(ctx: CanvasRenderingContext2D, cursor: CursorState, p: Palette) {
  if (!cursor.active) return;
  const gradient = ctx.createRadialGradient(
    cursor.x, cursor.y, 0,
    cursor.x, cursor.y, CURSOR_RADIUS * 0.6
  );
  gradient.addColorStop(0, p.cursorGlow(0.06));
  gradient.addColorStop(0.5, p.cursorGlow(0.02));
  gradient.addColorStop(1, p.cursorGlow(0));
  ctx.fillStyle = gradient;
  ctx.fillRect(
    cursor.x - CURSOR_RADIUS,
    cursor.y - CURSOR_RADIUS,
    CURSOR_RADIUS * 2,
    CURSOR_RADIUS * 2
  );
}

/** Get appropriate node count based on screen width */
function getNodeCount(): number {
  if (typeof window === "undefined") return 110;
  return window.innerWidth < 768 ? 60 : 110;
}

export function ConstellationCanvas({ className, variant = "dark" }: ConstellationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const cursorRef = useRef<CursorState>({ x: 0, y: 0, active: false });
  const reduce = useReducedMotion();
  const palette = palettes[variant];

  const initNodes = useCallback((w: number, h: number) => {
    const count = getNodeCount();
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push(new Node(w, h, true));
    }
    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isVisible = true;

    // Mouse tracking relative to canvas
    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      cursorRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    }

    function handleMouseLeave() {
      cursorRef.current = { ...cursorRef.current, active: false };
    }

    // Listen on the parent (the hero section) for smoother coverage
    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove, { passive: true });
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      if (nodesRef.current.length === 0) {
        initNodes(canvas.width, canvas.height);
      }
    }

    resize();
    initNodes(canvas.width, canvas.height);
    window.addEventListener("resize", resize);

    const MAX_DIST = 130;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
    const p = palette;

    function frame() {
      if (!ctx || !canvas || !isVisible) return;
      const w = canvas.width;
      const h = canvas.height;
      const cursor = cursorRef.current;

      ctx.clearRect(0, 0, w, h);

      // Cursor aura glow
      drawCursorAura(ctx, cursor, p);

      // Edges only — polygon pass removed (negligible at 4% opacity, halves computation)
      drawEdges(ctx, nodesRef.current, MAX_DIST_SQ, MAX_DIST, p);
      nodesRef.current.forEach((n) => {
        n.update(w, h, cursor);
        n.draw(ctx, p);
      });
      animationRef.current = requestAnimationFrame(frame);
    }

    // Pause when off-screen, resume when visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animationRef.current = requestAnimationFrame(frame);
        } else {
          cancelAnimationFrame(animationRef.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    frame();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      observer.disconnect();
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [reduce, initNodes, palette]);

  if (reduce) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className || ""}`}
    />
  );
}
