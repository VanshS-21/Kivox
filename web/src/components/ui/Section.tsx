import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
  style,
  spacing = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  spacing?: "default" | "tight" | "loose" | "none";
}) {
  const spacingClasses = {
    default: "py-20 md:py-32",
    tight: "py-12 md:py-20",
    loose: "py-32 md:py-48",
    none: "py-0",
  };

  return (
    <section className={cn(spacingClasses[spacing], className)} id={id} style={style}>
      {children}
    </section>
  );
}
