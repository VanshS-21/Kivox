"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { CustomSelect } from "@/components/ui/CustomSelect";

import { Button } from "@/components/ui/Button";
import {
  businessTypeOptions,
  inquirySchema,
  timelineOptions,
  whatYouNeedOptions,
} from "@/features/inquiry/inquiry.schema";
import type { Inquiry, InquiryInput } from "@/features/inquiry/inquiry.types";
import { submitProjectInquiry } from "@/features/inquiry/submitProjectInquiry";
import { contact } from "@/content/pages/contact";
import { motion, AnimatePresence } from "motion/react";

/* ═══════════════════════════════════════════════════════════════════════════
   Impeccable input style — rounded, subtle border, focus glow
   ═══════════════════════════════════════════════════════════════════════════ */

function FormField({
  label,
  error,
  children,
  className,
  id,
  required,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  id: string;
  required?: boolean;
}) {
  const errorId = `${id}-error`;
  return (
    <div className={`flex flex-col gap-2 min-w-0 group ${className || ""}`}>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-[0.8125rem] font-medium tracking-wide text-foreground/80 flex gap-1 transition-colors group-focus-within:text-accent">
          {label} {required && <span className="text-accent">*</span>}
        </label>
      </div>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            id={errorId}
            className="text-xs font-medium text-error flex items-center gap-1 mt-1"
            role="alert"
          >
            <span className="inline-block w-1 h-1 rounded-full bg-error" aria-hidden="true" />
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Clean input style — 1px border, 14px radius, 5% white opacity background */
const getInputStyle = (hasError?: boolean) => [
  "w-full px-5 py-4",
  "bg-foreground/[0.02] hover:bg-foreground/[0.04]",
  "border",
  hasError ? "border-error text-error" : "border-border/50 text-foreground",
  "rounded-[14px]",
  "text-base font-sans shadow-sm",
  "outline-none transition-all duration-300",
  hasError
    ? "focus:border-error focus:ring-4 focus:ring-error/10 focus:bg-transparent"
    : "focus:border-accent focus:ring-4 focus:ring-accent/10 focus:bg-transparent",
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
  const f = contact.form.fields;

  const form = useForm<InquiryInput, unknown, Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "+91 ",
      businessType: "Other",
      whatYouNeed: "A brand new website",
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
    <form className="flex flex-col gap-6 sm:gap-8" onSubmit={form.handleSubmit(onSubmit)} noValidate>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
        <FormField label={f.name.label} error={errors.name?.message} id={fieldId("name")} required>
          <input
            id={fieldId("name")}
            autoComplete="name"
            className={getInputStyle(!!errors.name)}
            disabled={isDisabled}
            placeholder={f.name.placeholder}
            maxLength={100}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? errorId("name") : undefined}
            {...form.register("name")}
          />
        </FormField>
        <FormField label={f.email.label} error={errors.email?.message} id={fieldId("email")} required>
          <input
            id={fieldId("email")}
            autoComplete="email"
            className={getInputStyle(!!errors.email)}
            disabled={isDisabled}
            type="email"
            placeholder={f.email.placeholder}
            maxLength={254}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? errorId("email") : undefined}
            {...form.register("email")}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
        <FormField label={f.phone.label} error={errors.phone?.message} id={fieldId("phone")} required>
          <input
            id={fieldId("phone")}
            autoComplete="tel"
            className={getInputStyle(!!errors.phone)}
            disabled={isDisabled}
            type="tel"
            placeholder={f.phone.placeholder}
            maxLength={20}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? errorId("phone") : undefined}
            {...form.register("phone")}
          />
        </FormField>
        <FormField label={f.businessType.label} error={errors.businessType?.message} id={fieldId("businessType")} required>
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
                placeholder={f.businessType.placeholder}
              />
            )}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
        <FormField label={f.whatYouNeed.label} error={errors.whatYouNeed?.message} id={fieldId("whatYouNeed")} required>
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
                placeholder={f.whatYouNeed.placeholder}
              />
            )}
          />
        </FormField>
        <FormField label={f.timeline.label} error={errors.timeline?.message} id={fieldId("timeline")}>
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
                placeholder={f.timeline.placeholder}
              />
            )}
          />
        </FormField>
      </div>

      <FormField label={f.notes.label} error={errors.notes?.message} id={fieldId("notes")} className="col-span-1 sm:col-span-2">
        <textarea
          id={fieldId("notes")}
          className={`${getInputStyle(!!errors.notes)} min-h-[140px] resize-y py-5`}
          disabled={isDisabled}
          placeholder={f.notes.placeholder}
          maxLength={5000}
          aria-invalid={!!errors.notes}
          aria-describedby={errors.notes ? errorId("notes") : undefined}
          {...form.register("notes")}
        />
      </FormField>

      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between border-t border-border/50 pt-8">
        <Button
          disabled={isDisabled}
          type="submit"
          variant="primary"
          className="group relative overflow-hidden h-12 px-10 text-[0.95rem] font-semibold transition-all duration-300 active:scale-[0.98] shadow-[0_1px_2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_var(--amber-glow)]"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {status.type === "submitting"
              ? contact.form.submit.submitting
              : status.type === "success"
                ? contact.form.submit.success
                : contact.form.submit.idle}
          </span>
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] transition-transform duration-700 ease-in-out group-hover:translate-x-[100%]" />
        </Button>
        <span className="text-[0.8125rem] text-muted-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-success/60 animate-pulse" />
          {contact.form.disclaimer}
        </span>
      </div>

      <div aria-live="polite" aria-atomic="true">
        <AnimatePresence>
          {status.type === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="rounded-[14px] border border-error/20 bg-error/5 text-error px-5 py-4 text-sm break-words flex items-start gap-3"
              role="alert"
            >
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{status.message} {contact.form.status.errorSuffix}</span>
            </motion.div>
          )}

          {status.type === "success" && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="rounded-[14px] border border-success/20 bg-success/5 text-success px-5 py-4 text-sm flex items-start gap-3"
              role="status"
            >
              <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>{contact.form.status.success}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
