import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  Eye,
  Layers3,
  MousePointerClick,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { work } from "@/content/pages/work";
import {
  getAllProjects,
  projectColors,
  projectTags,
  type ProjectMeta,
} from "@/lib/work";

type AccentStyle = CSSProperties & {
  "--project-accent": string;
};

type ProjectProof = {
  artifact: string;
  audience: string;
  proof: string;
  question: string;
};

const projectProof: Record<string, ProjectProof> = {
  hospital: {
    artifact: "Search, doctor profiles, booking, patient dashboard",
    audience: "Patients and clinics",
    proof:
      "Doctor discovery designed around confidence, not another long directory.",
    question: "Can a patient book without calling three clinics first?",
  },
  cafe: {
    artifact: "Menu, hours, location, specials, mobile visit flow",
    audience: "Neighborhood cafe visitors",
    proof:
      "A cafe website built for someone deciding where to go right now.",
    question: "Can the menu, hours, and location answer the visit decision fast?",
  },
  hotel: {
    artifact: "Rooms, policy clarity, direct booking, concierge contact",
    audience: "Boutique hotel guests",
    proof:
      "A direct-booking experience that feels safer than a third-party listing.",
    question: "Can room details and policies earn the booking on the hotel site?",
  },
  school: {
    artifact: "Programs, admissions timeline, parent inquiry path",
    audience: "Prospective families",
    proof:
      "An admissions-first school site for parents comparing serious options.",
    question: "Can a parent understand fit, fees, and next steps without calling?",
  },
  fitness: {
    artifact: "Services, weekly schedule, pricing, trial booking",
    audience: "Trial-ready fitness visitors",
    proof:
      "A fitness site that respects comparison shoppers with real logistics.",
    question: "Can someone see the offer, timings, and price before a sales call?",
  },
};

const readingSteps = [
  {
    title: "Open the live website",
    body: "Feel the first impression, mobile rhythm, and conversion path the way a real visitor would.",
  },
  {
    title: "Read the case study",
    body: "Check the strategy, tradeoffs, and design decisions behind the visible interface.",
  },
  {
    title: "Look across industries",
    body: "The range matters because a clinic, cafe, school, hotel, and gym should not share one template.",
  },
];

