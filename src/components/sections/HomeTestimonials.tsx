"use client";

import { memo, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

const MOBILE_AUTOSLIDE_MS = 2600;

export function HomeTestimonials() {
  const reduce = useReducedMotion();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateIsMobile = () => setIsMobile(media.matches);

    updateIsMobile();
    media.addEventListener("change", updateIsMobile);

    return () => media.removeEventListener("change", updateIsMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || reduce) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, MOBILE_AUTOSLIDE_MS);

    return () => window.clearInterval(intervalId);
  }, [isMobile, reduce]);

  useEffect(() => {
    if (!isMobile) return;

    const scroller = scrollerRef.current;
    const activeCard = scroller?.querySelector<HTMLElement>(
      `[data-testimonial-index="${activeIndex}"]`,
    );

    if (!scroller || !activeCard) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const activeRect = activeCard.getBoundingClientRect();
    const centeredLeft =
      scroller.scrollLeft +
      activeRect.left -
      scrollerRect.left -
      (scrollerRect.width - activeRect.width) / 2;

    scroller.scrollTo({
      behavior: reduce ? "auto" : "smooth",
      left: centeredLeft,
    });
  }, [activeIndex, isMobile, reduce]);

  return (
    <Section spacing="loose" className="bg-background border-t border-border">
      <Container className="max-w-6xl mx-auto">
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <p className="studio-eyebrow text-accent mb-4">[ What People Say ]</p>
          <h2 className="studio-h2-editorial">Trust comes from the work.</h2>
          <p className="mt-6 max-w-2xl text-muted-foreground studio-body-large">
            Real notes from business owners who needed clearer websites, calmer
            launches, and a studio that speaks plainly.
          </p>
        </motion.div>

        <div
          data-native-scroll
          ref={scrollerRef}
          aria-label="Customer testimonials"
          className="flex overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 snap-x snap-mandatory md:snap-none gap-x-6 gap-y-12 md:gap-x-12 lg:gap-x-24 lg:gap-y-24 pt-12 pb-8 md:pt-0 md:pb-0 -mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              data-testimonial-index={index}
              className={`w-[85vw] sm:w-[60vw] md:w-auto shrink-0 snap-center snap-always ${index === 2 ? "md:col-span-2" : ""}`}
            >
              <TestimonialCard
                testimonial={testimonial}
                index={index}
                reduce={reduce}
              />
            </div>
          ))}
        </div>

        <div
          className="mt-2 flex items-center justify-center gap-2 md:hidden"
          role="tablist"
          aria-label="Choose testimonial"
        >
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              role="tab"
              aria-label={`Show testimonial from ${testimonial.author}`}
              aria-selected={activeIndex === index}
              className="grid min-h-10 min-w-10 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setActiveIndex(index)}
            >
              <span
                aria-hidden="true"
                className="block h-2 rounded-full transition-all duration-300 motion-reduce:transition-none"
                style={{
                  backgroundColor:
                    activeIndex === index
                      ? "var(--accent)"
                      : "var(--border-strong)",
                  width: activeIndex === index ? "1.75rem" : "0.5rem",
                }}
              />
            </button>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  index,
  reduce,
}: {
  testimonial: {
    id: string;
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  index: number;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ ...transitionDefault, delay: reduce ? 0 : index * 0.1 }}
      className={`flex flex-col group h-full ${index === 2 ? "md:items-center md:text-center" : ""}`}
    >
      <div className="mb-8 relative">
        {/* Minimalist static quote mark */}
        <div
          className={`absolute -top-6 text-accent/20 font-serif text-8xl leading-none select-none pointer-events-none transition-colors duration-500 group-hover:text-accent/40 ${index === 2 ? "md:left-1/2 md:-translate-x-1/2 -left-4" : "-left-4"}`}
        >
          &quot;
        </div>
        <p
          className={`studio-body-serif font-light leading-relaxed text-foreground relative z-10 break-words min-w-0 ${index === 2 ? "md:max-w-3xl mx-auto" : ""}`}
        >
          {testimonial.quote}
        </p>
      </div>

      <div
        className={`mt-auto transition-colors duration-500 min-w-0 pt-4 border-t border-accent/30 group-hover:border-accent ${index === 2 ? "md:text-center" : ""}`}
      >
        <div className="font-semibold text-foreground tracking-wide break-words">
          {testimonial.author}
        </div>
        <div className="studio-tag mt-1 break-words text-muted-foreground opacity-80">
          {testimonial.role}, {testimonial.company}
        </div>
      </div>
    </motion.div>
  );
});
