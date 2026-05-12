# Kivox Studio — Visual Language (v1)

This document defines the “signature” design language for Kivox Studio across the marketing site. The goal is *not* to decorate pages, but to make every page feel authored by the same studio: consistent surfaces, consistent type rhythm, consistent motion, and consistent interaction affordances.

---

## The Signature (what makes it unmistakably “Kivox”)

### 1) Studio Surface
We use a layered surface: a clean base, a hairline grid masked to a focal region, and an optional low-opacity noise layer. This is the default container language for anything “important”.

**When to use:**
- Home hero container
- Home “Start a project” call-to-action
- Work cases
- Contact form container
- Any “note”/“policy” blocks (e.g., Proof policy)

**Variants:**
- `studio-surface` *(default)*: grid + optional noise (balanced)
- `studio-surface--quiet`: lower grid opacity, no noise (for long reading / legal)
- `studio-surface--loud`: higher grid opacity + noise (hero moments only)

**Rules:**
- Border + shadow must come from tokens (no one-off values).
- The mask must create a focal region (usually top-center or top-left).
- Prefer *fewer, larger* surfaces rather than many small boxes.

---

### 2) Studio Readout (microcopy + meta)
We use a “readout” pattern: small uppercase labels + mono values, usually inside a bordered mini-surface. It signals craft and intentionality without needing flashy visuals.

**Examples:**
- `Mode / studio`
- `Signal / clarity`
- `Output / trust`

**Rules:**
- Mono font is reserved for numbers, labels, and values—never long paragraphs.
- Readouts must always use the same spacing + border treatment.
- Readouts should be *truthy* (avoid empty “branding slogans”).

---

### 3) Motion Choreography
Motion should feel disciplined—like an editorial reveal, not UI gimmicks.

**Rules:**
- Use one easing curve site-wide: `easeOutExpo`.
- Keep movement subtle: `y <= 12px`.
- Use `viewport={{ once: true, amount: 0.35 }}` for scroll reveals.
- If `useReducedMotion()` is true, render without animation (no jitter, no half-states).

**Preferred choreography (per page):**
1) Hero headline
2) Supporting lede
3) Primary CTA / critical panel
4) Card grid stagger

---

## Page Composition Patterns

### Pattern: Editorial Header
**Eyebrow → H1/H2 → supporting paragraph → CTA group (optional)**

Rules:
- Eyebrow is muted, uppercase, tight tracking.
- Headline uses `studio-h1` or equivalent.
- Supporting paragraph uses `studio-lede` or equivalent.

---

### Pattern: Card Grid
Grid of `StudioCard` (or `Panel interactive` where appropriate), with consistent padding, hover lift, and focus ring.

Rules:
- All clickable cards must have a focus-visible ring.
- All cards share the same hover lift + shadow transition.

---

## Don’ts
- No zinc palette classes (`zinc-*`).
- No one-off hover/focus styles (must be tokens and reusable components).
- No large motion distances or multiple easing curves.
- No “more boxes” to solve layout problems—use section rhythm and fewer surfaces.

