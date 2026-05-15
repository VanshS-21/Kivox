import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

import { getAllProjects, getProjectBySlug, projectColors, projectTags } from "@/lib/work";
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
    title: `${project.title} — Kivox Work`,
    description: project.demonstrates,
    openGraph: {
      title: `${project.title} — Kivox Work`,
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

  const ctaLabel = project.slug === "hospital" || project.slug === "hotel" ? "View Live Website" : "View Showcase";

  return (
    <div className="bg-background min-h-screen pt-32 lg:pt-40">
      <Section spacing="none" className="mb-16 lg:mb-24">
        <Container>
          {/* Header */}
          <div className="max-w-4xl mb-12 lg:mb-16">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <Link href="/work" className="studio-eyebrow text-muted-foreground hover:text-foreground transition-colors">
                ← Back to Work
              </Link>
              <span className="hidden sm:block text-muted-foreground opacity-30">·</span>
              <span className="studio-eyebrow" style={{ color }}>
                {project.label}
              </span>
            </div>

            <h1
              className="font-sans font-bold text-foreground mb-8"
              style={{
                fontSize: "clamp(2.5rem, 5vw + 1rem, 5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title.split(" ").slice(0, -1).join(" ")}{" "}
              <em className="font-serif font-normal" style={{ fontStyle: "italic", color }}>
                {project.title.split(" ").slice(-1)[0]}.
              </em>
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 studio-tag text-subtle-foreground">
                {tags.map((tag, tagIdx) => (
                  <span key={tag} className="flex items-center gap-3">
                    {tagIdx > 0 && <span className="opacity-40">·</span>}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image / Carousel */}
          <div className="mb-16 lg:mb-24">
            <ProjectCarousel
              images={project.images || [project.image]}
              alt={`${project.title} Case Study`}
              accentColor={color}
              priority
            />
          </div>

          {/* Introduction */}
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
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border bg-card/30 hover:bg-accent hover:border-accent hover:text-[var(--bg-primary)] text-sm font-semibold tracking-wide transition-all duration-300 shrink-0 w-fit group/cta"
                    style={{
                      color,
                    }}
                  >
                    {ctaLabel}
                    <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Narrative: Challenge & Approach */}
          {(project.challenge || project.approach) && (
            <div className="mb-20 lg:mb-32">
              <div className="h-px bg-border w-full mb-16 lg:mb-24" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {project.challenge && (
                  <div>
                    <span className="studio-eyebrow block mb-6" style={{ color }}>
                      The Challenge
                    </span>
                    <p className="text-base lg:text-lg leading-[1.8] text-muted-foreground">
                      {project.challenge}
                    </p>
                  </div>
                )}
                {project.approach && (
                  <div>
                    <span className="studio-eyebrow block mb-6" style={{ color }}>
                      Our Approach
                    </span>
                    <p className="text-base lg:text-lg leading-[1.8] text-muted-foreground">
                      {project.approach}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Data Grid */}
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

          {/* UX Decisions */}
          {project.uxDecisions && project.uxDecisions.length > 0 && (
            <div className="mb-20 lg:mb-32">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                <div className="lg:col-span-4">
                  <span className="studio-eyebrow block mb-3" style={{ color }}>
                    UX Decisions
                  </span>
                </div>
                <div className="lg:col-span-8">
                  <ul className="space-y-6">
                    {project.uxDecisions.map((decision, idx) => (
                      <li key={idx} className="flex items-start gap-4">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                        <span className="text-base lg:text-lg leading-relaxed text-foreground">{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Next Project Footer */}
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

/* ── Data block component ── */

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
