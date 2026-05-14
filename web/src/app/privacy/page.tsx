import { Fragment } from "react";

import { legal } from "@/content/pages/legal";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Prose } from "@/components/ui/Prose";

export default function PrivacyPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-16 sm:pb-20">
      <Container size="narrow">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="mt-3 studio-h2 font-sans font-bold text-foreground">{legal.privacy.title}</h1>
        <p className="mt-4 studio-lede">{legal.privacy.intro}</p>

        <Prose className="mt-10">
          {legal.privacy.sections.map((section) => (
            <Fragment key={section.title}>
              <h2>{section.title}</h2>
              {section.lead ? <p>{section.lead}</p> : null}
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
