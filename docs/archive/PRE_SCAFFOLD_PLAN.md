# Kivox Pre-Scaffold Plan

## Purpose

This plan locks the decisions needed before writing application code. The goal is not only to scaffold a Next.js app, but to scaffold the right business system for Kivox: a premium Bengaluru-based digital product and website development studio that needs to win trust, rank for non-brand searches, and convert qualified inquiries.

This plan should be read with:

- `PRODUCT.md`
- `DESIGN.md`
- `ARCHITECTURE.md`
- `SEO_STRATEGY.md`

## Research Basis

The plan follows current primary-source guidance and product constraints:

- Google says normal SEO fundamentals remain relevant for AI Overviews and AI Mode; there is no special AI-only optimization requirement. This supports a visible, structured, crawlable content strategy instead of gimmicky "AI SEO" tricks.
- Google local ranking is mainly based on relevance, distance, and prominence. This supports a Bengaluru-first local strategy, a Google Business Profile plan, clear service/category relevance, and long-term proof/review building.
- Google Search Console helps confirm crawlability, indexing, search queries, clicks, issues, and backlinks. This supports setting it up before launch, not after traffic is already lost.
- Next.js App Router renders pages/layouts as Server Components by default, supports server-resolved metadata, and provides sitemap file conventions. This supports a server-first scaffold with thin client islands.
- Resend supports Next.js App Router and Server Actions/API handlers. This supports server-only inquiry email handling instead of exposing email logic in the browser.
- PostHog session replay/privacy guidance says to err on the side of masking more. This supports event tracking but strict masking and replay controls around contact forms.

Research references:

- Google AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Google Business Profile local ranking: https://support.google.com/business/answer/7091
- Google Search Console overview: https://support.google.com/webmasters/answer/9128668
- Google robots.txt reference: https://developers.google.com/search/reference/robots_txt
- Next.js Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js sitemap file convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Resend with Next.js: https://resend.com/nextjs
- PostHog session replay privacy: https://posthog.com/docs/session-replay/privacy

## Decision Register

