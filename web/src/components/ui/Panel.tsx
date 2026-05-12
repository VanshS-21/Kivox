import type { HTMLAttributes, Ref } from "react";
import { cn } from "@/lib/cn";

export type PanelProps = HTMLAttributes<HTMLDivElement> & {
  noise?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
};

export function Panel({
  className,
  noise = true,
  padding = "md",
  interactive,
  ref,
  ...props
}: PanelProps & { ref?: Ref<HTMLDivElement> }) {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6 md:p-8",
    lg: "p-8 md:p-12",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "studio-surface",
        noise && "studio-surface--noise",
        paddingClasses[padding],
        interactive &&
          "transition hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5 active:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}
