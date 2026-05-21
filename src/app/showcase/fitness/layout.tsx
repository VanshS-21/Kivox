import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FitnessProvider } from "./context";
import { FitnessNav, FitnessFooter } from "./components";
import { fitnessTokens } from "./tokens";

export const metadata: Metadata = {
  title: "Vortex Fitness | Elite Gym & Conditioning | Bengaluru",
  description:
    "Impeccable strength, endurance, and conditioning hub in Bengaluru. Experience premium facilities, expert personal coaching, and real-time class booking.",
};

export default function FitnessLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <FitnessProvider>
      <div
        className="fitness-scope min-h-screen flex flex-col font-sans selection:bg-[#CCFF00] selection:text-black"
        style={{
          backgroundColor: fitnessTokens.color.bgBlack,
          color: fitnessTokens.color.inkWhite,
          fontFamily: fitnessTokens.font.body,
        }}
      >
        <FitnessNav />
        {/* Main Content Area - offset by navbar height (approx 80px) and global ShowcaseFrame height (approx 48px) */}
        <main className="flex-grow pt-24">{children}</main>
        <FitnessFooter />
      </div>
    </FitnessProvider>
  );
}
