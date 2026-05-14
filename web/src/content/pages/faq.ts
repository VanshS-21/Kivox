type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategory = {
  label: string;
  items: FaqItem[];
};

export const faq: {
  title: string;
  intro: string;
  categories: FaqCategory[];
} = {
  title: "Questions We Hear Often",
  intro:
    "Honest answers about how we work, what to expect, and whether we're the right fit. If something isn't covered here, reach out directly.",
  categories: [
    {
      label: "Working Together",
      items: [
        {
          question: "How does a project typically start?",
          answer:
            "You fill out the inquiry form or email us directly. We reply within 24 hours with a few focused questions, then schedule a 30-minute discovery call. After that, we send a written scope, timeline, and cost estimate. No work begins until both sides agree in writing.",
        },
        {
          question: "What does your process look like?",
          answer:
            "Five stages: Discover (understand the business and customer decision), Define (fix the structure, pages, content order, calls to action), Design (craft the interface with clarity), Build (fast, responsive, maintainable code), Launch and Evolve (deploy, measure, iterate). Each stage has a clear deliverable and a feedback checkpoint before moving forward.",
        },
        {
          question: "How long does a typical project take?",
          answer:
            "A focused website (5 to 8 pages) takes 4 to 6 weeks from kickoff to launch. Larger projects with custom backend systems or web apps take 8 to 12 weeks. Timelines depend on scope, feedback speed, and content readiness. We share a detailed timeline in the proposal.",
        },
        {
          question: "Who will I be working with?",
          answer:
            "You work directly with the people building your project. No account managers, no hand-offs to junior teams. The person on the discovery call is the person designing and building your site.",
        },
      ],
    },
    {
      label: "Scope and Pricing",
      items: [
        {
          question: "How much does a project cost?",
          answer:
            "It depends on scope. A focused website starts around ₹80,000 to ₹1,50,000. Web apps, custom dashboards, or backend-enabled systems start higher. We provide a fixed quote after the discovery call, never hourly billing, never surprise invoices. You know the full cost before any work begins.",
        },
        {
          question: "Do you offer payment plans?",
          answer:
            "Yes. Standard structure is 40% at kickoff, 30% at design approval, and 30% at launch. For larger projects, we can discuss milestone-based schedules. The exact terms are defined in the project agreement.",
        },
        {
          question: "What if my budget is limited?",
          answer:
            "We scope to your budget, not the other way around. If the full vision doesn't fit today, we'll recommend which pieces to build first for the most impact and what can wait for a Phase 2. We'd rather build something excellent at a smaller scope than something mediocre at full scope.",
        },
      ],
    },
    {
      label: "Design and Development",
      items: [
        {
          question: "What technologies do you use?",
          answer:
            "We choose tools based on the project, not habit. For most business websites: Next.js, React, and Tailwind CSS for fast, SEO-ready, responsive builds. For backend systems: Node.js, PostgreSQL, or whatever fits the problem. For Android apps: Kotlin or cross-platform frameworks. We never lock you into a proprietary stack.",
        },
        {
          question: "Will my website be mobile-friendly?",
          answer:
            "Every project is designed mobile-first. We test across real devices and screen sizes. Performance is part of the build, not an afterthought: fast load times, accessible navigation, touch-friendly interactions.",
        },
        {
          question: "How many revisions are included?",
          answer:
            "Design includes two rounds of structured feedback at each major milestone. This isn't about counting revisions; it's about making decisions together at the right moments. Most projects need fewer rounds than expected because we align on direction early in the process.",
        },
        {
          question: "Do you handle SEO?",
          answer:
            "Technical SEO is built into every project: semantic HTML, structured data, meta tags, performance optimization, mobile responsiveness. For content strategy and ongoing SEO campaigns, we can scope that as an add-on or recommend a specialist partner.",
        },
      ],
    },
    {
      label: "After Launch",
      items: [
        {
          question: "Who owns the code and design?",
          answer:
            "You do. After final payment, all source code, design files, and assets transfer to you completely. No licensing fees, no lock-in. You can take the project to any developer in the future.",
        },
        {
          question: "Do you offer maintenance after launch?",
          answer:
            "We include 30 days of post-launch support for bug fixes and minor adjustments at no extra cost. For ongoing maintenance (updates, hosting management, content changes), we offer monthly retainer plans. These are optional, not required.",
        },
        {
          question: "What if I need changes later?",
          answer:
            "You can reach out anytime. Small tweaks are usually handled quickly on a per-request basis. Larger changes (new features, redesigns, integrations) follow the same scoping process as a new project: discovery, proposal, agreement, then build.",
        },
      ],
    },
  ],
};
