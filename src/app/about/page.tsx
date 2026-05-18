import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { HomeTeam } from "@/components/sections/HomeTeam";

export const metadata: Metadata = {
  title: "About Us | Kivox",
  description:
    "We are a tight-knit studio of designers, developers, and strategists crafting digital experiences that endure.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden pb-16">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[0%] right-[0%] w-[250px] lg:w-[600px] h-[250px] lg:h-[600px] rounded-full blur-[80px] lg:blur-[200px]"
          style={{
            background: "var(--accent)",
            opacity: "calc(var(--hero-glow-opacity) * 0.4)",
          }}
        />
        <div
          className="absolute top-[20%] left-[-10%] w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] rounded-full blur-[80px] lg:blur-[200px]"
          style={{
            background: "var(--accent-rose)",
            opacity: "calc(var(--hero-glow-opacity) * 0.2)",
          }}
        />
      </div>

      <Container className="relative z-10 pt-32 lg:pt-48 pb-16 lg:pb-32">
        <div className="max-w-4xl">
          <p className="studio-eyebrow text-accent mb-6">[ About Kivox ]</p>
          <h1 className="studio-h1-headline text-foreground mb-8">
            We build digital experiences that{" "}
            <em className="font-serif italic text-accent">endure.</em>
          </h1>
          <p className="studio-body-large text-muted-foreground max-w-2xl mb-12">
            Kivox is a tight-knit studio of designers, developers, and strategists. We partner with ambitious businesses to craft websites and applications that are not only beautiful, but technically flawless and built to earn trust.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-border">
             <div>
                <h2 className="studio-h3-sans text-foreground mb-4">Our Approach</h2>
                <p className="studio-body text-muted-foreground">
                   We don&apos;t do layers, and we don&apos;t hand off work to strangers. Every project is handled directly by the principals, ensuring that the strategic vision matches the final shipped product pixel for pixel.
                </p>
             </div>
             <div>
                <h2 className="studio-h3-sans text-foreground mb-4">Our Values</h2>
                <p className="studio-body text-muted-foreground">
                   Honesty in communication, clarity in design, and rigor in engineering. We believe that good software should feel invisible, letting your brand and business take center stage.
                </p>
             </div>
          </div>
        </div>
      </Container>
      
      {/* Re-use the Team component from the home page */}
      <HomeTeam />
    </div>
  );
}
