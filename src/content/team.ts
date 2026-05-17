export interface TeamMember {
  id: string;
  name: string;
  role: string;
  focus: string;
  image: string;
  quote: string;
  objectPosition?: string;
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
      id: "ali-sarim",
      name: "Ali Sarim",
      role: "Founder & Tech lead",
      focus: "Business clarity, information architecture, client relationships",
      image: "/team/AliSarim2.jpeg",
      quote: "My job is to make sure the technology we build truly serves the business — not the other way around.",
      objectPosition: "center -25%",
    },
    {
      id: "vansh-sahu",
      name: "Vansh Sahu",
      role: "Full Stack Developer, Ui/Ux",
      focus: "Visual systems, typography, brand identity",
      image: "/team/VanshSahu.png",
      quote: "A product should feel as good as it looks. I work where code meets craft to make that real.",
      objectPosition: "center 10%",
    },
    {
      id: "roushan-gupta",
      name: "Roushan Gupta",
      role: "AI & App Development",
      focus: "Frontend architecture, performance, accessibility",
      image: "/team/RoushanGupta.png",
      quote: "AI is a tool, not magic. My job is to find where it actually makes things simpler for real people.",
      objectPosition: "center 60%",
    },
    {
      id: "manish-kumar",
      name: "Manish Kumar Jha",
      role: "Operation & Marketing",
      focus: "User flows, usability testing, content strategy",
      image: "/team/ManishKumarJha.png",
      quote: "Good operations are invisible — when they work, the team just flows and clients feel it.",
      objectPosition: "center 7%",
    },
    {
      id: "sacchidanand-pandey",
      name: "Sacchidanand Pandey",
      role: "R&D, Ui/Ux",
      focus: "Backend systems, integrations, deployment",
      image: "/team/SachidanandPandey.png",
      quote: "I explore what's possible so the team can ship what's right. Research only matters when it leads somewhere.",
      objectPosition: "center 68%",
    },
    {
      id: "vivek-kumar",
      name: "Vivek Kumar Roy",
      role: "Full Stack Developer",
      focus: "UI design, motion, interaction details",
      image: "/team/VivekKumarRoy2.png",
      quote: "Clean code and a working product are the same goal. I take pride in shipping things that hold up.",
      objectPosition: "center",
    },
  ],
};
