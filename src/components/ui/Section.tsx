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
    default: "py-20 md:py-32",
    tight: "py-12 md:py-20",
    loose: "py-32 md:py-48",
    none: "py-0",
  };

  return (
    <section ref={ref} className={cn(spacingClasses[spacing], className)} id={id} style={style}>
      {children}
    </section>
  );
});

Section.displayName = "Section";
