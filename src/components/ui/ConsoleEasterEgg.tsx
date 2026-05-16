"use client";

import { useEffect } from "react";

/**
 * Prints a styled brand message to the browser console.
 * A tiny craft detail for developers who open DevTools.
 */
export function ConsoleEasterEgg() {
  useEffect(() => {
    const styles = [
      // Brand name
      "color: #ff9500; font-size: 24px; font-weight: bold; font-family: system-ui, sans-serif; padding: 8px 0;",
      // Tagline
      "color: #888; font-size: 13px; font-family: monospace; padding: 2px 0;",
      // CTA
      "color: #aaa; font-size: 12px; font-family: monospace; padding: 2px 0;",
    ];

    console.log(
      "%cKivox\n%cBuilt with craft, not templates.\n%cInterested? → kivox.contact@gmail.com",
      styles[0],
      styles[1],
      styles[2]
    );
  }, []);

  return null;
}
