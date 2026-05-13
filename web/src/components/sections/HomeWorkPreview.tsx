"use client";

import { useRef } from "react";
import Link from "next/link";
import { type MotionValue, motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";

import { work } from "@/content/pages/work";
import { fadeUp, transitionDefault, viewportOnce, easeOutExpo } from "@/lib/motion";

export function HomeWorkPreview() {
  const reduce = useReducedMotion();
  const featuredWork = work.items.slice(0, 3);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring-based horizontal translation for momentum overshoot + settle
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(featuredWork.length - 1) * 100]
  );

  // Spring config: creates momentum overshoot then settles naturally
  const springX = useSpring(rawX, {
    stiffness: 80,
    damping: 20,
    mass: 0.8,
    restDelta: 0.01,
  });

  // For the x style, we need vw units
  const x = useTransform(springX, (v: number) => `${v}vw`);

  // Track current project index for the counter
  const totalPanels = featuredWork.length;
  const progressNum = useTransform(scrollYProgress, [0, 1], [1, totalPanels]);

  // Parallax offsets for depth
  const bgParallax = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const watermarkParallax = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Per-panel parallax: each panel gets a slight vertical shift based on scroll
  const panelY0 = useTransform(scrollYProgress, [0, 0.33], [0, -20]);
  const panelY1 = useTransform(scrollYProgress, [0.2, 0.6], [20, -20]);
  const panelY2 = useTransform(scrollYProgress, [0.5, 1], [20, 0]);
  const panelYs = [panelY0, panelY1, panelY2];

  // Scale parallax: active panel slightly scales up
  const panelScale0 = useTransform(scrollYProgress, [0, 0.15, 0.33], [1, 1.02, 0.98]);
  const panelScale1 = useTransform(scrollYProgress, [0.2, 0.45, 0.66], [0.98, 1.02, 0.98]);
  const panelScale2 = useTransform(scrollYProgress, [0.55, 0.75, 1], [0.98, 1.02, 1]);
  const panelScales = [panelScale0, panelScale1, panelScale2];

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
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="w-2.5 h-2.5 rounded-full bg-accent"
          />
          <span className="studio-eyebrow text-subtle-foreground">
            Latest Projects
          </span>
          {/* Expanding line */}
          <motion.span
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={reduce ? undefined : { scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.3 }}
            className="hidden lg:block w-16 h-px bg-accent/30 origin-left"
          />
        </motion.div>

        {/* Counter — top right with rolling animation */}
        <div className="absolute top-28 right-6 lg:right-12 z-20 flex items-center gap-2">
          <motion.span className="text-sm font-mono text-accent studio-tabular">
            {reduce ? "01" : <Counter value={progressNum} />}
          </motion.span>
          <span className="text-sm font-mono text-subtle-foreground">/</span>
          <span className="text-sm font-mono text-subtle-foreground studio-tabular">
            {String(totalPanels).padStart(2, "0")}
          </span>
        </div>

        {/* Horizontal track — now with spring momentum */}
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
                {/* Left — project info with staggered entrance */}
                <motion.div
                  initial={reduce ? false : "hidden"}
                  whileInView={reduce ? undefined : "show"}
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.08,
                        delayChildren: 0.1,
                      },
                    },
                  }}
                  className="lg:col-span-5 space-y-7"
                >
                  {/* Chapter label — project-colored */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -16, filter: "blur(4px)" },
                      show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: easeOutExpo } },
                    }}
                    className="studio-eyebrow"
                    style={{ color: projectColors[project.id] || "var(--accent)" }}
                  >
                    Chapter · {project.title}
                  </motion.div>

                  {/* Project headline */}
                  <motion.h3
                    variants={{
                      hidden: { opacity: 0, y: 12, filter: "blur(6px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: easeOutExpo } },
                    }}
                    className="font-sans font-bold text-foreground" style={{ fontSize: 'clamp(1.75rem, 2vw + 0.75rem, 2.75rem)', lineHeight: 1.12, letterSpacing: '-0.015em' }}
                  >
                    {project.title.split(" ")[0]}{" "}
                    <em
                      className="font-serif font-normal text-accent"
                      style={{ fontStyle: "italic" }}
                    >
                      {project.title.split(" ").slice(1).join(" ")}.
                    </em>
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
                      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: easeOutExpo } },
                    }}
                    className="studio-body text-muted-foreground max-w-md"
                  >
                    {project.demonstrates}
                  </motion.p>

                  {/* Service tags */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0 },
                      show: { opacity: 1, transition: { duration: 0.4 } },
                    }}
                    className="flex flex-wrap items-center gap-x-3 gap-y-1 studio-tag text-subtle-foreground"
                  >
                    {(projectTags[project.id] || ["DESIGN", "DEVELOPMENT"]).map(
                      (tag, tagIdx) => (
                        <span key={tag} className="flex items-center gap-3">
                          {tagIdx > 0 && <span>·</span>}
                          {tag}
                        </span>
                      )
                    )}
                  </motion.div>

                  {/* View project link */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
                    }}
                  >
                    <Link
                      href="/work"
                      className="inline-flex items-center gap-4 studio-eyebrow text-accent group"
                    >
                      View Project
                      <span className="inline-block w-10 h-px bg-accent group-hover:w-20 transition-all duration-400 ease-out" />
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Right — project visual with spring parallax depth */}
                <div className="lg:col-span-7 relative">
                  <motion.div
                    initial={reduce ? false : { opacity: 0, scale: 0.96, filter: "blur(8px)" }}
                    whileInView={reduce ? undefined : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.15 }}
                    className="relative aspect-[16/10] rounded-[20px] overflow-hidden bg-elevated border border-border group hover:border-accent/20 hover:shadow-hover transition-all duration-500"
                    style={{
                      // Per-panel vertical parallax and scale
                      ...(reduce ? {} : {
                        willChange: "transform",
                      }),
                    }}
                  >
                    {/* Slight per-panel motion */}
                    <motion.div
                      style={{
                        y: reduce ? 0 : panelYs[idx] || 0,
                        scale: reduce ? 1 : panelScales[idx] || 1,
                      }}
                      className="absolute inset-0"
                    >
                      {/* Gradient fill with parallax shift */}
                      <motion.div
                        style={{ y: reduce ? 0 : bgParallax }}
                        className="absolute inset-[-20px] bg-gradient-to-br from-elevated via-surface to-elevated"
                      />
                      <div
                        className="absolute inset-0 opacity-[0.10] group-hover:opacity-[0.16] transition-opacity duration-500"
                        style={{ background: `radial-gradient(ellipse at 65% 55%, ${projectColors[project.id] || "var(--accent)"}, transparent 65%)` }}
                      />
                      {/* Secondary glow for depth */}
                      <div
                        className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                        style={{ background: `radial-gradient(ellipse at 25% 80%, var(--accent-rose), transparent 50%)` }}
                      />

                      {/* Project number watermark — parallax depth */}
                      <motion.div
                        style={{ y: reduce ? 0 : watermarkParallax }}
                        className="absolute bottom-4 right-6 lg:bottom-6 lg:right-8 font-bold leading-none font-mono select-none studio-tabular opacity-[0.10] group-hover:opacity-[0.16] transition-opacity duration-500"
                        data-color={projectColors[project.id] || "var(--accent)"}
                      >
                        <span
                          style={{
                            color: projectColors[project.id] || "var(--accent)",
                            fontSize: 'clamp(6rem, 10vw, 12rem)',
                          }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </motion.div>

                      {/* Year badge */}
                      <div className="absolute top-6 right-8 studio-tag text-subtle-foreground">
                        2025
                      </div>

                      {/* Project type label — left side */}
                      <div className="absolute bottom-6 left-8 flex items-center gap-3">
                        <div className="w-6 h-px group-hover:w-10 transition-all duration-400" style={{ background: projectColors[project.id] || "var(--accent)", opacity: 0.4 }} />
                        <span className="studio-tag text-subtle-foreground">
                          {(projectTags[project.id] || ["DESIGN"])[0]}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
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
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-subtle-foreground"
          >
            →
          </motion.span>
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
