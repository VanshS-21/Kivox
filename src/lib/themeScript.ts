export function themeInitScript(): string {
  // Keep as a single self-invoking function string to run before hydration.
  // IMPORTANT: data-theme is ALWAYS set — the CSS has no @media fallback.
  // Light mode is the default visitor experience per DESIGN.md.
  return `
(function () {
  try {
    var key = "kivox-theme";
    var v = window.localStorage.getItem(key);
    var root = document.documentElement;
    if (v === "light" || v === "dark") {
      root.dataset.theme = v;
    } else {
      // No stored preference — respect system preference, default to light
      var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.dataset.theme = prefersDark ? "dark" : "light";
    }
  } catch (e) {
    document.documentElement.dataset.theme = "light";
  }
})();`.trim();
}
