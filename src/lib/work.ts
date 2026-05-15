import { cafe } from "@/content/work/cafe";
import { fitness } from "@/content/work/fitness";
import { hospital } from "@/content/work/hospital";
import { hotel } from "@/content/work/hotel";
import { school } from "@/content/work/school";

/* ── Sub-types for deep case study content ── */

export interface ProcessPhase {
  phase: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface DesignDecision {
  title: string;
  rationale: string;
}

export interface ResultMetric {
  value: string;
  label: string;
  context?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

/* ── Primary project type ── */

export interface ProjectMeta {
  slug: string;
  title: string;
  subtitle: string;
  label: string;
  image: string;
  images?: string[];
  liveUrl?: string;
  demonstrates: string;
  year: string;
  duration: string;
  clientType: string;
  services: string[];
  challenge?: string;
  insight?: string;
  approach?: string;
  process?: ProcessPhase[];
  designPhilosophy?: string;
  keyDesignDecisions?: DesignDecision[];
  results?: ResultMetric[];
  testimonial?: Testimonial;
  techStack?: string[];
  targetAudience?: string[];
  primaryActions?: string[];
  coreSections?: string[];
  uxDecisions?: string[];
  proofNotes?: string[];
}

// Ensure the data conforms to the ProjectMeta type
const rawProjects = [hospital, cafe, hotel, school, fitness] as unknown as ProjectMeta[];

export function getAllProjects(): ProjectMeta[] {
  return rawProjects;
}

export function getProjectBySlug(slug: string): ProjectMeta | null {
  return rawProjects.find((p) => p.slug === slug) || null;
}

export const projectColors: Record<string, string> = {
  hospital: "var(--project-hospital)",
  cafe: "var(--project-cafe)",
  hotel: "var(--project-hotel)",
  school: "var(--project-school)",
  fitness: "var(--project-fitness)",
};

export const projectTags: Record<string, string[]> = {
  hospital: ["PRODUCT STRATEGY", "UX RESEARCH", "INTERFACE DESIGN"],
  cafe: ["BRAND IDENTITY", "WEB DESIGN", "PERFORMANCE"],
  hotel: ["BRAND STRATEGY", "VISUAL DESIGN", "DEVELOPMENT"],
  school: ["UX RESEARCH", "TRUST ARCHITECTURE", "DEVELOPMENT"],
  fitness: ["BRAND SYSTEM", "DARK UI", "LEAD GENERATION"],
};
