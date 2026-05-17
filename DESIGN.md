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

### Sub-Website Rebuild Design Systems

These are target design systems for the rebuild of every launchable showcase website. The current `/showcase/*` implementations are not canonical design references. The case studies in `src/content/work/*` are the source of truth for business context, user intent, information architecture, proof, and conversion behavior.

Each rebuilt sub-website should feel like a separate client property that could launch on its own domain. They are not Kivox theme variants. They may have their own logo, navigation, typography, palette, motion, component grammar, and content structure. Kivox chrome should stay outside the sub-website canvas, limited to the demo frame or route wrapper when needed.

The shared inheritance is quality, not visual sameness:

- **Intentional separation**: A sub-website should look like the client world it represents, not like Kivox wearing a different accent color.
- **Local tokens first**: Each sub-website owns its own color, type, spacing, radius, shadow, and motion tokens. Kivox tokens may be referenced for implementation convenience only when they fit the sub-brand.
- **Case-study alignment**: Every design choice must map back to the case study's challenge, insight, approach, key design decisions, target audience, primary actions, and core sections.
- **Launchable depth**: Each system must support a real homepage, key conversion path, legal/contact footer, responsive navigation, metadata, and at least one deeper proof or transaction screen.
- **AA by default**: Contrast, focus states, keyboard flows, reduced motion, form labels, and touch target sizing are part of every sub-system.
- **Performance as craft**: Sub-websites should be image-optimized, mobile-first, and fast enough to be launched without a rebuild of their visual foundation.

*Note: For detailed sub-website specs (MedQueue, The Roastery, Aurelia Grand, Greenfield Academy, Vortex Fitness), refer to the case studies and project documentation.*

## 2. Colors

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

### Parent-Site Color Rules

**The Light-First Rule.** Light mode is the default visitor experience. The site loads in light mode unless the visitor has explicitly toggled to dark. System preference detection may be used, but the design must be optimized for light mode first.

**The Temperature Rule.** Light mode is cold-tinted (hue 250, chroma 0.002–0.005). Dark mode is warm-tinted (hue 55–85, chroma 0.005–0.02). This is deliberate polarity, not inconsistency. Pure `#000`, `#fff`, and `#808080` remain forbidden in both modes.

**The Warm Linen Exception.** Light mode uses cold neutrals everywhere except `--bg-surface-alt`, which uses `oklch(0.955 0.008 70)` (warm, hue 70). This prevents content-dense sections (services, process) from feeling clinical. The exception is intentional, not an oversight.

**The Committed Amber Rule.** Amber is the only chromatic color in site chrome. In light mode (the default), amber deepens to burnt amber `oklch(0.60 0.22 55)` for authority against cool surfaces. In dark mode, standard amber carries 30–60% of visual weight at hero moments, then retreats to ≤10% in content-heavy sections.

**The Dark Footer Rule.** The footer is permanently dark in both themes. The footer explicitly resets to warm dark tokens in `[data-theme="light"] footer`. The hero section is NOT dark-locked; it adapts to the active theme like all other sections.

**The POV Wash Rule.** The philosophical section uses `--pov-wash`: `oklch(0.95 0.003 250)` (cool) in light mode, `oklch(0.09 0.025 60)` (warm amber atmosphere) in dark mode.

## 3. Typography

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

## 4. Elevation

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

## 5. Components

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

## 6. Do's and Don'ts

Concrete, forceful guardrails mapping directly to PRODUCT.md's anti-references.

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
