"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  type MotionValue,
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValue,
} from "motion/react";
import { Magnetic } from "@/components/ui/Magnetic";

import { work } from "@/content/pages/work";
import { easeOutExpo } from "@/lib/motion";

export function HomeWorkPreview() {
  const reduce = useReducedMotion();
  const featuredWork = work.featured;
  const containerRef = useRef<HTMLDivElement>(null);
  const isCompact = useMediaQuery("(max-width: 1439px)");
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothScrollYProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Spring-based horizontal translation for momentum overshoot + settle
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(featuredWork.length - 1) * 100],
  );

  // Spring config: creates momentum overshoot then settles naturally
  const springX = useSpring(rawX, {
    stiffness: 80,
    damping: 28,
    mass: 1.0,
    restDelta: 0.01,
  });

  // For the x style, we need vw units
  const x = useTransform(springX, (v: number) => `${v}vw`);
  const progressOpacity = useTransform(smoothScrollYProgress, [0, 0.88, 1], [1, 1, 0]);

  // Track current project index for the counter
  const totalPanels = featuredWork.length;
  const desktopRunwayVh = Math.max(totalPanels * 124, 340);
  const progressNum = useTransform(smoothScrollYProgress, [0, 1], [1, totalPanels]);

  // Entrance 3D tilt animation
  const { scrollYProgress: enterProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const smoothEnterProgress = useSpring(enterProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const sectionScale = useTransform(smoothEnterProgress, [0, 1], [0.92, 1]);
  const sectionRotateX = useTransform(smoothEnterProgress, [0, 1], [15, 0]);
  const sectionOpacity = useTransform(smoothEnterProgress, [0, 0.6], [0, 1]);

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

  const scrollToIndex = (idx: number) => {
    if (!containerRef.current) return;
    const scrollableDistance = containerRef.current.scrollHeight - window.innerHeight;
    const targetY = containerRef.current.offsetTop + (idx / (totalPanels - 1)) * scrollableDistance;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isCompact || reduce) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredWork.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [featuredWork.length, isCompact, reduce]);

  if (isCompact) {
    return (
      <section ref={containerRef} className="relative overflow-hidden bg-background pt-[60px] md:pt-[80px] lg:pt-[100px] pb-[40px] md:pb-[60px] lg:pb-[80px] work-showcase">
        <div className="mx-auto mb-6 flex max-w-6xl justify-end px-5 sm:px-6 md:px-10 lg:px-12">
          <div className="hidden shrink-0 font-mono text-sm text-muted-foreground md:block">
            <h2 className="sr-only">Featured Work</h2>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(totalPanels).padStart(2, "0")}
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-5 sm:px-6 md:px-10 lg:px-12">
          <div className="overflow-hidden rounded-[2rem]">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              className="flex"
              transition={
                reduce ? { duration: 0 } : { duration: 0.75, ease: easeOutExpo }
              }
            >
              {featuredWork.map((project, idx) => (
                <article
                  inert={idx !== activeIndex}
                  className="w-full shrink-0"
                  key={project.slug}
                >
                  <div className="grid overflow-hidden rounded-[2rem] border border-border/50 bg-surface md:min-h-[460px] md:grid-cols-[0.92fr_1.08fr] lg:min-h-[500px] lg:grid-cols-[1.05fr_0.95fr]">
                    <Link
                      className="group relative block h-[250px] overflow-hidden bg-[var(--bg-surface-alt)] sm:h-[340px] md:h-auto transition-transform duration-300 active:scale-[0.98]"
                      href={project.liveUrl || `/work/${project.slug}`}
                      rel={
                        project.liveUrl?.startsWith("/")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      target={
                        project.liveUrl?.startsWith("/") ? undefined : "_blank"
                      }
                    >
                      <Image
                        alt={`${project.title} project showcase`}
                        className="object-cover object-left-top transition duration-700 group-hover:scale-[1.035]"
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 767px) 100vw, (max-width: 1439px) 58vw, 50vw"
                        src={project.images?.[0] ?? project.image}
                      />
                      <div className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-[oklch(0.12_0.012_65/0.72)] px-3 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.14em] text-white backdrop-blur-sm md:bottom-6 md:left-6">
                        Live showcase <span className="sr-only">for {project.title}</span>
                      </div>
                    </Link>

                    <div className="flex min-h-[320px] flex-col justify-between p-6 sm:p-8 md:min-h-0 md:p-8 lg:p-10">
                      <div>
                        <p
                          className="studio-eyebrow mb-4 font-bold"
                          style={{
                            color:
                              projectColors[project.slug] || "var(--accent)",
                          }}
                        >
                          Showcase - {project.title}
                        </p>
                        <h3 className="max-w-[10ch] studio-h2-editorial text-foreground">
                          {project.title.split(" ")[0]}{" "}
                          <span className="font-serif italic text-accent">
                            {project.title.split(" ").slice(1).join(" ") ||
                              "Project"}
                            .
                          </span>
                        </h3>
                        <p className="mt-4 max-w-xl studio-body text-muted-foreground">
                          {project.demonstrates}
                        </p>
                      </div>

                      <div className="mt-6 space-y-5">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.68rem] font-mono uppercase tracking-[0.15em] text-subtle-foreground sm:text-xs">
                          {(
                            projectTags[project.slug] || [
                              "DESIGN",
                              "DEVELOPMENT",
                            ]
                          ).map((tag, tagIdx) => (
                            <span
                              className="inline-flex items-center gap-4"
                              key={tag}
                            >
                              {tagIdx > 0 ? (
                                <span className="opacity-35">/</span>
                              ) : null}
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                          {project.liveUrl ? (
                            <Link
                              className="inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-24px_var(--accent)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
                              href={project.liveUrl}
                              rel={
                                project.liveUrl.startsWith("/")
                                  ? undefined
                                  : "noopener noreferrer"
                              }
                              style={{
                                backgroundColor:
                                  projectColors[project.slug] ||
                                  "var(--accent)",
                              }}
                              target={
                                project.liveUrl.startsWith("/")
                                  ? undefined
                                  : "_blank"
                              }
                            >
                              View Live Website
                              <span className="ml-2">→</span>
                              <span className="sr-only"> for {project.title}</span>
                            </Link>
                          ) : null}
                          <Link
                            className="inline-flex min-h-12 items-center justify-center rounded-full border bg-[var(--work-secondary-cta-bg)] px-6 text-sm font-semibold transition-all hover:bg-accent hover:text-[var(--work-primary-cta-fg)] active:scale-95"
                            href={`/work/${project.slug}`}
                            style={{
                              borderColor: `color-mix(in oklch, ${projectColors[project.slug] || "var(--accent)"} 34%, transparent)`,
                              color:
                                projectColors[project.slug] || "var(--accent)",
                            }}
                          >
                            Case Study
                            <span className="sr-only"> for {project.title}</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="mx-auto mt-6 flex max-w-6xl items-center justify-between px-5 sm:px-6 md:px-10 lg:px-12">
          <div className="flex items-center gap-2">
            {featuredWork.map((project, idx) => (
              <button
                aria-label={`Show ${project.title}`}
                className="relative min-w-[44px] min-h-[44px] flex items-center justify-center transition-all"
                key={project.slug}
                onClick={() => setActiveIndex(idx)}
                type="button"
              >
                <span
                  className="block h-2.5 rounded-full transition-all"
                  style={{
                    width: idx === activeIndex ? "2rem" : "0.625rem",
                    backgroundColor:
                      idx === activeIndex
                        ? projectColors[project.slug] || "var(--accent)"
                        : "var(--border-strong)",
                  }}
                />
              </button>
            ))}
          </div>
          <div className="font-mono text-xs text-subtle-foreground md:hidden">
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(totalPanels).padStart(2, "0")}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-background work-showcase"
      // Height creates the scroll runway: N panels × 100vh for horizontal scroll.
      // In reduced motion, we let the normal vertical flow dictate height.
      style={reduce ? {} : { height: `${desktopRunwayVh}vh` }}
    >
      {/* Sticky viewport container */}
      <motion.div
        className={
          reduce ? "flex flex-col" : "sticky top-0 h-screen overflow-hidden flex flex-col w-full"
        }
        style={
          reduce
            ? {}
            : {
                scale: sectionScale,
                rotateX: sectionRotateX,
                opacity: sectionOpacity,
                transformOrigin: "bottom center",
                perspective: "1200px",
              }
        }
      >
        {/* Section Heading for full-bleed cinematic effect hidden visually */}
        <h2 className="sr-only">Featured Work</h2>

        {/* Counter — top right with rolling animation */}
        {!reduce && (
          <div
            className="absolute top-24 sm:top-28 right-6 lg:right-12 z-20 flex items-center gap-2"
            aria-hidden="true"
          >
            <motion.span className="text-sm font-mono text-accent studio-tabular">
              <Counter value={progressNum} />
            </motion.span>
            <span className="text-sm font-mono text-subtle-foreground">/</span>
            <span className="text-sm font-mono text-subtle-foreground studio-tabular">
              {String(totalPanels).padStart(2, "0")}
            </span>
          </div>
        )}

        {/* Horizontal track — or vertical stack in reduced motion */}
        <motion.div
          style={reduce ? {} : { x, willChange: "transform" }}
          className={reduce ? "flex flex-col w-full" : "flex flex-1"}
        >
          {featuredWork.map((project, idx) => (
            <div
              key={project.slug}
              className={
                reduce
                  ? "w-full min-h-[85vh] flex items-center relative overflow-hidden border-b border-border/20"
                  : "w-[100vw] shrink-0 h-full flex items-center relative overflow-hidden carousel-frame"
              }
            >
              {/* ── Full-bleed background image ── */}
              <div className="absolute inset-0 z-0">
                <div
                  className="absolute inset-0"
                  style={{
                    willChange: "transform",
                    transform: "translateZ(0)",
                  }}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} project showcase`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={idx === 0}
                  />
                </div>
                {/* Opacity overlay — controls visibility in both themes */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "var(--work-stage-bg, var(--bg-primary))",
                    opacity: "var(--work-bg-overlay, 0.82)",
                  }}
                />
                {/* Project-color accent wash */}
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    background: `radial-gradient(ellipse at 70% 50%, ${projectColors[project.slug] || "var(--accent)"}, transparent 60%)`,
                  }}
                />
              </div>

              {/* ── Content layer ── */}
              <div className="relative z-10 w-full h-full flex flex-col justify-center">
                {/* Main content */}
                <div className="relative max-w-[1400px] w-full mx-auto px-6 md:px-12 lg:px-16 xl:-translate-y-4 2xl:-translate-y-6">
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
                    className="max-w-[44rem] space-y-6 work-preview-content"
                  >
                    {/* Chapter label — project-colored */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -16 },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5, ease: easeOutExpo },
                        },
                      }}
                      className="flex items-center gap-4 work-preview-flex-center"
                    >
                      <span
                        className="studio-eyebrow font-bold"
                        style={{
                          color: projectColors[project.slug] || "var(--accent)",
                        }}
                      >
                        Showcase · {project.title}
                      </span>
                    </motion.div>

                    {/* Project headline — BIG */}
                      <motion.h3
                        variants={{
                          hidden: {},
                          show: {
                            transition: {
                              staggerChildren: 0.1,
                              delayChildren: 0.2,
                            },
                          },
                        }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground"
                      >
                      <motion.span
                        variants={{
                          hidden: { opacity: 0, y: 24, rotateX: -15 },
                          show: {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            transition: { duration: 0.8, ease: easeOutExpo },
                          },
                        }}
                        className="inline-block"
                        style={{ transformOrigin: "top center" }}
                      >
                        {project.title.split(" ")[0]}
                      </motion.span>{" "}
                      {project.title
                        .split(" ")
                        .slice(1)
                        .map((word, wIdx, arr) => (
                          <motion.span
                            key={wIdx}
                            variants={{
                              hidden: { opacity: 0, y: 24, rotateX: -15 },
                              show: {
                                opacity: 1,
                                y: 0,
                                rotateX: 0,
                                transition: {
                                  duration: 0.8,
                                  ease: easeOutExpo,
                                },
                              },
                            }}
                            className="inline-block font-serif font-normal text-accent"
                            style={{
                              fontStyle: "italic",
                              transformOrigin: "top center",
                            }}
                          >
                            {word}
                            {wIdx === arr.length - 1 ? "." : "\u00A0"}
                          </motion.span>
                        ))}
                    </motion.h3>

                      <motion.p
                        variants={{
                          hidden: { opacity: 0, y: 12 },
                          show: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.5, ease: easeOutExpo },
                          },
                        }}
                        className="work-preview-description max-w-xl text-muted-foreground work-preview-content studio-body-large"
                      >
                      {project.demonstrates}
                    </motion.p>

                    {/* Service tags + CTA row */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { duration: 0.5 } },
                      }}
                      className="flex flex-col sm:flex-row sm:items-center gap-5 pt-1 work-preview-tags-row"
                    >
                      {/* Tags */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono tracking-[0.15em] uppercase text-subtle-foreground work-preview-flex-center">
                        {(
                          projectTags[project.slug] || ["DESIGN", "DEVELOPMENT"]
                        ).map((tag, tagIdx) => (
                          <span key={tag} className="flex items-center gap-4">
                            {tagIdx > 0 ? (
                              <span className="opacity-40">·</span>
                            ) : null}
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Clickable showcase link — bottom right */}
                <div className="absolute bottom-20 left-6 right-auto z-30 sm:left-auto sm:right-8 lg:bottom-24 lg:right-16 xl:right-24">
                  <div className="flex flex-wrap items-center gap-3">
                    {project.liveUrl ? (
                      <Magnetic strength={0.2}>
                        <Link
                          href={project.liveUrl}
                          rel={
                            project.liveUrl.startsWith("/")
                              ? undefined
                              : "noopener noreferrer"
                          }
                          target={
                            project.liveUrl.startsWith("/")
                              ? undefined
                              : "_blank"
                          }
                          className="inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-24px_var(--accent)] transition-all duration-300 hover:-translate-y-0.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                          style={{
                            backgroundColor:
                              projectColors[project.slug] || "var(--accent)",
                          }}
                        >
                          View Live Website<span className="sr-only"> for {project.title}</span>
                          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                            →
                          </span>
                        </Link>
                      </Magnetic>
                    ) : null}
                    <Magnetic strength={0.2}>
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-4 rounded-full text-sm font-semibold opacity-90 transition-opacity duration-300 hover:opacity-100 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                        style={{
                          color: projectColors[project.slug] || "var(--accent)",
                        }}
                      >
                        <span
                          className="block rounded-full border bg-[var(--work-secondary-cta-bg)] px-5 py-2.5 shadow-[var(--work-secondary-cta-shadow)] backdrop-blur-md transition-colors duration-300"
                          style={{
                            borderColor: `color-mix(in oklch, ${projectColors[project.slug] || "var(--accent)"} 28%, var(--work-secondary-cta-border))`,
                          }}
                        >
                          Case Study <span className="sr-only">for {project.title}</span> →
                        </span>
                      </Link>
                    </Magnetic>
                  </div>
                </div>

                {/* ── Cinematic Staggered Media Grid ── */}
                <ShowcaseMediaCluster
                  images={project.images}
                  href={project.liveUrl || `/work/${project.slug}`}
                  title={project.title}
                />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Full-width scroll progress bar — bottom */}
        <motion.div
          className="absolute bottom-5 sm:bottom-8 left-0 right-0 z-20 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto"
          style={reduce ? {} : { opacity: progressOpacity }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-4 flex-1 w-full">
              {/* Desktop Pagination Dots */}
              <div className="hidden sm:flex items-center gap-2 shrink-0" role="tablist" aria-label="Project carousel pagination">
                {featuredWork.map((project, idx) => (
                  <DesktopDot 
                    key={project.slug} 
                    idx={idx} 
                    totalPanels={totalPanels} 
                    project={project} 
                    projectColors={projectColors} 
                    smoothScrollYProgress={smoothScrollYProgress} 
                    onClick={() => scrollToIndex(idx)} 
                  />
                ))}
              </div>
              
              {/* Label for Mobile */}
              <div className="flex sm:hidden items-center gap-2 shrink-0">
                <span className="studio-tag text-subtle-foreground">
                  More work
                </span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-subtle-foreground text-xs"
                >
                  →
                </motion.span>
              </div>

              {/* Full-width track */}
              <div className="flex-1 h-[2px] bg-border-soft rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: smoothScrollYProgress }}
                  className="h-full bg-accent origin-left"
                />
              </div>

              {/* Percentage */}
              <motion.span
                className="text-xs font-mono text-subtle-foreground studio-tabular shrink-0"
                aria-hidden="true"
              >
                {reduce ? "100%" : <Percentage value={smoothScrollYProgress} />}
              </motion.span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/** Animated counter that displays the current panel number */
function Counter({ value }: { value: MotionValue<number> }) {
  const rounded = useTransform(value, (v: number) =>
    String(Math.round(v)).padStart(2, "0"),
  );
  return <motion.span>{rounded}</motion.span>;
}

/** Animated percentage display */
function Percentage({ value }: { value: MotionValue<number> }) {
  const pct = useTransform(value, (v: number) => `${Math.round(v * 100)}%`);
  return <motion.span>{pct}</motion.span>;
}

/** Staggered Bento Media Cluster for high-craft showcase right side */
function ShowcaseMediaCluster({
  images,
  href,
  title,
}: {
  images: string[];
  href: string;
  title: string;
}) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-8, 8]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [100, -100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [100, -100]);

  if (!images || images.length < 3) return null;

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link
      href={href}
      target={href.startsWith("/") ? undefined : "_blank"}
      rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
      aria-label="View Live Showcase"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="showcase-cluster absolute top-0 bottom-0 right-[4%] lg:right-[6%] w-[45%] max-w-[800px] flex items-center justify-center z-10 hidden lg:flex group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-3xl"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="showcase-cluster-frame relative w-full aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-[1.05]"
      >
        {/* Back Image (Project view 3) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, x: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="showcase-media-card absolute top-[8%] right-[5%] w-[65%] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] border border-white/10 bg-surface z-10"
        >
          <Image
            src={images[2]}
            alt={`${title} secondary interface view`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw"
            quality={90}
          />
        </motion.div>

        {/* Middle Image (Project view 2) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 50, x: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="showcase-media-card absolute top-[20%] right-[15%] w-[65%] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] border border-white/15 z-20 bg-surface"
        >
          <Image
            src={images[1]}
            alt={`${title} detail interface view`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw"
            quality={90}
          />
        </motion.div>

        {/* Front Image (Project view 1 - Main) */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 60, x: 20 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{ translateZ: "40px" }}
          className="showcase-media-card absolute top-[32%] right-[25%] w-[65%] aspect-[16/10] rounded-2xl overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.6)] border border-white/20 z-30 bg-surface"
        >
          <Image
            src={images[0]}
            alt={`${title} main interface view`}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 30vw"
            quality={90}
          />
          {/* Dynamic Glare Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, transparent 60%)",
              x: glareX,
              y: glareY,
              scale: 2,
            }}
          />
        </motion.div>
      </motion.div>
    </Link>
  );
}

/** Interactive pagination dot for desktop carousel to bypass scroll trap */
function DesktopDot({
  idx,
  totalPanels,
  project,
  projectColors,
  smoothScrollYProgress,
  onClick,
}: {
  idx: number;
  totalPanels: number;
  project: any;
  projectColors: Record<string, string>;
  smoothScrollYProgress: MotionValue<number>;
  onClick: () => void;
}) {
  const dotWidth = useTransform(smoothScrollYProgress, (v: number) => {
    const targetProgress = idx / (totalPanels - 1);
    const distance = Math.abs(v - targetProgress);
    const isActive = distance < 1 / ((totalPanels - 1) * 2);
    return isActive ? "2rem" : "0.625rem";
  });
  
  const dotColor = useTransform(smoothScrollYProgress, (v: number) => {
    const targetProgress = idx / (totalPanels - 1);
    const distance = Math.abs(v - targetProgress);
    const isActive = distance < 1 / ((totalPanels - 1) * 2);
    return isActive ? projectColors[project.slug] || "var(--accent)" : "var(--border-strong)";
  });

  return (
    <motion.button
      onClick={onClick}
      aria-label={`Jump to ${project.title}`}
      className="h-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors cursor-pointer"
      style={{
        width: dotWidth,
        backgroundColor: dotColor,
      }}
      type="button"
      role="tab"
    />
  );
}
