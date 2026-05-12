# Kivox Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Kivox studio website (Home + Work + Contact + Privacy + Terms) with a production-ready inquiry flow, SEO foundations, and a craft-forward UI that matches the approved copy and proof system.

**Architecture:** Next.js App Router under `web/`. Content lives in file-based modules under `web/src/content/` (no hardcoded long copy inside components). Pages are mostly server-rendered; client components are limited to form handling, motion, and analytics.

**Tech Stack:** Next.js (App Router) + TypeScript + Tailwind + CSS Modules (section visuals) + Zod + React Hook Form + Resend + PostHog + Motion + lucide-react.

---

## Pre-Implementation Checks (Do Before Task 1)

- Confirm Node.js and npm are available on the machine doing implementation.
- Confirm the domain email stack is ready (Resend can be configured later, but env vars must exist).
- Confirm the “real at launch” contact data (email/phone/address/social links) is ready to be written into content modules.

---

## Target File Structure

```text
web/
  package.json
  next.config.ts
  src/
    app/
      layout.tsx
      page.tsx
      work/page.tsx
      contact/page.tsx
      privacy/page.tsx
      terms/page.tsx
      robots.ts
      sitemap.ts
      api/inquiry/route.ts
    content/
      brand.ts
      navigation.ts
      seo/
        home.ts
      pages/
        home.ts
        work.ts
        contact.ts
        legal.ts
      work/
        studio-work-policy.ts
        hospital.ts
        cafe.ts
        hotel.ts
        school.ts
        fitness.ts
    components/
      site/
        Header.tsx
        Footer.tsx
        SkipLink.tsx
      sections/
        HomeHero.tsx
        HomeServices.tsx
        HomeWorkPreview.tsx
        HomeProcess.tsx
        HomeContact.tsx
      work/
        WorkGrid.tsx
        WorkCase.tsx
      inquiry/
        InquiryForm.tsx
    features/
      inquiry/
        inquiry.schema.ts
        inquiry.types.ts
        submitProjectInquiry.ts
        adapters/
          resendAdapter.ts
          devLogAdapter.ts
    lib/
      env.ts
      metadata.ts
      structuredData.ts
      analytics/
        posthog.ts
        events.ts
    styles/
      globals.css
```

---

## Task 1: Scaffold Next.js App in `web/`

**Files:**
- Create: `f:/Kivox/web/*`

- [ ] **Step 1: Create Next.js app**

Run from repo root:

```bash
npm create next-app@latest web -- --ts --app --eslint --tailwind --src-dir --import-alias "@/*"
```

- [ ] **Step 2: Add repo-level ignores**

Ensure repo `.gitignore` includes:

```gitignore
web/.next/
web/out/
web/node_modules/
.superpowers/
```

- [ ] **Step 3: Smoke check**

```bash
cd web
npm run dev
```

Expected: Next dev server starts and default page renders.

- [ ] **Step 4: Commit**

```bash
git add web .gitignore
git commit -m "chore: scaffold web app"
```

---

## Task 2: Install Required Dependencies (Minimal)

**Files:**
- Modify: `web/package.json`

- [ ] **Step 1: Install runtime deps**

```bash
cd web
npm i zod react-hook-form @hookform/resolvers resend posthog-js lucide-react motion
```

- [ ] **Step 2: Commit**

```bash
git add web/package.json web/package-lock.json
git commit -m "chore: add core dependencies"
```

---

## Task 3: Add Environment Contract

**Files:**
- Create: `web/src/lib/env.ts`
- Create: `web/.env.example`

- [ ] **Step 1: Create `.env.example`**

```env
NEXT_PUBLIC_SITE_URL=https://kivox.in

RESEND_API_KEY=
INQUIRY_TO_EMAIL=
INQUIRY_FROM_EMAIL=

NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
```

- [ ] **Step 2: Create `env.ts`**

```ts
export function getRequiredServerEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing server env: ${name}`);
  return v;
}

export function getOptionalPublicEnv(name: string): string | undefined {
  return process.env[name];
}

