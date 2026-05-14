"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { work } from "@/content/pages/work";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ProjectCarousel } from "@/components/ui/ProjectCarousel";
import { easeOutExpo, easeOutQuint, viewportOnce } from "@/lib/motion";

/* ── Project meta ── */

const projectColors: Record<string, string> = {
  hospital: "var(--project-hospital)",
  cafe: "var(--project-cafe)",
  hotel: "var(--project-hotel)",
  school: "var(--project-school)",
  fitness: "var(--project-fitness)",
};

const projectTags: Record<string, string[]> = {
  hospital: ["STRATEGY", "DESIGN", "DEVELOPMENT"],
  cafe: ["BRANDING", "DESIGN", "DEVELOPMENT"],
  hotel: ["STRATEGY", "DESIGN", "ENGINEERING"],
  school: ["UX RESEARCH", "DESIGN", "DEVELOPMENT"],
  fitness: ["DESIGN", "DEVELOPMENT", "BRANDING"],
};

/* ── Typed project shape ── */
interface Project {
  id: string;
  title: string;
  label: string;
  image: string;
  images?: string[];
  href: string;
  demonstrates: string;
  challenge?: string;
  approach?: string;
  targetAudience?: string[];
  primaryActions?: string[];
  coreSections?: string[];
  uxDecisions?: string[];
}

/* ── Page ── */

export default function WorkPage() {
  const reduce = useReducedMotion();

  return (
    <div className="bg-background min-h-screen">
      {/* ── Hero header ── */}
      <Section className="pt-32 lg:pt-40 pb-16 lg:pb-24 relative overflow-hidden" spacing="none">
        {/* Ambient glow */}
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none"
          style={{ background: "var(--accent)", opacity: "calc(var(--hero-glow-opacity) * 0.4)" }}
        />

        <Container>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutQuint }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="studio-eyebrow text-accent">[ {work.label} ]</span>
            </div>

            <h1
              className="font-sans font-bold text-foreground mb-6"
              style={{ fontSize: "clamp(2.5rem, 4vw + 1rem, 5rem)", lineHeight: 1.06, letterSpacing: "-0.025em" }}
            >
              Our{" "}
              <em className="font-serif font-normal text-accent" style={{ fontStyle: "italic" }}>
                Showcase.
              </em>
            </h1>

            <p className="studio-body-serif text-muted-foreground max-w-xl">{work.intro}</p>
          </motion.div>
        </Container>

        {/* Decorative divider */}
        <Container>
          <motion.div
            initial={reduce ? false : { scaleX: 0 }}
            animate={reduce ? undefined : { scaleX: 1 }}
            transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.5 }}
            className="mt-12 lg:mt-16 h-px bg-border origin-left"
          />
        </Container>
      </Section>

      {/* ── Case Study Sections ── */}
      {work.items.map((item, idx) => {
        const project = item as Project;
        const color = projectColors[project.id] || "var(--accent)";
        const tags = projectTags[project.id] || ["DESIGN", "DEVELOPMENT"];
        const num = String(idx + 1).padStart(2, "0");

        return (
          <section key={project.id} className="relative">
            <Container>
              <div className="py-16 lg:py-24">
                {/* ── Header row: number + category + tags ── */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, ease: easeOutExpo }}
                  className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 lg:mb-8"
                >
                  <span
                    className="text-lg font-mono font-bold studio-tabular"
                    style={{ color }}
                  >
                    {num}
                  </span>
                  <span className="studio-eyebrow text-muted-foreground">{project.label}</span>
                  <span className="hidden sm:block text-muted-foreground opacity-30">·</span>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 studio-tag text-subtle-foreground">
                    {tags.map((tag, tagIdx) => (
                      <span key={tag} className="flex items-center gap-3">
                        {tagIdx > 0 && <span className="opacity-40">·</span>}
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* ── Project title ── */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.05 }}
                  className="mb-8 lg:mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-8"
                >
                  <h2
                    className="font-sans font-bold text-foreground"
                    style={{
                      fontSize: "clamp(2rem, 3vw + 0.5rem, 3.5rem)",
                      lineHeight: 1.08,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {project.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <em
                      className="font-serif font-normal"
                      style={{ fontStyle: "italic", color }}
                    >
                      {project.title.split(" ").slice(-1)[0]}.
                    </em>
                  </h2>

                  {/* CTA pill */}
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full border text-sm font-semibold tracking-wide transition-all duration-300 shrink-0 w-fit group/cta hover:bg-accent hover:border-accent hover:text-[var(--bg-primary)]"
                    style={{
                      borderColor: `color-mix(in oklch, ${color}, transparent 50%)`,
                      color,
                    }}
                  >
                    View Showcase
                    <span className="inline-block transition-transform duration-300 group-hover/cta:translate-x-1">→</span>
                  </Link>
                </motion.div>

                {/* ── Project image carousel ── */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.08 }}
                  className="mb-12 lg:mb-16"
                >
                  <ProjectCarousel
                    images={project.images || [project.image]}
                    alt={`${project.title}: Kivox showcase`}
                    accentColor={color}
                    priority={idx === 0}
                  />
                </motion.div>

                {/* ── One-liner ── */}
                <motion.p
                  initial={reduce ? false : { opacity: 0, y: 12 }}
                  whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.05 }}
                  className="studio-body-serif text-muted-foreground max-w-2xl mb-10 lg:mb-14"
                >
                  {project.demonstrates}
                </motion.p>

                {/* ── Challenge / Approach — two-column editorial ── */}
                {(project.challenge || project.approach) && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.08 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 mb-12 lg:mb-16"
                  >
                    {project.challenge && (
                      <div>
                        <span className="studio-eyebrow block mb-3" style={{ color }}>
                          The Challenge
                        </span>
                        <p className="text-base leading-[1.75] text-muted-foreground">
                          {project.challenge}
                        </p>
                      </div>
                    )}
                    {project.approach && (
                      <div>
                        <span className="studio-eyebrow block mb-3" style={{ color }}>
                          Our Approach
                        </span>
                        <p className="text-base leading-[1.75] text-muted-foreground">
                          {project.approach}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* ── Structured data grid ── */}
                {(project.targetAudience || project.primaryActions || project.coreSections) && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.12 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-10 lg:mb-14"
                  >
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
                  </motion.div>
                )}

                {/* ── UX decisions — inline list ── */}
                {project.uxDecisions && project.uxDecisions.length > 0 && (
                  <motion.div
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.15 }}
                    className="flex flex-wrap items-start gap-x-8 gap-y-3"
                  >
                    <span className="studio-eyebrow text-subtle-foreground shrink-0 pt-0.5">
                      UX Decisions
                    </span>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {project.uxDecisions.map((decision) => (
                        <span
                          key={decision}
                          className="text-sm text-muted-foreground leading-relaxed"
                        >
                          {decision}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Section divider */}
              {idx < work.items.length - 1 && (
                <motion.div
                  className="h-px origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${color}, var(--border) 40%, transparent)`,
                  }}
                  initial={reduce ? false : { scaleX: 0 }}
                  whileInView={reduce ? undefined : { scaleX: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 1, ease: easeOutExpo }}
                />
              )}
            </Container>
          </section>
        );
      })}
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
      <span className="studio-eyebrow block mb-3" style={{ color }}>
        {label}
      </span>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-base text-muted-foreground leading-snug">
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
