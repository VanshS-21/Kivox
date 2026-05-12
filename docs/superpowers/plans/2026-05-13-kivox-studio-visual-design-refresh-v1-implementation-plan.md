# Kivox Studio Visual Design Refresh v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the entire Kivox marketing site (Home/Work/Contact/Privacy/Terms) into a premium, madebycat-inspired “studio” aesthetic using a token-first design system, signature noise+grid layer, and disciplined high-motion interactions (reduced-motion safe).

**Architecture:** Implement design tokens as CSS variables in `web/src/app/globals.css` and expose them via Tailwind v4 `@theme inline`. Build a small set of reusable primitives (Button/Panel/Field/Eyebrow) and refactor sections/pages to use them. Add motion presets with `motion` and ensure reduced-motion disables non-essential animation. Keep media CSS-only (no generated image/video).

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4, CSS variables, `motion`, lucide-react.

---

## Target File Structure (Additions)

```text
web/src/
  components/
    ui/
      Button.tsx
      Panel.tsx
      Field.tsx
      Eyebrow.tsx
  lib/
    motion.ts
  styles/
    signature.css   (optional; can stay inside globals.css if preferred)
```

---

## Task 1: Upgrade tokens and Tailwind token mapping (globals.css)

**Files:**
- Modify: `web/src/app/globals.css`

- [x] **Step 1: Replace zinc-driven usage with token-driven mapping**

In `globals.css`, ensure we have:
- Background/foreground/muted
- surface-0..3
- border
- accent + accent-ink
- shadow-1 + shadow-2 tuned per theme
- radius-sm/md/lg

Then in `@theme inline`, ensure these are mapped:

```css
@theme inline {
  --color-background: var(--bg);
  --color-foreground: var(--fg);
  --color-muted: var(--muted);

  --color-surface-0: var(--surface-0);
  --color-surface-1: var(--surface-1);
  --color-surface-2: var(--surface-2);
  --color-surface-3: var(--surface-3);

  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-accent-ink: var(--accent-ink);

  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
}
```

- [x] **Step 2: Add “studio” base styles**

Add base typography + rendering polish:
- `body` uses tokens for background + foreground
- selection + focus-visible use accent
- default link hover style consistent

Example additions:

```css
body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
  text-rendering: geometricPrecision;
}

a {
  text-underline-offset: 3px;
}
```

- [x] **Step 3: Add signature layer utilities (noise + hairline grid)**

Add a reusable utility class for hero/section backgrounds:

```css
.studio-surface {
  position: relative;
}

.studio-surface::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: inherit;
  opacity: 0.7;
  /* grid */
  background-image:
    repeating-linear-gradient(
      to right,
      color-mix(in oklab, var(--border) 30%, transparent) 0 1px,
      transparent 1px 72px
    ),
    repeating-linear-gradient(
      to bottom,
      color-mix(in oklab, var(--border) 22%, transparent) 0 1px,
      transparent 1px 72px
    );
  mask-image: radial-gradient(circle at 40% 20%, black 0 60%, transparent 80%);
}

/* Reduce in dark to keep blacks clean */
:root[data-theme="dark"] .studio-surface::before {
  opacity: 0.35;
}
```

Optionally add a subtle noise layer using a tiny inline SVG data-url or `background-image` trick. Keep it very low opacity.

- [x] **Step 4: Reduced motion guardrails**

Ensure we can disable non-essential animation:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    scroll-behavior: auto !important;
  }
}
```

- [x] **Step 5: Lint/build sanity**

Run:

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 2: Create UI primitives (Button / Panel / Eyebrow / Field)

**Files:**
- Create: `web/src/components/ui/Button.tsx`
- Create: `web/src/components/ui/Panel.tsx`
- Create: `web/src/components/ui/Eyebrow.tsx`
- Create: `web/src/components/ui/Field.tsx`

- [x] **Step 1: Create `Button.tsx`**

```tsx
import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center rounded-full font-medium transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-[color:var(--accent)] text-[color:var(--accent-ink)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[var(--shadow-1)]",
  secondary:
    "bg-[color:var(--surface-1)] text-[color:var(--fg)] border border-[color:var(--border)] shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "text-[color:var(--fg)] hover:bg-[color:var(--surface-2)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
};

export function Button({
  className,
  size = "md",
  variant = "primary",
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props} />
  );
}

export function ButtonLink({
  className,
  size = "md",
  variant = "primary",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size }) {
  return <Link className={cn(base, sizes[size], variants[variant], className)} {...props} />;
}
```

- [x] **Step 2: Create `Panel.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Panel({
  children,
  className,
  interactive,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-md)] border border-[color:var(--border)] bg-[color:var(--surface-1)] shadow-[var(--shadow-1)]",
        interactive ? "transition hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5" : "",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [x] **Step 3: Create `Eyebrow.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--muted)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [x] **Step 4: Create `Field.tsx`**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-medium text-[color:var(--fg)]">{label}</div>
        {error ? <div className="text-sm text-red-600 dark:text-red-400">{error}</div> : null}
      </div>
      {children}
    </label>
  );
}

export const inputBase =
  "h-11 w-full rounded-[var(--radius-sm)] border border-[color:var(--border)] bg-[color:var(--surface-0)] px-4 text-sm text-[color:var(--fg)] outline-none transition focus:border-[color:var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2 focus:ring-offset-[color:var(--bg)]";
```

