"use client";

import Link from "next/link";
import type { ComponentProps, Ref } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition-all duration-300 ease-[var(--ease-out-expo)] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg-primary)] disabled:opacity-60 disabled:pointer-events-none motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-rest hover:shadow-amber-glow hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-[0.98]",
  secondary:
    "bg-surface text-foreground border border-border shadow-rest hover:border-accent/40 hover:shadow-hover hover:-translate-y-0.5 hover:scale-[1.01] active:translate-y-0 active:scale-[0.98]",
  ghost: "text-foreground hover:bg-accent-muted active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
};

export function Button({
  className,
  size = "md",
  variant = "primary",
  ref,
  onMouseEnter,
  onClick,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size; ref?: Ref<HTMLButtonElement> }) {
  return (
    <button
      className={cn(base, sizes[size], variants[variant], className)}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      aria-disabled={props.disabled}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  size = "md",
  variant = "primary",
  ref,
  onMouseEnter,
  onClick,
  prefetch,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size; ref?: Ref<HTMLAnchorElement> }) {
  return (
    <Link
      className={cn(base, sizes[size], variants[variant], className)}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      prefetch={prefetch ?? false}
      aria-disabled={(props as { disabled?: boolean }).disabled || (props as { "aria-disabled"?: boolean })["aria-disabled"]}
      {...props}
    />
  );
}
