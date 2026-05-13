# Design

## Visual Theme

**Warm Craft Editorial** - Approachable premium with editorial sophistication, warm amber accents, and proof-forward presentation.

### Design Identity
Bold, confident studio aesthetic that demonstrates craft through execution. The design emphasizes warmth, sophistication, and work-forward presentation through carefully chosen typography, warm amber accents on dark backgrounds, and immersive storytelling.

### Core Aesthetic Principles
1. **Warm over cold**: Amber (#ff9500) instead of cyan/lime, warm whites instead of pure white
2. **Editorial sophistication**: Serif subheads (Spectral) mixed with warm craft sans (Bricolage Grotesque)
3. **Proof-forward**: Lead with work demonstrations, not defensive claims
4. **Craft as evidence**: Typography, spacing, and motion quality demonstrate capability
5. **Generous breathing room**: 120-200px section padding, never cramped

### Inspiration Reference
Primary inspiration: madebycat.com - Bold typography, confident presentation, work-forward approach, premium craft aesthetic without pretension.

---

## Color System

### Dark Mode (Primary)

#### Backgrounds
```css
--bg-primary: #0d0d0d           /* Deep black base */
--bg-elevated: #1a1a1a          /* Card backgrounds */
--bg-surface: #222222           /* Elevated surfaces */
--bg-surface-alt: #111111       /* Alternate surface (services) */
```

**OKLCH equivalents:**
```css
--bg-primary: oklch(0.05 0 0)
--bg-elevated: oklch(0.10 0 0)
--bg-surface: oklch(0.13 0 0)
--bg-surface-alt: oklch(0.07 0 0)
```

#### Foreground
```css
--fg-primary: #fafaf8          /* Warm white (never pure white) */
--fg-muted: rgba(250,250,248,0.6)   /* Muted text */
--fg-subtle: rgba(250,250,248,0.35) /* Very subtle text */
```

**OKLCH equivalents:**
```css
--fg-primary: oklch(0.98 0.01 85)
--fg-muted: oklch(0.98 0.01 85 / 0.6)
--fg-subtle: oklch(0.98 0.01 85 / 0.35)
```

#### Accent - Warm Amber
```css
--accent: #ff9500              /* Primary amber */
--accent-hover: #ffaa33        /* Hover state (lighter) */
--accent-glow: rgba(255,149,0,0.33)   /* Glow effect */
--accent-muted: rgba(255,149,0,0.12)  /* Subtle tint */
--accent-ink: #000000          /* Text on amber backgrounds */
```

**OKLCH equivalents:**
```css
--accent: oklch(0.72 0.18 65)
--accent-hover: oklch(0.78 0.18 65)
--accent-glow: oklch(0.72 0.18 65 / 0.33)
--accent-muted: oklch(0.72 0.18 65 / 0.12)
--accent-ink: oklch(0 0 0)
```

**Contrast ratios:**
- Amber on dark (#ff9500 on #0d0d0d): 7.2:1 (AAA)
- White on dark (#fafaf8 on #0d0d0d): 15.8:1 (AAA)
- Muted text on dark: 4.6:1 (AA)

#### Borders
```css
--border: rgba(255,255,255,0.08)        /* Standard border */
--border-strong: rgba(255,255,255,0.12) /* Emphasized border */
--border-soft: rgba(255,255,255,0.05)   /* Subtle divider */
```

**OKLCH equivalents:**
```css
--border: oklch(1 0 0 / 0.08)
--border-strong: oklch(1 0 0 / 0.12)
--border-soft: oklch(1 0 0 / 0.05)
```

### Light Mode (Secondary)

#### Backgrounds
```css
--bg-primary: #fafaf8          /* Warm white */
--bg-elevated: #ffffff         /* Pure white cards */
--bg-surface: #f5f5f3          /* Subtle gray */
```

**OKLCH equivalents:**
```css
--bg-primary: oklch(0.98 0.01 85)
--bg-elevated: oklch(1 0 0)
--bg-surface: oklch(0.96 0.01 85)
```

#### Foreground
```css
--fg-primary: #1a1a1a          /* Near black */
--fg-muted: rgba(26,26,26,0.65)     /* Muted text */
--fg-subtle: rgba(26,26,26,0.4)     /* Very subtle text */
```

#### Accent (same amber, different ink)
```css
--accent: #ff9500
--accent-ink: #000000          /* Black text on amber */
```

#### Borders
```css
--border: rgba(0,0,0,0.08)
--border-strong: rgba(0,0,0,0.12)
--border-soft: rgba(0,0,0,0.05)
```

### Project-Specific Accent Colors

Used for Work page slides and case study accents:

```css
--project-hospital: #5aadff    /* Blue - Healthcare */
--project-hotel: #f5bc48       /* Gold - Hospitality */
--project-school: #3dda8a      /* Green - Education */
--project-fitness: #c77dff     /* Purple - Fitness */
--project-cafe: #ff6b6b        /* Coral - Food & Beverage */
```

**OKLCH equivalents:**
```css
--project-hospital: oklch(0.68 0.15 240)
--project-hotel: oklch(0.80 0.12 85)
--project-school: oklch(0.75 0.18 155)
--project-fitness: oklch(0.68 0.20 300)
--project-cafe: oklch(0.65 0.22 25)
```

### Color Usage Guidelines

1. **Accent color (amber)**: Use sparingly for CTAs, tags, hover states, active states, and key moments. Never overuse.
2. **Backgrounds**: Layer from #0d0d0d (base) → #1a1a1a (cards) → #222222 (elevated)
3. **Text**: Never pure white (#fff) - always warm tinted (#fafaf8)
4. **Borders**: Subtle by default (0.08 opacity), never prominent unless interactive
5. **Project colors**: Only for Work page slides and case study hero sections
6. **Hover states**: Amber glow, not just color change
7. **Focus states**: 2px amber outline, 3px offset

---

## Typography System

### Font Stack

#### Headlines (Bold Sans)
```css
--font-headline: 'Bricolage Grotesque', system-ui, sans-serif;
/* Tailwind: font-sans */
```
- **Weights**: 700 (Bold) primary, 600 (Semibold) for smaller headings
- **Usage**: Page titles, section headings, card titles, navigation logo
- **Character**: Ink-trap grotesque with craft DNA, French newspaper heritage, warm and confident
- **Why**: Replaced Space Grotesk (reflex-reject) — Bricolage carries editorial warmth without the ubiquity of geometric grotesques

#### Editorial & Subheads
```css
--font-editorial: 'Spectral', Georgia, 'Times New Roman', serif;
/* Tailwind: font-serif */
```
- **Weights**: 400 (Regular) primary, 600 (Semibold) for emphasis
- **Usage**: Section subheads, hero subheads, large body text, pull quotes, process descriptions
- **Character**: Modern editorial serif, warm, readable, designed for digital reading
- **Note**: Replaced Crimson Pro in the original spec; Spectral is the canonical serif

#### Body & UI
```css
--font-body: 'Figtree', system-ui, sans-serif;
/* Tailwind: font-body */
```
- **Weights**: 400 (Regular) primary, 500 (Medium) for emphasis, 600 (Semibold) for strong emphasis
- **Usage**: Body text, form labels, button text, descriptions, navigation links
- **Character**: Warm geometric-humanist, designed for web readability by Erik Kennedy
- **Why**: Replaced Inter (reflex-reject) — Figtree provides warmth over Inter's cold neutrality

#### Technical & Labels
```css
--font-mono: 'Geist Mono', 'SF Mono', 'Roboto Mono', monospace;
/* Tailwind: font-mono */
```
- **Weights**: 400 (Regular) primary, 500 (Medium) for emphasis
- **Usage**: Eyebrows, tags, metadata, technical labels, code, captions
- **Character**: Technical precision, uppercase tracking

### Type Scale (Fluid clamp-based)

All sizes use `clamp()` for smooth viewport scaling. Sizes are defined in `globals.css` as `studio-*` utility classes.

#### Size-Only Tokens
These set `font-size`, `line-height`, and `letter-spacing` only. Font-family and weight are applied separately.

```css
/* Hero Title (H1) — studio-h1 */
font-size: clamp(3rem, 2rem + 5vw, 6rem);     /* 48px → 96px */
line-height: 1.05;
letter-spacing: -0.02em;

/* Section Title (H2) — studio-h2 */
font-size: clamp(2rem, 1.5rem + 2.5vw, 3.5rem); /* 32px → 56px */
line-height: 1.1;
letter-spacing: -0.01em;

/* Subsection Title (H3) — studio-h3 */
font-size: clamp(1.5rem, 1.25rem + 1.25vw, 2.25rem); /* 24px → 36px */
line-height: 1.15;
letter-spacing: -0.005em;

/* Card Title (H4) — studio-h4 */
font-size: clamp(1.25rem, 1.1rem + 0.75vw, 1.625rem); /* 20px → 26px */
line-height: 1.2;
letter-spacing: -0.005em;

/* Body Large — studio-body-large */
font-size: clamp(1.0625rem, 1rem + 0.3125vw, 1.25rem); /* 17px → 20px */
line-height: 1.6;
letter-spacing: 0;

/* Body — studio-body */
font-size: 1rem;  /* 16px */
line-height: 1.6;
letter-spacing: 0;
```

#### Composed Semantic Variants
These include size + font-family + weight for common patterns:

```css
/* studio-h1-headline — Bricolage Grotesque Bold */
studio-h1 + font-sans + font-bold

/* studio-h2-editorial — Spectral Regular (serif subheads) */
studio-h2 + font-serif + font-normal

/* studio-h3-sans — Bricolage Grotesque Semibold */
studio-h3 + font-sans + font-semibold

/* studio-body-serif — Spectral for large body text */
studio-body-large + font-serif + font-normal

/* studio-body — Figtree for standard body */
studio-body + font-body + font-normal
```

#### Utility Patterns
```css
/* Eyebrow — studio-eyebrow */
font-size: 0.6875rem; /* 11px */
font-family: var(--font-mono);
text-transform: uppercase;
letter-spacing: 0.12em;
font-weight: 500;

/* Tag — studio-tag */
font-size: 0.6875rem;
font-family: var(--font-mono);
text-transform: uppercase;
letter-spacing: 0.08em;
font-weight: 500;

/* Caption — studio-caption */
font-size: 0.75rem;
font-family: var(--font-mono);
color: var(--fg-muted);
opacity: 0.6;

/* Lede — studio-lede */
font-size: clamp(1.0625rem, 1rem + 0.3125vw, 1.25rem);
font-family: var(--font-editorial);
line-height: 1.6;
color: var(--fg-muted);

/* Tabular Nums — studio-tabular */
font-variant-numeric: tabular-nums;
```

### Typography Rules

1. **Hierarchy**: Minimum 1.25× ratio between heading levels (enforced by clamp scale)
2. **Line length**: Max 65-75 characters for body text (optimal readability)
3. **Tracking**: Tighter for large text (-0.02em), normal for body (0), wider for labels (+0.12em)
4. **Mixing fonts**: Bricolage Grotesque for headlines, Spectral for subheads, Figtree for body
5. **Never pure black**: Use #1a1a1a or oklch values for text
6. **Optical alignment**: Adjust letter-spacing for visual balance, not mathematical precision
7. **Text wrapping**: `text-wrap: balance` on headings, `text-wrap: pretty` on prose
8. **Optical sizing**: `font-optical-sizing: auto` on body text
9. **Kerning**: `font-kerning: normal` on body text
10. **Dark-mode compensation**: Line-height increases 1.6 → 1.65 in dark mode for readability
11. **Numeric data**: Always use `studio-tabular` for counters, years, step numbers
12. **Units**: All typography in `rem`, never `px` in component code

### Responsive Typography

Fluid scaling is handled by `clamp()` — no breakpoint-specific overrides needed for font sizes. The scale smoothly interpolates between mobile and desktop sizes:

| Token | Mobile (320px) | Desktop (1440px) | Ratio to next |
|---|---|---|---|
| `studio-h1` | 3rem (48px) | 6rem (96px) | — |
| `studio-h2` | 2rem (32px) | 3.5rem (56px) | **1.71×** |
| `studio-h3` | 1.5rem (24px) | 2.25rem (36px) | **1.56×** |
| `studio-h4` | 1.25rem (20px) | 1.625rem (26px) | **1.38×** |
| `studio-body-large` | 1.0625rem (17px) | 1.25rem (20px) | **1.30×** |
| `studio-body` | 1rem (16px) | 1rem (16px) | **1.25×** |

No separate mobile/tablet/desktop type scale sections are needed.

---

## Spacing System

### Vertical Rhythm

#### Section Padding
```css
--space-section: 120px;         /* Standard section padding */
--space-section-large: 160px;   /* Hero, contact sections */
--space-section-small: 80px;    /* Compact sections */
--space-section-tight: 60px;    /* Very compact */
```

#### Component Spacing
```css
--space-xl: 64px;   /* Between major content blocks */
--space-lg: 48px;   /* Between related sections */
--space-md: 32px;   /* Between components */
--space-sm: 20px;   /* Between related elements */
--space-xs: 12px;   /* Tight spacing */
--space-xxs: 8px;   /* Very tight spacing */
```

#### Grid Gaps
```css
--gap-grid: 32px;           /* Standard grid gap */
--gap-grid-tight: 20px;     /* Tight grid */
--gap-grid-loose: 48px;     /* Loose grid */
```

### Horizontal Spacing

#### Container Widths
```css
--container-max: 1600px;    /* Maximum content width */
--container-text: 900px;    /* Optimal reading width */
--container-narrow: 700px;  /* Narrow content (forms, etc.) */
--container-form: 560px;    /* Form max-width */
```

#### Horizontal Padding
```css
--padding-page: 48px;       /* Desktop page padding */
--padding-page-mobile: 24px; /* Mobile page padding */
--padding-card: 32-40px;    /* Card internal padding */
--padding-section: 48px;    /* Section horizontal padding */
```

### Spacing Principles

1. **Generous breathing room**: 120-200px between major sections
2. **Consistent rhythm**: Use spacing scale, avoid arbitrary values
3. **Mobile adaptation**: Reduce by 30-40% on mobile (120px → 80px)
4. **Optical spacing**: Adjust for visual balance, not mathematical precision
5. **Whitespace as luxury**: More space = more premium feel

### Responsive Spacing

#### Mobile (< 768px)
```css
--space-section: 60-80px;
--space-section-large: 100px;
--space-xl: 48px;
--space-lg: 32px;
--space-md: 24px;
--padding-page: 24px;
```

#### Tablet (768-1023px)
```css
--space-section: 100px;
--space-section-large: 140px;
--padding-page: 40px;
```

#### Desktop (1024px+)
Use full scale as defined above.

---

## Border Radius

```css
--radius-sm: 8px;     /* Buttons, small cards, tags */
--radius-md: 14px;    /* Standard cards, inputs */
--radius-lg: 24px;    /* Large containers, contact section */
--radius-xl: 32px;    /* Hero sections, full-bleed containers */
```

### Usage Guidelines
- **Buttons**: 8px (sm)
- **Cards**: 14-16px (md)
- **Large sections**: 24px (lg)
- **Never sharp corners**: Minimum 8px radius
- **Consistency**: Use scale values, not arbitrary numbers


## Shadows & Elevation

### Shadow System

#### Rest State
```css
--shadow-rest: 
  0 1px 0 0 rgba(255,255,255,0.08),
  0 20px 60px -30px rgba(0,0,0,0.4);
```
- Subtle top highlight (simulates light from above)
- Soft shadow for depth
- Use for cards, elevated surfaces at rest

#### Hover State
```css
--shadow-hover:
  0 1px 0 0 rgba(255,149,0,0.15),
  0 20px 60px rgba(255,149,0,0.06);
```
- Amber-tinted highlight
- Larger, softer shadow with amber glow
- Use for interactive cards on hover

#### Amber Glow
```css
--shadow-amber-glow:
  0 0 40px rgba(255,149,0,0.3);
```
- Pure amber glow effect
- Use for CTAs, active states, focus states
- Combine with other shadows for emphasis

#### Strong Elevation
```css
--shadow-strong:
  0 1px 0 0 rgba(255,255,255,0.12),
  0 40px 90px -60px rgba(0,0,0,0.7);
```
- Stronger highlight
- Deeper shadow for modals, popovers
- Use sparingly for maximum elevation

### Elevation Layers

```
Layer 0 (Base):     No shadow, background color
Layer 1 (Cards):    --shadow-rest
Layer 2 (Hover):    --shadow-hover
Layer 3 (Modal):    --shadow-strong
Layer 4 (Tooltip):  --shadow-strong + higher z-index
```

### Usage Guidelines

1. **Subtle by default**: Shadows should enhance, not dominate
2. **Amber on interaction**: Hover states get amber-tinted shadows
3. **Consistent elevation**: Use defined layers, not arbitrary shadows
4. **Performance**: Use transform for hover, not box-shadow animation
5. **Light mode**: Reduce shadow opacity by 30-40%

---

## Components

### Buttons

#### Primary Button (CTA)
```css
Background: var(--accent) (#ff9500)
Color: var(--accent-ink) (#000)
Padding: 16px 36px
Border-radius: var(--radius-sm) (8px)
Font: 16px, 500 weight, Figtree
Border: none

Hover:
  Transform: scale(1.02)
  Box-shadow: var(--shadow-amber-glow)
  Transition: 200ms ease-out

Active:
  Transform: scale(0.98)
  
Focus:
  Outline: 2px solid var(--accent)
  Outline-offset: 3px
```

#### Secondary Button (Outlined)
```css
Background: transparent
Color: var(--fg-primary)
Padding: 16px 36px
Border-radius: var(--radius-sm) (8px)
Border: 1px solid rgba(255,255,255,0.2)
Font: 16px, 500 weight, Figtree

Hover:
  Border-color: rgba(255,255,255,0.5)
  Background: rgba(255,255,255,0.05)
  Transition: 200ms ease-out

Active:
  Transform: scale(0.98)
```

#### Ghost Button (Text only)
```css
Background: transparent
Color: var(--fg-muted)
Padding: 12px 24px
Border: none
Font: 15px, 500 weight, Figtree

Hover:
  Color: var(--accent)
  Text-decoration: underline
  Text-underline-offset: 4px
```

### Cards

#### Standard Card
```css
Background: var(--bg-elevated) (#1a1a1a)
Border: 1px solid var(--border)
Border-radius: var(--radius-md) (14-16px)
Padding: 32-40px
Box-shadow: var(--shadow-rest)

Hover:
  Border-color: rgba(255,149,0,0.3)
  Box-shadow: var(--shadow-hover)
  Transform: translateY(-6px)
  Transition: 300ms cubic-bezier(0.16, 1, 0.3, 1)
```

#### Image Card (Work preview)
```css
Background: var(--bg-elevated)
Border: 1px solid var(--border)
Border-radius: var(--radius-md)
Overflow: hidden

Image container:
  Aspect-ratio: 16/10
  Overflow: hidden
  
  Image:
    Transform: scale(1.04) on hover
    Transition: 600ms cubic-bezier(0.16, 1, 0.3, 1)

Body:
  Padding: 32px
  
  Tag: 11px Geist Mono, uppercase, amber
  Title: 24px Bricolage Grotesque Semibold
  Description: 15px Figtree, opacity 0.6
```

#### Service Card (Grid)
```css
Background: var(--bg-surface-alt) (#111111)
Padding: 48px 40px
Border: none (grid creates hairline dividers)

Number: 13px Geist Mono, opacity 0.35
Title: 22px Bricolage Grotesque Semibold
Description: 15px Figtree, opacity 0.55
Arrow: Top-right, opacity 0.25 → 1 on hover

Hover:
  Background: #181818
  Border-top: 2px solid var(--accent)
  Arrow: translate(3px, -3px)
```

### Forms

#### Input Field
```css
Background: rgba(255,255,255,0.05)
Border: 1px solid var(--border)
Border-radius: var(--radius-md) (10px)
Padding: 16px 20px
Font: 16px Figtree
Color: var(--fg-primary)

Placeholder:
  Color: var(--fg-muted)
  Opacity: 0.5

Focus:
  Border-color: var(--accent)
  Outline: none
  Box-shadow: 0 0 0 3px rgba(255,149,0,0.12)

Error:
  Border-color: #ff4444
  Box-shadow: 0 0 0 3px rgba(255,68,68,0.12)
```

#### Textarea
Same as input, but:
```css
Min-height: 120px
Resize: vertical
```

#### Select
Same as input, with:
```css
Appearance: none
Background-image: url("data:image/svg+xml,...") /* Custom arrow */
Background-position: right 16px center
Background-repeat: no-repeat
Padding-right: 48px
```

#### Label
```css
Font: 14px Figtree Medium
Color: var(--fg-primary)
Margin-bottom: 8px
Display: block
```

#### Error Message
```css
Font: 13px Figtree
Color: #ff4444
Margin-top: 6px
```

### Navigation

#### Desktop Navigation
```css
Position: fixed
Top: 0
Width: 100%
Height: 80px
Z-index: 100

Background (default): transparent
Background (scrolled): rgba(13,13,13,0.92)
Backdrop-filter (scrolled): blur(20px)
Border-bottom (scrolled): 1px solid var(--border)

Logo:
  Font: 18px Bricolage Grotesque Bold
  Color: var(--fg-primary)
  
Links:
  Font: 15px Figtree Medium
  Color: rgba(255,255,255,0.65)
  
  Hover:
    Color: #fff
    Text-decoration: underline
    Text-decoration-color: var(--accent)
    Text-decoration-thickness: 2px
    Text-underline-offset: 6px
    Animation: slide-in 200ms ease-out
    
  Active:
    Color: var(--accent)
    Text-decoration: underline
```

#### Mobile Navigation
```css
Hamburger button:
  Width: 44px
  Height: 44px
  Padding: 12px
  
Menu (overlay):
  Position: fixed
  Inset: 0
  Background: rgba(13,13,13,0.98)
  Backdrop-filter: blur(20px)
  Z-index: 200
  
  Links:
    Font: 24px Bricolage Grotesque Semibold
    Padding: 20px 24px
    Border-bottom: 1px solid var(--border)
```

### Footer

```css
Padding: 32px 48px
Border-top: 1px solid var(--border)
Background: var(--bg-primary)

Layout: Flex, space-between, align-center

Copyright:
  Font: 13px Geist Mono
  Opacity: 0.35
  
Links:
  Font: 13px Geist Mono
  Opacity: 0.35
  
  Hover:
    Opacity: 1
    Color: var(--accent)
    
Social icons:
  Size: 20px
  Opacity: 0.35
  
  Hover:
    Opacity: 1
    Color: var(--accent)
```

### Tags / Eyebrows

```css
Font: 11-13px Geist Mono
Text-transform: uppercase
Letter-spacing: 0.12em
Font-weight: 500
Color: var(--accent)
Padding: 6px 12px (if background)
Background: var(--accent-muted) (if pill style)
Border-radius: 6px (if pill style)
```

### Progress Bar

```css
Height: 2px
Background: rgba(255,255,255,0.07)
Position: fixed
Top: 0
Width: 100%
Z-index: 101

Fill:
  Background: var(--accent)
  Height: 100%
  Width: 0-100% (driven by scroll progress)
  Transition: width 100ms linear
```

### Navigation Dots (Work page)

```css
Position: fixed
Bottom: 40px
Right: 48px
Display: flex
Gap: 12px

Dot (inactive):
  Width: 6px
  Height: 6px
  Border-radius: 50%
  Background: rgba(255,255,255,0.22)
  Cursor: pointer
  
  Hover:
    Background: rgba(255,255,255,0.4)

Dot (active):
  Width: 32px
  Height: 6px
  Border-radius: 3px
  Background: var(--accent)
  Transition: 360ms cubic-bezier(0.16, 1, 0.3, 1)
```

---

## Layout Patterns

### Container System

#### Full-width Container
```css
Width: 100%
Padding: 0 48px (desktop)
Padding: 0 24px (mobile)
```

#### Constrained Container
```css
Max-width: 1600px
Margin: 0 auto
Padding: 0 48px (desktop)
Padding: 0 24px (mobile)
```

#### Text Container
```css
Max-width: 900px
Margin: 0 auto
Padding: 0 48px (desktop)
Padding: 0 24px (mobile)
```

#### Narrow Container (Forms)
```css
Max-width: 560-700px
Margin: 0 auto
Padding: 0 48px (desktop)
Padding: 0 24px (mobile)
```

### Grid Patterns

#### 2-Column Grid
```css
Display: grid
Grid-template-columns: repeat(2, 1fr)
Gap: 32px

@media (max-width: 767px):
  Grid-template-columns: 1fr
  Gap: 20px
```

#### 3-Column Grid
```css
Display: grid
Grid-template-columns: repeat(3, 1fr)
Gap: 32px

@media (max-width: 1023px):
  Grid-template-columns: repeat(2, 1fr)
  
@media (max-width: 767px):
  Grid-template-columns: 1fr
  Gap: 20px
```

#### 4-Column Grid
```css
Display: grid
Grid-template-columns: repeat(4, 1fr)
Gap: 32px

@media (max-width: 1023px):
  Grid-template-columns: repeat(2, 1fr)
  
@media (max-width: 767px):
  Grid-template-columns: 1fr
  Gap: 20px
```

#### Auto-fit Grid (Responsive)
```css
Display: grid
Grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))
Gap: 32px
```

### Section Patterns

#### Standard Section
```css
Padding: 120px 48px (desktop)
Padding: 80px 24px (mobile)
Max-width: 1600px
Margin: 0 auto
```

#### Hero Section
```css
Height: 100vh
Min-height: 600px
Display: flex
Align-items: center
Justify-content: center
Padding: 0 48px
```

#### Split Section (50/50)
```css
Display: grid
Grid-template-columns: 1fr 1fr
Gap: 64px
Align-items: center

@media (max-width: 1023px):
  Grid-template-columns: 1fr
  Gap: 48px
```

---

## Motion & Animation

### Easing Curves

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);     /* Primary - smooth deceleration */
--ease-out: ease-out;                                /* Secondary - standard */
--ease-in-out: ease-in-out;                          /* Symmetrical */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Bouncy (use sparingly) */
```

### Animation Durations

```css
--duration-instant: 100ms;    /* Instant feedback */
--duration-fast: 200ms;       /* Hover states, small changes */
--duration-medium: 300ms;     /* Card hovers, transitions */
--duration-slow: 600ms;       /* Entrance animations */
--duration-very-slow: 20s;    /* Background animations */
```

### Entrance Animations

#### Fade Up
```css
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

Animation: fadeUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both
Trigger: IntersectionObserver (20% visible)
Stagger: 100ms between elements
```

#### Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

Animation: fadeIn 400ms ease-out both
```

#### Scale In
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

Animation: scaleIn 400ms cubic-bezier(0.16, 1, 0.3, 1) both
```

#### Slide In (from left)
```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

Animation: slideInLeft 500ms cubic-bezier(0.16, 1, 0.3, 1) both
```

### Stagger Pattern

```css
Element 1: animation-delay: 0ms
Element 2: animation-delay: 100ms
Element 3: animation-delay: 200ms
Element 4: animation-delay: 300ms
Element 5: animation-delay: 400ms
```

### Hover Animations

#### Card Hover
```css
Transition: all 300ms cubic-bezier(0.16, 1, 0.3, 1)

Hover:
  Transform: translateY(-6px)
  Border-color: rgba(255,149,0,0.3)
  Box-shadow: var(--shadow-hover)
```

#### Button Hover
```css
Transition: all 200ms ease-out

Hover:
  Transform: scale(1.02)
  Box-shadow: var(--shadow-amber-glow)
```

#### Link Hover
```css
Transition: color 200ms ease-out

Hover:
  Color: var(--accent)
  Text-decoration: underline
  Text-decoration-color: var(--accent)
  Text-underline-offset: 4px
  
  /* Animated underline slide-in */
  @keyframes slideUnderline {
    from { width: 0; }
    to { width: 100%; }
  }
```

#### Image Hover (in cards)
```css
Transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1)

Hover:
  Transform: scale(1.04)
```

### Scroll Effects

#### Sticky Navigation
```css
Transition: 
  background-color 300ms ease,
  backdrop-filter 300ms ease,
  border-bottom-color 300ms ease

Scrolled (> 80px):
  Background: rgba(13,13,13,0.92)
  Backdrop-filter: blur(20px)
  Border-bottom: 1px solid var(--border)
```

#### Hero Background Zoom
```css
@keyframes heroZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}

Animation: heroZoom 20s ease-in-out alternate infinite
```

#### Horizontal Scroll (Work page)
```javascript
// Lerp-based smooth scroll
const lerp = (start, end, factor) => start + (end - start) * factor;
const lerpFactor = 0.095;

// Update on requestAnimationFrame
function updateScroll() {
  const progress = scrollY / maxScroll;
  const targetX = -progress * totalWidth;
  currentX = lerp(currentX, targetX, lerpFactor);
  track.style.transform = `translateX(${currentX}px)`;
  requestAnimationFrame(updateScroll);
}
```

### Loading States

#### Skeleton Loader
```css
Background: linear-gradient(
  90deg,
  var(--bg-elevated) 0%,
  var(--bg-surface) 50%,
  var(--bg-elevated) 100%
)
Background-size: 200% 100%
Animation: shimmer 1.5s ease-in-out infinite

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
```

#### Spinner
```css
Width: 24px
Height: 24px
Border: 2px solid var(--border)
Border-top-color: var(--accent)
Border-radius: 50%
Animation: spin 800ms linear infinite

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  /* Maintain hover states without motion */
  /* Instant state changes only */
  /* No parallax or scroll effects */
}
```

---

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Wide Desktop */
@media (min-width: 1600px) { }

/* Mobile-first approach */
@media (min-width: 768px) { }  /* Tablet and up */
@media (min-width: 1024px) { } /* Desktop and up */
```

