"use client";

import { useEffect } from "react";

import { initPosthog } from "@/lib/analytics/posthog";

export function Analytics() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(() => initPosthog(), { timeout: 3000 });
        return;
      }

      initPosthog();
    }, 12000);

    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
