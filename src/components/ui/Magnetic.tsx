"use client";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({
  children,
  className = "inline-block",
}: MagneticProps) {
  return <div className={className}>{children}</div>;
}
