import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { Analytics } from "@/components/analytics/Analytics";
import { DevThemeOverride } from "@/components/dev/DevThemeOverride";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { SkipLink } from "@/components/site/SkipLink";
import { homeSeo } from "@/content/seo/home";
import { getMetadataBase } from "@/lib/metadata";
import { getOrganizationJsonLd } from "@/lib/structuredData";
import { themeInitScript } from "@/lib/themeScript";

const sans = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
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
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript() }} />
        <DevThemeOverride />
        <SkipLink />
        <Header />
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
