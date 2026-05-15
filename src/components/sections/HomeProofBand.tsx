import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { Container } from "@/components/ui/Container";
import { work } from "@/content/pages/work";

const projectColors: Record<string, string> = {
  cafe: "var(--project-cafe)",
  hotel: "var(--project-hotel)",
  school: "var(--project-school)",
};

const outcomes: Record<string, string> = {
  cafe: "Menu, hours, and directions are visible fast enough to turn nearby interest into a visit.",
  hotel: "Room confidence, policies, and direct-booking trust are brought forward before a guest leaves for an OTA.",
  school: "Admissions steps and parent questions are structured so families know what to do next.",
};

const sectionStyle = {
  "--proof-bg": "oklch(0.97 0.003 250)",
  "--proof-surface": "oklch(0.99 0.002 250)",
  "--proof-linen": "oklch(0.955 0.008 70)",
  "--proof-ink": "oklch(0.13 0.005 250)",
  "--proof-muted": "oklch(0.45 0.005 250)",
  "--proof-subtle": "oklch(0.62 0.004 250)",
  "--proof-border": "oklch(0.13 0.005 250 / 0.12)",
  "--proof-border-strong": "oklch(0.13 0.005 250 / 0.2)",
  "--proof-accent": "oklch(0.60 0.22 55)",
  "--proof-accent-ink": "oklch(0.99 0.002 250)",
} as CSSProperties;

export function HomeProofBand() {
  const proofItems = work.featured;

  return (
    <section
      id="live-examples"
      aria-labelledby="live-examples-title"
      className="relative scroll-mt-24 overflow-hidden py-16 sm:py-20 lg:py-28"
      style={sectionStyle}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--proof-bg) 0%, var(--proof-linen) 48%, var(--proof-bg) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--proof-border)" }}
      />

      <Container className="relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="studio-eyebrow mb-4" style={{ color: "var(--proof-accent)" }}>
              [ Live Examples ]
            </p>
            <h2
              id="live-examples-title"
              className="max-w-2xl font-sans text-[2.35rem] font-bold leading-[1.03] sm:text-5xl lg:text-6xl"
              style={{ color: "var(--proof-ink)", letterSpacing: "-0.025em" }}
            >
              See what Kivox can actually build.
            </h2>
            <p
              className="mt-5 max-w-xl text-base leading-7 sm:text-lg sm:leading-8"
              style={{ color: "var(--proof-muted)" }}
            >
              Three launchable demonstrations, each built around a real business
              decision path. Screenshot first, outcome clear, action obvious.
            </p>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {proofItems.map((project, index) => {
              const accent = projectColors[project.slug] ?? "var(--proof-accent)";
              const liveIsExternal = Boolean(project.liveUrl && !project.liveUrl.startsWith("/"));
              const liveHref = project.liveUrl ?? `/work/${project.slug}`;

              return (
                <article
                  className="group grid overflow-hidden border bg-[var(--proof-surface)] shadow-[0_18px_60px_oklch(0.13_0.005_250_/_0.08)] transition-transform duration-300 ease-out hover:-translate-y-1 sm:grid-cols-[minmax(230px,0.92fr)_1fr]"
                  key={project.slug}
                  style={{
                    borderColor: "var(--proof-border)",
                    borderRadius: "var(--radius-md)",
                  }}
                >
                  <Link
                    aria-label={`View live site: ${project.title}`}
                    className="relative block min-h-[220px] overflow-hidden bg-[var(--proof-linen)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--proof-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--proof-bg)] sm:min-h-full"
                    href={liveHref}
                    rel={liveIsExternal ? "noopener noreferrer" : undefined}
                    target={liveIsExternal ? "_blank" : undefined}
                  >
                    <Image
                      alt={`${project.title} website screenshot`}
                      className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      fill
                      priority={index === 0}
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 42vw, 34vw"
                      src={project.images?.[0] ?? project.image}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-25"
                      style={{
                        background: `linear-gradient(180deg, transparent 45%, var(--proof-ink) 135%), radial-gradient(circle at 22% 16%, ${accent} 0%, transparent 46%)`,
                      }}
                    />
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-[0.66rem] font-mono font-semibold uppercase tracking-[0.12em]"
                      style={{
                        background: "color-mix(in oklch, var(--proof-surface) 86%, transparent)",
                        color: "var(--proof-ink)",
                        border: "1px solid var(--proof-border)",
                      }}
                    >
                      Live example
                    </span>
                  </Link>

                  <div className="flex min-h-[300px] flex-col justify-between p-5 sm:p-6 lg:p-8">
                    <div>
                      <p
                        className="studio-eyebrow mb-4"
                        style={{ color: accent }}
                      >
                        {project.clientType}
                      </p>
                      <h3
                        className="font-sans text-3xl font-bold leading-tight sm:text-[2.25rem]"
                        style={{ color: "var(--proof-ink)", letterSpacing: "-0.018em" }}
                      >
                        {project.title}
                      </h3>
                      <p className="mt-4 text-base leading-7" style={{ color: "var(--proof-muted)" }}>
                        {outcomes[project.slug] ?? project.demonstrates}
                      </p>
                    </div>

                    <div className="mt-7 space-y-5">
                      <div className="flex flex-wrap gap-2">
                        {project.services.slice(0, 3).map((service) => (
                          <span
                            className="rounded-full border px-3 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.08em]"
                            key={service}
                            style={{
                              borderColor: "var(--proof-border)",
                              color: "var(--proof-muted)",
                              background: "color-mix(in oklch, var(--proof-linen) 58%, transparent)",
                            }}
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3 min-[420px]:flex-row">
                        <Link
                          className="inline-flex min-h-12 items-center justify-center rounded-full px-5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--proof-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--proof-surface)]"
                          href={liveHref}
                          rel={liveIsExternal ? "noopener noreferrer" : undefined}
                          style={{ backgroundColor: "var(--proof-accent)", color: "var(--proof-accent-ink)" }}
                          target={liveIsExternal ? "_blank" : undefined}
                        >
                          View live site
                          <span className="ml-2" aria-hidden="true">
                            -&gt;
                          </span>
                        </Link>
                        <Link
                          className="inline-flex min-h-12 items-center justify-center rounded-full border px-5 text-sm font-semibold transition-colors duration-200 hover:bg-[var(--proof-ink)] hover:text-[var(--proof-surface)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--proof-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--proof-surface)]"
                          href={`/work/${project.slug}`}
                          style={{
                            borderColor: "var(--proof-border-strong)",
                            color: "var(--proof-ink)",
                          }}
                        >
                          Case study
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
