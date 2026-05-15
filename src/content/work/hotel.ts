export const hotel = {
  slug: "hotel",
  title: "Aurelia Grand",
  subtitle:
    "Crafting digital luxury that converts browsers into direct bookings.",
  label: "Luxury · Hospitality",
  image: "/work/hotel copy.webp",
  images: [
    "/work/mockups/Hotel-1.webp",
    "/work/mockups/Hotel-2.webp",
    "/work/mockups/Hotel-3.webp",
  ],
  liveUrl: "https://example.com/hotel",
  year: "2024",
  duration: "10 weeks",
  clientType: "Boutique Luxury Hotel",
  services: ["Brand Strategy", "Visual Design", "UX Architecture", "Frontend Development"],

  demonstrates:
    "A digital presence for a boutique luxury hotel that treats the website as the first room the guest enters — where quiet confidence and transparent information replace the generic booking portal aesthetic.",

  challenge:
    "Boutique hotels sell experience over scale, but their digital presence almost always looks identical to every other hotel on the internet. Aurelia Grand was trapped in this cycle. Their existing website was a templated booking engine skin — hero carousel, 'Book Now' button above the fold, stock lifestyle photography, and room descriptions written in marketing superlatives.\n\nBut the real business problem was deeper than design. Aurelia was losing 40% of their bookings to Online Travel Agencies — Booking.com, Expedia, MakeMyTrip — each taking a 15–22% commission per reservation. Their website existed, but it didn't convince. Guests would discover Aurelia on Instagram, visit the website to learn more, then book through an OTA because the OTA felt more trustworthy.\n\nThe hotel's own website was the weakest link in its own conversion funnel. The digital experience needed to embody the same restraint and elegance guests would feel walking through the lobby — while simultaneously being a more convincing booking interface than any third-party platform.",

  insight:
    "A luxury hotel website isn't competing with other hotel websites — it's competing with OTAs. And OTAs win on trust, not price. The only way to pull bookings back to the direct channel is to out-trust the aggregator: clearer room information, more transparent policies, and a booking experience that feels safer than a third-party platform.",

  approach:
    "The color system uses deep navy-blacks with gold accents — creating quiet luxury without the common trap of white-on-white minimalism that reads as 'unfinished' rather than 'premium.' Room cards are designed as decision interfaces: they answer real booking questions (square footage, bed configuration, guest capacity, view, and price) before asking for a click. Policies are treated as hospitality, not legal fine print — cancellation terms, check-in flexibility, and pet policies receive the same design care as room descriptions. Every scroll interaction is intentionally slow and fluid, matching the unhurried pace of a premium stay.",

  process: [
    {
      phase: "Brand Immersion",
      duration: "1.5 weeks",
      description:
        "Visited the property for two days. Documented the guest arrival sequence, room details, common concierge questions, and the subtle design language of the physical space: materials, lighting temperatures, the pace at which staff move. Interviewed the general manager, head of reservations, and three repeat guests. Key finding: repeat guests chose Aurelia for its 'unhurried' quality — a trait completely absent from the website.",
      deliverables: ["Brand audit", "Guest journey map", "Competitor positioning analysis", "Photography brief"],
    },
    {
      phase: "Conversion Audit",
      duration: "1 week",
      description:
        "Analyzed 6 months of booking data: traffic sources, drop-off points, OTA vs. direct split, device breakdown. Found that 67% of direct website visitors viewed room pages but only 11% initiated a booking — because room pages answered marketing questions ('Luxurious ambiance') instead of booking questions ('King bed or queens? How many guests? What's the cancellation policy?').",
      deliverables: ["Analytics report", "Conversion funnel map", "Hypothesis document", "OTA commission analysis"],
    },
    {
      phase: "Design Exploration",
      duration: "3 weeks",
      description:
        "Explored three visual directions: Classic Luxury (marble textures, gold leaf), Modern Restraint (dark neutrals, editorial typography), and Warm Contemporary (earth tones, organic shapes). The client gravitated toward Modern Restraint — which aligned with the physical property's design language. Built the complete design system around this direction.",
      deliverables: ["Three mood boards", "Selected direction rationale", "Full design system", "Responsive mockups"],
    },
    {
      phase: "Development",
      duration: "3 weeks",
      description:
        "Built on Next.js with ISR for room pages updated nightly from the property management system. Image optimization produces 4 responsive breakpoints per photograph in WebP/AVIF. Scroll-driven animations use CSS scroll-timeline for zero-JS motion. The booking widget is first-party — no third-party booking engine UI.",
      deliverables: ["Production codebase", "PMS integration", "Performance optimization", "Booking flow"],
    },
    {
      phase: "Launch & Optimization",
      duration: "1.5 weeks",
      description:
        "Soft-launched to the hotel's email list before public launch. Monitored the booking funnel daily for two weeks, making micro-adjustments to CTA placement and room page information density based on heatmap data from real guest sessions.",
      deliverables: ["Launch deployment", "Two-week optimization report", "Heatmap analysis", "Final metrics"],
    },
  ],

  designPhilosophy:
    "Luxury in digital design is almost always performed through excess: heavy animations, full-screen videos, dramatic parallax effects. We took the opposite approach. True luxury is confidence — the confidence to leave space empty, to let a photograph speak without a headline overlay, to show a price without an asterisk. The Aurelia Grand website feels expensive because it isn't trying to. Every element earns its presence, and everything that doesn't serve the guest's decision has been removed.",

  keyDesignDecisions: [
    {
      title: "Policy pages as hospitality",
      rationale:
        "Most hotel websites treat policy pages as legal obligations: dense text, tiny font, buried in the footer. We redesigned them as hospitality touchpoints. Cancellation terms are presented with the same visual care as room descriptions — clear, spacious, and written in first person ('You can cancel up to 48 hours before check-in'). Pet policies include specifics guests actually need ('Dogs under 15kg welcome; bed and water bowl provided in-room'). When policies feel like hospitality, guests trust the booking enough to skip the OTA.",
    },
    {
      title: "Room cards show square footage before price",
      rationale:
        "Our research showed that boutique hotel guests decide on space and configuration first, price second. The room card hierarchy leads with: room name, photo, square footage, bed configuration, max guests, view description — then price. This is the opposite of OTA design (which leads with price), and it's deliberate: we want guests comparing experiences, not rates.",
    },
    {
      title: "Scroll velocity as brand expression",
      rationale:
        "Every scroll-driven animation on the site runs at 60% of default browser speed. This is the single most commented-on design detail in guest feedback. The slow pace is a subliminal signal: this is not a fast-food experience. You can take your time. It matches the 'unhurried' quality that repeat guests cited as their primary reason for returning.",
    },
    {
      title: "No hero carousel",
      rationale:
        "The homepage uses a single, carefully selected full-bleed photograph instead of a rotating carousel. Carousels are the junk food of hotel web design: they let everyone have their content 'above the fold' without anyone making a curatorial decision. A single image forces a point of view — and having a point of view is what separates a boutique hotel from a chain.",
    },
    {
      title: "Direct booking as the default, not the alternative",
      rationale:
        "The booking flow lives on the hotel's domain with no third-party redirects. The confirmation email comes from Aurelia Grand, not a booking engine. Rate parity is displayed transparently ('This rate matches Booking.com and Expedia'). We removed every reason a guest might have to leave the website and book elsewhere.",
    },
  ],

  results: [
    { value: "23%", label: "OTA → Direct Shift", context: "Within 90 days of launch" },
    { value: "3.1×", label: "Booking Conversion", context: "Increase in booking page completion rate" },
    { value: "4m 12s", label: "Avg. Session Duration", context: "Up from 1m 38s pre-redesign" },
    { value: "41%", label: "Bounce Rate Reduction", context: "Across all landing pages" },
    { value: "97", label: "Accessibility Score", context: "Lighthouse accessibility audit" },
    { value: "1.8s", label: "Mobile LCP", context: "Largest Contentful Paint on 4G" },
  ],

  testimonial: {
    quote:
      "Our previous website was built by a company that produces hotel sites in bulk. It looked like every other property on the internet. Kivox spent two days at our hotel before they opened a design tool. The site they built feels like walking into our lobby — and for the first time, guests are booking directly instead of going through Expedia.",
    author: "Nadia Castellano",
    role: "General Manager, Aurelia Grand",
  },

  techStack: ["Next.js", "TypeScript", "Sanity CMS", "Cloudinary", "PMS Integration", "AVIF/WebP"],

  targetAudience: [
    "Couples and families comparing boutique stays",
    "Business travelers checking location, amenities, and reliability",
    "Guests who need policy clarity before committing to a booking",
    "Returning guests booking directly for loyalty benefits",
  ],
  primaryActions: [
    "Explore rooms with real booking details (size, bed, capacity, view, price)",
    "Read policies as transparent hospitality — not legal fine print",
    "Book directly without leaving the website or opening a third-party app",
    "Contact the concierge for custom requests",
  ],
  coreSections: [
    "Home (cinematic hero + value proposition + room preview + location)",
    "Rooms (detail pages with booking-ready information)",
    "Amenities & Experiences",
    "Policies (styled as hospitality, not legalese)",
    "Contact & Direct Booking",
  ],
  uxDecisions: [
    "Room information designed for booking decisions, not marketing impressions.",
    "Policy transparency as a trust-building conversion strategy.",
    "Booking flow is first-party — no third-party redirects or 'powered by' branding.",
    "Scroll pacing reflects the brand's unhurried luxury identity.",
  ],
  proofNotes: [
    "Label: Studio Demonstration",
    "No real hotel branding or claim of affiliation.",
  ],
};
