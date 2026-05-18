type LegalSection = {
  title: string;
  lead?: string;
  paragraphs?: string[];
  bullets?: string[];
};

export const legal: {
  privacy: {
    title: string;
    intro: string;
    sections: LegalSection[];
  };
  terms: {
    title: string;
    intro: string;
    sections: LegalSection[];
  };
} = {
  privacy: {
    title: "Privacy Policy",
    intro:
      "This page explains what information Kivox collects when you contact us, why we use it, and how to reach us about privacy questions.",
    sections: [
      {
        title: "What We Collect",
        lead: "When you submit a project inquiry, we may collect:",
        bullets: [
          "Name",
          "Email",
          "Phone number",
          "Business type",
          "What you need help with",
          "Your project goal",
          "Optional details you share (website URL, timeline, notes)",
        ],
      },
      {
        title: "Why We Collect It",
        lead: "We use this information to:",
        bullets: [
          "Reply to your inquiry",
          "Understand what you need so we can suggest next steps",
          "Prepare for a discovery call or a written proposal",
        ],
      },
      {
        title: "How We Use It",
        bullets: [
          "Inquiry information is used for communication and scoping only.",
          "We do not sell your data.",
        ],
      },
      {
        title: "Analytics (If Enabled)",
        lead: undefined,
        paragraphs: [
          "If analytics is enabled on this site, it is used to understand how visitors use the website (for example: which pages are visited, which buttons are clicked, and whether the inquiry form is started or submitted).",
          "We do not send inquiry form contents (names, emails, phone numbers, URLs, or free-text notes) to analytics systems.",
        ],
        bullets: undefined,
      },
      {
        title: "Contact",
        lead: undefined,
        paragraphs: [
          "For privacy-related requests, contact: kivox.contact@gmail.com",
        ],
        bullets: undefined,
      },
    ],
  },
  terms: {
    title: "Terms",
    intro:
      "These terms explain how this website should be used and how project work is agreed before it begins.",
    sections: [
      {
        title: "General Information",
        lead: undefined,
        paragraphs: [
          "The information on this website is provided for general business inquiry purposes.",
        ],
        bullets: undefined,
      },
      {
        title: "No Guarantees",
        lead: undefined,
        paragraphs: [
          "Kivox does not guarantee specific outcomes including (but not limited to) rankings, leads, revenue, bookings, or business results. Results depend on many factors outside of Kivox’s control.",
        ],
        bullets: undefined,
      },
      {
        title: "Project Scope",
        lead: undefined,
        paragraphs: [
          "Project scope, deliverables, timelines, and costs are agreed in writing before work begins.",
        ],
        bullets: undefined,
      },
      {
        title: "Contact",
        lead: undefined,
        paragraphs: ["For questions, contact: kivox.contact@gmail.com"],
        bullets: undefined,
      },
    ],
  },
};
