import Image from "next/image";
import Link from "next/link";

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
  const total = images.length;
  const liveTarget = liveUrl?.startsWith("/") ? "_self" : "_blank";
  const liveRel = liveUrl?.startsWith("/") ? undefined : "noopener noreferrer";

  return (
    <div className="relative group/carousel">
      <div className="carousel-frame relative overflow-hidden rounded-xl lg:rounded-2xl">
        <div className="carousel-frame-noise absolute inset-0 pointer-events-none z-[2]" />

        <div className="carousel-frame-inner relative z-[4]">
          <div className="carousel-track flex overflow-hidden rounded-md lg:rounded-lg">
            <div
              className="carousel-slide relative w-full shrink-0"
              style={{ aspectRatio: "16 / 10" }}
            >
              <Image
                alt={`${alt}, slide 1`}
                className="carousel-image object-cover object-top"
                fetchPriority={priority ? "high" : "auto"}
                fill
                loading={priority ? "eager" : "lazy"}
                sizes="(max-width: 768px) 88vw, 85vw"
                src={images[0]}
              />
            </div>
          </div>
        </div>

        {total > 1 && (
          <div className="absolute bottom-4 right-5 z-10 lg:bottom-6 lg:right-7">
            <span className="font-mono text-xs tracking-widest text-foreground/40">
              01
              <span className="mx-1 text-foreground/20">/</span>
              {String(total).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {total > 1 && (
        <div className="mt-5 flex items-center justify-center gap-2">
          {images.map((_, idx) => (
            <span
              aria-hidden="true"
              className="relative flex min-h-[44px] min-w-[44px] items-center justify-center p-1"
              key={idx}
            >
              <span
                className="block rounded-full transition-all duration-300"
                style={{
                  background: idx === 0 ? accentColor : "var(--fg-subtle)",
                  borderRadius: 3,
                  height: 6,
                  width: idx === 0 ? 24 : 6,
                }}
              />
            </span>
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
