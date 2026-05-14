import { legal } from "@/content/pages/legal";
import { LegalPageLayout } from "@/components/ui/LegalPageLayout";

export default function PrivacyPage() {
  return (
    <LegalPageLayout
      eyebrow="Privacy"
      title={legal.privacy.title}
      intro={legal.privacy.intro}
      sections={legal.privacy.sections}
    />
  );
}
