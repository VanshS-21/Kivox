import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Kivox",
  description:
    "Terms and conditions for using Kivox services. Read our terms of engagement, liability, and intellectual property policies.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
