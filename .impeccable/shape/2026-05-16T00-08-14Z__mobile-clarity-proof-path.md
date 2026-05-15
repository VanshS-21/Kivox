---
target: F:/Kivox/src/app/page.tsx
source_critique: F:/Kivox/.impeccable/critique/2026-05-15T23-54-27Z__src-app-page-tsx.md
command: impeccable shape mobile clarity and proof path
status: confirmed_with_overrides
timestamp: 2026-05-16T00-08-14Z
slug: mobile-clarity-proof-path
---

# Kivox Shape Brief: Mobile Clarity and Proof Path

## 1. Feature Summary

Reshape the homepage so a first-time SMB owner on mobile can understand the offer, see proof, and choose a next step without decoding the studio language. This is a homepage hierarchy and interaction pass, not a full rebrand: Kivox stays bold, firelit, craft-focused, and work-forward, but proof becomes easier to scan than the cinematic presentation.

The immediate job is to make the current promise, "Make your business easier to trust online," feel proven within the first two scrolls.

## 2. Primary User Action

The visitor should tap either "See live examples" or "Start a project" after seeing concrete proof that Kivox builds launchable business websites and web apps.

## 3. Design Direction

Color strategy: Committed. Keep Kivox amber as the parent-site chromatic system, but reduce decorative glow in proof-heavy sections so screenshots, outcomes, and actions carry the credibility.

Theme scene sentence: A time-poor business owner checks the site on a phone between customer work, under normal daylight, wanting certainty more than spectacle. This keeps the public experience clear and scan-first, while the hero and footer can remain dark-locked per the design system.

Anchor references:

- A well-organized studio portfolio index: clear work cards, direct links, proof before philosophy.
- A service business checklist: plain outcomes, visible examples, no hidden next step.
- A premium workshop bench: warm craft, tools visible, no decorative clutter.

No visual direction probe is needed because this is a refinement of an existing surface with established PRODUCT.md and DESIGN.md direction, not a new ambiguous visual lane.

## 4. Scope

Fidelity: production-ready design brief for the next implementation pass.

Breadth: homepage mobile hierarchy, proof preview, service clarity, and related desktop adaptation.

Interactivity: shipped-quality components, accessible links, no focus traps, reduced-motion complete.

Time intent: launch-blocker cleanup first, polish second.

## 5. Layout Strategy

The homepage should move from mood to proof faster:

1. Hero keeps the trust promise and primary CTA.
2. Secondary CTA changes from "Explore our showcase" to "See live examples."
3. Add an immediate post-hero proof band before marquee or cinematic work preview.
4. The proof band shows three visible examples on mobile without carousel dependence: The Roastery, Aurelia Grand, and Greenfield Academy. Aurelia Grand can remain visible with its temporary `https://example.com/hotel` URL during this pass because the hotel showcase will be built before the brand ships.
5. Each proof item must show business type, practical outcome, and two actions: "View live site" and "Case study."
6. Services should surface buyer-readable outcomes by default instead of hiding meaning behind hover or tap expansion.
7. Existing cinematic work preview can remain below the proof band as a deeper craft moment, but it should no longer be the first proof mechanism on mobile.

Mobile rhythm should feel like: promise, evidence, plain services, deeper craft, process, contact. Desktop can keep more drama, but the same proof order should hold.

## 6. Key States

Default: Three scannable proof examples are visible as stacked mobile slabs with image, service/outcome, and direct actions. No auto-advancing carousel is required for comprehension.

No live URL: Show "Case study" only, or label "Case study demo" without a dead live action. Never render a placeholder live CTA.

Loading: Images reserve stable aspect ratio and display a tinted surface or blur placeholder without blocking the page. No fixed loader may cover the proof path.

Error: If an image fails, the card still shows title, business type, outcome, and working actions.

Reduced motion: No auto-rotation, continuous arrows, pulsing rings, scroll indicators, or glow loops. Static hierarchy remains fully understandable.

