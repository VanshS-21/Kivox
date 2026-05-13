import { Fragment } from "react";

import { legal } from "@/content/pages/legal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Prose } from "@/components/ui/Prose";

export default function TermsPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container size="narrow">
        <Eyebrow>Terms</Eyebrow>
        <h1 className="mt-3 studio-h1 font-sans font-bold text-foreground">{legal.terms.title}</h1>
        <p className="mt-4 studio-lede">{legal.terms.intro}</p>

        <Prose className="mt-10">
          {legal.terms.sections.map((section) => (
            <Fragment key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs?.map((p) => <p key={p}>{p}</p>)}
              {section.bullets ? (
                <ul>
                  {section.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </Fragment>
          ))}
        </Prose>
      </Container>
    </div>
  );
}
