# Product Strategy: Kivox Studio

## Register

brand

## Users

**Primary Target**: SMB owners and operators (time-poor, want certainty, dislike jargon).

**Context**: Evaluating potential web studio partners during business hours, often on mobile, in bright daylight. They need to quickly understand capabilities, see proof of craft, and feel confident taking the next step. They compare multiple studios. Decision speed matters.

**Job to be Done**: Find a trustworthy studio that can build a premium website/web app that makes their business easier to understand and trust online.

**Typical Situations**:
- Launching a new business or new location
- Frustrated with an outdated/unclear website
- Losing inquiries because information is hard to find
- Needs a secure booking/appointment/inquiry workflow, not just a brochure site

**What visitors notice first** (in this order):
1. Does this feel professional and warm? (first 2 seconds)
2. Can I see examples of websites they've actually built? (first 5 seconds)
3. Do other people trust them? (first 10 seconds)
4. What exactly do they offer, and how much might it cost? (first 30 seconds)
5. How do I take the next step with minimal risk? (first 60 seconds)

**What visitors never notice**: Color space precision, animation physics, design system documentation, technical stack choices, font licensing decisions.

## Product Purpose

Kivox is a boutique studio website that converts qualified SMB owners/operators into serious project inquiries.

**What it does**: Showcases Kivox's craft, clarity, and approach through approachable design, visible proof, and clear paths to action.

**Showcase role**: The showcase includes fully built concept websites that demonstrate how Kivox thinks through different business contexts. Each concept project has its own audience, interaction model, visual language, and conversion path. They demonstrate range and depth of thinking, not just visual polish.

**Named concept projects**: The current showcase properties are MedQueue, The Roastery, Aurelia Grand, Greenfield Academy, and Vortex Fitness. These are self-initiated concept projects, not client work. They must be presented honestly as demonstrations of craft and thinking.

**Sub-website standard**: These concept websites do not inherit Kivox's theme by default. Their typography, palette, layout, motion, navigation, and content structure can be completely separate from Kivox when the concept demands it. What they must inherit is the Kivox standard: intentional design, sharp information architecture, fast technical execution, accessibility, responsive polish, and a clear reason for every interaction.

**Why it exists**: To establish trust through visible proof. The site must feel professional, warm, and approachable while demonstrating craft quality that proves Kivox can deliver.

**Success looks like**: Increased qualified project inquiries, visitors understanding what Kivox does within 5 seconds, visitors reaching Work and Contact sections at healthy rates, form completion rates improving over iterations.

## Brand Personality

**Three words**: Warm, Confident, Craft-focused

**Voice & Tone**: Confident studio. Direct. Buyer-readable. Warm, not intimidating. No jargon unless immediately grounded in examples.

**Emotional goals** (in priority order):
- **Warmth**: Approachable premium. The site should feel like walking into a well-run studio, not a dark server room.
- **Trust**: Visible proof through real testimonials, craft demonstrations, and transparent process.
- **Clarity**: Plain language. A bakery owner should understand everything on this page.
- **Confidence**: The quality of execution proves capability without defensive disclaimers.

**Brand promise**: "Clarity that earns trust. Craft that holds up."

## Social Proof Strategy

**What we have and how to use it:**

1. **Real testimonials**: Display prominently on the homepage with names, roles, and photos where available. These are the strongest trust signal we have.
2. **Concept project logos**: Present in a "Projects we've crafted" band. Frame honestly as demonstrations of thinking, not as client logos.
3. **Process transparency**: The step-by-step process section serves as proof of professionalism.
4. **Live showcases**: Interactive live demos are rare for studios at any level. This is a genuine differentiator when visitors actually experience them.

**What we don't have and must not fake:**
- Client count statistics ("50+ clients"). Do not fabricate.
- Revenue impact claims ("increased sales by 120%"). Do not fabricate.
- Awards or certifications we haven't earned.
- Client logos from companies we haven't worked with.

**When we earn real client work**: Add genuine stats, real client logos, and measurable results. Until then, let the craft speak and the testimonials provide social validation.

## Anti-references

**What this should NOT look like**:

1. **Generic SaaS template sites**: Gradient text, glassmorphism, hero-metric templates with big numbers, identical card grids
2. **Loud startup pages**: Neon colors, aggressive animations, hype language, "disruptive" posturing
3. **Template agency grids**: Same-sized cards with icon + heading + text repeated endlessly
4. **Enterprise posturing**: Awards/metrics claims we don't have, corporate jargon, defensive disclaimers
5. **Intimidating craft showcases**: Dark-by-default, abstract hero art that requires interpretation, hidden navigation, interactions that require exploration before understanding, philosophy over proof
6. **Luxury hotel pages**: Excessive whitespace, pretentious copy, inaccessible minimalism

**Specific bad patterns to avoid**:
- Side-stripe borders as colored accents
- Gradient text (background-clip: text)
- Glassmorphism as default
- Modal as first thought for interactions
- Em dashes in copy
- Restated headings or intros that repeat the title
- Dark mode as default for non-technical audiences
- Hiding navigation behind a hamburger on desktop
- Abstract hero visuals that don't communicate what the studio builds
- High-commitment CTAs ("Start a project") before trust is established
- Fabricated statistics or client counts

## Design Principles

1. **Customer-first clarity**: The site exists to serve visitors, not to impress designers. Every design decision is measured by whether a non-technical business owner can understand it in 5 seconds. If craft and clarity conflict, clarity wins.

2. **Show, don't tell**: Proof beats claims. Use live demonstrations, real testimonials, and the site's own quality as evidence. Never claim what you can't prove.

3. **Warmth before drama**: The default experience should feel warm, professional, and inviting. Dramatic or cinematic moments are earned through scroll progression, not imposed at first contact.

4. **Reduce the next step**: Every section should make it easier to take action. Low-commitment CTAs ("Book a Free Call"), visible contact information, and FAQ sections that address objections before they form.

5. **Honest proof**: Concept projects are labeled as concept projects. Testimonials are from real people. The studio's stage of growth is presented with confidence, not disguised with inflated claims.

6. **Craft as proof**: Typography, spacing, motion, and interaction quality demonstrate capability more effectively than any claim. The site's execution is the portfolio. But craft must be visible to non-designers, not hidden behind interactions that only designers appreciate.

7. **Separate worlds, same standard**: Showcase concept websites may look and feel nothing like Kivox. Each should carry its own brand reality. The continuity is craft quality, not visual sameness.

8. **Launchable by default**: A concept website should be treated as something that could become a real standalone website. Demo status is not permission for thin screens, dead-end journeys, or decorative-only UI.

## Accessibility & Inclusion

**WCAG Level**: AA compliance (minimum)

**Known user needs**:
- Keyboard navigation for all interactive elements
- Screen reader compatibility with semantic HTML and ARIA labels
- Color contrast ratios meeting AA standards (4.5:1 for body text, 3:1 for large text)
- Focus indicators visible and consistent (2px amber outline, 3px offset)

**Considerations**:
- **Reduced motion**: Complete static experience for users who prefer reduced motion. All animations disabled, instant state changes, no parallax or scroll effects. Hover states maintained without motion.
- **Color blindness**: Amber accent provides sufficient contrast in both themes. Never rely on color alone to convey information.
- **Mobile accessibility**: Touch targets minimum 44x44px, generous spacing, readable text sizes
- **Form accessibility**: All labels associated with inputs, clear error messages, validation feedback

**Performance as accessibility**: Fast loading and smooth interactions are accessibility features. Target LCP < 2.5s, FID < 100ms, CLS < 0.1.
