import type { CSSProperties } from "react";

import { conceptProjects } from "@/content/testimonials";

// 2 copies + translateX(-50%) = perfect seamless loop at any item count
const marqueeStyle = {
  "--marquee-distance": "50%",
  animation: "marquee-scroll 40s linear infinite",
} as CSSProperties;

export function HomeProjectBand() {
  const items = [...conceptProjects, ...conceptProjects];

  return (
    <div className="w-full overflow-hidden border-y border-border/50 bg-background py-6">
      <div className="relative flex overflow-hidden">
        <div
          className="flex shrink-0 whitespace-nowrap"
          style={marqueeStyle}
        >
          {items.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="flex items-center mx-10 group cursor-default"
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground/50 transition-colors duration-300 group-hover:text-foreground">
                  {project.name}
                </span>
                <span className="text-[10px] text-muted-foreground/40 font-semibold tracking-widest uppercase transition-colors duration-300 group-hover:text-accent">
                  {project.role}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="mx-10 hidden md:block text-border/60 text-lg select-none"
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
