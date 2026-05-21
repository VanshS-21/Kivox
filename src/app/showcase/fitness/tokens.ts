export const fitnessTokens = {
  color: {
    bgBlack: "oklch(0.12 0.015 250)",      // #050505
    bgCard: "oklch(0.18 0.02 250)",       // #111111
    neonGreen: "oklch(0.968 0.211 115)",  // #CCFF00
    neonGreenHover: "oklch(0.98 0.23 115)",
    inkWhite: "oklch(0.98 0.005 250)",    // white
    inkMuted: "oklch(0.7 0.01 250)",      // muted text
    border: "oklch(0.25 0.02 250)",       // border white/10
    orangeAccent: "oklch(0.65 0.2 45)",   // orange for intermediate
    redAccent: "oklch(0.55 0.22 25)",     // red for advanced
  },
  font: {
    display: "var(--font-geist-sans), system-ui, sans-serif", // since Geist Sans has nice clean geometric shapes
    body: "var(--font-geist-sans), system-ui, sans-serif",
  },
} as const;

export const routes = {
  home: "/showcase/fitness",
  schedule: "/showcase/fitness/schedule",
  trainers: "/showcase/fitness/trainers",
  pricing: "/showcase/fitness/pricing",
  book: "/showcase/fitness/book",
  member: "/showcase/fitness/member",
  classDetail: (id: string) => `/showcase/fitness/classes/${id}`,
} as const;
