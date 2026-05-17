import type { CSSProperties } from "react";

import { conceptProjects } from "@/content/testimonials";

const marqueeStyle = {
  "--marquee-distance": "1000px",
  animation: "marquee-scroll 30s linear infinite",
} as CSSProperties;

export function HomeProjectBand() {
  return (
    <div className="w-full overflow-hidden border-y border-border/50 bg-background py-8 flex flex-col items-center">
      <div className="relative flex max-w-[100vw] overflow-hidden">
        <div
          className="flex whitespace-nowrap"
          style={marqueeStyle}
        >
          {/* We duplicate the array to create an infinite scroll effect */}
          {[...conceptProjects, ...conceptProjects, ...conceptProjects].map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="flex items-center mx-8 group cursor-default"
            >
              <div className="flex flex-col items-center">
                <span className="text-xl md:text-2xl font-bold tracking-tight text-foreground/60 transition-colors duration-300 group-hover:text-foreground">
                  {project.name}
                </span>
                <span className="text-xs text-muted-foreground/50 font-medium tracking-wide mt-1 uppercase transition-colors duration-300 group-hover:text-accent">
                  {project.role}
                </span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-border mx-12 hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
