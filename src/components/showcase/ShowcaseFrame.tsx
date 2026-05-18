"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, LayoutGrid } from "lucide-react";

/* Showcase route name -> case study slug (when they differ) */
const showcaseToCaseStudy: Record<string, string> = {
  medqueue: "hospital",
};

export function ShowcaseFrame() {
  const pathname = usePathname();

  // Extract showcase name from /showcase/{name}/...
  const segments = pathname.split("/").filter(Boolean);
  const showcaseName = segments[1] || "";
  const caseStudySlug = showcaseToCaseStudy[showcaseName] || showcaseName;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex min-h-12 items-center justify-between gap-3 border-b border-[var(--border)] bg-[var(--bg-primary)] px-4 py-1.5 font-sans text-sm text-[var(--fg-primary)] sm:px-6">
      <div className="flex min-w-0 items-center gap-4">
        <Link
          href={`/work/${caseStudySlug}`}
          prefetch={false}
          className="flex min-h-11 min-w-0 items-center gap-2 opacity-70 transition-opacity hover:opacity-100"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          <span className="truncate">
            <span className="hidden sm:inline">Back to </span>Case Study
          </span>
        </Link>
      </div>
      <div className="flex shrink-0 items-center gap-4">
        <Link
          href="/work"
          prefetch={false}
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border)] px-3 text-xs font-semibold uppercase tracking-[0.12em] opacity-75 transition-opacity hover:opacity-100"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
          <span>All Work</span>
        </Link>
        <span className="hidden opacity-50 tracking-widest uppercase text-xs font-semibold sm:inline">
          Kivox Demo
        </span>
      </div>
    </div>
  );
}
