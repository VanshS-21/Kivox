"use client";

import { createContext, useContext, useState } from "react";

interface LoadingContextType {
  isReady: boolean;
  setReady: (ready: boolean) => void;
  hasSeenLoader: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setReady] = useState(true);
  const [hasSeenLoader] = useState(true);

  return (
    <LoadingContext.Provider value={{ isReady, setReady, hasSeenLoader }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoadingContext() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error("useLoadingContext must be used within a LoadingProvider");
  }
  return context;
}
