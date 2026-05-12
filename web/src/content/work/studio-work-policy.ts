export const studioWorkPolicy = {
  labels: [
    {
      id: "studio-demonstration",
      title: "Studio Demonstration",
      summary: "Built by Kivox to demonstrate craft and approach.",
    },
    {
      id: "internal-project",
      title: "Internal Project",
      summary: "Built for Kivox’s own operations/content system.",
    },
    {
      id: "concept-build",
      title: "Concept Build",
      summary: "Early exploration; not a finished product.",
    },
  ],
  defaultLabelId: "studio-demonstration",
  canSay: [
    "What problem the project solves for a realistic business.",
    "What decisions were made: structure, hierarchy, user journeys, and interface logic.",
    "What we designed and built (screens, flows, responsiveness, accessibility considerations).",
    "What a customer can do on the site/app (clear actions).",
  ],
  cannotSay: [
    "Do not imply a client relationship.",
    "Do not use client names/logos.",
    "Do not claim results (revenue, conversions, rankings, bookings) unless you have real data and permission.",
    "Do not use “award-winning”, “trusted by”, “#1”, “best”, or similar proof language.",
  ],
  tone: ["Confident, not apologetic.", "Clear, not technical.", "Craft-forward: show the work; describe decisions briefly."],
};
