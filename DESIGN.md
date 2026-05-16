---
name: Kivox
description: Boutique web studio. Clarity that earns trust. Craft that holds up.
colors:
  firelit-black: "oklch(0.05 0.005 65)"
  warm-card: "oklch(0.10 0.005 65)"
  warm-surface: "oklch(0.13 0.006 65)"
  warm-alt: "oklch(0.07 0.005 65)"
  warm-white: "oklch(0.98 0.01 85)"
  warm-amber: "oklch(0.72 0.18 65)"
  amber-hover: "oklch(0.78 0.18 65)"
  amber-glow: "oklch(0.72 0.18 65 / 0.33)"
  amber-muted: "oklch(0.72 0.18 65 / 0.12)"
  amber-ink: "oklch(0.99 0.008 80)"
  atelier-white: "oklch(0.97 0.003 250)"
  atelier-elevated: "oklch(0.99 0.002 250)"
  atelier-surface: "oklch(0.97 0.003 250)"
  warm-linen: "oklch(0.955 0.008 70)"
  atelier-ink: "oklch(0.13 0.005 250)"
  burnt-amber: "oklch(0.60 0.22 55)"
  burnt-amber-deep: "oklch(0.55 0.24 52)"
  pov-wash-dark: "oklch(0.09 0.025 60)"
  pov-wash-light: "oklch(0.95 0.003 250)"
  ember-rose: "oklch(0.55 0.12 35)"
  hospital-blue: "oklch(0.55 0.17 240)"
  hotel-gold: "oklch(0.68 0.15 75)"
  school-green: "oklch(0.58 0.2 155)"
  fitness-violet: "oklch(0.55 0.22 300)"
  cafe-coral: "oklch(0.55 0.24 25)"
typography:
  display:
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "clamp(3.5rem, 6vw + 1.5rem, 7.5rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "'Spectral', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 3vw + 0.5rem, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "'Bricolage Grotesque', system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1.5vw + 0.5rem, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Figtree', system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "'Geist Mono', 'SF Mono', 'Roboto Mono', monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.12em"
rounded:
  sm: "8px"
  md: "14px"
  lg: "24px"
  xl: "32px"
  full: "9999px"
spacing:
  section: "clamp(64px, 8vw + 20px, 120px)"
  section-large: "clamp(80px, 10vw + 24px, 160px)"
  section-small: "clamp(48px, 6vw + 16px, 80px)"
  xl: "clamp(40px, 4vw + 16px, 64px)"
  lg: "clamp(32px, 3vw + 12px, 48px)"
  md: "32px"
  sm: "20px"
  xs: "12px"
  xxs: "8px"
components:
  button-primary:
    backgroundColor: "{colors.warm-amber}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.amber-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "44px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    padding: "0 24px"
    height: "36px"
  button-magnetic:
    backgroundColor: "{colors.warm-amber}"
    textColor: "{colors.amber-ink}"
    rounded: "{rounded.full}"
    padding: "20px 40px"
  card-standard:
    backgroundColor: "{colors.warm-card}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.md}"
    padding: "32px"
  input-field:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.md}"
    padding: "16px 20px"
  tag-pill:
    backgroundColor: "transparent"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  eyebrow-label:
    textColor: "{colors.warm-amber}"
    padding: "0"
---

# Design System: Kivox

## 1. Overview

**Default Theme: Light Mode.** The primary visitor experience is light mode. The target audience (SMB owners, non-technical business people) browses in daylight and associates light interfaces with professionalism and approachability. Dark mode remains available as a toggle for visitors who prefer it.

**Creative North Stars:**

**Light Mode (Default): "The Atelier in Morning Light."** A master craftsman's studio in cold morning light. White walls, raw materials, clean surfaces, sharp shadows from a single window. Considered. Architectural. Precise. Cold-tinted neutrals (hue 250, chroma 0.002–0.005) with one deliberate exception: the services and process sections use Warm Linen `oklch(0.955 0.008 70)` to avoid sterility in content-dense areas. Amber deepens to burnt amber for authority against cool backgrounds.

**Dark Mode (Toggle): "The Firelit Studio."** Kivox's dark mode draws from the intimacy of a well-lit workshop at dusk: warm amber light pooling across dark surfaces, the confidence of tools laid out with intention. Warm-tinted neutrals (hue 55–85, chroma 0.005–0.02) ground everything. Amber carries 30–60% of visual weight at hero moments.

The system is Committed: amber is the only chromatic color in site chrome. The dual-theme system uses deliberate temperature polarity: dark mode is warm, light mode is cold. The amber accent bridges both, operating as deliberate tooling marks in light mode and as firelight in dark mode.

This system explicitly rejects generic SaaS template sites, loud startup pages, dark tech aesthetics with neon accents, enterprise posturing, luxury hotel minimalism, and intimidating craft showcases. If a non-technical visitor feels confused or intimidated, the design has failed. The proof is in approachable execution: typography that demonstrates mastery, spacing that breathes without pretension, motion that enhances rather than obstructs.

