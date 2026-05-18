"use client";

import posthog from "posthog-js";

import type { AnalyticsEvent } from "./events";

export function capture(event: AnalyticsEvent): void {
  posthog.capture(event);
}
