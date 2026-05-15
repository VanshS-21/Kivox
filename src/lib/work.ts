import { cafe } from "@/content/work/cafe";
import { fitness } from "@/content/work/fitness";
import { hospital } from "@/content/work/hospital";
import { hotel } from "@/content/work/hotel";
import { school } from "@/content/work/school";

export interface ProjectMeta {
  slug: string;
  title: string;
  label: string;
  image: string;
  images?: string[];
  liveUrl?: string; // Optional URL to the live site or static showcase page
  demonstrates: string;
  challenge?: string;
  approach?: string;
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
  hospital: ["STRATEGY", "DESIGN", "DEVELOPMENT"],
  cafe: ["BRANDING", "DESIGN", "DEVELOPMENT"],
  hotel: ["STRATEGY", "DESIGN", "ENGINEERING"],
  school: ["UX RESEARCH", "DESIGN", "DEVELOPMENT"],
  fitness: ["DESIGN", "DEVELOPMENT", "BRANDING"],
};
