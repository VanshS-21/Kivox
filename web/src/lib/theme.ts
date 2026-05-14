export type ThemePreference = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "kivox-theme";

export function isThemePreference(v: unknown): v is ThemePreference {
  return v === "system" || v === "light" || v === "dark";
}

export function getStoredThemePreference(): ThemePreference | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemePreference(raw)) return raw;
    return null;
  } catch {
    return null;
  }
}

export function setStoredThemePreference(v: ThemePreference): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, v);
  } catch {
    // ignore write errors (privacy mode, blocked storage, etc.)
  }
}

export function applyThemePreference(v: ThemePreference): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  if (v === "system") {
    // Resolve to explicit attribute — CSS has no @media fallback
    const resolved = typeof window !== "undefined"
      && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark" : "light";
    root.dataset.theme = resolved;
    return;
  }

  root.dataset.theme = v;
}

export function nextThemePreference(v: ThemePreference): ThemePreference {
  if (v === "system") return "light";
  if (v === "light") return "dark";
  return "system";
}