**Key Characteristics:**
- Light mode default, dark mode via toggle
- Temperature polarity: light mode cold-tinted (hue 250), dark mode warm-tinted (hue 65), with Warm Linen exception
- Committed amber accent at key moments, restrained everywhere else
- Editorial serif/sans pairing (Spectral + Bricolage Grotesque) for headline variety
- Structural shadows with amber-tinted hover states
- Hero shows product mockups (device frames displaying showcase websites)
- Footer dark-locked in both themes
- Full navigation bar visible on desktop; hamburger on mobile only
- Services scannable without interaction; interactive detail as progressive enhancement
- Social proof sections: testimonials, concept project band
- Low-commitment primary CTA ("Book a Free Call" not "Start a project")

Motion energy is Choreographed: word-by-word hero entrances, scroll-driven reveals, magnetic CTA physics, tunnel canvas perspective effects. The constellation canvas may serve as a subtle background texture in the hero, not as the primary visual. All motion respects `prefers-reduced-motion` with instant fallbacks.

## 2. Colors: The Dual-Temperature Palette

A dual-theme palette with deliberate temperature polarity. Dark mode is warm-tinted (hue 55–85); light mode is cold-tinted (hue 250) with one deliberate exception. The hero and footer are always dark. OKLCH is the canonical color space.

### Primary

- **Warm Amber** `oklch(0.72 0.18 65)`: The signature dark-mode accent. CTAs, eyebrow labels, active navigation states, hover borders, glow effects, pulsing status dots. In light mode this deepens to Burnt Amber for contrast.
- **Burnt Amber** `oklch(0.60 0.22 55)`: Light-mode primary accent. Richer and more decisive against cool surfaces. Used for all accent roles in `[data-theme="light"]`.
- **Amber Hover** `oklch(0.78 0.18 65)`: Dark-mode hover brightening. In light mode, hover darkens instead to Burnt Amber Deep `oklch(0.55 0.24 52)`.
- **Amber Glow** `oklch(0.72 0.18 65 / 0.33)`: Halo around interactive elements on hover. Applied as box-shadow, never as background.
- **Amber Muted** `oklch(0.72 0.18 65 / 0.12)`: Subtle tint for tag pill hover backgrounds, selection highlights. Light mode equivalent: `oklch(0.60 0.22 55 / 0.08)`.
- **Amber Ink** `oklch(0.99 0.008 80)`: Text on amber backgrounds (dark mode). Light mode uses `oklch(0.99 0.002 250)`.

### Secondary

- **Ember Rose** `oklch(0.55 0.12 35)`: Warm, muted rose for secondary ambient glows in the contact section. Never for text or interactive elements. Light mode deepens to `oklch(0.52 0.12 25)`.

### Neutral

**Dark mode (The Firelit Studio):**
- **Firelit Black** `oklch(0.05 0.005 65)`: Base background. Warm-tinted, never pure black.
- **Warm Card** `oklch(0.10 0.005 65)`: Elevated card surfaces.
- **Warm Surface** `oklch(0.13 0.006 65)`: Raised surfaces, carousel frame interiors.
- **Warm Alt** `oklch(0.07 0.005 65)`: Alternate surface for services section.
- **Warm White** `oklch(0.98 0.01 85)`: Primary text. Never pure white.
- **Warm Muted** `oklch(0.98 0.015 80 / 0.6)`: Secondary text, descriptions.
- **Warm Subtle** `oklch(0.98 0.01 85 / 0.35)`: Tertiary text, captions.

**Light mode (The Atelier in Morning Light):**
- **Atelier White** `oklch(0.97 0.003 250)`: Base background. Cool blue-gray white.
- **Atelier Elevated** `oklch(0.99 0.002 250)`: Card surfaces. Near-white with cool tint.
- **Atelier Surface** `oklch(0.97 0.003 250)`: Same as base in light mode.
- **Warm Linen** `oklch(0.955 0.008 70)`: The deliberate warm exception. Alternate surface for services and process sections. Warm-tinted (hue 70) to prevent content-dense areas from feeling sterile.
- **Atelier Ink** `oklch(0.13 0.005 250)`: Primary text. Cool-tinted near-black.
- **Atelier Muted** `oklch(0.45 0.005 250)`: Secondary text.
- **Atelier Subtle** `oklch(0.62 0.004 250)`: Tertiary text, captions.

**Borders (dark):** `oklch(0.85 0.008 65)` at 0.08 / 0.12 / 0.05 alpha (standard / strong / soft).
**Borders (light):** `oklch(0.13 0.005 250)` at 0.10 / 0.18 / 0.05 alpha.

### Project Showcase Accents

Used exclusively for Work page slides and case study contexts. Never in site chrome.

- **Hospital Blue** `oklch(0.55 0.17 240)`: Healthcare projects.
- **Hotel Gold** `oklch(0.68 0.15 75)`: Hospitality projects.
- **School Green** `oklch(0.58 0.2 155)`: Education projects.
- **Fitness Violet** `oklch(0.55 0.22 300)`: Fitness projects.
- **Café Coral** `oklch(0.55 0.24 25)`: Food & beverage projects.

## 3. Sub-Website Rebuild Design Systems

These are target design systems for the rebuild of every launchable showcase website. The current `/showcase/*` implementations are not canonical design references. The case studies in `src/content/work/*` are the source of truth for business context, user intent, information architecture, proof, and conversion behavior.

Each rebuilt sub-website should feel like a separate client property that could launch on its own domain. They are not Kivox theme variants. They may have their own logo, navigation, typography, palette, motion, component grammar, and content structure. Kivox chrome should stay outside the sub-website canvas, limited to the demo frame or route wrapper when needed.

