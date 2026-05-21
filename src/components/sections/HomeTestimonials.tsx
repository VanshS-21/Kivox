"use client";

import { memo, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeTestimonials() {
  const reduce = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Breakpoint: 1024px is Tailwind's 'lg'
    const media = window.matchMedia("(max-width: 1023px)");
    const updateIsMobile = () => setIsMobile(media.matches);

    updateIsMobile();
    media.addEventListener("change", updateIsMobile);

    return () => media.removeEventListener("change", updateIsMobile);
  }, []);

  const maxIndex = isMobile ? testimonials.length - 1 : testimonials.length - 2;

  // Sync index boundary on resize
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [isMobile, maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const handleDragEnd = (event: any, info: any) => {
    if (reduce) return;
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  return (
    <Section spacing="loose" className="bg-background border-t border-border overflow-hidden">
      <Container className="max-w-6xl mx-auto">
        {/* --- Header & Controls Row --- */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16 gap-8">
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={fadeUp}
            transition={transitionDefault}
            className="flex-1"
          >
            <p className="studio-eyebrow text-accent mb-4">[ What People Say ]</p>
            <h2 className="studio-h2-editorial text-foreground">
              Trust comes from the{" "}
              <em className="font-serif italic text-accent" style={{ fontStyle: "italic" }}>
                work.
              </em>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground studio-body-large">
              Real notes from business owners who needed clearer websites, calmer
              launches, and a studio that speaks plainly.
            </p>
          </motion.div>

          {/* Slider Pagination & Arrow Navigation */}
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.1 }}
            className="flex items-center gap-6 shrink-0 self-start md:self-end"
          >
            {/* Pagination Counter */}
            <div className="studio-tabular font-mono text-sm tracking-widest text-muted-foreground select-none">
              <span className="text-accent font-semibold">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="mx-2 opacity-30">/</span>
              <span>
                {String(maxIndex + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-11 h-11 rounded-full border border-border-strong flex items-center justify-center text-foreground hover:text-accent hover:border-accent/40 hover:shadow-hover disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-foreground disabled:hover:border-border-strong disabled:hover:shadow-none transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              </button>
              <button
                type="button"
                disabled={currentIndex >= maxIndex}
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-11 h-11 rounded-full border border-border-strong flex items-center justify-center text-foreground hover:text-accent hover:border-accent/40 hover:shadow-hover disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-foreground disabled:hover:border-border-strong disabled:hover:shadow-none transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- Testimonials Sliding Stage --- */}
        <div className="relative overflow-visible">
          <div className="overflow-hidden -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-4 -my-4">
            <motion.div
              drag={isMobile && !reduce ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              animate={{
                x: isMobile
                  ? `calc(-${currentIndex} * (100% + 24px))`
                  : `calc(-${currentIndex} * (50% + 16px))`,
              }}
              transition={reduce ? { duration: 0 } : transitionDefault}
              className="flex gap-6 lg:gap-8 cursor-grab active:cursor-grabbing select-none"
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="w-full lg:w-[calc(50%-16px)] shrink-0 flex-grow-0"
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    index={index}
                    reduce={reduce}
                  />
                </div>
              ))}
            </motion.div>
          </div>
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
    avatar: string;
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
      transition={{ ...transitionDefault, delay: reduce ? 0 : index * 0.05 }}
      className="studio-surface studio-surface--noise p-8 md:p-10 flex flex-col justify-between h-full group hover:shadow-hover hover:border-accent/40 transition-all duration-500 select-none"
    >
      <div className="mb-8 relative z-10">
        {/* Quote Mark Watermark */}
        <div className="absolute -top-6 -left-4 text-accent/15 font-serif text-8xl leading-none select-none pointer-events-none transition-colors duration-500 group-hover:text-accent/30 z-0">
          &quot;
        </div>
        <p className="studio-body-serif font-light italic leading-relaxed text-foreground relative z-10 break-words min-w-0">
          {testimonial.quote}
        </p>
      </div>

      {/* Author Footer Info */}
      <div className="mt-auto pt-6 border-t border-accent/20 flex items-center gap-4 relative z-10">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-border-strong shrink-0 relative">
          <Image
            src={testimonial.avatar}
            alt={`Headshot of ${testimonial.author}`}
            fill
            sizes="48px"
            className="object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>
        <div className="min-w-0">
          <h3 className="font-sans font-semibold text-foreground tracking-wide break-words text-base leading-snug">
            {testimonial.author}
          </h3>
          <p className="font-body text-xs text-muted-foreground mt-0.5 break-words">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
      </div>
    </motion.div>
  );
});
