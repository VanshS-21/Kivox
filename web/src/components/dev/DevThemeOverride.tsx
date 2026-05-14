"use client";

import { useEffect } from "react";

export function DevThemeOverride() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const root = document.documentElement;

    function apply() {
      const params = new URLSearchParams(window.location.search);
      const theme = params.get("theme");

      if (theme === "light" || theme === "dark") {
        root.dataset.theme = theme;
      }
      // If no ?theme param, leave data-theme as-is.
      // The init script and ThemeToggle handle normal resolution.
    }

    apply();
    window.addEventListener("popstate", apply);

    return () => {
      window.removeEventListener("popstate", apply);
    };
  }, []);

  return null;
}