The shared inheritance is quality, not visual sameness:

- **Intentional separation**: A sub-website should look like the client world it represents, not like Kivox wearing a different accent color.
- **Local tokens first**: Each sub-website owns its own color, type, spacing, radius, shadow, and motion tokens. Kivox tokens may be referenced for implementation convenience only when they fit the sub-brand.
- **Case-study alignment**: Every design choice must map back to the case study's challenge, insight, approach, key design decisions, target audience, primary actions, and core sections.
- **Launchable depth**: Each system must support a real homepage, key conversion path, legal/contact footer, responsive navigation, metadata, and at least one deeper proof or transaction screen.
- **AA by default**: Contrast, focus states, keyboard flows, reduced motion, form labels, and touch target sizing are part of every sub-system.
- **Performance as craft**: Sub-websites should be image-optimized, mobile-first, and fast enough to be launched without a rebuild of their visual foundation.

### MedQueue Healthcare Product

**Physical scene:** A patient or caregiver booking care from a bright phone screen under mild stress, needing proof before action.

**Role:** Product UI system for healthcare search, doctor evaluation, appointment booking, and patient portal screens.

**Case-study source of truth:** MedQueue is a decision engine, not a doctor directory. The core problem is uncertainty: patients need to know whether a doctor is credible, available today, and safe to book without calling three clinics manually.

**Redesign mandate:** Rebuild the experience around a tight confidence path: search by symptom, specialty, or location; compare doctors through contextual trust signals; inspect a profile that leads with verified credentials; choose a real slot from an availability grid; confirm and manage the appointment in a patient portal. Convenience should emerge from trust, not replace it.

**Color strategy:** Restrained clinical confidence. Cold blue neutrals carry the surface, hospital blue carries primary action, and soft green is reserved for trust or completion states.

- **Background** `oklch(0.97 0.005 240)`
- **Surface** `oklch(0.993 0.003 240)`
- **Ink** `oklch(0.15 0.008 240)`
- **Muted** `oklch(0.45 0.008 240)`
- **Rule** `oklch(0.88 0.012 240)`
- **Primary Blue** `oklch(0.55 0.17 240)`
- **Primary Soft** `oklch(0.93 0.035 240)`
- **Primary Deep** `oklch(0.40 0.14 240)`
- **Trust Green** `oklch(0.55 0.12 175)`
- **Trust Soft** `oklch(0.94 0.025 175)`
- **Hero Navy** `oklch(0.18 0.04 240)`

**Typography:** Bricolage Grotesque for names and major decision headings, Figtree for patient-readable body copy, Geist Mono for fees, IDs, wait times, and appointment metadata, Spectral only for testimonial or reassurance moments.

**Layout:** Dense but calm. Use max-width shells around `72rem`, two-column search/detail layouts on desktop, sticky booking summaries, calendar-grid interactions, and clear empty states. Progressive disclosure beats long medical walls.

**Required rebuild journey:** Search and discovery, doctor profile, slot selection, payment or confirmation, patient dashboard, appointment history, document/prescription surface, and a clinic-management preview if the story needs platform depth.

**Components:** Doctor card, credential strip, availability grid, filter rail, booking stepper, portal appointment card, document list, trust callout, search input, patient action footer.

**Motion:** Low amplitude. State changes can fade or slide 4 to 8px. Loading and confirmation states should feel steady, not celebratory. Respect reduced motion with instant state changes.

**Do not:** Use wellness gradients, generic teal healthcare branding, hospital stock-photo hero cliches, star ratings without context, hidden fees, phantom availability, or urgency copy around medical decisions.

### The Roastery Cafe Site

**Physical scene:** A visitor standing outside or walking nearby, phone in one hand, deciding if this cafe is worth entering now.

**Role:** Visit-intent brand site for hours, location, menu, atmosphere, and wholesale or catering inquiries.

**Case-study source of truth:** The Roastery is a real-time decision tool. Visitors are nearby, often mobile, and asking one practical question: should I go here right now?

**Redesign mandate:** Rebuild around the two-second decision: hours, address, direction tap, and full menu access must be visible immediately on mobile. The menu is not a secondary page. It is the primary content object, with prices, categories, dietary tags, seasonal specials, and proof of craft.

**Color strategy:** Warm material restraint. Dark roast brown grounds the brand, oat cream makes menu content readable, copper carries action, and muted coffee browns support secondary information.

- **Roast Ink** `oklch(0.20 0.035 55)` from `#2C241B`
- **Oat Cream** `oklch(0.97 0.012 78)` from `#F9F6F0`
- **Coffee Muted** `oklch(0.52 0.045 62)` from `#8B6E52`
- **Copper CTA** `oklch(0.62 0.145 43)` from `#D26E4B`
- **Steam Line** `oklch(0.88 0.018 72)`

**Typography:** Warm serif display for cafe atmosphere and menu headings, clean sans-serif for practical information, tabular numerals for prices and hours. Type should feel printed and readable in sunlight, not decorative.

**Layout:** Mobile-first single column. Hours, location, and menu entry must appear early. Menu sections should scan like a physical menu card with generous line-height, clear price alignment, and dietary tags kept small.

**Required rebuild journey:** Decide from the hero, scan signature items, open the full menu, check hours and location, get directions, understand the roasting story, view real place photography, and make contact for group, wholesale, or reservation needs.

