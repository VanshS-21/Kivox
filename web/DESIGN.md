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

**Creative North Stars:**

**Dark Mode: "The Firelit Studio."** Kivox's dark mode draws from the intimacy of a well-lit workshop at dusk: warm amber light pooling across dark surfaces, the confidence of tools laid out with intention, materials that feel honest rather than polished to anonymity. Warm-tinted neutrals (hue 55–85, chroma 0.005–0.02) ground everything. Amber carries 30–60% of visual weight at hero moments.

**Light Mode: "The Atelier in Morning Light."** A master craftsman's studio in cold morning light. White walls, raw materials, clean surfaces, sharp shadows from a single window. Considered. Architectural. Precise. The same craft and intention as the dark mode, expressed through clarity and restraint rather than drama and atmosphere. Cold-tinted neutrals (hue 250, chroma 0.002–0.005) replace warm surfaces, with one deliberate exception: the services and process sections use Warm Linen `oklch(0.955 0.008 70)` to avoid sterility in content-dense areas. Amber deepens to burnt amber for authority against cool backgrounds.

The system is Committed: amber is the only chromatic color in site chrome. The dual-theme system uses deliberate temperature polarity: dark mode is warm, light mode is cold. The amber accent bridges both, operating as firelight in dark mode and as deliberate tooling marks in light mode.

This system explicitly rejects generic SaaS template sites, loud startup pages, dark tech aesthetics with neon accents, enterprise posturing, and luxury hotel minimalism. If a visitor could mistake this for a template, the design has failed. The proof is in the execution: typography that demonstrates mastery, spacing that breathes without pretension, motion that responds rather than performs.

**Key Characteristics:**
- Temperature polarity: dark mode warm-tinted (hue 65), light mode cold-tinted (hue 250) with Warm Linen exception
- Committed amber accent at key moments, restrained everywhere else
- Editorial serif/sans pairing (Spectral + Bricolage Grotesque) for headline variety
- Structural shadows with amber-tinted hover states
- Scroll-driven section crossfades (overdrive system) for cinematic pacing
- Dual-theme: cold architectural (light) and firelit dark, connected by amber
- Hero and footer dark-locked in both themes
- Magnetic CTA physics and 3D depth-fan service interactions

Motion energy is Choreographed: orchestrated word-by-word hero entrances, scroll-driven crossfade reveals, magnetic CTA physics, 3D depth-fan service rows, tunnel canvas perspective effects, and constellation canvas generative backgrounds. All motion respects `prefers-reduced-motion` with instant fallbacks.

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

### Named Rules

**The Temperature Rule.** Dark mode is warm-tinted (hue 55–85, chroma 0.005–0.02). Light mode is cold-tinted (hue 250, chroma 0.002–0.005). This is deliberate polarity, not inconsistency. Pure `#000`, `#fff`, and `#808080` remain forbidden in both modes.

**The Warm Linen Exception.** Light mode uses cold neutrals everywhere except `--bg-surface-alt`, which uses `oklch(0.955 0.008 70)` (warm, hue 70). This prevents content-dense sections (services, process) from feeling clinical. The exception is intentional, not an oversight.

**The Committed Amber Rule.** Amber is the only chromatic color in site chrome. It carries 30–60% of visual weight at hero moments, then retreats to ≤10% in content-heavy sections. In light mode, amber deepens to burnt amber `oklch(0.60 0.22 55)` for authority against cool surfaces.

**The Dark-Locked Zones Rule.** The hero section and footer are permanently dark in both themes. Hero tokens (`--hero-bg`, `--hero-fg`, etc.) are defined only in `:root`, never overridden in `[data-theme="light"]`. The footer explicitly resets to warm dark tokens in `[data-theme="light"] footer`.

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
- **Service Row:** Not a card; a full-width bordered row. No background at rest. On hover: the row lifts, rotates slightly in 3D (`perspective: 1200px`, `rotateX`, `translateZ`), and siblings compress/dim with graduated distance. Arrow icon box (amber background, 12px radius) rotates 45° and gains an amber glow + pulse ring.
- **Carousel Frame:** Signature component. Dark matte container (`oklch(0.13 0.015 55)`) with generous padding, multi-layer outer shadow, inset depth shadows, noise texture overlay, and an inner image well with edge-fade masks. Light mode uses cool neutral shadows instead.

