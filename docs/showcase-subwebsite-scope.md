# Showcase Sub-Website Scope

## Purpose

This document defines the build scope for the Kivox showcase sub-websites.

### Locally Built (under `/showcase/*`)

- MedQueue
- The Roastery
- Greenfield Academy
- Vortex Fitness

### External Deployment

- **Aurelia Grand** — Maintained as a separate project, deployed at [aurum-palace.vercel.app](https://aurum-palace.vercel.app/). It is **not** built locally under `/showcase/hotel`. The case study content in `src/content/work/hotel.ts` links to this external URL via the `liveUrl` field.

The sub-websites are not static portfolio mockups. Each one should feel like a separate, launchable client property with its own brand, design system, interaction model, state, and conversion path. The current `/showcase/*` routes are not the source of truth for design quality or feature depth. The case studies in `src/content/work/*` are the source of truth.

This document is a scope contract. It defines what each sub-website has, what it does not have, and what must be true before implementation is considered complete.

## Shared Mental Model

Each sub-website has two layers:

1. **Brand layer**: The public-facing website, visual system, copy, imagery, navigation, responsive layout, and primary conversion path.
2. **Application layer**: Mock state, client-side interactions, search, filtering, bookings, cart, checkout, dashboards, or portal flows that make the site feel alive.

The goal is to make each property feel like a real business or product that could launch independently, while still being safe as a studio demonstration.

## Shared Platform Scope

### Has

- Separate route group under `/showcase/{property}` for each sub-website.
- Distinct local design system per property: colors, typography, spacing, radius, elevation, motion, UI components, and tone.
- Client-side state where it improves realism: cart, booking state, selected filters, appointment data, class bookings, dashboard summaries, or saved preferences.
- Mock data that is rich enough to support real filtering, sorting, search, dashboards, empty states, and success states.
- App-like transitions, skeleton loading, optimistic UI, and simulated network latency where appropriate.
- Mobile-first responsive layouts that are designed, not merely compressed.
- Keyboard accessible interactive flows with visible focus states.
- Reduced-motion behavior for animated surfaces.
- Metadata suitable for each sub-website if launched separately.
- Clear demonstration labeling or footer note where needed to avoid implying real medical, school, hotel, cafe, or fitness operations.

### Does Not Have

- Real payments, real patient data, real reservations, real student data, real ecommerce orders, or real authentication.
- Backend persistence beyond local client state unless explicitly added later.
- Third-party booking, payment, delivery, school CRM, PMS, or medical API integrations.
- Shared Kivox visual styling inside the sub-website canvas.
- Placeholder-only flows where buttons do nothing.
- Generic category design copied from the first obvious industry pattern.
- Broken or decorative-only dashboards that do not reflect user actions.
- Marketing pages that ignore the case study's operational problem.

## Shared State Scope

Each sub-website should use a small local state architecture suited to its scope. Zustand or React Context is acceptable. The state should be intentionally designed, not scattered through unrelated components.

State should support:

- Persistent local interactions during the current browser session.
- Cross-page updates, such as cart count, booked class state, selected appointment, or saved search filters.
- Derived UI, such as disabled slots, order totals, upcoming appointments, dashboard charts, or filtered lists.
- Reset or demo controls when useful for testing.

State does not need:

- Real user accounts.
- Server sync.
- Database writes.
- Authentication sessions.
- Real payment authorization.



## Build Order

Recommended order for the locally built showcases:

1. MedQueue: Most product-like and already closest to the desired depth.
2. The Roastery: Best for ecommerce/cart and mobile visit-intent quality.
3. Vortex Fitness: Best for schedule filtering, booking state, and member dashboard.
4. Greenfield Academy: Best for information architecture, forms, admissions flow, and parent trust.

> [!NOTE]
> **Aurelia Grand** is excluded from the local build order. It is deployed externally at [aurum-palace.vercel.app](https://aurum-palace.vercel.app/) and referenced via `liveUrl` in `src/content/work/hotel.ts`.

This order can change, but each property should be completed enough to feel independently launchable before moving deeply into the next.

## MedQueue Scope

### Case Study Source

File: `src/content/work/hospital.ts`

MedQueue is a healthcare booking product. It is not a doctor directory. The core problem is uncertainty: patients need to trust the doctor, know availability is real, and book without calling clinics manually.

### Has

- Public product homepage for MedQueue.
- Search and discovery surface for doctors by specialty, symptom, location, availability, fee range, and trust signal.
- Real client-side search and filtering across mock doctor data.
- Doctor profile pages with credentials before convenience.
- Contextual trust signals: experience, registration number, hospital affiliation, consultation fee, specialization depth, patient outcomes, wait-time estimate, and availability.
- Availability grid inspired by airline seat selection.
- Three-step booking flow: select doctor, choose slot, confirm appointment.
- Mock payment or insurance verification screen.
- Simulated slot locking and booking confirmation.
- Patient portal dashboard with upcoming appointments, past appointments, prescriptions, test results, and recommended follow-ups.
- Appointment state that updates across the portal after booking.
- Skeleton loaders or simulated latency during search and confirmation.
- Clear fictional-data disclaimer.

### Does Not Have

- Real medical advice.
- Real patient records.
- Real doctors or real clinic data.
- Actual payment processing.
- Medical chat as a core feature. The case study explicitly removed chat because it created anxiety.
- Star ratings as the primary trust mechanism.
- Phantom appointment slots.
- Urgency or scarcity copy around health decisions.

### Primary Routes

- `/showcase/medqueue`
- `/showcase/medqueue/search`
- `/showcase/medqueue/doctor/[id]`
- `/showcase/medqueue/book/[id]`
- `/showcase/medqueue/portal`

### Completion Standard

A user can search for a doctor, compare results, inspect a trust-first profile, select a slot, complete a mock confirmation flow, and see the appointment appear in the patient portal.

## The Roastery Scope

### Case Study Source

File: `src/content/work/cafe.ts`

The Roastery is a visit-intent cafe website. It should answer one question quickly: should I go here right now?

### Has

- Public cafe homepage.
- Mobile-first hero with hours, address, open status, and one-tap directions visible immediately.
- Menu-first content structure.
- Full menu with categories, item descriptions, prices, dietary tags, and seasonal specials.
- Sticky visit bar or equivalent persistent action surface.
- Real client-side menu filtering by category, dietary tag, roast profile, or availability.
- Coffee bean shop with product detail cards.
- Slide-out cart with persistent cart count.
- Mock checkout flow with contact, fulfillment method, order summary, and success screen.
- Cart state that persists across pages during the session.
- Location, hours, map/directions block, contact, and wholesale or catering inquiry path.
- Realistic place and product imagery.
- Clear fictional-business disclaimer.

### Does Not Have

- PDF menu.
- Hidden prices.
- Instagram embed as primary content.
- Stock-looking cafe cliches as the main proof.
- Real ecommerce payment.
- Real delivery or POS integration.
- Login or customer account scope.
- Multi-location complexity unless added later.

### Primary Routes

- `/showcase/cafe`
- `/showcase/cafe/menu`
- `/showcase/cafe/shop`
- `/showcase/cafe/product/[id]`
- `/showcase/cafe/checkout`
- `/showcase/cafe/order-success`

### Completion Standard

A mobile visitor can decide whether to visit, view the full menu, get directions, add coffee beans to a cart, complete a mock checkout, and receive a polished order success state.

## Aurelia Grand Scope (External Deployment)

> [!IMPORTANT]
> Aurelia Grand is **not** built locally under `/showcase/hotel`. It is maintained as a separate project deployed at [aurum-palace.vercel.app](https://aurum-palace.vercel.app/).

### Case Study Source

File: `src/content/work/hotel.ts`

Aurelia Grand is a boutique hotel website competing with OTAs. It makes direct booking feel more trustworthy than leaving for an aggregator. The case study content, visual references, process documentation, and results data are all maintained in `hotel.ts` and displayed on the Kivox homepage showcase.

### Integration with Kivox

- The `liveUrl` field in `hotel.ts` (`https://aurum-palace.vercel.app/`) is used by the homepage showcase to link visitors to the external site.
- No local route exists at `/showcase/hotel`.
- No local components, state, or design-system routes are needed within the Kivox codebase for this project.
- The case study narrative, design decisions, results metrics, and testimonial are all served from `hotel.ts` content within the Kivox site itself.

### Reference Design Spec

The following details describe the external site's design for reference purposes:

- **Visual Tone**: Modern Restraint. Deep navy-blacks with gold accents.
- **Room Cards**: Decision interfaces showing square footage, bed type, max guests, view, policy summary, and price.
- **Direct Booking**: First-party flow with no third-party redirects.
- **Policies**: Styled as hospitality, not legal fine print.
- **Scroll Pacing**: Intentionally slow and fluid, matching the brand's unhurried luxury identity.

## Greenfield Academy Scope

### Case Study Source

File: `src/content/work/school.ts`

Greenfield Academy is an admissions-first school website. It is for parents evaluating trust, programs, fees, deadlines, and fit for their child.

### Has

- Public school homepage.
- First viewport that establishes legitimacy, grades served, admissions path, and next action.
- Fact strip with founded year, student count, teacher-student ratio, board results, or equivalent proof.
- Admissions timeline visible early.
- Programs organized by age group, not academic department.
- Program detail pages or sections with outcomes, daily rhythm, progression, and fit.
- Fees and required documents presented clearly.
- Inquiry or campus visit form with progressive validation and human-readable errors.
- Parent FAQ.
- Candid campus-life section based on "Tuesdays, not graduation day."
- Admissions dashboard or status tracker for a mock parent inquiry.
- Form state that produces a success state and updates the tracker.
- Clear fictional-school disclaimer.

### Does Not Have

- Admissions hidden behind generic About navigation.
- Drone-campus hero as the primary proof.
- Mission statement as the main homepage content.
- Childish primary-color design.
- Cartoon mascots or clip-art treatment.
- Hidden fee structure.
- Real student data.
- Real CRM or admissions backend.

### Primary Routes

- `/showcase/school`
- `/showcase/school/programs`
- `/showcase/school/programs/[id]`
- `/showcase/school/admissions`
- `/showcase/school/inquiry`
- `/showcase/school/parent-status`

### Completion Standard

A parent can understand the school, compare programs by age group, review admissions steps, submit a mock inquiry, and see a clear next-step/status experience.

## Vortex Fitness Scope

### Case Study Source

File: `src/content/work/fitness.ts`

Vortex Fitness is a logistics-first fitness site. Visitors already have intent. They need services, schedules, pricing, trainer credibility, and a trial booking path.

### Has

- Public fitness homepage.
- Schedule treated as hero-level content.
- Services overview for gym floor, personal training, group classes, yoga, or equivalent offer areas.
- Real client-side schedule filtering by day, class type, level, trainer, and time.
- Class detail surfaces with difficulty, coach, capacity, duration, and equipment.
- Booking flow for a free trial or class spot.
- Booked classes state that greys out or marks selected slots.
- Member dashboard with booked classes, workout history, streaks, and a simple performance graph.
- Transparent pricing comparison with no hidden fees.
- Trainer profiles that lead with credentials and specializations.
- Simulated confirmation states and empty states.
- Clear fictional-gym disclaimer.

### Does Not Have

- Hidden pricing behind contact forms.
- Downloadable PDF schedule.
- Auto-playing hero video.
- Real booking API integration.
- Real memberships or payment processing.
- Motivational poster copy as the main strategy.
- Influencer-first trainer profiles.
- Aggressive skull, grunge, or intimidation branding.

### Primary Routes

- `/showcase/fitness`
- `/showcase/fitness/schedule`
- `/showcase/fitness/classes/[id]`
- `/showcase/fitness/trainers`
- `/showcase/fitness/pricing`
- `/showcase/fitness/book`
- `/showcase/fitness/member`

### Completion Standard

A visitor can understand the offer, filter the schedule, book a trial or class, see booked state reflected across the site, compare pricing, and view a member dashboard with meaningful mock progress.

## Explicitly Out Of Scope For The First Rebuild Pass

- Real auth.
- Real backend persistence.
- Real payments.
- Real email or SMS notifications.
- Real third-party API integrations.
- Admin CMS editing interfaces.
- Multilingual support.
- Production legal compliance for healthcare, education, hospitality, or ecommerce.
- Analytics dashboards for Kivox itself.
- Rebuilding the main Kivox marketing site, except where showcase routing or framing requires small integration changes.

## Quality Bar

Each sub-website should pass this bar before moving to the next:

- The business problem from the case study is visible in the first minute of use.
- The site has at least one meaningful app-like flow, not just static sections.
- State changes are visible across screens.
- Search, filtering, booking, cart, checkout, or dashboard interactions work with mock data.
- The design system is distinct from Kivox and from the other sub-websites.
- The main journey works on mobile and desktop.
- Empty, loading, success, and error states exist where relevant.
- The build can be explained as a million-dollar agency-grade demonstration without exaggerating real integrations.

## Future Escalation Scope

These ideas can be added after the first rebuild pass:

- Browser-level persistence with `localStorage` or IndexedDB.
- More advanced charts and analytics.
- Multi-step onboarding for portals.
- Demo reset controls.
- Cross-property Kivox showcase index that compares the sub-sites.
- Story-driven case-study overlays that connect each sub-site back to Kivox's process.
- Test coverage for stateful flows with Playwright.
- Lightweight mock API route handlers if local state becomes too limiting.
