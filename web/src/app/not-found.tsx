import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center relative overflow-hidden">
      {/* Subtle radial amber glow — matching the studio atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 45%, var(--accent-glow), transparent 70%)",
        }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.2,
        }}
      />

      <Container className="text-center py-32 relative z-10">
        {/* Number */}
        <p
          className="font-mono text-accent mb-6"
          style={{ fontSize: "clamp(5rem, 10vw, 10rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
        >
          404
        </p>

        {/* Heading */}
        <h1
          className="font-sans font-bold text-foreground mb-4"
          style={{ fontSize: "clamp(1.5rem, 2vw + 1rem, 2.5rem)", lineHeight: 1.2, letterSpacing: "-0.02em" }}
        >
          Page not found.
        </h1>

        {/* Body */}
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-10 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent text-accent-ink text-sm font-semibold tracking-wide hover:scale-105 hover:shadow-amber-glow transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)]"
        >
          ← Back to Home
        </Link>
      </Container>
    </div>
  );
}
