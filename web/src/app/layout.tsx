import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Figtree,
  Geist_Mono,
  Spectral,
} from "next/font/google";
import "./globals.css";

import { Analytics } from "@/components/analytics/Analytics";
import { DevThemeOverride } from "@/components/dev/DevThemeOverride";
import { Footer } from "@/components/site/Footer";
import { Navigation } from "@/components/Navigation";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { SkipLink } from "@/components/site/SkipLink";
import { homeSeo } from "@/content/seo/home";
import { getMetadataBase } from "@/lib/metadata";
import { getOrganizationJsonLd } from "@/lib/structuredData";
import { themeInitScript } from "@/lib/themeScript";

const sans = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-headline",
});

const serif = Spectral({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-spectral",
  style: ["normal", "italic"],
});

const body = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-sans",
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  metadataBase: getMetadataBase(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getOrganizationJsonLd();

  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <DevThemeOverride />
        <ScrollProgress />
        <SkipLink />
        <Navigation />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
        <Analytics />
      </body>
    </html>
  );
}
