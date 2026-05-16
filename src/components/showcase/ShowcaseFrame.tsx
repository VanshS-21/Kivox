"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/* Showcase route name → case study slug (when they differ) */
const showcaseToCaseStudy: Record<string, string> = {
  medqueue: "hospital",
};

export function ShowcaseFrame() {
  const pathname = usePathname();

  // Extract showcase name from the 3rd path segment: /showcase/{name}/...
  const segments = pathname.split("/").filter(Boolean);
  const showcaseName = segments[1] || "";
  const caseStudySlug = showcaseToCaseStudy[showcaseName] || showcaseName;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-black text-white border-b border-white/10 font-sans text-sm">
      <div className="flex items-center gap-4">
        <Link
          href={`/work/${caseStudySlug}`}
          className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Study</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <span className="opacity-50 tracking-widest uppercase text-xs font-semibold">Kivox Demo</span>
      </div>
    </div>
  );
}
