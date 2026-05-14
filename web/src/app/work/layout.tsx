import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work | Kivox",
  description:
    "Studio demonstrations across healthcare, hospitality, education, and fitness. See how Kivox builds websites that earn trust and drive action.",
  alternates: {
    canonical: "/work",
  },
  openGraph: {
    title: "Our Work | Kivox",
    description:
      "Studio demonstrations across healthcare, hospitality, education, and fitness.",
    url: "/work",
    siteName: "Kivox",
    type: "website",
  },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
