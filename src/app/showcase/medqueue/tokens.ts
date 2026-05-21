export const mq = {
  color: {
    porcelain: "oklch(0.975 0.009 82)",
    paper: "oklch(0.945 0.018 80)",
    panel: "oklch(0.992 0.006 84)",
    panelWarm: "oklch(0.963 0.02 78)",
    ink: "oklch(0.18 0.018 245)",
    muted: "oklch(0.47 0.025 245)",
    faint: "oklch(0.72 0.025 245)",
    rule: "oklch(0.86 0.01 245)",
    trust: "oklch(0.34 0.11 245)",
    trustSoft: "oklch(0.91 0.042 245)",
    signal: "oklch(0.62 0.105 228)",
    signalSoft: "oklch(0.93 0.032 228)",
    care: "oklch(0.78 0.105 55)",
    careSoft: "oklch(0.94 0.04 58)",
    recovery: "oklch(0.58 0.1 160)",
    recoverySoft: "oklch(0.93 0.035 160)",
    insurance: "oklch(0.61 0.105 300)",
    insuranceSoft: "oklch(0.93 0.035 300)",
    clay: "oklch(0.58 0.12 34)",
    claySoft: "oklch(0.92 0.04 34)",
    white: "oklch(0.998 0.004 84)",
  },
  font: {
    display: "'Bricolage Grotesque', system-ui, sans-serif",
    body: "'Figtree', system-ui, sans-serif",
    serif: "'Spectral', Georgia, 'Times New Roman', serif",
    mono: "'Geist Mono', 'SF Mono', 'Roboto Mono', monospace",
  },
  shadow: {
    soft: "0 18px 60px -42px oklch(0.34 0.11 245 / 0.45)",
    panel: "0 1px 1px oklch(1 0 0 / 0.8), 0 20px 70px -48px oklch(0.34 0.11 245 / 0.38)",
    lift: "0 18px 40px -28px oklch(0.34 0.11 245 / 0.32)",
  },
} as const;

export const routes = {
  home: "/showcase/medqueue",
  search: "/showcase/medqueue/search",
  portal: "/showcase/medqueue/portal",
  doctor: (id: string) => `/showcase/medqueue/doctor/${id}`,
  book: (id: string, slot?: { day: string; time: string }) => {
    const suffix = slot
      ? `?day=${encodeURIComponent(slot.day)}&time=${encodeURIComponent(slot.time)}`
      : "";
    return `/showcase/medqueue/book/${id}${suffix}`;
  },
} as const;
