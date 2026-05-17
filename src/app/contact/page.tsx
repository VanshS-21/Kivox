import { InquiryForm } from "@/components/inquiry/InquiryForm";
import { Container } from "@/components/ui/Container";
import { contact } from "@/content/pages/contact";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[5%] right-[10%] w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] rounded-full blur-[80px] lg:blur-[200px]"
          style={{
            background: "var(--accent)",
            opacity: "calc(var(--hero-glow-opacity) * 0.5)",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[5%] w-[200px] lg:w-[400px] h-[200px] lg:h-[400px] rounded-full blur-[80px] lg:blur-[180px]"
          style={{
            background: "var(--accent-rose)",
            opacity: "calc(var(--hero-glow-opacity) * 0.3)",
          }}
        />
      </div>

      <Container size="wide" className="relative z-10 pt-24 sm:pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24">
          
          {/* 1. Header (Mobile: Top, Desktop: Top-Left) */}
          <div className="lg:col-start-1 lg:col-span-5 lg:row-start-1 order-1 mb-2 lg:mb-10">
            <h1 className="studio-h1-headline text-foreground mb-5">
              Let&apos;s grow your
              <br />
              <em
                className="font-serif font-normal text-accent"
                style={{ fontStyle: "italic" }}
              >
                business.
              </em>
            </h1>

            <p className="studio-body-serif text-muted-foreground max-w-xl">
              {contact.intro}
            </p>
          </div>

          {/* 2. Form (Mobile: Middle, Desktop: Right side spanning full height) */}
          <div className="lg:col-start-6 lg:col-span-7 xl:col-start-7 xl:col-span-6 lg:row-start-1 lg:row-span-2 order-2">
            <InquiryForm />
          </div>

          {/* 3. What happens next (Mobile: Bottom, Desktop: Bottom-Left) */}
          <div className="lg:col-start-1 lg:col-span-5 lg:row-start-2 order-3 mt-4 lg:mt-auto self-end">
            <div className="h-px bg-border mb-10 origin-left" />
            <h2 className="studio-h3-sans text-foreground mb-8">
              What happens next
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8">
              {[
                {
                  step: "01",
                  text: "We'll review your details and get back to you within 24 hours.",
                },
                {
                  step: "02",
                  text: "We'll ask a few simple questions to understand exactly what you need.",
                },
                { step: "03", text: "We'll share a clear plan, a timeline, and a transparent price." },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex flex-col lg:flex-row gap-3 lg:gap-6 lg:items-start"
                >
                  <span className="studio-eyebrow text-accent studio-tabular shrink-0">
                    {item.step}
                  </span>
                  <p className="studio-body text-muted-foreground mt-[-2px]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
