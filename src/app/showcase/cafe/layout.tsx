import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CafeProvider } from "./context";
import { CafeNav, CafeFooter } from "./components";
import { cafeTokens } from "./tokens";

export const metadata: Metadata = {
  title: "The Roastery Cafe | Kivox Showcase",
  description:
    "A visit-intent and menu-first specialty cafe experience with local bean shop and pickup cart.",
};

export default function CafeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <CafeProvider>
      <div
        className="cafe-scope min-h-screen flex flex-col font-sans"
        style={{
          backgroundColor: cafeTokens.color.bgIvory,
          color: cafeTokens.color.inkDark,
          fontFamily: cafeTokens.font.body,
        }}
      >
        <CafeNav />
        {/* Main Content Area - offset by navbar height (approx 80px) and global ShowcaseFrame height (approx 48px) */}
        <main className="flex-grow pt-24">{children}</main>
        <CafeFooter />
      </div>
    </CafeProvider>
  );
}
