export const schoolTokens = {
  color: {
    bgIvory: "oklch(0.985 0.004 90)",       // soft offwhite/ivory
    bgGreenDark: "oklch(0.24 0.025 145)",   // #1E392A (greenfield dark green)
    bgGreenFooter: "oklch(0.18 0.02 145)", // #0F2218 (darker forest green)
    sage: "oklch(0.62 0.08 115)",           // #8A9A5B (sage accent)
    sageHover: "oklch(0.55 0.07 115)",
    gold: "oklch(0.82 0.09 85)",            // academic gold highlight
    inkDark: "oklch(0.24 0.025 145)",       // greenfield dark green as ink
    inkMuted: "oklch(0.42 0.02 145)",       // muted green ink
    border: "oklch(0.24 0.025 145 / 0.12)", // subtle green border
    borderMuted: "oklch(0.24 0.025 145 / 0.05)",
  },
  font: {
    display: "'Spectral', Georgia, serif",
    body: "'Figtree', system-ui, sans-serif",
  },
} as const;

export const routes = {
  home: "/showcase/school",
  programs: "/showcase/school/programs",
  programDetail: (id: string) => `/showcase/school/programs/${id}`,
  admissions: "/showcase/school/admissions",
  inquiry: "/showcase/school/inquiry",
  parentStatus: "/showcase/school/parent-status",
} as const;
