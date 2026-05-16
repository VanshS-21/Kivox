"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { easeOutExpo } from "@/lib/motion";

import { Button } from "@/components/ui/Button";
import {
  businessTypeOptions,
  inquirySchema,
  timelineOptions,
  whatYouNeedOptions,
} from "@/features/inquiry/inquiry.schema";
import type { Inquiry, InquiryInput } from "@/features/inquiry/inquiry.types";
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
  id,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  id: string;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm uppercase tracking-widest font-mono font-medium text-muted-foreground">
          {label}
        </label>
        {error && (
          <span id={errorId} className="text-xs text-error" role="alert">
            {error}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/** Clean input style — bottom border only, transparent background */
const inputStyle = [
  "w-full px-0 py-4",
  "bg-transparent",
  "border-0 border-b border-border",
  "studio-h3-sans text-foreground",
  "outline-none transition-colors duration-200",
  "focus:border-accent focus:bg-accent-muted/50",
  "placeholder:text-muted-foreground/40",
  "disabled:opacity-50 disabled:pointer-events-none",
].join(" ");



export function InquiryForm() {
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<
    { type: "idle" } | { type: "submitting" } | { type: "success" } | { type: "error"; message: string }
  >({ type: "idle" });

  const uid = useId();
  const fieldId = (name: string) => `${uid}-${name}`;
  const errorId = (name: string) => `${uid}-${name}-error`;

  const form = useForm<InquiryInput, any, Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessType: "Other",
      whatYouNeed: "Website",
      timeline: undefined,
      notes: "",
    },
    mode: "onTouched",
  });

  const errors = form.formState.errors;

  useEffect(() => {
    // Set the anti-bot cookie so the server knows when the user started filling the form
    document.cookie = `kivox_inquiry_started_at=${Date.now()}; path=/; max-age=86400; SameSite=Strict`;
  }, []);

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
    <form className="flex flex-col gap-10" onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {/* Honeypot */}
      <input
        autoComplete="off"
        className="hidden"
        name="company"
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        value={hp}
        aria-hidden="true"
      />

      {/* Row 1: Name + Email */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8"
      >
        <FormField label="Name" error={errors.name?.message} id={fieldId("name")}>
          <input
            id={fieldId("name")}
            autoComplete="name"
            className={inputStyle}
            disabled={isDisabled}
            placeholder="Full name"
            maxLength={100}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? errorId("name") : undefined}
            {...form.register("name")}
          />
        </FormField>
        <FormField label="Email" error={errors.email?.message} id={fieldId("email")}>
          <input
            id={fieldId("email")}
            autoComplete="email"
            className={inputStyle}
            disabled={isDisabled}
            type="email"
            placeholder="Email address"
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? errorId("email") : undefined}
            {...form.register("email")}
          />
        </FormField>
      </motion.div>

      {/* Row 2: Phone + Business type */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.06 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8"
      >
        <FormField label="Phone" error={errors.phone?.message} id={fieldId("phone")}>
          <input
            id={fieldId("phone")}
            autoComplete="tel"
            className={inputStyle}
            disabled={isDisabled}
            type="tel"
            placeholder="Phone number"
            maxLength={20}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            {...form.register("phone")}
          />
        </FormField>
        <FormField label="Business type" error={errors.businessType?.message} id={fieldId("businessType")}>
          <Controller
            name="businessType"
            control={form.control}
            render={({ field }) => (
              <CustomSelect
                id={fieldId("businessType")}
                value={field.value}
                onChange={field.onChange}
                options={businessTypeOptions}
                disabled={isDisabled}
                hasError={!!errors.businessType}
                placeholder="Select business type"
              />
            )}
          />
        </FormField>
      </motion.div>

      {/* Row 3: What you need + Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.12 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8"
      >
        <FormField label="What you need" error={errors.whatYouNeed?.message} id={fieldId("whatYouNeed")}>
          <Controller
            name="whatYouNeed"
            control={form.control}
            render={({ field }) => (
              <CustomSelect
                id={fieldId("whatYouNeed")}
                value={field.value}
                onChange={field.onChange}
                options={whatYouNeedOptions}
                disabled={isDisabled}
                hasError={!!errors.whatYouNeed}
                placeholder="Select an option"
              />
            )}
          />
        </FormField>
        <FormField label="Timeline (optional)" error={errors.timeline?.message} id={fieldId("timeline")}>
          <Controller
            name="timeline"
            control={form.control}
            render={({ field }) => (
              <CustomSelect
                id={fieldId("timeline")}
                value={field.value}
                onChange={field.onChange}
                options={timelineOptions}
                disabled={isDisabled}
                hasError={!!errors.timeline}
                placeholder="Choose a timeline"
              />
            )}
          />
        </FormField>
      </motion.div>

      {/* Full-width fields */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.18 }}
      >
      <FormField label="Notes (optional)" error={errors.notes?.message} id={fieldId("notes")}>
        <textarea
          id={fieldId("notes")}
          className={`${inputStyle} min-h-32 py-4 resize-y`}
          disabled={isDisabled}
          placeholder="Project details, scope, or any helpful context..."
          maxLength={5000}
          aria-invalid={!!errors.notes}
          aria-describedby={errors.notes ? errorId("notes") : undefined}
          {...form.register("notes")}
        />
      </FormField>
      </motion.div>

      {/* Submit row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.36 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-4"
      >
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
      </motion.div>

      {/* Status messages — aria-live for screen reader announcements */}
      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {status.type === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.3, ease: easeOutExpo }}
              className="rounded-xl border border-error/20 bg-error/5 text-error px-5 py-4 text-base"
              role="alert"
            >
              {status.message} Please try again, or reach us at kivox.contact@gmail.com.
            </motion.div>
          )}

          {status.type === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.4, ease: easeOutExpo }}
              className="rounded-xl border border-success/20 bg-success/5 text-success px-5 py-4 text-base"
              role="status"
            >
              Received. We&apos;ll reply within 24 hours with next steps.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

