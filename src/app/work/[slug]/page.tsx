import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

import {
  getAllProjects,
  getProjectBySlug,
  projectColors,
  projectTags,
  type ProcessPhase,
  type DesignDecision,
  type ResultMetric,
  type Testimonial,
} from "@/lib/work";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Kivox Case Study`,
    description: project.demonstrates,
    openGraph: {
      title: `${project.title} — Kivox Case Study`,
      description: project.demonstrates,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const color = projectColors[project.slug] || "var(--accent)";
  const tags = projectTags[project.slug] || ["DESIGN", "DEVELOPMENT"];

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const nextColor = projectColors[nextProject.slug] || "var(--accent)";

  const ctaLabel =
    project.slug === "hospital" || project.slug === "hotel"
      ? "View Live Website"
      : "View Showcase";
  const liveTarget = project.liveUrl?.startsWith("/") ? "_self" : "_blank";
  const liveRel = project.liveUrl?.startsWith("/") ? undefined : "noopener noreferrer";

  return (
    <div className="bg-background min-h-screen pt-32 lg:pt-40">
      {/* ═══════════════════════════════════════════════════
          § 1 — HERO HEADER
      ═══════════════════════════════════════════════════ */}
      <Section spacing="none" className="mb-16 lg:mb-24">
        <Container>
          <div className="max-w-5xl mb-12 lg:mb-16">
            {/* Breadcrumb + Label */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <Link href="/work" className="studio-eyebrow text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Work
              </Link>
              <span className="hidden sm:block text-muted-foreground opacity-30">·</span>
              <span className="studio-eyebrow" style={{ color }}>
                {project.label}
              </span>
            </div>

            {/* Title */}
            <h1
              className="font-sans font-bold text-foreground mb-6"
              style={{
                fontSize: "clamp(2.5rem, 5vw + 1rem, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
              <span style={{ color }}>.</span>
            </h1>

            {/* Subtitle */}
            {project.subtitle && (
              <p
                className="studio-body-serif text-muted-foreground max-w-3xl mb-10"
                style={{ fontSize: "clamp(1.15rem, 1.5vw + 0.5rem, 1.5rem)" }}
              >
                {project.subtitle}
              </p>
            )}

            {/* Metadata Strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
              {project.year && (
                <MetaChip label="Year" value={project.year} color={color} />
              )}
              {project.duration && (
                <MetaChip label="Duration" value={project.duration} color={color} />
              )}
              {project.clientType && (
                <MetaChip label="Client" value={project.clientType} color={color} />
              )}
            </div>

            {/* Services Tags */}
            {project.services && project.services.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="text-xs font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border"
                    style={{ borderColor: `color-mix(in oklch, ${color}, transparent 70%)`, color }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            )}

            {project.liveUrl && (
              <div className="mt-8">
                <Link
                  className="group/live inline-flex min-h-12 items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold tracking-wide text-background shadow-[0_18px_50px_-28px_var(--accent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_var(--accent)] sm:min-h-14 sm:px-5"
                  href={project.liveUrl}
                  rel={liveRel}
                  style={{
                    background: `linear-gradient(135deg, ${color}, color-mix(in oklch, ${color}, black 18%))`,
                    borderColor: `color-mix(in oklch, ${color}, white 30%)`,
                  }}
                  target={liveTarget}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[oklch(0.99_0.008_80/0.18)] text-background ring-1 ring-[oklch(0.99_0.008_80/0.28)] transition group-hover/live:translate-x-0.5">
                    ↗
                  </span>
                  <span>{ctaLabel}</span>
                </Link>
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════
              § 2 — HERO IMAGE / CAROUSEL
          ═══════════════════════════════════════════════════ */}
          <div className="mb-16 lg:mb-24">
            <ProjectCarousel
              images={project.images || [project.image]}
              alt={`${project.title} Case Study`}
              accentColor={color}
              liveLabel={ctaLabel}
              liveUrl={project.liveUrl}
              priority
            />
          </div>

          {/* ═══════════════════════════════════════════════════
              § 3 — PROJECT OVERVIEW
          ═══════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 lg:mb-32">
            <div className="lg:col-span-4">
              <span className="studio-eyebrow block mb-3" style={{ color }}>
                Project Overview
              </span>
            </div>
            <div className="lg:col-span-8">
              <p className="studio-body-serif text-muted-foreground" style={{ fontSize: "clamp(1.25rem, 2vw + 0.5rem, 1.75rem)" }}>
                {project.demonstrates}
              </p>

              {project.liveUrl && (
                <div className="mt-10">
                  <Link
                    href={project.liveUrl}
                    target={project.liveUrl.startsWith("/") ? "_self" : "_blank"}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 hover:opacity-80 shrink-0 w-fit group/cta"
                    style={{
                      backgroundColor: color,
                      borderColor: color,
                      color: "var(--bg-primary)",
                    }}
                  >
                    {ctaLabel}
                    <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              § 4 — THE CHALLENGE + THE INSIGHT
          ═══════════════════════════════════════════════════ */}
          {(project.challenge || project.insight) && (
            <div className="mb-20 lg:mb-32">
              <div className="h-px bg-border w-full mb-16 lg:mb-24" />

              {/* Challenge */}
              {project.challenge && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-20">
                  <div className="lg:col-span-4">
                    <span className="studio-eyebrow block mb-3" style={{ color }}>
                      The Challenge
                    </span>
                  </div>
                  <div className="lg:col-span-8">
                    {project.challenge.split("\n\n").map((para, idx) => (
                      <p key={idx} className="text-base lg:text-lg leading-[1.85] text-muted-foreground mb-6 last:mb-0">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Insight callout */}
              {project.insight && (
                <div
                  className="relative rounded-2xl p-8 lg:p-12 border-l-4"
                  style={{
                    borderLeftColor: color,
                    background: `color-mix(in oklch, ${color}, transparent 94%)`,
                  }}
                >
                  <span className="studio-eyebrow block mb-5" style={{ color }}>
                    The Insight
                  </span>
                  <p
                    className="font-serif text-foreground leading-[1.7] italic"
                    style={{ fontSize: "clamp(1.1rem, 1.5vw + 0.5rem, 1.4rem)" }}
                  >
                    &ldquo;{project.insight}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Approach */}
          {project.approach && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20 lg:mb-32">
              <div className="lg:col-span-4">
                <span className="studio-eyebrow block mb-3" style={{ color }}>
                  Our Approach
                </span>
              </div>
              <div className="lg:col-span-8">
                <p className="text-base lg:text-lg leading-[1.85] text-muted-foreground">
                  {project.approach}
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              § 5 — OUR PROCESS (Timeline)
          ═══════════════════════════════════════════════════ */}
          {project.process && project.process.length > 0 && (
            <div className="mb-20 lg:mb-32">
              <div className="h-px bg-border w-full mb-16 lg:mb-24" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
                <div className="lg:col-span-4">
                  <span className="studio-eyebrow block mb-3" style={{ color }}>
                    Our Process
                  </span>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-base lg:text-lg leading-relaxed text-muted-foreground">
                    A structured approach from research through launch — each phase building on the insights of the last.
                  </p>
                </div>
              </div>

              <div className="space-y-0">
                {project.process.map((phase, idx) => (
                  <ProcessBlock
                    key={phase.phase}
                    phase={phase}
                    index={idx}
                    total={project.process!.length}
                    color={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              § 6 — DESIGN PHILOSOPHY
          ═══════════════════════════════════════════════════ */}
          {project.designPhilosophy && (
            <div className="mb-20 lg:mb-32">
              <div className="h-px bg-border w-full mb-16 lg:mb-24" />
              <div className="max-w-4xl mx-auto text-center">
                <span className="studio-eyebrow block mb-8" style={{ color }}>
                  Design Philosophy
                </span>
                <blockquote
                  className="font-serif text-foreground leading-[1.8] italic"
                  style={{ fontSize: "clamp(1.15rem, 1.5vw + 0.5rem, 1.5rem)" }}
                >
                  {project.designPhilosophy}
                </blockquote>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              § 7 — KEY DESIGN DECISIONS
          ═══════════════════════════════════════════════════ */}
          {project.keyDesignDecisions && project.keyDesignDecisions.length > 0 && (
            <div className="mb-20 lg:mb-32">
              <div className="h-px bg-border w-full mb-16 lg:mb-24" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
                <div className="lg:col-span-4">
                  <span className="studio-eyebrow block mb-3" style={{ color }}>
                    Key Design Decisions
                  </span>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-base lg:text-lg leading-relaxed text-muted-foreground">
                    The choices that shaped the project — and why each one was made.
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {project.keyDesignDecisions.map((decision, idx) => (
                  <DecisionCard key={idx} decision={decision} index={idx} color={color} />
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              § 8 — RESULTS & IMPACT
          ═══════════════════════════════════════════════════ */}
          {project.results && project.results.length > 0 && (
            <div className="mb-20 lg:mb-32">
              <div className="h-px bg-border w-full mb-16 lg:mb-24" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
                <div className="lg:col-span-4">
                  <span className="studio-eyebrow block mb-3" style={{ color }}>
                    Results & Impact
                  </span>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-base lg:text-lg leading-relaxed text-muted-foreground">
                    Measurable outcomes from design decisions — not vanity metrics.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
                {project.results.map((metric, idx) => (
                  <ResultCard key={idx} metric={metric} color={color} />
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              § 9 — TECH STACK
          ═══════════════════════════════════════════════════ */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mb-20 lg:mb-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                <div className="lg:col-span-4">
                  <span className="studio-eyebrow block mb-3" style={{ color }}>
                    Tech Stack
                  </span>
                </div>
                <div className="lg:col-span-8">
                  <div className="flex flex-wrap items-center gap-3">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-sm font-mono px-4 py-2 rounded-lg bg-card/40 border border-border/50 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              § 10 — CLIENT TESTIMONIAL
          ═══════════════════════════════════════════════════ */}
          {project.testimonial && (
            <div className="mb-20 lg:mb-32">
              <div className="h-px bg-border w-full mb-16 lg:mb-24" />
              <TestimonialBlock testimonial={project.testimonial} color={color} />
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              § 11 — DATA GRID (Audience / Actions / Sections)
          ═══════════════════════════════════════════════════ */}
          {(project.targetAudience || project.primaryActions || project.coreSections) && (
            <div className="mb-20 lg:mb-32 bg-card/20 border border-border/50 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
                {project.targetAudience && (
                  <DataBlock label="Who it serves" items={project.targetAudience} color={color} />
                )}
                {project.primaryActions && (
                  <DataBlock label="Primary actions" items={project.primaryActions} color={color} />
                )}
                {project.coreSections && (
                  <DataBlock label="Key sections" items={project.coreSections} color={color} />
                )}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════
          § 12 — NEXT PROJECT FOOTER
      ═══════════════════════════════════════════════════ */}
      <Section className="border-t border-border bg-card/10 py-24 lg:py-32 text-center" spacing="none">
        <Container>
          <span className="studio-eyebrow text-muted-foreground mb-6 block">Next Project</span>
          <Link href={`/work/${nextProject.slug}`} className="group inline-block">
            <h2
              className="font-sans font-bold text-foreground mb-4 group-hover:text-accent transition-colors duration-500"
              style={{
                fontSize: "clamp(2rem, 4vw + 1rem, 4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              {nextProject.title}
            </h2>
            <div className="flex items-center justify-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-500">
              <span className="studio-eyebrow" style={{ color: nextColor }}>{nextProject.label}</span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">→</span>
            </div>
          </Link>
        </Container>
      </Section>
    </div>
  );
}


/* ══════════════════════════════════════════════════════════
   Sub-components
   ══════════════════════════════════════════════════════════ */

/** Metadata chip (Year / Duration / Client) */
function MetaChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-mono uppercase tracking-wider text-subtle-foreground">{label}</span>
      <span className="text-xs text-muted-foreground opacity-30">—</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
}

/** Process timeline block */
function ProcessBlock({
  phase,
  index,
  total,
  color,
}: {
  phase: ProcessPhase;
  index: number;
  total: number;
  color: string;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 relative">
      {/* Timeline line */}
      <div className="hidden lg:flex lg:col-span-1 justify-center">
        <div className="relative flex flex-col items-center w-6">
          {/* Dot */}
          <div
            className="w-3 h-3 rounded-full mt-2 shrink-0 z-10 ring-4 ring-background"
            style={{ background: color }}
          />
          {/* Line */}
          {index < total - 1 && (
            <div className="w-px flex-1 bg-border" />
          )}
        </div>
      </div>

      {/* Phase header */}
      <div className="lg:col-span-3 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-sm font-mono font-bold studio-tabular" style={{ color }}>
            {num}
          </span>
          <h3 className="text-lg font-bold text-foreground">{phase.phase}</h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
          {phase.duration}
        </span>
      </div>

      {/* Phase content */}
      <div className="lg:col-span-8 pb-12 lg:pb-16">
        <p className="text-base leading-[1.8] text-muted-foreground mb-6">
          {phase.description}
        </p>
        {phase.deliverables && phase.deliverables.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {phase.deliverables.map((d) => (
              <span
                key={d}
                className="text-xs font-mono px-3 py-1.5 rounded-md bg-card/40 border border-border/50 text-subtle-foreground"
              >
                {d}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Design decision card */
function DecisionCard({
  decision,
  index,
  color,
}: {
  decision: DesignDecision;
  index: number;
  color: string;
}) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 p-8 lg:p-10 rounded-2xl bg-card/20 border border-border/50">
      <div className="lg:col-span-4 flex items-start gap-4">
        <span className="text-sm font-mono font-bold studio-tabular shrink-0 mt-0.5" style={{ color }}>
          {num}
        </span>
        <h3 className="text-lg font-bold text-foreground leading-snug">
          {decision.title}
        </h3>
      </div>
      <div className="lg:col-span-8">
        <p className="text-base leading-[1.85] text-muted-foreground">
          {decision.rationale}
        </p>
      </div>
    </div>
  );
}

/** Result metric card */
function ResultCard({ metric, color }: { metric: ResultMetric; color: string }) {
  return (
    <div className="p-6 lg:p-8 rounded-2xl bg-card/20 border border-border/50">
      <span
        className="block font-sans font-bold mb-2"
        style={{ fontSize: "clamp(2rem, 3vw + 0.5rem, 3rem)", color, lineHeight: 1.1 }}
      >
        {metric.value}
      </span>
      <span className="block text-sm font-semibold text-foreground mb-2">
        {metric.label}
      </span>
      {metric.context && (
        <span className="block text-xs text-muted-foreground leading-relaxed">
          {metric.context}
        </span>
      )}
    </div>
  );
}

/** Testimonial pull-quote */
function TestimonialBlock({ testimonial, color }: { testimonial: Testimonial; color: string }) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <span className="studio-eyebrow block mb-8" style={{ color }}>
        Client Testimonial
      </span>

      {/* Large quote mark */}
      <span
        className="block font-serif leading-none mb-6 opacity-20 select-none"
        style={{ fontSize: "clamp(4rem, 6vw, 8rem)", color }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote
        className="font-serif text-foreground leading-[1.8] italic -mt-16 lg:-mt-20 mb-10"
        style={{ fontSize: "clamp(1.1rem, 1.5vw + 0.5rem, 1.4rem)" }}
      >
        {testimonial.quote}
      </blockquote>

      <div>
        <span className="block text-sm font-semibold text-foreground mb-1">
          {testimonial.author}
        </span>
        <span className="block text-xs text-muted-foreground">
          {testimonial.role}
        </span>
      </div>
    </div>
  );
}

/** Data block (audience / actions / sections) */
function DataBlock({
  label,
  items,
  color,
}: {
  label: string;
  items: string[];
  color: string;
}) {
  return (
    <div>
      <span className="studio-eyebrow block mb-5" style={{ color }}>
        {label}
      </span>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-base text-muted-foreground leading-snug">
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: color }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
