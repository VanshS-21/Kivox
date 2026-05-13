"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useReducedMotion } from "motion/react";

/* ═══════════════════════════════════════════════════════════════════════════
   Emergent Precision — Generative Art Canvas
   
   A five-phase generative system where ordered geometric structures emerge
   from flowing noise fields, mirroring Kivox's methodology:
     1. Discover  — scattered, exploratory noise field
     2. Define    — particles converge toward grid alignment
     3. Design    — golden-ratio spirals emerge from noise
     4. Build     — geometric crystallization, clean lines form
     5. Evolve    — organic breathing, dynamic equilibrium
   
   Uses raw Canvas 2D API. No external dependencies.
   Colors pulled from CSS custom properties.
   ═══════════════════════════════════════════════════════════════════════════ */

interface GenerativeCanvasProps {
  /** Currently hovered process step index (0-4), or -1 for none */
  activePhase?: number;
  className?: string;
}

// Seeded PRNG (Mulberry32)
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Simplex-like 2D noise (value noise with smooth interpolation)
function createNoise(seed: number) {
  const rng = mulberry32(seed);
  const GRID = 256;
  const perm = Array.from({ length: GRID * 2 }, () => Math.floor(rng() * GRID));
  const grad = Array.from({ length: GRID * 2 }, () => rng() * 2 - 1);

  function fade(t: number) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(a: number, b: number, t: number) {
    return a + t * (b - a);
  }

  return function noise2D(x: number, y: number): number {
    const xi = Math.floor(x) & (GRID - 1);
    const yi = Math.floor(y) & (GRID - 1);
    const xf = x - Math.floor(x);
    const yf = y - Math.floor(y);

    const u = fade(xf);
    const v = fade(yf);

    const aa = perm[(perm[xi] + yi) & (GRID * 2 - 1)];
    const ab = perm[(perm[xi] + yi + 1) & (GRID * 2 - 1)];
    const ba = perm[(perm[(xi + 1) & (GRID - 1)] + yi) & (GRID * 2 - 1)];
    const bb = perm[(perm[(xi + 1) & (GRID - 1)] + yi + 1) & (GRID * 2 - 1)];

    const g1 = grad[aa];
    const g2 = grad[ba];
    const g3 = grad[ab];
    const g4 = grad[bb];

    return lerp(lerp(g1, g2, u), lerp(g3, g4, u), v);
  };
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
  trail: { x: number; y: number }[];
}

function getComputedColor(property: string): string {
  if (typeof window === "undefined") return "#ff9500";
  const style = getComputedStyle(document.documentElement);
  const value = style.getPropertyValue(property).trim();
  return value || "#ff9500";
}

function oklchToRgb(oklchStr: string): { r: number; g: number; b: number; a: number } {
  // Parse oklch values and convert to approximate RGB
  // This is a simplified conversion for the canvas
  const match = oklchStr.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/);
  if (!match) return { r: 255, g: 149, b: 0, a: 1 };

  const L = parseFloat(match[1]);
  const C = parseFloat(match[2]);
  const H = parseFloat(match[3]);
  const A = match[4] ? parseFloat(match[4]) : 1;

  // Simplified OKLCH → sRGB (approximate)
  const hRad = (H * Math.PI) / 180;
  const a_comp = C * Math.cos(hRad);
  const b_comp = C * Math.sin(hRad);

  // OKLCH → OKLab → linear sRGB (approximate matrix)
  const l_ = L + 0.3963377774 * a_comp + 0.2158037573 * b_comp;
  const m_ = L - 0.1055613458 * a_comp - 0.0638541728 * b_comp;
  const s_ = L - 0.0894841775 * a_comp - 1.2914855480 * b_comp;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  let r = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  let g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  let b = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;

  // Clamp and gamma correct
  const gammaCorrect = (c: number) => {
    c = Math.max(0, Math.min(1, c));
    return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  };

  return {
    r: Math.round(gammaCorrect(r) * 255),
    g: Math.round(gammaCorrect(g) * 255),
    b: Math.round(gammaCorrect(b) * 255),
    a: A,
  };
}