| Area | Decision | Reason |
| --- | --- | --- |
| Brand | Use **Kivox** as the finalized launch brand name. | `Ki` means kickstart and `vox` means voice, giving the brand a clear idea: help real businesses start speaking clearly online. |
| Domain | Use **kivox.in** as the finalized domain. | The scaffold should treat this as the primary site URL, not as a temporary placeholder. |
| Public framing | Use **Websites, apps, and online systems that give your business a clearer voice online.** | It keeps the strategy but ties the offer to the Kivox name and removes insider jargon so owners, managers, administrators, and operators understand the offer quickly. |
| Market | Position as Bengaluru-first, India-wide. | Bengaluru gives local relevance and search focus; India-wide keeps the commercial scope large enough for national clients. |
| Launch Scope | Build one premium landing page first. | The business needs a strong conversion and positioning foundation before multiplying pages. |
| Growth Scope | Prepare service, industry, work, location, and resource pages in the content model from day one. | SEO will require more than one page, so the scaffold must not become a one-page dead end. |
| Stack | Use Next.js App Router, TypeScript, Tailwind, CSS Modules, and Server Components by default. | This aligns with SEO, performance, maintainability, and the existing architecture docs. |
| App Boundary | Put the app in `web/`; keep the repo root docs-first. | Keeps strategy and implementation separated, and preserves a clean fresh start after deleting the old landing page. |
| Rendering | Keep static/narrative sections server-rendered. Use client components only for forms, animation, media controls, progressive disclosure, and analytics. | Search engines and AI systems need visible HTML content; client JavaScript should be reserved for real interactivity. |
| Content Source | Use typed TypeScript content modules. | It keeps copy, SEO, schema, navigation, services, industries, team, footer, and contact data editable without digging through components. |
| Copy Standard | Public copy must explain technical work through business examples. | Buyers should not need to understand terms like trust-routing, service machinery, backend architecture, or AI SEO before they know what Kivox can do for them. |
| Visual Direction | Evolve **Signal Works** into **Premium Kickstart Voice**. | Kivox should keep the high-signal route logic, but as a startup it needs controlled momentum: scattered business information becomes a clear voice that customers can act on. |
| UI Library | Do not install shadcn/ui at scaffold. Use local primitives. | The design must not inherit a generic component-library look; local primitives are enough for this landing page. |
| Icons | Use `lucide-react` only for practical meaning. | Small, familiar icons help buttons/forms/navigation without turning services into generic icon cards. |
| Motion | Use Motion for React sparingly. | Controlled kickstart console and section reveal motion fits the precise brand, but essential content must remain visible and reduced-motion safe. |
| Forms | Use React Hook Form plus Zod. | This is a proven library-first form/validation setup and avoids fragile hand-rolled validation. |
| Inquiry Delivery | Use Resend as the primary inquiry email path. | It fits the own-domain plan, supports Next.js, and is professional enough for qualified project inquiries. |
| Inquiry Runtime | Use `app/api/inquiry/route.ts` and delegate to `features/inquiry`. | Keeps HTTP/framework code thin, matches the architecture source map, and makes email delivery swappable later. |
| Spam Control | Add a hidden honeypot, minimum submit time, server validation, and optional Turnstile later if spam appears. | This starts low-friction for high-intent clients while leaving room for stronger protection. |
| Analytics | Use PostHog for full event tracking. | It supports product-style event analysis, funnels, and behavior insights that fit the agency's "systems" mindset. |
| Session Replay | Disable replay by default at launch or enable only with strict masking and no replay around form fields. | Contact forms may contain personal/business information; trust matters more than watching every session. |
| Privacy | Create a placeholder Privacy page and keep tracking copy plain. | Full event tracking needs a transparent privacy posture before launch. |
| SEO | Follow `SEO_STRATEGY.md`; homepage must be SEO-ready, but ranking growth needs service and industry pages. | Non-brand discovery will come from commercial/local/industry intent, not only the homepage. |
| AI SEO | Use clear entity information, answerable sections, FAQs, and structured data matching visible text. | Google guidance says AI search relies on normal SEO fundamentals; clarity and crawlability beat hype. |
| Local SEO | Prepare for Google Business Profile after real address/domain/contact are ready. | Local visibility depends on verified, complete, consistent business information and future prominence signals. |
| Proof | Launch without fake clients, metrics, testimonials, or logos. | Buyers who need trust before they act will punish fake proof; honest process and showcase systems are safer. |
| Showcase Roadmap | Build four showcase concepts: restaurant/cafe, clinic, school, and B2B supplier/RFQ. | These map directly to the target industries and prove Kivox can handle different trust journeys. |
| Team | Use compact placeholder team roles only: Founder, Product Design, Full-Stack Engineering, SEO & AI Search. | The user does not want responsibility/skills copy; role-only modules keep the section human without overclaiming. |
| Footer/Legal | Use temporary Bengaluru footer/legal content and centralize it in content files. | The user will update final legal details manually; centralization makes replacement safe. |
| Deployment | Target Vercel and `kivox.in`. | Vercel is the natural default for Next.js and keeps deployment simple for a landing/content system. |
| Verification | Require typecheck, lint, build, browser smoke test, mobile/desktop visual check, basic accessibility check, and metadata/schema sanity check. | The brand promise is trust; broken layout, bad metadata, or inaccessible forms undercut that promise immediately. |

## Launch Information Architecture

### Launch Routes

The first scaffold should include these routes:

- `/` - premium landing page.
- `/privacy` - placeholder privacy and tracking notice.
- `/terms` - placeholder terms/legal notice.
- `/robots.txt` - generated via Next.js metadata route.
- `/sitemap.xml` - generated via Next.js metadata route.

Reason: this gives the business a complete public launch surface without pretending to have a full content library on day one.

### Routes Prepared But Not Built At Launch

The scaffold should make these easy to add later:

- `/services/[slug]`
- `/industries/[slug]`
- `/work`
- `/work/[slug]`
- `/resources/[slug]`
- `/locations/bengaluru`

Reason: these are the SEO growth paths, but thin empty pages would hurt credibility. The scaffold should prepare the model, not publish filler.

## Homepage Section Plan

1. Hero
   - Purpose: immediately state what Kivox does and for whom.
   - SEO role: introduce website development, web apps, SEO/AI search readiness, Bengaluru, India, and businesses where trust matters before action naturally.
   - Conversion role: primary CTA to inquiry.
   - Navigation role: secondary "Trace the routes" CTA scrolls to the Client Categories section.

2. Problem
   - Purpose: show the business friction Kivox understands.
   - SEO role: include problem-language queries such as outdated website, unclear services, poor mobile UX, weak search visibility.
   - Conversion role: make owners feel seen.

3. Client Categories
   - Purpose: map industries to user actions.
   - SEO role: mention restaurants, cafes, clinics, schools, hotels, suppliers, import/export, adjacent local businesses, and professional practices.
   - Conversion role: help visitors self-identify.

