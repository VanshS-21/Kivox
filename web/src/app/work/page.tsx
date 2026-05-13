import { WorkGrid } from "@/components/work/WorkGrid";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Panel } from "@/components/ui/Panel";
import { studioWorkPolicy } from "@/content/work/studio-work-policy";
import { work } from "@/content/pages/work";

export default function WorkPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <div className="flex flex-col gap-3">
          <Eyebrow>{work.label}</Eyebrow>
          <h1 className="studio-h1 font-sans font-bold text-foreground">
            {work.title}
          </h1>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground studio-lede">{work.intro}</p>
        </div>
        <div className="mt-10">
          <WorkGrid items={work.items} />
        </div>
        <div className="mt-14">
          <Panel padding="md" noise={false} className="studio-surface--quiet">
            <div className="flex flex-col gap-3">
              <div className="studio-eyebrow text-muted-foreground">
                Policy
              </div>
              <div className="text-sm font-semibold text-foreground">Proof policy</div>
              <ul className="mt-1 list-disc space-y-2 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/70">
                {studioWorkPolicy.cannotSay.slice(0, 4).map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </Panel>
        </div>
      </Container>
    </div>
  );
}
