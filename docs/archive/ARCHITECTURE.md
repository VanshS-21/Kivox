> **⚠️ Archived**: This document was written pre-implementation. Typography references (Space Grotesk, Crimson Pro, Inter) have been superseded by the current font stack (Bricolage Grotesque, Spectral, Figtree). See `web/DESIGN.md` for the canonical design system.

# Kivox Architecture

## Goal

Build a premium landing page without letting the implementation become fragile, generic, or hard to evolve.

The route layer stays thin, content stays typed, visual sections are isolated, browser-only behavior stays small, and future pages can grow from the same content model. The architecture must support Kivox as a website, app, and online-systems studio for businesses customers need to trust before they act, not only as a website agency.

Implementation should follow `PRE_SCAFFOLD_PLAN.md` before any scaffold code is written.

## Stack Assumption

The intended future app lives in `web/`.

Recommended stack:

- Next.js App Router.
- TypeScript.
- Tailwind for layout primitives and responsive utilities.
- CSS Modules or bounded global classes for authored visuals such as the kickstart console, masks, proof media, and section-specific composition.
- Small client components only where the browser is required: animation, media behavior, forms, and progressive enhancement.

The workspace is currently allowed to be docs-only. Recreate `web/` only when implementation begins. Do not commit generated framework output such as `.next/`, cache folders, build folders, or scaffold artifacts.

## Source Map

```text
web/src/app/
  Next.js route files only: layout, page, metadata routes, sitemap, robots,
  future service/industry routes, and future API routes.

web/src/app/page.tsx
  Landing page composition only. Imports section components and typed content.
  No section internals, hardcoded long copy, or browser APIs.

web/src/content/
  Typed TypeScript content modules. No JSX and no browser APIs.
  This is the first place to edit copy, navigation, labels, section data,
  services, industries, team members, proof, engagement paths, and inquiry fields.

  brand.ts
  navigation.ts
  footer.ts
  legal.ts
  analytics-events.ts

web/src/content/landing/
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

web/src/content/seo/
  site.ts
  structured-data.ts
  page-roadmap.ts

web/src/components/landing/
  Landing sections grouped by business purpose:
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

web/src/components/site/
  Site-level chrome such as Header, Footer, SkipLink, and navigation affordances.

web/src/components/ui/
  Small reusable primitives with no brand narrative baked in:
  Button, SectionShell, Eyebrow, ContentRail, MediaFrame, Field, StatusMessage.

web/src/components/motion/
  Small client-only animation helpers. No page-wide scroll controller.

web/src/features/inquiry/
  Contact and project inquiry domain:
  inquiry.schema.ts
  inquiry.types.ts
  submit-project-inquiry.ts
  adapters/

web/src/lib/
  Framework-aware helpers such as metadata, routes, structured data,
  media helpers, analytics hooks, and environment access.

web/src/lib/analytics/
  Provider initialization and safe event dispatch. Event names come from
  content/analytics-events.ts.

web/src/styles/
  Global base styles and design tokens only. Section visuals stay with the section.

web/src/types/
  Shared TypeScript shapes for content and UI contracts.

web/public/media/
  Local production media, grouped by page area.

web/public/media/landing/
  hero/
  concepts/
  categories/
  proof/
  team/

web/public/og/
  Open Graph and social preview assets.
```

## Page Composition

The first landing page should compose sections in this order unless product strategy changes:

1. `HeroSection`: first impression, plain-language positioning, CTA, and semantic kickstart console. The secondary "Trace the routes" CTA anchors to `ClientCategoriesSection`.
2. `ProblemSection`: digital friction and trust gap.
3. `ClientCategoriesSection`: cafes, restaurants, hotels, schools, healthcare, import/export, suppliers, and adjacent businesses grouped by visitor action.
4. `ServicesSection`: web apps, UI/UX redesign, SEO and AI SEO, SaaS/backend platforms, brand identity, Android apps.
5. `ProofSection`: process, specificity, deliverables, technical capability, and real work only when available.
6. `ProcessSection`: discover, clarify, shape, design, build, test, launch, hand over, improve.
7. `EngagementPathsSection`: situation-based paths: Launch, Repair, and Systemize, with likely services listed under each.
8. `TeamSection`: compact team presentation with names, roles, and optional real portraits or links.
9. `CustomScopeSection`: explains no fixed pricing and discovery-led proposals.
10. `ContactSection`: qualified inquiry and direct contact path.

