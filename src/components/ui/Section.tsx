import React, { type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/cn";

export const Section = forwardRef<HTMLElement, {
  children: ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
  spacing?: "default" | "tight" | "loose" | "none";
}>(({
  children,
  className,
  id,
  style,
  spacing = "default",
}, ref) => {
  const spacingClasses = {
    default: "py-[var(--space-section)]",
    tight: "py-[var(--space-section-small)]",
    loose: "py-[var(--space-section-large)]",
    none: "py-0",
  };

  return (
    <section ref={ref} className={cn("relative", spacingClasses[spacing], className)} id={id} style={style}>
      {children}
    </section>
  );
});

Section.displayName = "Section";