export function isAnalyticsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
}
```

- [ ] **Step 3: Commit**

```bash
git add web/.env.example web/src/lib/env.ts
git commit -m "chore: add env contract"
```

---

## Task 4: Move Approved Content into Typed Modules

**Files:**
- Create: `web/src/content/pages/home.ts`
- Create: `web/src/content/pages/legal.ts`
- Create: `web/src/content/pages/work.ts`
- Create: `web/src/content/pages/contact.ts`
- Create: `web/src/content/work/*.ts`
- Create: `web/src/content/brand.ts`
- Create: `web/src/content/seo/home.ts`

- [ ] **Step 1: Create `brand.ts` (placeholders allowed during build; must be replaced with real values before launch)**

```ts
export const brand = {
  name: "Kivox",
  tagline: "Make your business easier to trust online.",
  locationLine: "Based in Bengaluru. Serving businesses across India.",
  contact: {
    email: "hello@kivox.in",
    phone: "+91 80 0000 0000",
    address: "Bengaluru, Karnataka, India",
  },
  socials: {
    instagram: "https://instagram.com/kivox",
    linkedin: "https://linkedin.com/company/kivox",
    github: "https://github.com/kivox",
  },
};
```

- [ ] **Step 2: Create `pages/home.ts` from `f:/Kivox/docs/drafts/content/homepage.md`**

```ts
export const home = {
  hero: {
    headline: "Make your business easier to trust online.",
    subhead:
      "Kivox designs and builds websites, web apps, and backend-enabled workflows that help customers understand you fast — and take the next step with confidence.",
    ctas: {
      primary: "Start a project",
      secondary: "View studio work",
    },
  },
  services: [
    {
      id: "websites-web-apps",
      title: "Websites & Web Apps",
      summary:
        "High-craft websites and web apps that make your offer clear and your next step obvious.",
    },
    {
      id: "ui-ux-redesign",
      title: "UI/UX Redesign",
      summary:
        "Fix what’s unclear: structure, usability, design, performance, and conversion paths.",
    },
    {
      id: "seo-ai-search-readiness",
      title: "SEO & AI Search Readiness",
      summary:
        "Technical and content foundations that help you show up for real searches — and be understandable to AI answers.",
    },
    {
      id: "brand-identity",
      title: "Brand Identity",
      summary:
        "Naming, messaging, and visual systems that make your business feel as good online as it is offline.",
    },
    {
      id: "backend-enabled-systems",
      title: "Backend-Enabled Systems (select)",
      summary:
        "Portals, dashboards, catalogs, inquiry workflows, and internal tools — built only when the business needs them.",
    },
    {
      id: "android-apps",
      title: "Android Apps (select)",
      summary:
        "When mobile access is truly necessary — not as a default upsell.",
    },
  ],
  workPreview: {
    label: "Studio Demonstrations",
    summary:
      "Realistic projects built by Kivox to show how we structure, design, and build for trust and action.",
  },
  process: [
    "Understand the business and the customer decision.",
    "Fix the structure: pages, content order, and calls to action.",
    "Design the interface with craft and clarity.",
    "Build it fast, responsive, and maintainable.",
    "Launch, measure, and iterate.",
  ],
  contact: {
    line:
      "Tell us what you’re building. We reply within 24 hours with next steps and the few details we need to scope it right.",
  },
};
```

- [ ] **Step 3: Create Work policy + demo data**

Use `f:/Kivox/docs/drafts/work/*.md` as source. Keep as short structured data (no long essays).

- [ ] **Step 4: Create `seo/home.ts` from selected metadata**

```ts
export const homeSeo = {
  title: "Kivox | Make Your Business Easier to Trust Online",
  description:
    "Kivox designs and builds websites, web apps, and backend-enabled workflows that make your business easier to trust online — and easier to choose.",
  canonicalPath: "/",
};
```

- [ ] **Step 5: Commit**

```bash
git add web/src/content
git commit -m "feat: add typed content modules"
```

---

## Task 5: Build Site Shell (Layout + Header/Footer)

**Files:**
- Modify: `web/src/app/layout.tsx`
- Create: `web/src/components/site/Header.tsx`
- Create: `web/src/components/site/Footer.tsx`
- Create: `web/src/components/site/SkipLink.tsx`
- Modify: `web/src/styles/globals.css`

- [ ] **Step 1: Add global typography + base styles**
  - Use Tailwind base and a small set of global rules.
  - Keep it minimal; avoid adding a UI kit.
- [ ] **Step 2: Create header nav with anchors**
  - Work, Services, Process, Contact.
- [ ] **Step 3: Create footer with real contact + socials**
  - Must be real at launch per `DEFINITION_OF_READY.md`.
- [ ] **Step 4: Commit**

```bash
git add web/src/app/layout.tsx web/src/components/site web/src/styles/globals.css
git commit -m "feat: add site shell"
```

---

## Task 6: Implement Pages (Home / Work / Contact / Privacy / Terms)

**Files:**
- Modify: `web/src/app/page.tsx`
- Create: `web/src/app/work/page.tsx`
- Create: `web/src/app/contact/page.tsx`
- Create: `web/src/app/privacy/page.tsx`
- Create: `web/src/app/terms/page.tsx`
- Create: `web/src/components/sections/*`
- Create: `web/src/components/work/*`

- [ ] **Step 1: Home page sections**
  - Render content from `content/pages/home.ts`.
  - Keep sections simple: typography, spacing, clear CTAs.
- [ ] **Step 2: Work page**
  - Grid of Studio Demonstrations and detail view strategy:
    - Option A: single Work page with expandable sections
    - Option B: `work/[slug]` pages
  - Pick A for launch to keep scope tight.
- [ ] **Step 3: Contact page**
  - Include inquiry form + direct email/phone.
- [ ] **Step 4: Privacy and Terms pages**
  - Render content from `content/pages/legal.ts` (source from `f:/Kivox/LEGAL/*.md`).
- [ ] **Step 5: Commit**

```bash
git add web/src/app web/src/components/sections web/src/components/work
git commit -m "feat: add core pages"
```

---

## Task 7: Inquiry Feature (Client Form + Server Route + Resend)

**Files:**
- Create: `web/src/features/inquiry/inquiry.schema.ts`
- Create: `web/src/features/inquiry/inquiry.types.ts`
- Create: `web/src/features/inquiry/submitProjectInquiry.ts`
- Create: `web/src/features/inquiry/adapters/resendAdapter.ts`
- Create: `web/src/features/inquiry/adapters/devLogAdapter.ts`
- Create: `web/src/components/inquiry/InquiryForm.tsx`
- Create: `web/src/app/api/inquiry/route.ts`

- [ ] **Step 1: Define schema (Zod) matching `f:/Kivox/docs/drafts/content/inquiry.md`**
  - Ensure phone is required.
- [ ] **Step 2: Build client form (React Hook Form)**
  - Validation messages must be clear.
  - No sending PII to analytics.
- [ ] **Step 3: Implement API route**
  - Validate server-side with Zod.
  - Apply honeypot + minimum time checks.
  - Use Resend adapter in production; devLog in local env if Resend key missing.
- [ ] **Step 4: Commit**

```bash
git add web/src/features web/src/components/inquiry web/src/app/api/inquiry/route.ts
git commit -m "feat: add inquiry flow"
```

---

## Task 8: SEO Foundations (Metadata + robots + sitemap + JSON-LD)

**Files:**
- Create: `web/src/lib/metadata.ts`
- Create: `web/src/lib/structuredData.ts`
- Modify: `web/src/app/layout.tsx`
- Create: `web/src/app/robots.ts`
- Create: `web/src/app/sitemap.ts`

- [ ] **Step 1: Implement metadata defaults**
  - Use `NEXT_PUBLIC_SITE_URL` for `metadataBase`.
  - Apply selected title/description from `content/seo/home.ts`.
- [ ] **Step 2: Add robots + sitemap**
  - Include only launch pages.
- [ ] **Step 3: Add JSON-LD**
  - Organization/ProfessionalService graph using real contact info.
  - Must match visible content.
- [ ] **Step 4: Commit**

```bash
git add web/src/lib web/src/app/robots.ts web/src/app/sitemap.ts
git commit -m "feat: add seo foundations"
```

---

## Task 9: Analytics (Required, Safe Defaults)

**Files:**
- Create: `web/src/lib/analytics/events.ts`
- Create: `web/src/lib/analytics/posthog.ts`
- Modify: `web/src/app/layout.tsx`

- [ ] **Step 1: Create stable event names**
  - Track only intent: CTA clicks, work clicks, form started/submitted/failed.
- [ ] **Step 2: Only enable when `NEXT_PUBLIC_ENABLE_ANALYTICS=true`**
  - Default off locally and in previews.
- [ ] **Step 3: Commit**

```bash
git add web/src/lib/analytics web/src/app/layout.tsx
git commit -m "feat: add analytics"
```

---

## Task 10: Visual QA + Accessibility + Performance Pass

**Files:**
- Modify: whichever UI files need tweaks

- [ ] **Step 1: Responsive review**
  - Mobile / tablet / desktop: no overlap, no cramped typography.
- [ ] **Step 2: Keyboard review**
  - Visible focus states and skip link works.
- [ ] **Step 3: Lighthouse sanity pass**
  - Performance and accessibility are reasonable for launch.
- [ ] **Step 4: Build verification**

```bash
cd web
npm run lint
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: qa pass"
```

---

## Self-Review Checklist (Plan Quality)

- Spec coverage: This plan implements Home/Work/Contact/Privacy/Terms, studio demonstrations, inquiry policy (phone required, 24h reply), SEO roadmap start, and real launch-contact requirements.
- Placeholder scan: No “TODO/TBD” steps required to execute; every task lists concrete file paths and commands.
- Consistency: The hero headline and metadata are aligned with the approved direction.
