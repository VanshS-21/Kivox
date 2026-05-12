# Kivox Theme Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a user-facing theme toggle (System / Light / Dark) in the header, persist preference across visits, and avoid theme “flash” on first paint.

**Architecture:** The theme system is already implemented using CSS variables in `web/src/app/globals.css`, with overrides via `:root[data-theme="light"]` / `:root[data-theme="dark"]`. We will store a user preference in `localStorage` (`kivox-theme`) and apply it early via an inline script in `layout.tsx` (pre-hydration). A small client component in the header will cycle through theme states and update `document.documentElement.dataset.theme`.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind, lucide-react.

---

## Target Files

Create:
- `web/src/lib/theme.ts`
- `web/src/lib/themeScript.ts`
- `web/src/components/site/ThemeToggle.tsx`

Modify:
- `web/src/app/layout.tsx`
- `web/src/components/site/Header.tsx`

---

## Task 1: Add shared theme utilities (`theme.ts`)

**Files:**
- Create: `web/src/lib/theme.ts`

- [ ] **Step 1: Create `theme.ts`**

```ts
export type ThemePreference = "system" | "light" | "dark";

export const THEME_STORAGE_KEY = "kivox-theme";

export function isThemePreference(v: unknown): v is ThemePreference {
  return v === "system" || v === "light" || v === "dark";
}

export function getStoredThemePreference(): ThemePreference | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (isThemePreference(raw)) return raw;
    return null;
  } catch {
    return null;
  }
}

export function setStoredThemePreference(v: ThemePreference): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, v);
  } catch {
    // ignore write errors (privacy mode, blocked storage, etc.)
  }
}

export function applyThemePreference(v: ThemePreference): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;

  if (v === "system") {
    delete root.dataset.theme;
    return;
  }

  root.dataset.theme = v;
}

export function nextThemePreference(v: ThemePreference): ThemePreference {
  if (v === "system") return "light";
  if (v === "light") return "dark";
  return "system";
}
```

- [ ] **Step 2: Quick typecheck sanity**

Run:

```bash
cd web
npm run lint
```

Expected: lint succeeds (or at least no new errors from `theme.ts`).

---

## Task 2: Add pre-hydration theme init script (`themeScript.ts`)

**Files:**
- Create: `web/src/lib/themeScript.ts`

- [ ] **Step 1: Create `themeScript.ts`**

This script must:
- read `localStorage["kivox-theme"]`
- if `"light"` or `"dark"`: set `document.documentElement.dataset.theme`
- else: remove the dataset key so CSS `prefers-color-scheme` drives the theme

```ts
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
```

---

## Task 3: Inject theme init script in `layout.tsx`

**Files:**
- Modify: `web/src/app/layout.tsx`

- [ ] **Step 1: Import and render the script early**

Edit `layout.tsx` to import `themeInitScript` and render:

```tsx
<script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
```

Place it **before** any content that paints (inside `<body>` but before header/main), so the dataset is set ASAP.

Patch to apply (illustrative; keep existing content and ordering, only add what’s needed):

```tsx
import { themeInitScript } from "@/lib/themeScript";
```

And in the returned JSX:

```tsx
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <DevThemeOverride />
        <SkipLink />
        <Header />
        ...
```

- [ ] **Step 2: Lint**

Run:

```bash
cd web
npm run lint
```

Expected: lint succeeds.

---

## Task 4: Build the user-facing toggle component (`ThemeToggle.tsx`)

**Files:**
- Create: `web/src/components/site/ThemeToggle.tsx`

- [ ] **Step 1: Create the component**

Requirements:
- Client component (`"use client"`)
- Default preference is `"system"`
- On mount: read stored preference, apply it, and set state
- On click: cycle to next state, apply + persist
- Accessible label reflecting state and next action
- Use lucide icons: `Monitor`, `Sun`, `Moon`

```tsx
"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  applyThemePreference,
  getStoredThemePreference,
  nextThemePreference,
  setStoredThemePreference,
  type ThemePreference,
} from "@/lib/theme";

function getLabel(v: ThemePreference): { current: string; next: string } {
  const next = nextThemePreference(v);
  return {
    current: v === "system" ? "System" : v === "light" ? "Light" : "Dark",
    next: next === "system" ? "System" : next === "light" ? "Light" : "Dark",
  };
}

export function ThemeToggle() {
  const [pref, setPref] = useState<ThemePreference>("system");

  useEffect(() => {
    const stored = getStoredThemePreference();
    const initial = stored ?? "system";
    setPref(initial);
    applyThemePreference(initial);
  }, []);

  const { current, next } = useMemo(() => getLabel(pref), [pref]);

  function onClick() {
    const n = nextThemePreference(pref);
    setPref(n);
    setStoredThemePreference(n);
    applyThemePreference(n);
  }

  const Icon = pref === "system" ? Monitor : pref === "light" ? Sun : Moon;

  return (
    <button
      aria-label={`Theme: ${current}. Click to switch to ${next}.`}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:text-zinc-100 dark:hover:bg-zinc-900"
      onClick={onClick}
      type="button"
    >
      <Icon aria-hidden className="h-4 w-4" />
    </button>
  );
}
```

---

## Task 5: Add the toggle to the header (desktop)

**Files:**
- Modify: `web/src/components/site/Header.tsx`

- [ ] **Step 1: Render the toggle in the header**

Update the header layout so the nav and toggle sit on the right side:
- Keep nav hidden on small screens (`sm:flex`) as it is now.
- Show toggle on all sizes (or at least `sm:flex`) — pick one:
  - Recommended: show on all sizes, since it’s just a single button.

Example change:

```tsx
import { ThemeToggle } from "@/components/site/ThemeToggle";
```

And in JSX:

```tsx
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-6 sm:flex" aria-label="Primary">
            ...
          </nav>
          <ThemeToggle />
        </div>
```

---

## Task 6: Verification

**Files:**
- (No new files required)

- [ ] **Step 1: Lint**

```bash
cd web
npm run lint
```

Expected: PASS

- [ ] **Step 2: Build**

```bash
cd web
npm run build
```

Expected: PASS

- [ ] **Step 3: Manual QA**
- Start dev server: `cd web && npm run dev`
- Visit:
  - `/` then toggle themes, confirm the UI updates.
  - Refresh: confirm preference persists.
  - Switch to “System”: confirm it follows OS theme again.

---

## Self-Review Checklist
- No theme “flash” on first paint (script runs before hydration).
- Toggle cycles System → Light → Dark → System and persists.
- Does not break dev-only `?theme=light|dark` override in development.

