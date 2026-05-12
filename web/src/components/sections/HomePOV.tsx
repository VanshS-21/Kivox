"use client";

import { home } from "@/content/pages/home";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Panel } from "@/components/ui/Panel";
import { Section } from "@/components/ui/Section";

export function HomePOV() {
  return (
    <Section id="pov">
      <Container>
        <Panel padding="lg" noise={false} className="studio-surface--quiet">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Eyebrow>Point of view</Eyebrow>
              <h2 className="studio-h2 text-foreground">{home.pov.title}</h2>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                A simple set of principles that keeps the work honest and the site usable.
              </p>
            </div>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {home.pov.bullets.map((b) => (
                <li
                  key={b}
                  className="rounded-[var(--radius-md)] border border-border-soft bg-surface-0/60 p-4 text-sm leading-6 text-muted-foreground"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </Panel>
      </Container>
    </Section>
  );
}

