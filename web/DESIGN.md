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
  parchment: "oklch(0.97 0.012 75)"
  parchment-card: "oklch(0.99 0.008 80)"
  warm-linen: "oklch(0.95 0.015 72)"
  warm-sandstone: "oklch(0.92 0.02 68)"
  rich-warm-ink: "oklch(0.16 0.01 55)"
  burnt-amber: "oklch(0.62 0.2 55)"
  burnt-amber-deep: "oklch(0.57 0.22 52)"
  pov-wash-dark: "oklch(0.09 0.025 60)"
  pov-wash-light: "oklch(0.90 0.06 62)"
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
  section: "120px"
  section-large: "160px"
  section-small: "80px"
  xl: "64px"
  lg: "48px"
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
    backgroundColor: "{colors.amber-muted}"
    textColor: "{colors.warm-amber}"
    rounded: "{rounded.full}"
    padding: "6px 16px"
  eyebrow-label:
    textColor: "{colors.warm-amber}"
    padding: "0"
---

# Design System: Kivox

## 1. Overview

**Creative North Star: "The Firelit Studio"**

Kivox's visual language is built around a single conviction: the site itself is the portfolio. Every pixel demonstrates the craft, clarity, and warmth the studio promises to deliver. The aesthetic draws from the intimacy of a well-lit workshop at dusk; warm amber light pooling across dark surfaces, the confidence of tools laid out with intention, materials that feel honest rather than polished to anonymity.

The system is Committed: warm amber carries 30–60% of visual weight at key moments (hero, CTAs, section transitions), while warm-tinted neutrals ground everything else. There is no pure black, no pure white, no cold gray anywhere in the palette. Every neutral is shifted toward the amber hue family at chroma 0.005–0.02, creating a cohesion that feels inevitable rather than decorated.

This system explicitly rejects generic SaaS template sites, loud startup pages, dark tech aesthetics with neon accents, enterprise posturing, and luxury hotel minimalism. If a visitor could mistake this for a template, the design has failed. The proof is in the execution: typography that demonstrates mastery, spacing that breathes without pretension, motion that responds rather than performs.

**Key Characteristics:**
- Warm-tinted neutrals in every surface (hue 55–85, chroma 0.005–0.02)
- Committed amber accent at key moments, restrained everywhere else
- Editorial serif/sans pairing (Spectral + Bricolage Grotesque) for headline variety
- Structural shadows with amber-tinted hover states
- Scroll-driven section crossfades (overdrive system) for cinematic pacing
- Dual-theme: warm parchment (light) and firelit dark, both fully warm-tinted

Motion energy is Choreographed: orchestrated word-by-word hero entrances, scroll-driven crossfade reveals, magnetic CTA physics, 3D depth-fan service rows, and constellation/tunnel canvas generative backgrounds. All motion respects `prefers-reduced-motion` with instant fallbacks.

## 2. Colors: The Firelit Palette

A dual-theme palette where every value is warm-tinted. The dark mode is primary (the hero is always dark); light mode is a warm parchment variant. OKLCH is the canonical color space. Hex approximations appear in parentheses for reference only; the OKLCH values in the frontmatter are normative.

### Primary