**Components:** Sticky visit bar, menu category list, product row, seasonal special, map/directions block, hours panel, wholesale inquiry block, photo-led atmosphere section.

**Motion:** Gentle reveal, no parallax dependency. Hover states may warm copper or lift slightly, but the site must remain fast on poor mobile networks.

**Do not:** Hide the menu behind a PDF, bury address or hours, use startup-style gradients, rely on Instagram embeds, or make the site feel like a coffee marketplace.

### Aurelia Grand Hotel Site

**Physical scene:** A guest comparing rooms at night on a tablet, weighing trust, cancellation terms, and direct booking confidence.

**Role:** Boutique hotel brand and booking site for room discovery, policy clarity, direct reservation, and property confidence.

**Case-study source of truth:** Aurelia Grand competes with OTAs, not just other hotel websites. The site must out-trust aggregators through clearer room information, transparent policies, and a first-party direct booking experience.

**Redesign mandate:** Rebuild as the hotel's first room: unhurried, image-led, specific, and conversion-aware. Room cards must answer booking questions before selling ambiance. Policy content must feel like hospitality. Direct booking must feel safer than leaving for an OTA.

**Color strategy:** Modern restraint. Deep navy-black carries atmosphere, muted gold marks premium action, porcelain surfaces support room information, and warm linen softens policy content.

- **Lobby Navy** `oklch(0.13 0.025 250)`
- **Midnight Panel** `oklch(0.18 0.025 250)`
- **Porcelain** `oklch(0.96 0.006 82)`
- **Quiet Gold** `oklch(0.68 0.15 75)`
- **Aged Gold** `oklch(0.58 0.12 70)`
- **Policy Linen** `oklch(0.92 0.018 78)`
- **Guest Ink** `oklch(0.16 0.012 250)`

**Typography:** Elegant display serif for room names and property moments, measured sans-serif for booking facts, mono or tabular numerals for rates and availability. Luxury comes from precision, not ornamental type.

**Layout:** Image-led and unhurried. Room pages need decision cards for size, bed type, view, occupancy, cancellation, and rate parity. Policy pages should read like hospitality touchpoints, not legal footers.

**Required rebuild journey:** Property arrival, room comparison, room detail, policy clarity, direct booking, concierge contact, amenities and experiences, location confidence, and post-booking reassurance.

**Components:** Full-bleed property hero, room decision card, rate comparison row, policy panel, booking date selector, amenity list, direct-booking reassurance strip, concierge contact block.

**Motion:** Slow and fluid. Use opacity, scale, and subtle image movement. Avoid spectacle that fights the calm of a premium stay.

**Do not:** Use generic luxury hotel whitespace, carousel-by-default hero sections, gold-on-white low contrast, third-party booking-engine styling, vague room descriptions, or policy text treated as an afterthought.

### Greenfield Academy School Site

**Physical scene:** A parent evaluating admissions after work, trying to understand fit, fees, deadlines, outcomes, and values without calling the office.

**Role:** Admissions-first school website for parent trust, program comparison, inquiry, and seasonal admissions updates.

**Case-study source of truth:** Greenfield Academy is built for parents evaluating trust, competence, fees, deadlines, and fit for their child. Admissions is the primary journey, not a department buried under institutional self-presentation.

**Redesign mandate:** Rebuild as a parent-facing prospectus with answers before atmosphere. The first viewport should establish legitimacy, grades served, admissions path, and next action. Programs should be organized by age group, not academic department. Forms should be humane enough for a parent filling them at 11 PM.

**Color strategy:** Institutional warmth. Forest green carries trust and continuity, sage supports data and labels, sandstone warms parent-facing sections, and crisp light surfaces keep information legible.

- **Academy Forest** `oklch(0.19 0.045 150)` from `#0F2218`
- **Board Green** `oklch(0.29 0.055 150)` from `#1E392A`
- **Sage Proof** `oklch(0.62 0.075 112)` from `#8A9A5B`
- **Prospectus Paper** `oklch(0.96 0.012 84)`
- **Sandstone Warmth** `oklch(0.86 0.045 75)`
- **Parent Ink** `oklch(0.16 0.012 150)`

**Typography:** Traditional serif for institutional headings, modern sans-serif for parent-readable details, tabular numerals for fees, ratios, years, deadlines, and admissions steps.

**Layout:** Prospectus clarity. Lead with admissions timeline, grades served, outcomes, fees, and inquiry path. Use structured sections, fact strips, timeline rows, and comparison blocks before emotional storytelling.

**Required rebuild journey:** Legitimacy check, admissions timeline, grade/program exploration, fee and document review, campus life proof, FAQ, inquiry form, campus visit scheduling, and admissions-team contact.

**Components:** Admissions timeline, grade/program card, fee summary, campus life image block, parent FAQ accordion, inquiry form, deadline banner, proof strip, event schedule.

**Motion:** Minimal and reassuring. Timelines can step into view, accordions should be calm, and forms should validate progressively with plain language.

**Do not:** Use childish primary colors, mascot-first branding, drone-campus hero dependence, committee mission copy, hidden fees, or admissions buried behind generic About pages.

### Vortex Fitness Site

**Physical scene:** A comparison shopper checking schedules and pricing between workouts or on a commute, already motivated and looking for logistics.

