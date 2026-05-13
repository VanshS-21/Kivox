"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import {
  businessTypeOptions,
  inquirySchema,
  timelineOptions,
  whatYouNeedOptions,
} from "@/features/inquiry/inquiry.schema";
import type { Inquiry } from "@/features/inquiry/inquiry.types";
import { submitProjectInquiry } from "@/features/inquiry/submitProjectInquiry";

/* ═══════════════════════════════════════════════════════════════════════════
   Floating-label field — editorial form treatment
   Input sits on a subtle bottom border, label floats above on focus/fill.
   ═══════════════════════════════════════════════════════════════════════════ */

function FormField({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      <div className="flex items-center justify-between gap-4">
        <label className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
          {label}
        </label>
        {error && (
          <span className="text-xs text-red-500 dark:text-red-400">{error}</span>
        )}
      </div>
      {children}
    </div>
  );
}

/** Clean input style — bottom border only, transparent background */
const inputStyle = [
  "w-full h-12 px-0 py-3",
  "bg-transparent",
  "border-0 border-b border-border",
  "text-sm text-foreground",
  "outline-none transition-colors duration-200",
  "focus:border-accent",
  "placeholder:text-muted-foreground/40",
  "disabled:opacity-50 disabled:pointer-events-none",
].join(" ");

/** Select style — matching the input but with a subtle dropdown arrow */
const selectStyle = [
  "w-full h-12 px-0 py-3",
  "bg-transparent",
  "border-0 border-b border-border",
  "text-sm text-foreground",
  "outline-none transition-colors duration-200",
  "focus:border-accent",
  "disabled:opacity-50 disabled:pointer-events-none",
  "appearance-none cursor-pointer",
  // Custom dropdown arrow via background-image
  "bg-no-repeat bg-[length:16px_16px]",
  "bg-[position:right_0_center]",
  "pr-6",
].join(" ");

const selectArrow = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E")`,
};

export function InquiryForm() {
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<
    { type: "idle" } | { type: "submitting" } | { type: "success" } | { type: "error"; message: string }
  >({ type: "idle" });

  const form = useForm<Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessType: "Other",
      whatYouNeed: "Website",
      primaryGoal: "",
      currentUrl: "",
      timeline: undefined,
      notes: "",
    },
    mode: "onTouched",
  });

  async function onSubmit(values: Inquiry) {
    setStatus({ type: "submitting" });
    try {
      await submitProjectInquiry({
        data: values,
        hp,
      });
      setStatus({ type: "success" });
      form.reset();
      setHp("");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Submission failed";
      setStatus({ type: "error", message });
    }
  }

  const isDisabled = status.type === "submitting" || status.type === "success";

  return (
    <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)}>
      {/* Honeypot */}
      <input
        autoComplete="off"
        className="hidden"
        name="company"
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        value={hp}
      />

      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
        <FormField label="Name" error={form.formState.errors.name?.message}>
          <input
            autoComplete="name"
            className={inputStyle}
            disabled={isDisabled}
            placeholder="Your full name"
            {...form.register("name")}
          />
        </FormField>
        <FormField label="Email" error={form.formState.errors.email?.message}>
          <input
            autoComplete="email"
            className={inputStyle}
            disabled={isDisabled}
            type="email"
            placeholder="you@company.com"
            {...form.register("email")}
          />
        </FormField>
      </div>

      {/* Row 2: Phone + Business type */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
        <FormField label="Phone" error={form.formState.errors.phone?.message}>
          <input
            autoComplete="tel"
            className={inputStyle}
            disabled={isDisabled}
            type="tel"
            placeholder="+91 ..."
            {...form.register("phone")}
          />
        </FormField>
        <FormField label="Business type" error={form.formState.errors.businessType?.message}>
          <select
            className={selectStyle}
            style={selectArrow}
            disabled={isDisabled}
            {...form.register("businessType")}
          >
            {businessTypeOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Row 3: What you need + Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8">
        <FormField label="What you need" error={form.formState.errors.whatYouNeed?.message}>
          <select
            className={selectStyle}
            style={selectArrow}
            disabled={isDisabled}
            {...form.register("whatYouNeed")}
          >
            {whatYouNeedOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Timeline (optional)" error={form.formState.errors.timeline?.message}>
          <select
            className={selectStyle}
            style={selectArrow}
            disabled={isDisabled}
            {...form.register("timeline")}
          >
            <option value="">Select</option>
            {timelineOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* Full-width fields */}
      <FormField label="Primary goal" error={form.formState.errors.primaryGoal?.message}>
        <input
          className={inputStyle}
          disabled={isDisabled}
          placeholder="What should improve when this is live?"
          {...form.register("primaryGoal")}
        />
      </FormField>

      <FormField label="Current website/app (optional)" error={form.formState.errors.currentUrl?.message}>
        <input
          className={inputStyle}
          disabled={isDisabled}
          placeholder="https://"
          {...form.register("currentUrl")}
        />
      </FormField>

      <FormField label="Notes (optional)" error={form.formState.errors.notes?.message}>
        <textarea
          className={`${inputStyle} min-h-32 py-4 resize-y`}
          disabled={isDisabled}
          placeholder="Anything else we should know — timeline, budget, inspiration..."
          {...form.register("notes")}
        />
      </FormField>

      {/* Submit row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4">
        <Button
          disabled={isDisabled}
          type="submit"
          variant="primary"
          className="px-10 py-3.5 text-sm font-semibold"
        >
          {status.type === "submitting"
            ? "Sending…"
            : status.type === "success"
              ? "Sent ✓"
              : "Send inquiry →"}
        </Button>
        <span className="text-xs text-muted-foreground">
          We reply within 24 hours with next steps.
        </span>
      </div>

      {/* Status messages */}
      {status.type === "error" && (
        <div className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 text-red-900 dark:text-red-200 px-5 py-4 text-sm">
          {status.message}
        </div>
      )}

      {status.type === "success" && (
        <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 px-5 py-4 text-sm">
          Received. We&apos;ll reply within 24 hours with next steps.
        </div>
      )}
    </form>
  );
}