4. Services
   - Purpose: present the complete service catalog.
   - SEO role: crawlable text for website development, web apps, UI/UX redesign, SEO, AI search readiness, SaaS/backend, brand identity, Android apps.
   - Conversion role: make breadth feel connected, not scattered.

5. Proof System
   - Purpose: prove through process, specificity, deliverables, and showcase roadmap.
   - SEO role: support topical relevance without fake case studies.
   - Conversion role: answer "why trust you if you are new?"

6. Process
   - Purpose: make custom work feel handled.
   - SEO role: explain discovery, UX, build, SEO structure, launch, handover.
   - Conversion role: reduce uncertainty.

7. Engagement Paths
   - Purpose: help buyers choose a starting point by situation: Launch, Repair, or Systemize.
   - SEO role: reinforce service-intent phrases through likely services under each situation.
   - Conversion role: guide inquiry quality.

8. Team
   - Purpose: humanize Kivox with honest placeholders.
   - SEO role: minimal.
   - Conversion role: make the agency feel accountable without exaggeration.

9. Custom Scope
   - Purpose: explain no pricing section.
   - SEO role: avoid thin pricing-style content.
   - Conversion role: frame custom proposal as intentional, not evasive.

10. Contact
   - Purpose: collect qualified project inquiries.
   - SEO role: visible contact details and location.
   - Conversion role: main action.

## Content Modules To Create

The scaffold should create these typed content modules:

```text
web/src/content/
  brand.ts
  navigation.ts
  footer.ts
  legal.ts
  analytics-events.ts
  landing/
    hero.ts
    problems.ts
    client-categories.ts
    services.ts
    proof.ts
    process.ts
    engagement-paths.ts
    team.ts
    custom-scope.ts
    contact.ts
    seo.ts
  seo/
    site.ts
    structured-data.ts
    page-roadmap.ts
```

Reason: this gives content, SEO, analytics, and legal copy one source of truth. Components render data; they do not own strategy.

Day-one module rules:

- `brand.ts` contains the finalized Kivox name, `ki = kickstart`, `vox = voice`, plain public framing, `kivox.in`, placeholder contact details, Bengaluru/India positioning, and social/profile placeholders.
- `navigation.ts` contains only launch navigation and anchor targets, including the "Trace the routes" CTA target for the Client Categories section.
- `footer.ts` contains footer link groups and labels. The Footer component renders the copyright year dynamically.
- `legal.ts` contains privacy/terms placeholder copy and the general-information disclaimer.
- `analytics-events.ts` is the canonical event-name map. Provider code lives in `lib/analytics`.
- `landing/client-categories.ts` includes the adjacent-businesses catch-all row for similar local, inquiry-led, booking-led, or trust-led businesses.
- `landing/proof.ts` contains proof principles, the no-fake-proof disclaimer, and approved showcase concepts with status fields. It must not contain invented clients, metrics, testimonials, rankings, or logos.

## Component Architecture

Recommended scaffold:

```text
web/src/app/
  layout.tsx
  page.tsx
  privacy/page.tsx
  terms/page.tsx
  robots.ts
  sitemap.ts
  api/inquiry/route.ts

web/src/components/site/
  Header/
  Footer/
  SkipLink/

web/src/components/landing/
  HeroSection/
  ProblemSection/
  ClientCategoriesSection/
  ServicesSection/
  ProofSection/
  ProcessSection/
  EngagementPathsSection/
  TeamSection/
  CustomScopeSection/
  ContactSection/

web/src/components/ui/
  Button/
  SectionShell/
  ContentRail/
  Eyebrow/
  Field/
  StatusMessage/
  MediaFrame/

web/src/components/motion/
  Reveal/
  ReducedMotionProvider/

web/src/features/inquiry/
  inquiry.schema.ts
  inquiry.types.ts
  submit-project-inquiry.ts
  adapters/resend-inquiry-adapter.ts
  adapters/log-inquiry-adapter.ts

web/src/lib/
  analytics/
  metadata/
  structured-data/
  environment/
  routes/
```

Reason: section folders keep visual complexity contained; feature folders keep behavior isolated; route files stay thin.

## Inquiry Form Plan

Fields:

- Name
- Email
- Phone
- Business type
- Current website/app URL
- Service needed
- Primary goal
- Timeline
- Project notes

Validation:

- Name, email, business type, service needed, and primary goal are required.
- Phone is optional but validated if provided.
- Website URL is optional but validated if provided.
- Notes have a reasonable max length.

Submission:

