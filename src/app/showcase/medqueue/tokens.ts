/* ── MedQueue Showcase Design Tokens ── */
/* Cold-clinical palette. Neutrals tinted toward blue (hue 240). */
/* Accent: hospital-blue from Kivox DESIGN.md */

export const c = {
  bg:       "oklch(0.97 0.005 240)",
  surface:  "oklch(0.993 0.003 240)",
  ink:      "oklch(0.15 0.008 240)",
  muted:    "oklch(0.45 0.008 240)",
  subtle:   "oklch(0.88 0.012 240)",
  accent:   "oklch(0.55 0.17 240)",
  accentLt: "oklch(0.93 0.035 240)",
  accentDk: "oklch(0.40 0.14 240)",
  trust:    "oklch(0.55 0.12 175)",
  trustLt:  "oklch(0.94 0.025 175)",
  hero:     "oklch(0.18 0.04 240)",
  heroMuted:"oklch(0.55 0.02 240)",
  heroFg:   "oklch(0.95 0.005 240)",
} as const;

export const font = {
  display: "'Bricolage Grotesque', system-ui, sans-serif",
  body:    "'Figtree', system-ui, sans-serif",
  serif:   "'Spectral', Georgia, 'Times New Roman', serif",
  mono:    "'Geist Mono', 'SF Mono', 'Roboto Mono', monospace",
} as const;
