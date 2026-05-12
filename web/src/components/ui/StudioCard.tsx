"use client";

import type { HTMLAttributes, Ref } from "react";

import { cn } from "@/lib/cn";
import { Panel } from "@/components/ui/Panel";

export function StudioCard({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <Panel
      interactive
      padding="md"
      className={cn(
        "group relative",
        "ring-1 ring-transparent transition",
        "hover:ring-[color:var(--border-soft)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}

