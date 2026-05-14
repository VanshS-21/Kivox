"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface LoadingContextType {
  isReady: boolean;
  setReady: (ready: boolean) => void;
  hasSeenLoader: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setReady] = useState(false);
  const [hasSeenLoader, setHasSeenLoader] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("kivox_loaded");
    if (seen) {
      setHasSeenLoader(true);
      setReady(true);
    }
    // If not seen, it stays false and the LoadingScreen will handle the rest
  }, []);

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
