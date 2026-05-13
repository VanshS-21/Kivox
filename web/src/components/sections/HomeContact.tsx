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
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    [reduce]
  );

  const handleMouseLeave = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;
    btn.style.transform = "translate(0px, 0px)";
  }, []);

  return (
    <Link
      ref={buttonRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-ink rounded-xl text-sm font-semibold tracking-tight hover:scale-105 hover:shadow-amber-glow transition-all duration-300"
      style={{ transitionProperty: "background-color, color, box-shadow, border-color, transform, scale" }}
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
  const [fieldOffset, setFieldOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    const section = sectionRef.current;
    if (!section) return;

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
      const curr = currentRef.current;
      const tgt = targetRef.current;
      curr.x += (tgt.x - curr.x) * 0.08;
      curr.y += (tgt.y - curr.y) * 0.08;

      if (Math.abs(curr.x - fieldOffset.x) > 0.1 || Math.abs(curr.y - fieldOffset.y) > 0.1) {
        setFieldOffset({ x: curr.x, y: curr.y });
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    section.addEventListener("mousemove", handleMouseMove, { passive: true });
    section.addEventListener("mouseleave", handleMouseLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  return { sectionRef, fieldOffset };
}

export function HomeContact() {
  const reduce = useReducedMotion();
  const { sectionRef, fieldOffset } = useMagneticField(reduce);

  return (
    <div ref={sectionRef}>
      <Section id="contact" className="relative pt-[140px] lg:pt-[200px] pb-[120px] lg:pb-[160px] overflow-hidden bg-background">
        {/* Ambient amber glow — organic, no grid */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 40, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[15%] left-[15%] w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none"
          style={{ background: 'var(--accent)', opacity: 'calc(var(--hero-glow-opacity) * 0.7)' }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -30, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[15%] w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none"
          style={{ background: 'var(--accent-rose)', opacity: 'calc(var(--hero-glow-opacity) * 0.4)' }}
        />

        <Container className="relative z-10">
          {/* Content with magnetic drift */}
          <div
            className="max-w-4xl mx-auto text-center"
            style={{
              transform: reduce ? undefined : `translate(${fieldOffset.x}px, ${fieldOffset.y}px)`,
              transition: "transform 0.1s linear",
            }}
          >
            {/* Section label */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="inline-flex items-center gap-3 mb-10"
            >
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-accent"
              />
              <span className="studio-eyebrow text-accent">
                [ Get In Touch ]
              </span>
            </motion.div>

            {/* Headline — large, centered, clear */}
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: easeOutQuint, delay: 0.05 }}
              className="font-sans font-bold text-foreground mb-8"
              style={{ fontSize: 'clamp(2.5rem, 4vw + 1rem, 5rem)', lineHeight: 1.06, letterSpacing: '-0.025em' }}
            >
              Ready to build
              <br />
              something{" "}
              <em className="font-serif font-normal text-accent" style={{ fontStyle: "italic" }}>
                exceptional?
              </em>
            </motion.h2>

            {/* Body text */}
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.15 }}
              className="studio-body-serif text-muted-foreground max-w-xl mx-auto mb-12"
            >
              {home.contact.line}
            </motion.p>

            {/* Primary CTA — direct to contact form */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.25 }}
              className="mb-16"
            >
              <MagneticCTA href="/contact" reduce={reduce}>
                Start a project
                <span className="text-base">→</span>
              </MagneticCTA>
            </motion.div>
          </div>

          {/* Contact info — clean horizontal strip, no cards */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.3 }}
            className="max-w-3xl mx-auto"
            style={{
              transform: reduce ? undefined : `translate(${-fieldOffset.x * 0.3}px, ${-fieldOffset.y * 0.3}px)`,
            }}
          >
            {/* Divider */}
            <div className="h-px bg-border mb-10" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <span className="studio-eyebrow text-muted-foreground text-[11px]">Email</span>
                <Link
                  href={`mailto:${brand.contact.email}`}
                  className="text-foreground font-medium hover:text-accent transition-colors"
                >
                  {brand.contact.email}
                </Link>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <span className="studio-eyebrow text-muted-foreground text-[11px]">Based in</span>
                <div className="flex items-center gap-2.5">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'oklch(0.72 0.17 155)' }}
                  />
                  <span className="text-foreground font-medium">Bengaluru, India</span>
                </div>
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-1.5">
                <span className="studio-eyebrow text-muted-foreground text-[11px]">Connect</span>
                <div className="flex items-center gap-4">
                  <Link
                    href={brand.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-medium hover:text-accent transition-colors text-sm"
                  >
                    LinkedIn
                  </Link>
                  <span className="text-border-strong">·</span>
                  <Link
                    href={brand.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground font-medium hover:text-accent transition-colors text-sm"
                  >
                    Instagram
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
