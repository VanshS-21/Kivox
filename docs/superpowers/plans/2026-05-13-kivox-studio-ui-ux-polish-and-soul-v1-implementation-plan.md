# Kivox Studio UI/UX Polish + Soul v1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Take the current “good” Kivox marketing site UI/UX to an agency-grade level by adding a consistent signature visual language, editorial typography system, crafted micro-interactions, choreographed motion, stronger content UX, and extended brand tokens (beyond colors).

**Architecture:** Keep the existing token-first approach (CSS vars + Tailwind v4 `@theme inline`) and expand it into a small, cohesive “Kivox Studio Design System” layer: (1) design tokens, (2) composition primitives, (3) a few “signature” components used everywhere, (4) motion presets + usage rules, (5) content composition patterns. Reduced-motion must always degrade gracefully.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind v4, CSS variables, `motion` (motion/react), lucide-react.

---

## Target File Structure (Additions)

```text
web/src/
  components/
    ui/
      StudioCard.tsx
      Prose.tsx
  lib/
    studioTokens.ts          (optional helper exports for docs / debugging)
  app/
    globals.css              (extend tokens + typography utilities)
docs/
  design/
    kivox-studio-visual-language.md
```

---

## Guiding Rules (What “Polish + Soul” Means Here)

1. **One signature, many expressions**: the site should feel like the same studio on every page.
2. **Fewer components, reused relentlessly**: create 2–4 “hero” building blocks and refactor pages to use them.
3. **Motion is choreography**: one easing curve, small distances, purposeful reveals.
4. **Editorial hierarchy**: consistent type scale + spacing rhythm across Home / Work / Contact / Legal.
5. **Reduced-motion is first-class**: no “broken layout” in reduce mode; just calmer.

---

## Task 1: Create a “Kivox Studio Visual Language” doc (signature definition)

**Files:**
- Create: `docs/design/kivox-studio-visual-language.md`

- [ ] **Step 1: Document the signature motifs and usage rules**

Create `docs/design/kivox-studio-visual-language.md` with the following sections (copy-paste and then edit for accuracy as needed):

```md
# Kivox Studio — Visual Language (v1)

## The Signature (what makes it unmistakably “Kivox”)

### 1) Studio Surface
We use a layered surface: a clean base, a hairline grid masked to a focal region, and an optional low-opacity noise layer.

**When to use:**
- Hero container on Home
- Call-to-action panels (Home contact)
- Work cases
- Contact form container

**Variants:**
- `studio-surface` (default): grid + optional noise
- `studio-surface--quiet`: lower grid opacity, no noise
- `studio-surface--loud`: higher grid opacity, with noise and stronger mask

### 2) Studio Readout (microcopy + meta)
We present “readout” blocks (Mode/Signal/Output) and meta lines using mono type.

**Rules:**
- Use the mono font only for metadata and numbers.
- Meta blocks always use: border, subtle surface, consistent padding, and a strict label/value structure.

### 3) Motion Choreography
We animate only key elements, with small movement and a single easing curve.

**Rules:**
- Use `easeOutExpo` for all reveals.
- Keep `y` <= 12px.
- Use `viewport={{ once: true, amount: 0.35 }}` for scroll reveals.
- If `useReducedMotion()` is true, render without animation (no jitter).

## Page Composition Patterns

### Pattern: Editorial Header
Eyebrow → H1/H2 → supporting paragraph → CTA group (optional)

### Pattern: Card Grid
Grid of `StudioCard` / `Panel interactive` with consistent padding and hover.

## Don’ts
- No zinc palette classes
- No inconsistent hover/focus styles
- No large motion distances or multiple easing curves
```

- [ ] **Step 2: Link the doc from existing documentation index (optional)**

If this repo has a design/docs index, add a link. Otherwise skip.

---

## Task 2: Extend design tokens beyond color (borders, shadow discipline, texture intensity)

**Files:**
- Modify: `web/src/app/globals.css`

- [ ] **Step 1: Add semantic tokens for border strength, shadow states, and surface variants**

In `:root` (and dark variants), add tokens that allow consistent “polish”:

```css
:root {
  /* Existing tokens… */

  /* Border strength (semantic) */
  --border-soft: color-mix(in oklab, var(--border) 70%, transparent);
  --border-strong: color-mix(in oklab, var(--border) 92%, transparent);

  /* Hover lift discipline */
  --shadow-rest: var(--elevation-1);
  --shadow-hover: var(--elevation-2);

  /* Signature texture intensity knobs */
  --studio-grid-opacity: 0.35;
  --studio-noise-opacity: 0.035;
  --studio-mask: radial-gradient(circle at 50% 20%, black 0%, black 55%, transparent 90%);
}

:root[data-theme="dark"] {
  --studio-grid-opacity: 0.22;
  --studio-noise-opacity: 0.03;
}
```

