# Impeccable Critique: Kivox Homepage

**Target**: `src/app/page.tsx` → `http://localhost:3000/`
**Register**: Brand
**Date**: 2026-05-14

---

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Scroll progress bar and panel counter in Work section are excellent; no loading states visible for initial page load |
| 2 | Match System / Real World | 4 | Plain language throughout, buyer-readable, no unexplained jargon |
| 3 | User Control and Freedom | 3 | Esc dismisses menu, scroll-hijack in Work section traps the user temporarily |
| 4 | Consistency and Standards | 3 | Strong internal consistency; every section follows the same eyebrow → headline → serif italic accent formula (which is itself a problem) |
| 5 | Error Prevention | 2 | No form on homepage to evaluate; contact page form has validation but homepage has no guardrails for the Work section scroll-hijack |
| 6 | Recognition Rather Than Recall | 4 | All navigation visible, no hidden features, clear CTA paths |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts, no skip-to-section anchors beyond skip-link, scroll-hijack prevents natural scrolling through Work section |
| 8 | Aesthetic and Minimalist Design | 3 | Strong craft; the repetitive section formula and over-used pulsing dots slightly undercut the minimalist intent |
| 9 | Error Recovery | 3 | Good error handling on contact form (preserves input); homepage has no error states to evaluate |
| 10 | Help and Documentation | 2 | No contextual help; "What happens next" on contact page is good, but homepage gives no process signal before the dedicated Process section |
| **Total** | | **29/40** | **Good** |

---

## Anti-Patterns Verdict

### LLM Assessment: PASS (with caveats)

The site does not immediately read as "AI made this." The Firelit Studio identity is specific, committed, and distinctive.

However, three patterns flirt with the AI slop line:

1. Repeated tiny uppercase tracked labels above every section heading (7 instances of identical eyebrow scaffolding)
2. Formulaic section composition (every section follows the exact same eyebrow → Bricolage headline → Spectral italic accent → Figtree body template)
3. Team grid: 3 identical portrait cards (same-sized cards, same structure, same hover)

### Deterministic Scan: CLEAN

The automated detector returned []. No gradient text, no glassmorphism, no side-stripe borders, no hero-metric templates detected in markup.

---

## Overall Impression

High-craft site with a strong, distinctive identity. The Firelit Studio concept delivers. The biggest opportunity: break the formula.

## What's Working

1. The hero is genuinely distinctive (constellation canvas, word-by-word reveal, amber glow)
2. The Services accordion is the best section (3D depth-fan, perspective tilt, pulse ring)
3. Theme switching is flawless (warm-tinted OKLCH coherence in both modes)

## Priority Issues

### [P1] Repetitive Eyebrow Scaffolding
The pulsing dot + studio-eyebrow + expanding line pattern repeats 7 times across 8 sections.

### [P1] Team Section: Identical Card Grid
Three portrait cards with identical structure. Violates PRODUCT.md anti-reference #3 and DESIGN.md Don't #6.

### [P2] Work Section Scroll-Hijack Disorientation
Hijacks vertical scrolling for 5 × 100vh. Disorienting for time-poor SMB owners.

### [P2] Contact Section Missing Direct Contact Path
No email/phone visible in the HomeContact section. Footer info is visually disconnected.

### [P3] Marquee: Uppercase Mono at Large Size
Mono font at 18-20px in all-caps conflicts with "warm, approachable premium" personality.

## Persona Red Flags

**Jordan (First-Timer)**: Work section scroll-hijack is the biggest risk. Will think the page is broken.

**Casey (Distracted Mobile)**: 5-panel scroll-hijack consumes massive vertical scroll runway on mobile.

**SMB Owner "Raj"**: Needs to answer "Can they build what I need?" but Services is buried below the scroll-hijack. May leave during Work without ever seeing Services.