**Role:** High-conversion fitness site for programs, schedule, coaches, transparent pricing, and trial booking.

**Case-study source of truth:** Vortex Fitness is a logistics and conversion site, not a motivational poster. Visitors already have intent. They need services, schedule, pricing, trainer credibility, and a clear trial path.

**Redesign mandate:** Rebuild around the three questions that win trial bookings: what do you offer, when are the classes, and how much does it cost? Schedule must be hero-level, pricing must be honest, trainers must lead with credentials, and every section should return to a no-card trial CTA.

**Color strategy:** Drenched high-energy dark. Near-black and charcoal create focus, electric lime owns action and urgency, red/orange appear only as difficulty or intensity metadata.

- **Training Black** `oklch(0.04 0.004 260)` from `#050505`
- **Iron Charcoal** `oklch(0.12 0.006 260)` from `#111`
- **Electric Lime** `oklch(0.91 0.29 126)` from `#CCFF00`
- **Intensity Red** `oklch(0.62 0.25 28)` from `#FF3333`
- **Power Orange** `oklch(0.74 0.18 62)` from `#FF9900`
- **Chalk White** `oklch(0.96 0.004 260)`

**Typography:** Heavy condensed or black-weight sans-serif for headings, italic cuts for movement, compact sans-serif for practical copy, tabular numerals for class times and prices. All-caps are acceptable for short labels and aggressive headings, not for body copy.

**Layout:** Direct and kinetic. Programs, schedule, coaches, pricing, and trial CTA each need clear sections. Schedules should be tables on desktop and stacked cards on mobile, with class type and level visible without interaction.

**Required rebuild journey:** Service overview, schedule preview, full schedule filtering, trainer credential review, pricing comparison, trial booking, confirmation, and contact for questions without hiding the price.

**Components:** Skewed CTA button, program image slab, schedule table, mobile class card, difficulty chip, trainer card, pricing tier, scrolling marquee, trial booking strip.

**Motion:** High-energy but controlled. Marquees, image grayscale-to-color, slight skewed button feedback, and section reveal are allowed. Do not animate layout properties, and reduce motion must stop continuous movement.

**Do not:** Use vague motivational poster copy, auto-playing video as the conversion engine, hidden pricing, lead-capture walls, PDF schedules, or skull-and-grunge aggression.

### Sub-Website Rebuild Quality Gate

Before any rebuilt showcase is considered ready to launch separately, it must pass this gate:

- The rebuilt direction can be explained from the case study without referring to the old demo implementation.
- The sub-website has its own local design tokens or documented token mapping.
- Navigation, footer, metadata, and primary CTA make sense without Kivox around it.
- The core journey is complete: evaluate, compare, decide, act.
- Mobile layout is not a compressed desktop layout.
- Forms and interactive flows include loading, error, empty, success, and reduced-motion states.
- Images are real, optimized, and relevant to the business world.
- The design survives without borrowed Kivox amber, Kivox typography rules, or Kivox section grammar.
- The page proves the case study's key decision: MedQueue reduces uncertainty, The Roastery answers visit intent, Aurelia earns direct bookings, Greenfield clarifies admissions, and Vortex converts through transparent logistics.

### Parent-Site Color Rules

**The Light-First Rule.** Light mode is the default visitor experience. The site loads in light mode unless the visitor has explicitly toggled to dark. System preference detection may be used, but the design must be optimized for light mode first.

**The Temperature Rule.** Light mode is cold-tinted (hue 250, chroma 0.002–0.005). Dark mode is warm-tinted (hue 55–85, chroma 0.005–0.02). This is deliberate polarity, not inconsistency. Pure `#000`, `#fff`, and `#808080` remain forbidden in both modes.

**The Warm Linen Exception.** Light mode uses cold neutrals everywhere except `--bg-surface-alt`, which uses `oklch(0.955 0.008 70)` (warm, hue 70). This prevents content-dense sections (services, process) from feeling clinical. The exception is intentional, not an oversight.

**The Committed Amber Rule.** Amber is the only chromatic color in site chrome. In light mode (the default), amber deepens to burnt amber `oklch(0.60 0.22 55)` for authority against cool surfaces. In dark mode, standard amber carries 30–60% of visual weight at hero moments, then retreats to ≤10% in content-heavy sections.

**The Dark Footer Rule.** The footer is permanently dark in both themes. The footer explicitly resets to warm dark tokens in `[data-theme="light"] footer`. The hero section is NOT dark-locked; it adapts to the active theme like all other sections.

**The POV Wash Rule.** The philosophical section uses `--pov-wash`: `oklch(0.95 0.003 250)` (cool) in light mode, `oklch(0.09 0.025 60)` (warm amber atmosphere) in dark mode.

## 4. Typography

**Display Font:** Bricolage Grotesque (with system-ui, sans-serif fallback) — `--font-headline`
**Body Font:** Figtree (with system-ui, sans-serif fallback) — `--font-body-sans`
**Editorial Font:** Spectral (with Georgia, Times New Roman, serif fallback) — `--font-spectral`
**Mono Font:** Geist Mono (with SF Mono, Roboto Mono, monospace fallback) — `--font-geist-mono`
**Handwritten Font:** Caveat Bold (annotation accent, used sparingly) — `--font-handwritten`