Do not create a `PricingSection`, package-tier section, or plan-card section in the current version.

## Content Model

Primary content should be TypeScript modules, not loose JSON files.

Use typed content so the page can grow into service pages, industry pages, case studies, team pages, SEO/AI SEO explanations, FAQs, and blog content without rewriting section components.

Core content shapes:

```ts
type ServiceLine = {
  id: string;
  name: string;
  summary: string;
  whenNeeded: string[];
  deliverables: string[];
  outcomes: string[];
};

type ClientCategory = {
  id: string;
  label: string;
  actionFrame: string;
  examples: string[];
  trustProblem: string;
  primaryActions: string[];
  isAdjacentCatchAll?: boolean;
};

type ProofItem = {
  id: string;
  label: string;
  proofType: "principle" | "planned_showcase" | "studio_showcase" | "real_client_work";
  summary: string;
  relatedCategories?: string[];
  disclaimer?: string;
};

type EngagementPath = {
  id: "launch" | "repair" | "systemize";
  label: string;
  situation: string;
  likelyServices: string[];
  qualificationPrompt: string;
};

type TeamMember = {
  id: string;
  name: string;
  role: string;
  portrait?: MediaAsset;
  links?: TeamMemberLink[];
  isPlaceholder?: boolean;
};

type InquiryField = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "select" | "textarea";
  required: boolean;
  options?: string[];
};
```

Rules:

- Content IDs are stable and human-readable.
- Keep copy, labels, action text, service examples, category examples, and inquiry field options in content modules.
- Components render content. They should not own product strategy.
- Do not add content models for fixed pricing, pricing tiers, package levels, or public price anchors unless the product document changes.
- Team content must support real people, roles, optional real portraits, and links.
- Placeholder team entries must be clearly marked with `isPlaceholder: true` and must not be presented as real people.
- `proof.ts` starts with proof principles, disclaimers, and approved showcase concepts only. It must distinguish planned demos, studio-built showcases, and real client work before any proof item renders.
- `client-categories.ts` must include an adjacent-businesses row for businesses with similar trust, inquiry, booking, or local-service needs.
- Public copy in content modules must use general-audience language. Internal terms such as Signal Works, route board, proof stations, and service machinery can guide implementation, but they should not become explanatory page copy.

## Section Boundaries

Each landing section owns its internal layout and any section-specific CSS module.

Section files should stay focused:

```text
HeroSection/
  HeroSection.tsx
  HeroKickstartConsole.tsx
  HeroSection.module.css

ServicesSection/
  ServicesSection.tsx
  ServiceMatrix.tsx
  ServiceOutcomeMap.tsx

ContactSection/
  ContactSection.tsx
  InquiryForm.tsx
  ContactOptions.tsx
```

Rules:

- `app/page.tsx` composes sections only.
- Section components accept typed content as props.
- Long sections should be split into private subcomponents inside the section folder.
- Shared visual primitives move to `components/ui` only when at least two sections need them.
- Avoid generic folders named `utils`, `helpers`, `common`, or `shared`.
- Use domain names: `inquiry`, `metadata`, `structured-data`, `service-lines`, `client-categories`, `team-members`.

## Inquiry Flow

The first version may use a simple contact path, but the architecture should be ready for a real project inquiry flow.

Recommended ownership:

```text
web/src/features/inquiry/
  inquiry.schema.ts
    Validation schema for business type, current site/app, needed service,
    primary goal, timeline, scope notes, and contact details.

  inquiry.types.ts
    ProjectInquiry and ProjectInquiryResult types.

  submit-project-inquiry.ts
    Use case that validates input and sends it through an adapter.

  adapters/
    resend-inquiry-adapter.ts
    log-inquiry-adapter.ts
```

