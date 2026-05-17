"use client";

import { useCallback, useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  label: string;
  items: FaqItem[];
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
  localIndex,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  localIndex: number;
}) {
  return (
    <div className="border-b border-border">
      <button
        id={`faq-q-${index}`}
        aria-expanded={isOpen}
        aria-controls={`faq-a-${index}`}
        onClick={onToggle}
        className="group flex w-full cursor-pointer items-start gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:py-6"
      >
        <span
          className="studio-tabular mt-[3px] shrink-0 select-none font-mono text-accent transition-opacity duration-300"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.05em",
            opacity: isOpen ? 1 : 0.5,
          }}
          aria-hidden="true"
        >
          {String(localIndex + 1).padStart(2, "0")}
        </span>

        <span
          className={`studio-h4-sans min-w-0 flex-1 break-words leading-snug transition-colors duration-200 ${
            isOpen ? "text-accent" : "text-foreground"
          }`}
        >
          {item.question}
        </span>

        <span
          className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center text-accent transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(315deg)" : "rotate(0deg)" }}
          aria-hidden="true"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="7" y1="2" x2="7" y2="12" />
            <line x1="2" y1="7" x2="12" y2="7" />
          </svg>
        </span>
      </button>

      <div
        id={`faq-a-${index}`}
        role="region"
        aria-labelledby={`faq-q-${index}`}
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="studio-body max-w-[60ch] break-words pb-6 pe-9 ps-10 text-muted-foreground transition-all duration-300"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-4px)",
            }}
          >
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryGroup({
  category,
  globalOffset,
}: {
  category: FaqCategory;
  globalOffset: number;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <div>
      <div className="mb-4 mt-2 flex items-baseline gap-3">
        <h2 className="studio-h3-sans text-foreground">{category.label}</h2>
        <span
          className="select-none font-mono text-subtle-foreground"
          style={{ fontSize: "0.625rem", letterSpacing: "0.05em" }}
        >
          {String(category.items.length).padStart(2, "0")}
        </span>
      </div>

      <div className="border-t border-border">
        {category.items.map((item, idx) => (
          <AccordionItem
            key={item.question}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => handleToggle(idx)}
            index={globalOffset + idx}
            localIndex={idx}
          />
        ))}
      </div>
    </div>
  );
}

export function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const categoryOffsets = categories.map((_, index) =>
    categories
      .slice(0, index)
      .reduce((sum, category) => sum + category.items.length, 0),
  );

  return (
    <div className="space-y-14 sm:space-y-18">
      {categories.map((category, index) => (
        <CategoryGroup
          key={category.label}
          category={category}
          globalOffset={categoryOffsets[index]}
        />
      ))}
    </div>
  );
}