**Character:** Bricolage Grotesque brings French newspaper heritage and ink-trap warmth to headlines. Spectral provides digital-native editorial sophistication for subheads and pull quotes. Figtree delivers warm geometric-humanist readability for body text. Geist Mono adds technical precision to labels and metadata.

### Hierarchy

All sizes use `clamp()` for fluid viewport scaling. Scale ratio ≥1.25× between adjacent levels.

- **Display** (700, `clamp(3.5rem, 6vw + 1.5rem, 7.5rem)`, 1.02): Hero headlines only. Bricolage Grotesque Bold. Word-by-word stagger entrance with blur-to-sharp reveal. CSS class: `studio-h1-headline`.
- **Headline** (400, `clamp(2rem, 3vw + 0.5rem, 3.5rem)`, 1.1): Section subheads, editorial moments. Spectral Regular, often italic. Serif at this level creates deliberate tension with the sans display. CSS class: `studio-h2-editorial`.
- **Title** (600, `clamp(1.5rem, 1.5vw + 0.5rem, 2.25rem)`, 1.15): Card titles, service names, subsection headings. Bricolage Grotesque Semibold. CSS class: `studio-h3-sans`.
- **Body** (400, 1rem, 1.6): Running text, descriptions. Figtree Regular. Max line length 65–75ch. Line-height increases to 1.65 in dark mode for light-on-dark compensation. CSS class: `studio-body`.
- **Body Large** (400, `clamp(1.0625rem, 0.5vw + 0.5rem, 1.25rem)`, 1.65): Editorial body, large descriptions. Spectral Regular or Figtree. CSS class: `studio-body-serif` or `studio-body-large`.
- **Label** (500, 0.6875rem, 1.4, 0.12em tracking, uppercase): Eyebrows, tags, metadata. Geist Mono. Always uppercase, always tracked. CSS class: `studio-eyebrow` or `studio-tag`.

### Named Rules

**The Three-Voice Rule.** Headlines use Bricolage Grotesque (confident craft), subheads use Spectral (editorial warmth), body uses Figtree (clear readability). Never substitute one for another.

**The Tabular Rule.** All numeric data (step numbers, years, counters, project indices) uses `font-variant-numeric: tabular-nums` via the `studio-tabular` utility. No exceptions.

**The Balance Rule.** All headings use `text-wrap: balance`. All prose uses `text-wrap: pretty`. Non-negotiable.

## 5. Elevation

This system uses **structural shadows** with amber-tinted interaction states. Surfaces are flat by default; shadows define the elevation hierarchy and respond to user interaction with warmth.

In dark mode, shadows use white top-highlights (simulating overhead light on dark surfaces) paired with deep black diffuse shadows. In light mode, shadows use cool-tinted oklch values with lower opacity at rest, warming to burnt amber on hover. Both modes tint hover shadows toward amber.

### Shadow Vocabulary

**Dark mode:**
- **Rest** (`0 1px 0 0 oklch(1 0 0 / 0.08), 0 20px 60px -30px oklch(0 0 0 / 0.4)`): Default card elevation.
- **Hover** (`0 1px 0 0 oklch(0.72 0.18 65 / 0.15), 0 20px 60px oklch(0.72 0.18 65 / 0.06)`): Amber-tinted highlight + diffuse glow.
- **Hover Strong** (`0 1px 0 0 oklch(0.72 0.18 65 / 0.25), 0 24px 80px oklch(0.72 0.18 65 / 0.12)`): Intensified amber for featured elements.
- **Amber Glow** (`0 0 40px oklch(0.72 0.18 65 / 0.3)`): Pure radial amber glow. CTAs, focus indicators.
- **Strong** (`0 1px 0 0 oklch(1 0 0 / 0.12), 0 40px 90px -60px oklch(0 0 0 / 0.7)`): Maximum elevation for carousel frame.

**Light mode:**
- **Rest** (`0 1px 3px oklch(0.13 0.005 250 / 0.06), 0 6px 24px oklch(0.13 0.005 250 / 0.06)`): Cool, restrained depth.
- **Hover** (`0 2px 6px oklch(0.60 0.22 55 / 0.08), 0 16px 48px oklch(0.60 0.22 55 / 0.08)`): Burnt-amber warmth on interaction.
- **Amber Glow** (`0 0 30px oklch(0.60 0.22 55 / 0.14)`): Subtler radial glow for cool surfaces.
- **Strong** (`0 2px 6px oklch(0.13 0.005 250 / 0.08), 0 24px 72px oklch(0.13 0.005 250 / 0.10)`): Cool maximum elevation.

Surface texture tokens also shift per theme: `--studio-grid-opacity` is 0.22 (dark) / 0.10 (light); `--studio-noise-opacity` is 0.03 (dark) / 0.008 (light).

### Named Rules

**The Warm Response Rule.** Shadows are neutral at rest and warm on interaction. The transition from colorless depth to amber-tinted glow is the fundamental feedback pattern. Never use amber shadows at rest; never use cold shadows on hover.

**The Frame Rule.** The carousel frame component uses multi-layered inset + outer shadows to create a physical "recessed well" effect. This is the deepest elevation in the system: 5 shadow layers including inset shadows. No other component may approach this shadow complexity.

## 6. Components

### Buttons

Tactile and assured. Buttons feel like physical objects: they lift on hover, compress on press, glow with amber warmth.

