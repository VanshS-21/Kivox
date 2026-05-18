"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Layers3,
  MonitorSmartphone,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Section } from "@/components/ui/Section";
import { work } from "@/content/pages/work";

const projectColors: Record<string, string> = {
  hospital: "var(--project-hospital)",
  cafe: "var(--project-cafe)",
  hotel: "var(--project-hotel)",
  school: "var(--project-school)",
  fitness: "var(--project-fitness)",
};

const projectSignals: Record<
  string,
  {
    role: string;
    headline: string;
    question: string;
    proof: string;
    focus: string[];
  }
> = {
  cafe: {
    role: "Visit-intent cafe site",
    headline: "Turns \"Should we go?\" into a fast yes.",
    question:
      "Can visitors see the menu, hours, and location before patience runs out?",
    proof:
      "The Roastery is arranged for people deciding on mobile, usually with one hand and a short attention span.",
    focus: ["Menu-first structure", "Local action path", "Fast mobile reading"],
  },
  hotel: {
    role: "Direct-booking hotel site",
    headline: "Makes a hotel feel safer to book direct.",
    question: "Can the website out-trust booking portals?",
    proof:
      "Aurelia Grand puts rooms, policies, and booking context where guests need confidence before they leave.",
    focus: ["Room decision UX", "Policy clarity", "Direct booking trust"],
  },
  school: {
    role: "Admissions clarity site",
    headline: "Gives parents the answers they came for.",
    question: "Can families understand fit, fees, and next steps quickly?",
    proof:
      "Greenfield Academy treats admissions as the main journey, not a footer errand or brochure afterthought.",
    focus: ["Parent-first IA", "Admissions journey", "Trust-building details"],
  },
};

type ProjectAccentStyle = CSSProperties & {
  "--project-accent": string;
};