### Mobile Adaptations

#### Typography
All font sizes use `clamp()` for fluid scaling — no breakpoint overrides needed.
See the Responsive Typography table in the Typography System section.

#### Spacing
- Section padding: 60-80px (from 120-160px)
- Grid gaps: 20px (from 32px)
- Horizontal padding: 24px (from 48px)

#### Layout
- Grids: 2-col → 1-col
- Hero: 80vh height
- Navigation: Hamburger menu
- Work page: Vertical scroll (not horizontal)

---

## Accessibility

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- Body text: Minimum 4.5:1 (AA)
- Large text: Minimum 3:1 (AA)
- Amber on dark: 7.2:1 (AAA ✓)
- White on dark: 15.8:1 (AAA ✓)
- Muted text: 4.6:1 (AA ✓)

#### Keyboard Navigation
- Tab order: Logical, follows visual flow
- Focus indicators: 2px amber outline, 3px offset
- Skip link: "Skip to main content" (visible on focus)
- All interactive elements: Keyboard accessible
- No keyboard traps

#### Screen Readers
- Semantic HTML: Proper heading hierarchy (h1 → h2 → h3)
- ARIA labels: For icon buttons, decorative elements
- Alt text: Descriptive for all images
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`
- Live regions: For dynamic content updates

#### Forms
- Labels: Associated with inputs (for/id)
- Error messages: Clear, associated with fields (aria-describedby)
- Required fields: Marked visually and programmatically (required, aria-required)
- Validation: Client and server-side
- Error summary: At top of form on submit

#### Touch Targets
- Minimum size: 44x44px
- Spacing: Minimum 8px between targets
- Generous padding on mobile

---

## Performance

### Core Web Vitals Targets

```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
```

### Optimization Strategies

#### Images
- Format: WebP with JPEG fallback
- Lazy loading: Below-the-fold images
- Responsive: srcset with multiple sizes
- Priority: Hero images (fetchpriority="high")
- Dimensions: Always specify width/height

#### Fonts
- Preload: Critical fonts (Bricolage Grotesque Bold)
- font-display: swap
- Subset: Only required characters
- Self-host: Avoid external font requests

#### CSS
- Critical CSS: Inline above-the-fold styles
- Defer: Non-critical CSS
- Minify: Production builds
- Purge: Remove unused Tailwind classes

#### JavaScript
- Code splitting: Route-based chunks
- Lazy load: Non-critical components
- Defer: Non-critical scripts
- Minify: Production builds

#### Animation Performance
- Use: transform and opacity only
- Avoid: width, height, top, left
- will-change: Use sparingly, remove after animation
- requestAnimationFrame: For scroll-driven animations

---

## Design Tokens (CSS Variables)

### Complete Token List

```css
:root {
  /* Colors - Backgrounds */
  --bg-primary: #0d0d0d;
  --bg-elevated: #1a1a1a;
  --bg-surface: #222222;
  --bg-surface-alt: #111111;
  
  /* Colors - Foreground */
  --fg-primary: #fafaf8;
  --fg-muted: rgba(250,250,248,0.6);
  --fg-subtle: rgba(250,250,248,0.35);
  
  /* Colors - Accent */
  --accent: #ff9500;
  --accent-hover: #ffaa33;
  --accent-glow: rgba(255,149,0,0.33);
  --accent-muted: rgba(255,149,0,0.12);
  --accent-ink: #000000;
  
  /* Colors - Borders */
  --border: rgba(255,255,255,0.08);
  --border-strong: rgba(255,255,255,0.12);
  --border-soft: rgba(255,255,255,0.05);
  
  /* Colors - Project Accents */
  --project-hospital: #5aadff;
  --project-hotel: #f5bc48;
  --project-school: #3dda8a;
  --project-fitness: #c77dff;
  --project-cafe: #ff6b6b;
  
  /* Typography */
  --font-headline: 'Bricolage Grotesque', sans-serif;
  --font-editorial: 'Spectral', serif;
  --font-body: 'Figtree', sans-serif;
  --font-mono: 'Geist Mono', monospace;
  
  /* Spacing - Vertical */
  --space-section: 120px;
  --space-section-large: 160px;
  --space-section-small: 80px;
  --space-xl: 64px;
  --space-lg: 48px;
  --space-md: 32px;
  --space-sm: 20px;
  --space-xs: 12px;
  
  /* Spacing - Containers */
  --container-max: 1600px;
  --container-text: 900px;
  --container-narrow: 700px;
  --container-form: 560px;
  
  /* Spacing - Padding */
  --padding-page: 48px;
  --padding-card: 32px;
  
  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 14px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  
  /* Shadows */
  --shadow-rest: 
    0 1px 0 0 rgba(255,255,255,0.08),
    0 20px 60px -30px rgba(0,0,0,0.4);
  --shadow-hover:
    0 1px 0 0 rgba(255,149,0,0.15),
    0 20px 60px rgba(255,149,0,0.06);
  --shadow-amber-glow:
    0 0 40px rgba(255,149,0,0.3);
  --shadow-strong:
    0 1px 0 0 rgba(255,255,255,0.12),
    0 40px 90px -60px rgba(0,0,0,0.7);
  
  /* Animation */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out: ease-out;
  --ease-in-out: ease-in-out;
  --duration-fast: 200ms;
  --duration-medium: 300ms;
  --duration-slow: 600ms;
  
  /* Z-index */
  --z-nav: 100;
  --z-progress: 101;
  --z-mobile-menu: 200;
  --z-modal: 300;
  --z-tooltip: 400;
}
```

---

## Anti-Patterns (Absolute Bans)

These patterns are explicitly forbidden in the Kivox design system:

1. **Gradient text** (background-clip: text) - Overused, reduces readability
2. **Glassmorphism as default** - Use sparingly, not everywhere
3. **Side-stripe borders** - Colored vertical bars as accents
4. **Hero-metric templates** - Big numbers without context
5. **Identical card grids** - Same-sized cards with icon + heading + text repeated
6. **Pure black (#000) or pure white (#fff)** - Always use warm tints
7. **Arbitrary spacing values** - Use spacing scale
8. **Excessive animations** - Motion should enhance, not distract
9. **Jargon without grounding** - Plain language first
10. **Defensive disclaimers** - Confidence over apologies

---

## Implementation Notes

### Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + CSS Modules for complex components
- **Fonts**: Google Fonts (Bricolage Grotesque, Spectral, Figtree) + Geist Mono
- **Animation**: Framer Motion or CSS animations
- **Forms**: React Hook Form + Zod validation

### File Organization
```
web/src/
├── app/
│   ├── globals.css (design tokens)
│   └── ...pages
├── components/
│   ├── ui/ (buttons, cards, inputs)
│   ├── sections/ (hero, services, etc.)
│   └── site/ (nav, footer)
└── lib/
    ├── motion.ts (animation utilities)
    └── utils.ts
```

### Design Token Usage

In Tailwind config:
```javascript
theme: {
  extend: {
    colors: {
      'bg-primary': 'var(--bg-primary)',
      'accent': 'var(--accent)',
      // ... etc
    },
    fontFamily: {
      headline: 'var(--font-headline)',
      editorial: 'var(--font-editorial)',
      // ... etc
    }
  }
}
```

In components:
```tsx
<div className="bg-bg-elevated text-fg-primary rounded-radius-md p-padding-card">
  <h2 className="font-headline text-4xl">Title</h2>
</div>
```

---

**End of Design System**

This document defines the complete visual language for the Kivox website. All implementation should follow these specifications to ensure consistency, quality, and alignment with the "Warm Craft Editorial" design direction.

**Last Updated**: 2026-05-13 (Typography overhaul: Bricolage Grotesque + Figtree + studio-* system)  
**Design Direction**: Warm Craft Editorial  
**Status**: Active — Typography system complete, studio-* utilities canonical
