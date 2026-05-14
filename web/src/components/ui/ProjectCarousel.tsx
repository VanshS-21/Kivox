"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { ConstellationCanvas } from "@/components/ui/ConstellationCanvas";

interface ProjectCarouselProps {
  images: string[];
  alt: string;
  accentColor: string;
  priority?: boolean;
}

export function ProjectCarousel({
  images,
  alt,
  accentColor,
  priority = false,
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

  return (
    <div className="relative group/carousel">
      {/* ── Wall-frame: dark matte container with depth ── */}
      <div className="carousel-frame relative rounded-xl lg:rounded-2xl overflow-hidden">

        {/* Constellation canvas — same as hero but lower intensity */}
        <div className="absolute inset-0 z-[3] opacity-85 pointer-events-auto">
          <ConstellationCanvas variant="dark" />
        </div>

        {/* Frame noise texture */}
        <div className="carousel-frame-noise absolute inset-0 pointer-events-none z-[2]" />

        {/* ── Amber corner glows ── */}
        <div className="absolute inset-0 pointer-events-none z-[2]" style={{
          background: [
            'radial-gradient(ellipse 50% 50% at 0% 0%, oklch(0.55 0.18 55 / 0.50), transparent 70%)',
            'radial-gradient(ellipse 50% 50% at 100% 0%, oklch(0.55 0.18 55 / 0.50), transparent 70%)',
            'radial-gradient(ellipse 50% 50% at 0% 100%, oklch(0.55 0.18 55 / 0.50), transparent 70%)',
            'radial-gradient(ellipse 50% 50% at 100% 100%, oklch(0.55 0.18 55 / 0.50), transparent 70%)',
          ].join(', '),
        }} />

        {/* ── Depth vignette: darken edges for cave tunnel effect ── */}
        <div className="carousel-depth-vignette absolute inset-0 z-[1] pointer-events-none" />

        {/* ── Image track (inset deep within the frame) ── */}
        <div className="carousel-frame-inner relative z-[4]">
          <div
            ref={trackRef}
            className="carousel-track flex overflow-hidden rounded-md lg:rounded-lg"
            style={{ scrollSnapType: "x mandatory" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((src, idx) => (
              <div
                key={idx}
                className="carousel-slide relative w-full shrink-0"
                style={{ aspectRatio: "16 / 10", scrollSnapAlign: "start" }}
              >
                <Image
                  src={src}
                  alt={`${alt} — slide ${idx + 1}`}
                  fill
                  className="carousel-image object-cover"
                  sizes="(max-width: 768px) 100vw, 85vw"
                  priority={priority && idx === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Arrow buttons ── */}
        {total > 1 && (
          <>
            <button
              onClick={prev}
              disabled={active === 0}
              aria-label="Previous image"
              className="absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm text-white/80 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 disabled:opacity-0 hover:bg-white/20 cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={active === total - 1}
              aria-label="Next image"
              className="absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm text-white/80 flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 disabled:opacity-0 hover:bg-white/20 cursor-pointer"
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
            <span className="text-white/40 text-xs font-mono tracking-widest">
              {String(active + 1).padStart(2, "0")}
              <span className="text-white/20 mx-1">/</span>
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
