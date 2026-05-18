"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

import { team } from "@/content/team";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { viewportOnce, fadeUp, transitionDefault } from "@/lib/motion";

export function HomeTeam() {
  const reduce = useReducedMotion();

  return (
    <Section
      className="relative overflow-hidden bg-background border-t border-border scroll-mt-28"
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
            <em
              className="font-serif italic text-accent"
              style={{ fontStyle: "italic" }}
            >
              People.
            </em>
          </h2>
          <p className="studio-lede max-w-xl">
            {team.intro}
          </p>
        </motion.div>

        {/* ── Team Grid (3 columns, constrained width) ── */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-x-3 sm:gap-x-6 md:gap-x-8 gap-y-8 lg:gap-y-12">
          {team.members.map((member, idx) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              idx={idx}
              reduce={reduce}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TeamMemberCard({
  member,
  idx,
  reduce,
}: {
  member: {
    id: string;
    name: string;
    role: string;
    focus: string;
    quote: string;
    image: string;
    objectPosition?: string;
  };
  idx: number;
  reduce: boolean | null;
}) {
  const [showQuote, setShowQuote] = useState(false);

  return (
    <motion.div
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
      <button
        type="button"
        aria-expanded={showQuote}
        aria-label={`${showQuote ? "Hide" : "Show"} ${member.name}'s note`}
        className="relative mb-5 w-full overflow-hidden rounded-xl bg-surface group/portrait cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        onClick={() => setShowQuote((current) => !current)}
      >
        <div className="aspect-square relative">
          <Image
            src={member.image}
            alt={`Profile card for ${member.name}, ${member.role} at Kivox`}
            fill
            loading="eager"
            quality={80}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: member.objectPosition || "top" }}
            sizes="(min-width: 1280px) 363px, (min-width: 1024px) calc((100vw - 192px) / 3), (min-width: 768px) calc((100vw - 128px) / 2), (min-width: 640px) calc((100vw - 72px) / 2), calc((100vw - 60px) / 2)"
          />
        </div>

        {/* Mobile Quote Overlay (Tap to show) */}
        <div
          className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background/90 via-background/60 to-transparent p-5 pt-16 transition-all duration-300 md:hidden ${
            showQuote
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <p className="text-[12px] sm:text-[14px] italic text-foreground/90 border-t border-accent/60 pt-3">
            &quot;{member.quote}&quot;
          </p>
        </div>
      </button>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between items-start mb-1 gap-1.5 xl:gap-0">
          <h3 className="studio-h4-sans text-[15px] sm:text-lg text-foreground transition-colors duration-300 group-hover:text-accent">
            {member.name}
          </h3>
          <span className="studio-tag text-[9px] sm:text-[10px] text-accent/80 border border-accent/20 px-1.5 sm:px-2 py-0.5 rounded-full">
            {member.role}
          </span>
        </div>

        {/* Desktop Quote (Always visible) */}
        <p className="hidden md:block mt-4 border-t border-accent/40 pt-4 text-[14px] italic text-muted-foreground/80">
          &quot;{member.quote}&quot;
        </p>
      </div>
    </motion.div>
  );
}
