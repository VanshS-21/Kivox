import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SchoolProvider } from "./context";
import { SchoolNav, SchoolFooter } from "./components";
import { schoolTokens } from "./tokens";

export const metadata: Metadata = {
  title: "Greenfield Academy | Kivox Showcase",
  description:
    "Deconstructed academic school showcase with progressive CISCE & IB Harkness seminar programs, custom admissions inquiries, and parent status dashboard in Bengaluru.",
};

export default function SchoolLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SchoolProvider>
      <div
        className="school-scope min-h-screen flex flex-col font-sans selection:bg-[#8A9A5B] selection:text-white"
        style={{
          backgroundColor: schoolTokens.color.bgIvory,
          color: schoolTokens.color.inkDark,
          fontFamily: schoolTokens.font.body,
        }}
      >
        <SchoolNav />
        {/* Main Content Area - offset by navbar height (approx 80px) and global ShowcaseFrame height (approx 48px) */}
        <main className="flex-grow pt-24">{children}</main>
        <SchoolFooter />
      </div>
    </SchoolProvider>
  );
}
