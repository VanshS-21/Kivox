"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/ui/Container";
import { Magnetic } from "@/components/ui/Magnetic";
import { work } from "@/content/pages/work";
import { home } from "@/content/pages/home";
import { fadeUp, transitionDefault, viewportOnce } from "@/lib/motion";

const projectColors: Record<string, string> = {
  cafe: "var(--project-cafe)",
  hotel: "var(--project-hotel)",
  school: "var(--project-school)",
};


type ProjectAccentStyle = CSSProperties & {
  "--project-accent": string;
};

export function HomeProofBand() {
  const proofItems = work.featured;
  const reduce = useReducedMotion();

  return (
    <section
      aria-labelledby="home-proof-band-title"
      className="proof-showcase relative overflow-hidden py-12 sm:py-14 lg:py-16 border-t border-border"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: "var(--proof-stage-bg)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--proof-border)" }}
      />

      <Container className="relative z-10">
        <div className="space-y-7 sm:space-y-8">
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView={reduce ? undefined : "show"}
            viewport={viewportOnce}
            variants={fadeUp}
            transition={transitionDefault}
          >
            <p className="studio-eyebrow mb-4 text-accent">[ {home.workPreview.label} ]</p>
            <h2
              id="home-proof-band-title"
              className="max-w-5xl studio-h2-editorial"
              style={{ color: "var(--proof-ink)" }}
            >
              {home.workPreview.summary}
            </h2>
          </motion.div>

          <div className="space-y-4 sm:space-y-5">
            {proofItems.map((project, idx) => {
              const accent =
                projectColors[project.slug] ?? "var(--proof-accent)";
              const liveIsExternal = Boolean(
                project.liveUrl && !project.liveUrl.startsWith("/"),
              );
              const liveHref = project.liveUrl ?? `/work/${project.slug}`;

              return (
                <motion.article
                  initial={reduce ? false : "hidden"}
                  whileInView={reduce ? undefined : "show"}
                  viewport={viewportOnce}
                  variants={fadeUp}
                  transition={{
                    ...transitionDefault,
                    delay: reduce ? 0 : Math.min(0.18, idx * 0.06),
                  }}
                  className="group grid overflow-hidden border bg-[var(--proof-surface)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 motion-reduce:transition-none sm:grid-cols-[minmax(280px,0.9fr)_1fr]"
                  key={project.slug}
                  style={{
                    "--project-accent": accent,
                    borderColor: "var(--proof-border)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--proof-shadow)",
                  } as ProjectAccentStyle}
                >
                  <Link
                    aria-label={`View live site: ${project.title}`}
                    className="proof-media relative block min-h-[200px] overflow-hidden bg-[var(--proof-linen)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--project-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--proof-bg)] sm:min-h-full"
                    href={liveHref}
                    prefetch={false}
                    rel={liveIsExternal ? "noopener noreferrer" : undefined}
                    target={liveIsExternal ? "_blank" : undefined}
                  >
                    <Image
                      alt={`${project.title} website screenshot`}
                      className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      fill
                      loading="lazy"
                      sizes="(max-width: 639px) 88vw, (max-width: 1279px) 44vw, 34vw"
                      src={project.image}
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 opacity-25"
                      style={{
                        background: `linear-gradient(180deg, transparent 45%, var(--proof-image-shade) 135%), radial-gradient(circle at 22% 16%, ${accent} 0%, transparent 46%)`,
                      }}
                    />
                  </Link>

                  <div className="flex min-h-[260px] flex-col justify-between p-5 sm:p-6 lg:p-7">
                    <div>
                      <p
                        className="studio-eyebrow mb-4"
                        style={{ color: accent }}
                      >
                        {project.clientType}
                      </p>
                      <h3
                        className="studio-h3-sans"
                        style={{
                          color: "var(--proof-ink)",
                        }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="mt-4 studio-body"
                        style={{ color: "var(--proof-muted)" }}
                      >
                        {project.demonstrates}
                      </p>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.services.slice(0, 3).map((service) => (
                          <span
                            className="studio-tag rounded-full border px-3 py-1.5"
                            key={service}
                            style={{
                              borderColor: "var(--proof-border)",
                              color: "var(--proof-muted)",
                              background:
                                "color-mix(in oklch, var(--proof-linen) 58%, transparent)",
                            }}
                          >
                            {service}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col gap-3 min-[420px]:flex-row">
                        <Magnetic strength={0.2}>
                          <Link
                            aria-label={`View live website: ${project.title}`}
                            className="group inline-flex items-center gap-3 rounded-full px-5 py-2 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-24px_var(--accent)] transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                            href={liveHref}
                            prefetch={false}
                            rel={
                              liveIsExternal ? "noopener noreferrer" : undefined
                            }
                            style={{
                              backgroundColor: accent,
                            }}
                            target={liveIsExternal ? "_blank" : undefined}
                          >
                            View Live Website
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                              →
                            </span>
                          </Link>
                        </Magnetic>
                        <Magnetic strength={0.2}>
                          <Link
                            aria-label={`View Case Study: ${project.title}`}
                            className="group inline-flex items-center gap-4 rounded-full text-sm font-semibold opacity-90 transition-opacity duration-300 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                            href={`/work/${project.slug}`}
                            prefetch={false}
                            style={{
                              color: accent,
                            }}
                          >
                            <span
                              className="block rounded-full border bg-[var(--work-secondary-cta-bg)] px-5 py-2 shadow-[var(--work-secondary-cta-shadow)] backdrop-blur-md transition-colors duration-300"
                              style={{
                                borderColor: `color-mix(in oklch, ${accent} 28%, var(--work-secondary-cta-border))`,
                              }}
                            >
                              Case Study →
                            </span>
                          </Link>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
