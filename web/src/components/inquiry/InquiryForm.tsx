"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Field, inputBase } from "@/components/ui/Field";
import { Panel } from "@/components/ui/Panel";
import {
  businessTypeOptions,
  inquirySchema,
  timelineOptions,
  whatYouNeedOptions,
} from "@/features/inquiry/inquiry.schema";
import type { Inquiry } from "@/features/inquiry/inquiry.types";
import { submitProjectInquiry } from "@/features/inquiry/submitProjectInquiry";

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
    <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
      <input
        autoComplete="off"
        className="hidden"
        name="company"
        onChange={(e) => setHp(e.target.value)}
        tabIndex={-1}
        value={hp}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" error={form.formState.errors.name?.message}>
          <input
            autoComplete="name"
            className={inputBase}
            disabled={isDisabled}
            {...form.register("name")}
          />
        </Field>
        <Field label="Email" error={form.formState.errors.email?.message}>
          <input
            autoComplete="email"
            className={inputBase}
            disabled={isDisabled}
            type="email"
            {...form.register("email")}
          />
        </Field>
        <Field label="Phone" error={form.formState.errors.phone?.message}>
          <input
            autoComplete="tel"
            className={inputBase}
            disabled={isDisabled}
            type="tel"
            {...form.register("phone")}
          />
        </Field>
        <Field label="Business type" error={form.formState.errors.businessType?.message}>
          <select
            className={inputBase}
            disabled={isDisabled}
            {...form.register("businessType")}
          >
            {businessTypeOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label="What you need" error={form.formState.errors.whatYouNeed?.message}>
          <select
            className={inputBase}
            disabled={isDisabled}
            {...form.register("whatYouNeed")}
          >
            {whatYouNeedOptions.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Timeline (optional)" error={form.formState.errors.timeline?.message}>
          <select
            className={inputBase}
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
        </Field>
      </div>

      <Field label="Primary goal" error={form.formState.errors.primaryGoal?.message}>
        <input
          className={inputBase}
          disabled={isDisabled}
          placeholder="What should improve when this is live?"
          {...form.register("primaryGoal")}
        />
      </Field>

      <Field label="Current website/app (optional)" error={form.formState.errors.currentUrl?.message}>
        <input
          className={inputBase}
          disabled={isDisabled}
          placeholder="https://"
          {...form.register("currentUrl")}
        />
      </Field>

      <Field label="Notes (optional)" error={form.formState.errors.notes?.message}>
        <textarea
          className={inputBase + " min-h-28 py-3"}
          disabled={isDisabled}
          {...form.register("notes")}
        />
      </Field>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button disabled={isDisabled} type="submit" variant="primary">
          {status.type === "submitting" ? "Sending…" : status.type === "success" ? "Sent" : "Send inquiry"}
        </Button>
        <div className="text-sm text-muted-foreground">We reply within 24 hours with next steps.</div>
      </div>

      {status.type === "error" ? (
        <Panel noise={false} padding="sm" className="border-red-200 bg-red-50 text-red-900 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-100">
          {status.message}
        </Panel>
      ) : null}

      {status.type === "success" ? (
        <Panel noise={false} padding="sm" className="border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-100">
          Received. We’ll reply within 24 hours with next steps.
        </Panel>
      ) : null}
    </form>
  );
}