Keyboard: Every inactive carousel or hidden proof item must be unreachable by tab. If the mobile proof path is stacked, this risk disappears.

Small-screen edge: At 320-375px widths, CTAs stack with full-width tap targets and no clipped project titles.

## 7. Interaction Model

Primary proof interaction is direct tap, not exploration. Users should not need to wait for an auto-advance, swipe a carousel, or infer that screenshots are clickable.

Proof items:

- Tapping the image or "View live site" opens the configured live URL. Aurelia Grand is allowed to keep the temporary example URL until the hotel showcase is built before launch.
- "Case study" goes to `/work/[slug]`.
- On desktop, hover can lift the slab and reveal subtle image detail, but hover must not reveal essential copy.
- On mobile, the full outcome sentence is always visible.

Services:

- The service title, short plain outcome, and example use cases are visible by default.
- Tapping a service can expand supporting detail, but it should not be required to learn what the service does.
- Service examples should map to buyer language: bookings, appointments, menus, admissions, inquiries, dashboards, portals, search visibility.

## 8. Content Requirements

CTA copy:

- Primary hero CTA: "Start a project"
- Secondary hero CTA: "See live examples"
- Replace "Explore our showcase" with "See live examples" everywhere it appears on the homepage.
- Proof section label: "Live examples"
- Proof section headline: "See what Kivox can actually build."
- Proof section support: "Three launchable demonstrations, each built around a real business decision path."

Proof card fields:

- Project title
- Business type
- Outcome sentence
- Service tags, maximum three
- "View live site" when the URL is real
- "Case study"

Recommended homepage proof examples:

- The Roastery: Cafe website, menu, hours, and directions built for visit decisions.
- Aurelia Grand: Hotel website, room confidence and direct-booking trust made clearer.
- Greenfield Academy: School website, admissions steps and parent questions made obvious.

Aurelia Grand should remain visible even while `src/content/work/hotel.ts` uses `https://example.com/hotel`. The real hotel showcase route is a pre-ship dependency, not a blocker for the homepage proof-band implementation.

Service copy should replace jargon-first labels with outcome-backed summaries:

- Websites and web apps: "Clear pages, product flows, CMS, ecommerce, and conversion paths."
- UI/UX redesign: "Fix confusing navigation, weak CTAs, slow pages, and broken mobile flows."
- SEO and AI search readiness: "Technical cleanup, structured content, schema, and pages search engines can understand."
- Brand identity: "Naming, messaging, visual systems, and practical launch assets."
- Backend-enabled systems: "Inquiry workflows, booking flows, dashboards, portals, catalogs, and API-connected tools."
- Android apps: "Mobile apps only when customers or staff genuinely need app-level access."

Image/media roles:

- Use existing project mockups and showcase images from `/public/work`.
- No generic decorative proof blocks.
- Keep Kivox chrome amber, but let individual project screenshots provide proof and variety.

## 9. Recommended References For Implementation

- `reference/craft.md`: next step if this shape is approved and implementation should begin.
- `reference/adapt.md`: mobile clarity, responsive hierarchy, touch targets, stacked proof path.
- `reference/clarify.md`: CTA and service copy cleanup.
- `reference/harden.md`: dead links, placeholder live paths, focus management, loader risk.
- `reference/polish.md`: final restraint pass on glow, repeated labels, and motion.

## 10. Open Questions

Resolved: the first mobile proof band should feature three examples: The Roastery, Aurelia Grand, and Greenfield Academy.

Resolved: "See live examples" should replace "Explore our showcase" everywhere on the homepage.

Resolved: Aurelia Grand stays in homepage proof with its current example URL for now. The hotel showcase must be built before the brand ships.

## Confirmation Gate

This shape is confirmed with the overrides above. The next step is an `impeccable craft mobile clarity and proof path` pass that updates the homepage, content, and route/link hardening without changing the broader Kivox identity.
