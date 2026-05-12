export function themeInitScript(): string {
  // Keep as a single self-invoking function string to run before hydration.
  return `
(function () {
  try {
    var key = "kivox-theme";
    var v = window.localStorage.getItem(key);
    var root = document.documentElement;
    if (v === "light" || v === "dark") {
      root.dataset.theme = v;
    } else {
      delete root.dataset.theme;
    }
  } catch (e) {
    // ignore
  }
})();`.trim();
}

