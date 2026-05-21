export const cafeTokens = {
  color: {
    bgIvory: "oklch(0.978 0.008 85)",     // #F9F6F0 (background cream)
    bgPaper: "oklch(0.965 0.012 80)",     // oat milk secondary cream
    bgWhite: "oklch(0.995 0.003 85)",     // pure offwhite
    inkDark: "oklch(0.26 0.018 35)",      // #2C241B (espresso dark)
    inkMuted: "oklch(0.46 0.025 35)",     // espresso muted
    inkFaint: "oklch(0.75 0.02 35)",      // espresso faint/border
    rule: "oklch(0.89 0.012 35)",         // rule lines
    copper: "oklch(0.46 0.13 32)",        // #9F442B (rich copper)
    copperHover: "oklch(0.55 0.15 32)",   // #D26E4B (lighter terracotta)
    peachSoft: "oklch(0.78 0.09 35)",     // #F1A37D (soft peach highlight)
    peachBg: "oklch(0.94 0.03 35)",       // soft peach background
  },
  font: {
    display: "'Spectral', Georgia, serif",
    body: "'Figtree', system-ui, sans-serif",
    mono: "'Geist Mono', monospace",
  },
  shadow: {
    soft: "0 10px 30px -15px oklch(0.26 0.018 35 / 0.15)",
    panel: "0 1px 2px oklch(1 0 0 / 0.8), 0 16px 48px -32px oklch(0.26 0.018 35 / 0.2)",
    lift: "0 12px 24px -16px oklch(0.46 0.13 32 / 0.25)",
  },
} as const;

export const routes = {
  home: "/showcase/cafe",
  menu: "/showcase/cafe/menu",
  shop: "/showcase/cafe/shop",
  product: (id: string) => `/showcase/cafe/product/${id}`,
  checkout: "/showcase/cafe/checkout",
  orderSuccess: "/showcase/cafe/order-success",
} as const;
