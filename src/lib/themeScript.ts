export function themeInitScript(): string {
  // Keep as a single self-invoking function string to run before hydration.
  // IMPORTANT: data-theme is ALWAYS set — the CSS has no @media fallback.
  return `
(function () {
  function systemTheme() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  try {
    var key = "kivox-theme";
    var v = window.localStorage.getItem(key);
    var root = document.documentElement;
    if (v === "light" || v === "dark") {
      root.dataset.theme = v;
    } else {
      root.dataset.theme = systemTheme();
    }
  } catch (e) {
    document.documentElement.dataset.theme = systemTheme();
  }
})();`.trim();
}
