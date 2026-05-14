"use client";

import { Container } from "@/components/ui/Container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex items-center">
      <Container className="text-center py-32">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-3 mb-8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="studio-eyebrow text-accent">[ Error ]</span>
        </div>

        {/* Heading */}
        <h1
          className="font-sans font-bold text-foreground mb-4"
          style={{ fontSize: "clamp(1.5rem, 2vw + 1rem, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
        >
          Something went wrong.
        </h1>

        {/* Body */}
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-10 leading-relaxed">
          An unexpected error occurred. Please try again, or contact us if the problem persists.
        </p>

        {/* Retry CTA */}
        <button
          onClick={reset}
          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent text-accent-ink text-sm font-semibold tracking-wide hover:scale-105 hover:shadow-amber-glow transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
        >
          Try again →
        </button>

        {/* Error digest for support reference */}
        {error.digest && (
          <p className="mt-8 text-xs font-mono text-subtle-foreground">
            Ref: {error.digest}
          </p>
        )}
      </Container>
    </div>
  );
}
