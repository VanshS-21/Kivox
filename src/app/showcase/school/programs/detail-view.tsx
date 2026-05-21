"use client";

import Image from "next/image";
import { useSchool } from "../context";
import { schoolTokens, routes } from "../tokens";
import { SchoolButton } from "../components";
import { ArrowLeft, Users, GraduationCap, Compass, BookOpen, Check, Clock, CalendarRange } from "lucide-react";

const dailyRhythms: Record<string, { time: string; activity: string; desc: string }[]> = {
  "early-years": [
    { time: "08:30 - 09:00", activity: "Biophilic Exploration", desc: "Sensory nature trail walk around campus lake" },
    { time: "09:00 - 10:30", activity: "Phonics & Math Play Loops", desc: "Foundational phonics literacy and mathematical exploration" },
    { time: "10:30 - 11:00", activity: "Nourishment Break", desc: "Social break with fresh seasonal fruit" },
    { time: "11:00 - 12:30", activity: "Collaborative Art Studio", desc: "Interactive painting and pottery lessons" },
    { time: "12:30 - 13:30", activity: "Balanced Lunch & Rest", desc: "Chef-curated hot meal followed by quiet decompression" },
    { time: "13:30 - 15:00", activity: "Emergent Storytelling", desc: "Story circle and speech exercises before dismissal" },
  ],
  "middle-school": [
    { time: "08:00 - 08:30", activity: "Mentorship Circle", desc: "Daily goal setting and character dialogue with advisors" },
    { time: "08:30 - 10:00", activity: "Algorithmic Design & Coding", desc: "Robotics coding and practical math experiments" },
    { time: "10:00 - 10:30", activity: "Recreation Recess", desc: "Organized outdoor sports and refreshments" },
    { time: "10:30 - 12:00", activity: "Scientific Inquiry Labs", desc: "Physics and biology hands-on laboratory investigation" },
    { time: "12:00 - 13:00", activity: "Rhetoric & Discourse Seminar", desc: "Oral debate techniques and composition exercises" },
    { time: "13:00 - 13:45", activity: "Buffet Lunch & Socials", desc: "Balanced hot lunch in the central dining hall" },
    { time: "13:45 - 15:15", activity: "Visual Arts & Sports", desc: "Choice between classical music, theatre, or soccer clinic" },
  ],
  "upper-school": [
    { time: "08:00 - 08:15", activity: "Advisory Dossier Check-in", desc: "Brief academic standing and college applications review" },
    { time: "08:15 - 09:45", activity: "Harkness Seminar: Literature", desc: "Roundtable critical analysis of literary and historical texts" },
    { time: "09:45 - 10:15", activity: "Collaborative Study Prep", desc: "Quiet study and discussion in the library courtyard" },
    { time: "10:15 - 11:45", activity: "Advanced Science/Calculus Lab", desc: "Peer-reviewed science research and mathematical analysis" },
    { time: "11:45 - 13:00", activity: "Civics & Global Economics", desc: "Harkness discussion on global affairs and policy defenses" },
    { time: "13:00 - 13:45", activity: "Mentored Lunch", desc: "Informal lunch conversation with faculty and peers" },
    { time: "13:45 - 15:15", activity: "Senior Capstone Research", desc: "Independent research and preparation for thesis defense" },
  ],
};

