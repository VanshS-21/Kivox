export const hospital = {
  slug: "hospital",
  title: "MedQueue",
  subtitle:
    "Reimagining how 12 million patients find and book the right doctor — in under 90 seconds.",
  label: "Healthcare · Product Design",
  image: "/work/hospital copy.webp",
  images: [
    "/work/mockups/Hospital-1.webp",
    "/work/mockups/Hospital-2.webp",
    "/work/mockups/Hospital-3.webp",
  ],
  liveUrl: "/showcase/medqueue",
  year: "2024",
  duration: "14 weeks",
  clientType: "Healthcare SaaS Platform",
  services: [
    "Product Strategy",
    "UX Research",
    "Interface Design",
    "Design System",
    "Frontend Architecture",
  ],

  demonstrates:
    "A full-stack healthcare booking platform that treats doctor discovery like a product problem — not a directory listing. Built around a single conviction: patients don't want more options, they want less uncertainty.",

  challenge:
    "India's healthcare discovery is fundamentally broken. A patient searching for a cardiologist in Mumbai faces a paradox of choice: 4,000+ listed doctors across a dozen platforms, none of which answer the only questions that matter — is this doctor good, are they available today, and can I trust them?\n\nThe existing landscape is built for volume, not confidence. Aggregator platforms stuff pages with SEO-optimized doctor listings, star ratings that mean nothing (4.7 vs 4.8?), and appointment slots that are often phantom — listed as available but already booked. Patients end up calling 3–5 clinics manually, waiting on hold, comparing schedules on paper. The 'digital' healthcare experience ends exactly where it should begin.\n\nMeanwhile, booking platforms in entertainment, travel, and food have solved far simpler versions of the same problem. They understood that the interface is the experience. Healthcare never got that memo. MedQueue was built to close that gap — not by listing more doctors, but by making every listing trustworthy enough to book without a phone call.",

  insight:
    "Booking a doctor isn't like booking a movie ticket. Patients aren't choosing entertainment — they're making a health decision under anxiety. The interface needed to reduce uncertainty at every step: Who is this doctor? Can I trust them? When can I actually go? How long will I wait? The moment we framed this as a confidence problem rather than a convenience problem, every design decision became clear.",

  approach:
    "We built a booking platform anchored to three principles: trust before convenience, data density without cognitive overload, and a booking flow that eliminates every unnecessary step. Doctor profiles are structured around credentials, specialization depth, consultation fees, and real patient outcomes — not vanity metrics. The availability grid borrows interaction patterns from airline seat selection: visual, scannable, and real-time. The entire search-to-confirmation journey was compressed into three deliberate taps, each one surfacing exactly the information patients need to commit with confidence.",

  process: [
    {
      phase: "Discovery & Research",
      duration: "3 weeks",
      description:
        "Interviewed 40+ patients across age groups and tech comfort levels. Shadowed clinic reception desks to observe real booking friction. Mapped the complete patient journey from symptom awareness to post-visit follow-up. Key finding: 73% of patients abandon online booking due to information uncertainty, not technical friction.",
      deliverables: [
        "Research synthesis",
        "Patient journey maps",
        "4 primary personas",
        "Competitive audit of 8 platforms",
      ],
    },
    {
      phase: "Information Architecture",
      duration: "2 weeks",
      description:
        "Designed the search taxonomy (symptoms → specialties → doctors), filter hierarchy, and doctor profile information structure. Tested 3 variations of the doctor card with patients using rapid prototyping. Established the trust signal hierarchy: credentials → experience → patient reviews → availability.",
      deliverables: [
        "IA diagrams",
        "Low-fidelity wireframes",
        "Card sort results",
        "Search flow documentation",
      ],
    },
    {
      phase: "Interface Design",
      duration: "4 weeks",
      description:
        "Designed the complete booking flow across 47 unique screens. Created the availability grid system inspired by airline seat selection. Designed the doctor profile as a 'trust page' rather than a bio page. Implemented progressive disclosure: surface what matters, let patients drill deeper when they need to.",
      deliverables: [
        "High-fidelity mockups (47 screens)",
        "Interaction specifications",
        "Clickable prototype",
        "Motion design guidelines",
      ],
    },
    {
      phase: "Design System",
      duration: "2 weeks",
      description:
        "Built a component library of 120+ components with accessibility baked into every token. Color system uses clinical blues with warm neutrals — professional without being cold. Typography pairs a humanist sans-serif for body text with a geometric display face for brand moments.",
      deliverables: [
        "120+ component library",
        "Design token documentation",
        "Accessibility audit (WCAG 2.1 AA)",
        "Usage guidelines",
      ],
    },
    {
      phase: "Frontend Architecture & Handoff",
      duration: "3 weeks",
      description:
        "Structured the frontend as a Next.js application with server-side rendering for SEO-critical pages (doctor profiles, specialty landing pages) and client-side interactivity for the booking flow. Collaborated with the engineering team on API contracts, loading states, and error handling for real-time availability data.",
      deliverables: [
        "Frontend codebase",
        "API specifications",
        "QA documentation",
        "Performance benchmarks",
      ],
    },
  ],

  designPhilosophy:
    "Healthcare interfaces face a core contradiction: patients need dense, specific information to make confident decisions, but they're often accessing it under stress, distraction, or genuine fear. Our design philosophy reconciled this tension by borrowing a principle from clinical environments — structured calm. Every element on screen earns its presence. White space isn't decoration — it's cognitive breathing room. Data density is high, but visual hierarchy ensures the eye always knows where to go first. We studied how flight booking, fintech dashboards, and e-commerce review systems solve trust at scale, then adapted each pattern for the emotional weight of healthcare decisions.",

  keyDesignDecisions: [
    {
      title: "Why the doctor card shows success rate, not star ratings",
      rationale:
        "Star ratings are meaningless in healthcare. A 4.6 vs 4.7 tells a patient nothing. We replaced the star system with contextual success metrics: years of experience, patients consulted, specialization depth, and — where verifiable — procedure success rates. This required extensive data architecture work, but it gave patients something star ratings never could: a reason to believe.",
    },
    {
      title: "The 3-tap booking flow",
      rationale:
        "Every tap in a booking flow is a chance for the patient to second-guess their decision. We compressed the entire search-to-confirmation journey into three deliberate interactions: (1) Search + Filter → select doctor, (2) Choose slot from availability grid, (3) Confirm + pay. No account creation wall. No multi-page forms. No 'preferred time' dropdowns that get ignored. Each screen surfaces exactly what the patient needs to commit.",
    },
    {
      title: "The availability grid: borrowed from airlines, rebuilt for clinics",
      rationale:
        "Real-time availability is the entire value proposition. We designed a visual grid inspired by airline seat selection: time blocks as visual cells, color-coded by availability density, scrollable by day. Patients can scan an entire week of availability in 2 seconds — something no dropdown or calendar widget can achieve. The grid also surfaces wait-time estimates, turning an invisible anxiety into visible, manageable data.",
    },
    {
      title: "Trust hierarchy: credentials before convenience",
      rationale:
        "Most booking platforms lead with convenience: 'Book in 60 seconds!' We deliberately led with trust signals. The doctor profile page opens with verified credentials, medical registration number, hospital affiliations, and years of active practice — before showing the booking button. Our research showed that patients who trust first, book faster. Convenience is the outcome of confidence, not a substitute for it.",
    },
    {
      title: "Why we killed the chat-with-doctor feature",
      rationale:
        "Early wireframes included a pre-appointment chat feature. We cut it. Patient interviews revealed that chat created more anxiety than it resolved — patients would agonize over how to describe symptoms via text, worry about response times, and often use chat as a procrastination tool to avoid actually booking. The platform's job is to get patients into a consultation room, not to become one.",
    },
  ],

  results: [
    { value: "87s", label: "Avg. Booking Time", context: "Search to confirmation" },
    { value: "34%", label: "Search-to-Booking", context: "Conversion rate across all specialties" },
    { value: "4.8/5", label: "Confidence Score", context: "Post-booking patient survey (n=2,400)" },
    { value: "68%", label: "Return Booking Rate", context: "Within 90 days of first appointment" },
    { value: "91%", label: "Mobile Completion", context: "Bookings completed on mobile devices" },
    { value: "98", label: "Accessibility Score", context: "WCAG 2.1 AA audit — axe-core" },
  ],

  testimonial: {
    quote:
      "We'd tried three different platforms before MedQueue. They all looked like databases with a coat of paint. Kivox understood that we weren't building a directory — we were building a decision engine. The booking numbers speak for themselves, but what I'm most proud of is that patients tell us they feel confident before they even walk into the clinic.",
    author: "Dr. Arjun Mehta",
    role: "Chief Product Officer, MedQueue Health",
  },

  techStack: ["Next.js", "TypeScript", "Radix UI", "PostgreSQL", "Redis", "Stripe", "Twilio"],

  targetAudience: [
    "Patients searching for specialists in metro cities",
    "First-time users unfamiliar with online doctor booking",
    "Repeat patients managing chronic care appointments",
    "Caregivers booking on behalf of family members",
  ],
  primaryActions: [
    "Search for a doctor by specialty, symptom, or location",
    "View doctor credentials, reviews, and trust signals",
    "Book an appointment from real-time availability",
    "Manage upcoming and past appointments",
  ],
  coreSections: [
    "Search & Discovery (filters, specialty taxonomy, location)",
    "Doctor Profiles (credentials, reviews, availability grid)",
    "Booking Flow (slot selection, payment, confirmation)",
    "Patient Dashboard (upcoming, history, prescriptions)",
    "Clinic Management (schedule, patient queue, analytics)",
  ],
  uxDecisions: [
    "Decision architecture over information architecture — every screen answers 'what should I do next?'",
    "Progressive disclosure: surface what matters, let patients drill deeper on demand.",
    "Real-time feedback on every interaction — loading states, confirmation pulses, slot locks.",
    "Accessibility as a clinical necessity — not a compliance checkbox.",
  ],
  proofNotes: [
    "Label: Studio Demonstration",
    "No real patient data or medical records. All doctor profiles and metrics are fictional.",
  ],
};
