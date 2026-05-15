---
target: F:\Kivox\src\app\page.tsx
total_score: 21
p0_count: 3
p1_count: 5
timestamp: 2026-05-15T23-54-27Z
slug: src-app-page-tsx
---
# Kivox Impeccable Critique

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---:|---:|---|
| 1 | Visibility of System Status | 1 | Loader/deployment states can make the experience feel broken. |
| 2 | Match System / Real World | 3 | Strong promise, but some service language still needs buyer-readable examples. |
| 3 | User Control and Freedom | 2 | Mobile proof path is guided by carousel/motion instead of direct scanning. |
| 4 | Consistency and Standards | 2 | Shared deployment and local app do not match; showcase depth varies. |
| 5 | Error Prevention | 2 | Placeholder/dead live paths create avoidable failure moments. |
| 6 | Recognition Rather Than Recall | 2 | Users must infer where live examples are and what services mean in practice. |
| 7 | Flexibility and Efficiency | 2 | Mobile users can reach CTAs, but proof exploration is slower than it should be. |
| 8 | Aesthetic and Minimalist Design | 2 | Strong visual direction, but motion/glows/repeated section grammar compete with clarity. |
| 9 | Error Recovery | 2 | Form recovery exists; route/deployment failures have weak recovery. |
| 10 | Help and Documentation | 3 | FAQ and contact reassurance help buyer confidence. |
| **Total** |  | **21/40** | **Acceptable foundation, major launch blockers.** |

## Anti-Patterns Verdict

The local Kivox site is not generic Bootstrap/template output. It has a real point of view: firelit studio, warm amber, assertive typography, and a strong trust-first headline. But it is still too close to the current AI-brand-site lane in places: large italic accent words, glows, animated loaders, blur entrances, repeated mono labels, cinematic scroll, and pill CTAs.

The comparison deployment succeeds with non-technical viewers because it says the plain thing first: websites that turn visitors into customers, then lists services, proof, projects, testimonials, FAQ, and contact details. It violates many craft rules, but it reduces uncertainty faster.

Detector scan found 6 warnings: 5 pure-black/white warnings and 1 side-tab warning. The side-tab warning in `src/app/work/[slug]/page.tsx` is a true positive against the design rules. The `bg-black` warnings in Vortex and showcase chrome should be replaced with documented tinted tokens, except the small translucent overlay in `HomeWorkPreview` is low-risk.

## Overall Impression

The current site is visually stronger than the comparison site, but the comparison site wins the first-time buyer test. Kivox looks like a studio; the other page explains the offer. Launch should not happen until Kivox does both.

## What's Working

- The hero headline, "Make your business easier to trust online," is the right strategic promise.
- Primary CTAs are visible on mobile and desktop.
- The live showcase idea is strong, and the local source now exposes some direct live website links.

## Priority Issues

**[P0] Deployment mismatch and route availability**
The provided URL shows an older Kivox/Nexora page and major routes such as `/work`, `/contact`, and `/showcase/*` were reported as unavailable on that deployment. Fix: deploy the current source and verify every navigation/CTA target returns 200.

**[P0] Placeholder live project URL**
`src/content/work/hotel.ts` points Aurelia Grand to `https://example.com/hotel`. Fix: build `/showcase/hotel`, point it to a real route, or remove/suppress the live CTA until it is real.

**[P0] Loading screen risk**
The local inspection surfaced a fixed `00%` loader state in at least one pass. Fix: remove the decorative loader or add a hard non-blocking timeout under 1.5 seconds.

**[P1] Mobile proof path is too indirect**
The user feedback is correct: people should not need to go deep to find proof. Fix: add an immediate post-hero "See live examples" band with 3 visible examples, each showing service/outcome plus `View live site` and `Case study`.

**[P1] Services need concrete buyer outcomes**
Current service names are better than before, but the mobile services section still hides explanations behind interaction and uses phrases like "Backend-enabled systems" and "AI Search Readiness." Fix: surface one-line outcomes by default: booking, appointment, menu, admissions, inquiries, dashboards.

**[P1] Compact carousel focus management**
Inactive compact slides use `aria-hidden` while links remain focusable. Fix: add `inert`, remove inactive links from tab order, or replace the compact carousel with stacked mobile cards.

**[P1] Showcase demos still contain dead paths**
Showcase pages include `href="#"` and non-working CTA/social/footer paths. Fix: make paths real, make them explicit demo states, or remove them.

**[P2] AI-brand tells need restraint**
Reduce decorative glow, repeated mono labels, cinematic loading, and repeated italic accent grammar. Let project imagery and live demos carry more proof.

**[P2] Reduced motion is incomplete**
Continuous contact glows, arrows, and scroll indicators should fully stop under `prefers-reduced-motion`.

**[P2] Detector true positives**
Remove `border-l-4` side stripes and replace pure black/white tokens with documented tinted OKLCH values where the warnings are real.

## Persona Red Flags

**Jordan, First-Timer**
"Showcase" is less clear than "See live examples." Some services still need plain examples before a non-technical visitor trusts them.

**Casey, Distracted Mobile User**
Hero CTAs are reachable, but proof exploration asks too much scrolling/tapping. The work preview should be scannable in seconds.

**Riley, Stress Tester**
Placeholder URLs, dead showcase paths, and deployment mismatch break the promise that Kivox ships trustworthy digital work.

## Questions To Consider

- Should the default public experience be light mode, with dark mode as a deliberate option?
- Should the primary secondary CTA say "See live examples" instead of "Explore our showcase"?
- Are all five showcase demos launchable enough to advertise as live websites, or should the homepage only feature the two or three strongest ones?

## Recommended Commands

1. `impeccable shape mobile clarity and proof path`
2. `impeccable clarify homepage services and CTAs`
3. `impeccable harden deployment routes and live showcase paths`
4. `impeccable polish homepage and work preview`