export default function SchoolProgramDetailView() {
  const { programs, selectedId } = useSchool();
  const programId = selectedId || "";

  const program = programs.find((p) => p.id === programId);
  const rhythm = dailyRhythms[programId] || [];

  if (!program) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center space-y-6 font-sans min-h-screen flex flex-col justify-center items-center" style={{ backgroundColor: schoolTokens.color.bgIvory }}>
        <h1 className="text-3xl font-bold" style={{ color: schoolTokens.color.bgGreenDark }}>Program Not Found</h1>
        <p className="text-sm text-black/60">The curriculum division you are looking for does not exist or has been restructured.</p>
        <SchoolButton href={routes.programs} variant="primary" className="!rounded-full">
          Back to Programs
        </SchoolButton>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto font-sans min-h-screen animate-fade-in" style={{ backgroundColor: schoolTokens.color.bgIvory }}>
      {/* Back button */}
      <div className="mb-10 mt-16">
        <SchoolButton href={routes.programs} variant="outline" className="!min-h-9 !py-1 !px-5 !rounded-full text-xs hover:shadow-sm">
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back to Divisions
        </SchoolButton>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Main Details */}
        <div className="lg:col-span-8 space-y-8">
          <div 
            className="border p-6 md:p-10 rounded-3xl bg-white shadow-xl space-y-6"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
          >
            <div className="space-y-2">
              <span 
                className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono"
                style={{ color: schoolTokens.color.sage }}
              >
                {program.subtitle}
              </span>
              <h1 
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
                style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
              >
                {program.title} Division Syllabus
              </h1>
            </div>

            {/* Main Image */}
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-inner border border-black/5">
              <Image
                src={program.image}
                alt={program.title}
                fill
                sizes="(max-width: 1024px) 100vw, 70vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            <div className="space-y-4 pt-4">
              <h3 
                className="text-xl font-bold tracking-tight"
                style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
              >
                Syllabus Architecture & Ethos
              </h3>
              <p className="text-sm md:text-base text-black/75 leading-relaxed font-light">
                {program.longDescription}
              </p>
            </div>
          </div>

          {/* Timetable Section */}
          {rhythm.length > 0 && (
            <div 
              className="border p-6 md:p-10 rounded-3xl bg-white shadow-xl space-y-8"
              style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "oklch(0.62 0.08 115 / 0.1)", color: schoolTokens.color.sage }}
                >
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 
                    className="text-xl font-bold tracking-tight"
                    style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
                  >
                    Sample Daily Rhythm
                  </h3>
                  <p className="text-xs text-black/50">A structured outline of a student&apos;s typical school day</p>
                </div>
              </div>

              {/* Timeline Container */}
              <div className="relative pl-6 md:pl-8 border-l-2 ml-4 md:ml-6 py-2 space-y-8" style={{ borderColor: "oklch(0.24 0.025 145 / 0.15)" }}>
                {rhythm.map((item, idx) => (
                  <div key={idx} className="relative group">
                    {/* Bullet */}
                    <div 
                      className="absolute -left-[35px] md:-left-[43px] top-1 w-4 h-4 rounded-full border-2 bg-white transition-all duration-300 group-hover:scale-125"
                      style={{ 
                        borderColor: schoolTokens.color.sage,
                        boxShadow: `0 0 0 4px oklch(0.62 0.08 115 / 0.1)`
                      }}
                    />
                    
                    <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                      {/* Time */}
                      <span 
                        className="text-xs font-mono font-bold tracking-wider shrink-0 mt-0.5"
                        style={{ color: schoolTokens.color.sage }}
                      >
                        {item.time}
                      </span>
                      {/* Details */}
                      <div className="space-y-1">
                        <h4 
                          className="text-sm font-bold tracking-tight"
                          style={{ color: schoolTokens.color.bgGreenDark }}
                        >
                          {item.activity}
                        </h4>
                        <p className="text-xs text-black/60 leading-relaxed font-light font-sans">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Academic Pillars */}
          <div className="grid md:grid-cols-2 gap-6">
            <div 
              className="border p-6 rounded-2xl bg-white shadow-md space-y-4"
              style={{ borderColor: "oklch(0.24 0.025 145 / 0.1)" }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.24 0.025 145 / 0.05)", color: schoolTokens.color.bgGreenDark }}
              >
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg" style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}>Inquiry-Led Pedagogy</h3>
              <p className="text-xs text-black/70 leading-relaxed font-light font-sans">
                Our curriculum framework promotes peer question circles, hypothesis formulating, and active debate defenses over passive rote learning.
              </p>
            </div>

            <div 
              className="border p-6 rounded-2xl bg-white shadow-md space-y-4"
              style={{ borderColor: "oklch(0.24 0.025 145 / 0.1)" }}
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.24 0.025 145 / 0.05)", color: schoolTokens.color.bgGreenDark }}
              >
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg" style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}>Harkness Roundtables</h3>
              <p className="text-xs text-black/70 leading-relaxed font-light font-sans">
                Classrooms are centered on a circular wooden Harkness table, encouraging balanced collaborative dialogue, peer tutoring, and civil challenge.
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div 
            className="border p-6 rounded-3xl bg-white shadow-xl space-y-6"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
          >
            <h3 
              className="text-xs font-bold uppercase tracking-[0.15em] border-b pb-3"
              style={{ 
                color: schoolTokens.color.sage,
                borderColor: "oklch(0.24 0.025 145 / 0.1)"
              }}
            >
              Division Architecture
            </h3>

            <div className="space-y-4 font-sans">
              <div 
                className="flex justify-between items-center text-xs border-b pb-2"
                style={{ borderColor: "oklch(0.24 0.025 145 / 0.05)" }}
              >
                <span className="text-black/60 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" style={{ color: schoolTokens.color.sage }} /> Class Size:
                </span>
                <span className="font-bold" style={{ color: schoolTokens.color.bgGreenDark }}>{program.ratio}</span>
              </div>

              <div 
                className="flex justify-between items-center text-xs border-b pb-2"
                style={{ borderColor: "oklch(0.24 0.025 145 / 0.05)" }}
              >
                <span className="text-black/60 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" style={{ color: schoolTokens.color.sage }} /> Pathway:
                </span>
                <span className="font-bold" style={{ color: schoolTokens.color.bgGreenDark }}>CISCE & IB Standards</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-black/60 flex items-center gap-1.5">
                  <CalendarRange className="w-3.5 h-3.5" style={{ color: schoolTokens.color.sage }} /> Academic Focus:
                </span>
                <span className="font-bold" style={{ color: schoolTokens.color.bgGreenDark }}>Critical Enquiry</span>
              </div>
            </div>

            <div className="pt-2">
              <SchoolButton href={routes.inquiry} variant="primary" className="w-full !rounded-full shadow-md hover:shadow-lg">
                Apply for Admission
              </SchoolButton>
            </div>
          </div>

          {/* Milestone checklist */}
          <div 
            className="border p-6 rounded-3xl bg-white shadow-xl space-y-4"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
          >
            <h3 
              className="text-xs font-bold uppercase tracking-[0.15em]"
              style={{ color: schoolTokens.color.sage }}
            >
              Targeted Achievements
            </h3>
            <div className="space-y-3">
              {program.milestones.map((milestone, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div 
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: "oklch(0.62 0.08 115 / 0.1)", color: schoolTokens.color.sage }}
                  >
                    <Check className="w-3 h-3" />
                  </div>
                  <p className="text-xs text-black/75 leading-relaxed font-light">
                    {milestone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
