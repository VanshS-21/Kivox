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
          question: "How do we get started?",
          answer:
            "It starts with a simple conversation. You fill out our form, and we’ll reply within 24 hours to set up a quick 30-minute chat. After we understand what you need, we’ll send you a clear plan and a custom price. We never start work until you are completely comfortable.",
        },
        {
          question: "How do you build a website?",
          answer:
            "We guide you through every step. First we get to know you, then we make a clear plan for your pages. Next we design how everything looks, and finally we build it so it works perfectly. You’ll be able to check in and share your thoughts at every single step.",
        },
        {
          question: "How long does a typical project take?",
          answer:
            "A standard business website usually takes 4 to 6 weeks from our first meeting to going live. Larger custom tools take 8 to 12 weeks. We always agree on a clear timeline before we start any work.",
        },
        {
          question: "Who will I be talking to?",
          answer:
            "You’ll work directly with the people actually building your website. There are no middlemen or confusing hand-offs—just direct, honest communication.",
        },
      ],
    },
    {
      label: "Pricing & Budget",
      items: [
        {
          question: "How much does a website cost?",
          answer:
            "Every business is different, so every project is custom-priced based on exactly what you need. After our first chat, we’ll give you a fixed quote (in Rupees). We never charge by the hour, so you will never get a surprise bill from us.",
        },
        {
          question: "Do I have to pay it all at once?",
          answer:
            "Not at all. We split the payment into easy milestones: a portion to start, a portion when you approve the design, and the final piece only when your website goes live.",
        },
        {
          question: "What if my budget is limited?",
          answer:
            "We can work with your budget by deciding what pieces are most important to build right now, and what can wait for later. We’d rather build something excellent that fits your budget today, than try to rush everything.",
        },
      ],
    },
    {
      label: "How We Build",
      items: [
        {
          question: "Do I need to know anything about coding or technology?",
          answer:
            "Absolutely not! That’s what we are here for. We handle all the complicated technical details behind the scenes. We just need you to be the expert on your own business.",
        },
        {
          question: "Will my website look good on mobile phones?",
          answer:
            "Yes! More than half of your customers will visit from their phones, so we actually design for phones first. Your site will look perfect and be easy to tap and read on any screen size.",
        },
        {
          question: "What if I don't like the first design?",
          answer:
            "We include plenty of time for your feedback. We check in with you at every major step to make sure you love the direction we’re heading. Because we plan so carefully together, there are very rarely any big surprises.",
        },
        {
          question: "Will people be able to find me on Google?",
          answer:
            "Yes. We build every website to be easily found by search engines, making sure it loads fast and uses the right keywords. For ongoing marketing, we can also point you to the right specialists.",
        },
      ],
    },
    {
      label: "After Launch",
      items: [
        {
          question: "Who actually owns the website?",
          answer:
            "You do, 100%. Once the final payment is made, everything belongs to you. There are no hidden licensing fees or tricks to keep you locked in with us.",
        },
        {
          question: "Will you help me if something breaks after it goes live?",
          answer:
            "Yes! We include 30 days of free support after launch to make sure everything runs perfectly. If you want us to keep updating and managing the site for you long-term, we also offer simple monthly plans.",
        },
        {
          question: "What if I need changes later?",
          answer:
            "You can reach out anytime. Small tweaks are usually handled quickly. For larger additions (like new pages or features), we'll just have a quick chat and give you a simple price before we start.",
        },
      ],
    },
  ],
};
