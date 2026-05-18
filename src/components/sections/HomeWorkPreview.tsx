"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

import { Section } from "@/components/ui/Section";
import { work } from "@/content/pages/work";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

const projectTags: Record<string, string[]> = {
  hospital: ["STRATEGY", "DESIGN", "DEVELOPMENT"],
  cafe: ["BRANDING", "DESIGN", "DEVELOPMENT"],
  hotel: ["STRATEGY", "DESIGN", "ENGINEERING"],
  school: ["UX RESEARCH", "DESIGN", "DEVELOPMENT"],
  fitness: ["DESIGN", "DEVELOPMENT", "BRANDING"],
};

const projectColors: Record<string, string> = {
  hospital: "var(--project-hospital)",
  cafe: "var(--project-cafe)",
  hotel: "var(--project-hotel)",
  school: "var(--project-school)",
  fitness: "var(--project-fitness)",
};

const AUTOPLAY_INTERVAL_MS = 4000;

export function HomeWorkPreview() {
  const featuredWork = work.featured;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPaused, setIsAutoPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const reduce = useReducedMotion();
  const totalPanels = featuredWork.length;
  const autoplayPaused = isAutoPaused;

  useEffect(() => {
    if (autoplayPaused || totalPanels < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) =>
        current === totalPanels - 1 ? 0 : current + 1,
      );
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [autoplayPaused, totalPanels]);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? totalPanels - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === totalPanels - 1 ? 0 : current + 1,
    );
  };

  const getAnimations = (idx: number) => {
    let offset = idx - activeIndex;
    if (offset > totalPanels / 2) offset -= totalPanels;
    if (offset < -totalPanels / 2) offset += totalPanels;

    if (offset === 0) {
      return { x: "0%", z: 0, rotateY: 0, opacity: 1, scale: 1, zIndex: 30 };
    } else if (offset === 1) {
      return { x: "45%", z: -100, rotateY: -12, opacity: 0.6, scale: 0.85, zIndex: 20 };
    } else if (offset === -1) {
      return { x: "-45%", z: -100, rotateY: 12, opacity: 0.6, scale: 0.85, zIndex: 20 };
    } else if (offset > 1) {
      return { x: "80%", z: -200, rotateY: -20, opacity: 0, scale: 0.7, zIndex: 10 };
    } else {
      return { x: "-80%", z: -200, rotateY: 20, opacity: 0, scale: 0.7, zIndex: 10 };
    }
  };

  return (
    <Section
      spacing="loose"
      className="work-showcase relative overflow-hidden border-t border-border bg-background"
    >
      {/* Ambient Cinematic Background */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={featuredWork[activeIndex].image}
              alt=""
              fill
              className="object-cover blur-[100px] saturate-[1.5]"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-10 lg:px-12">
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="mb-10 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="studio-eyebrow mb-4 text-accent drop-shadow-sm">[ Featured Work ]</p>
            <h2 className="studio-h2-editorial text-foreground drop-shadow-sm">
              Proof that feels built, not staged.
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 font-mono text-xs text-subtle-foreground/80">
              <span className="studio-tabular text-foreground font-semibold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span aria-hidden="true">/</span>
              <span className="studio-tabular">
                {String(totalPanels).padStart(2, "0")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                aria-label="Show previous project"
                className="grid h-11 w-11 place-items-center rounded-full border border-border/50 bg-surface/50 text-foreground backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={goToPrevious}
                type="button"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              </button>
              <button
                aria-label={isAutoPaused ? "Start autoplay" : "Pause autoplay"}
                className="grid h-11 w-11 place-items-center rounded-full border border-border/50 bg-surface/50 text-foreground backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={() => setIsAutoPaused((p) => !p)}
                type="button"
              >
                {isAutoPaused ? (
                  <Play aria-hidden="true" className="h-4 w-4" />
                ) : (
                  <Pause aria-hidden="true" className="h-4 w-4" />
                )}
              </button>
              <button
                aria-label="Show next project"
                className="grid h-11 w-11 place-items-center rounded-full border border-border/50 bg-surface/50 text-foreground backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                onClick={goToNext}
                type="button"
              >
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Cinematic 3D Carousel Track */}
        <div
          aria-label="Featured work cinematic carousel"
          className="relative flex h-[350px] w-full items-center justify-center [perspective:2000px] sm:h-[450px] md:h-[500px] lg:h-[600px]"
          onBlurCapture={() => setIsHovering(false)}
          onFocusCapture={() => setIsHovering(true)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {featuredWork.map((project, idx) => {
            const accent = projectColors[project.slug] || "var(--accent)";
            const isActive = idx === activeIndex;

            return (
              <motion.article
                key={project.slug}
                aria-hidden={!isActive}
                initial={false}
                animate={reduce ? (isActive ? { opacity: 1, zIndex: 30 } : { opacity: 0, zIndex: 0 }) : getAnimations(idx)}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute w-[90vw] max-w-[1050px] shrink-0 origin-center [transform-style:preserve-3d]"
                style={{ aspectRatio: "16 / 10" }}
                onClick={() => {
                  if (!isActive) setActiveIndex(idx);
                }}
              >
                {/* Carousel Frame - Signature Deep Recessed Well */}
                <div className="absolute inset-0 rounded-[1.5rem] bg-[oklch(0.13_0.015_55)] p-3 sm:p-4 shadow-[0_2px_4px_rgba(0,0,0,0.4),0_12px_24px_rgba(0,0,0,0.3),0_24px_48px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_0_rgba(0,0,0,0.4)] sm:rounded-[2rem] transition-all duration-500"
                     style={{ 
                       cursor: isActive ? "default" : "pointer",
                       boxShadow: isActive ? `0 34px 120px -50px ${accent}` : undefined 
                     }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[1rem] sm:rounded-[1.25rem] shadow-[inset_0_4px_30px_rgba(0,0,0,0.7)] group">
                    <motion.div
                      animate={
                        isActive && !reduce && isHovering
                          ? { scale: 1.03 }
                          : { scale: 1 }
                      }
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="absolute inset-0"
                    >
                      <Image
                        alt={`${project.title} project showcase`}
                        className="object-cover object-left-top"
                        fill
                        loading={idx === 0 ? "eager" : "lazy"}
                        sizes="(max-width: 1279px) 100vw, 1180px"
                        src={project.image}
                      />
                    </motion.div>

                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.15)] rounded-[1rem] sm:rounded-[1.25rem] z-40" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Active Project Details (Centered below carousel) */}
        <div className="relative z-20 mx-auto mt-10 sm:mt-14 flex max-w-4xl flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {(() => {
                const project = featuredWork[activeIndex];
                const accent = projectColors[project.slug] || "var(--accent)";
                const tags = projectTags[project.slug] || ["DESIGN", "DEVELOPMENT"];
                const liveHref = project.liveUrl || `/work/${project.slug}`;
                const liveIsExternal = !liveHref.startsWith("/");

                return (
                  <>
                    <div className="mb-4 flex items-center justify-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-foreground/70">
                      <span>{project.year}</span>
                      <span aria-hidden="true" className="opacity-40">
                        /
                      </span>
                      <span>{project.duration}</span>
                    </div>

                    <p
                      className="studio-eyebrow mb-3 font-bold sm:mb-4"
                      style={{ color: accent }}
                    >
                      Showcase - {project.label}
                    </p>
                    <h3 className="font-sans text-4xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-2xl font-sans text-base text-foreground/80 sm:text-lg sm:leading-relaxed">
                      {project.demonstrates}
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-6 sm:mt-10">
                      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[0.68rem] font-mono uppercase tracking-[0.15em] text-foreground/60 sm:text-xs">
                        {tags.map((tag, tagIdx) => (
                          <span className="inline-flex items-center gap-4" key={tag}>
                            {tagIdx > 0 ? (
                              <span className="opacity-35">/</span>
                            ) : null}
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap justify-center mt-2">
                        {project.liveUrl ? (
                          <Link
                            className="group/live inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-24px_var(--accent)] transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-24px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                            href={project.liveUrl}
                            prefetch={false}
                            rel={liveIsExternal ? "noopener noreferrer" : undefined}
                            style={{ backgroundColor: accent }}
                            target={liveIsExternal ? "_blank" : undefined}
                          >
                            View Live Website
                            <ArrowUpRight
                              aria-hidden="true"
                              className="h-4 w-4 transition-transform duration-300 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
                            />
                            <span className="sr-only"> for {project.title}</span>
                          </Link>
                        ) : null}
                        <Link
                          className="inline-flex min-h-12 items-center justify-center rounded-full border bg-surface px-7 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-surface/60 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                          href={`/work/${project.slug}`}
                          prefetch={false}
                          style={{
                            borderColor: `color-mix(in oklch, ${accent} 40%, transparent)`,
                          }}
                        >
                          Case Study
                          <span className="sr-only"> for {project.title}</span>
                        </Link>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </Section>
  );
}