- [x] **Step 5: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 3: Refactor Header/Footer to use tokens + integrate ThemeToggle styling

**Files:**
- Modify: `web/src/components/site/Header.tsx`
- Modify: `web/src/components/site/Footer.tsx`
- Modify: `web/src/components/site/ThemeToggle.tsx`

- [x] **Step 1: Remove zinc palette reliance**
Update header/footer classes to use token-backed colors:
- backgrounds: `bg-[color:var(--surface-0)]` or translucent surface
- borders: `border-[color:var(--border)]`
- text: `text-[color:var(--fg)]` / `text-[color:var(--muted)]`

- [x] **Step 2: Make ThemeToggle feel “designed”**
Update the button:
- use token-backed border/background
- add hover lift/shadow consistent with Button/Panel
- ensure icon visibility is correct in light/dark

- [x] **Step 3: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 4: Refactor Home sections to premium composition (Hero/Services/WorkPreview/Process/Contact)

**Files:**
- Modify: `web/src/components/sections/HomeHero.tsx`
- Modify: `web/src/components/sections/HomeServices.tsx`
- Modify: `web/src/components/sections/HomeWorkPreview.tsx`
- Modify: `web/src/components/sections/HomeProcess.tsx`
- Modify: `web/src/components/sections/HomeContact.tsx`
- Modify: `web/src/app/page.tsx`

- [x] **Step 1: Use `Container` + `Section` everywhere**
Remove repeated `py-*` blocks and align section rhythm.

- [x] **Step 2: Hero becomes a “studio console”**
Add:
- Eyebrow label (optional)
- stronger headline scale
- CTA group uses `ButtonLink` variants
- signature background layer using `.studio-surface` (on a wrapper with rounded corners)

- [x] **Step 3: Services as Panels**
Replace raw div cards with `<Panel interactive>` and consistent spacing/padding.

- [x] **Step 4: Work preview as Panels + hover**
Ensure cards feel clickable and premium.

- [x] **Step 5: Process steps**
Make steps read as a designed system (mono-ish numbers + headings).

- [x] **Step 6: Contact CTA panel**
Upgrade to `Panel` with consistent CTA treatment.

- [x] **Step 7: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 5: Refactor Work page + components (WorkGrid/WorkCase)

**Files:**
- Modify: `web/src/app/work/page.tsx`
- Modify: `web/src/components/work/WorkGrid.tsx`
- Modify: `web/src/components/work/WorkCase.tsx`

- [x] **Step 1: Apply typography + label system**
Use `Eyebrow` and token-backed muted text.

- [x] **Step 2: Convert cases to Panel-based layout**
Each case becomes:
- a `Panel` wrapper
- structured inner blocks with headings and bullet lists
- subtle hover or expand affordance (if already interactive)

- [x] **Step 3: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 6: Refactor Inquiry form (Field primitive + token styling)

**Files:**
- Modify: `web/src/components/inquiry/InquiryForm.tsx`
- Modify: `web/src/app/contact/page.tsx`

- [x] **Step 1: Replace inline field wrapper with `Field` primitive**
Use `Field` and `inputBase` for inputs/selects/textarea, with small per-control overrides if needed.

- [x] **Step 2: Make success/error panels match Panel language**
Use token surfaces and consistent radii/shadow.

- [x] **Step 3: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 7: Legal pages typography pass

**Files:**
- Modify: `web/src/app/privacy/page.tsx`
- Modify: `web/src/app/terms/page.tsx`

- [x] **Step 1: Apply reading width + typography scale**
Use:
- larger heading scale
- consistent spacing between sections
- list styling consistent with token system

- [x] **Step 2: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 8: Motion system (high, disciplined) with reduced-motion

**Files:**
- Create: `web/src/lib/motion.ts`
- Modify: `web/src/components/sections/HomeHero.tsx`
- Modify: `web/src/components/sections/HomeServices.tsx`
- Modify: `web/src/components/sections/HomeWorkPreview.tsx`
- Modify: `web/src/components/sections/HomeProcess.tsx`
- Modify: `web/src/components/sections/HomeContact.tsx`
- Modify: `web/src/components/work/WorkCase.tsx`

- [x] **Step 1: Add motion presets**

Create `motion.ts`:

```ts
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
} as const;
```

- [x] **Step 2: Apply section reveals**
Use `motion` to animate:
- headings
- cards grid items (stagger)
- keep distances low and easing premium

- [x] **Step 3: Reduced-motion behavior**
If reduced-motion:
- render without animation (or use instant transitions)

- [x] **Step 4: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 9: Visual QA & dev verification

**Files:**
- Modify: whichever UI files need adjustment

- [x] **Step 1: Run dev server**

```bash
cd web
npm run dev
```

- [ ] **Step 2: Manual checks**
- Home in light + dark (use theme toggle)
- Work page cards
- Contact form inputs + submit success/error
- Footer readability
- Reduced-motion (simulate via OS / browser setting)

> Note: Lint/build is green, but the above manual checks should still be performed in a browser before release.

- [x] **Step 3: Final lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Self-Review Checklist (Plan Quality)
- Spec coverage: tokens, signature layer, primitives, full-site refactor, motion, reduced-motion.
- Placeholder scan: no “TODO/TBD” instructions remain.
- Consistency: components use token-backed styles; minimal hard-coded zinc usage.
