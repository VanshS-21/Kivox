import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { faq } from "@/content/pages/faq";

export function FaqPageContent() {
  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-24">
      <Container size="narrow">
        <p className="studio-eyebrow mb-4 text-accent">[ FAQ ]</p>
        <h1 className="studio-h1-headline text-foreground">{faq.title}</h1>

        <p className="mt-4 studio-lede">{faq.intro}</p>

        <div className="mt-8 mb-2 h-px bg-border" />

        <div className="mt-2 mb-8 flex items-center gap-2">
          <span
            className="font-mono text-subtle-foreground"
            style={{
              fontSize: "0.625rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {faq.categories.reduce(
              (sum, category) => sum + category.items.length,
              0,
            )}{" "}
            questions across {faq.categories.length} topics
          </span>
        </div>

        <div className="mt-4">
          <FaqAccordion categories={faq.categories} />
        </div>

        <div className="mt-16 border-t border-border pt-8 sm:mt-20">
          <p className="studio-body text-muted-foreground">
            Didn&apos;t find what you&apos;re looking for?
          </p>
          <Link
            href="/contact"
            prefetch={false}
            className="group mt-3 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
          >
            Get in touch
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </Container>
    </div>
  );
}
