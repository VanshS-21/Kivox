"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Optional fallback UI. Defaults to nothing (transparent). */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Lightweight error boundary for canvas/animation components.
 * Catches runtime errors and renders a transparent fallback so the
 * rest of the page continues to function.
 */
export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[CanvasErrorBoundary] Caught:", error, info.componentStack);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
