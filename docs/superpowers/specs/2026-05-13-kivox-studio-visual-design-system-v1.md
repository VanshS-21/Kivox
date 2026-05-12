# Kivox Studio Visual Design System v1 (MadeByCat-inspired)

**Status:** Approved (by user)  
**Date:** 2026-05-13  
**Scope:** Full site (Home / Work / Contact / Privacy / Terms)  
**Theme:** Light + Dark (System default) + user toggle (System/Light/Dark)  
**Media:** CSS-only (no generated image/video in this iteration)  
**Motion:** High (but disciplined) with strict `prefers-reduced-motion` support

---

## 1) Goal
Make the Kivox marketing site feel premium and intentionally designed (inspired by madebycat.com’s craft discipline, without copying layouts or assets). The site should communicate **craft + clarity → action** through typography, surfaces, rhythm, and restrained “signature” visual treatment.

---

## 2) What “done” looks like (Acceptance Criteria)
- The site no longer reads as “default Tailwind cards + zinc palette.”
- Light and dark themes both look bespoke and cohesive.
- Buttons, panels/cards, and form fields share consistent styling and interaction states across all pages.
- Hero and key sections have deliberate composition and rhythm (spacing + reading widths).
- Signature layer (noise + hairline grid) is visible but subtle and does not harm readability.
- Motion feels premium, not gimmicky; reduced-motion users see a clean, static experience.
- Performance remains strong (no heavy client JS added solely for visuals).

---

## 3) Design Principles (Non-negotiables)
1. **Typography-led hierarchy:** big type, confident weights, disciplined tracking, controlled line-length.
2. **Fewer surfaces, more intention:** a small, consistent elevation ladder beats many ad-hoc borders.
3. **Lighting, not color:** accent is used sparingly; premium feel comes from contrast/shading.
4. **Composition over decoration:** layout, grid, and spacing first; effects second.
5. **Motion is functional:** reinforces hierarchy and interactivity; never distracts; always reduced-motion safe.

---

## 4) System Architecture
We will implement a token-first system in CSS variables and use those tokens everywhere via Tailwind v4’s `@theme inline` bridge.

**Core layers:**
1. **Tokens:** `web/src/app/globals.css` defines variables for color/surfaces/borders/shadows/radii.
2. **Primitives:** small React components (Button/Panel/Field/etc.) that enforce consistency.
3. **Page composition:** sections use primitives + a shared rhythm system (`Container`, `Section`).
4. **Motion:** centralized motion presets; components opt into consistent animations.

---

## 5) Tokens (Light + Dark)
### 5.1 Required token categories
- **Color:** background/foreground/muted, surface-0..3, border, accent, accent-ink
- **Shadow:** shadow-1, shadow-2 (tuned per theme)
- **Radii:** radius-sm/md/lg
- **Typography:** already mapped via `--font-*` (Space Grotesk + Geist Mono)

### 5.2 Token usage rules
- Components should avoid hard-coded `zinc-*` as the primary system.
- Use tokens (via Tailwind theme mapping) for:
  - backgrounds and surfaces
  - borders and rings
  - muted text and separators
  - shadows
- `zinc-*` is allowed only for exceptional cases (e.g., debug or transitional code), not as a palette.

---

## 6) Signature Layer: Noise + Hairline Grid (CSS-only)
### 6.1 Intent
Add a subtle “studio” finish that raises perceived craft:
- micro-noise to prevent “flat” surfaces
- hairline grid to imply structure and systems thinking

### 6.2 Application rules
- Apply primarily to:
  - Hero background (Home)
  - Select section panels (e.g., Work preview band / Contact intake)
- Keep opacity extremely low.
- Ensure contrast stays strong; prioritize readability.
- In dark mode, reduce opacity further to avoid “dirty” blacks.

### 6.3 Implementation approach (recommended)
- A pseudo-element overlay on a wrapper (not on every card):
  - `background-image` with layered gradients:
    - grid via repeating-linear-gradient (1px lines)
    - noise via a tiny inline SVG data-url or CSS noise approximation
- Gate any animated noise behind reduced-motion (prefer static in this iteration).

---

## 7) Component Primitives (v1 set)
### 7.1 Button
Variants:
- Primary (accent fill, dark text)
- Secondary (surface + border)
- Ghost (text-only)

States:
- Hover: subtle lift + lighting (shadow + slight bg shift)
- Active: compress slightly (translate-y or shadow reduction)
- Focus-visible: strong ring using accent token

### 7.2 Panel (Card surface)
Base:
- surface-1 background
- border token
- shadow-1
- radius-md
- consistent padding scale

States:
- Hover: shadow increases (shadow-2), optional subtle translate

### 7.3 Field (form control styling)
Inputs/select/textarea:
- surface background + border + radius
- focus ring via accent
- error states: error border + error text (tokened)

### 7.4 Label / Eyebrow
Small caps / mono-ish label style:
- used for section intros (“Studio Demonstrations”)
- consistent tracking and muted color

---

## 8) Page Composition Requirements
### 8.1 Shared rhythm
- Use `Container` and `Section` to normalize widths and spacing.
- Text blocks should respect readable line lengths (max-w rules).

### 8.2 Home
- Hero becomes an editorial “console”:
  - stronger headline scale
  - CTA group styled as a system
  - signature background layer
- Services: cards become Panels with improved hierarchy
- Work preview: panels + richer hover
- Process: steps read like a designed system (numbers + labels)
- Contact: “intake panel” feel (premium framed block)

### 8.3 Work
- Cases become “case study panels”:
  - clearer labels and structure
  - better spacing between sub-sections
  - hover/expand affordances feel premium

### 8.4 Contact
- Form layout is clean, comfortable, and consistent with Field primitive
- Success/error feedback feels “designed”, not default alerts

### 8.5 Legal
- Typography system applied:
  - heading scale
  - list styling
  - section rhythm
  - reading width constraints

---

## 9) Motion System (High, disciplined)
### 9.1 Global rules
- Prefer short distances, strong easing, no bouncy motion.
- Stagger within sections (subtle).
- Avoid scroll-jank (no heavy parallax).

### 9.2 Reduced motion
If `prefers-reduced-motion: reduce`:
- No enter reveals, no hovering transforms that imply motion.
- Keep only essential state changes (focus ring, color changes).

### 9.3 Motion targets
- Hero elements: staggered entrance (headline → subhead → CTAs)
- Cards/panels: hover lift + shadow interpolation
- Section headings: gentle reveal

---

## 10) Implementation Constraints
- CSS-only media in this iteration (no Seedream/Seedance/Canvas required).
- Theme toggle exists and must look integrated (not “bolted on”).
- Maintain strong accessibility:
  - focus visible everywhere
  - contrast guardrails in light/dark

---

## 11) QA Checklist
- Visual QA:
  - Light + Dark theme: hero, cards, footer, contact form
  - Mobile/tablet/desktop spacing and rhythm
  - No “random” radii, borders, or shadows
- Accessibility:
  - tab through header → CTAs → cards → footer (visible focus)
  - reduced-motion experience is clean
- Performance:
  - no large client-only bundles introduced just for visuals

