---
target: src/app/work/[slug]/page.tsx
total_score: 25
p0_count: 0
p1_count: 2
timestamp: 2026-05-15T20-31-24Z
slug: src-app-work-slug-page-tsx
---
**Design Health Score**

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Carousel has a counter, but repeated live links blur what the current action is. |
| 2 | Match System / Real World | 3 | Case-study copy speaks well to business intent, but the action model says "leave this page" too early. |
| 3 | User Control and Freedom | 2 | Back to Work exists, but carousel arrows are hover-dependent and every slide is a live-site link. |
| 4 | Consistency and Standards | 2 | The same live action appears as hero CTA, carousel badge, image links, and overview CTA. |
| 5 | Error Prevention | 2 | Inactive carousel slides remain link targets, increasing accidental exits on mobile and keyboard paths. |
| 6 | Recognition Rather Than Recall | 3 | Labels are clear, but users must infer why the same CTA keeps returning. |
| 7 | Flexibility and Efficiency | 2 | Multiple routes exist, but they are duplicate routes, not efficient alternatives. |
| 8 | Aesthetic and Minimalist Design | 2 | Strong craft foundation, weakened by CTA repetition and section over-explanation. |
| 9 | Error Recovery | 2 | Marketing page has low error burden, but exiting to showcase has no confirmation or local recovery. |
| 10 | Help and Documentation | 3 | The case-study narrative is explanatory enough; no major help gap. |
| **Total** | | **25/40** | **Acceptable, strong base with mobile action overload** |

**Anti-Patterns Verdict**

LLM assessment: This does not read as generic AI slop overall. The Kivox visual system has a distinct dark studio atmosphere, strong typography, and project-specific color accents. The weak spot is interface grammar: the repeated uppercase labels, repeated section pattern, and repeated live CTAs create the feeling of a generated case-study template rather than a tightly directed editorial proof path.

Deterministic scan: `npx impeccable detect --json src/app/work/[slug]/page.tsx src/components/ui/ProjectCarousel.tsx` found 1 warning: `side-tab` at `src/app/work/[slug]/page.tsx:240` because the Insight callout uses `border-l-4`.

Visual overlays: skipped because the in-app browser security policy blocked JavaScript URL injection, so I did not attempt a workaround. I used screenshots, DOM snapshots, and locator counts instead.

**Overall Impression**

The page has the right raw material: real screenshots, credible narrative, and enough project detail to prove craft. The biggest opportunity is to stop making every fold ask the visitor to leave. On mobile, the case study should first earn confidence, then offer one decisive route to the live example.

**What's Working**

- The first screen communicates project identity quickly: title, project type, duration, client type, and services are visible without hunting.
- The screenshot carousel is valuable proof. It shows the built artifact early, which matches Kivox's "craft is the proof" principle.
- The case-study sections have real substance: challenge, insight, approach, decisions, and results are richer than a decorative portfolio page.

**Priority Issues**

**[P1] Duplicate primary CTA overload**
Why it matters: On mobile, `View Showcase` appears in the hero and again as a carousel overlay in the same early flow. DOM checks across `cafe`, `hotel`, `school`, `hospital`, and `fitness` found 6 same-destination CTA links per case study. The visitor is asked to leave before the case study has built enough conviction.
Fix: Keep one primary live CTA above the fold, preferably attached to the screenshot proof, and remove the overview CTA. Make the hero CTA either a lighter text link or a scroll link to the proof image.
Suggested command: `impeccable distill case study CTAs`

**[P1] Carousel slides are all live links**
Why it matters: `ProjectCarousel` wraps every slide in a live-site link, then adds a separate live overlay CTA. For keyboard and screen-reader users this creates three slide links plus one overlay link before the overview CTA. It is redundant and easy to misfire on touch screens.
Fix: Make slides image-only or link only the active slide. Keep a single explicit live CTA outside the slide track. Set inactive slides to `aria-hidden` and `tabIndex={-1}` if they remain in the DOM.
Suggested command: `impeccable adapt case study carousel`

**[P2] Mobile first fold has competing actions instead of one story beat**
Why it matters: At 390px, users see Back to Work, service chips, hero `View Showcase`, then carousel `View Showcase` almost immediately. That is more action chrome than proof. It makes the page feel like a launcher, not a case study.
Fix: On mobile, let the hero end at metadata and services. Move the primary live CTA into the screenshot frame or below the carousel, after the user has seen the artifact.
Suggested command: `impeccable shape mobile case study action hierarchy`

**[P2] Template rhythm makes a strong story feel longer than it is**
Why it matters: The same two-column label plus paragraph rhythm repeats through overview, challenge, approach, process, decisions, results, tech stack, testimonial, and data grid. It is readable, but it becomes procedural. On mobile, the reader loses a sense of narrative momentum.
Fix: Collapse adjacent sections into 4 clearer chapters: Context, Proof, Decisions, Outcome. Use one sticky or inline chapter index on desktop, and one compact progress affordance on mobile.
Suggested command: `impeccable distill case study narrative`

**[P2] Detector caught a banned side-tab accent**
Why it matters: The Insight callout uses `border-l-4`, which the impeccable rules explicitly ban because it is a common AI-interface tell.
Fix: Replace it with a full subtle border, background tint, oversized quote mark, or small numbered marker.
Suggested command: `impeccable polish case study callout`

**Persona Red Flags**

Jordan, first-time evaluator: Jordan understands the project topic, but sees `View Showcase` before the case study has explained why the showcase matters. He may click away immediately and miss the strategy proof Kivox wants to sell.

Casey, distracted mobile user: Casey sees multiple same-looking red CTAs in quick succession. One-handed scrolling plus a clickable carousel image raises accidental-exit risk.

Sam, accessibility-dependent user: Sam encounters multiple accessible links with the same purpose in the carousel. The page exposes duplicate actions rather than one clear path, increasing tab-stop fatigue.

Project-specific, SMB owner/operator: This user wants certainty before contact. The live demo matters, but repeated CTAs make the page feel eager to redirect instead of calmly proving competence.

**Minor Observations**

- Desktop tolerates the repeated CTAs better, but still shows global `Start a project`, hero live CTA, and carousel live CTA in the same visual zone.
- Tablet is the best current breakpoint compositionally, but it still repeats the live action before the overview copy.
- The page copy uses several long sections with similar labels. The writing is good; the display model is doing it no favors.

**Questions to Consider**

1. Should the case study's primary conversion be `View Showcase`, or should it be `Start a project` after enough proof?
2. Should mobile show the live CTA once in the screenshot frame, or once after the Project Overview copy?
3. Do you want a light fix that only reduces duplicate CTAs, or a deeper `distill` pass that turns the page into a tighter proof narrative?
