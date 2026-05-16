"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, useReducedMotion, useInView } from "motion/react";

import { easeOutExpo, viewportOnce, fadeUp } from "@/lib/motion";

/* ─── Types ─── */
interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  label: string;
  items: FaqItem[];
}

/* ─── Single Accordion Row ─── */
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
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={fadeUp}
      transition={{ duration: 0.5, ease: easeOutExpo }}
      className="border-b border-border"
    >
      <button
        id={`faq-q-${index}`}
        aria-expanded={isOpen}
        aria-controls={`faq-a-${index}`}
        onClick={onToggle}
        className="group w-full text-left py-5 sm:py-6 flex items-start gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
      >
        {/* Numbered index — mono, amber, tabular */}
        <span
          className="studio-tabular font-mono text-accent shrink-0 mt-[3px] select-none"
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.05em",
            opacity: isOpen ? 1 : 0.5,
            transition: reduce
              ? "none"
              : "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
          aria-hidden="true"
        >
          {String(localIndex + 1).padStart(2, "0")}
        </span>

        {/* Question text */}
        <span
          className="flex-1 studio-h4-sans text-foreground leading-snug"
          style={{
            color: isOpen ? "var(--accent)" : undefined,
            transition: reduce
              ? "none"
              : "color 250ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {item.question}
        </span>

        {/* Expand indicator — plus rotates to X */}
        <span
          className="mt-1 flex-shrink-0 w-5 h-5 flex items-center justify-center text-accent"
          style={{
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: reduce
              ? "none"
              : "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
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

      {/* Answer panel — CSS grid-rows transition for smooth height */}
      <div
        id={`faq-a-${index}`}
        role="region"
        aria-labelledby={`faq-q-${index}`}
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: reduce
            ? "none"
            : "grid-template-rows 500ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="overflow-hidden min-h-0">
          <div
            className="pb-6 pl-10 pr-9 studio-body text-muted-foreground max-w-[60ch]"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(-4px)",
              transition: reduce
                ? "none"
                : isOpen
                  ? "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) 100ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) 100ms"
                  : "opacity 200ms ease, transform 200ms ease",
            }}
          >
            {item.answer}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Category Group ─── */
function CategoryGroup({
  category,
  globalOffset,
}: {
  category: FaqCategory;
  globalOffset: number;
}) {
  const reduce = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px -20% 0px" });

  useEffect(() => {
    if (!isInView) {
      setOpenIndex(null);
    }
  }, [isInView]);

  const handleToggle = useCallback((idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <motion.div
      ref={containerRef}
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={viewportOnce}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.06,
            delayChildren: 0.12,
          },
        },
      }}
    >
      {/* Category heading with question count */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.5, ease: easeOutExpo }}
        className="flex items-baseline gap-3 mb-4 mt-2"
      >
        <h2 className="studio-h3-sans text-foreground">
          {category.label}
        </h2>
        <span
          className="font-mono text-subtle-foreground select-none"
          style={{ fontSize: "0.625rem", letterSpacing: "0.05em" }}
        >
          {String(category.items.length).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Items — staggered entrance */}
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
    </motion.div>
  );
}

/* ─── Main Export ─── */
export function FaqAccordion({ categories }: { categories: FaqCategory[] }) {
  const categoryOffsets = categories.map((_, index) =>
    categories
      .slice(0, index)
      .reduce((sum, category) => sum + category.items.length, 0),
  );

  return (
    <div className="space-y-14 sm:space-y-18">
      {categories.map((category, index) => {
        return (
          <CategoryGroup
            key={category.label}
            category={category}
            globalOffset={categoryOffsets[index]}
          />
        );
      })}
    </div>
  );
}
