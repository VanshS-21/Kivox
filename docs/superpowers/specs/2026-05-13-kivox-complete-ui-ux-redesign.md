# Kivox Complete UI/UX Redesign Specification

**Date**: 2026-05-13  
**Design Direction**: Warm Craft Editorial  
**Status**: Approved for Implementation

---

## Executive Summary

Complete redesign of the Kivox studio website with a bold, premium aesthetic inspired by madebycat.com. The design emphasizes craft, sophistication, and work-forward presentation through warm amber accents, editorial typography, and immersive storytelling.

### Design Identity
**"Warm Craft Editorial"** - Approachable premium with editorial sophistication, warm amber accents, and proof-forward presentation.

### Core Decisions
- **Color System**: Warm Amber (#ff9500) on dark backgrounds
- **Typography**: Editorial mix (Bricolage Grotesque + Spectral + Figtree)
- **Hero Treatment**: Work Montage (blurred project grid with dark overlay)
- **Work Page**: Full-bleed horizontal scroll with sticky viewport
- **Case Studies**: Focused narrative format (story-driven, 2-3 decisions, 3-4 images)
- **Contact**: Conversational approach with warm introduction

---

## 1. Site Architecture

### 1.1 URL Structure (Flat)
```
/                    → Home (landing page)
/work                → Work overview (horizontal scroll)
/work/hospital       → Hospital case study
/work/cafe           → Cafe case study
/work/hotel          → Hotel case study
/work/school         → School case study
/work/fitness        → Fitness case study
/contact             → Contact page
/privacy             → Privacy policy
/terms               → Terms of service
```

### 1.2 Navigation Structure
**Primary nav**: Work, Services, Process, Contact  
**Footer nav**: Privacy, Terms, Social links

---

## 2. Design System Foundation

### 2.1 Color Palette

#### Primary Colors
```css
/* Backgrounds */
--bg-primary: #0d0d0d        /* Deep black */
--bg-elevated: #1a1a1a       /* Card background */
--bg-surface: #222222        /* Elevated surfaces */

/* Foreground */
--fg-primary: #fafaf8        /* Warm white */
--fg-muted: rgba(250,250,248,0.6)  /* Muted text */

/* Accent - Warm Amber */
--accent: #ff9500            /* Primary amber */
--accent-hover: #ffaa33      /* Hover state */
--accent-glow: rgba(255,149,0,0.33)  /* Glow effect */
--accent-muted: rgba(255,149,0,0.12) /* Subtle tint */

/* Borders */
--border: rgba(255,255,255,0.08)
--border-strong: rgba(255,255,255,0.12)
```

#### Usage Guidelines
- **Accent color**: Use sparingly for CTAs, tags, hover states, and key moments
- **Backgrounds**: Layer from #0d0d0d (base) to #222222 (elevated)
- **Text**: Never pure white - always warm tinted (#fafaf8)
- **Borders**: Subtle, never prominent unless interactive

### 2.2 Typography System

#### Font Stack
```css
/* Headlines */
--font-headline: 'Bricolage Grotesque', sans-serif
  Weight: 700 (Bold)
  
/* Subheads & Editorial */
--font-editorial: 'Spectral', serif
  Weight: 400 (Regular), 600 (Semibold)
  
/* Body & UI */
--font-body: 'Figtree', sans-serif
  Weight: 400 (Regular), 500 (Medium), 600 (Semibold)
  
/* Technical/Labels */
--font-mono: 'Geist Mono', monospace
  Weight: 400 (Regular), 500 (Medium)
```

#### Type Scale
```css
/* Headlines */
H1 (Hero): 88-96px / 1.05 / -0.02em / 700
H2 (Section): 56px / 1.1 / -0.01em / 700 (Spectral)
H3 (Card): 24-28px / 1.2 / -0.01em / 600

/* Body */
Body Large: 20px / 1.6 / 0 / 400 (Spectral for subheads)
Body: 16-18px / 1.6 / 0 / 400 (Figtree)
Small: 14px / 1.5 / 0 / 400

/* Technical */
Label: 11-13px / 1.4 / 0.12em / 500 (uppercase, Geist Mono)
```

#### Typography Rules
- **Headlines**: Bricolage Grotesque Bold, tight tracking (-0.02em)
- **Subheads**: Spectral Regular for editorial sophistication
- **Body**: Figtree Regular for readability
- **Labels**: Geist Mono, uppercase, tracked for technical precision
- **Line length**: Max 65-75 characters for body text
- **Hierarchy**: Minimum 1.25 ratio between levels


### 2.3 Spacing System

#### Vertical Rhythm
```css
/* Section padding */
--space-section: 120px       /* Standard section padding */
--space-section-large: 160px /* Hero, contact sections */
--space-section-small: 80px  /* Compact sections */

/* Component spacing */
--space-xl: 64px
--space-lg: 48px
--space-md: 32px
--space-sm: 20px
--space-xs: 12px

/* Grid gaps */
--gap-grid: 32px             /* Standard grid gap */
--gap-grid-tight: 20px       /* Tight grid */
--gap-grid-loose: 48px       /* Loose grid */
```

#### Spacing Principles
- **Generous breathing room**: 120-200px between major sections
- **Consistent rhythm**: Use spacing scale, avoid arbitrary values
- **Mobile adaptation**: Reduce by 30-40% on mobile (80px → 60px)
- **Content max-width**: 1600px for contained sections

### 2.4 Border Radius
```css
--radius-sm: 8px    /* Buttons, small cards */
--radius-md: 14px   /* Standard cards */
--radius-lg: 24px   /* Large containers, contact section */
```

### 2.5 Shadows & Elevation
```css
/* Rest state */
--shadow-rest: 
  0 1px 0 0 rgba(255,255,255,0.08),
  0 20px 60px -30px rgba(0,0,0,0.4);

/* Hover state */
--shadow-hover:
  0 1px 0 0 rgba(255,149,0,0.15),
  0 20px 60px rgba(255,149,0,0.06);

/* Amber glow */
--shadow-amber-glow:
  0 0 40px rgba(255,149,0,0.3);
```

---

## 3. Global Components

### 3.1 Navigation

#### Structure
```
┌─────────────────────────────────────────┐
│ Logo          Work Services Process Contact │
│                                    [Theme] │
└─────────────────────────────────────────┘
```

#### Specifications
- **Position**: Fixed, top: 0
- **Height**: 80px
- **Background**: 
  - Transparent over hero
  - rgba(13,13,13,0.92) + blur(20px) on scroll
- **Border**: None → 1px bottom rgba(255,255,255,0.08) on scroll
- **Logo**: Left, "Kivox" Bricolage Grotesque Bold 18px
- **Links**: Right, Figtree Medium 15px, color rgba(255,255,255,0.65)
- **Hover**: Color #fff, amber underline (2px, slide-in animation)
- **Theme toggle**: Far right, minimal icon
- **Z-index**: 100

#### Behavior
- Transparent until scroll > 80px
- Blur backdrop fade-in (300ms ease)
- Border fade-in (300ms ease)
- Active link: Amber underline

### 3.2 Footer

#### Structure
```
┌─────────────────────────────────────────┐
│ © 2026 Kivox. Bengaluru, India.         │
│                                          │
│ Privacy · Terms                          │
│ Instagram · LinkedIn · GitHub            │
└─────────────────────────────────────────┘
```

#### Specifications
- **Padding**: 32px 48px
- **Border**: 1px top rgba(255,255,255,0.08)
- **Layout**: Flex, space-between
- **Text**: 13px Geist Mono, opacity 0.35
- **Links**: Opacity 0.35 → 1 on hover, amber color
- **Social icons**: 20px, amber on hover

### 3.3 Theme Toggle

#### States
- System (default)
- Light
- Dark

#### Design
- **Icon**: Sun/Moon/System (20px)
- **Position**: Nav far right
- **Hover**: Amber glow
- **Transition**: 300ms ease

---

## 4. Home Page (Landing)

### 4.1 Hero Section - Work Montage

#### Layout
```
Height: 100vh
Background layers:
1. Base: #0a0a0a
2. Blurred 4x3 grid of studio work
3. Dark gradient overlay (85% opacity)
4. Subtle grid pattern overlay
5. Slow zoom animation (20s)
```

#### Content (Centered)
```
Eyebrow: "Boutique Studio · Bengaluru"
  - 12px Geist Mono, uppercase, tracked
  - Color: Amber
  - Margin-bottom: 28px

Headline: "Make your business easier to trust online."
  - 92px Bricolage Grotesque Bold
  - Max-width: 900px
  - Letter-spacing: -0.02em
  - Line-height: 1.05

Subhead: "We design and build websites..."
  - 24px Spectral Regular
  - Max-width: 600px
  - Opacity: 0.85
  - Margin-bottom: 48px

CTAs:
  Primary: "Start a project"
    - Amber background, black text
    - 16px 36px padding
    - Border-radius: 8px
    - Hover: Scale 1.02, glow effect
    
  Secondary: "View studio work"
    - Outlined, white text
    - Border: 1px rgba(255,255,255,0.2)
    - Hover: Border 0.5 opacity, bg rgba(255,255,255,0.05)
```

#### Animation
- Background: Slow zoom (scale 1 → 1.08, 20s, ease-in-out, alternate)
- Content: Fade-up stagger (600ms, ease-out-expo, 100ms delay between)
- Respects reduced motion

### 4.2 Marquee Strip

#### Specifications
- **Height**: 60px
- **Background**: #1a1a1a
- **Border**: 1px top/bottom rgba(255,255,255,0.08)
- **Content**: "Websites & Web Apps · UI/UX Redesign · SEO & AI Search · Brand Identity · Backend Systems · Android Apps"
- **Text**: 11px Geist Mono, uppercase, tracked, opacity 0.5
- **Animation**: Infinite scroll, 20s linear

### 4.3 Work Preview Section

#### Layout
```
Padding: 120px vertical, 48px horizontal
Max-width: 1600px, centered

Header:
  Label: "Studio Demonstrations" (11px Geist Mono, amber)
  Title: "Projects that show the decisions."
    - 56px Spectral Regular
    - Max-width: 700px
    - Margin-bottom: 64px

Grid: 2 columns (1 on mobile)
Gap: 32px
```

#### Card Design
```
Background: #1a1a1a
Border: 1px rgba(255,255,255,0.08)
Border-radius: 16px
Overflow: hidden

Image:
  - Aspect ratio: 16:10
  - Overflow hidden
  - Scale 1.04 on hover

Body (32px padding):
  Tag: Amber, 11px Geist Mono, uppercase
  Title: 24px Bricolage Grotesque Semibold
  Description: 15px Figtree, opacity 0.6

Hover:
  - Border: rgba(255,149,0,0.3)
  - Shadow: 0 0 40px rgba(255,149,0,0.06)
  - Transform: translateY(-6px)
  - Duration: 300ms ease-out-expo
```

### 4.4 POV Section

#### Layout
```
Padding: 160px vertical
Max-width: 900px, centered
Text-align: center

Title: "Trust is a design system."
  - 56px Spectral Regular
  - Margin-bottom: 48px

Bullets: 2-column grid (1 on mobile)
  - 18px Figtree Regular
  - Opacity: 0.75
  - Line-height: 1.7
  - Custom amber bullet points
  - Gap: 32px
```

### 4.5 Services Section

#### Layout
```
Background: #0d0d0d
Border: 1px top/bottom
Padding: 120px vertical

Grid: 3 columns (1 on mobile)
Gap: 2px (creates hairline dividers)
Background: rgba(255,255,255,0.08) for gaps
Border-radius: 16px
```

#### Card Design
```
Background: #111111
Padding: 48px 40px

Number: "01" (13px Geist Mono, opacity 0.35)
Title: 22px Bricolage Grotesque Semibold
Description: 15px Figtree, opacity 0.55
Arrow: Top-right, opacity 0.25 → 1 on hover

Hover:
  - Background: #181818
  - Amber top border (2px)
  - Arrow translate(3px, -3px)
```

### 4.6 Process Section

#### Layout
```
Padding: 120px vertical
Max-width: 1400px

Title: "How we work."
  - 56px Spectral Regular
  - Margin-bottom: 64px

Layout: 5-column grid (horizontal scroll on mobile)
Gap: 40px
```

#### Step Design
```
Large outlined number: 120px, amber stroke (2px)
Title: 20px Bricolage Grotesque Bold
Description: 16px Figtree, opacity 0.65
Connector line: Subtle, between steps (1px, opacity 0.15)
```

### 4.7 Contact Section

#### Layout
```
Padding: 0 48px 48px
Max-width: 1600px

Inner container:
  - Background: #ff9500 (amber)
  - Border-radius: 24px
  - Padding: 100px 80px
  - Text-align: center
```

#### Content (Black text on amber)
```
Title: "Ready to build something great?"
  - 56px Bricolage Grotesque Bold
  - Color: #000
  - Margin-bottom: 20px

Subhead: "Tell us what you're building..."
  - 18px Spectral
  - Color: rgba(0,0,0,0.7)
  - Max-width: 500px, centered
  - Margin-bottom: 48px

Form (max-width 560px, centered):
  Inputs:
    - Black text
    - rgba(0,0,0,0.12) background
    - 16px 20px padding
    - Border-radius: 10px
    - Focus: Border rgba(0,0,0,0.3)
    
  Submit button:
    - Black background, white text
    - Full width
    - 18px padding
    - Hover: Scale 1.02
```

---

## 5. Work Overview Page

### 5.1 Full-Bleed Horizontal Scroll

#### Architecture
```
Wrapper: height 400vh (provides scroll space)
Sticky viewport: position sticky, top 64px, height calc(100vh - 64px)
Horizontal track: display flex, translateX driven by JS lerp
Each slide: width 100vw, height 100%, flex-shrink 0
```

#### Scroll Mechanics
- **Trigger**: Vertical page scroll
- **Effect**: Horizontal pan through slides (lerped for smoothness)
- **Lerp factor**: 0.095 (silky lag without sluggishness)
- **Progress**: 0-1 mapped to translateX
- **Slides**: 4 total (hospital, hotel, school, fitness)


#### Slide Design
```
Background layers:
1. Radial gradient (project-specific color)
2. Dark overlay gradient (left-to-right, 96% → 45% → 8% opacity)

Content (bottom-left, max-width 720px):
  Index: "01 / 04" (11px Geist Mono, opacity 0.28)
  Category: "Healthcare" with line (11px Geist Mono, project color)
  Title: 52-80px Bricolage Grotesque Bold, -0.025em tracking
  Description: 17px Figtree, opacity 0.58, max-width 500px
  CTA: "View case study →" with animated line

Visual (right side, 52% width):
  - Abstract SVG illustration (project-specific)
  - Subtle animations (pulse, rotate, fade)
  - Opacity 0.06-0.22 for subtlety

Ghost number: 240-380px Syne Extra Bold, opacity 0.032, bottom-right
```

#### Project-Specific Accents
```
Hospital:   #5aadff (blue) - Radar/pulse visual
Hotel:      #f5bc48 (gold) - Architectural grid
School:     #3dda8a (green) - Orbit rings
Fitness:    #c77dff (purple) - Concentric circles
```

#### UI Elements
```
Progress bar (top):
  - Height: 2px
  - Background: rgba(255,255,255,0.07)
  - Fill: Amber, width driven by scroll progress

Nav dots (bottom-right):
  - 6px circles, rgba(255,255,255,0.22)
  - Active: 32px pill, amber
  - Transition: 360ms ease-out-expo
  - Clickable for direct navigation

Scroll hint (bottom-center):
  - "Scroll" text + animated arrow
  - Fades out after 4% progress
  - Pulse animation (2.4s)
```

#### Entrance Animations
- Content fades up when slide is within 0.55 of center
- Offscreen slides: opacity 0, translateY(24px)
- Transition: 500ms ease-out-expo

---

## 6. Case Study Pages

### 6.1 Structure (Focused Narrative)

#### Hero Section
```
Height: 60vh, min 480px
Background: Project-specific gradient
Overlay: Dark gradient for readability

Content (centered):
  Eyebrow: "Studio Demonstration · Healthcare"
  Title: "PulseClinic"
  Subtitle: "Patient journey clarity for modern healthcare"
  Meta: "2025 · Web Design · Brand Identity"
```

#### Context Section
```
Padding: 120px vertical
Max-width: 900px, centered

Label: "Context"
Title: "The Challenge" (40px Spectral)
Body: 2-3 paragraphs explaining the problem
  - 18px Figtree, line-height 1.7
  - Opacity 0.75
```

#### Key Decisions Section (2-3 decisions)
```
Padding: 80px vertical
Max-width: 1200px

Each decision:
  Number: Large outlined (80px, amber)
  Title: "Decision: Clear service hierarchy"
    - 32px Bricolage Grotesque Bold
  Description: 2-3 sentences
    - 17px Figtree, opacity 0.7
  Image: Full-width, 16:9, border-radius 16px
  Caption: 14px Geist Mono, opacity 0.4
```

#### Hero Images Section (3-4 images)
```
Padding: 80px vertical
Max-width: 1600px

Layout: Varied
  - Full-width hero image
  - 2-column grid
  - Single centered image
  
Image treatment:
  - Border-radius: 16px
  - Border: 1px rgba(255,255,255,0.08)
  - Shadow: Subtle elevation
  - Captions: 14px Geist Mono
```

#### Next Steps Section
```
Padding: 120px vertical
Background: Amber
Text: Black

Title: "Ready to build something similar?"
CTA: "Start a project" (black button, white text)
Secondary: "View more work" (outlined)
```

### 6.2 Case Study Content Requirements

Each case study needs:
1. **Hero**: Title, subtitle, meta
2. **Context**: 2-3 paragraphs explaining the challenge
3. **Key Decisions**: 2-3 major design/UX decisions with explanations
4. **Hero Images**: 3-4 full-quality screenshots/mockups
5. **Captions**: Brief explanations for each image
6. **Next Steps**: CTA to contact or view more work

---

## 7. Contact Page

### 7.1 Conversational Layout

#### Hero Section
```
Padding: 160px vertical
Max-width: 800px, centered
Text-align: center

Eyebrow: "Let's Talk"
  - 12px Geist Mono, amber, uppercase

Title: "Tell us what you're building."
  - 72px Bricolage Grotesque Bold
  - Margin-bottom: 24px

Introduction: 2-3 paragraphs
  - 18px Spectral Regular
  - Opacity: 0.75
  - Line-height: 1.7
  - Warm, conversational tone
  - Sets expectations: "We reply within 24 hours..."
```

#### Form Section
```
Padding: 80px vertical
Max-width: 700px, centered
Background: #1a1a1a
Border-radius: 24px
Padding: 60px

Form fields:
  Name (required)
  Email (required)
  Phone (required)
  Business type (select, required)
  What you need (select, required)
  Primary goal (textarea, required)
  Current website (optional)
  Timeline (select, optional)
  Notes (textarea, optional)

Field design:
  - Background: rgba(255,255,255,0.05)
  - Border: 1px rgba(255,255,255,0.08)
  - Focus: Amber border
  - Padding: 16px 20px
  - Border-radius: 10px
  - 16px Figtree

Submit button:
  - Amber background, black text
  - Full width
  - 18px padding
  - Hover: Glow effect
```

#### Direct Contact Section
```
Padding: 80px vertical
Max-width: 600px, centered
Text-align: center

Title: "Prefer email or phone?"
Email: hello@kivox.in (amber, clickable)
Phone: +91 80 0000 0000 (amber, clickable)
Location: "Bengaluru, Karnataka, India"
```

---

## 8. Legal Pages (Privacy & Terms)

### 8.1 Layout
```
Padding: 120px vertical
Max-width: 800px, centered

Title: 72px Bricolage Grotesque Bold
Last updated: 14px Geist Mono, opacity 0.4

Content:
  - H2: 32px Bricolage Grotesque Semibold
  - H3: 24px Bricolage Grotesque Medium
  - Body: 17px Figtree, line-height 1.7
  - Lists: 17px Figtree, amber bullets
  - Links: Amber, underline on hover
```

### 8.2 Content Requirements
- **Privacy**: Data collection, usage, storage, rights
- **Terms**: Service terms, limitations, disclaimers
- Both need: Last updated date, contact information

---

## 9. Motion & Interaction System

### 9.1 Easing Curves
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)  /* Primary */
--ease-out: ease-out                             /* Secondary */
--ease-in-out: ease-in-out                       /* Symmetrical */
```

### 9.2 Animation Durations
```css
--duration-fast: 200ms      /* Hover states, small changes */
--duration-medium: 300ms    /* Card hovers, transitions */
--duration-slow: 600ms      /* Entrance animations */
--duration-very-slow: 20s   /* Background animations */
```

### 9.3 Entrance Animations

#### Fade Up
```css
From: opacity 0, translateY(40px)
To: opacity 1, translateY(0)
Duration: 600ms
Easing: ease-out-expo
Stagger: 100ms between elements
Trigger: IntersectionObserver (20% visible)
```

#### Stagger Pattern
```
Element 1: 0ms delay
Element 2: 100ms delay
Element 3: 200ms delay
Element 4: 300ms delay
```

### 9.4 Hover States

#### Cards
```css
Transform: translateY(-6px)
Border: Amber glow
Shadow: 0 20px 60px rgba(255,149,0,0.06)
Duration: 300ms
Easing: ease-out-expo
```

#### Buttons
```css
Transform: scale(1.02)
Shadow: 0 0 32px rgba(255,149,0,0.3)
Duration: 200ms
Easing: ease-out
```

#### Links
```css
Underline: Slide-in from left
Color: Amber
Duration: 200ms
Easing: ease-out
```

### 9.5 Scroll Effects

#### Sticky Nav
```css
Background: Transparent → rgba(13,13,13,0.92)
Backdrop-filter: blur(20px)
Border-bottom: 0 → 1px rgba(255,255,255,0.08)
Transition: 300ms ease
Trigger: scroll > 80px
```

#### Hero Montage
```css
Background scale: 1 → 1.08
Duration: 20s
Easing: ease-in-out
Direction: alternate
```

#### Horizontal Scroll (Work page)
```css
Lerp factor: 0.095
Update: requestAnimationFrame
Progress: 0-1 mapped to translateX
Smooth: Yes (interpolated)
```

### 9.6 Reduced Motion

When `prefers-reduced-motion: reduce`:
```css
/* Disable all animations */
animation-duration: 0.01ms !important;
animation-iteration-count: 1 !important;
transition-duration: 0.01ms !important;

/* Maintain hover states (no motion) */
/* Instant state changes */
/* No parallax or scroll effects */
```

---

## 10. Responsive Behavior

### 10.1 Breakpoints
```css
--mobile: 0-767px
--tablet: 768-1023px
--desktop: 1024px+
--wide: 1600px+
```

### 10.2 Mobile Adaptations

#### Typography Scale (Mobile)
```css
H1: 52-60px (from 88-96px)
H2: 36px (from 56px)
H3: 20px (from 24-28px)
Body: 16px (from 16-18px)
```

#### Spacing (Mobile)
```css
Section padding: 60-80px (from 120-160px)
Grid gaps: 20px (from 32px)
Horizontal padding: 24px (from 48px)
```

#### Layout Changes
- **Grids**: 2-col → 1-col
- **Hero**: Reduce height to 80vh
- **Work page**: Vertical scroll instead of horizontal
- **Navigation**: Hamburger menu
- **Process**: Horizontal scroll or vertical stack

---

## 11. Performance Requirements

### 11.1 Core Web Vitals Targets
```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
```

### 11.2 Optimization Strategies
- **Images**: WebP format, lazy loading, responsive srcset
- **Fonts**: Preload critical fonts, font-display: swap
- **CSS**: Critical CSS inline, defer non-critical
- **JS**: Code splitting, lazy load non-critical
- **Animations**: Use transform/opacity only, will-change sparingly

### 11.3 Loading Strategy
- **Hero**: Priority load (no lazy loading)
- **Below fold**: Lazy load images
- **Fonts**: Preload Bricolage Grotesque Bold, defer others
- **Third-party**: Defer analytics, async social embeds

---

## 12. Accessibility Requirements

### 12.1 WCAG 2.1 Level AA Compliance

#### Color Contrast
- **Text**: Minimum 4.5:1 (body), 3:1 (large text)
- **Amber on dark**: 7.2:1 (passes AAA)
- **White on dark**: 15.8:1 (passes AAA)
- **Muted text**: 4.6:1 (passes AA)

#### Keyboard Navigation
- **Tab order**: Logical, follows visual flow
- **Focus indicators**: 2px amber outline, 3px offset
- **Skip link**: "Skip to main content" (visible on focus)
- **Interactive elements**: All keyboard accessible

#### Screen Readers
- **Semantic HTML**: Proper heading hierarchy (h1 → h2 → h3)
- **ARIA labels**: For icon buttons, decorative elements
- **Alt text**: Descriptive for all images
- **Landmarks**: header, nav, main, footer, section

#### Forms
- **Labels**: Associated with inputs (for/id)
- **Error messages**: Clear, associated with fields
- **Required fields**: Marked visually and programmatically
- **Validation**: Client and server-side

### 12.2 Reduced Motion
- **Respect preference**: prefers-reduced-motion: reduce
- **Disable animations**: All motion disabled
- **Maintain functionality**: No motion-dependent features
- **Hover states**: Maintained (no motion)

---

## 13. Implementation Guidelines

### 13.1 Technology Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 + CSS Modules for complex components
- **Fonts**: Google Fonts (Bricolage Grotesque, Spectral, Figtree) + Geist Mono
- **Animation**: Motion library (Framer Motion successor)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend API

### 13.2 File Structure
```
web/src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx (home)
│   ├── work/
│   │   ├── page.tsx (overview)
│   │   ├── hospital/page.tsx
│   │   ├── cafe/page.tsx
│   │   ├── hotel/page.tsx
│   │   ├── school/page.tsx
│   │   └── fitness/page.tsx
│   ├── contact/page.tsx
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   └── globals.css
├── components/
│   ├── sections/ (HomeHero, HomeServices, etc.)
│   ├── site/ (Navigation, Footer)
│   ├── ui/ (Button, Card, etc.)
│   └── work/ (WorkSlide, CaseStudyHero, etc.)
├── content/
│   ├── pages/home.ts
│   ├── work/projects.ts
│   └── brand.ts
└── lib/
    ├── motion.ts
    └── utils.ts
```

### 13.3 Component Patterns

#### Server Components (Default)
- All static content
- Layout components
- Section components without interactivity

#### Client Components (Explicit)
- Forms (inquiry form)
- Theme toggle
- Navigation (mobile menu)
- Horizontal scroll (Work page)
- Animations (entrance, hover)

### 13.4 Content Management
- **Typed content**: TypeScript modules in `/content`
- **No CMS**: Static content for launch
- **Future**: Headless CMS integration possible

---

## 14. Quality Checklist

### 14.1 Design Quality
- [ ] All pages match design system
- [ ] Typography hierarchy consistent
- [ ] Spacing follows system
- [ ] Colors match palette exactly
- [ ] Hover states on all interactive elements
- [ ] Focus states visible and consistent
- [ ] Animations smooth and purposeful

### 14.2 Technical Quality
- [ ] TypeScript: No errors
- [ ] Build: Successful production build
- [ ] Performance: Core Web Vitals pass
- [ ] Accessibility: WCAG 2.1 AA compliant
- [ ] Responsive: Works on all breakpoints
- [ ] Cross-browser: Chrome, Firefox, Safari, Edge
- [ ] SEO: Metadata, sitemap, robots.txt

### 14.3 Content Quality
- [ ] All copy proofread
- [ ] Images optimized (WebP, responsive)
- [ ] Alt text for all images
- [ ] Links tested
- [ ] Forms validated (client + server)
- [ ] Error states handled
- [ ] Loading states implemented

---

## 15. Launch Readiness

### 15.1 Pre-Launch Requirements
- [ ] Real contact details (email, phone)
- [ ] Legal pages finalized (privacy, terms)
- [ ] Analytics configured (PostHog)
- [ ] Domain configured (kivox.in)
- [ ] SSL certificate active
- [ ] Error pages (404, 500)
- [ ] Favicon and social preview images

### 15.2 Post-Launch Monitoring
- [ ] Core Web Vitals tracking
- [ ] Error monitoring
- [ ] Form submission tracking
- [ ] User feedback collection
- [ ] A/B testing setup (future)

---

## Appendix A: Design Rationale

### Why Warm Amber?
- Approachable premium (vs. aggressive lime or cold cyan)
- Warm, inviting, craft-focused
- High contrast on dark backgrounds
- Memorable and distinctive

### Why Editorial Typography?
- Sophistication without pretension
- Serif adds warmth and refinement
- Maintains modern credibility
- Excellent readability

### Why Work Montage Hero?
- Immediate proof through work showcase
- Visual interest without distraction
- Balances sophistication with credibility
- Memorable first impression

### Why Horizontal Scroll Work Page?
- Immersive storytelling
- Premium agency aesthetic
- Memorable experience
- Showcases craft and attention to detail

---

## Appendix B: Future Enhancements

### Phase 2 (Post-Launch)
- Individual service pages
- Industry-specific landing pages
- Blog/insights section
- Client testimonials (when available)
- Real case studies (replace studio demos)

### Phase 3 (Growth)
- Interactive project filters
- Advanced animations
- Video content
- Team page expansion
- Resource library

---

**End of Specification**

This document serves as the complete design specification for the Kivox website redesign. All implementation should follow these guidelines to ensure consistency, quality, and alignment with the approved design direction.
