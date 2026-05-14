export function themeInitScript(): string {
  // Keep as a single self-invoking function string to run before hydration.
  // IMPORTANT: data-theme is ALWAYS set — the CSS has no @media fallback.
  return `
(function () {
  try {
    var key = "kivox-theme";
    var v = window.localStorage.getItem(key);
    var root = document.documentElement;
    if (v === "light" || v === "dark") {
      root.dataset.theme = v;
    } else {
      root.dataset.theme = "dark";
    }
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();`.trim();
}
