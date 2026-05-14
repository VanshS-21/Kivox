import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Kivox",
  description:
    "How Kivox collects, uses, and protects your personal information. Read our privacy practices.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
