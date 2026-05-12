# Kivox Web Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the `web/` Next.js app for the Kivox website and verify the dev server runs.

**Architecture:** Next.js App Router in `web/` using TypeScript + Tailwind. The scaffold should be a clean base for adding file-based content modules and pages in subsequent tasks.

**Tech Stack:** Node.js + npm + Next.js (App Router) + TypeScript + Tailwind + ESLint.

---

## Pre-Implementation Checks (Do Before Task 1)

- [ ] Confirm Node.js and npm are available:

```bash
node -v
npm -v
```

Expected: both commands print versions (not “command not found”).

---

## Target File Structure (After This Plan)

```text
f:/Kivox/
  .gitignore
  docs/
  web/
    package.json
    next.config.ts
    src/
      app/
        layout.tsx
        page.tsx
      styles/
        globals.css
```

---

### Task 1: Scaffold Next.js App in `web/`

**Files:**
- Create: `f:/Kivox/web/*`

- [ ] **Step 1: Create Next.js app**

Run from repo root:

```bash
npm create next-app@latest web -- --ts --app --eslint --tailwind --src-dir --import-alias "@/*"
```

- [ ] **Step 2: Verify `web/` looks correct**

Confirm these exist:

```text
web/package.json
web/next.config.ts
web/src/app/page.tsx
```

- [ ] **Step 3: Commit**

If commits are allowed in this workspace:

```bash
git add web
git commit -m "chore: scaffold web app"
```

---

### Task 2: Add Repo-Level `.gitignore`

**Files:**
- Create: `f:/Kivox/.gitignore`

- [ ] **Step 1: Create `f:/Kivox/.gitignore`**

Set file contents to:

```gitignore
web/.next/
web/out/
web/node_modules/
.superpowers/
```

- [ ] **Step 2: Commit**

If commits are allowed in this workspace:

```bash
git add .gitignore
git commit -m "chore: add repo ignores"
```

---

### Task 3: Smoke Check Dev Server

**Files:**
- none

- [ ] **Step 1: Install dependencies**

```bash
cd web
npm install
```

- [ ] **Step 2: Start dev server**

```bash
npm run dev
```

Expected: terminal prints a local URL and the default Next.js page renders.

- [ ] **Step 3: Run lint + typecheck**

```bash
npm run lint
npm run build
```

Expected: both commands succeed.

