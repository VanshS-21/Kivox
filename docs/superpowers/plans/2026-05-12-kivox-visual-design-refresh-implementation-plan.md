# Kivox Visual Design Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a bespoke, madebycat-inspired (not copied) visual system for the Kivox marketing site: token-first Tailwind v4, Space Grotesk typography, premium surfaces, disciplined motion, and a Phase 1 algorithmic accent layer.

**Architecture:** Define all design tokens as CSS variables, bridge into Tailwind v4 via `@theme inline`, then migrate pages/components from hard-coded `zinc-*` and `white/black` utilities to token-backed utilities and shared primitives (Container/Section/Panel/Button/Fields). Provide a dev-only theme override for QA while shipping Auto (system) theme.

**Tech Stack:** Next.js (App Router), React 19, Tailwind CSS v4, PostCSS, react-hook-form + zod, lucide-react.

---

## File Map

**Modify**
- [layout.tsx](file:///f:/Kivox/web/src/app/layout.tsx)
- [globals.css](file:///f:/Kivox/web/src/app/globals.css)
- [page.tsx](file:///f:/Kivox/web/src/app/page.tsx)
- [work/page.tsx](file:///f:/Kivox/web/src/app/work/page.tsx)
- [contact/page.tsx](file:///f:/Kivox/web/src/app/contact/page.tsx)
- [Header.tsx](file:///f:/Kivox/web/src/components/site/Header.tsx)
- [Footer.tsx](file:///f:/Kivox/web/src/components/site/Footer.tsx)
- [SkipLink.tsx](file:///f:/Kivox/web/src/components/site/SkipLink.tsx)
- [HomeHero.tsx](file:///f:/Kivox/web/src/components/sections/HomeHero.tsx)
- [HomeServices.tsx](file:///f:/Kivox/web/src/components/sections/HomeServices.tsx)
- [HomeWorkPreview.tsx](file:///f:/Kivox/web/src/components/sections/HomeWorkPreview.tsx)
- [HomeProcess.tsx](file:///f:/Kivox/web/src/components/sections/HomeProcess.tsx)
- [HomeContact.tsx](file:///f:/Kivox/web/src/components/sections/HomeContact.tsx)
- [WorkCase.tsx](file:///f:/Kivox/web/src/components/work/WorkCase.tsx)
- [InquiryForm.tsx](file:///f:/Kivox/web/src/components/inquiry/InquiryForm.tsx)

**Create**
- `f:/Kivox/web/src/lib/cn.ts`
- `f:/Kivox/web/src/components/dev/DevThemeOverride.tsx`
- `f:/Kivox/web/src/components/ui/Container.tsx`
- `f:/Kivox/web/src/components/ui/Section.tsx`
- `f:/Kivox/web/src/components/ui/PageShell.tsx`
- `f:/Kivox/web/src/components/ui/Panel.tsx`
- `f:/Kivox/web/src/components/ui/Button.tsx`
- `f:/Kivox/web/src/components/ui/Field.tsx`
- `f:/Kivox/web/src/components/ui/Input.tsx`
- `f:/Kivox/web/src/components/ui/Select.tsx`
- `f:/Kivox/web/src/components/ui/Textarea.tsx`
- `f:/Kivox/web/src/components/visual/RouteLines.tsx`

---

## Task 1: Typography (Space Grotesk 400/500/700)

**Files**
- Modify: [layout.tsx](file:///f:/Kivox/web/src/app/layout.tsx)
- Modify: [globals.css](file:///f:/Kivox/web/src/app/globals.css)

- [ ] **Step 1: Update RootLayout font loading**

Edit `layout.tsx` to use Space Grotesk as the sans font and keep Geist Mono as the mono font:

```tsx
import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Analytics } from "@/components/analytics/Analytics";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SkipLink } from "@/components/site/SkipLink";
import { homeSeo } from "@/content/seo/home";
import { getMetadataBase } from "@/lib/metadata";
import { getOrganizationJsonLd } from "@/lib/structuredData";
import { DevThemeOverride } from "@/components/dev/DevThemeOverride";

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  metadataBase: getMetadataBase(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getOrganizationJsonLd();

  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <DevThemeOverride />
        <SkipLink />
        <Header />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
        <Analytics />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Bridge fonts into Tailwind theme**

Update `@theme inline` in `globals.css` so Tailwind tokens point at the new variables:

```css
@theme inline {
  --font-sans: var(--font-space-grotesk);
  --font-mono: var(--font-geist-mono);
}
```

- [ ] **Step 3: Verify compilation**

Run (from `f:/Kivox/web`):

```powershell
npm run lint
npm run build
```

Expected: both succeed.

---

## Task 2: Token System (OKLCH) + Auto Theme + Dev Override Hooks

**Files**
- Modify: [globals.css](file:///f:/Kivox/web/src/app/globals.css)

- [ ] **Step 1: Replace minimal variables with a full token set**

Replace `:root` and the current dark media query with a token ladder that supports:
- Auto theme via `prefers-color-scheme`
- Dev override via `:root[data-theme="light"]` / `:root[data-theme="dark"]`

Use this `globals.css` structure:

```css
@import "tailwindcss";

:root {
  color-scheme: light;

  --bg: oklch(0.985 0.01 250);
  --fg: oklch(0.18 0.02 255);
  --muted: oklch(0.50 0.02 255);

  --surface-0: var(--bg);
  --surface-1: oklch(0.995 0.006 250);
  --surface-2: oklch(0.975 0.01 250);
  --surface-3: oklch(0.955 0.012 250);

  --border: oklch(0.88 0.01 250);
  --shadow-1: 0 1px 0 0 color-mix(in oklab, var(--fg) 8%, transparent),
    0 18px 40px -30px color-mix(in oklab, black 18%, transparent);
  --shadow-2: 0 1px 0 0 color-mix(in oklab, var(--fg) 10%, transparent),
    0 30px 70px -40px color-mix(in oklab, black 26%, transparent);

  --accent: oklch(0.92 0.18 104);
  --accent-ink: oklch(0.12 0.02 255);

  --radius-sm: 12px;
  --radius-md: 18px;
  --radius-lg: 24px;
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;

    --bg: oklch(0.14 0.02 255);
    --fg: oklch(0.96 0.01 255);
    --muted: oklch(0.72 0.02 255);

    --surface-0: var(--bg);
    --surface-1: oklch(0.18 0.02 255);
    --surface-2: oklch(0.22 0.02 255);
    --surface-3: oklch(0.26 0.02 255);

    --border: oklch(0.30 0.02 255);
    --shadow-1: 0 1px 0 0 color-mix(in oklab, white 10%, transparent),
      0 22px 50px -40px color-mix(in oklab, black 60%, transparent);
    --shadow-2: 0 1px 0 0 color-mix(in oklab, white 12%, transparent),
      0 40px 90px -60px color-mix(in oklab, black 70%, transparent);

    --accent: oklch(0.92 0.18 104);
    --accent-ink: oklch(0.10 0.02 255);
  }
}

:root[data-theme="light"] {
  color-scheme: light;

  --bg: oklch(0.985 0.01 250);
  --fg: oklch(0.18 0.02 255);
  --muted: oklch(0.50 0.02 255);

  --surface-0: var(--bg);
  --surface-1: oklch(0.995 0.006 250);
  --surface-2: oklch(0.975 0.01 250);
  --surface-3: oklch(0.955 0.012 250);

  --border: oklch(0.88 0.01 250);
  --shadow-1: 0 1px 0 0 color-mix(in oklab, var(--fg) 8%, transparent),
    0 18px 40px -30px color-mix(in oklab, black 18%, transparent);
  --shadow-2: 0 1px 0 0 color-mix(in oklab, var(--fg) 10%, transparent),
    0 30px 70px -40px color-mix(in oklab, black 26%, transparent);

  --accent: oklch(0.92 0.18 104);
  --accent-ink: oklch(0.12 0.02 255);
}

:root[data-theme="dark"] {
  color-scheme: dark;

  --bg: oklch(0.14 0.02 255);
  --fg: oklch(0.96 0.01 255);
  --muted: oklch(0.72 0.02 255);

  --surface-0: var(--bg);
  --surface-1: oklch(0.18 0.02 255);
  --surface-2: oklch(0.22 0.02 255);
  --surface-3: oklch(0.26 0.02 255);

  --border: oklch(0.30 0.02 255);
  --shadow-1: 0 1px 0 0 color-mix(in oklab, white 10%, transparent),
    0 22px 50px -40px color-mix(in oklab, black 60%, transparent);
  --shadow-2: 0 1px 0 0 color-mix(in oklab, white 12%, transparent),
    0 40px 90px -60px color-mix(in oklab, black 70%, transparent);

  --accent: oklch(0.92 0.18 104);
  --accent-ink: oklch(0.10 0.02 255);
}

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

  --shadow-1: var(--shadow-1);
  --shadow-2: var(--shadow-2);

  --radius-sm: var(--radius-sm);
  --radius-md: var(--radius-md);
  --radius-lg: var(--radius-lg);
}

body {
  background: var(--bg);
  color: var(--fg);
  font-family: var(--font-sans);
}

::selection {
  background: color-mix(in oklab, var(--accent) 35%, transparent);
  color: var(--accent-ink);
}
```

- [ ] **Step 2: Add a small baseline for focus visibility**

Append to `globals.css`:

```css
:focus-visible {
  outline: 2px solid color-mix(in oklab, var(--accent) 80%, transparent);
  outline-offset: 3px;
}
```

- [ ] **Step 3: Verify Auto theme still works**

Run:

```powershell
cd f:\Kivox\web
npm run build
```

Expected: build succeeds.

---

## Task 3: Dev-Only Theme Override (`?theme=light|dark`)

**Files**
- Create: `f:/Kivox/web/src/components/dev/DevThemeOverride.tsx`
- (Already wired into layout in Task 1)

- [ ] **Step 1: Create `DevThemeOverride` client component**

Create `DevThemeOverride.tsx`:

```tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function DevThemeOverride() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const theme = searchParams.get("theme");
    const root = document.documentElement;

    if (theme === "light" || theme === "dark") {
      root.dataset.theme = theme;
      return;
    }

    delete root.dataset.theme;
  }, [searchParams]);

  return null;
}
```

- [ ] **Step 2: Manual QA**

Run `npm run dev` and confirm:
- `/?theme=dark` forces dark
- `/?theme=light` forces light
- no param falls back to system theme

---

## Task 4: Class Composition Helper (`cn`)

**Files**
- Create: `f:/Kivox/web/src/lib/cn.ts`

- [ ] **Step 1: Add `cn()` helper**

```ts
export function cn(...values: Array<string | null | undefined | false>) {
  return values.filter(Boolean).join(" ");
}
```

- [ ] **Step 2: Verify typecheck by building**

Run:

```powershell
cd f:\Kivox\web
npm run build
```

---

## Task 5: Layout Primitives (React Components)

**Files**
- Create: `f:/Kivox/web/src/components/ui/Container.tsx`
- Create: `f:/Kivox/web/src/components/ui/Section.tsx`
- Create: `f:/Kivox/web/src/components/ui/PageShell.tsx`

- [ ] **Step 1: Add `Container`**

```tsx
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6",
        size === "default" ? "max-w-5xl" : "max-w-3xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Add `Section`**

```tsx
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={cn("py-16 sm:py-20", className)} id={id}>
      {children}
    </section>
  );
}
```

- [ ] **Step 3: Add `PageShell`**

```tsx
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function PageShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("bg-[var(--color-surface-0)]", className)}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Build**

```powershell
cd f:\Kivox\web
npm run build
```

---

## Task 6: UI Primitives (Panel + Button + Fields)

**Files**
- Create: `f:/Kivox/web/src/components/ui/Panel.tsx`
- Create: `f:/Kivox/web/src/components/ui/Button.tsx`
- Create: `f:/Kivox/web/src/components/ui/Field.tsx`
- Create: `f:/Kivox/web/src/components/ui/Input.tsx`
- Create: `f:/Kivox/web/src/components/ui/Select.tsx`
- Create: `f:/Kivox/web/src/components/ui/Textarea.tsx`

- [ ] **Step 1: Add `Panel`**

```tsx
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-1)] shadow-[var(--shadow-1)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Add `Button` + `ButtonLink`**

```tsx
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

const base =
  "inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-medium transition will-change-transform focus-visible:outline-none";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <button
      className={cn(
        base,
        variant === "primary" &&
          "bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:brightness-95 active:translate-y-px disabled:opacity-60",
        variant === "secondary" &&
          "border border-[var(--color-border)] bg-[var(--color-surface-1)] text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)] active:translate-y-px disabled:opacity-60",
        variant === "ghost" &&
          "text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)] active:translate-y-px disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  children,
  className,
  href,
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
}) {
  return (
    <Link
      className={cn(
        base,
        variant === "primary" &&
          "bg-[var(--color-accent)] text-[var(--color-accent-ink)] hover:brightness-95 active:translate-y-px",
        variant === "secondary" &&
          "border border-[var(--color-border)] bg-[var(--color-surface-1)] text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)] active:translate-y-px",
        variant === "ghost" &&
          "text-[var(--color-foreground)] hover:bg-[var(--color-surface-2)] active:translate-y-px",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
```

- [ ] **Step 3: Add `Field`**

```tsx
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-4">
        <div className="text-xs font-medium tracking-wide text-[var(--color-muted)]">
          {label}
        </div>
        {error ? (
          <div className="text-xs font-medium text-red-600 dark:text-red-400">{error}</div>
        ) : null}
      </div>
      {children}
    </label>
  );
}

export function FieldHint({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("text-xs text-[var(--color-muted)]", className)}>{children}</div>;
}
```

- [ ] **Step 4: Add inputs**

`Input.tsx`:

```tsx
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/cn";

export const Input = forwardRef<HTMLInputElement, ComponentPropsWithoutRef<"input">>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-0)] px-4 text-sm text-[var(--color-foreground)] outline-none transition focus:border-[color-mix(in_oklab,var(--color-accent)_40%,var(--color-border))]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
```

`Select.tsx`:

```tsx
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/cn";

export const Select = forwardRef<HTMLSelectElement, ComponentPropsWithoutRef<"select">>(
  ({ className, ...props }, ref) => {
    return (
      <select
        className={cn(
          "h-11 w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-0)] px-4 text-sm text-[var(--color-foreground)] outline-none transition focus:border-[color-mix(in_oklab,var(--color-accent)_40%,var(--color-border))]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Select.displayName = "Select";
```

`Textarea.tsx`:

```tsx
import type { ComponentPropsWithoutRef } from "react";
import { forwardRef } from "react";

import { cn } from "@/lib/cn";

export const Textarea = forwardRef<HTMLTextAreaElement, ComponentPropsWithoutRef<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "min-h-28 w-full resize-y rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-surface-0)] px-4 py-3 text-sm text-[var(--color-foreground)] outline-none transition focus:border-[color-mix(in_oklab,var(--color-accent)_40%,var(--color-border))]",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
```

- [ ] **Step 5: Build**

```powershell
cd f:\Kivox\web
npm run build
```

---

## Task 7: Phase 1 Visual Accent (Route Lines Canvas)

**Files**
- Create: `f:/Kivox/web/src/components/visual/RouteLines.tsx`
- Modify: [HomeHero.tsx](file:///f:/Kivox/web/src/components/sections/HomeHero.tsx)

- [ ] **Step 1: Create `RouteLines`**

```tsx
"use client";

import { useEffect, useMemo, useRef } from "react";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function RouteLines({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const seed = useMemo(() => Math.floor(Math.random() * 1_000_000), []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rand = mulberry32(seed);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(rect.width, rect.height);
    }

    function draw(w: number, h: number) {
      ctx.clearRect(0, 0, w, h);
      const stroke = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      ctx.globalAlpha = 0.10;
      ctx.strokeStyle = stroke || "rgba(200,255,0,0.12)";
      ctx.lineWidth = 1;

      const lines = 22;
      for (let i = 0; i < lines; i++) {
        const x0 = rand() * w;
        const y0 = rand() * h;
        const x1 = rand() * w;
        const y1 = rand() * h;
        const cx = (x0 + x1) / 2 + (rand() - 0.5) * 120;
        const cy = (y0 + y1) / 2 + (rand() - 0.5) * 120;

        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(cx, cy, x1, y1);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    resize();

    return () => {
      ro.disconnect();
    };
  }, [seed]);

  return <canvas aria-hidden="true" className={className} ref={canvasRef} />;
}
```

- [ ] **Step 2: Add `RouteLines` behind hero content**

Update `HomeHero.tsx` to wrap content in a relative container and add the canvas as an absolute layer:

```tsx
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { RouteLines } from "@/components/visual/RouteLines";
import { home } from "@/content/pages/home";

export function HomeHero() {
  return (
    <Section>
      <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-1)] px-6 py-10 shadow-[var(--shadow-2)] sm:px-10">
        <RouteLines className="absolute inset-0 h-full w-full" />
        <div className="relative flex flex-col gap-6">
          <h1 className="text-pretty text-5xl font-semibold tracking-tight text-[var(--color-foreground)] sm:text-6xl">
            {home.hero.headline}
          </h1>
          <p className="max-w-2xl text-pretty text-lg leading-8 text-[var(--color-muted)]">
            {home.hero.subhead}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/#contact" variant="primary">
              {home.hero.ctas.primary}
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              {home.hero.ctas.secondary}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Build**

```powershell
cd f:\Kivox\web
npm run build
```

---

## Task 8: Migrate Pages to PageShell/Container/Section + Token Colors

**Files**
- Modify: [page.tsx](file:///f:/Kivox/web/src/app/page.tsx)
- Modify: [work/page.tsx](file:///f:/Kivox/web/src/app/work/page.tsx)
- Modify: [contact/page.tsx](file:///f:/Kivox/web/src/app/contact/page.tsx)

- [ ] **Step 1: Home page wrapper**

Replace the `bg-white dark:bg-black` wrappers with `PageShell` + `Container`:

```tsx
import { Container } from "@/components/ui/Container";
import { PageShell } from "@/components/ui/PageShell";
import { HomeContact } from "@/components/sections/HomeContact";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeProcess } from "@/components/sections/HomeProcess";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeWorkPreview } from "@/components/sections/HomeWorkPreview";

export default function Home() {
  return (
    <PageShell>
      <Container>
        <HomeHero />
        <HomeServices />
        <HomeWorkPreview />
        <HomeProcess />
        <HomeContact />
      </Container>
    </PageShell>
  );
}
```

- [ ] **Step 2: Work page wrapper**

Convert hard-coded zinc colors to token-based values and use `Panel`:

```tsx
import { Container } from "@/components/ui/Container";
import { PageShell } from "@/components/ui/PageShell";
import { Panel } from "@/components/ui/Panel";
import { WorkGrid } from "@/components/work/WorkGrid";
import { studioWorkPolicy } from "@/content/work/studio-work-policy";
import { work } from "@/content/pages/work";

export default function WorkPage() {
  return (
    <PageShell>
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-3">
          <div className="text-xs font-medium tracking-wide text-[var(--color-muted)]">
            {work.label}
          </div>
          <h1 className="text-5xl font-semibold tracking-tight text-[var(--color-foreground)]">
            {work.title}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            {work.intro}
          </p>
        </div>
        <div className="mt-10">
          <WorkGrid items={work.items} />
        </div>
        <Panel className="mt-14 p-6">
          <div className="text-sm font-semibold text-[var(--color-foreground)]">Proof policy</div>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
            {studioWorkPolicy.cannotSay.slice(0, 4).map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Panel>
      </Container>
    </PageShell>
  );
}
```

- [ ] **Step 3: Contact page wrapper**

```tsx
import { Container } from "@/components/ui/Container";
import { PageShell } from "@/components/ui/PageShell";
import { Panel } from "@/components/ui/Panel";
import { brand } from "@/content/brand";
import { contact } from "@/content/pages/contact";
import { InquiryForm } from "@/components/inquiry/InquiryForm";

export default function ContactPage() {
  return (
    <PageShell>
      <Container size="narrow" className="py-16 sm:py-20">
        <h1 className="text-5xl font-semibold tracking-tight text-[var(--color-foreground)]">
          {contact.title}
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--color-muted)]">{contact.intro}</p>
        <Panel className="mt-10 p-6 sm:p-8">
          <InquiryForm />
        </Panel>
        <div className="mt-8 text-sm text-[var(--color-muted)]">
          <div>
            Email:{" "}
            <a
              className="font-medium text-[var(--color-foreground)] hover:opacity-80"
              href={`mailto:${brand.contact.email}`}
            >
              {brand.contact.email}
            </a>
          </div>
        </div>
      </Container>
    </PageShell>
  );
}
```

- [ ] **Step 4: Build**

```powershell
cd f:\Kivox\web
npm run build
```

---

## Task 9: Migrate Sections to Panel/Button/Section Tokens

**Files**
- Modify: [HomeServices.tsx](file:///f:/Kivox/web/src/components/sections/HomeServices.tsx)
- Modify: [HomeWorkPreview.tsx](file:///f:/Kivox/web/src/components/sections/HomeWorkPreview.tsx)
- Modify: [HomeProcess.tsx](file:///f:/Kivox/web/src/components/sections/HomeProcess.tsx)
- Modify: [HomeContact.tsx](file:///f:/Kivox/web/src/components/sections/HomeContact.tsx)

- [ ] **Step 1: HomeServices**

```tsx
import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";
import { home } from "@/content/pages/home";

export function HomeServices() {
  return (
    <Section id="services">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
            Services
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {home.services.map((service) => (
            <Panel className="p-6" key={service.id}>
              <div className="text-base font-semibold text-[var(--color-foreground)]">
                {service.title}
              </div>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{service.summary}</p>
            </Panel>
          ))}
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: HomeWorkPreview**

```tsx
import Link from "next/link";

import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";
import { home } from "@/content/pages/home";
import { work } from "@/content/pages/work";

export function HomeWorkPreview() {
  return (
    <Section>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-medium tracking-wide text-[var(--color-muted)]">
            {home.workPreview.label}
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
            Work that shows the decisions
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)]">
            {home.workPreview.summary}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {work.items.slice(0, 4).map((item) => (
            <Link className="group" href="/work" key={item.id}>
              <Panel className="p-6 transition hover:shadow-[var(--shadow-2)]">
                <div className="text-base font-semibold text-[var(--color-foreground)]">
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                  {item.demonstrates}
                </p>
              </Panel>
            </Link>
          ))}
        </div>
        <div>
          <Link className="text-sm font-medium text-[var(--color-foreground)] hover:opacity-80" href="/work">
            View all studio demonstrations
          </Link>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: HomeProcess**

```tsx
import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";
import { home } from "@/content/pages/home";

export function HomeProcess() {
  return (
    <Section id="process">
      <div className="flex flex-col gap-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
            Process
          </h2>
        </div>
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {home.process.map((step, idx) => (
            <li key={step}>
              <Panel className="p-6">
                <div className="text-xs font-medium tracking-wide text-[var(--color-muted)]">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{step}</div>
              </Panel>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: HomeContact**

```tsx
import { ButtonLink } from "@/components/ui/Button";
import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";
import { brand } from "@/content/brand";
import { home } from "@/content/pages/home";

export function HomeContact() {
  return (
    <Section id="contact">
      <Panel className="p-8 sm:p-10">
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
            Start a project
          </h2>
          <p className="max-w-2xl text-pretty text-sm leading-6 text-[var(--color-muted)]">
            {home.contact.line}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="/contact" variant="primary">
              Open inquiry form
            </ButtonLink>
            <a className="text-sm font-medium text-[var(--color-foreground)] hover:opacity-80" href={`mailto:${brand.contact.email}`}>
              Email instead: {brand.contact.email}
            </a>
          </div>
        </div>
      </Panel>
    </Section>
  );
}
```

- [ ] **Step 5: Build**

```powershell
cd f:\Kivox\web
npm run build
```

---

## Task 10: WorkCase + InquiryForm Migration (Panels + Field Inputs)

**Files**
- Modify: [WorkCase.tsx](file:///f:/Kivox/web/src/components/work/WorkCase.tsx)
- Modify: [InquiryForm.tsx](file:///f:/Kivox/web/src/components/inquiry/InquiryForm.tsx)

- [ ] **Step 1: WorkCase uses Panel + token colors**

```tsx
import { Panel } from "@/components/ui/Panel";

export function WorkCase({
  title,
  demonstrates,
  targetAudience,
  primaryActions,
  coreSections,
  uxDecisions,
  proofNotes,
}: {
  title: string;
  demonstrates: string;
  targetAudience: string[];
  primaryActions: string[];
  coreSections: string[];
  uxDecisions: string[];
  proofNotes: string[];
}) {
  return (
    <Panel className="p-6">
      <h2 className="text-xl font-semibold tracking-tight text-[var(--color-foreground)]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{demonstrates}</p>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <div className="text-sm font-medium text-[var(--color-foreground)]">Target audience</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
            {targetAudience.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium text-[var(--color-foreground)]">Primary actions</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
            {primaryActions.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium text-[var(--color-foreground)]">Core sections</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
            {coreSections.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium text-[var(--color-foreground)]">Key UX decisions</div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--color-muted)]">
            {uxDecisions.map((v) => (
              <li key={v}>{v}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6 border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-muted)]">
        {proofNotes.join(" · ")}
      </div>
    </Panel>
  );
}
```

- [ ] **Step 2: Refactor InquiryForm to use Field + Input/Select/Textarea + Button**

Update imports and replace inline controls:

```tsx
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
```

Replace each `<input className="...">` with `<Input ... />`, each `<select ...>` with `<Select ...>`, and `<textarea ...>` with `<Textarea ...>`.

Replace submit button with:

```tsx
<Button disabled={isDisabled} type="submit" variant="primary">
  {status.type === "submitting" ? "Sending…" : status.type === "success" ? "Sent" : "Send inquiry"}
</Button>
```

Replace helper copy with token muted:

```tsx
<div className="text-sm text-[var(--color-muted)]">We reply within 24 hours with next steps.</div>
```

- [ ] **Step 3: Build**

```powershell
cd f:\Kivox\web
npm run build
```

---

## Task 11: Header/Footer/SkipLink Token Migration

**Files**
- Modify: [Header.tsx](file:///f:/Kivox/web/src/components/site/Header.tsx)
- Modify: [Footer.tsx](file:///f:/Kivox/web/src/components/site/Footer.tsx)
- Modify: [SkipLink.tsx](file:///f:/Kivox/web/src/components/site/SkipLink.tsx)

- [ ] **Step 1: Header**

Update header chrome to use surfaces and borders from tokens:

```tsx
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { brand } from "@/content/brand";

const nav = [
  { label: "Work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-surface-0)_70%,transparent)] backdrop-blur">
      <Container className="flex items-center justify-between py-4">
        <Link className="text-sm font-semibold tracking-tight text-[var(--color-foreground)]" href="/">
          {brand.name}
        </Link>
        <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
```

- [ ] **Step 2: Footer**

Replace zinc colors with tokens:

```tsx
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { brand } from "@/content/brand";

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <div className="text-sm font-semibold tracking-tight text-[var(--color-foreground)]">
            {brand.name}
          </div>
          <div className="text-sm text-[var(--color-muted)]">{brand.locationLine}</div>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
          <div className="text-[var(--color-muted)]">Email</div>
          <div>
            <a className="text-[var(--color-foreground)] hover:opacity-80" href={`mailto:${brand.contact.email}`}>
              {brand.contact.email}
            </a>
          </div>
          <div className="text-[var(--color-muted)]">Phone</div>
          <div className="text-[var(--color-foreground)]">{brand.contact.phone}</div>
          <div className="text-[var(--color-muted)]">Social</div>
          <div className="flex items-center gap-4">
            <a className="text-[var(--color-foreground)] hover:opacity-80" href={brand.socials.linkedin} rel="noopener noreferrer" target="_blank">
              LinkedIn
            </a>
            <a className="text-[var(--color-foreground)] hover:opacity-80" href={brand.socials.instagram} rel="noopener noreferrer" target="_blank">
              Instagram
            </a>
          </div>
        </div>
        <div className="text-sm text-[var(--color-muted)]">
          <div className="flex items-center gap-4">
            <Link className="hover:text-[var(--color-foreground)]" href="/privacy">
              Privacy
            </Link>
            <Link className="hover:text-[var(--color-foreground)]" href="/terms">
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
```

- [ ] **Step 3: SkipLink**

Replace the focus styles to align with tokens:

```tsx
export function SkipLink() {
  return (
    <a
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-sm)] focus:bg-[var(--color-surface-1)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--color-foreground)] focus:shadow-[var(--shadow-2)]"
      href="#main-content"
    >
      Skip to content
    </a>
  );
}
```

- [ ] **Step 4: Build**

```powershell
cd f:\Kivox\web
npm run build
```

---

## Task 12: Verification Pass (Manual + Build)

**Files**
- None

- [ ] **Step 1: Full build**

```powershell
cd f:\Kivox\web
npm run lint
npm run build
```

- [ ] **Step 2: Manual QA checklist**

Run `npm run dev` and verify:
- Home, Work, Contact pages render without layout shifts or console errors
- `prefers-reduced-motion: reduce` disables `RouteLines` drawing (canvas should remain blank or not render)
- `?theme=light` and `?theme=dark` work in dev for QA
- No small text uses accent color directly (accent appears primarily in CTA fills / focus rings)

---

## Plan Self-Review

- Spec coverage: tokens (OKLCH), Space Grotesk weights, acid-yellow contrast rule, elevation ladder, Phase 1 algorithmic layer, Auto theme QA + dev override, React primitives decision.
- Placeholder scan: no TODO/TBD; each created/modified file includes concrete code.
- Consistency: token names used in Tailwind utilities consistently reference `--color-*` mapped in `@theme inline`.

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-05-12-kivox-visual-design-refresh-implementation-plan.md`.

Two execution options:
1) Inline Execution (recommended): execute tasks in this session.
2) Per-task Subagents: dispatch a fresh subagent per task, review between tasks.

Which approach?
