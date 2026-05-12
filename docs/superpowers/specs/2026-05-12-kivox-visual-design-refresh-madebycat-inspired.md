---
title: Kivox Visual Design Refresh (MadeByCat-Inspired)
date: 2026-05-12
status: draft
scope: web
---

## Summary

This spec defines a new visual design system for the Kivox marketing site, inspired by the craft, typography, motion discipline, and premium surface treatment seen on madebycat.com, without copying layouts or artwork. The result is a bespoke Kivox system that remains maintainable in code (Tailwind v4 + CSS variables) and works in both light and dark via Auto (system) theme.

## Goals

- Make the site feel premium, contemporary, and intentionally designed rather than “Tailwind default”.
- Establish a reusable token-first system (colors, type, spacing, radii, shadows) that scales across pages.
- Improve hierarchy, rhythm, and composition across all sections (home, work, services, process, contact, legal).
- Introduce restrained motion that enhances perceived quality and clarity, with strict reduced-motion support.
- Add bespoke hero media layers (image/video/algorithmic accent) that are lightweight and optional.

## Non-Goals

- Reproduce madebycat.com layouts, components, copy, or assets.
- Introduce a heavy UI kit or large client-side framework beyond what is already used.
- Add a complex theme switcher UI unless later requested (Auto theme is the default).

## Current State (Code Constraints)