export default function WorkPage() {
  const allProjects = getAllProjects();
  const leadProject =
    allProjects.find((project) => project.slug === "cafe") ?? allProjects[0];

  return (
    <div className="min-h-screen bg-background">
      <Section
        className="overflow-hidden border-b border-border pt-32 pb-14 lg:pt-40 lg:pb-20"
        spacing="none"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(circle at 78% 18%, color-mix(in oklch, var(--accent) 13%, transparent), transparent 34%), linear-gradient(90deg, var(--border-soft) 1px, transparent 1px), linear-gradient(180deg, var(--border-soft) 1px, transparent 1px)",
            backgroundSize: "auto, 88px 88px, 88px 88px",
          }}
        />

        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.72fr)] lg:items-end">
            <div className="max-w-4xl">
              <p className="studio-eyebrow mb-5 text-accent">
                [ {work.label} ]
              </p>
              <h1 className="studio-h1-headline max-w-4xl text-foreground">
                Kivox work, shown as working websites.
              </h1>
              <div className="mt-6 max-w-2xl space-y-4">
                <p className="studio-lede">{work.intro}</p>
                <p className="studio-body text-muted-foreground">
                  These are concept projects, not borrowed client logos. The
                  proof is in the live journeys, the case studies, and the way
                  each business problem gets its own shape.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 min-[420px]:flex-row">
                <a
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-28px_var(--accent)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  href="#project-ledger"
                >
                  <Eye aria-hidden="true" size={17} strokeWidth={2} />
                  See the Websites
                </a>
                <Link
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-5 text-sm font-semibold text-foreground transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  href="/contact"
                  prefetch={false}
                >
                  <MousePointerClick
                    aria-hidden="true"
                    size={17}
                    strokeWidth={2}
                  />
                  Book a Free Call
                </Link>
              </div>
            </div>

            <ProofMap projects={allProjects} />
          </div>
        </Container>
      </Section>

      <Section className="border-b border-border bg-surface-alt" spacing="tight">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.72fr_1fr_1fr_1fr] lg:items-start">
            <div>
              <p className="studio-eyebrow mb-3 text-accent">
                [ Read the Work ]
              </p>
              <h2 className="studio-h3-sans max-w-sm text-foreground">
                Start with the site, then inspect the thinking.
              </h2>
            </div>
            {readingSteps.map((step, index) => (
              <div
                className="border-t border-border-strong pt-4 lg:min-h-32"
                key={step.title}
              >
                <span className="studio-tag studio-tabular text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 studio-body-small text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="overflow-hidden" spacing="default">
        <Container>
          <FeaturedProject project={leadProject} />
        </Container>
      </Section>

      <Section
        className="scroll-mt-28 border-y border-border bg-surface-alt"
        id="project-ledger"
        spacing="default"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-14">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="studio-eyebrow mb-4 text-accent">
                [ Project Ledger ]
              </p>
              <h2 className="studio-h2-editorial text-foreground">
                Five business problems, five different website systems.
              </h2>
              <p className="mt-5 studio-body text-muted-foreground">
                The shape changes because the visitor changes. A parent, a
                patient, a hotel guest, a gym shopper, and a cafe regular do
                not need the same page with swapped colors.
              </p>
            </div>

            <div className="space-y-6">
              {allProjects.map((project, index) => (
                <ProjectRow
                  index={index}
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-elevated p-6 shadow-rest sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <p className="studio-eyebrow mb-4 text-accent">
                  [ Your Project ]
                </p>
                <h2 className="studio-h2-editorial max-w-3xl text-foreground">
                  Want a website built around your buyer&apos;s real questions?
                </h2>
                <p className="mt-5 max-w-2xl studio-body text-muted-foreground">
                  Bring us the messy context: the questions people ask, the
                  places they drop off, and the actions that actually matter.
                  We will turn that into a clear path people can trust.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[420px]:flex-row lg:justify-end">
                <Link
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-28px_var(--accent)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  href="/contact"
                  prefetch={false}
                >
                  <MousePointerClick
                    aria-hidden="true"
                    size={17}
                    strokeWidth={2}
                  />
                  Book a Free Call
                </Link>
                <Link
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-5 text-sm font-semibold text-foreground transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  href="/#services"
                  prefetch={false}
                >
                  <Layers3 aria-hidden="true" size={17} strokeWidth={2} />
                  See Services
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

function ProofMap({ projects }: { projects: ProjectMeta[] }) {
  return (
    <aside className="studio-surface studio-surface--quiet p-5 shadow-rest sm:p-6">
      <div className="relative z-10">
        <p className="studio-eyebrow mb-4 text-accent">[ Proof Map ]</p>
        <div className="space-y-3">
          {projects.map((project, index) => {
            const accent = getProjectAccent(project);
            const proof = getProjectProof(project);

            return (
              <a
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 rounded-[var(--radius-sm)] border border-border bg-surface/50 p-3 transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-[color:var(--project-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                href={`#${project.slug}-proof`}
                key={project.slug}
                style={{ "--project-accent": accent } as AccentStyle}
              >
                <span
                  className="studio-tag studio-tabular"
                  style={{ color: accent }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-foreground">
                    {project.title}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {proof.audience}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  size={17}
                  strokeWidth={2}
                />
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

function FeaturedProject({ project }: { project: ProjectMeta }) {
  const accent = getProjectAccent(project);
  const proof = getProjectProof(project);
  const live = getLiveDestination(project);

  return (
    <article
      className="grid overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-elevated shadow-strong lg:grid-cols-[1.05fr_0.95fr]"
      style={{ "--project-accent": accent } as AccentStyle}
    >
      <Link
        aria-label={`Open live website for ${project.title}`}
        className="group relative block min-h-[300px] overflow-hidden bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:min-h-[420px] lg:min-h-full"
        href={live.href}
        prefetch={false}
        rel={live.external ? "noopener noreferrer" : undefined}
        target={live.external ? "_blank" : undefined}
      >
        <Image
          alt={`${project.title} website screen`}
          className="object-cover object-left-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.035]"
          fill
          priority
          sizes="(max-width: 1023px) 92vw, 54vw"
          src={project.images?.[0] ?? project.image}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 46%, color-mix(in oklch, var(--project-accent) 28%, var(--bg-primary)) 130%)",
          }}
        />
      </Link>

      <div className="relative flex min-h-[420px] flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div>
          <p className="studio-eyebrow mb-4" style={{ color: accent }}>
            [ Start Here ]
          </p>
          <h2 className="studio-h2-editorial text-foreground">
            {project.title} shows how fast proof can feel.
          </h2>
          <p className="mt-5 studio-body text-muted-foreground">
            {proof.proof}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="border-t border-border pt-5">
            <p className="studio-tag text-subtle-foreground">
              Visitor question
            </p>
            <p className="mt-2 text-lg font-semibold leading-snug text-foreground">
              {proof.question}
            </p>
          </div>

          <ProjectActions accent={accent} project={project} />
        </div>
      </div>
    </article>
  );
}

function ProjectRow({
  index,
  project,
}: {
  index: number;
  project: ProjectMeta;
}) {
  const accent = getProjectAccent(project);
  const proof = getProjectProof(project);
  const tags = projectTags[project.slug] ?? project.services.slice(0, 3);
  const live = getLiveDestination(project);

  return (
    <article
      className="group scroll-mt-28 overflow-hidden rounded-[var(--radius-lg)] border border-border-strong bg-elevated shadow-rest transition-all duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-hover"
      id={`${project.slug}-proof`}
      style={{ "--project-accent": accent } as AccentStyle}
    >
      <div className="grid lg:grid-cols-[minmax(280px,0.82fr)_1fr]">
        <Link
          aria-label={`Open live website for ${project.title}`}
          className="relative block aspect-[16/11] overflow-hidden bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background lg:aspect-auto lg:min-h-[430px]"
          href={live.href}
          prefetch={false}
          rel={live.external ? "noopener noreferrer" : undefined}
          target={live.external ? "_blank" : undefined}
        >
          <Image
            alt={`${project.title} website preview`}
            className="object-cover object-left-top transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.035]"
            fill
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(max-width: 1023px) 92vw, 35vw"
            src={project.images?.[1] ?? project.image}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-75"
            style={{
              background:
                "linear-gradient(180deg, transparent 45%, color-mix(in oklch, var(--project-accent) 30%, var(--bg-primary)) 128%)",
            }}
          />
          <span
            className="absolute left-4 top-4 rounded-full border bg-[color-mix(in_oklch,var(--bg-elevated)_82%,transparent)] px-3 py-1.5 studio-tag backdrop-blur-sm"
            style={{
              borderColor:
                "color-mix(in oklch, var(--project-accent) 40%, var(--border))",
              color: accent,
            }}
          >
            Live demo
          </span>
        </Link>

        <div className="flex min-h-[430px] flex-col justify-between p-5 sm:p-7 lg:p-8">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className="studio-tag studio-tabular"
                style={{ color: accent }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="studio-tag text-subtle-foreground">
                Studio demonstration
              </span>
            </div>

            <h3 className="studio-h3-sans text-foreground">{project.title}</h3>
            <p className="mt-3 studio-body text-muted-foreground">
              {proof.proof}
            </p>

            <div className="mt-7 grid gap-5 border-t border-border pt-5 sm:grid-cols-2">
              <div>
                <p className="studio-tag text-subtle-foreground">
                  The business question
                </p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground">
                  {proof.question}
                </p>
              </div>
              <div>
                <p className="studio-tag text-subtle-foreground">
                  Built surface
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {proof.artifact}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 3).map((tag) => (
                <span
                  className="rounded-full border px-3 py-1.5 studio-tag text-muted-foreground"
                  key={tag}
                  style={{
                    borderColor:
                      "color-mix(in oklch, var(--project-accent) 28%, var(--border))",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <ProjectActions accent={accent} project={project} />
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectActions({
  accent,
  project,
}: {
  accent: string;
  project: ProjectMeta;
}) {
  const live = getLiveDestination(project);

  return (
    <div className="flex flex-col gap-3 min-[430px]:flex-row">
      <Link
        aria-label={`View live website: ${project.title}`}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold text-[var(--work-primary-cta-fg)] shadow-[0_18px_40px_-28px_var(--project-accent)] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        href={live.href}
        prefetch={false}
        rel={live.external ? "noopener noreferrer" : undefined}
        style={{ backgroundColor: accent }}
        target={live.external ? "_blank" : undefined}
      >
        <Eye aria-hidden="true" size={17} strokeWidth={2} />
        Live Website
      </Link>
      <Link
        aria-label={`Read case study: ${project.title}`}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border bg-surface px-5 text-sm font-semibold text-foreground transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        href={`/work/${project.slug}`}
        prefetch={false}
        style={{
          borderColor:
            "color-mix(in oklch, var(--project-accent) 32%, var(--border))",
        }}
      >
        <BookOpenText aria-hidden="true" size={17} strokeWidth={2} />
        Case Study
      </Link>
    </div>
  );
}

function getProjectAccent(project: ProjectMeta) {
  return projectColors[project.slug] ?? "var(--accent)";
}

function getProjectProof(project: ProjectMeta) {
  return (
    projectProof[project.slug] ?? {
      artifact: project.services.join(", "),
      audience: project.clientType,
      proof: project.demonstrates,
      question: "Can the website make the next action obvious?",
    }
  );
}

function getLiveDestination(project: ProjectMeta) {
  const href = project.liveUrl ?? `/work/${project.slug}`;

  return {
    external: !href.startsWith("/"),
    href,
  };
}