export function HomeProofBand() {
  const projects = work.featured;
  const [activeIndex, setActiveIndex] = useState(0);
  const reduce = useReducedMotion();
  const activeProject = projects[activeIndex];
  const activeSignal = projectSignals[activeProject.slug];
  const activeAccent = projectColors[activeProject.slug] ?? "var(--accent)";
  const liveHref = activeProject.liveUrl ?? `/work/${activeProject.slug}`;
  const liveIsExternal = !liveHref.startsWith("/");

  const activeStyle = useMemo<ProjectAccentStyle>(
    () => ({ "--project-accent": activeAccent }),
    [activeAccent],
  );

  return (
    <Section
      className="proof-showcase relative isolate overflow-hidden border-y border-border bg-surface-alt"
      spacing="loose"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[var(--proof-stage-bg)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-border-strong" />
        <div className="absolute left-1/2 top-24 h-[36rem] w-[36rem] -translate-x-1/3 rounded-full bg-[color-mix(in_oklch,var(--accent)_9%,transparent)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-10 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="studio-eyebrow mb-5 text-accent">
              [ Websites You Can Open ]
            </p>
            <h2 className="studio-h2-editorial max-w-3xl text-foreground">
              Proof you can inspect, not just scroll past.
            </h2>
          </div>

          <div className="max-w-2xl lg:justify-self-end">
            <p className="studio-body-large text-muted-foreground">
              Three launchable concept websites, each built around a different
              buying moment. Separate brands, separate journeys, same Kivox
              standard for clarity, speed, and trust.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Live website", "Case study", "Build logic"].map((label) => (
                <span
                  className="studio-tag rounded-full border border-border bg-surface/70 px-3 py-1.5 text-subtle-foreground"
                  key={label}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(300px,0.42fr)_minmax(0,1fr)] xl:gap-8"
          style={activeStyle}
        >
          <aside className="grid content-start gap-4">
            <div className="studio-surface studio-surface--quiet p-5 shadow-rest sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[color-mix(in_oklch,var(--project-accent)_36%,var(--border))] bg-[color-mix(in_oklch,var(--project-accent)_10%,transparent)] text-[color:var(--project-accent)]">
                  <Layers3 aria-hidden="true" className="h-4 w-4" />
                </span>
                <div>
                  <p className="studio-tag text-subtle-foreground">
                    Selected proof
                  </p>
                  <p className="text-sm font-semibold text-foreground">
                    {String(projects.length).padStart(2, "0")} working examples
                  </p>
                </div>
              </div>
              <p className="mt-5 studio-body text-muted-foreground">
                Pick a project to inspect the live build, then read how the
                page structure was shaped for that business context.
              </p>
            </div>

            <div className="grid gap-3">
              {projects.map((project, index) => {
                const isActive = index === activeIndex;
                const signal = projectSignals[project.slug];
                const accent = projectColors[project.slug] ?? "var(--accent)";

                return (
                  <button
                    aria-controls="home-proof-band-panel"
                    aria-pressed={isActive}
                    className="group grid min-h-[92px] grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[var(--radius-md)] border bg-elevated p-4 text-left shadow-rest transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                    key={project.slug}
                    onClick={() => setActiveIndex(index)}
                    style={{
                      borderColor: isActive
                        ? `color-mix(in oklch, ${accent} 45%, var(--border))`
                        : "var(--border)",
                      background: isActive
                        ? `color-mix(in oklch, ${accent} 9%, var(--bg-elevated))`
                        : undefined,
                    }}
                    type="button"
                  >
                    <span
                      className="studio-tabular text-sm font-semibold"
                      style={{ color: isActive ? accent : "var(--fg-subtle)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>
                      <span className="block text-base font-semibold leading-tight text-foreground">
                        {project.title}
                      </span>
                      <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                        {signal.role}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 text-subtle-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </button>
                );
              })}
            </div>
          </aside>

          <div className="min-w-0">
            <div
              className="overflow-hidden rounded-[var(--radius-lg)] border border-[color-mix(in_oklch,var(--project-accent)_34%,var(--border-strong))] bg-elevated shadow-strong"
              id="home-proof-band-panel"
            >
              <div className="flex items-center justify-between border-b border-border bg-surface-alt px-4 py-3 sm:px-5">
                <div className="flex items-center gap-2" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_oklch,var(--project-accent)_52%,var(--border))]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-border" />
                </div>
                <span className="studio-tag hidden text-subtle-foreground sm:inline-flex">
                  Studio demonstration
                </span>
                <span className="studio-tabular text-xs font-semibold text-[color:var(--project-accent)]">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)]"
                  exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                  initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                  key={activeProject.slug}
                  transition={{
                    duration: reduce ? 0 : 0.24,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    aria-label={`Open live website for ${activeProject.title}`}
                    className="group relative block min-h-[260px] min-w-0 overflow-hidden bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:min-h-[360px] lg:h-full lg:min-h-[520px]"
                    href={liveHref}
                    prefetch={false}
                    rel={liveIsExternal ? "noopener noreferrer" : undefined}
                    target={liveIsExternal ? "_blank" : undefined}
                  >
                    <Image
                      alt={`${activeProject.title} website preview`}
                      className="object-cover object-left-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.025]"
                      fill
                      loading="lazy"
                      sizes="(max-width: 1023px) 100vw, 58vw"
                      src={activeProject.image}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color-mix(in_oklch,var(--project-accent)_28%,var(--bg-primary))] opacity-70" />
                    <span className="absolute bottom-4 left-4 inline-flex min-h-10 items-center gap-2 rounded-full bg-[color-mix(in_oklch,var(--bg-elevated)_92%,transparent)] px-4 text-sm font-semibold text-foreground shadow-rest backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-0.5">
                      Open live site
                      <ExternalLink aria-hidden="true" className="h-4 w-4" />
                    </span>
                  </Link>

                  <div className="flex flex-col justify-between border-t border-border p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-8">
                    <div>
                      <p className="studio-eyebrow mb-4 text-[color:var(--project-accent)]">
                        [ {activeSignal.role} ]
                      </p>
                      <h3 className="studio-h3-sans max-w-xl text-foreground">
                        {activeSignal.headline}
                      </h3>
                      <p className="mt-4 studio-body text-muted-foreground">
                        {activeSignal.proof}
                      </p>

                      <div className="mt-7 rounded-[var(--radius-md)] border border-border bg-surface/60 p-4">
                        <p className="studio-tag mb-3 text-subtle-foreground">
                          Business question
                        </p>
                        <p className="text-base font-semibold leading-snug text-foreground">
                          {activeSignal.question}
                        </p>
                      </div>

                      <div className="mt-6 grid gap-3">
                        {activeSignal.focus.map((item) => (
                          <div
                            className="flex items-center gap-3 text-sm text-muted-foreground"
                            key={item}
                          >
                            <CheckCircle2
                              aria-hidden="true"
                              className="h-4 w-4 shrink-0 text-[color:var(--project-accent)]"
                            />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                      <Link
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-28px_var(--project-accent)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                        href={liveHref}
                        prefetch={false}
                        rel={liveIsExternal ? "noopener noreferrer" : undefined}
                        style={{ backgroundColor: activeAccent }}
                        target={liveIsExternal ? "_blank" : undefined}
                      >
                        View Live Website
                        <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                      </Link>
                      <Link
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[color-mix(in_oklch,var(--project-accent)_32%,var(--border))] bg-surface px-5 text-sm font-semibold text-foreground shadow-rest transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-[color:var(--project-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                        href={`/work/${activeProject.slug}`}
                        prefetch={false}
                      >
                        Read Case Study
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MonitorSmartphone
                  aria-hidden="true"
                  className="h-4 w-4 text-[color:var(--project-accent)]"
                />
                <span>
                  Built as separate website worlds, not Kivox reskins.
                </span>
              </div>
              <Link
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-surface px-5 text-sm font-semibold text-foreground shadow-rest transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                href="/work"
                prefetch={false}
              >
                See All Work
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
