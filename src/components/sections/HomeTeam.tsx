"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from "motion/react";

import { team } from "@/content/team";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { viewportOnce, fadeUp, transitionDefault } from "@/lib/motion";

export function HomeTeam() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <Section
      ref={sectionRef}
      className="relative overflow-hidden bg-background border-t border-border"
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
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-3 gap-x-3 sm:gap-x-6 md:gap-x-8 gap-y-8 lg:gap-y-12">
          {team.members.map((member, idx) => (
            <TeamMemberCard key={member.id} member={member} idx={idx} reduce={reduce} sectionRef={sectionRef} />
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TeamMemberCard({ member, idx, reduce, sectionRef }: { member: { id: string; name: string; role: string; focus: string; quote: string; image: string; objectPosition?: string; }; idx: number; reduce: boolean | null; sectionRef: React.RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  
  // Parallax on portrait
  const rawY = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const y = useSpring(rawY, { stiffness: 100, damping: 30, restDelta: 0.001 });

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
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className="group flex flex-col"
    >
      {/* Portrait */}
      <div 
        className="relative mb-5 overflow-hidden rounded-xl bg-surface group/portrait cursor-pointer"
        onClick={() => setShowQuote(!showQuote)}
      >
        <motion.div className="aspect-square relative" style={{ y: reduce ? 0 : y, scale: 1.15 }}>
          <Image
            src={member.image}
            alt={`${member.name}, ${member.role} at Kivox`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{ objectPosition: member.objectPosition || "top" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
        
        {/* Mobile Quote Overlay (Tap to show) */}
        <div 
          className={`absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-background/90 via-background/60 to-transparent p-5 pt-16 transition-all duration-300 md:hidden ${
            showQuote ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
          }`}
        >
          <p className="text-[12px] sm:text-[14px] italic text-foreground/90 border-l-2 border-accent/60 pl-2 sm:pl-3">
            &quot;{member.quote}&quot;
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between items-start mb-1 gap-1.5 xl:gap-0">
          <h3 className="studio-h4-sans text-[15px] sm:text-lg text-foreground transition-colors duration-300 group-hover:text-accent">
            {member.name}
          </h3>
          <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-accent/80 border border-accent/20 px-1.5 sm:px-2 py-0.5 rounded-full">
            {member.role}
          </span>
        </div>
        

        {/* Desktop Quote (Always visible) */}
        <p className="hidden md:block mt-4 text-[14px] italic text-muted-foreground/80 border-l-2 border-accent/40 pl-3">
          &quot;{member.quote}&quot;
        </p>
      </div>
    </motion.div>
  );
}