- **Shape:** Fully rounded (9999px radius). All variants.
- **Primary:** Amber background (`--accent`), cream text (`--accent-ink`), 44px height, 24px horizontal padding. Font: 14px Figtree Medium.
- **Hover:** Lifts 2px (`translateY(-2px)`), amber glow shadow appears. 200ms ease-out-expo.
- **Active:** Compresses back to origin (`translateY(0)`).
- **Focus:** 2px amber outline, 3px offset.
- **Secondary:** Transparent background, foreground text, 1px border, same pill shape. Hover lifts and gains shadow.
- **Ghost:** No background, no border. Hover applies subtle surface tint.
- **Magnetic CTA:** Oversized primary variant (40px horizontal, 20px vertical padding, 16px text, semibold 600). Cursor-follow physics: button translates toward pointer at 20% displacement. Dynamic box-shadow follows displacement vector. Snap-back on release with quint easing. Used for the home contact section CTA only.

### Tags / Eyebrows

- **Eyebrow:** Geist Mono, 11px, uppercase, 0.12em tracking, accent color. Often paired with a pulsing amber dot (10px circle) and a fading gradient line on desktop. Bracketed format: `[ Section Name ]`. CSS class: `studio-eyebrow`.
- **Tag Pill:** Same typography as eyebrow but with 0.08em tracking. Transparent background with 1px border at rest, fully rounded, 8px/16px padding. Hover: border shifts to `accent/40`, text brightens to accent, faint amber-muted background tint. CSS class: `studio-tag`.

### Cards / Containers

- **Studio Surface:** The canonical card primitive. Elevated background, 1px strong border, 14px radius, rest shadow. Includes an internal hairline grid overlay (28px spacing, `--border-soft` at `--studio-grid-opacity`). Optional noise texture via `studio-surface--noise` modifier. Quiet/loud variants scale grid and noise opacity.
- **Service Card:** All services visible at a glance without interaction. Each card shows: service name (Title weight), short description (Body), and a checklist of 3–5 specific deliverables using check marks. Cards use `studio-surface` with standard padding. On desktop, an interactive detail panel may expand on click/hover as a progressive enhancement, but the default state must communicate the full service offering. The interactive 3D hover effects (perspective, rotateX, translateZ) may be retained as polish but must not gate content discovery.
- **Carousel Frame:** Signature component. Dark matte container (`oklch(0.13 0.015 55)`) with generous padding, multi-layer outer shadow, inset depth shadows, noise texture overlay, and an inner image well with edge-fade masks. Light mode uses cool neutral shadows instead.

### Inputs / Fields

- **Style:** Transparent background at 5% white opacity, 1px border, 14px radius, 16px/20px padding. Figtree 16px.
- **Focus:** Border shifts to accent, no outline, 3px accent ring at 12% opacity.
- **Error:** Border shifts to error color, ring shifts to red at 12% opacity. Error text: `text-sm` red.
- **Textarea:** Same as input, min-height 120px, vertical resize only.

### Navigation

- **Desktop:** Fixed, full-width, 80px height, z-50. **Full horizontal nav bar** with visible links: Home, Services, Work, About, Blog, Contact. No hamburger on desktop. Transitions to theme-aware blurred background (`backdrop-filter: blur(20px)`) with border-bottom on scroll. Logo: Custom SVG `<KivoxLogo />` component, responsive and animated on hover. CTA button: amber pill ("Book a Free Call" or equivalent low-commitment text).
- **Mobile:** Hamburger menu with full-screen overlay. Theme background, grain texture. Navigation links at 36–56px Bricolage Grotesque Bold with numbered indices (Geist Mono, amber). Cascade entrance with staggered blur-to-sharp reveals.
- **Scroll Behavior:** Nav transitions from transparent to blurred background with border-bottom on scroll. 500ms transition.

### Back to Top

Floating circular button (44px, rounded-full). Elevated background with `backdrop-filter: blur(12px)`. Accent border glow at rest. On hover: amber fill, accent-ink text, amber glow ring, lifts 2px. Appears after scrolling past 100vh. Entry/exit: fade + scale + translateY with quint easing.

### Signature: Constellation Canvas

Optional subtle background texture for the hero section, not the primary visual. Floating nodes with connecting lines, amber-tinted. Reduced opacity in light mode to avoid competing with the product mockup. Film grain texture at lower opacity. Hero-only; never repeated. The primary hero visual is the product mockup; the constellation canvas adds depth behind it.

### Hero Product Mockup

The hero's primary visual anchor. A beautifully art-directed laptop and/or phone frame displaying the best showcase website (e.g., The Roastery, Aurelia Grand). This communicates "we build websites" within 2 seconds. The mockup should be high-quality, showing real screenshot content from the live showcases. May use subtle parallax or float animation. In dark mode, the device frames use dark bezels; in light mode, silver/white bezels that match the Atelier theme.

### Testimonial Section

Homepage section displaying real testimonials. Each testimonial card includes: quote text (Spectral italic, `studio-body-serif`), person name (Bricolage Grotesque, semibold), role/context (Figtree, muted text), and optional photo (48px circle). Cards use the `studio-surface` primitive. Section eyebrow: `[ What People Say ]` or equivalent. Minimum 2, maximum 4 visible testimonials. No carousel unless there are more than 4.

### Concept Project Band

