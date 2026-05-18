import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

import {
  getAllProjects,
  getProjectBySlug,
  projectColors,
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
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

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const color = projectColors[project.slug] || "var(--accent)";

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const nextColor = projectColors[nextProject.slug] || "var(--accent)";

  return (
    <div className="bg-background min-h-screen pt-24 lg:pt-32">
      {/* ═══════════════════════════════════════════════════
          § 1 — HERO HEADER
      ═══════════════════════════════════════════════════ */}
      <Section spacing="none" className="mb-12 lg:mb-16">
        <Container>
          <div className="max-w-4xl mb-10 lg:mb-12">
            {/* Breadcrumb + Label */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm">
              <Link
                href="/work"
                prefetch={false}
                className="inline-flex min-h-11 items-center font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Back to showcase
              </Link>
              <span className="hidden sm:block text-muted-foreground opacity-30">
                ·
              </span>
              <span className="font-medium" style={{ color }}>
                {project.label}
              </span>
            </div>

            {/* Title */}
            <h1 className="studio-h1-headline text-foreground mb-5">
              {project.title}
              <span style={{ color }}>.</span>
            </h1>

            {/* Subtitle */}
            {project.subtitle && (
              <p className="studio-lede max-w-3xl mb-8">
                {project.subtitle}
              </p>
            )}

            {/* Metadata Strip */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8">
              {project.year && <MetaChip label="Year" value={project.year} />}
              {project.duration && (
                <MetaChip label="Duration" value={project.duration} />
              )}
              {project.clientType && (
                <MetaChip label="Client" value={project.clientType} />
              )}
            </div>

            {/* Services Tags */}
            {project.services && project.services.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                {project.services.map((service) => (
                  <span
                    key={service}
                    className="studio-tag px-3 py-1.5 rounded-full border"
                    style={{
                      borderColor: `color-mix(in oklch, ${color}, transparent 70%)`,
                      color,
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ═══════════════════════════════════════════════════
              § 2 — HERO IMAGE / CAROUSEL
          ═══════════════════════════════════════════════════ */}
          <div className="mx-auto mb-14 max-w-4xl lg:mb-16">
            <ProjectCarousel
              images={project.images || [project.image]}
              alt={`${project.title} Case Study`}
              accentColor={color}
              liveUrl={project.liveUrl}
              priority
            />
          </div>

          {/* ═══════════════════════════════════════════════════
              § 3 — PROJECT OVERVIEW
          ═══════════════════════════════════════════════════ */}
          <div className="cv-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 lg:mb-24 max-w-5xl mx-auto">
            <div className="lg:col-span-4">
              <h2 className="studio-h3-sans text-foreground">
                Project Overview
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p className="studio-lede max-w-3xl">
                {project.demonstrates}
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              § 4 — THE CHALLENGE + THE INSIGHT
          ═══════════════════════════════════════════════════ */}
          {(project.challenge || project.insight) && (
            <div className="cv-auto mb-16 lg:mb-24 max-w-5xl mx-auto">
              <div className="h-px bg-border w-full mb-12 lg:mb-16" />

              {/* Challenge */}
              {project.challenge && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-12 lg:mb-16">
                  <div className="lg:col-span-4">
                    <h2 className="studio-h3-sans text-foreground">
                      The Challenge
                    </h2>
                  </div>
                  <div className="lg:col-span-8">
                    {project.challenge.split("\n\n").map((para, idx) => (
                      <p
                        key={idx}
                        className="text-sm lg:text-base leading-[1.85] text-muted-foreground mb-5 last:mb-0"
                      >
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {/* Insight callout */}
              {project.insight && (
                <div
                  className="relative overflow-hidden rounded-2xl border p-6 lg:p-10"
                  style={{
                    borderColor: `color-mix(in oklch, ${color}, transparent 68%)`,
                    background: `color-mix(in oklch, ${color}, transparent 94%)`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute -right-3 -top-6 font-serif text-[6rem] leading-none opacity-10 lg:-right-2 lg:-top-8 lg:text-[8rem]"
                    style={{ color }}
                  >
                    &ldquo;
                  </span>
                  <h2 className="studio-h3-sans text-foreground mb-4">
                    The Insight
                  </h2>
                  <p className="studio-body-serif text-foreground italic">
                    &ldquo;{project.insight}&rdquo;
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Approach */}
          {project.approach && (
            <div className="cv-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-16 lg:mb-24 max-w-5xl mx-auto">
              <div className="lg:col-span-4">
                <h2 className="studio-h3-sans text-foreground">Our Approach</h2>
              </div>
              <div className="lg:col-span-8">
                <p className="text-sm lg:text-base leading-[1.85] text-muted-foreground">
                  {project.approach}
                </p>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              § 5 — OUR PROCESS (Timeline)
          ═══════════════════════════════════════════════════ */}
          {project.process && project.process.length > 0 && (
            <div className="cv-auto mb-16 lg:mb-24 max-w-5xl mx-auto">
              <div className="h-px bg-border w-full mb-12 lg:mb-16" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-10">
                <div className="lg:col-span-4">
                  <h2 className="studio-h3-sans text-foreground">
                    Our Process
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-sm lg:text-base leading-relaxed text-muted-foreground">
                    A structured approach from research through launch — each
                    phase building on the insights of the last.
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
            <div className="cv-auto mb-16 lg:mb-24 max-w-4xl mx-auto">
              <div className="h-px bg-border w-full mb-12 lg:mb-16" />
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="studio-h3-sans text-foreground mb-6">
                  Design Philosophy
                </h2>
                <blockquote className="studio-body-serif text-foreground italic">
                  {project.designPhilosophy}
                </blockquote>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              § 7 — KEY DESIGN DECISIONS
          ═══════════════════════════════════════════════════ */}
          {project.keyDesignDecisions &&
            project.keyDesignDecisions.length > 0 && (
              <div className="cv-auto mb-16 lg:mb-24 max-w-5xl mx-auto">
                <div className="h-px bg-border w-full mb-12 lg:mb-16" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-10">
                  <div className="lg:col-span-4">
                    <h2 className="studio-h3-sans text-foreground">
                      Key Design Decisions
                    </h2>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="text-sm lg:text-base leading-relaxed text-muted-foreground">
                      The choices that shaped the project — and why each one was
                      made.
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  {project.keyDesignDecisions.map((decision, idx) => (
                    <DecisionCard
                      key={idx}
                      decision={decision}
                      index={idx}
                      color={color}
                    />
                  ))}
                </div>
              </div>
            )}

          {/* ═══════════════════════════════════════════════════
              § 8 — RESULTS & IMPACT
          ═══════════════════════════════════════════════════ */}
          {project.results && project.results.length > 0 && (
            <div className="cv-auto mb-16 lg:mb-24 max-w-5xl mx-auto">
              <div className="h-px bg-border w-full mb-12 lg:mb-16" />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-10">
                <div className="lg:col-span-4">
                  <h2 className="studio-h3-sans text-foreground">
                    Results & Impact
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-sm lg:text-base leading-relaxed text-muted-foreground">
                    Measurable outcomes from design decisions — not vanity
                    metrics.
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
            <div className="cv-auto mb-16 lg:mb-24 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12">
                <div className="lg:col-span-4">
                  <h2 className="studio-h3-sans text-foreground">Tech Stack</h2>
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
            <div className="cv-auto mb-16 lg:mb-24 max-w-5xl mx-auto">
              <div className="h-px bg-border w-full mb-12 lg:mb-16" />
              <TestimonialBlock
                testimonial={project.testimonial}
                color={color}
              />
            </div>
          )}

          {/* ═══════════════════════════════════════════════════
              § 11 — DATA GRID (Audience / Actions / Sections)
          ═══════════════════════════════════════════════════ */}
          {(project.targetAudience ||
            project.primaryActions ||
            project.coreSections) && (
            <div className="cv-auto mb-16 lg:mb-24 bg-card/20 border border-border/50 rounded-2xl p-6 lg:p-10 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {project.targetAudience && (
                  <DataBlock
                    label="Who it serves"
                    items={project.targetAudience}
                    color={color}
                  />
                )}
                {project.primaryActions && (
                  <DataBlock
                    label="Primary actions"
                    items={project.primaryActions}
                    color={color}
                  />
                )}
                {project.coreSections && (
                  <DataBlock
                    label="Key sections"
                    items={project.coreSections}
                    color={color}
                  />
                )}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* ═══════════════════════════════════════════════════
          § 12 — NEXT PROJECT FOOTER
      ═══════════════════════════════════════════════════ */}
      <Section
        className="cv-auto border-t border-border bg-card/10 py-16 lg:py-24 text-center"
        spacing="none"
      >
        <Container>
          <p className="mb-6 text-sm font-medium text-muted-foreground">
            Next project
          </p>
          <Link
            href={`/work/${nextProject.slug}`}
            prefetch={false}
            className="group inline-block"
          >
            <h2 className="studio-h1-headline text-foreground mb-3 group-hover:text-accent transition-colors duration-500">
              {nextProject.title}
            </h2>
            <div className="flex items-center justify-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors duration-500">
              <span
                className="text-sm font-medium"
                style={{ color: nextColor }}
              >
                {nextProject.label}
              </span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
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
function MetaChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="studio-tag text-subtle-foreground">
        {label}
      </span>
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 relative">
      {/* Timeline line */}
      <div className="hidden lg:flex lg:col-span-1 justify-center">
        <div className="relative flex flex-col items-center w-6">
          {/* Dot */}
          <div
            className="w-3 h-3 rounded-full mt-2 shrink-0 z-10 ring-4 ring-background"
            style={{ background: color }}
          />
          {/* Line */}
          {index < total - 1 && <div className="w-px flex-1 bg-border" />}
        </div>
      </div>

      {/* Phase header */}
      <div className="lg:col-span-3 pb-2">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="studio-tag studio-tabular font-semibold"
            style={{ color }}
          >
            {num}
          </span>
          <h3 className="text-lg font-bold text-foreground">{phase.phase}</h3>
        </div>
        <span className="studio-tag text-muted-foreground">
          {phase.duration}
        </span>
      </div>

      {/* Phase content */}
      <div className="lg:col-span-8 pb-10 lg:pb-12">
        <p className="text-sm lg:text-base leading-[1.8] text-muted-foreground mb-5">
          {phase.description}
        </p>
        {phase.deliverables && phase.deliverables.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {phase.deliverables.map((d) => (
              <span
                key={d}
                className="studio-tag px-3 py-1.5 rounded-md bg-card/40 border border-border/50 text-subtle-foreground"
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
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-12 p-6 lg:p-8 rounded-2xl bg-card/20 border border-border/50">
      <div className="lg:col-span-4 flex items-start gap-3">
        <span
          className="studio-tag studio-tabular shrink-0 mt-0.5 font-semibold"
          style={{ color }}
        >
          {num}
        </span>
        <h3 className="text-lg font-bold text-foreground leading-snug">
          {decision.title}
        </h3>
      </div>
      <div className="lg:col-span-8">
        <p className="text-sm lg:text-base leading-[1.85] text-muted-foreground">
          {decision.rationale}
        </p>
      </div>
    </div>
  );
}

/** Result metric card */
function ResultCard({
  metric,
  color,
}: {
  metric: ResultMetric;
  color: string;
}) {
  return (
    <div className="p-5 lg:p-6 rounded-2xl bg-card/20 border border-border/50">
      <span className="block studio-h1-headline mb-2" style={{ color }}>
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
function TestimonialBlock({
  testimonial,
  color,
}: {
  testimonial: Testimonial;
  color: string;
}) {
  return (
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="studio-h3-sans text-foreground mb-6">
        Client Testimonial
      </h2>

      <span
        className="block studio-h1-headline font-serif leading-none mb-4 opacity-20 select-none"
        style={{ color }}
        aria-hidden="true"
      >
        &ldquo;
      </span>

      <blockquote className="studio-body-serif text-lg lg:text-xl text-foreground italic -mt-8 lg:-mt-12 mb-8">
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
      <h3 className="studio-h4-sans text-foreground mb-4">{label}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm lg:text-base text-muted-foreground leading-snug"
          >
            <span
              className="mt-1.5 w-1 h-1 rounded-full shrink-0"
              style={{ background: color }}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
