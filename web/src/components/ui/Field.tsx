import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

export function Field({
  label,
  error,
  children,
  className,
}: {
  label: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-medium text-foreground">{label}</div>
        {error ? <div className="text-sm text-red-600 dark:text-red-400">{error}</div> : null}
      </div>
      {children}
    </label>
  );
}

export const inputBase =
  "h-11 w-full rounded-[var(--radius-sm)] border border-border bg-surface-0 px-4 text-sm text-foreground outline-none transition focus:border-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-[color:var(--bg)] disabled:pointer-events-none disabled:opacity-60";
