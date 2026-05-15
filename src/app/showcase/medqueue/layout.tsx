import { MedQueueProvider } from "./context";
import Link from "next/link";
import { c, font } from "./tokens";

export default function MedQueueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MedQueueProvider>
      <div
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: c.bg, color: c.ink, fontFamily: font.body }}
      >
        {/* Product nav — light, solid, sits below ShowcaseFrame */}
        <header
          className="sticky top-12 z-40"
          style={{
            backgroundColor: c.surface,
            borderBottom: `1px solid ${c.subtle}`,
          }}
        >
          <div className="max-w-6xl mx-auto px-6 h-12 flex items-center justify-between">
            <Link
              href="/showcase/medqueue"
              className="flex items-center gap-2 group"
            >
              <div
                className="w-6 h-6 rounded flex items-center justify-center"
                style={{
                  backgroundColor: c.accent,
                  fontFamily: font.mono,
                  color: "#fff",
                  fontSize: "8px",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                }}
              >
                MQ
              </div>
              <span
                style={{
                  fontFamily: font.display,
                  fontWeight: 600,
                  fontSize: "0.9375rem",
                  letterSpacing: "-0.01em",
                  color: c.ink,
                }}
              >
                MedQueue
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {[
                { href: "/showcase/medqueue/search", label: "Find Doctors" },
                { href: "/showcase/medqueue/portal", label: "My Appointments" },
                { href: "/showcase/medqueue/design-system", label: "Design System" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-opacity hover:opacity-60"
                  style={{
                    fontFamily: font.mono,
                    fontSize: "0.625rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    color: c.muted,
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/showcase/medqueue/portal"
              className="w-7 h-7 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
              style={{
                backgroundColor: c.subtle,
                fontFamily: font.mono,
                fontSize: "0.5rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                color: c.muted,
              }}
            >
              AP
            </Link>
          </div>
        </header>

        <main className="flex-1 flex flex-col">{children}</main>

        <footer style={{ borderTop: `1px solid ${c.subtle}` }}>
          <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
            <span
              style={{
                fontFamily: font.mono,
                fontSize: "0.625rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: c.muted,
              }}
            >
              MedQueue · Kivox Studio
            </span>
            <span
              style={{
                fontFamily: font.mono,
                fontSize: "0.625rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: c.subtle,
              }}
            >
              Showcase
            </span>
          </div>
        </footer>
      </div>
    </MedQueueProvider>
  );
}
