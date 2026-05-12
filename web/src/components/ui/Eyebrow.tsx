import type { HTMLAttributes, Ref } from "react";
import { cn } from "@/lib/cn";

export type EyebrowProps = HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> };

export function Eyebrow({ className, ref, ...props }: EyebrowProps) {
  return (
    <div
      ref={ref}
      className={cn(
        "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
