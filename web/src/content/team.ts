export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  image: string;
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
      image: "/team/member-1.png",
    },
    {
      id: "priya",
      name: "Priya Sharma",
      role: "Design Lead",
      focus: "Visual systems, typography, brand identity",
      image: "/team/member-2.png",
    },
    {
      id: "kai",
      name: "Kai Chen",
      role: "Engineering Lead",
      focus: "Frontend architecture, performance, accessibility",
      image: "/team/member-3.png",
    },
    {
      id: "maya",
      name: "Maya Patel",
      role: "UX & Research",
      focus: "User flows, usability testing, content strategy",
      image: "/team/member-4.png",
    },
    {
      id: "omar",
      name: "Omar Hassan",
      role: "Full-Stack Developer",
      focus: "Backend systems, integrations, deployment",
      image: "/team/member-5.png",
    },
    {
      id: "sara",
      name: "Sara Kim",
      role: "Visual Designer",
      focus: "UI design, motion, interaction details",
      image: "/team/member-6.png",
    },
  ],
};