export function GenerativeCanvas({ activePhase = -1, className }: GenerativeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1, y: -1 });
  const phaseRef = useRef(activePhase);
  const frameRef = useRef(0);
  const noiseRef = useRef<ReturnType<typeof createNoise> | null>(null);
  const colorsRef = useRef({ accent: { r: 255, g: 149, b: 0, a: 1 }, rose: { r: 180, g: 80, b: 60, a: 1 }, fg: { r: 30, g: 30, b: 25, a: 1 } });
  const [isVisible, setIsVisible] = useState(false);
  const reduce = useReducedMotion();

  // Update phase ref when prop changes
  useEffect(() => {
    phaseRef.current = activePhase;
  }, [activePhase]);

  // Brand-aligned colors — approximate RGB of the OKLCH accent tokens
  // --accent: oklch(0.72 0.18 65) ≈ rgb(255, 149, 0)
  // --accent-rose: oklch(0.58 0.16 15) ≈ rgb(185, 75, 65)
  useEffect(() => {
    colorsRef.current = {
      accent: { r: 255, g: 149, b: 0, a: 1 },
      rose: { r: 185, g: 75, b: 65, a: 1 },
      fg: { r: 18, g: 16, b: 14, a: 1 },
    };
  }, []);

  // Intersection observer for visibility
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mouseRef.current = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1, y: -1 };
  }, []);

  // Initialize particles
  const initParticles = useCallback((w: number, h: number) => {
    const rng = mulberry32(42);
    const count = 180;
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: rng() * w,
        y: rng() * h,
        vx: 0,
        vy: 0,
        life: Math.floor(rng() * 300),
        maxLife: 300 + Math.floor(rng() * 200),
        hue: rng(),
        size: 1 + rng() * 2,
        trail: [],
      });
    }

    particlesRef.current = particles;
  }, []);

  // Main animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Set canvas dimensions
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;

    noiseRef.current = createNoise(42);
    initParticles(w, h);

    // Event listeners
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const PHI = (1 + Math.sqrt(5)) / 2; // Golden ratio

    function getPhaseInfluence(phase: number, frame: number) {
      const t = frame * 0.001;
      const base = {
        noiseScale: 0.003,
        noiseStrength: 1.0,
        gridPull: 0.0,
        spiralPull: 0.0,
        crystallize: 0.0,
        breathe: 0.0,
        speed: 0.6,
        trailLen: 12,
      };

      switch (phase) {
        case 0: // Discover — exploratory chaos
          return {
            ...base,
            noiseScale: 0.004 + Math.sin(t) * 0.001,
            noiseStrength: 1.5,
            speed: 0.8,
            trailLen: 8,
          };
        case 1: // Define — convergence to grid
          return {
            ...base,
            noiseScale: 0.003,
            noiseStrength: 0.8,
            gridPull: 0.3 + Math.sin(t * 0.5) * 0.1,
            speed: 0.5,
            trailLen: 14,
          };
        case 2: // Design — golden spirals
          return {
            ...base,
            noiseScale: 0.002,
            noiseStrength: 0.5,
            spiralPull: 0.4,
            speed: 0.4,
            trailLen: 18,
          };
        case 3: // Build — crystallization
          return {
            ...base,
            noiseScale: 0.002,
            noiseStrength: 0.3,
            crystallize: 0.5 + Math.sin(t * 0.3) * 0.15,
            speed: 0.35,
            trailLen: 20,
          };
        case 4: // Evolve — breathing equilibrium
          return {
            ...base,
            noiseScale: 0.003 + Math.sin(t * 0.7) * 0.001,
            noiseStrength: 0.7,
            breathe: 0.4,
            speed: 0.45,
            trailLen: 16,
          };
        default: // No active phase — ambient drift
          return {
            ...base,
            noiseScale: 0.003,
            noiseStrength: 0.9,
            speed: 0.5,
            trailLen: 12,
          };
      }
    }

    function animate() {
      if (!ctx || !noiseRef.current) return;

      const frame = frameRef.current++;
      const noise = noiseRef.current;
      const phase = phaseRef.current;
      const params = getPhaseInfluence(phase, frame);
      const mouse = mouseRef.current;
      const colors = colorsRef.current;
      const t = frame * 0.002;

      // Fade background — dark base for trail visibility
      ctx.fillStyle = "rgba(18, 16, 14, 0.02)";
      ctx.fillRect(0, 0, w, h);

      // Update and draw particles
      for (const p of particlesRef.current) {
        // Store trail
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > params.trailLen) p.trail.shift();

        // Base noise force
        const nx = p.x * params.noiseScale;
        const ny = p.y * params.noiseScale;
        const angle = noise(nx + t * 0.3, ny + t * 0.2) * Math.PI * 4;
        let fx = Math.cos(angle) * params.noiseStrength;
        let fy = Math.sin(angle) * params.noiseStrength;

        // Grid pull (Define phase)
        if (params.gridPull > 0) {
          const gridSize = 40;
          const nearestX = Math.round(p.x / gridSize) * gridSize;
          const nearestY = Math.round(p.y / gridSize) * gridSize;
          fx += (nearestX - p.x) * params.gridPull * 0.02;
          fy += (nearestY - p.y) * params.gridPull * 0.02;
        }

        // Spiral pull (Design phase)
        if (params.spiralPull > 0) {
          const cx = w / 2;
          const cy = h / 2;
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const spiralAngle = Math.atan2(dy, dx) + (PHI * Math.PI * 2) / (dist * 0.01 + 1);
          fx += Math.cos(spiralAngle) * params.spiralPull * 0.5;
          fy += Math.sin(spiralAngle) * params.spiralPull * 0.5;
        }

        // Crystallize (Build phase)
        if (params.crystallize > 0) {
          const hexSize = 60;
          const col = Math.round(p.x / (hexSize * 1.5));
          const row = Math.round(p.y / (hexSize * Math.sqrt(3)));
          const targetX = col * hexSize * 1.5;
          const targetY = row * hexSize * Math.sqrt(3) + (col % 2) * hexSize * Math.sqrt(3) * 0.5;
          fx += (targetX - p.x) * params.crystallize * 0.015;
          fy += (targetY - p.y) * params.crystallize * 0.015;
        }

        // Breathe (Evolve phase)
        if (params.breathe > 0) {
          const cx = w / 2;
          const cy = h / 2;
          const dx = p.x - cx;
          const dy = p.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const breathForce = Math.sin(t * 2 + dist * 0.005) * params.breathe;
          fx += (dx / (dist + 1)) * breathForce * 0.3;
          fy += (dy / (dist + 1)) * breathForce * 0.3;
        }

        // Mouse influence
        if (mouse.x > 0 && mouse.y > 0) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (1 - dist / 120) * 2;
            fx += (dx / (dist + 1)) * force;
            fy += (dy / (dist + 1)) * force;
          }
        }

        // Apply forces
        p.vx = p.vx * 0.92 + fx * params.speed * 0.08;
        p.vy = p.vy * 0.92 + fy * params.speed * 0.08;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        // Age particle
        p.life++;
        if (p.life > p.maxLife) {
          p.life = 0;
          p.trail = [];
        }

        // Draw trail
        const lifeRatio = p.life / p.maxLife;
        const alpha = Math.sin(lifeRatio * Math.PI) * 0.6;

        if (p.trail.length > 2 && alpha > 0.01) {
          ctx.beginPath();
          ctx.moveTo(p.trail[0].x, p.trail[0].y);

          for (let i = 1; i < p.trail.length - 1; i++) {
            const xc = (p.trail[i].x + p.trail[i + 1].x) / 2;
            const yc = (p.trail[i].y + p.trail[i + 1].y) / 2;
            ctx.quadraticCurveTo(p.trail[i].x, p.trail[i].y, xc, yc);
          }

          // Color blend between accent and rose based on hue
          const cr = colors.accent.r + (colors.rose.r - colors.accent.r) * p.hue;
          const cg = colors.accent.g + (colors.rose.g - colors.accent.g) * p.hue;
          const cb = colors.accent.b + (colors.rose.b - colors.accent.b) * p.hue;

          ctx.strokeStyle = `rgba(${Math.round(cr)}, ${Math.round(cg)}, ${Math.round(cb)}, ${alpha})`;
          ctx.lineWidth = p.size * (1 - lifeRatio * 0.5);
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Draw particle head
        if (alpha > 0.1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
          const cr = colors.accent.r + (colors.rose.r - colors.accent.r) * p.hue;
          const cg = colors.accent.g + (colors.rose.g - colors.accent.g) * p.hue;
          const cb = colors.accent.b + (colors.rose.b - colors.accent.b) * p.hue;
          ctx.fillStyle = `rgba(${Math.round(cr)}, ${Math.round(cg)}, ${Math.round(cb)}, ${alpha * 0.8})`;
          ctx.fill();
        }
      }

      // Subtle geometric overlay based on phase
      if (phase >= 0) {
        ctx.save();
        ctx.globalAlpha = 0.04;
        ctx.strokeStyle = `rgba(${colors.accent.r}, ${colors.accent.g}, ${colors.accent.b}, 1)`;
        ctx.lineWidth = 0.5;

        if (phase === 2) {
          // Golden spiral guides
          const cx = w / 2;
          const cy = h / 2;
          ctx.beginPath();
          for (let a = 0; a < Math.PI * 8; a += 0.02) {
            const r = 3 * Math.pow(PHI, (a * 2) / Math.PI);
            if (r > Math.max(w, h)) break;
            const sx = cx + r * Math.cos(a + t * 0.2);
            const sy = cy + r * Math.sin(a + t * 0.2);
            if (a === 0) ctx.moveTo(sx, sy);
            else ctx.lineTo(sx, sy);
          }
          ctx.stroke();
        } else if (phase === 3) {
          // Hex grid guides
          const hexSize = 60;
          for (let col = 0; col < w / (hexSize * 1.5) + 1; col++) {
            for (let row = 0; row < h / (hexSize * Math.sqrt(3)) + 1; row++) {
              const cx2 = col * hexSize * 1.5;
              const cy2 = row * hexSize * Math.sqrt(3) + (col % 2) * hexSize * Math.sqrt(3) * 0.5;
              ctx.beginPath();
              ctx.arc(cx2, cy2, 2, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        }

        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    // Clear with dark background — particles need dark canvas to be visible
    ctx.fillStyle = "rgb(18, 16, 14)";
    ctx.fillRect(0, 0, w, h);

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [reduce, isVisible, initParticles, handleMouseMove, handleMouseLeave]);

  // For reduced motion: show a static frame
  if (reduce) {
    return (
      <div className={className}>
        <div className="w-full h-full bg-elevated rounded-[20px] border border-border overflow-hidden relative">
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 40% 40%, var(--accent), transparent 70%)",
              opacity: 0.08,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[6rem] font-bold font-mono leading-none select-none studio-tabular"
              style={{ color: "var(--accent)", opacity: 0.06 }}
            >
              05
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full rounded-[20px] border border-border overflow-hidden ${className || ""}`}
      style={{ aspectRatio: "16/10" }}
    />
  );
}
