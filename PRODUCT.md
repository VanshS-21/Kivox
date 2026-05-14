# Product Strategy: Kivox Studio

## Users

**Primary Target**: SMB owners and operators (time-poor, want certainty, dislike jargon).

**Context**: Evaluating potential web studio partners during business hours. They need to quickly understand capabilities, see proof of craft, and feel confident taking the next step.

**Job to be Done**: Find a trustworthy studio that can build a premium website/web app that makes their business easier to understand and trust online.

**Typical Situations**:
- Launching a new business or new location
- Frustrated with an outdated/unclear website
- Losing inquiries because information is hard to find
- Needs a secure booking/appointment/inquiry workflow, not just a brochure site

## Product Purpose

Kivox is a boutique studio website that converts qualified SMB owners/operators into serious project inquiries.

**What it does**: Showcases Kivox's craft, clarity, and systems-thinking approach through bold design, editorial sophistication, and work-forward presentation.

**Why it exists**: To establish premium trust through design quality itself - the site must feel premium, fast, and considered to prove Kivox can deliver the same for clients.

**Success looks like**: Increased qualified project inquiries, visitors reaching Work and Contact sections at healthy rates, and form completion rates improving over iterations.

## Brand Personality

**Three words**: Bold, Confident, Craft-focused

**Voice & Tone**: Bold studio. Confident. Direct. Buyer-readable. No jargon unless immediately grounded in examples.

**Emotional goals**:
- **Confidence**: Visitors feel certain this studio knows what they're doing
- **Trust**: Design quality proves capability without defensive disclaimers
- **Clarity**: Plain language that an owner can stand behind
- **Warmth**: Approachable premium, not cold or intimidating

**Brand promise**: "Clarity that earns trust. Craft that holds up."

## Anti-references

**What this should NOT look like**:

1. **Generic SaaS template sites** - Gradient text, glassmorphism, hero-metric templates with big numbers, identical card grids
2. **Loud startup pages** - Neon colors, aggressive animations, hype language, "disruptive" posturing
3. **Template agency grids** - Same-sized cards with icon + heading + text repeated endlessly
4. **Enterprise posturing** - Awards/metrics claims we don't have, corporate jargon, defensive disclaimers
5. **Dark tech aesthetic** - Pure black backgrounds, neon accents, Matrix-style effects
6. **Luxury hotel pages** - Excessive whitespace, pretentious copy, inaccessible minimalism

**Specific bad patterns to avoid**:
- Side-stripe borders as colored accents
- Gradient text (background-clip: text)
- Glassmorphism as default
- Modal as first thought for interactions
- Em dashes in copy
- Restated headings or intros that repeat the title

## Design Principles

1. **Practice what you preach**: The site itself must demonstrate the craft, clarity, and performance we promise clients. Every design decision should be defensible and intentional.

2. **Show, don't tell**: Proof beats claims. Use studio demonstrations, process artifacts, and the site's own quality as evidence rather than making unverifiable promises.

3. **Clarity → action**: Visitors should understand what Kivox does and what to do next within 10 seconds. Every word earns its place. No jargon without immediate grounding.

4. **Work-forward confidence**: Lead with work and capability, not defensive disclaimers or apologies. Studio demonstrations are clearly labeled but presented with full confidence.

5. **Craft is the proof**: Typography, spacing, motion, and interaction quality demonstrate capability more effectively than any claim. The site's execution is the portfolio.

## Accessibility & Inclusion

**WCAG Level**: AA compliance (minimum)

**Known user needs**:
- Keyboard navigation for all interactive elements
- Screen reader compatibility with semantic HTML and ARIA labels
- Color contrast ratios meeting AA standards (4.5:1 for body text, 3:1 for large text)
- Focus indicators visible and consistent (2px amber outline, 3px offset)

**Considerations**:
- **Reduced motion**: Complete static experience for users who prefer reduced motion. All animations disabled, instant state changes, no parallax or scroll effects. Hover states maintained without motion.
- **Color blindness**: Amber accent provides 7.2:1 contrast on dark backgrounds (passes AAA). Never rely on color alone to convey information.
- **Mobile accessibility**: Touch targets minimum 44x44px, generous spacing, readable text sizes
- **Form accessibility**: All labels associated with inputs, clear error messages, validation feedback

**Performance as accessibility**: Fast loading and smooth interactions are accessibility features. Target LCP < 2.5s, FID < 100ms, CLS < 0.1.
