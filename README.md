# Kivox Studio Website

Welcome to the Kivox Studio codebase. This repository contains the source code for Kivox's boutique web studio portfolio site, engineered for high performance, accessibility, and a premium visual identity.

## Overview

The site is a modern, static-optimized Next.js application that showcases Kivox's commitment to craft, clarity, and trust. It features a unique **dual-theme architecture** ("Firelit Studio" dark mode and "Atelier" light mode), complex generative canvas backgrounds, and a highly secure, rate-limited project inquiry pipeline.

## Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **UI Library:** [React 19](https://react.dev/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animation:** [Motion (Framer Motion)](https://motion.dev/)
*   **Validation:** [Zod](https://zod.dev/) & [React Hook Form](https://react-hook-form.com/)
*   **Analytics:** [PostHog](https://posthog.com/)
*   **Email Delivery:** [Resend](https://resend.com/)
*   **E2E Testing:** [Playwright](https://playwright.dev/)

## Core Architecture

### Dual-Theme System
The site doesn't just invert colors; it switches emotional temperatures.
*   **Dark Mode (The Firelit Studio):** Warm-tinted neutral surfaces (`oklch` hue 65) with glowing amber accents to simulate firelight in a workshop.
*   **Light Mode (The Atelier):** Cool, architectural whites (`oklch` hue 250) paired with burnt amber accents for crisp, highly readable contrast. The `HomeServices` and `HomeProcess` sections use a "Warm Linen" exception to prevent content density from feeling sterile.

### Motion & Interactions
All motion is scroll-driven or user-initiated, utilizing `framer-motion` for physics-based springs (e.g., the Magnetic CTA button) and staggered entry animations. Generative visuals (Constellation Canvas) run in optimized `requestAnimationFrame` loops governed by `IntersectionObserver` to halt computation when off-screen.

### Inquiry Pipeline Security
The `/api/inquiry` endpoint handles client contact submissions. It is hardened against spam through:
1.  **Honeypot Fields:** Invisible fields to trap automated bots.
2.  **Time-to-Fill Validation:** A client-side cookie (`kivox_inquiry_started_at`) measures how quickly the form was submitted to reject superhuman speed.
3.  **IP Rate Limiting:** A sliding-window rate limiter restricts submissions (5 requests per 15 minutes per IP).

## Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm or pnpm

### Environment Setup

Create a `.env` file in the root directory based on `.env.example` (if provided), or create one manually:

```bash
# Analytics (Optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com

# Email Delivery (Required for Form Submissions)
RESEND_API_KEY=your_resend_api_key
INQUIRY_FROM_EMAIL=onboarding@resend.dev # Replace with your verified domain
INQUIRY_TO_EMAIL=your_inbox@domain.com
```

### Running Locally

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

The project includes a robust End-to-End testing suite using Playwright to validate the critical inquiry pipeline, form validation logic, and server-side rate-limiting.

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run the test suite
npm run test:e2e

# Run tests with UI mode for debugging
npx playwright test --ui
```

## Typography System

The project relies on `next/font` for optimal loading of a curated typographic hierarchy:
*   **Bricolage Grotesque:** Confident, ink-trap Display headlines.
*   **Spectral:** Sophisticated editorial serif for subheads and storytelling.
*   **Figtree:** Clean, geometric-humanist sans for high-readability body copy.
*   **Geist Mono:** Precise monospace for technical labels, step counters, and metadata.

## Documentation

For deep dives into the design philosophy and product strategy, see:
*   [`DESIGN.md`](./DESIGN.md) - The complete design system, token rules, and component specs.
*   [`PRODUCT.md`](./PRODUCT.md) - User personas, brand voice rules, and anti-patterns.
