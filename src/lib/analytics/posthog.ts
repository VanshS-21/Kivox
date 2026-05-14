"use client";

import posthog from "posthog-js";

import type { AnalyticsEvent } from "./events";

let isInitialized = false;

export function isAnalyticsEnabledClient(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
}

export function initPosthog(): void {
  if (isInitialized) return;
  if (!isAnalyticsEnabledClient()) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
    autocapture: false,
  });

  isInitialized = true;
}

export function capture(event: AnalyticsEvent): void {
  if (!isInitialized) return;
  posthog.capture(event);
}

