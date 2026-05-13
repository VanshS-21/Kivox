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
          <div className="w-2 h-2 rounded-full bg-accent" />
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
              <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                {/* Left — project info */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Chapter label */}
                  <div className="studio-eyebrow text-accent">
                    Chapter · {project.title}
                  </div>

                  {/* Project headline */}
                  <h3 className="studio-h3 font-sans font-bold text-foreground">
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

                  {/* View project link */}
                  <Link
                    href="/work"
                    className="inline-flex items-center gap-3 studio-eyebrow text-accent group"
                  >
                    View Project
                    <span className="inline-block w-8 h-px bg-accent group-hover:w-12 transition-all duration-300" />
                  </Link>
                </div>

                {/* Right — project visual placeholder */}
                <div className="lg:col-span-7 relative">
                  <div className="relative aspect-[16/10] rounded-[16px] overflow-hidden bg-elevated border border-border group">
                    {/* Gradient fill */}
                    <div className="absolute inset-0 bg-gradient-to-br from-elevated via-surface to-elevated" />

                    {/* Project number watermark */}
                    <div className="absolute bottom-6 right-8 text-[7.5rem] lg:text-[10rem] font-bold text-accent/[0.06] leading-none font-mono select-none studio-tabular">
                      {String(idx + 1).padStart(2, "0")}
                    </div>

                    {/* Year badge */}
                    <div className="absolute top-6 right-8 studio-tag text-subtle-foreground">
                      2025
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
          <div className="w-32 h-px bg-border-soft overflow-hidden">
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
