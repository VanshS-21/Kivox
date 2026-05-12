export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const viewportOnce = { once: true, amount: 0.35 } as const;

export const transitionDefault = {
  duration: 0.6,
  ease: easeOutExpo,
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

export const stagger = {
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
} as const;