### Inputs / Fields

- **Style:** Transparent background at 5% white opacity, 1px border, 14px radius, 16px/20px padding. Figtree 16px.
- **Focus:** Border shifts to accent, no outline, 3px accent ring at 12% opacity.
- **Error:** Border shifts to error color, ring shifts to red at 12% opacity. Error text: `text-sm` red.
- **Textarea:** Same as input, min-height 120px, vertical resize only.

### Navigation

- **Desktop:** Fixed, full-width, 80px height, z-50. Transparent over dark hero, then transitions to theme-aware blurred background (`backdrop-filter: blur(20px)`) with border-bottom on scroll. Logo: Bricolage Grotesque Bold 18px. CTA button: amber pill with arrow, 8px radius. Hamburger: three animated bars (rotate to X on open).
- **Mobile Overlay:** Full-screen, theme background, grain texture. Navigation links at 36–56px Bricolage Grotesque Bold with numbered indices (Geist Mono, amber). Cascade entrance with staggered blur-to-sharp reveals. Amber underline draws on hover. Connect/email info in right column with eyebrow labels.
- **Scroll Behavior:** Nav element colors adapt: white/cream over dark hero, theme-foreground after scrolling past hero bottom edge. 500ms color transition.

### Back to Top

Floating circular button (44px, rounded-full). Elevated background with `backdrop-filter: blur(12px)`. Accent border glow at rest. On hover: amber fill, accent-ink text, amber glow ring, lifts 2px. Appears after scrolling past 100vh. Entry/exit: fade + scale + translateY with quint easing.

### Signature: Constellation Canvas

Generative background for the hero section. Dark variant always (`oklch(0.05 0.008 65)`). Floating nodes with connecting lines, amber-tinted. Radial amber glow overlay. Film grain texture at 35% opacity. Hero-only; never repeated.

### Signature: Tunnel Canvas

Converging perspective lines creating a one-point corridor effect on the Work page carousel. Amber lines animate toward center, creating depth that draws the eye into project mockups.

## 6. Do's and Don'ts

### Do:

- **Do** tint every neutral toward the theme hue: hue 55–85 in dark mode, hue 250 in light mode, except Warm Linen.
- **Do** use OKLCH as the canonical color format. Reduce chroma as lightness approaches 0 or 100.
- **Do** apply `text-wrap: balance` on all headings and `text-wrap: pretty` on all prose.
- **Do** increase body line-height from 1.6 to 1.65 in dark mode for light-on-dark compensation.
- **Do** use `font-variant-numeric: tabular-nums` for all numeric data via `studio-tabular`.
- **Do** use the `studio-eyebrow` class (Geist Mono, 11px, uppercase, 0.12em) for all section labels. Bracket format: `[ Label ]`.
- **Do** ease out with exponential curves (`cubic-bezier(0.16, 1, 0.3, 1)` or quart/quint). No bounce, no elastic.
- **Do** respect `prefers-reduced-motion` with instant fallbacks for every animation.
- **Do** use the `studio-surface` utility for card containers. The hairline grid is the signature texture.
- **Do** pair Bricolage Grotesque headlines with Spectral italic for the key emotional word in each section (e.g., "trust online.", "exceptional?", "building.").
- **Do** dark-lock the hero and footer. Hero tokens inherit from `:root` defaults. Footer resets to warm dark tokens in `[data-theme="light"] footer`.
- **Do** deepen amber to burnt amber `oklch(0.60 0.22 55)` in light mode. Hover darkens further to `oklch(0.55 0.24 52)` (opposite direction from dark mode).

### Don't:

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
- **Don't** override hero or footer tokens in `[data-theme="light"]`. Both zones are permanently dark.
- **Don't** use cold neutrals (hue 250) for `--bg-surface-alt` in light mode. That slot is the Warm Linen Exception.
