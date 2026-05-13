"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

import { work } from "@/content/pages/work";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { easeOutExpo, easeOutQuint, viewportOnce } from "@/lib/motion";

/* ── Project meta ── */

const projectColors: Record<string, string> = {
  hospital: "var(--project-hospital)",
  cafe: "var(--project-cafe)",
  hotel: "var(--project-hotel)",
  school: "var(--project-school)",
  fitness: "var(--project-fitness)",
};

const projectTags: Record<string, string[]> = {
  hospital: ["STRATEGY", "DESIGN", "DEVELOPMENT"],
  cafe: ["BRANDING", "DESIGN", "DEVELOPMENT"],
  hotel: ["STRATEGY", "DESIGN", "ENGINEERING"],
  school: ["UX RESEARCH", "DESIGN", "DEVELOPMENT"],
  fitness: ["DESIGN", "DEVELOPMENT", "BRANDING"],
};

/* ── Page ── */

export default function WorkPage() {
  const reduce = useReducedMotion();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = useCallback((idx: number | null) => {
    setHoveredIdx(idx);
  }, []);

  const hoveredProject = hoveredIdx !== null ? work.items[hoveredIdx] : null;
  const hoveredColor = hoveredProject
    ? projectColors[hoveredProject.id] || "var(--accent)"
    : "var(--accent)";

  return (
    <div className="bg-background min-h-screen">
      {/* ── Hero header ── */}
      <Section className="pt-32 lg:pt-40 pb-12 lg:pb-16 relative overflow-hidden" spacing="none">
        {/* Ambient glow */}
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: "var(--accent)", opacity: "calc(var(--hero-glow-opacity) * 0.4)" }}
        />

        <Container>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutQuint }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-accent"
              />
              <span className="studio-eyebrow text-accent">[ {work.label} ]</span>
            </div>

            <h1
              className="font-sans font-bold text-foreground mb-6"
              style={{ fontSize: "clamp(2.5rem, 4vw + 1rem, 5rem)", lineHeight: 1.06, letterSpacing: "-0.025em" }}
            >
              Our{" "}
              <em className="font-serif font-normal text-accent" style={{ fontStyle: "italic" }}>
                Showcase.
              </em>
            </h1>

            <p className="studio-body-serif text-muted-foreground max-w-xl">{work.intro}</p>
          </motion.div>
        </Container>

        {/* Decorative divider */}
        <Container>
          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            animate={reduce ? undefined : { scaleX: 1 }}
            transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.5 }}
            className="mt-12 lg:mt-16 h-px bg-border origin-left"
          />
        </Container>
      </Section>

      {/* ── Main content: left entries + right fixed image ── */}
      <div ref={containerRef} className="relative">
        {/* Fixed image preview — desktop only */}
        <div
          className="hidden lg:block fixed top-0 right-0 h-screen pointer-events-none z-30"
          style={{ width: "44%" }}
        >
          <div className="h-full flex items-center justify-center p-8 xl:p-12">
            <AnimatePresence mode="wait">
              {hoveredProject && (
                <motion.div
                  key={hoveredProject.id}
                  initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.94, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: easeOutExpo }}
                  className="relative w-full pointer-events-auto"
                  style={{ aspectRatio: "21 / 9" }}
                >
                  <Link
                    href={hoveredProject.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative w-full h-full rounded-2xl overflow-hidden group"
                  >
                    <Image
                      src={hoveredProject.image}
                      alt={`${hoveredProject.title} — Kivox showcase`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="44vw"
                      priority
                    />

                    {/* Project-color accent glow border */}
                    <div
                      className="absolute inset-0 rounded-2xl ring-1 ring-inset transition-all duration-500"
                      style={{
                        boxShadow: `0 0 60px -10px ${hoveredColor}`,
                        ringColor: `color-mix(in oklch, ${hoveredColor}, transparent 70%)`,
                      }}
                    />

                    {/* Subtle bottom gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                    {/* External link hint on image hover */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-80 transition-opacity duration-300">
                      <span className="inline-flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full text-white text-xs font-mono tracking-wider">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        LIVE
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty state — subtle hint */}
            {hoveredProject === null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-2xl border border-border-soft flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-subtle-foreground">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <p className="studio-tag text-subtle-foreground">Hover a project</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* ── Project entries — left column ── */}
        <Section className="pb-24 lg:pb-32 pt-4 lg:pt-8" spacing="none">
          <Container>
            <div className="lg:w-[52%]">
              {work.items.map((project, idx) => {
                const color = projectColors[project.id] || "var(--accent)";
                const tags = projectTags[project.id] || ["DESIGN", "DEVELOPMENT"];
                const caseStudy = (project as { caseStudy?: string }).caseStudy;
                const num = String(idx + 1).padStart(2, "0");
                const isHovered = hoveredIdx === idx;

                return (
                  <motion.article
                    key={project.id}
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.7, ease: easeOutExpo, delay: idx * 0.08 }}
                    onMouseEnter={() => handleHover(idx)}
                    onMouseLeave={() => handleHover(null)}
                    className="group relative"
                  >
                    {/* ── Entry content ── */}
                    <div className="py-10 lg:py-14">
                      {/* Number + category row */}
                      <div className="flex items-center gap-4 mb-5 lg:mb-6">
                        <motion.span
                          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                          transition={{ duration: 0.3, ease: easeOutExpo }}
                          className="text-lg font-mono font-bold studio-tabular transition-colors duration-300"
                          style={{ color: isHovered ? color : "var(--fg-subtle)" }}
                        >
                          {num}
                        </motion.span>
                        <span className="studio-eyebrow text-muted-foreground transition-colors duration-300"
                          style={{ color: isHovered ? color : undefined }}
                        >
                          {project.label}
                        </span>
                      </div>

                      {/* Title + CTA row */}
                      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-5 lg:mb-6">
                        <motion.h2
                          animate={isHovered && !reduce ? { x: 8 } : { x: 0 }}
                          transition={{ duration: 0.4, ease: easeOutExpo }}
                          className="font-sans font-bold text-foreground transition-colors duration-300"
                          style={{
                            fontSize: "clamp(1.75rem, 2.5vw + 0.5rem, 3rem)",
                            lineHeight: 1.1,
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {project.title.split(" ")[0]}{" "}
                          <em
                            className="font-serif font-normal transition-colors duration-300"
                            style={{
                              fontStyle: "italic",
                              color: isHovered ? color : "var(--accent)",
                            }}
                          >
                            {project.title.split(" ").slice(1).join(" ")}.
                          </em>
                        </motion.h2>

                        {/* CTA — matches home page pill */}
                        <Link
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 shrink-0 w-fit group/cta"
                          style={{
                            borderColor: isHovered
                              ? color
                              : "color-mix(in oklch, var(--accent), transparent 60%)",
                            color: isHovered ? color : "var(--accent)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "var(--accent)";
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.color = "var(--bg-primary)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "transparent";
                            e.currentTarget.style.borderColor = isHovered
                              ? color
                              : "color-mix(in oklch, var(--accent), transparent 60%)";
                            e.currentTarget.style.color = isHovered ? color : "var(--accent)";
                          }}
                        >
                          View Showcase
                          <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                        </Link>
                      </div>

                      {/* Mobile image — shows inline since no hover on touch */}
                      <div className="lg:hidden mb-6">
                        <Link
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block relative rounded-xl overflow-hidden border border-border"
                          style={{ aspectRatio: "21 / 9" }}
                        >
                          <Image
                            src={project.image}
                            alt={`${project.title} — Kivox showcase`}
                            fill
                            className="object-cover"
                            sizes="100vw"
                            priority={idx === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </Link>
                      </div>

                      {/* Description */}
                      <p className="studio-body text-muted-foreground max-w-xl mb-4 lg:mb-5">
                        {project.demonstrates}
                      </p>

                      {/* Service tags */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 studio-tag text-subtle-foreground mb-0">
                        {tags.map((tag, tagIdx) => (
                          <span key={tag} className="flex items-center gap-3">
                            {tagIdx > 0 && <span className="opacity-40">·</span>}
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Case Study */}
                      {caseStudy && (
                        <motion.div
                          initial={reduce ? false : { opacity: 0, y: 16 }}
                          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                          viewport={viewportOnce}
                          transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.15 }}
                          className="mt-8"
                        >
                          <div className="relative pl-5 border-l-2" style={{ borderColor: color }}>
                            <span className="studio-tag text-muted-foreground block mb-2">
                              Case Study
                            </span>
                            <p className="text-[14px] leading-[1.75] text-muted-foreground font-light max-w-lg">
                              {caseStudy}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Divider — animates to project color on hover */}
                    <motion.div
                      className="h-px origin-left"
                      style={{
                        background: isHovered
                          ? `linear-gradient(90deg, ${color}, transparent)`
                          : "var(--border)",
                      }}
                      initial={reduce ? false : { scaleX: 0 }}
                      whileInView={reduce ? undefined : { scaleX: 1 }}
                      viewport={viewportOnce}
                      transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.1 }}
                    />
                  </motion.article>
                );
              })}
            </div>
          </Container>
        </Section>
      </div>
    </div>
  );
}
