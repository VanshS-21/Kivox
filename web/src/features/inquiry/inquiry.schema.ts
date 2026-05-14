import { z } from "zod";

export const businessTypeOptions = [
  "Hospital / Healthcare",
  "Restaurant / Cafe",
  "Hotel / Hospitality",
  "School / Education",
  "Fitness / Wellness",
  "Other",
] as const;

export const whatYouNeedOptions = [
  "Website",
  "Web app",
  "Redesign",
  "SEO",
  "Brand identity",
  "Backend-enabled system",
  "Android app",
] as const;

export const timelineOptions = [
  "ASAP",
  "2–4 weeks",
  "1–2 months",
  "2–3 months",
  "Not sure yet",
] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().min(6, "Please enter a valid phone number"),
  businessType: z.enum(businessTypeOptions),
  whatYouNeed: z.enum(whatYouNeedOptions),
  primaryGoal: z.string().trim().min(4, "Tell us what should improve when this goes live"),
  currentUrl: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || v.startsWith("http://") || v.startsWith("https://"), {
      message: "Enter a valid URL (include https://)",
    }),
  timeline: z.enum(timelineOptions).optional(),
  notes: z.string().trim().max(5000).optional(),
});

export const inquirySubmissionSchema = z.object({
  data: inquirySchema,
  hp: z.string().optional(),
  startedAtMs: z.number().int().optional(),
});