- **Warm Amber** `oklch(0.72 0.18 65)` (≈ #d99520): The signature accent. Used for CTAs, eyebrow labels, active navigation states, hover borders, glow effects, and the pulsing status dots. In light mode, this deepens to Burnt Amber `oklch(0.62 0.2 55)` (≈ #b5611a) for stronger contrast against parchment backgrounds.
- **Amber Hover** `oklch(0.78 0.18 65)` (≈ #f0a830): Lighter variant for dark-mode hover states. In light mode, hover darkens instead to `oklch(0.57 0.22 52)`.
- **Amber Glow** `oklch(0.72 0.18 65 / 0.33)`: The halo around interactive elements on hover. Applied as box-shadow, never as background.
- **Amber Muted** `oklch(0.72 0.18 65 / 0.12)`: Subtle tint for tag pill backgrounds, selection highlights, and low-key accent washes.

### Secondary

- **Ember Rose** `oklch(0.55 0.12 35)`: A warm, muted rose used exclusively for secondary ambient glows in the contact section. Never used for text or interactive elements. Exists to break amber monotony in atmospheric effects.

### Neutral

Dark mode (primary):
- **Firelit Black** `oklch(0.05 0.005 65)` (≈ #0f0d0b): Base background. Warm-tinted, never pure black.
- **Warm Card** `oklch(0.10 0.005 65)` (≈ #1a1816): Elevated card surfaces.
- **Warm Surface** `oklch(0.13 0.006 65)` (≈ #221f1c): Raised surfaces, carousel frame interiors.
- **Warm Alt** `oklch(0.07 0.005 65)` (≈ #131110): Alternate surface for services section.
- **Warm White** `oklch(0.98 0.01 85)` (≈ #faf8f2): Primary text. Never pure white.
- **Warm Muted** `oklch(0.98 0.01 85 / 0.6)`: Secondary text, descriptions.
- **Warm Subtle** `oklch(0.98 0.01 85 / 0.35)`: Tertiary text, captions.
- **Amber Ink** `oklch(0.99 0.008 80)`: Text rendered on amber backgrounds (buttons, badges).

Light mode:
- **Parchment** `oklch(0.97 0.012 75)` (≈ #f7f3ec): Base background.
- **Parchment Card** `oklch(0.99 0.008 80)` (≈ #fdfbf7): Elevated cards.
- **Warm Linen** `oklch(0.95 0.015 72)` (≈ #f0ebe2): Surface level.
- **Warm Sandstone** `oklch(0.92 0.02 68)` (≈ #e6dfd3): Alternate surface.
- **Rich Warm Ink** `oklch(0.16 0.01 55)` (≈ #1c1815): Primary text.

Borders use the same warm tint at 0.08/0.12/0.05 alpha (strong/standard/soft).

### Project Showcase Accents

Used exclusively for Work page slides and case study contexts. Never in site chrome.

- **Hospital Blue** `oklch(0.55 0.17 240)`: Healthcare projects.
- **Hotel Gold** `oklch(0.68 0.15 75)`: Hospitality projects.
- **School Green** `oklch(0.58 0.2 155)`: Education projects.
- **Fitness Violet** `oklch(0.55 0.22 300)`: Fitness projects.
- **Café Coral** `oklch(0.55 0.24 25)`: Food & beverage projects.

### Named Rules

**The Warm Tint Rule.** Every neutral in both themes carries chroma 0.005–0.02 toward the amber hue family (H 55–85). Pure `#000`, `#fff`, and `#808080` are forbidden. The warmth is the identity.

**The Committed Amber Rule.** Amber is the only chromatic color in site chrome. It carries 30–60% of visual weight at hero moments, CTAs, and section transitions, then retreats to ≤10% in content-heavy sections. Its presence is deliberate; its absence is equally deliberate.

**The POV Wash Rule.** The philosophical section (POV) and services section use a committed amber-tinted environmental wash (`--pov-wash`) that shifts between `oklch(0.90 0.06 62)` in light mode and `oklch(0.09 0.025 60)` in dark mode. This is the one surface where amber becomes atmospheric rather than accent.

## 3. Typography

**Display Font:** Bricolage Grotesque (with system-ui, sans-serif fallback)
**Body Font:** Figtree (with system-ui, sans-serif fallback)
**Editorial Font:** Spectral (with Georgia, Times New Roman, serif fallback)
**Mono Font:** Geist Mono (with SF Mono, Roboto Mono, monospace fallback)
**Handwritten Font:** Caveat (annotation accent, used sparingly)

**Character:** Bricolage Grotesque brings French newspaper heritage and ink-trap warmth to headlines, avoiding the ubiquity of geometric grotesques (Space Grotesk, Inter are explicit reflex-rejects). Spectral provides digital-native editorial sophistication for subheads and pull quotes. Figtree delivers warm geometric-humanist readability for body text, replacing Inter's cold neutrality. Geist Mono adds technical precision to labels and metadata.

### Hierarchy

All sizes use `clamp()` for fluid viewport scaling. No breakpoint-specific overrides. Scale ratio ≥1.25× between adjacent levels.

- **Display** (700, `clamp(3.5rem, 6vw + 1.5rem, 7.5rem)`, 1.02): Hero headlines only. Bricolage Grotesque Bold. Word-by-word stagger entrance with blur-to-sharp reveal. CSS class: `studio-h1-headline`.
- **Headline** (400, `clamp(2rem, 3vw + 0.5rem, 3.5rem)`, 1.1): Section subheads, editorial moments. Spectral Regular, often italic. The serif at this level creates deliberate tension with the sans display. CSS class: `studio-h2-editorial`.
- **Title** (600, `clamp(1.5rem, 1.5vw + 0.5rem, 2.25rem)`, 1.15): Card titles, service names, subsection headings. Bricolage Grotesque Semibold. CSS class: `studio-h3-sans`.
- **Body** (400, 1rem, 1.6): Running text, descriptions. Figtree Regular. Max line length 65–75ch. Line-height increases to 1.65 in dark mode for light-on-dark compensation. CSS class: `studio-body`.
- **Body Large** (400, `clamp(1.0625rem, 0.5vw + 0.5rem, 1.25rem)`, 1.65): Editorial body, large descriptions. Spectral Regular or Figtree. CSS class: `studio-body-serif` or `studio-body-large`.
- **Label** (500, 0.6875rem, 1.4, 0.12em tracking, uppercase): Eyebrows, tags, metadata. Geist Mono. Always uppercase, always tracked. CSS class: `studio-eyebrow` or `studio-tag`.

### Named Rules

**The Three-Voice Rule.** Headlines use Bricolage Grotesque (confident craft), subheads use Spectral (editorial warmth), body uses Figtree (clear readability). Never substitute one for another. The contrast between voices is the typographic identity.

**The Tabular Rule.** All numeric data (step numbers, years, counters, project indices) uses `font-variant-numeric: tabular-nums` via the `studio-tabular` utility. No exceptions.

**The Balance Rule.** All headings use `text-wrap: balance`. All prose uses `text-wrap: pretty`. These are non-negotiable for typographic polish.

## 4. Elevation

This system uses **structural shadows** with amber-tinted interaction states. Surfaces are flat by default; shadows define the elevation hierarchy and respond to user interaction with warmth.

In dark mode, shadows use white top-highlights (simulating overhead light on dark surfaces) paired with deep black diffuse shadows. In light mode, shadows use warm-tinted oklch values with lower opacity. Both modes tint hover shadows toward amber.

### Shadow Vocabulary

- **Rest** (`0 1px 0 0 oklch(1 0 0 / 0.08), 0 20px 60px -30px oklch(0 0 0 / 0.4)`): Default card elevation. Subtle top highlight + soft depth. Used for `studio-surface` utility and standard cards.
- **Hover** (`0 1px 0 0 oklch(0.72 0.18 65 / 0.15), 0 20px 60px oklch(0.72 0.18 65 / 0.06)`): Amber-tinted highlight + amber diffuse glow. Cards lift on hover; the shadow warms simultaneously.
- **Hover Strong** (`0 1px 0 0 oklch(0.72 0.18 65 / 0.25), 0 24px 80px oklch(0.72 0.18 65 / 0.12)`): Intensified amber glow for featured interactive elements.
- **Amber Glow** (`0 0 40px oklch(0.72 0.18 65 / 0.3)`): Pure radial amber glow. CTAs, active states, focus indicators. Combined with other shadows for emphasis, never used alone on surfaces.
- **Strong** (`0 1px 0 0 oklch(1 0 0 / 0.12), 0 40px 90px -60px oklch(0 0 0 / 0.7)`): Maximum elevation for modals, popovers, the carousel frame. Stronger highlight, deeper shadow.

### Named Rules

**The Warm Response Rule.** Shadows are neutral at rest and warm on interaction. The transition from colorless depth to amber-tinted glow is the fundamental feedback pattern. Never use amber shadows at rest; never use cold shadows on hover.

**The Frame Rule.** The carousel frame component uses multi-layered inset + outer shadows to create a physical "recessed well" effect (dark matte frame with a deep inner shadow). This is the deepest elevation in the system: 5 shadow layers including inset shadows. No other component may approach this shadow complexity.

## 5. Components

### Buttons

Tactile and assured. Buttons feel like physical objects: they lift on hover, compress on press, and glow with amber warmth.

- **Shape:** Fully rounded (9999px radius). All variants.
- **Primary:** Amber background (`{colors.warm-amber}`), cream text (`{colors.amber-ink}`), 44px height, 24px horizontal padding. Font: 14px Figtree Medium, tight tracking.
- **Hover:** Lifts 2px (`translateY(-2px)`), amber glow shadow appears. 200ms ease-out.
- **Active:** Compresses back to origin (`translateY(0)`).
- **Focus:** 2px amber outline, 3px offset, ring-offset matches background.
- **Secondary:** Transparent background, foreground text, 1px border (`--border`), same pill shape. Hover lifts and gains shadow.
- **Ghost:** No background, no border. Hover applies subtle surface tint.

### Tags / Eyebrows

- **Eyebrow:** Geist Mono, 11px, uppercase, 0.12em tracking, amber color. Often paired with a pulsing amber dot (w-2.5, h-2.5) and a fading gradient line on desktop. Bracketed format: `[ Section Name ]`.
- **Tag Pill:** Same typography as eyebrow but with 0.08em tracking. Amber-muted background, amber text, fully rounded, 6px/16px padding. Hover: border shifts to `accent/40`, text brightens, faint amber background tint.

### Cards / Containers

- **Studio Surface:** The canonical card primitive. Elevated background, 1px strong border, 14px radius, rest shadow. Includes an internal hairline grid overlay (28px spacing, `--border-soft` at `--studio-grid-opacity`). Optional noise texture via `studio-surface--noise` modifier. Quiet/loud variants scale grid and noise opacity.
- **Service Row:** Not a card; a full-width bordered row. No background at rest. On hover: the row lifts, rotates slightly in 3D (perspective fan), and siblings compress/dim with graduated distance. Arrow icon box (amber, 14–16px radius) rotates 45° and gains an amber glow + pulse ring.
- **Carousel Frame:** Signature component. Dark matte container (`oklch(0.13 0.015 55)`) with generous padding, multi-layer outer shadow, inset depth shadows, noise texture overlay, and an inner image well with edge-fade masks. Images receive color grading (`saturate(0.9) contrast(1.05) brightness(0.96)`).

### Inputs / Fields

- **Style:** Transparent background at 5% white opacity, 1px border, 14px radius, 16px/20px padding. Figtree 16px.
- **Focus:** Border shifts to amber, no outline, 3px amber ring at 12% opacity.
- **Error:** Border shifts to `#ff4444`, ring shifts to red at 12% opacity.
- **Textarea:** Same as input, min-height 120px, vertical resize only.

### Navigation

- **Desktop:** Fixed, full-width, 80px height, z-50. Transparent over dark hero, then transitions to theme-aware blurred background (`backdrop-filter: blur(20px)`) with border-bottom on scroll. Logo: Bricolage Grotesque Bold 18px. CTA button: amber pill with arrow. Hamburger: three animated bars (rotate to X on open).
- **Mobile Overlay:** Full-screen, theme background. Navigation links at 36–56px Bricolage Grotesque Bold with numbered indices (Geist Mono, amber). Cascade entrance with staggered blur-to-sharp reveals. Amber underline draws on hover. Connect/email info in right column with eyebrow labels.
- **Scroll Behavior:** Nav text color adapts: white/cream over dark hero, theme-foreground after scrolling past. 500ms color transition.

### Signature: Constellation Canvas

Generative background for the hero section. Dark variant always (`#0d0a05`). Floating nodes with connecting lines, amber-tinted. Radial amber glow overlay. Film grain texture at 35% opacity. Used only on the home hero; never repeated elsewhere.

### Signature: Tunnel Canvas

Converging perspective lines creating a one-point corridor effect on the Work page carousel. Amber lines animate toward center, creating depth that draws the eye into project mockups.

## 6. Do's and Don'ts

### Do:

- **Do** tint every neutral toward hue 55–85 at chroma 0.005–0.02. The warmth is non-negotiable.
- **Do** use OKLCH as the canonical color format. Reduce chroma as lightness approaches 0 or 100.
- **Do** apply `text-wrap: balance` on all headings and `text-wrap: pretty` on all prose.
- **Do** increase body line-height from 1.6 to 1.65 in dark mode for light-on-dark compensation.
- **Do** use `font-variant-numeric: tabular-nums` for all numeric data via `studio-tabular`.
- **Do** use the `studio-eyebrow` class (Geist Mono, 11px, uppercase, 0.12em) for all section labels. Bracket format: `[ Label ]`.
- **Do** ease out with exponential curves (`cubic-bezier(0.16, 1, 0.3, 1)` or quart/quint). No bounce, no elastic.
- **Do** respect `prefers-reduced-motion` with instant fallbacks for every animation.
- **Do** use the `studio-surface` utility for card containers. The hairline grid is the signature texture.
- **Do** pair Bricolage Grotesque headlines with Spectral italic for the key emotional word in each section (e.g., "trust online.", "exceptional?").

### Don't:

- **Don't** use pure black (`#000`), pure white (`#fff`), or any un-tinted gray. This violates the Warm Tint Rule.
- **Don't** use gradient text (`background-clip: text`). This is an absolute ban, per PRODUCT.md: "generic SaaS template sites."
- **Don't** use glassmorphism as a default surface treatment. Backdrop blur is reserved for the scrolled navigation bar only.
- **Don't** use side-stripe borders (colored `border-left` or `border-right` > 1px as accents). Rewrite with full borders, background tints, or nothing.
- **Don't** create hero-metric templates (big number, small label, supporting stats). This is "enterprise posturing" per PRODUCT.md.
- **Don't** build identical card grids (same-sized cards with icon + heading + text repeated). Per PRODUCT.md: "template agency grids."
- **Don't** use neon colors, aggressive animations, or hype language. Per PRODUCT.md: "loud startup pages."
- **Don't** use awards/metrics claims, corporate jargon, or defensive disclaimers. Per PRODUCT.md: "enterprise posturing."
- **Don't** use em dashes in copy. Use commas, colons, semicolons, periods, or parentheses.
- **Don't** restate headings or write intros that repeat the title. Every word earns its place.
- **Don't** use modals as a first thought. Exhaust inline and progressive alternatives first.
- **Don't** animate CSS layout properties (width, height, top, left). Use transform and opacity only.
- **Don't** use Inter, Space Grotesk, or any geometric grotesque as a substitute for Bricolage Grotesque. These are reflex-reject fonts.
