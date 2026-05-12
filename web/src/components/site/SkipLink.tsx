export function SkipLink() {
  return (
    <a
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-sm)] focus:bg-surface-1 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-[var(--shadow-2)] focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]"
      href="#main-content"
    >
      Skip to content
    </a>
  );
}