- [ ] **Step 2: Map these into Tailwind `@theme inline`**

Add:

```css
@theme inline {
  --color-border-soft: var(--border-soft);
  --color-border-strong: var(--border-strong);

  --shadow-rest: var(--shadow-rest);
  --shadow-hover: var(--shadow-hover);
}
```

- [ ] **Step 3: Update `.studio-surface` to use the new intensity knobs**

Adjust your existing utility block:

```css
@layer utilities {
  .studio-surface {
    border: 1px solid var(--border-strong);
    box-shadow: var(--shadow-rest);
  }

  .studio-surface::before {
    opacity: var(--studio-grid-opacity);
    mask-image: var(--studio-mask);
  }

  .studio-surface--noise::after {
    opacity: var(--studio-noise-opacity);
  }

  /* Variants */
  .studio-surface--quiet::before {
    opacity: calc(var(--studio-grid-opacity) * 0.6);
  }

  .studio-surface--quiet.studio-surface--noise::after {
    opacity: 0;
  }

  .studio-surface--loud::before {
    opacity: calc(var(--studio-grid-opacity) * 1.25);
  }

  .studio-surface--loud.studio-surface--noise::after {
    opacity: calc(var(--studio-noise-opacity) * 1.35);
  }
}
```

- [ ] **Step 4: Lint/build**

Run:

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 3: Typography as an editorial system (scale, rhythm, and reusable “Prose”)

**Files:**
- Modify: `web/src/app/globals.css`
- Create: `web/src/components/ui/Prose.tsx`
- Modify: `web/src/app/privacy/page.tsx`
- Modify: `web/src/app/terms/page.tsx`

- [ ] **Step 1: Add typographic utilities + scale tokens**

In `globals.css`, add a small set of reusable utilities:

```css
@layer utilities {
  .studio-h1 {
    font-size: clamp(2.25rem, 4vw, 3.5rem);
    line-height: 1.05;
    letter-spacing: -0.02em;
    font-weight: 600;
  }

  .studio-h2 {
    font-size: clamp(1.5rem, 2.2vw, 2rem);
    line-height: 1.15;
    letter-spacing: -0.01em;
    font-weight: 600;
  }

  .studio-lede {
    font-size: 1rem;
    line-height: 1.75;
    color: var(--muted-fg);
  }
}
```

- [ ] **Step 2: Create `Prose` component for legal pages**

Create `web/src/components/ui/Prose.tsx`:

```tsx
import type { HTMLAttributes, Ref } from "react";
import { cn } from "@/lib/cn";

export function Prose({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "space-y-5 text-sm leading-7 text-muted-foreground",
        "[&>h2]:mt-10 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground",
        "[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:marker:text-muted-foreground/70",
        className,
      )}
      {...props}
    />
  );
}
```

- [ ] **Step 3: Refactor Privacy/Terms to use `Prose` and reduce repeated class noise**

Update the pages to use:
- `Container size="narrow"`
- `Eyebrow`
- H1 class `studio-h1` (or existing heading classes)
- `Prose` wrapper for section content

Ensure content remains unchanged; only structure/styling changes.

- [ ] **Step 4: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 4: “Agency polish” components (StudioCard + consistent interactive affordances)

**Files:**
- Create: `web/src/components/ui/StudioCard.tsx`
- Modify: `web/src/components/sections/HomeWorkPreview.tsx`
- Modify: `web/src/components/sections/HomeServices.tsx`
- Modify: `web/src/components/work/WorkCase.tsx`

- [ ] **Step 1: Create `StudioCard` (a signature, reusable interactive card)**

Create `web/src/components/ui/StudioCard.tsx`:

```tsx
"use client";

import type { HTMLAttributes, Ref } from "react";
import { cn } from "@/lib/cn";
import { Panel } from "@/components/ui/Panel";

export function StudioCard({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <Panel
      interactive
      padding="md"
      className={cn(
        "group relative",
        "ring-1 ring-transparent transition",
        "hover:ring-[color:var(--border-soft)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
```

- [ ] **Step 2: Replace ad-hoc panel usage in grids with `StudioCard`**

In Home services and work preview grids:
- Wrap card content in `<StudioCard>` instead of a plain `Panel`.
- Keep the same content; improve consistency.

- [ ] **Step 3: Add “polish” details**

Apply:
- Consistent hover lift for clickable cards
- Consistent focus-visible ring for clickable cards (when wrapped in `<Link className="block">`)
- Use mono for small meta labels (numbers, tags)

