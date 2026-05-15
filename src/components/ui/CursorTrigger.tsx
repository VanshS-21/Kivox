"use client";

import React, { ReactNode } from "react";
import { useCursor, CursorState } from "@/lib/context/CursorContext";

interface CursorTriggerProps extends Partial<CursorState> {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function CursorTrigger({
  children,
  className,
  as: Component = "div",
  variant = "hover",
  text,
  icon,
}: CursorTriggerProps) {
  const { setCursor, resetCursor } = useCursor();

  return (
    <Component
      className={className}
      onMouseEnter={() => setCursor({ variant, text, icon })}
      onMouseLeave={() => resetCursor()}
    >
      {children}
    </Component>
  );
}
