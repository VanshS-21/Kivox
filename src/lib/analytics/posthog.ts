"use client";

import posthog from "posthog-js";

import type { AnalyticsEvent } from "./events";

let initialized = false;

export function initPosthog(): void {
  if (initialized) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!key || !host) return;

  posthog.init(key, {
    api_host: host,
    capture_pageleave: true,
    capture_pageview: false,
  });

  initialized = true;
}

export function capture(event: AnalyticsEvent): void {
  posthog.capture(event);
}
