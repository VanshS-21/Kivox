"use client";

import React, { ReactNode } from "react";

interface CursorTriggerProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  icon?: ReactNode;
  text?: string;
  variant?: string;
}

export function CursorTrigger({
  children,
  className,
  as: Component = "div",
}: CursorTriggerProps) {
  return (
    <Component className={className}>
      {children}
    </Component>
  );
}
