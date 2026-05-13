"use client";

import { motion, useReducedMotion } from "motion/react";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Panel } from "@/components/ui/Panel";
import { fadeUp, stagger, transitionDefault, viewportOnce } from "@/lib/motion";

export function WorkCase({
  title,
  demonstrates,
  targetAudience,
  primaryActions,
  coreSections,
  uxDecisions,
  proofNotes,
}: {
  title: string;
  demonstrates: string;
  targetAudience: string[];
  primaryActions: string[];
  coreSections: string[];
  uxDecisions: string[];
  proofNotes: string[];
}) {
  const reduce = useReducedMotion();

  return (
    <article className="not-prose">
      <Panel
        padding="lg"
        noise={false}
        className="studio-surface--quiet"
      >
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={stagger}
        >
          <motion.div variants={fadeUp} transition={transitionDefault}>
            <Eyebrow className="mb-3">Studio Demonstration</Eyebrow>
            <h2 className="studio-h2 font-serif text-foreground">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground studio-lede">{demonstrates}</p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.04 }}
            className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2"
          >
            <Meta title="Target audience" items={targetAudience} />
            <Meta title="Primary actions" items={primaryActions} />
            <Meta title="Core sections" items={coreSections} />
            <Meta title="Key UX decisions" items={uxDecisions} />
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ ...transitionDefault, delay: 0.08 }}
            className="mt-8 border-t border-border pt-5 text-sm text-muted-foreground"
          >
            {proofNotes.join(" · ")}
          </motion.div>
        </motion.div>
      </Panel>
    </article>
  );
}

function Meta({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="studio-eyebrow text-muted-foreground">
        {title}
      </div>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground marker:text-muted-foreground/70">
        {items.map((v) => (
          <li key={v}>{v}</li>
        ))}
      </ul>
    </div>
  );
}