Future Next.js route ownership:

```text
web/src/app/api/inquiry/route.ts
  Thin HTTP wrapper only. Delegates to submitProjectInquiry.
```

Rules:

- The form asks for enough information to qualify custom work without behaving like a pricing calculator.
- Do not ask for a fixed budget by default. A scope notes field is acceptable.
- Server-side validation must mirror client-side validation.
- API route code must not contain email vendor, CRM, or persistence details directly.
- Use established libraries for form handling and validation when implementation begins. Do not hand-roll complex validation.
- Prefer Resend for the first production inquiry flow because Kivox will use `kivox.in` and needs a professional email path. Use a log adapter only as a local development fallback.

## SEO And AI SEO

SEO and AI SEO are product requirements, so structured content must feed metadata and schema instead of being duplicated manually.

The detailed strategy lives in `SEO_STRATEGY.md`. Architecture should support that strategy by making service, industry, location, proof, FAQ, and resource content easy to add without rewriting the app.

Recommended ownership:

```text
web/src/content/seo/site.ts
  Site-level entity facts: name, name meaning, domain, location, contact,
  social links, default metadata, and canonical base.

web/src/content/seo/structured-data.ts
  Typed inputs for Organization, ProfessionalService, WebSite, WebPage,
  Service, FAQ, and future BreadcrumbList schema.

web/src/content/seo/page-roadmap.ts
  Future service, industry, work, resource, and location page definitions.
  These are prepared for sitemap/internal-link planning but not published
  until content is real.

web/src/content/landing/seo.ts
  Landing metadata, Open Graph content, canonical path, and structured data inputs.

web/src/lib/metadata/
  buildMetadata.ts
  buildOpenGraph.ts

web/src/lib/structured-data/
  organization-schema.ts
  service-schema.ts
  local-business-schema.ts
  faq-schema.ts
```

Rules:

- Use product and service content as the source for metadata where possible.
- Keep titles and descriptions specific, plain-language, and truthful.
- Do not promise guaranteed rankings, guaranteed AI visibility, guaranteed bookings, or guaranteed revenue.
- Future service and industry pages should reuse the same `ServiceLine` and `ClientCategory` models.
- Add sitemap and robots routes when the app is implemented.
- `content/seo/*` owns global SEO facts and the future page roadmap. `content/landing/seo.ts` owns homepage-specific metadata. `lib/metadata/*` and `lib/structured-data/*` format those inputs for Next.js and JSON-LD.

## Media And Assets

Media must support the design direction without creating fake proof.

Rules:

- Store production media in `web/public/media/landing/*`.
- Store Open Graph images in `web/public/og`.
- Do not store reference screenshots, prompt scraps, moodboard files, or unused experiments in production media folders.
- Team portraits must be real team members only.
- Case study imagery must not imply shipped client work unless the work is real.
- Launch media may be AI-generated for atmosphere, proof/media sections, and operational fragments, but it must be clearly generic and not presented as real client proof.
- All real imagery needs meaningful alt text in content modules.

## No-Pricing Guardrail

The current product strategy excludes public pricing.

Do not add:

- `PricingSection`.
- `pricing.ts`.
- Fixed plan cards.
- Bronze/Silver/Gold packages.
- Starter/Pro/Enterprise tiers.
- "Starting at" price anchors.
- Public price comparison tables.
- A pricing link in the main navigation.

Use `CustomScopeSection` and `EngagementPathsSection` instead. These sections should explain that Kivox scopes work after understanding the client's business, workflows, deliverables, technical requirements, integrations, timeline, and launch needs.

## Team Guardrail

The team section is allowed and expected, but it must stay truthful.

Rules:

- Team members live in `content/landing/team.ts`.
- Team modules render name, role, portrait, and optional links.
- Do not create fake people.
- Do not use stock portraits as real people.
- Do not inflate titles or claims.
- Placeholder states must be visually restrained and explicitly handled by the content model.