- Next.js app using Tailwind CSS v4 via [globals.css](file:///f:/Kivox/web/src/app/globals.css).
- Styling is primarily utility classes; very few shared primitives, leading to duplication.
- Pages repeat the same container/background primitives: [page.tsx](file:///f:/Kivox/web/src/app/page.tsx), [work/page.tsx](file:///f:/Kivox/web/src/app/work/page.tsx), [contact/page.tsx](file:///f:/Kivox/web/src/app/contact/page.tsx).
- Global shell: [layout.tsx](file:///f:/Kivox/web/src/app/layout.tsx) with [Header](file:///f:/Kivox/web/src/components/site/Header.tsx) and [Footer](file:///f:/Kivox/web/src/components/site/Footer.tsx).

## Design Principles

- Typography-led hierarchy: large type, disciplined weights, strong line-length control, deliberate tracking.
- Fewer surfaces, more intention: use 2–3 surface elevations with subtle borders and realistic shadow.
- “Lighting, not color”: the accent is used sparingly; most premium feel comes from contrast and shading.
- Composition over decoration: use structure, grid, and spacing before adding visuals.
- Motion is functional: transitions help scan/understand; never distract; always respects reduced-motion.

## Brand System

### Theme Mode

- Default: Auto (system), derived from `prefers-color-scheme`.
- No manual toggle in this iteration.

### Typography

- Primary: Space Grotesk (Google) loaded via `next/font/google`.
- Load only weights 400, 500, 700 (avoid loading the full variable range).
- Use weight range to create editorial contrast:
  - Display/headlines: heavier weights with tighter tracking.
  - Body: regular weight with comfortable line-height.
  - Labels/meta: smaller size with letter spacing for “studio system” feel.

### Accent Color

- Primary accent family: acid yellow.
- Usage:
  - Primary CTA fill / highlight
  - Focus rings and focus-visible outlines
  - Link hover / underline accents
  - Subtle glow in dark mode (very restrained)
- Avoid: large backgrounds, long text blocks in accent, or multiple competing accents.
- Contrast guardrail:
  - Accent color is never used for text smaller than 24px on light surfaces unless it sits on a dark-enough background behind it.

## Tokens (CSS Variables + Tailwind v4 Bridge)

Tokens are defined as CSS variables in `:root`, with light/dark mappings, and exposed to Tailwind utilities via `@theme inline`.

### Token Categories

- Color: background, foreground, muted, surfaces (1–3), borders, overlay, accent, accent-contrast
- Typography: font families (already bridged), base sizes, tracking defaults (via utility conventions)
- Radii: subtle and signature radii
- Shadow: 2–3 levels tuned per theme
- Spacing: section rhythm and container paddings

### Implementation Approach

- Expand [globals.css](file:///f:/Kivox/web/src/app/globals.css) to include:
  - Neutral but characterful base background in light (cool-neutral off-white), not pure white
  - Elevated surfaces that read as “panels” in both themes
  - Border color that is visible but quiet
  - Selection background tuned to the new system
- Map tokens into Tailwind via `@theme inline` so components use token-backed utilities instead of hard-coded `zinc-*`.

## Layout System

### Container & Rhythm

- Introduce a `Container` primitive to replace repeated `mx-auto w-full max-w-* px-6`.
- Standardize vertical rhythm with a `Section` primitive (base paddings + section spacing).
- Apply composition rules:
  - Constrain reading width for text blocks
  - Allow occasional full-bleed backgrounds for hero or divider bands
- Implementation decision:
  - `Container` and `Section` are React components (`<Container>`, `<Section>`) to enforce consistency and avoid parallel patterns.

### Surface Elevation Ladder

- Surface 0: page background
- Surface 1: cards/panels (barely lifted)
- Surface 2: modals/drawers (clearly elevated)
- Surface 3: tooltips/popovers (top-most)

### Signature Surfaces

- Primary content blocks use a “panel” treatment:
  - Subtle border
  - Realistic shadow
  - Slightly lifted background
  - Optional noise/texture overlay (CSS only)

## Component System (Primitives)

### Button

- Variants:
  - Primary (accent fill)
  - Secondary (surface + border)
  - Ghost (text only)
- States:
  - Hover: subtle lift + lighting
  - Active: compress slightly
  - Focus-visible: strong, consistent focus ring using accent token
- Reduce duplication across:
  - Home hero CTA
  - Home contact CTA
  - Inquiry form submit

### Card / Panel

- Base: panel surface with border + shadow and consistent padding/radius.
- Optional header slot: label + title + meta.
- Used for:
  - Work case cards
  - Service cards
  - Process step cards
  - Contact/inquiry container

### Field (Input/Select/Textarea)

- A consistent form field system:
  - Labels, descriptions, errors
  - Focus states using accent token
  - Disabled states that remain legible

## Page-Level Design Notes

### Home

- Hero becomes a designed “editorial console”:
  - Strong typography stack
  - High-signal CTA group
  - Optional media layers behind/alongside the content
- Sections gain clear framing:
  - Better section labels
  - Consistent dividers
  - More deliberate spacing and alignment

### Work

- Work cards become more “case study”:
  - Label chip, title, short premise
  - Structured blocks for target audience / actions / decisions
  - Optional thumbnail treatment (if/when Seedream assets are added)

### Services / Process

- Cards move from plain bordered boxes to panel system.
- Improve hierarchy and scanning:
  - Stronger headings
  - Better microcopy spacing
  - Better hover affordances

### Contact

- Inquiry section becomes an “intake panel”:
  - Cleaner inputs
  - Stronger CTA
  - Clear success/error states

### Legal Pages

- Keep simple but match typography system and reading rhythm.

## Media Layers (Skills)

These are optional enhancements; the site must remain premium without them.

### Scope by Phase

- Phase 1 (this spec): algorithmic canvas layer only (no external asset dependency).
- Phase 2 (separate follow-up): Seedream illustration + Seedance loop, once assets are generated and optimized.

### Seedream (Hero Illustration)

- Generate a bespoke abstract illustration:
  - “route board / studio console energy”
  - premium lighting, subtle grain
  - not stock-tech, not product UI screenshots
- Deliver as optimized image, used in hero and/or work cards.

### Seedance (Ambient Loop)

- Generate a subtle, slow-moving background loop:
  - grain drift + faint accent glow
  - low frequency motion
- Gated behind reduced-motion:
  - do not render/play if `prefers-reduced-motion: reduce`

### Algorithmic Art (Decorative Layer)

- Lightweight route-lines / flow-lines canvas layer:
  - static or very slow animation
  - disabled on reduced-motion

## Accessibility & Performance Requirements

- Must support `prefers-reduced-motion: reduce` by removing non-essential animations and video playback.
- Maintain strong contrast for text in both light and dark.
- Visible focus styles everywhere (`:focus-visible`) using the accent token.
- No heavy client-side JS added solely for visuals.
- Media assets:
  - Lazy-load where appropriate
  - Avoid layout shift
  - Use modern formats and compression
- Auto theme QA:
  - Manually QA both light and dark themes since users cannot switch in-browser.
  - Add a dev-only `?theme=dark|light` override for review and screenshots (must not ship publicly unless later requested).

## Acceptance Criteria

- Site looks cohesive and premium across home/work/contact and section routes.
- No page uses raw `zinc-*` palette as the primary system; token-backed colors are in use.
- Buttons, panels, and fields share consistent styling and interactions.
- Reduced-motion mode removes ambient video and algorithmic animation, while preserving layout.
- Lighthouse (or equivalent) remains performant; no new obvious performance regressions.
