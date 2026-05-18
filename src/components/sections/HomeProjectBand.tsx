import { conceptProjects } from "@/content/testimonials";

export function HomeProjectBand() {
  return (
    <div className="w-full overflow-hidden border-y border-border/50 bg-background py-6">
      {/* 
        To change direction back to standard Right-to-Left, 
        simply change 'animate-marquee-reverse' to 'animate-marquee' on both divs below.
      */}
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee whitespace-nowrap">
          {conceptProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="group flex cursor-default items-center gap-10 px-5 md:gap-14 md:px-7"
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xl font-bold tracking-tight text-foreground/50 transition-colors duration-200 group-hover:text-foreground md:text-2xl">
                  {project.name}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40 transition-colors duration-200 group-hover:text-accent">
                  {project.role}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="hidden select-none text-lg text-border/60 md:block"
              >
                *
              </span>
            </div>
          ))}
        </div>
        <div
          className="flex shrink-0 animate-marquee whitespace-nowrap"
          aria-hidden="true"
        >
          {conceptProjects.map((project, idx) => (
            <div
              key={`${project.id}-dup-${idx}`}
              className="group flex cursor-default items-center gap-10 px-5 md:gap-14 md:px-7"
            >
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-xl font-bold tracking-tight text-foreground/50 transition-colors duration-200 group-hover:text-foreground md:text-2xl">
                  {project.name}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/40 transition-colors duration-200 group-hover:text-accent">
                  {project.role}
                </span>
              </div>
              <span
                aria-hidden="true"
                className="hidden select-none text-lg text-border/60 md:block"
              >
                *
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
