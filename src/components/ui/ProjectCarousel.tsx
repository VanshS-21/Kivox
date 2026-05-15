"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CursorTrigger } from "@/components/ui/CursorTrigger";

interface ProjectCarouselProps {
  images: string[];
  alt: string;
  accentColor: string;
  priority?: boolean;
  liveUrl?: string;
  liveLabel?: string;
}

export function ProjectCarousel({
  images,
  alt,
  accentColor,
  priority = false,
  liveUrl,
  liveLabel = "View Live Website",
}: ProjectCarouselProps) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef(0);
  const touchDeltaRef = useRef(0);
  const total = images.length;

  /* ── Snap to active slide ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: active * track.clientWidth, behavior: "smooth" });
  }, [active]);

  /* ── Touch / swipe handling ── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    touchDeltaRef.current = 0;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchDeltaRef.current = e.touches[0].clientX - touchStartRef.current;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const delta = touchDeltaRef.current;
    const threshold = 50;
    if (delta < -threshold && active < total - 1) {
      setActive((p) => p + 1);
    } else if (delta > threshold && active > 0) {
      setActive((p) => p - 1);
    }
  }, [active, total]);

  /* ── Arrow navigation ── */
  const prev = useCallback(() => setActive((p) => Math.max(0, p - 1)), []);
  const next = useCallback(
    () => setActive((p) => Math.min(total - 1, p + 1)),
    [total]
  );
  const liveTarget = liveUrl?.startsWith("/") ? "_self" : "_blank";
  const liveRel = liveUrl?.startsWith("/") ? undefined : "noopener noreferrer";

  return (
    <div className="relative group/carousel">
      {/* ── Clean CSS frame: dark matte with depth shadows ── */}
      <div className="carousel-frame relative rounded-xl lg:rounded-2xl overflow-hidden">

        {/* Subtle noise texture */}
        <div className="carousel-frame-noise absolute inset-0 pointer-events-none z-[2]" />

        {/* ── Image track ── */}
        <div className="carousel-frame-inner relative z-[4]">
          <CursorTrigger variant="text" text="Drag" className="block">
            <div
              ref={trackRef}
              className="carousel-track flex overflow-hidden rounded-md lg:rounded-lg"
              style={{ scrollSnapType: "x mandatory" }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {images.map((src, idx) => (
                <Link
                  key={idx}
                  href={liveUrl || "#"}
                  target={liveUrl ? liveTarget : undefined}
                  rel={liveRel}
                  aria-disabled={!liveUrl}
                  aria-label={`${liveLabel}: ${alt}, slide ${idx + 1}`}
                  className="carousel-slide relative w-full shrink-0"
                  style={{ aspectRatio: "16 / 10", scrollSnapAlign: "start" }}
                  tabIndex={liveUrl ? 0 : -1}
                >
                  <Image
                    src={src}
                    alt={`${alt}, slide ${idx + 1}`}
                    fill
                    className="carousel-image object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 85vw"
                    priority={priority && idx === 0}
                  />
                </Link>
              ))}
            </div>
          </CursorTrigger>
        </div>

        {/* ── Arrow buttons ── */}
        {liveUrl && (
          <Link
            className="absolute left-4 top-4 z-20 inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-xs font-bold uppercase tracking-[0.12em] text-[oklch(0.99_0.008_80)] shadow-[0_16px_36px_-18px_rgba(0,0,0,0.55)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-18px_rgba(0,0,0,0.65)] md:left-6 md:top-6 md:px-5"
            href={liveUrl}
            rel={liveRel}
            style={{
              background: `linear-gradient(135deg, ${accentColor}, color-mix(in oklch, ${accentColor}, black 18%))`,
              borderColor: `color-mix(in oklch, ${accentColor}, white 28%)`,
            }}
            target={liveTarget}
          >
            <span className="h-2 w-2 rounded-full bg-[oklch(0.99_0.008_80)] shadow-[0_0_18px_oklch(0.99_0.008_80/0.7)]" />
            {liveLabel}
            <span aria-hidden="true" className="text-sm leading-none transition group-hover/carousel:translate-x-0.5">
              →
            </span>
          </Link>
        )}

        {total > 1 && (
          <>
            <button
              onClick={prev}
              disabled={active === 0}
              aria-label="Previous image"
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[var(--bg-surface-alt)] border border-[var(--border)] text-foreground flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 disabled:opacity-0 hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-surface-alt)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={active === total - 1}
              aria-label="Next image"
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[var(--bg-surface-alt)] border border-[var(--border)] text-foreground flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 disabled:opacity-0 hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-surface-alt)]"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </>
        )}

        {/* ── Slide counter (inside frame, bottom-right) ── */}
        {total > 1 && (
          <div className="absolute bottom-4 lg:bottom-6 right-5 lg:right-7 z-10">
            <span className="text-[oklch(0.98_0.01_85/0.4)] text-xs font-mono tracking-widest">
              {String(active + 1).padStart(2, "0")}
              <span className="text-[oklch(0.98_0.01_85/0.2)] mx-1">/</span>
              {String(total).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* ── Dot indicators (outside frame) ── */}
      {total > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="relative p-1 cursor-pointer"
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  width: active === idx ? 24 : 6,
                  height: 6,
                  background: active === idx ? accentColor : "var(--fg-subtle)",
                  borderRadius: 3,
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
