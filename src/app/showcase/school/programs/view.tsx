"use client";

import Image from "next/image";
import { useSchool } from "../context";
import { schoolTokens, routes } from "../tokens";
import { SchoolButton } from "../components";
import { BookOpen, Users, Milestone, FolderOpen } from "lucide-react";

export default function SchoolProgramsView() {
  const { programs } = useSchool();

  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto font-sans min-h-screen animate-fade-in" style={{ backgroundColor: schoolTokens.color.bgIvory }}>
      {/* Header */}
      <div className="max-w-3xl mb-20 space-y-4 mt-16">
        <span 
          className="text-[10px] font-bold tracking-[0.25em] uppercase block animate-slide-up"
          style={{ color: schoolTokens.color.sage }}
        >
          Curriculum Architecture
        </span>
        <h1 
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight animate-slide-up"
          style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
        >
          Academic Divisions
        </h1>
        <p className="text-sm md:text-base text-black/70 leading-relaxed font-light font-sans animate-slide-up">
          Greenfield Academy provides an inquiry-led, student-centric curriculum pathway. From play-based emergent literacy in Early Years to peer-reviewed Harkness roundtable seminar defenses in Upper School, we cultivate critical minds.
        </p>
      </div>

      {/* Program cards (Dossier Folders) */}
      <div className="space-y-20">
        {programs.map((program, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div key={program.id} className="relative pt-8 group">
              {/* Folder Tab */}
              <div 
                className="absolute top-0 left-6 h-8 px-5 rounded-t-xl text-[9px] font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 border-t border-x z-10 transition-colors duration-300"
                style={{ 
                  borderColor: "oklch(0.24 0.025 145 / 0.12)", 
                  backgroundColor: "white",
                  color: schoolTokens.color.sage 
                }}
              >
                <FolderOpen className="w-3.5 h-3.5" style={{ color: schoolTokens.color.sage }} />
                <span>Dossier: Division {idx + 1} • {program.id}</span>
              </div>

              {/* Folder Body */}
              <div
                className="grid lg:grid-cols-12 gap-12 items-center border p-6 md:p-10 rounded-3xl rounded-tl-none bg-white shadow-xl transition-all duration-500 hover:shadow-2xl relative z-0"
                style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
              >
                {/* Image */}
                <div
                  className={`lg:col-span-6 relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={program.image}
                    alt={program.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Text */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="space-y-2">
                    <span 
                      className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono"
                      style={{ color: schoolTokens.color.sage }}
                    >
                      {program.subtitle}
                    </span>
                    <h2 
                      className="text-3xl font-bold tracking-tight"
                      style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
                    >
                      {program.title}
                    </h2>
                  </div>

                  <p className="text-sm text-black/75 leading-relaxed font-light">
                    {program.description}
                  </p>

                  {/* Short stats */}
                  <div 
                    className="flex flex-wrap gap-6 py-4 border-y"
                    style={{ borderColor: "oklch(0.24 0.025 145 / 0.1)" }}
                  >
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: schoolTokens.color.bgGreenDark }}>
                      <Users className="w-4 h-4" style={{ color: schoolTokens.color.sage }} />
                      <span>{program.ratio}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: schoolTokens.color.bgGreenDark }}>
                      <BookOpen className="w-4 h-4" style={{ color: schoolTokens.color.sage }} />
                      <span>Interactive Inquiry Framework</span>
                    </div>
                  </div>

                  {/* Milestones list */}
                  <div className="space-y-3">
                    <h4 
                      className="text-[10px] font-bold uppercase tracking-[0.15em]"
                      style={{ color: schoolTokens.color.sage }}
                    >
                      Academic Progression & Focus
                    </h4>
                    <ul className="space-y-2">
                      {program.milestones.map((milestone, mIdx) => (
                        <li key={mIdx} className="flex gap-2 text-xs text-black/80 font-light">
                          <Milestone className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: schoolTokens.color.sage }} />
                          <span>{milestone}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <SchoolButton href={routes.programDetail(program.id)} variant="outline" className="!rounded-full hover:shadow-sm">
                      View Syllabus & Daily Rhythm
                    </SchoolButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
