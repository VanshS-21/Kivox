"use client";

import Link from "next/link";
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
        {/* Heading */}
        <h1
          className="font-sans font-bold text-foreground mb-4 text-3xl md:text-4xl leading-tight tracking-tight"
        >
          Something went wrong.
        </h1>

        {/* Body */}
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-10 leading-relaxed">
          An unexpected error occurred. Please try again, or contact us if the
          problem persists.
        </p>

        {/* Retry CTA */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent text-accent-ink text-sm font-semibold tracking-wide hover:scale-105 hover:shadow-amber-glow transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
          >
            Try again →
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            ← Back to Home
          </Link>
        </div>

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