- Client form posts to `/api/inquiry`.
- Server validates with Zod.
- Server blocks honeypot submissions.
- Server sends email through Resend.
- Server returns a clear success/error response.
- Development fallback logs the inquiry without pretending email was sent.

Reason: this keeps friction moderate while still qualifying custom work.

## Resend Setup

Environment variables:

```text
RESEND_API_KEY=
INQUIRY_TO_EMAIL=hello@kivox.in
INQUIRY_FROM_EMAIL=Kivox <hello@kivox.in>
```

Launch setup:

- Use Resend test sender during development.
- Verify `kivox.in` before public launch.
- Use `hello@kivox.in` as the own-domain sender once DNS is ready.
- Keep email template plain, readable, and businesslike.

Reason: qualified inquiries are business-critical and should not depend on a client-side mailto or third-party embed.

## Analytics Event Taxonomy

Create a typed event map before implementation:

```text
page_viewed
cta_clicked
nav_clicked
service_selected
industry_selected
engagement_path_selected
showcase_interest_clicked
contact_form_started
contact_form_field_completed
contact_form_submitted
contact_form_failed
email_clicked
phone_clicked
social_clicked
scroll_depth_reached
reduced_motion_detected
```

Event rules:

- Track intent, not personal form content.
- Do not send names, emails, phone numbers, URLs, or free-text notes to analytics.
- Use stable IDs from content modules for service/category/path.
- Keep event names snake_case.
- Centralize event names in `content/analytics-events.ts`. Keep `lib/analytics` for PostHog initialization and safe dispatch only.

Reason: clean event naming keeps PostHog useful and avoids leaking private inquiry details.

## PostHog Setup

Environment variables:

```text
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

Launch policy:

- Analytics is disabled unless `NEXT_PUBLIC_ENABLE_ANALYTICS=true`.
- Analytics is enabled in Vercel production only, and disabled in preview and local environments.
- Session replay is disabled by default for launch.
- If replay is enabled later, mask all text inputs and block contact form sections.
- Respect Do Not Track if practical.
- Add privacy copy explaining analytics and inquiry data handling.

Reason: Kivox sells trust; tracking must be intentional and conservative.

## SEO Setup

Homepage metadata:

- Title: `Kivox | Websites, Apps, and Clear Digital Voice in Bengaluru`
- Description: `Kivox builds websites, web apps, backend workflows, Android apps, brand systems, SEO, and AI search-ready content that give businesses a clearer voice online.`
- Canonical: `https://kivox.in/`.
- Open Graph: matching brand title/description and generated OG image.

Technical SEO:

- `app/sitemap.ts` generated from route/content roadmap.
- `app/robots.ts` allows public crawling and references sitemap.
- `metadataBase` configured from `NEXT_PUBLIC_SITE_URL`.
- JSON-LD rendered in the initial HTML.
- Visible FAQ content before `FAQPage` schema is added.
- No `noindex` on production pages.

Structured data:

- `Organization`
- `ProfessionalService`
- `WebSite`
- `WebPage`
- `Service`
- `FAQPage` only when visible FAQs exist
- `BreadcrumbList` when child routes are added

Reason: this gives search engines and AI systems a consistent entity graph without fake proof.

## SEO Growth Roadmap Setup

Prepare content models for:

- Services
- Industries
- Showcase work
- Resources
- Locations

Do not publish these pages until they have useful, specific content.

First expansion order:

1. Website development Bengaluru
2. Web application development
3. UI/UX redesign
4. SEO and AI SEO
5. Restaurants and cafes
6. Clinics and healthcare
7. Schools and education
8. Hotels and hospitality
9. B2B suppliers/import-export
10. Work/showcase index

Reason: service pages catch what people buy; industry pages catch who they are; work pages build proof.

## Local SEO Setup

Before public launch:

- Connect `kivox.in`.
- Finalize business email.
- Finalize public address or service-area choice.
- Create consistent social profiles.
- Prepare Google Business Profile information.
- Prepare Bing Webmaster Tools and Google Search Console.

After real client work exists:

- Ask real clients for reviews.
- Add real project images and case studies.
- Build credible citations and mentions.

Reason: local SEO cannot be faked. It compounds from consistent business information, relevance, reviews, links, and real-world proof.

## AI Media Plan

Initial media:

- Premium Kickstart Voice / kickstart console visual.
- AI-generated abstract operational fragments.
- No fake client screenshots.
- No fake team portraits.
- No fake offices.

File organization:

```text
web/public/media/landing/
  hero/
  concepts/
  categories/
  proof/
  team/
```

Image rules:

- Compress and size images before launch.
- Use `next/image` for raster images.
- Provide meaningful alt text for content images.
- Use empty alt for decorative atmosphere.
- Keep a static fallback for reduced motion.

Reason: the brand needs high-signal concept media, but fake proof would damage trust.

## Privacy, Legal, And Compliance Setup

Launch pages:

- `/privacy`
- `/terms`

Privacy page should explain:

- What inquiry data is collected.
- Why it is collected.
- That analytics events may be used to improve the site.
- That form content is not sent to analytics.
- Contact email for privacy requests.

Terms page should explain:

- Site content is general business information.
- No guaranteed rankings, leads, revenue, or outcomes.
- No legal, medical, financial, or regulatory advice.
- Project scope is decided by written proposal.

Reason: this is enough for a responsible placeholder without pretending to be final legal counsel.

## Performance And Accessibility Targets

Targets:

- Mobile-first layout.
- No text overlap at mobile or desktop sizes.
- Keyboard-visible focus states.
- Skip link.
- Semantic headings.
- Form labels and errors.
- Reduced-motion fallback.
- Strong contrast.
- No huge uncompressed hero media.
- LCP image is optimized and prioritized if needed.
- Important copy is HTML text, not image text.

Reason: the audience includes patients, parents, administrators, and business owners on mobile. Accessibility and performance are credibility.

## Dependency Plan

Install only what the first scaffold needs:

- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`
- `zod`
- `react-hook-form`
- `@hookform/resolvers`
- `resend`
- `posthog-js`
- `lucide-react`
- `motion`

Development:

- ESLint using Next defaults.
- Prettier if not scaffolded by default.

Do not install:

- shadcn/ui
- Radix packages unless a concrete component needs them
- CMS
- database
- auth
- payment libraries
- heavy animation libraries beyond Motion

Reason: keeping the dependency graph small matches the fresh-start cleanup goal and reduces maintenance.

## Environment Variables

```text
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=
NEXT_PUBLIC_ENABLE_ANALYTICS=false
RESEND_API_KEY=
INQUIRY_TO_EMAIL=hello@kivox.in
INQUIRY_FROM_EMAIL=Kivox <hello@kivox.in>
```

Reason: these separate public site metadata, analytics, and server-only email secrets.

Analytics enablement rule: set `NEXT_PUBLIC_ENABLE_ANALYTICS=true` only for the Vercel production deployment. Keep it false for local development and preview deployments.

## Branch And Repo Policy

Recommended branch:

```text
codex/fresh-nexora-scaffold
```

Rules:

- Treat existing deletions as intentional.
- Do not restore the old landing page.
- Do not copy old visual/code decisions unless the current docs request them.
- Keep docs at root.
- Scaffold the app in `web/`.

Reason: the old main/Vercel deployment remains a fallback, while this branch becomes the clean rebuild.

## Verification Before Handoff

Required commands after scaffold:

```text
npm run lint
npm run typecheck
npm run build
```

Required manual/browser checks:

- Desktop homepage.
- Mobile homepage.
- Contact form happy path with dev fallback.
- Contact form validation errors.
- Keyboard navigation.
- Reduced motion.
- Metadata rendered in initial HTML.
- Sitemap and robots reachable.
- JSON-LD valid shape.
- No console errors.

Reason: verification must cover product, SEO, accessibility, and conversion, not only TypeScript.

## Launch Readiness Checklist

Before public launch:

- Final domain connected.
- Resend domain verified.
- PostHog project configured.
- Google Search Console configured.
- Bing Webmaster Tools configured.
- Google Business Profile prepared or intentionally deferred.
- Placeholder phone/email/socials reviewed.
- Privacy and terms reviewed.
- AI media compressed.
- No fake proof present.
- No pricing section present.
- No hidden `noindex` in production.

## Final Scaffold Acceptance Criteria

The scaffold is acceptable when:

- It implements the agreed stack in `web/`.
- It keeps routes thin and content typed.
- It ships the landing page structure needed by `PRODUCT.md`.
- It follows the Kivox Premium Kickstart Voice design direction.
- It includes SEO, schema, sitemap, robots, and metadata foundations.
- It includes the inquiry feature boundary with Resend-ready server handling.
- It includes PostHog-ready analytics with safe event taxonomy.
- It includes privacy/terms placeholders.
- It passes lint, typecheck, build, browser smoke, accessibility basics, and metadata checks.

This is the point where writing code becomes sensible. The scaffold will no longer be a blank React shell; it will be the first version of Kivox's business, search, and conversion system.
