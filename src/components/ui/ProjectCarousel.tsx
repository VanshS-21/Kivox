"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

interface ProjectCarouselProps {
  images: string[];
  alt: string;
  accentColor: string;
  priority?: boolean;
  liveUrl?: string;
  liveLabel?: string;
}

const AUTOPLAY_INTERVAL_MS = 4000;

export function ProjectCarousel({
  images,
  alt,
  accentColor,
  priority = false,
  liveUrl,
  liveLabel = "View Live Website",
}: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const total = images.length;
  const liveTarget = liveUrl?.startsWith("/") ? "_self" : "_blank";
  const liveRel = liveUrl?.startsWith("/") ? undefined : "noopener noreferrer";

  useEffect(() => {
    if (total < 2 || isHovered) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((i) => (i === total - 1 ? 0 : i + 1));
    }, AUTOPLAY_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [total, isHovered]);

  const nextSlide = () => setActiveIndex((i) => (i === total - 1 ? 0 : i + 1));
  const prevSlide = () => setActiveIndex((i) => (i === 0 ? total - 1 : i - 1));

  return (
    <div
      className="relative group/carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-frame relative overflow-hidden rounded-xl lg:rounded-2xl">
        <div className="carousel-frame-noise absolute inset-0 pointer-events-none z-[2]" />

        <div
          className="carousel-frame-inner relative z-[4] w-full"
          style={{ aspectRatio: "16 / 10" }}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                alt={`${alt}, slide ${activeIndex + 1}`}
                className="carousel-image object-cover object-top"
                fetchPriority={priority && activeIndex === 0 ? "high" : "auto"}
                fill
                loading={priority && activeIndex === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 88vw, 85vw"
                src={images[activeIndex]}
              />
            </motion.div>
          </AnimatePresence>

          {total > 1 && (
            <>
              <button
                aria-label="Previous slide"
                className="absolute bottom-0 left-0 top-0 z-20 w-1/3 cursor-w-resize focus-visible:outline-none"
                onClick={prevSlide}
                type="button"
              />
              <button
                aria-label="Next slide"
                className="absolute bottom-0 right-0 top-0 z-20 w-1/3 cursor-e-resize focus-visible:outline-none"
                onClick={nextSlide}
                type="button"
              />
            </>
          )}
        </div>

        {total > 1 && (
          <div className="absolute bottom-4 right-5 z-10 lg:bottom-6 lg:right-7 pointer-events-none">
            <span className="studio-tag studio-tabular text-white/80 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="mx-1 text-white/40">/</span>
              {String(total).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {total > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {images.map((_, idx) => (
            <button
              aria-current={idx === activeIndex}
              aria-label={`Go to slide ${idx + 1}`}
              className="relative flex min-h-[44px] min-w-[44px] items-center justify-center p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
              key={idx}
              onClick={() => setActiveIndex(idx)}
              type="button"
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  background: idx === activeIndex ? accentColor : "var(--border)",
                  borderRadius: 3,
                  height: 6,
                  width: idx === activeIndex ? 24 : 6,
                }}
              />
            </button>
          ))}
        </div>
      )}

      {liveUrl && (
        <div className="mt-6 flex justify-center">
          <Link
            className="group/live inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full border px-5 py-3 text-sm font-semibold tracking-wide text-background shadow-[0_18px_50px_-28px_var(--accent)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-28px_var(--accent)] sm:min-h-14 sm:w-auto sm:px-7"
            href={liveUrl}
            prefetch={false}
            rel={liveRel}
            style={{
              background: `linear-gradient(135deg, ${accentColor}, color-mix(in oklch, ${accentColor}, var(--bg-primary) 18%))`,
              borderColor: `color-mix(in oklch, ${accentColor}, var(--fg-primary) 30%)`,
            }}
            target={liveTarget}
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-ink/[0.18] text-background ring-1 ring-accent-ink/[0.28] transition group-hover/live:translate-x-0.5">
              &#8599;
            </span>
            <span>{liveLabel}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
