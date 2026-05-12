"use client";

import { Monitor, Moon, Sun } from "lucide-react";

import {
  applyThemePreference,
  getStoredThemePreference,
  nextThemePreference,
  setStoredThemePreference,
  type ThemePreference,
} from "@/lib/theme";

export function ThemeToggle() {
  function onClick() {
    const rootTheme = document.documentElement.dataset.theme;
    const fromRoot: ThemePreference =
      rootTheme === "light" || rootTheme === "dark" ? rootTheme : "system";

    const current = getStoredThemePreference() ?? fromRoot;
    const next = nextThemePreference(current);

    setStoredThemePreference(next);
    applyThemePreference(next);
  }

  return (
    <button
      aria-label="Toggle theme (System, Light, Dark)"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-1 text-foreground shadow-[var(--shadow-1)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-2)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
      onClick={onClick}
      type="button"
    >
      <Monitor aria-hidden className="theme-toggle__icon theme-toggle__icon--system h-4 w-4" />
      <Sun aria-hidden className="theme-toggle__icon theme-toggle__icon--light h-4 w-4" />
      <Moon aria-hidden className="theme-toggle__icon theme-toggle__icon--dark h-4 w-4" />
    </button>
  );
}
