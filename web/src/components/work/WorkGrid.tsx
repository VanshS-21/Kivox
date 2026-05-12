import { WorkCase } from "./WorkCase";

export function WorkGrid({
  items,
}: {
  items: Array<{
    id: string;
    title: string;
    demonstrates: string;
    targetAudience: string[];
    primaryActions: string[];
    coreSections: string[];
    uxDecisions: string[];
    proofNotes: string[];
  }>;
}) {
  return (
    <div className="flex flex-col gap-8">
      {items.map((item) => (
        <WorkCase
          coreSections={item.coreSections}
          demonstrates={item.demonstrates}
          key={item.id}
          primaryActions={item.primaryActions}
          proofNotes={item.proofNotes}
          targetAudience={item.targetAudience}
          title={item.title}
          uxDecisions={item.uxDecisions}
        />
      ))}
    </div>
  );
}
