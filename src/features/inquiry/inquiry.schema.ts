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
  "A brand new website",
  "Redesign my current website",
  "Get more traffic (SEO)",
  "A custom web application",
  "Logo & Brand identity",
  "Something else",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "In the next few weeks",
  "In a month or two",
  "I'm not in a rush",
] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().refine((val) => {
    // Remove optional +91 prefix and all spaces/hyphens
    const numberPart = val.replace(/^(\+91)?/, "").replace(/[\s-]/g, "");
    // Ensure exactly 10 digits remaining, starting with 6, 7, 8, or 9
    return /^[6-9]\d{9}$/.test(numberPart);
  }, "Please enter a valid 10-digit Indian phone number"),
  businessType: z.enum(businessTypeOptions),
  whatYouNeed: z.enum(whatYouNeedOptions),
  timeline: z.enum(timelineOptions).or(z.literal("")).optional().transform(val => val === "" ? undefined : val),
  notes: z.string().trim().max(5000).optional(),
});

export const inquirySubmissionSchema = z.object({
  data: inquirySchema,
  hp: z.string().optional(),
  startedAtMs: z.number().int().optional(),
});

