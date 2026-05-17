import Link from "next/link";
import Image from "next/image";

import { getAllProjects, projectColors, projectTags } from "@/lib/work";
import { work } from "@/content/pages/work";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

/* ── Page ── */

export default function WorkPage() {
  const allProjects = getAllProjects();

  return (
    <div className="bg-background min-h-screen">
      {/* ── Hero header ── */}
      <Section
        className="pt-32 lg:pt-40 pb-16 lg:pb-20 relative overflow-hidden"
        spacing="none"
      >
        {/* Ambient glow */}
        <div
          className="absolute top-[10%] right-[15%] w-[250px] md:w-[400px] lg:w-[500px] h-[250px] md:h-[400px] lg:h-[500px] rounded-full blur-[100px] md:blur-[160px] lg:blur-[200px] pointer-events-none"
          style={{
            background: "var(--accent)",
            opacity: "calc(var(--hero-glow-opacity) * 0.4)",
          }}
        />

        <Container>
          <div className="max-w-3xl">
            <h1 className="studio-h1-headline text-foreground mb-6">
              Our{" "}
              <em
                className="font-serif italic text-accent"
                style={{ fontStyle: "italic" }}
              >
                Showcase.
              </em>
            </h1>

            <p className="studio-body-serif text-muted-foreground max-w-xl">
              {work.intro}
            </p>
          </div>
        </Container>

        {/* Decorative divider */}
        <Container>
          <div className="mt-12 h-px origin-left bg-border lg:mt-16" />
        </Container>
      </Section>

      {/* ── Case Study Grid ── */}
      <section className="pb-24 lg:pb-32 relative">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-16 lg:gap-y-24">
            {allProjects.map((project, idx) => {
              const color = projectColors[project.slug] || "var(--accent)";
              const tags = projectTags[project.slug] || [
                "DESIGN",
                "DEVELOPMENT",
              ];
              const num = String(idx + 1).padStart(2, "0");

              return (
                <div
                  key={project.slug}
                  className="group flex flex-col"
                >
                  <Link
                    href={`/work/${project.slug}`}
                    prefetch={false}
                    className="relative mb-8 block aspect-[8/1] w-full overflow-hidden rounded-xl bg-muted/20 sm:aspect-video"
                  >
                    <Image
                      src={project.images?.[0] || project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      fetchPriority={idx === 0 ? "high" : "auto"}
                      loading={idx === 0 ? "eager" : "lazy"}
                      sizes="(max-width: 768px) 88vw, 44vw"
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 mix-blend-overlay pointer-events-none"
                      style={{ backgroundColor: color }}
                    />
                  </Link>

                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-sm font-mono font-bold studio-tabular"
                        style={{ color }}
                      >
                        {num}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-[0.08em] text-muted-foreground">
                        {project.label}
                      </span>
                    </div>

                    <h2 className="studio-h3-sans text-foreground mb-4 line-clamp-2">
                      {project.title.split(" ").slice(0, -1).join(" ")}{" "}
                      <em
                        className="font-serif italic"
                        style={{ fontStyle: "italic", color }}
                      >
                        {project.title.split(" ").slice(-1)[0]}.
                      </em>
                    </h2>

                    <p className="studio-body text-muted-foreground mb-8 line-clamp-2 flex-1">
                      {project.demonstrates}
                    </p>

                    {/* Tags & Link */}
                    <div className="mt-auto flex items-center justify-between border-t border-border pt-4">
                      <div className="flex items-center gap-3">
                        {tags.slice(0, 2).map((tag, tagIdx) => (
                          <span
                            key={tag}
                            className="text-[10px] sm:text-xs font-mono text-subtle-foreground uppercase tracking-wider flex items-center gap-3"
                          >
                            {tagIdx > 0 && (
                              <span className="opacity-40">·</span>
                            )}
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/work/${project.slug}`}
                        prefetch={false}
                        className="flex items-center gap-2 text-sm font-semibold transition-colors duration-300"
                        style={{ color }}
                      >
                        <span className="hidden sm:inline">
                          View Case Study
                        </span>
                        <span className="sm:hidden">View</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
