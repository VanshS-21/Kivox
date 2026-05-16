"use client";

import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/content/testimonials";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeTestimonials() {
  const reduce = useReducedMotion();

  return (
    <Section spacing="loose" className="bg-primary">
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
            <motion.div
              key={testimonial.id}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{ ...transitionDefault, delay: reduce ? 0 : index * 0.1 }}
              className={`flex flex-col group ${index === 2 ? 'md:col-span-2 md:items-center md:text-center' : ''}`}
            >
              <div className="mb-8 relative">
                {/* Minimalist quote mark */}
                <div className={`absolute -top-6 text-accent/10 font-serif text-8xl leading-none select-none pointer-events-none transition-colors duration-500 group-hover:text-accent/20 ${index === 2 ? 'left-1/2 -translate-x-1/2' : '-left-4'}`}>
                  "
                </div>
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
          ))}
        </div>
      </Container>
    </Section>
  );
}
