"use client";

import { useRef, useEffect, useCallback } from "react";
import { useReducedMotion } from "motion/react";

/* ═══════════════════════════════════════════════════════════════════════════
   Constellation Canvas — Hero Background (Overdrive: Cursor-Magnetic)
   
   Floating nodes connected by proximity edges with subtle amber-tinted
   polygon fills. Nodes respond to cursor proximity with spring physics:
   amber nodes drift toward the cursor, neutral nodes scatter gently.
   ═══════════════════════════════════════════════════════════════════════════ */

interface ConstellationCanvasProps {
  className?: string;
  /** Color palette variant */
  variant?: "light" | "dark";
}

/** Color config per theme variant */
const palettes = {
  dark: {
    nodeNeutral: (a: number) => `rgba(180,165,140,${a})`,
    nodeAmber: (a: number) => `rgba(224,123,32,${a})`,
    nodeGlow: (a: number) => `rgba(224,123,32,${a})`,
    edgeNeutral: (a: number) => `rgba(140,125,100,${a})`,
    edgeAmber: (a: number) => `rgba(200,100,20,${a})`,
    poly: (a: number) => `rgba(180,90,10,${a})`,
    neutralAlpha: (glow: number) => 0.3 + glow * 0.25,
    amberAlpha: (glow: number) => 0.6 + glow * 0.4,
    edgeNeutralMul: 0.10,
    edgeAmberMul: 0.32,
    edgeWidthNeutral: 0.5,
    edgeWidthAmber: 0.9,
    polyMul: 0.04,
    glowMul: 0.18,
    cursorGlow: (a: number) => `rgba(224,123,32,${a})`,
  },
  light: {
    nodeNeutral: (a: number) => `rgba(100,80,50,${a})`,
    nodeAmber: (a: number) => `rgba(200,120,30,${a})`,
    nodeGlow: (a: number) => `rgba(200,120,30,${a})`,
    edgeNeutral: (a: number) => `rgba(100,80,50,${a})`,
    edgeAmber: (a: number) => `rgba(180,100,20,${a})`,
    poly: (a: number) => `rgba(160,100,30,${a})`,
    neutralAlpha: (glow: number) => 0.2 + glow * 0.15,
    amberAlpha: (glow: number) => 0.4 + glow * 0.35,
    edgeNeutralMul: 0.06,
    edgeAmberMul: 0.18,
    edgeWidthNeutral: 0.4,
    edgeWidthAmber: 0.7,
    polyMul: 0.025,
    glowMul: 0.12,
    cursorGlow: (a: number) => `rgba(200,120,30,${a})`,
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
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CURSOR_RADIUS && dist > 0.1) {
        const t = 1 - dist / CURSOR_RADIUS; // 0..1, stronger when closer
        const nx = dx / dist; // normalized direction
        const ny = dy / dist;

        if (this.amber) {
          // Amber nodes: attracted toward cursor
          this.cvx += nx * t * t * ATTRACT_STRENGTH * 60;
          this.cvy += ny * t * t * ATTRACT_STRENGTH * 60;
        } else {
          // Neutral nodes: gently repelled from cursor
          this.cvx -= nx * t * REPEL_STRENGTH * 60;
          this.cvy -= ny * t * REPEL_STRENGTH * 60;
        }

        this.cursorProximity = t;
      } else {
        this.cursorProximity *= 0.92; // fade out smoothly
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

function drawEdges(ctx: CanvasRenderingContext2D, nodes: Node[], maxDist: number, p: Palette) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < maxDist) {
        const t = 1 - d / maxDist;
        const isAmber = nodes[i].amber || nodes[j].amber;
        // Boost edge visibility near cursor
        const proxBoost = 1 + (nodes[i].cursorProximity + nodes[j].cursorProximity) * 0.3;
        const alpha = isAmber
          ? t * t * p.edgeAmberMul * proxBoost
          : t * t * p.edgeNeutralMul * proxBoost;
        const color = isAmber ? p.edgeAmber(alpha) : p.edgeNeutral(alpha);
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = color;
        ctx.lineWidth = isAmber ? p.edgeWidthAmber : p.edgeWidthNeutral;
        ctx.stroke();
      }
    }
  }
}

function drawPolygons(ctx: CanvasRenderingContext2D, nodes: Node[], p: Palette) {
  for (let i = 0; i < nodes.length; i++) {
    const nearby: Node[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      if (Math.sqrt(dx * dx + dy * dy) < 90) nearby.push(nodes[j]);
    }
    if (nearby.length >= 2) {
      const a = nearby[0];
      const b = nearby[1];
      const dx1 = nodes[i].x - a.x;
      const dy1 = nodes[i].y - a.y;
      const dx2 = nodes[i].x - b.x;
      const dy2 = nodes[i].y - b.y;
      const d1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      const d2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      if (d1 < 80 && d2 < 80) {
        // Polygon alpha boosted by cursor proximity
        const proxBoost = 1 + (nodes[i].cursorProximity + a.cursorProximity + b.cursorProximity) * 0.25;
        const alpha = (1 - d1 / 90) * (1 - d2 / 90) * p.polyMul * proxBoost;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.closePath();
        ctx.fillStyle = p.poly(alpha);
        ctx.fill();
      }
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

export function ConstellationCanvas({ className, variant = "dark" }: ConstellationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const cursorRef = useRef<CursorState>({ x: 0, y: 0, active: false });
  const reduce = useReducedMotion();
  const palette = palettes[variant];

  const initNodes = useCallback((w: number, h: number) => {
    const count = 110;
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
    const p = palette;

    function frame() {
      if (!ctx || !canvas || !isVisible) return;
      const w = canvas.width;
      const h = canvas.height;
      const cursor = cursorRef.current;

      ctx.clearRect(0, 0, w, h);

      // Cursor aura glow
      drawCursorAura(ctx, cursor, p);

      drawPolygons(ctx, nodesRef.current, p);
      drawEdges(ctx, nodesRef.current, MAX_DIST, p);
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
