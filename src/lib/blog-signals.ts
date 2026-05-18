export type ArticleSignal = {
  brief: string;
  question: string;
  situation: string;
};

const articleSignals: Record<string, ArticleSignal> = {
  Design: {
    brief: "First impression",
    question: "Why do visitors trust or leave before reading?",
    situation:
      "Use this when the site feels polished in parts but still loses confidence fast.",
  },
  Strategy: {
    brief: "Studio fit",
    question: "What should a business owner expect from a web studio?",
    situation: "Use this before hiring, scoping, or comparing proposals.",
  },
  SEO: {
    brief: "Launch readiness",
    question: "What should be handled before search engines ever see the site?",
    situation:
      "Use this before launch, especially when SEO has been treated as a later task.",
  },
  "AI & Search": {
    brief: "Search visibility",
    question: "How does AI search change who gets found?",
    situation:
      "Use this when the goal is being referenced, cited, and understood online.",
  },
};

export function getArticleSignal(category: string): ArticleSignal {
  return (
    articleSignals[category] ?? {
      brief: "Studio note",
      question: "What should change before the website asks for trust?",
      situation:
        "Use this when the next decision needs plain language and a practical standard.",
    }
  );
}

export function categoryToId(category: string): string {
  return category
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
