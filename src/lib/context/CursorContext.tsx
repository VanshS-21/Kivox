"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type CursorVariant = "default" | "hover" | "text" | "video" | "hidden";

export interface CursorState {
  variant: CursorVariant;
  text?: string;
  icon?: ReactNode;
}

interface CursorContextType {
  state: CursorState;
  setCursor: (state: Partial<CursorState>) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>({ variant: "default" });

  const setCursor = useCallback((newState: Partial<CursorState>) => {
    setState((prev) => ({ ...prev, ...newState }));
  }, []);

  const resetCursor = useCallback(() => {
    setState({ variant: "default", text: undefined, icon: undefined });
  }, []);

  return (
    <CursorContext.Provider value={{ state, setCursor, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
