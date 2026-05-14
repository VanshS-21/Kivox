"use client";

import Image from "next/image";

export function CinematicBreak() {
  return (
    <div
      className="relative w-full overflow-hidden cinematic-break"
      style={{
        height: "70vh",
        maxHeight: "800px",
        minHeight: "400px",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 25%, black 70%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 25%, black 70%, transparent 100%)",
      }}
      aria-hidden="true"
    >
      {/* Dark mode image */}
      <Image
        src="/process/discover.png"
        alt=""
        fill
        className="object-cover object-center cinematic-img-dark"
        sizes="100vw"
        priority={false}
      />
      {/* Light mode image */}
      <Image
        src="/process/inkonpaper.png"
        alt=""
        fill
        className="object-cover object-center cinematic-img-light"
        sizes="100vw"
        priority={false}
      />
    </div>
  );
}
