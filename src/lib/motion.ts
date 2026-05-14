export const easeOutExpo = [0.16, 1, 0.3, 1] as const;
export const easeOutQuart = [0.25, 1, 0.5, 1] as const;
export const easeOutQuint = [0.22, 1, 0.36, 1] as const;

export const viewportOnce = { once: true, amount: 0.35 } as const;
export const viewportOnceEager = { once: true, amount: 0.15 } as const;

export const transitionDefault = {
  duration: 0.6,
  ease: easeOutExpo,
} as const;

export const transitionSlow = {
  duration: 0.9,
  ease: easeOutExpo,
} as const;

export const transitionEntrance = {
  duration: 0.8,
  ease: easeOutQuint,
} as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const fadeUp = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
} as const;

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(4px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)" },
} as const;

export const slideInLeft = {
  hidden: { opacity: 0, x: -30, filter: "blur(6px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)" },
} as const;

export const slideInRight = {
  hidden: { opacity: 0, x: 30, filter: "blur(6px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)" },
} as const;

export const stagger = {
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
} as const;

export const staggerFast = {
  show: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.02,
    },
  },
} as const;

export const staggerSlow = {
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.06,
    },
  },
} as const;

/** Parent container that orchestrates staggered children */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
} as const;

/** Word-level reveal variant for text splits */
export const wordReveal = {
  hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const;

/** Draw line animation — for expanding horizontal rules */
export const drawLine = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1 },
} as const;