## Browser And Motion Boundaries

Only browser-bound behavior should become client code.

Allowed client behavior:

- Route-board and media controls.
- Reduced-motion handling.
- Small entrance/reveal animations.
- Contact form interactivity.
- Progressive service/category disclosure if needed.

Not allowed:

- Page-wide scroll controller.
- Motion that hides essential content.
- Animating layout-heavy properties as a default.
- Client components for static content that can render server-side.

## Framework Boundaries

- `app/layout.tsx` handles shell concerns: fonts, metadata defaults, global style imports, and document structure.
- `app/page.tsx` composes the landing page and imports typed content.
- Metadata routes stay in `app/` but delegate content and formatting to `content` and `lib/metadata`.
- Future API routes stay thin and delegate to feature use cases.
- Do not put domain decisions in route files.

## Quality Rules

- Keep route files thin.
- Keep components focused and split long files before they become hard to review.
- Prefer small, named modules over catch-all utilities.
- Keep reusable UI primitives brand-neutral.
- Keep product narrative in content files and landing sections.
- Use early returns for branching logic.
- Avoid deep nesting.
- Use existing libraries for validation, forms, animation, and framework concerns when they are a good fit.
- Do not introduce UI kits like shadcn/ui unless a future interaction genuinely needs them.

## Verification Expectations

When implementation begins, every meaningful change should be checked with:

- TypeScript typecheck.
- Lint.
- Production build.
- Browser verification for desktop and mobile.
- Basic accessibility checks for keyboard focus, contrast, form labels, alt text, and reduced motion.
- Metadata and structured-data sanity checks for SEO/AI SEO work.

For a docs-only update, verify that `ARCHITECTURE.md`, `PRODUCT.md`, and `DESIGN.md` stay internally aligned and readable by the current project context workflow.

## Architecture Decisions

- `web/` is the intended future app boundary. The root can stay documentation-first until implementation starts.
- Typed TypeScript content is preferred over many loose JSON files.
- The landing page is section-driven, not route-driven.
- The first page is a brand landing page, but the content model must support future service, industry, case study, team, FAQ, and insight pages.
- Custom scoping replaces pricing architecture.
- Team is a first-class content model, but only truthful team data can be presented.
- SEO and AI SEO are not afterthoughts. They are content and metadata architecture concerns from the start.

## Pre-Code Decisions

These decisions should be treated as settled before writing application code:

- **Initial scope**: Build one premium landing page first. Do not build service pages, industry pages, blog, dashboard, CMS, or account features in the first scaffold.
- **Future growth**: Keep the content model ready for service detail pages, industry pages, case studies, team pages, FAQs, SEO/AI SEO explainers, and blog content.
- **Stack boundary**: Use `web/` for the future Next.js app. Keep the repository root focused on docs, context, and project-level files.
- **Rendering model**: Prefer static/server-rendered content for the landing page. Use client components only for motion, media behavior, progressive disclosure, analytics, and inquiry form behavior.
- **Content source**: Use typed TypeScript content modules. Do not reintroduce a pile of loose JSON files for landing content.
- **First navigation**: Use only the primary visitor paths: Services, Process, Team, Contact, and possibly Work once real proof exists. Do not add Pricing.
- **Proof strategy**: Use process, deliverables, category examples, technical capability, and honest showcase work. Kivox starts without testimonials, metrics, client logos, or agency case studies. Build toward 3-4 high-quality showcase projects and label them clearly unless they become real client work.
- **Approved showcase concepts**: Restaurant/cafe discovery, menu, and reservation system; clinic appointment and doctor/service clarity system; school admissions and parent inquiry portal; B2B supplier catalog and RFQ system.
- **Pricing strategy**: Do not build pricing architecture. Use custom scope and engagement paths instead.
- **Team strategy**: Include Team as a compact section. Team entries need only name and role, plus optional portrait and links. Use restrained placeholders until real public team content is ready.
- **Placeholder team roles**: Founder, Product Design, Full-Stack Engineering, and SEO & AI Search.
- **Inquiry strategy**: Treat the contact form as a qualified project inquiry, not a pricing calculator. Ask for business type, current site/app, needed service, primary goal, timeline, scope notes, and contact details.
- **Media strategy**: Use a semantic kickstart console as the signature hero object. Use AI-generated launch media and concept mockups for operational fragments and proof/media sections, then replace them with owned brand media and real project media later. Avoid any media that implies fake proof.
- **SEO strategy**: Build metadata and structured data from typed content. Do not duplicate SEO copy separately from the service/category content.
- **Geography strategy**: Position Kivox primarily for Bengaluru and local Indian businesses, with national scope across India.
- **Analytics strategy**: Use PostHog for CTA clicks, service interest, category interest, form progress, submissions, contact clicks, and important engagement events. Keep event names in `content/analytics-events.ts`; keep provider code in `lib/analytics`.
- **Domain strategy**: Prepare deployment for the finalized domain, `kivox.in`.
- **Brand meaning**: Kivox combines `ki` as kickstart and `vox` as voice. The implementation should support a clearer digital voice and faster path to action, not only a technical systems metaphor.
- **Footer/legal strategy**: Use standard temporary footer language for Bengaluru, India, then manually replace registered details, policies, and address before launch.
- **Accessibility strategy**: Accessibility is part of the trust promise. Keyboard access, contrast, focus states, labels, alt text, reduced motion, and readable forms are non-negotiable.
- **Design strategy**: Evolve Signal Works / Signal Voice into the Kivox-specific Premium Kickstart Voice direction. Do not pivot into a generic SaaS page, loud startup page, dark tech page, luxury hotel page, restaurant page, template agency grid, or the retired Pale Film Portal lane.

## Inputs Needed Before First Implementation

The following decisions are settled for the first implementation and can use placeholders until launch:

- Brand basics: use Kivox, the public headline "Websites, apps, and online systems that give your business a clearer voice online.", the name meaning `ki = kickstart` and `vox = voice`, a placeholder logo, `hello@kivox.in`, `+91 80 0000 0000`, and placeholder LinkedIn, Instagram, and GitHub links.
- Team details: use compact placeholder team entries with roles only: Founder, Product Design, Full-Stack Engineering, and SEO & AI Search. Do not add responsibilities or skills.
- Contact destination: use Resend for inquiry email delivery, with a local log fallback for development only.
- Geography: local-first Bengaluru and India positioning, with national delivery scope.
- Real proof: no testimonials, metrics, client names, client logos, or agency case studies at launch. Use process proof and planned showcase projects only.
- Media assets: use AI-generated launch media for operational fragments and proof/media sections. Replace with owned brand media later.
- Legal/footer basics: use Kivox, Bengaluru, Karnataka 560001, India, `hello@kivox.in`, `+91 80 0000 0000`, dynamically rendered current-year copyright in the Footer component, Privacy Policy, Terms, Contact, LinkedIn, Instagram, GitHub, and a general-information legal note until manually updated before launch.
- Analytics choice: launch with PostHog.
- Deployment target: deploy to `kivox.in`, with Vercel as the natural default unless a different host is chosen later.

## First Build Acceptance Criteria

The first coded version is not ready unless it satisfies these criteria:

- The landing page includes the agreed section sequence from this architecture.
- The page contains no pricing section, package tiers, or public price anchors.
- The services are all represented: web apps, UI/UX redesign, SEO and AI SEO, SaaS/backend platforms, brand identity, and Android apps.
- The target client categories are represented with action-oriented framing.
- Team content is truthful and does not use fake people or fake portraits.
- Contact flow supports qualified custom inquiries.
- Metadata and structured data are generated from the content model.
- The page works on mobile and desktop without text overlap.
- The kickstart console and media experiences have reduced-motion fallbacks.
- The project passes typecheck, lint, build, browser smoke test, and basic accessibility checks.
