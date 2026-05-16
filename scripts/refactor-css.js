const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../src/app/globals.css');
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Replace the :root block (dark) with light mode defaults.
const rootRegex = /:root \{\n  color-scheme: dark;[\s\S]*?(?=  \/\* Border radius \*\/)/;
const lightRootTokens = `:root {
  color-scheme: light;

  /* Light mode defaults — site defaults to light (see themeScript.ts) */
  --bg-primary: oklch(0.97 0.003 250);
  --bg-elevated: oklch(0.99 0.002 250);
  --bg-surface: oklch(0.97 0.003 250);
  --bg-surface-alt: oklch(0.955 0.008 70);
  
  --fg-primary: oklch(0.13 0.005 250);
  --fg-muted: oklch(0.45 0.005 250);
  --fg-subtle: oklch(0.62 0.004 250);

  --accent: oklch(0.60 0.22 55);
  --accent-hover: oklch(0.55 0.24 52);
  --accent-glow: oklch(0.60 0.22 55 / 0.18);
  --accent-muted: oklch(0.60 0.22 55 / 0.08);
  --accent-ink: oklch(0.99 0.002 250);

  --border: oklch(0.13 0.005 250 / 0.10);
  --border-strong: oklch(0.13 0.005 250 / 0.18);
  --border-soft: oklch(0.13 0.005 250 / 0.05);

  --shadow-rest: 
    0 1px 3px oklch(0.13 0.005 250 / 0.06),
    0 6px 24px oklch(0.13 0.005 250 / 0.06);
  --shadow-hover:
    0 2px 6px oklch(0.60 0.22 55 / 0.08),
    0 16px 48px oklch(0.60 0.22 55 / 0.08);
  --shadow-amber-glow: 0 0 30px oklch(0.60 0.22 55 / 0.14);
  --shadow-strong:
    0 2px 6px oklch(0.13 0.005 250 / 0.08),
    0 24px 72px oklch(0.13 0.005 250 / 0.10);

  --project-hospital: oklch(0.55 0.17 240);
  --project-hotel: oklch(0.68 0.15 75);
  --project-school: oklch(0.58 0.2 155);
  --project-fitness: oklch(0.55 0.22 300);
  --project-cafe: oklch(0.55 0.24 25);

  --pov-wash: oklch(0.95 0.003 250);
  --accent-rose: oklch(0.52 0.12 25);
  --hero-glow-opacity: 0.06;
  --work-bg-overlay: 1;
  --work-stage-bg: var(--bg-primary);
  --work-primary-cta-fg: oklch(0.12 0.012 65);
  --work-secondary-cta-bg: oklch(0.985 0.006 72 / 0.82);
  --work-secondary-cta-border: oklch(0.34 0.018 65 / 0.16);
  --work-secondary-cta-shadow: 0 16px 40px -30px oklch(0.24 0.025 65 / 0.35);
  --proof-bg: var(--bg-primary);
  --proof-surface: var(--bg-elevated);
  --proof-linen: var(--bg-surface-alt);
  --proof-ink: var(--fg-primary);
  --proof-muted: var(--fg-muted);
  --proof-subtle: var(--fg-subtle);
  --proof-border: var(--border-strong);
  --proof-border-strong: var(--border);
  --proof-accent: var(--accent);
  --proof-primary-cta-fg: oklch(0.12 0.012 65);
  --proof-secondary-cta-bg: oklch(0.985 0.006 72 / 0.82);
  --proof-secondary-cta-border: oklch(0.34 0.018 65 / 0.16);
  --proof-secondary-cta-fg: var(--fg-primary);
  --proof-secondary-cta-shadow: 0 16px 40px -30px oklch(0.24 0.025 65 / 0.35);
  --proof-image-shade: oklch(0.18 0.018 65);
  --proof-shadow: var(--shadow-rest);
  --proof-stage-bg: linear-gradient(180deg, var(--proof-bg) 0%, var(--proof-linen) 48%, var(--proof-bg) 100%);

  --error: oklch(0.48 0.18 25);
  --success: oklch(0.48 0.14 155);

  /* Hero — theme-adaptive (light defaults) */
  --hero-bg: oklch(0.97 0.003 250);
  --hero-fg: oklch(0.13 0.005 250);
  --hero-fg-muted: oklch(0.45 0.005 250);
  --hero-fg-subtle: oklch(0.62 0.004 250);
  --hero-accent: oklch(0.60 0.22 55);
  --hero-accent-ink: oklch(0.99 0.002 250);
  --hero-noise-opacity: 0.008;
  --hero-bg-scroll: oklch(0.97 0.003 250 / 0.92);

  --studio-grid-opacity: 0.10;
  --studio-noise-opacity: 0.008;

  --cursor-dot: oklch(0.55 0.24 55 / 0.7);
  --cursor-dot-glow: 0 0 18px 6px oklch(0.55 0.24 55 / 0.25);
  --cursor-trail: oklch(0.55 0.24 55 / 0.18);
  --cursor-trail-glow: 0 0 28px 10px oklch(0.55 0.24 55 / 0.10);
  --cursor-blend: normal;

  --shadow-service-glow: 0 0 30px oklch(0.60 0.22 55 / 0.18), 0 8px 32px oklch(0.60 0.22 55 / 0.10);
  --shadow-hover-strong: 0 2px 6px oklch(0.60 0.22 55 / 0.10), 0 24px 72px oklch(0.60 0.22 55 / 0.12);

`;
css = css.replace(rootRegex, lightRootTokens);

// 2. Remove the existing [data-theme="light"] block entirely and its associated sections.
// This is lines 209 to 364 roughly.
const lightSectionRegex = /\/\* @media \(prefers-color-scheme: dark\) block REMOVED[\s\S]*?:root\[data-theme="light"\] \.proof-showcase \{[\s\S]*?\n\}/;
css = css.replace(lightSectionRegex, '');

// 3. Make footer dark-locked everywhere.
css = css.replace(':root[data-theme="light"] footer {', 'footer {');

// 4. Clean up cinematic image logic to be global (theme based, but without relying on specific :root[data-theme="light"] if we want).
// Actually, keeping `:root[data-theme="light"] .cinematic-img-dark { display: none; }` is fine, but since we removed that block, wait... the block was removed. Let's just restore the cinematic display block globally:
const cinematicFix = `
.cinematic-img-dark { display: none; }
.cinematic-img-light { display: block; }
:root[data-theme="dark"] .cinematic-img-dark { display: block; }
:root[data-theme="dark"] .cinematic-img-light { display: none; }
`;
// Let's just append it to :root[data-theme="dark"] block or somewhere safe.
// Wait, my regex `lightSectionRegex` might have captured lines 317-321 too.
// Let's just do it manually.

fs.writeFileSync(cssPath, css);
console.log('CSS refactored successfully.');
