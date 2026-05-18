"use client";

import type { AnalyticsEvent } from "./events";

type PosthogClient = {
  init: (
    key: string,
    options: {
      api_host?: string;
      capture_pageview: boolean;
      autocapture: boolean;
    },
  ) => void;
  capture: (event: AnalyticsEvent) => void;
};

let isInitialized = false;
let posthogClient: PosthogClient | null = null;

export function isAnalyticsEnabledClient(): boolean {
  return process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true";
}

export function initPosthog(): void {
  if (isInitialized) return;
  if (!isAnalyticsEnabledClient()) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  void import("posthog-js")
    .then(({ default: posthog }) => {
      if (isInitialized) return;

      posthogClient = posthog as PosthogClient;
      posthogClient.init(key, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        capture_pageview: false,
        autocapture: false,
      });

      isInitialized = true;
    })
    .catch(() => {
      posthogClient = null;
    });
}

export function capture(event: AnalyticsEvent): void {
  if (!isInitialized || !posthogClient) return;
  posthogClient.capture(event);
}
