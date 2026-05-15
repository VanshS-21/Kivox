"use client";

import Link from "next/link";
import type { ComponentProps, Ref } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full font-medium transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--bg)] disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[var(--shadow-1)]",
  secondary:
    "bg-surface-1 text-foreground border border-border shadow-[var(--shadow-1)] hover:shadow-[var(--shadow-2)] hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-foreground hover:bg-surface-2",
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
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; size?: Size; ref?: Ref<HTMLAnchorElement> }) {
  return (
    <Link
      className={cn(base, sizes[size], variants[variant], className)}
      ref={ref}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      {...props}
    />
  );
}
