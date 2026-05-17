"use client";

import { useRef, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";
import { fadeUp, scaleIn, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeTestimonials() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || reduce) return;

    let intervalId: number;

    const startAutoScroll = () => {
      intervalId = window.setInterval(() => {
        // Only auto-scroll if it's a horizontal scrolling container (mobile)
        if (container.scrollWidth > container.clientWidth) {
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft >= maxScrollLeft - 10) {
            // Reset to start
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            // Scroll to next snap point
            container.scrollBy({ left: container.clientWidth * 0.75, behavior: 'smooth' });
          }
        }
      }, 1500); // 2.5 seconds interval
    };

    startAutoScroll();

    // Pause on user interaction
    const stopAutoScroll = () => clearInterval(intervalId);
    
    container.addEventListener('touchstart', stopAutoScroll, { passive: true });
    container.addEventListener('touchend', startAutoScroll, { passive: true });
    container.addEventListener('mouseenter', stopAutoScroll);
    container.addEventListener('mouseleave', startAutoScroll);

    return () => {
      clearInterval(intervalId);
      container.removeEventListener('touchstart', stopAutoScroll);
      container.removeEventListener('touchend', startAutoScroll);
      container.removeEventListener('mouseenter', stopAutoScroll);
      container.removeEventListener('mouseleave', startAutoScroll);
    };
  }, [reduce]);

  return (
    <Section ref={sectionRef} spacing="loose" className="bg-background border-t border-border">
      <Container className="max-w-6xl mx-auto">
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="mb-16 md:mb-24 flex flex-col items-center text-center"
        >
          <p className="studio-eyebrow text-accent mb-4">[ Social Proof ]</p>
          <h2 className="studio-h2-editorial">Client Stories</h2>
          <p className="mt-6 max-w-2xl text-muted-foreground studio-body-large">
            Don&apos;t just take our word for it. Here&apos;s what business owners have to say about working with Kivox.
          </p>
        </motion.div>

        <div ref={scrollContainerRef} className="flex overflow-x-auto md:overflow-visible md:grid md:grid-cols-2 snap-x snap-mandatory md:snap-none gap-x-6 gap-y-12 md:gap-x-12 lg:gap-x-24 lg:gap-y-24 pt-12 pb-8 md:pt-0 md:pb-0 -mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className={`w-[85vw] sm:w-[60vw] md:w-auto shrink-0 snap-center snap-always ${index === 2 ? 'md:col-span-2' : ''}`}>
              <TestimonialCard testimonial={testimonial} index={index} reduce={reduce} sectionRef={sectionRef} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

import { memo } from "react";

const TestimonialCard = memo(function TestimonialCard({ testimonial, index, reduce }: { testimonial: { id: string; quote: string; author: string; role: string; company: string; }; index: number; reduce: boolean | null; sectionRef: React.RefObject<HTMLElement | null> }) {
  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ ...transitionDefault, delay: reduce ? 0 : index * 0.1 }}
      className={`flex flex-col group h-full ${index === 2 ? 'md:items-center md:text-center' : ''}`}
    >
      <div className="mb-8 relative">
        {/* Minimalist static quote mark */}
        <div 
          className={`absolute -top-6 text-accent/10 font-serif text-8xl leading-none select-none pointer-events-none transition-colors duration-500 group-hover:text-accent/20 ${index === 2 ? 'md:left-1/2 md:-translate-x-1/2 -left-4' : '-left-4'}`}
        >
          &quot;
        </div>
        <p className={`studio-body-serif font-light leading-relaxed text-foreground relative z-10 break-words min-w-0 ${index === 2 ? 'md:max-w-3xl mx-auto' : ''}`}>
          {testimonial.quote}
        </p>
      </div>
      
      <div className={`mt-auto transition-colors duration-500 min-w-0 ${index === 2 ? 'pt-4 border-t border-accent/30 group-hover:border-accent' : 'ps-4 border-s-2 border-accent/30 group-hover:border-accent'}`}>
        <div className="font-semibold text-foreground tracking-wide break-words">
          {testimonial.author}
        </div>
        <div className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest opacity-80 break-words">
          {testimonial.role}, {testimonial.company}
        </div>
      </div>
    </motion.div>
  );
});
