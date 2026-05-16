export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  image: string;
  quote: string;
}

export const team: {
  label: string;
  title: string;
  intro: string;
  members: TeamMember[];
} = {
  label: "The Team",
  title: "Built by People",
  intro:
    "Six people who care about clarity, craft, and shipping work that holds up. No layers, no hand-offs to strangers.",
  members: [
    {
      id: "arjun",
      name: "Arjun Mehta",
      role: "Founder & Strategy",
      focus: "Business clarity, information architecture, client relationships",
      image: "/team/member-1.webp",
      quote: "I believe technology should adapt to your business, not the other way around.",
    },
    {
      id: "priya",
      name: "Priya Sharma",
      role: "Design Lead",
      focus: "Visual systems, typography, brand identity",
      image: "/team/member-2.webp",
      quote: "Good design is obvious. Great design is invisible and effortless.",
    },
    {
      id: "kai",
      name: "Kai Chen",
      role: "Engineering Lead",
      focus: "Frontend architecture, performance, accessibility",
      image: "/team/member-3.webp",
      quote: "Speed and accessibility aren't features—they're the foundation of the web.",
    },
    {
      id: "maya",
      name: "Maya Patel",
      role: "UX & Research",
      focus: "User flows, usability testing, content strategy",
      image: "/team/member-4.webp",
      quote: "We listen to what your customers need, and build exactly that.",
    },
    {
      id: "omar",
      name: "Omar Hassan",
      role: "Full-Stack Developer",
      focus: "Backend systems, integrations, deployment",
      image: "/team/member-5.webp",
      quote: "The best systems are the ones you never have to think about.",
    },
    {
      id: "sara",
      name: "Sara Kim",
      role: "Visual Designer",
      focus: "UI design, motion, interaction details",
      image: "/team/member-6.webp",
      quote: "The details are not the details. They make the design.",
    },
  ],
};
