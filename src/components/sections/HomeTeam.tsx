"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { team } from "@/content/team";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { easeOutExpo, viewportOnce, fadeUp, transitionDefault } from "@/lib/motion";
import { cn } from "@/lib/cn";

export function HomeTeam() {
  const reduce = useReducedMotion();

  return (
    <Section
      className="relative overflow-hidden bg-surface-alt"
      spacing="default"
      id="team"
    >
      <Container>
        {/* ── Section header ── */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={viewportOnce}
          variants={fadeUp}
          transition={transitionDefault}
          className="mb-12 md:mb-16"
        >
          <h2 className="studio-h2-editorial text-foreground mb-4">
            Built by{" "}
            <em className="font-serif italic text-accent" style={{ fontStyle: "italic" }}>
              People.
            </em>
          </h2>
          <p className="studio-body-serif text-muted-foreground max-w-xl">
            {team.intro}
          </p>
        </motion.div>

        {/* ── Team Grid (3 columns, constrained width) ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 md:gap-x-8 gap-y-10 lg:gap-y-12">
          {team.members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={reduce ? false : "hidden"}
              whileInView={reduce ? undefined : "show"}
              viewport={viewportOnce}
              variants={fadeUp}
              transition={{
                ...transitionDefault,
                delay: idx * 0.1,
              }}
              className="group flex flex-col"
            >
              {/* Portrait */}
              <div className="relative mb-5 overflow-hidden rounded-xl bg-surface">
                <div className="aspect-square relative">
                  <Image
                    src={member.image}
                    alt={`${member.name}, ${member.role} at Kivox`}
                    fill
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="studio-h4-sans text-foreground transition-colors duration-300 group-hover:text-accent">
                    {member.name}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-accent/80 border border-accent/20 px-2 py-0.5 rounded-full">
                    {member.role}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {member.focus}
                </p>
                
                {/* Quote (Always visible) */}
                <p className="mt-4 text-[14px] italic text-muted-foreground/80 border-l-2 border-accent/40 pl-3">
                  &quot;{member.quote}&quot;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
