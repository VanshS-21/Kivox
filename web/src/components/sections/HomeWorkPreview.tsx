"use client";

import { useRef } from "react";
import Link from "next/link";
import { type MotionValue, motion, useScroll, useTransform, useReducedMotion } from "motion/react";

import { work } from "@/content/pages/work";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

export function HomeWorkPreview() {
  const reduce = useReducedMotion();
  const featuredWork = work.items.slice(0, 3);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map vertical scroll progress to horizontal translation
  // Each project is 100vw, so total translation = (N-1) * 100vw
  const totalPanels = featuredWork.length;
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0vw", `-${(totalPanels - 1) * 100}vw`]
  );

  // Track current project index for the counter
  const progressNum = useTransform(scrollYProgress, [0, 1], [1, totalPanels]);

  // Service tags per project type
  const projectTags: Record<string, string[]> = {
    hospital: ["STRATEGY", "DESIGN", "DEVELOPMENT"],
    cafe: ["BRANDING", "DESIGN", "DEVELOPMENT"],
    hotel: ["STRATEGY", "DESIGN", "ENGINEERING"],
    school: ["UX RESEARCH", "DESIGN", "DEVELOPMENT"],
    fitness: ["DESIGN", "DEVELOPMENT", "BRANDING"],
  };

  // Project-specific accent colors (CSS custom properties)
  const projectColors: Record<string, string> = {
    hospital: "var(--project-hospital)",
    cafe: "var(--project-cafe)",
    hotel: "var(--project-hotel)",
    school: "var(--project-school)",
    fitness: "var(--project-fitness)",
  };

  return (
    <div
      ref={containerRef}
      className="relative bg-background"
      // Height creates the scroll runway: N panels × 100vh
      style={{ height: `${totalPanels * 100}vh` }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Section label — top left */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="absolute top-28 left-6 lg:left-12 z-20 inline-flex items-center gap-3"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-accent" />
          <span className="studio-eyebrow text-subtle-foreground">
            Latest Projects
          </span>
        </motion.div>

        {/* Counter — top right */}
        <div className="absolute top-28 right-6 lg:right-12 z-20 flex items-center gap-2">
          <motion.span className="text-sm font-mono text-accent studio-tabular">
            {reduce ? "01" : <Counter value={progressNum} />}
          </motion.span>
          <span className="text-sm font-mono text-subtle-foreground">/</span>
          <span className="text-sm font-mono text-subtle-foreground studio-tabular">
            {String(totalPanels).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x }}
          className="flex h-full"
        >
          {featuredWork.map((project, idx) => (
            <div
              key={project.id}
              className="min-w-[100vw] h-full flex items-center"
            >
              <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
                {/* Left — project info */}
                <div className="lg:col-span-5 space-y-7">
                  {/* Chapter label — project-colored */}
                  <div
                    className="studio-eyebrow"
                    style={{ color: projectColors[project.id] || "var(--accent)" }}
                  >
                    Chapter · {project.title}
                  </div>

                  {/* Project headline — pushed scale */}
                  <h3 className="font-sans font-bold text-foreground" style={{ fontSize: 'clamp(1.75rem, 2vw + 0.75rem, 2.75rem)', lineHeight: 1.12, letterSpacing: '-0.015em' }}>
                    {project.title.split(" ")[0]}{" "}
                    <em
                      className="font-serif font-normal text-accent"
                      style={{ fontStyle: "italic" }}
                    >
                      {project.title.split(" ").slice(1).join(" ")}.
                    </em>
                  </h3>

                  {/* Description */}
                  <p className="studio-body text-muted-foreground max-w-md">
                    {project.demonstrates}
                  </p>

                  {/* Service tags */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 studio-tag text-subtle-foreground">
                    {(projectTags[project.id] || ["DESIGN", "DEVELOPMENT"]).map(
                      (tag, tagIdx) => (
                        <span key={tag} className="flex items-center gap-3">
                          {tagIdx > 0 && <span>·</span>}
                          {tag}
                        </span>
                      )
                    )}
                  </div>

                  {/* View project link — bolder expanding line */}
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-4 studio-eyebrow text-accent group"
                  >
                    View Project
                    <span className="inline-block w-10 h-px bg-accent group-hover:w-20 transition-all duration-400 ease-out" />
                  </Link>
                </div>

                {/* Right — project visual placeholder — bolder treatment */}
                <div className="lg:col-span-7 relative">
                  <div className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-elevated border border-border group">
                    {/* Gradient fill with stronger project color presence */}
                    <div className="absolute inset-0 bg-gradient-to-br from-elevated via-surface to-elevated" />
                    <div
                      className="absolute inset-0 opacity-[0.10]"
                      style={{ background: `radial-gradient(ellipse at 65% 55%, ${projectColors[project.id] || "var(--accent)"}, transparent 65%)` }}
                    />
                    {/* Secondary glow for depth */}
                    <div
                      className="absolute inset-0 opacity-[0.04]"
                      style={{ background: `radial-gradient(ellipse at 25% 80%, var(--accent-rose), transparent 50%)` }}
                    />

                    {/* Project number watermark — larger, more confident presence */}
                    <div
                      className="absolute bottom-4 right-6 lg:bottom-6 lg:right-8 font-bold leading-none font-mono select-none studio-tabular opacity-[0.10]"
                      style={{
                        color: projectColors[project.id] || "var(--accent)",
                        fontSize: 'clamp(6rem, 10vw, 12rem)',
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-6 right-8 studio-tag text-subtle-foreground">
                      2025
                    </div>

                    {/* Project type label — left side */}
                    <div className="absolute bottom-6 left-8 flex items-center gap-3">
                      <div className="w-6 h-px" style={{ background: projectColors[project.id] || "var(--accent)", opacity: 0.4 }} />
                      <span className="studio-tag text-subtle-foreground">
                        {(projectTags[project.id] || ["DESIGN"])[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Scroll hint — bottom */}
        <motion.div
          initial={{ opacity: 1 }}
          className="absolute bottom-8 left-6 lg:left-12 z-20 flex items-center gap-3"
        >
          <span className="studio-tag text-subtle-foreground">
            Scroll
          </span>
          <span className="text-subtle-foreground">→</span>
          {/* Progress bar */}
          <div className="w-40 h-px bg-border-soft overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-accent origin-left"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** Animated counter that displays the current panel number */
function Counter({ value }: { value: MotionValue<number> }) {
  const rounded = useTransform(value, (v: number) =>
    String(Math.round(v)).padStart(2, "0")
  );
  return <motion.span>{rounded}</motion.span>;
}
