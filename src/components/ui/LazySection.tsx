"use client";

import { useRef, useState, useEffect, ReactNode } from "react";

export function LazySection({ children, rootMargin = "200px" }: { children: ReactNode; rootMargin?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    
    observer.observe(ref.current);
    
    return () => {
      observer.disconnect();
    };
  }, [rootMargin]);

  return (
    <div ref={ref}>
      {inView ? children : <div style={{ height: "50vh" }} />}
    </div>
  );
}
