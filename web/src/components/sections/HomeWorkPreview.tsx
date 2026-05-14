"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { type MotionValue, motion, useScroll, useTransform, useSpring, useReducedMotion } from "motion/react";

import { work } from "@/content/pages/work";
import { fadeUp, transitionDefault, viewportOnce, easeOutExpo } from "@/lib/motion";

export function HomeWorkPreview() {
  const reduce = useReducedMotion();
  const featuredWork = work.featured;
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
    stiffness: 100,
    damping: 25,
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
      className="relative bg-background work-showcase"
      // Height creates the scroll runway: N panels × 100vh
      style={{ height: `${totalPanels * 100}vh` }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* No section label — counter provides wayfinding */}

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
              className="min-w-[100vw] h-full flex items-center relative overflow-hidden"
            >
              {/* ── Full-bleed background image ── */}
              <div className="absolute inset-0 z-0">
                <motion.div
                  style={{ y: reduce ? 0 : bgParallax }}
                  className="absolute inset-[-40px]"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} project showcase`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={idx === 0}
                  />
                </motion.div>
                {/* Opacity overlay — controls visibility in both themes */}
                <div
                  className="absolute inset-0 bg-background"
                  style={{ opacity: 'var(--work-bg-overlay, 0.82)' }}
                />
                {/* Project-color accent wash */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{ background: `radial-gradient(ellipse at 70% 50%, ${projectColors[project.id] || "var(--accent)"}, transparent 60%)` }}
                />
              </div>

              {/* ── Content layer ── */}
              <div className="relative z-10 w-full h-full flex flex-col justify-center">
                {/* Main content */}
                <div className="relative max-w-[1600px] w-full mx-auto px-6 sm:px-8 lg:px-16 xl:px-24">
                  <motion.div
                    initial={reduce ? false : "hidden"}
                    whileInView={reduce ? undefined : "show"}
                    viewport={{ once: true, amount: 0.3 }}
                    variants={{
                      hidden: {},
                      show: {
                        transition: {
                          staggerChildren: 0.1,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                    className="max-w-3xl space-y-8"
                  >
                    {/* Chapter label — project-colored */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -16, filter: "blur(4px)" },
                        show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: easeOutExpo } },
                      }}
                      className="flex items-center gap-4"
                    >
                      <span
                        className="studio-eyebrow font-bold"
                        style={{ color: projectColors[project.id] || "var(--accent)" }}
                      >
                        Showcase · {project.title}
                      </span>
                    </motion.div>

                    {/* Project headline — BIG */}
                    <motion.h3
                      variants={{
                        hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOutExpo } },
                      }}
                      className="font-sans font-bold text-foreground"
                      style={{ fontSize: 'clamp(2.75rem, 5vw + 1rem, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.025em' }}
                    >
                      {project.title.split(" ")[0]}{" "}
                      <em
                        className="font-serif font-normal text-accent"
                        style={{ fontStyle: "italic" }}
                      >
                        {project.title.split(" ").slice(1).join(" ")}.
                      </em>
                    </motion.h3>

                    {/* Description — larger */}
                    <motion.p
                      variants={{
                        hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: easeOutExpo } },
                      }}
                      className="text-muted-foreground max-w-xl"
                      style={{ fontSize: 'clamp(1rem, 1.1vw + 0.5rem, 1.25rem)', lineHeight: 1.65 }}
                    >
                      {project.demonstrates}
                    </motion.p>

                    {/* Service tags + CTA row */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { duration: 0.5 } },
                      }}
                      className="flex flex-col sm:flex-row sm:items-center gap-6 pt-2"
                    >
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono tracking-[0.15em] uppercase text-subtle-foreground">
                        {(projectTags[project.id] || ["DESIGN", "DEVELOPMENT"]).map(
                          (tag, tagIdx) => (
                            <span key={tag} className="flex items-center gap-4">
                              {tagIdx > 0 && <span className="opacity-40">·</span>}
                              {tag}
                            </span>
                          )
                        )}
                      </div>

                      {/* Divider */}
                      <div className="hidden sm:block w-px h-5 bg-border-strong" />

                      {/* CTA — only on last slide */}
                      {idx === featuredWork.length - 1 && (
                        <Link
                          href="/work"
                          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full border border-accent/40 text-accent text-sm font-semibold tracking-wide hover:bg-accent hover:text-background transition-all duration-300 group w-fit"
                        >
                          Explore Our Work
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </Link>
                      )}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Clickable showcase link — bottom right */}
                <Link
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-12 left-6 sm:left-auto right-auto sm:right-8 lg:right-16 xl:right-24 inline-flex items-center gap-4 text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity duration-300 group"
                  style={{ color: projectColors[project.id] || "var(--accent)" }}
                >
                  <span
                    className="px-5 py-2.5 bg-background/60 backdrop-blur-md rounded-full border transition-colors duration-300"
                    style={{
                      borderColor: `color-mix(in oklch, ${projectColors[project.id] || "var(--accent)"} 20%, transparent)`,
                    }}
                  >
                    View Live Showcase →
                  </span>
                </Link>


              </div>
            </div>
          ))}
        </motion.div>

        {/* Full-width scroll progress bar — bottom */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-6 lg:px-12">
          <div className="flex items-center gap-4 lg:gap-6">
            {/* Label */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="studio-tag text-subtle-foreground">Scroll</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-subtle-foreground text-xs"
              >
                →
              </motion.span>
            </div>

            {/* Full-width track */}
            <div className="flex-1 h-[2px] bg-border-soft rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-accent origin-left"
              />
            </div>

            {/* Percentage */}
            <motion.span className="text-xs font-mono text-subtle-foreground studio-tabular shrink-0">
              {reduce ? "100%" : <Percentage value={scrollYProgress} />}
            </motion.span>
          </div>
        </div>
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

/** Animated percentage display */
function Percentage({ value }: { value: MotionValue<number> }) {
  const pct = useTransform(value, (v: number) =>
    `${Math.round(v * 100)}%`
  );
  return <motion.span>{pct}</motion.span>;
}
