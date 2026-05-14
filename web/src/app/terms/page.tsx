import { legal } from "@/content/pages/legal";
import { LegalPageLayout } from "@/components/ui/LegalPageLayout";

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="Terms"
      title={legal.terms.title}
      intro={legal.terms.intro}
      sections={legal.terms.sections}
    />
  );
}
