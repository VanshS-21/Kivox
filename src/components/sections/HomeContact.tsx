"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { home } from "@/content/pages/home";
import { brand } from "@/content/brand";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { easeOutExpo, easeOutQuint, viewportOnce } from "@/lib/motion";

/** Magnetic button that shifts toward cursor */
function MagneticCTA({
  href,
  children,
  reduce,
}: {
  href: string;
  children: React.ReactNode;
  reduce: boolean | null;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduce) return;
      const btn = buttonRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.2;
      const dy = (e.clientY - cy) * 0.2;
      offsetRef.current = { x: dx, y: dy };
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
      // Dynamic glow follows displacement
      btn.style.boxShadow = `${dx * 0.3}px ${dy * 0.3 + 8}px 30px var(--accent-glow)`;
    },
    [reduce]
  );

  const handleMouseLeave = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px)";
    btn.style.boxShadow = "";
    setIsHovered(false);
  }, []);

  const handleMouseDown = useCallback(() => setIsPressed(true), []);
  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
    // Snap-back animation
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transition = "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)";
    btn.style.transform = "translate(0px, 0px) scale(1.02)";
    setTimeout(() => {
      if (btn) {
        btn.style.transform = "translate(0px, 0px) scale(1)";
        btn.style.transition = "";
      }
    }, 200);
  }, []);

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className="inline-flex items-center gap-3 px-10 py-5 bg-accent text-accent-ink rounded-full text-base font-semibold tracking-tight transition-all duration-300"
      style={{
        transitionProperty: "background-color, color, border-color, scale",
        transform: isPressed ? "scale(0.96)" : undefined,
      }}
    >
      {children}
    </Link>
  );
}

/**
 * Magnetic field overlay — content elements drift microscopically
 * toward the cursor, creating a gravitational pull across the section.
 */
function useMagneticField(reduce: boolean | null) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    function handleMouseMove(e: MouseEvent) {
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      targetRef.current = { x: dx * 6, y: dy * 4 };
    }

    function handleMouseLeave() {
      targetRef.current = { x: 0, y: 0 };
    }

    function tick() {
      if (!isVisibleRef.current) return;

      const curr = currentRef.current;
      const tgt = targetRef.current;
      curr.x += (tgt.x - curr.x) * 0.08;
      curr.y += (tgt.y - curr.y) * 0.08;

      if (content) {
        content.style.transform = `translate(${curr.x}px, ${curr.y}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    // Only run the rAF loop when the section is visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(section);

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, [reduce]);

  return { sectionRef, contentRef };
}

export function HomeContact() {
  const reduce = useReducedMotion();
  const { sectionRef, contentRef } = useMagneticField(reduce);

  return (
    <div ref={sectionRef}>
      <Section id="contact" className="relative pt-[60px] md:pt-[80px] lg:pt-[100px] pb-[40px] md:pb-[60px] lg:pb-[80px] overflow-hidden bg-background border-t border-border/40">
        {/* Ambient amber glow */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.45, 0.65, 0.45],
                  scale: [1, 1.05, 1],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[15%] left-[15%] w-[180px] md:w-[280px] lg:w-[520px] h-[180px] md:h-[280px] lg:h-[520px] rounded-full blur-[60px] md:blur-[80px] lg:blur-[150px] pointer-events-none"
          style={{ background: 'var(--accent)', opacity: 'calc(var(--hero-glow-opacity) * 0.65)' }}
        />
        {/* Rose counterpoint */}
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.18, 0.28, 0.18],
                  scale: [1, 1.08, 1],
                }
          }
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1, // Offset timing
          }}
          className="absolute bottom-[20%] right-[15%] w-[120px] md:w-[200px] lg:w-[380px] h-[120px] md:h-[200px] lg:h-[380px] rounded-full blur-[50px] md:blur-[70px] lg:blur-[120px] pointer-events-none"
          style={{ background: 'var(--accent-rose)', opacity: 'calc(var(--hero-glow-opacity) * 0.28)' }}
        />

        <Container className="relative z-10">
          {/* Content with magnetic drift */}
          <div
            ref={contentRef}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center"
            style={{
              transition: "transform 0.1s linear",
            }}
          >
            {/* Left side: Heading and body */}
            <div className="flex flex-col items-start text-left">
              <motion.h2
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.8, ease: easeOutQuint, delay: 0.05 }}
                className="studio-h1-headline text-foreground mb-6"
              >
                Ready to build
                <br />
                something{" "}
                <em className="font-serif italic text-accent" style={{ fontStyle: "italic" }}>
                  exceptional?
                </em>
              </motion.h2>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.15 }}
                className="studio-body-serif text-muted-foreground max-w-md mb-8 lg:mb-12"
              >
                {home.contact.line}
              </motion.p>
            </div>

            {/* Right side: Magnetic CTA and link */}
            <div className="flex flex-col items-start lg:items-end text-left lg:text-right">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.25 }}
                className="mb-8"
              >
                <MagneticCTA href="/contact" reduce={reduce}>
                  Book a Free Call
                  <motion.span
                    className="text-base inline-block"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  >
                    →
                  </motion.span>
                </MagneticCTA>
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                whileInView={reduce ? undefined : { opacity: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.4 }}
              >
                <span className="block text-base text-muted-foreground mb-1">or reach us directly at</span>
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="text-lg md:text-xl text-accent hover:underline underline-offset-4 transition-colors font-medium"
                >
                  {brand.contact.email}
                </a>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
