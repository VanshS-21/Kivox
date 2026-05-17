"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";
import { fadeUp, scaleIn, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeTestimonials() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <Section ref={sectionRef} spacing="loose" className="bg-background">
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
            Don't just take our word for it. Here's what business owners have to say about working with Kivox.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-16 md:gap-x-12 lg:gap-x-24 lg:gap-y-24">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} reduce={reduce} sectionRef={sectionRef} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TestimonialCard({ testimonial, index, reduce, sectionRef }: { testimonial: any; index: number; reduce: boolean | null; sectionRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Staggered parallax based on index
  const rawY = useTransform(scrollYProgress, [0, 1], [0, index === 2 ? -20 : -40 + (index * 15)]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      initial={reduce ? false : "hidden"}
      whileInView={reduce ? undefined : "show"}
      viewport={viewportOnce}
      variants={fadeUp}
      transition={{ ...transitionDefault, delay: reduce ? 0 : index * 0.1 }}
      style={{ y: reduce ? 0 : y }}
      className={`flex flex-col group ${index === 2 ? 'md:col-span-2 md:items-center md:text-center' : ''}`}
    >
      <div className="mb-8 relative">
        {/* Minimalist quote mark with ambient float */}
        <motion.div 
          variants={scaleIn}
          animate={reduce ? undefined : { rotate: [-5, 5, -5], y: [0, -8, 0] }}
          transition={reduce ? { duration: 0 } : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
          whileHover={reduce ? undefined : { rotate: 15, scale: 1.3, y: 0, transition: { type: "spring", stiffness: 300, damping: 10 } }}
          whileTap={reduce ? undefined : { rotate: 15, scale: 1.1, y: 0, transition: { type: "spring", stiffness: 300, damping: 10 } }}
          className={`absolute -top-6 text-accent/10 font-serif text-8xl leading-none select-none pointer-events-auto transition-colors duration-500 group-hover:text-accent/20 cursor-default ${index === 2 ? 'left-1/2 -translate-x-1/2' : '-left-4'}`}
        >
          "
        </motion.div>
        <p className={`studio-body-serif font-light leading-relaxed text-foreground relative z-10 ${index === 2 ? 'md:max-w-3xl mx-auto' : ''}`}>
          {testimonial.quote}
        </p>
      </div>
      
      <div className={`mt-auto transition-colors duration-500 ${index === 2 ? 'pt-4 border-t border-accent/30 group-hover:border-accent' : 'pl-4 border-l-2 border-accent/30 group-hover:border-accent'}`}>
        <div className="font-semibold text-foreground tracking-wide">
          {testimonial.author}
        </div>
        <div className="text-sm text-muted-foreground mt-1 font-mono uppercase tracking-widest opacity-80">
          {testimonial.role}, {testimonial.company}
        </div>
      </div>
    </motion.div>
  );
}
