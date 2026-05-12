import type { HTMLAttributes, Ref } from "react";

import { cn } from "@/lib/cn";

export function Prose({
  className,
  ref,
  ...props
}: HTMLAttributes<HTMLDivElement> & { ref?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      className={cn(
        "space-y-5 text-sm leading-7 text-muted-foreground",
        "[&>h2]:mt-10 [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-foreground",
        "[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:marker:text-muted-foreground/70",
        className,
      )}
      {...props}
    />
  );
}