- [ ] **Step 4: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 5: Motion choreography upgrade (rules + wrappers + reduced-motion behavior)

**Files:**
- Modify: `web/src/lib/motion.ts`
- Modify: `web/src/components/sections/HomeHero.tsx`
- Modify: `web/src/components/sections/HomeServices.tsx`
- Modify: `web/src/components/sections/HomeWorkPreview.tsx`
- Modify: `web/src/components/sections/HomeProcess.tsx`
- Modify: `web/src/components/sections/HomeContact.tsx`
- Modify: `web/src/components/work/WorkCase.tsx`

- [ ] **Step 1: Expand motion presets to include viewport defaults**

Update `web/src/lib/motion.ts` to include a shared viewport config and a “transition default”:

```ts
export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const viewportOnce = { once: true, amount: 0.35 } as const;

export const transitionDefault = {
  duration: 0.6,
  ease: easeOutExpo,
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)" },
} as const;

export const stagger = {
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
} as const;
```

- [ ] **Step 2: Ensure every motion usage follows the same rule**

For each animated section:
- Use `useReducedMotion()` and disable animation when `true`
- Prefer `whileInView="show"` + `viewport={viewportOnce}` for scroll content
- Use `transitionDefault` everywhere (only tweak delay)

Example pattern:

```tsx
const reduce = useReducedMotion();

<motion.div
  initial={reduce ? false : "hidden"}
  whileInView={reduce ? undefined : "show"}
  viewport={viewportOnce}
  variants={fadeUp}
  transition={transitionDefault}
/>
```

- [ ] **Step 3: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 6: Content UX pass (make it feel like an agency with POV + structured story)

**Files:**
- Modify: `web/src/content/pages/home.ts`
- Modify: `web/src/components/sections/HomeProcess.tsx`
- Modify: `web/src/components/sections/HomeServices.tsx`
- Modify: `web/src/app/work/page.tsx`
- Modify: `web/src/components/work/WorkCase.tsx`
- Modify: `web/src/content/pages/contact.ts` (if exists / needed)
- Modify: `web/src/app/contact/page.tsx`

- [ ] **Step 1: Add a “Point of View” section on Home (content + UI)**

In `home.ts`, add:
- a short POV headline
- 3–5 bullet principles

Example (edit to match Kivox tone):

```ts
export const home = {
  // ...
  pov: {
    title: "Trust is a design system.",
    bullets: [
      "Customers decide in seconds—structure beats decoration.",
      "Proof beats claims—show your work, show the next step.",
      "Performance is part of credibility.",
      "Good motion is restraint, not fireworks.",
    ],
  },
};
```

Then render it as a `Panel`/`StudioCard` section with an editorial header pattern.

- [ ] **Step 2: Work page: tighten the “Proof policy” and make it part of the system**

Ensure the policy panel:
- uses `Panel`
- uses muted text + consistent spacing
- reads like a designed note (not an afterthought)

- [ ] **Step 3: Contact: add “What happens next” (3-step timeline)**

Add a small “What happens next” block under the form:
- Step 01: confirm receipt
- Step 02: ask 2–3 clarifying questions
- Step 03: propose scope + next call

Use the same numbered badge style as Home process.

- [ ] **Step 4: Lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Task 7: Final UI audit (consistency pass across the entire site)

**Files:**
- Modify: whichever UI files need adjustment

- [ ] **Step 1: Run a “consistency grep” and remove any remaining ad-hoc styles**

Run:

```bash
cd web
node -e "console.log('Run grep in your editor for: rounded-2xl, shadow-, border-, bg-')"
```

Then ensure:
- interactive surfaces use `Panel interactive` or `StudioCard`
- headings use `studio-h1`/`studio-h2` or consistent equivalents
- links use a consistent underline + hover treatment

- [ ] **Step 2: Manual QA (browser)**

Run:

```bash
cd web
npm run dev
```

Check:
- Home: hero panel, grids, spacing rhythm
- Work: cases feel premium + readable; hover is consistent
- Contact: form fields, error/success panels, “what happens next”
- Privacy/Terms: reading comfort + hierarchy
- Theme toggle: designed, consistent with buttons
- Reduced motion: no awkward partial animations or layout jumps

- [ ] **Step 3: Final lint/build**

```bash
cd web
npm run lint
npm run build
```

Expected: PASS

---

## Self-Review Checklist (Plan Quality)
- Spec coverage: signature doc, token expansion, typography system, polish components, motion choreography, content UX, final audit.
- Placeholder scan: no “TBD/TODO/add polish later” steps.
- Consistency: no zinc classes; interactive elements share one hover/focus language; motion uses a single easing + reduced-motion handling.

