"use client";

import { c, font } from "../tokens";

export default function DesignSystemPage() {
  return (
    <div className="flex-1 pb-20" style={{ backgroundColor: c.bg }}>
      <div className="max-w-5xl mx-auto px-6 pt-12">
        <div className="mb-12">
          <div style={{
            fontFamily: font.mono, fontSize: "0.6875rem", fontWeight: 500,
            letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: c.accent, marginBottom: "0.75rem",
          }}>
            MedQueue Design System
          </div>
          <h1 style={{
            fontFamily: font.display, fontWeight: 700, fontSize: "2rem",
            letterSpacing: "-0.02em", color: c.ink, marginBottom: "0.5rem",
          }}>
            Visual Language
          </h1>
          <p style={{ color: c.muted, fontSize: "0.9375rem", maxWidth: "56ch" }}>
            MedQueue uses a cold-clinical palette with neutrals tinted toward blue (hue 240).
            The system prioritizes data density, typographic hierarchy, and structured calm.
          </p>
        </div>

        {/* Color Palette */}
        <section className="mb-16">
          <h2 style={{
            fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: c.muted, marginBottom: "1rem",
          }}>
            Color Palette (OKLCH)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {[
              { name: "Background", token: "bg", value: c.bg },
              { name: "Surface", token: "surface", value: c.surface },
              { name: "Ink", token: "ink", value: c.ink },
              { name: "Muted", token: "muted", value: c.muted },
              { name: "Subtle", token: "subtle", value: c.subtle },
              { name: "Accent", token: "accent", value: c.accent },
              { name: "Accent Light", token: "accentLt", value: c.accentLt },
              { name: "Trust", token: "trust", value: c.trust },
              { name: "Trust Light", token: "trustLt", value: c.trustLt },
              { name: "Hero", token: "hero", value: c.hero },
              { name: "Hero Foreground", token: "heroFg", value: c.heroFg },
              { name: "Hero Muted", token: "heroMuted", value: c.heroMuted },
            ].map((color) => (
              <div key={color.token} className="rounded-lg overflow-hidden" style={{ border: `1px solid ${c.subtle}` }}>
                <div className="h-16" style={{ backgroundColor: color.value }} />
                <div className="p-3" style={{ backgroundColor: c.surface }}>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: c.ink }}>{color.name}</div>
                  <div style={{
                    fontFamily: font.mono, fontSize: "0.5625rem", color: c.muted,
                    marginTop: "2px", letterSpacing: "0.02em",
                  }}>
                    {color.value}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 style={{
            fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: c.muted, marginBottom: "1.5rem",
          }}>
            Typography
          </h2>
          <div className="space-y-8">
            {[
              { role: "Display", family: font.display, sample: "Bricolage Grotesque", size: "2rem", weight: 700 },
              { role: "Body", family: font.body, sample: "Figtree for readable body text at any size.", size: "1rem", weight: 400 },
              { role: "Editorial", family: font.serif, sample: "Spectral italic for emotional emphasis.", size: "1.25rem", weight: 400, italic: true },
              { role: "Mono / Data", family: font.mono, sample: "Geist Mono for labels, data, and metadata.", size: "0.8125rem", weight: 500 },
            ].map((item) => (
              <div key={item.role} className="flex flex-col sm:flex-row gap-4 sm:items-end pb-6" style={{ borderBottom: `1px solid ${c.subtle}` }}>
                <div className="w-32 shrink-0">
                  <div style={{
                    fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    color: c.muted, marginBottom: "4px",
                  }}>
                    {item.role}
                  </div>
                  <div style={{ fontFamily: font.mono, fontSize: "0.625rem", color: c.muted }}>
                    {item.size}
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: item.family,
                    fontSize: item.size,
                    fontWeight: item.weight,
                    fontStyle: item.italic ? "italic" : "normal",
                    color: c.ink,
                    lineHeight: 1.3,
                  }}
                >
                  {item.sample}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacing & Principles */}
        <section className="mb-16">
          <h2 style={{
            fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: c.muted, marginBottom: "1.5rem",
          }}>
            Design Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Structured Calm",
                desc: "Every element earns its presence. White space is cognitive breathing room, not decoration. Data density is high, but visual hierarchy ensures the eye always knows where to go first.",
              },
              {
                title: "Confidence Before Convenience",
                desc: "Trust signals precede booking actions. Verified credentials, success rates, and real availability data give patients reasons to commit without second-guessing.",
              },
              {
                title: "Instrument Precision",
                desc: "The interface borrows from fintech dashboards and airline booking systems. Tabular numerics, compact data tables, and monospace labels communicate clinical accuracy.",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 style={{
                  fontFamily: font.display, fontWeight: 600, fontSize: "1rem",
                  color: c.ink, marginBottom: "0.5rem",
                }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "0.8125rem", lineHeight: 1.6, color: c.muted }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Component Patterns */}
        <section>
          <h2 style={{
            fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
            letterSpacing: "0.12em", textTransform: "uppercase" as const,
            color: c.muted, marginBottom: "1.5rem",
          }}>
            Component Tokens
          </h2>
          <div
            className="rounded-lg overflow-hidden"
            style={{ border: `1px solid ${c.subtle}`, backgroundColor: c.surface }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: c.bg, borderBottom: `1px solid ${c.subtle}` }}>
                  {["Token", "Value", "Usage"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3 text-left"
                      style={{
                        fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                        letterSpacing: "0.12em", textTransform: "uppercase" as const, color: c.muted,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { token: "border-radius", value: "4px (rounded)", usage: "Cards, inputs, buttons" },
                  { token: "font-display", value: "Bricolage Grotesque", usage: "Headlines, doctor names" },
                  { token: "font-body", value: "Figtree", usage: "Body text, descriptions" },
                  { token: "font-mono", value: "Geist Mono", usage: "Labels, data values, metadata" },
                  { token: "font-serif", value: "Spectral", usage: "Testimonials, emphasis" },
                  { token: "shadow", value: "none / 0 1px 2px", usage: "Minimal elevation, hover only" },
                ].map((row, i, arr) => (
                  <tr key={row.token} style={{ borderBottom: i < arr.length - 1 ? `1px solid ${c.subtle}` : undefined }}>
                    <td className="px-5 py-3" style={{ fontFamily: font.mono, fontSize: "0.75rem", fontWeight: 500, color: c.ink }}>
                      {row.token}
                    </td>
                    <td className="px-5 py-3" style={{ fontFamily: font.mono, fontSize: "0.75rem", color: c.muted }}>
                      {row.value}
                    </td>
                    <td className="px-5 py-3" style={{ fontSize: "0.8125rem", color: c.muted }}>
                      {row.usage}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