A horizontal band showing logos or names of the concept projects (MedQueue, The Roastery, Aurelia Grand, Greenfield Academy, Vortex Fitness). Framed honestly: eyebrow label reads `[ Projects We've Crafted ]` not "Trusted by" or "Our Clients." Logos use theme-foreground color at 60% opacity, brightening to 100% on hover. Subtle horizontal scroll on mobile if needed.

### Homepage FAQ

3–5 frequently asked questions displayed inline on the homepage, after the process section and before the contact section. Uses the existing `FaqAccordion` component. Questions should address the top objections: pricing ballpark, timeline, process, what the client needs to provide, and revision policy. Section eyebrow: `[ Common Questions ]`. The FAQ section should use the Warm Linen background in light mode to visually separate it from surrounding sections.

### Signature: Tunnel Canvas

Converging perspective lines creating a one-point corridor effect on the Work page carousel. Amber lines animate toward center, creating depth that draws the eye into project mockups.

## 7. Do's and Don'ts

### Do:

- **Do** default to light mode. The primary visitor experience is the Atelier (light) theme.
- **Do** show the product in the hero. Device mockups displaying real showcase websites communicate "we build websites" within 2 seconds.
- **Do** display a full navigation bar on desktop with all primary links visible. No hamburger on desktop.
- **Do** make services scannable without interaction. All service offerings should be visible at a glance with deliverable checklists. Interactive enhancement is progressive, not required.
- **Do** use low-commitment CTA language. "Book a Free Call" or "Let's Talk" rather than "Start a project."
- **Do** include real testimonials, a concept project band, and a homepage FAQ section.
- **Do** tint every neutral toward the theme hue: hue 250 in light mode, hue 55–85 in dark mode, except Warm Linen.
- **Do** use OKLCH as the canonical color format. Reduce chroma as lightness approaches 0 or 100.
- **Do** apply `text-wrap: balance` on all headings and `text-wrap: pretty` on all prose.
- **Do** increase body line-height from 1.6 to 1.65 in dark mode for light-on-dark compensation.
- **Do** use `font-variant-numeric: tabular-nums` for all numeric data via `studio-tabular`.
- **Do** use the `studio-eyebrow` class (Geist Mono, 11px, uppercase, 0.12em) for all section labels. Bracket format: `[ Label ]`.
- **Do** ease out with exponential curves (`cubic-bezier(0.16, 1, 0.3, 1)` or quart/quint). No bounce, no elastic.
- **Do** respect `prefers-reduced-motion` with instant fallbacks for every animation.
- **Do** use the `studio-surface` utility for card containers. The hairline grid is the signature texture.
- **Do** pair Bricolage Grotesque headlines with Spectral italic for the key emotional word in each section.
- **Do** dark-lock the footer only. Footer resets to warm dark tokens in `[data-theme="light"] footer`.
- **Do** deepen amber to burnt amber `oklch(0.60 0.22 55)` in light mode. Hover darkens further to `oklch(0.55 0.24 52)` (opposite direction from dark mode).
- **Do** present concept projects honestly. Use "Projects we've crafted" not "Our clients" or "Trusted by."

### Don't:

- **Don't** default to dark mode. Non-technical audiences associate dark UIs with "tech stuff."
- **Don't** use abstract hero visuals (gradient orbs, constellation art, particle effects) as the primary hero content. These don't communicate what the studio builds.
- **Don't** hide navigation behind a hamburger menu on desktop. All primary links must be visible.
- **Don't** require interaction to understand services. If a visitor can't see all offerings without clicking, the layout has failed.
- **Don't** use high-commitment CTA language ("Start a project") before trust is established.
- **Don't** fabricate statistics, client counts, or revenue claims. Only display numbers you can prove.
- **Don't** use pure black (`#000`), pure white (`#fff`), or any un-tinted gray. This violates the Temperature Rule.
- **Don't** use gradient text (`background-clip: text`). Per PRODUCT.md: "generic SaaS template sites."
- **Don't** use glassmorphism as a default surface treatment. Backdrop blur is reserved for the scrolled navigation bar and back-to-top button only.
- **Don't** use side-stripe borders (colored `border-left` or `border-right` > 1px as accents).
- **Don't** create hero-metric templates (big number, small label, supporting stats). Per PRODUCT.md: "enterprise posturing."
- **Don't** build identical card grids (same-sized cards with icon + heading + text repeated). Per PRODUCT.md: "template agency grids."
- **Don't** use neon colors, aggressive animations, or hype language. Per PRODUCT.md: "loud startup pages."
- **Don't** use awards/metrics claims, corporate jargon, or defensive disclaimers. Per PRODUCT.md: "enterprise posturing."
- **Don't** use em dashes in copy. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** restate headings or write intros that repeat the title. Every word earns its place.
- **Don't** use modals as a first thought. Exhaust inline and progressive alternatives first.
- **Don't** animate CSS layout properties (width, height, top, left). Use transform and opacity only.
- **Don't** use Inter, Space Grotesk, or any geometric grotesque as a substitute for Bricolage Grotesque. These are reflex-reject fonts.
- **Don't** override footer tokens in `[data-theme="light"]`. The footer is permanently dark.
- **Don't** use cold neutrals (hue 250) for `--bg-surface-alt` in light mode. That slot is the Warm Linen Exception.
