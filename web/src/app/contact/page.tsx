import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Panel } from "@/components/ui/Panel";
import { brand } from "@/content/brand";
import { contact } from "@/content/pages/contact";

export default function ContactPage() {
  const tel = brand.contact.phone.replace(/\s+/g, "");

  return (
    <div className="py-16 sm:py-20">
      <Container size="narrow">
        <div className="flex flex-col gap-3">
          <Eyebrow>Inquiry</Eyebrow>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {contact.title}
          </h1>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">{contact.intro}</p>
        </div>

        <div className="mt-10">
          <Panel padding="md">
            <InquiryForm />
          </Panel>
        </div>

        <div className="mt-6">
          <Panel padding="md" noise={false} className="studio-surface--quiet">
            <div className="text-sm font-semibold text-foreground">What happens next</div>
            <ol className="mt-4 grid grid-cols-1 gap-4">
              {[
                "Confirm receipt (you’ll get a quick reply).",
                "Ask 2–3 clarifying questions to scope it correctly.",
                "Propose scope + timeline + the next call.",
              ].map((line, idx) => (
                <li key={line} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface-0 font-mono text-xs text-foreground shadow-[var(--shadow-1)]">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="pt-1 text-sm leading-6 text-muted-foreground">{line}</div>
                </li>
              ))}
            </ol>
          </Panel>
        </div>

        <div className="mt-8 space-y-2 text-sm text-muted-foreground">
          <div>
            Email:{" "}
            <a className="font-medium text-foreground hover:text-foreground/80" href={`mailto:${brand.contact.email}`}>
              {brand.contact.email}
            </a>
          </div>
          <div>
            Phone:{" "}
            <a className="font-medium text-foreground hover:text-foreground/80" href={`tel:${tel}`}>
              {brand.contact.phone}
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
