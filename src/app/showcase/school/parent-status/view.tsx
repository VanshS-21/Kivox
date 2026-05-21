"use client";

import { useEffect, useState } from "react";
import { useSchool } from "../context";
import { schoolTokens, routes } from "../tokens";
import { SchoolButton } from "../components";
import {
  ClipboardList,
  CheckSquare,
  Square,
  Trash2,
} from "lucide-react";

// Inline Confetti celebration generator
interface ConfettiPiece {
  id: number;
  left: string;
  delay: string;
  color: string;
  size: string;
  borderRadius: string;
  rotate: string;
}

function CSSConfetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = ["#8A9A5B", "#1E392A", "#D4AF37", "#C5A059", "#4F7942"];
    const arr = Array.from({ length: 80 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: `${Math.random() * 8 + 6}px`,
      borderRadius: Math.random() > 0.5 ? "50%" : "0%",
      rotate: `rotate(${Math.random() * 360}deg)`,
    }));
    
    // Defer the setPieces call to prevent synchronous state cascade in useEffect
    const handle = requestAnimationFrame(() => {
      setPieces(arr);
    });
    return () => cancelAnimationFrame(handle);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-confetti-fall {
          animation: confettiFall 4.5s linear infinite;
        }
      `}</style>
      {pieces.map((p) => (
        <div
          key={p.id}
          className="absolute top-0 animate-confetti-fall"
          style={{
            left: p.left,
            animationDelay: p.delay,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            borderRadius: p.borderRadius,
            transform: p.rotate,
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

export default function SchoolParentStatusView() {
  const { inquiry, checklist, toggleChecklistItem, resetDemo } = useSchool();

  if (!inquiry) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center font-sans space-y-6 min-h-screen flex flex-col justify-center items-center" style={{ backgroundColor: schoolTokens.color.bgIvory }}>
        <div className="w-16 h-16 bg-[#1E392A]/5 border border-[#1E392A]/10 rounded-full flex items-center justify-center text-[#1E392A]/40 mx-auto">
          <ClipboardList className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: schoolTokens.color.bgGreenDark }}>No Active Application</h1>
        <p className="text-sm text-black/60 leading-relaxed font-light font-sans max-w-sm">
          We could not find an active admissions portfolio in this session. Please submit the Inquiry Form to initiate a checklist.
        </p>
        <div className="pt-4">
          <SchoolButton href={routes.inquiry} variant="primary" className="!rounded-full shadow-md">
            Submit New Inquiry
          </SchoolButton>
        </div>
      </div>
    );
  }

  // Calculate progress stats
  const totalItems = 4;
  const completedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalItems) * 100);
  const allCompleted = completedCount === totalItems;

  // Circular gauge calculations
  const radius = 42;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  // Determine actual mock status based on checklist progress
  let displayStatus = inquiry.status;
  if (allCompleted) {
    displayStatus = "Accepted";
  } else if (checklist.interviewBooked) {
    displayStatus = "Interview Scheduled";
  } else if (checklist.transcriptsSent || checklist.recommendationsSent || checklist.feePaid) {
    displayStatus = "Under Review";
  }

  const steps = [
    { name: "Inquiry Received", done: true },
    { name: "Under Review", done: displayStatus !== "Inquiry Received" },
    { name: "Interview Scheduled", done: displayStatus === "Interview Scheduled" || displayStatus === "Accepted" },
    { name: "Accepted", done: displayStatus === "Accepted" },
  ];

  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto font-sans min-h-screen relative" style={{ backgroundColor: schoolTokens.color.bgIvory }}>
      {/* Confetti Trigger */}
      {allCompleted && <CSSConfetti />}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 pb-8 border-b mt-16" style={{ borderColor: "oklch(0.24 0.025 145 / 0.1)" }}>
        <div>
          <span 
            className="text-[10px] font-bold tracking-[0.25em] uppercase block mb-2"
            style={{ color: schoolTokens.color.sage }}
          >
            Applicant Portal
          </span>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}>
            Application Status
          </h1>
        </div>
        <button
          onClick={resetDemo}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-red-600 hover:text-red-800 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" /> Reset Simulation
        </button>
      </div>

      {/* Applicant Card */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Summary & Status Tracker */}
        <div className="lg:col-span-7 space-y-8">
          <div 
            className="border p-6 md:p-8 rounded-3xl bg-white shadow-xl space-y-6"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
          >
            <h3 className="text-xl font-bold border-b pb-4" style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}>
              Applicant Profile
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-xs text-black/80 font-sans">
              <div>
                <p className="text-[10px] uppercase font-bold text-black/40">Student</p>
                <p className="font-semibold text-sm mt-1" style={{ color: schoolTokens.color.bgGreenDark }}>{inquiry.childName}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-black/40">Grade Level</p>
                <p className="font-semibold text-sm mt-1" style={{ color: schoolTokens.color.bgGreenDark }}>{inquiry.gradeApplying}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-black/40">Age</p>
                <p className="font-semibold text-sm mt-1" style={{ color: schoolTokens.color.bgGreenDark }}>{inquiry.childAge} Years</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-black/40">Parent/Guardian</p>
                <p className="font-semibold mt-1 text-black">{inquiry.fullName}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-black/40">Submitted</p>
                <p className="font-semibold mt-1 text-black">{inquiry.dateSubmitted}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-black/40">Review Phase</p>
                <p className="font-bold mt-1 uppercase tracking-wider text-xs" style={{ color: schoolTokens.color.sage }}>
                  {displayStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Status Tracker */}
          <div 
            className="border p-6 md:p-8 rounded-3xl bg-white shadow-xl space-y-6"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
          >
            <h3 className="text-xl font-bold" style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}>Admissions Progression</h3>
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0 pt-4">
              {/* Connector Bar */}
              <div 
                className="absolute top-3.5 left-3.5 md:left-0 right-0 h-0.5 -z-10 hidden md:block" 
                style={{ backgroundColor: "oklch(0.24 0.025 145 / 0.1)" }}
              />

              {steps.map((step, idx) => (
                <div key={idx} className="flex md:flex-col items-center gap-3 md:gap-2 text-center relative z-10 w-full md:w-auto">
                  <div
                    className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                      step.done
                        ? "text-white"
                        : "bg-white text-black/35"
                    }`}
                    style={{
                      backgroundColor: step.done ? schoolTokens.color.sage : "white",
                      borderColor: step.done ? schoolTokens.color.sage : "oklch(0.24 0.025 145 / 0.15)",
                    }}
                  >
                    {step.done ? "✓" : idx + 1}
                  </div>
                  <span
                    className={`text-[9px] font-bold uppercase tracking-[0.1em] ${
                      step.done ? "text-emerald-800" : "text-black/35"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Calligraphy Wax-Sealed acceptance letter if Accepted */}
          {allCompleted && (
            <div 
              className="border p-8 md:p-12 rounded-3xl text-black shadow-2xl relative overflow-hidden animate-fade-in transition-all duration-500 hover:shadow-emerald-950/5 border-amber-800/20"
              style={{ 
                backgroundImage: "linear-gradient(135deg, oklch(0.99 0.005 90) 0%, oklch(0.97 0.01 90) 100%)",
                boxShadow: "0 25px 50px -12px rgba(30, 57, 42, 0.08)"
              }}
            >
              {/* Parchment double border */}
              <div className="absolute inset-4 border border-dashed border-amber-900/10 pointer-events-none rounded-2xl" />

              <div className="space-y-8 relative z-10">
                {/* Emblem header */}
                <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-amber-900/10">
                  <div 
                    className="w-12 h-12 flex items-center justify-center rounded-full text-white shadow-md transition-transform hover:scale-105"
                    style={{ backgroundColor: schoolTokens.color.bgGreenDark }}
                  >
                    <span className="font-serif text-xl font-bold">G</span>
                  </div>
                  <div>
                    <h4 
                      className="text-lg font-bold tracking-[0.1em] uppercase"
                      style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
                    >
                      Greenfield Academy
                    </h4>
                    <p className="text-[8px] font-bold tracking-[0.25em] text-amber-800 uppercase">Office of the Admissions Board • Bengaluru</p>
                  </div>
                </div>

                {/* Body Text */}
                <div 
                  className="space-y-4 text-sm md:text-base leading-relaxed text-black/85 text-justify italic"
                  style={{ fontFamily: schoolTokens.font.display }}
                >
                  <p className="font-sans not-italic text-xs font-semibold uppercase tracking-wider text-black/50">Date: May 21, 2026</p>
                  <p>Dear Parent/Guardian {inquiry.fullName},</p>
                  <p>
                    On behalf of the Admissions Roundtable at Greenfield Academy, it is my distinct honor to offer <strong>{inquiry.childName}</strong> admission to the {inquiry.gradeApplying} class.
                  </p>
                  <p>
                    Our admissions committee reviewed the academic dossiers and was thoroughly impressed by your student&apos;s biophilic inquiry potential and character evaluations. We are confident that {inquiry.childName} will contribute dynamically to our Harkness roundtable dialogues and progressive academy honor code.
                  </p>
                  <p>We welcome your family to the Greenfield scholar fraternity.</p>
                </div>

                {/* Wax Seal & Enrollment Details */}
                <div className="flex items-center justify-between pt-8 border-t border-amber-900/10">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-black/40">Enrollment Reference</p>
                      <p className="text-xs font-mono font-bold" style={{ color: schoolTokens.color.bgGreenDark }}>GA-BLR-2026</p>
                    </div>
                    <button
                      onClick={() => window.print()}
                      className="text-[9px] font-bold uppercase tracking-[0.15em] text-amber-950 border border-amber-900/20 hover:border-amber-900/50 rounded-full px-3 py-1 bg-amber-900/5 hover:bg-amber-900/10 transition-all cursor-pointer print:hidden block"
                    >
                      Print Acceptance Letter
                    </button>
                  </div>

                  {/* Organic Wax Seal SVG with crest */}
                  <div className="relative group cursor-pointer">
                    {/* Pulsing effect */}
                    <div className="absolute inset-0 bg-red-950/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-105" />
                    
                    <svg 
                      className="w-16 h-16 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-6 drop-shadow-md"
                      viewBox="0 0 100 100"
                    >
                      {/* Melted organic wax base shape */}
                      <path 
                        d="M 50,12 C 72,10 88,24 88,48 C 88,72 70,92 48,88 C 26,84 10,70 12,48 C 14,26 28,14 50,12 Z" 
                        fill="oklch(0.35 0.15 25)" 
                        className="transition-colors duration-300"
                      />
                      {/* Inner stamped circle */}
                      <circle cx="50" cy="50" r="28" fill="oklch(0.31 0.14 25)" stroke="oklch(0.35 0.15 25 / 0.3)" strokeWidth="2" />
                      {/* Stamped letter 'G' */}
                      <text 
                        x="50" 
                        y="58" 
                        fontFamily="Georgia, serif" 
                        fontSize="28" 
                        fontWeight="bold" 
                        textAnchor="middle" 
                        fill="oklch(0.82 0.09 85 / 0.85)"
                      >
                        G
                      </text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Interactive Checklist with Circular Gauge */}
        <div className="lg:col-span-5 space-y-6">
          <div 
            className="border p-6 md:p-8 rounded-3xl bg-white shadow-xl space-y-8"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
          >
            {/* Header & Gauge */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-xl font-bold" style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}>Admissions Checklist</h3>
                <p className="text-xs text-black/50 mt-1">Toggle status markers to update candidate dossier review state</p>
              </div>

              {/* Circular Gauge SVG */}
              <div className="relative shrink-0 w-24 h-24 flex items-center justify-center">
                <svg className="w-24 h-24 transform -rotate-90">
                  {/* Outer track */}
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="oklch(0.24 0.025 145 / 0.05)"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  {/* Filled track */}
                  <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke={schoolTokens.color.sage}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center font-sans">
                  <span className="text-base font-bold font-mono" style={{ color: schoolTokens.color.bgGreenDark }}>
                    {progressPercent}%
                  </span>
                  <span className="text-[7px] font-bold uppercase tracking-wider text-black/40">Complete</span>
                </div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-4">
              {/* 1. Fee Paid */}
              <button
                onClick={() => toggleChecklistItem("feePaid")}
                className="w-full flex items-center justify-between p-4 border hover:border-emerald-800/40 hover:bg-emerald-800/[0.01] rounded-2xl text-left transition-all duration-300 group"
                style={{ borderColor: "oklch(0.24 0.025 145 / 0.08)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    {checklist.feePaid ? (
                      <CheckSquare className="w-5 h-5 transition-transform group-hover:scale-105" style={{ color: schoolTokens.color.sage }} />
                    ) : (
                      <Square className="w-5 h-5 text-black/20 transition-transform group-hover:scale-105" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider" style={{ color: schoolTokens.color.bgGreenDark }}>Application Registration Fee</h5>
                    <p className="text-[10px] text-black/50 font-light mt-0.5">₹3,500 dossier processing registration paid</p>
                  </div>
                </div>
              </button>

              {/* 2. Transcripts */}
              <button
                onClick={() => toggleChecklistItem("transcriptsSent")}
                className="w-full flex items-center justify-between p-4 border hover:border-emerald-800/40 hover:bg-emerald-800/[0.01] rounded-2xl text-left transition-all duration-300 group"
                style={{ borderColor: "oklch(0.24 0.025 145 / 0.08)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    {checklist.transcriptsSent ? (
                      <CheckSquare className="w-5 h-5 transition-transform group-hover:scale-105" style={{ color: schoolTokens.color.sage }} />
                    ) : (
                      <Square className="w-5 h-5 text-black/20 transition-transform group-hover:scale-105" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider" style={{ color: schoolTokens.color.bgGreenDark }}>School Transcripts</h5>
                    <p className="text-[10px] text-black/50 font-light mt-0.5">Prior 2 years academic transcripts uploaded</p>
                  </div>
                </div>
              </button>

              {/* 3. Recommendations */}
              <button
                onClick={() => toggleChecklistItem("recommendationsSent")}
                className="w-full flex items-center justify-between p-4 border hover:border-emerald-800/40 hover:bg-emerald-800/[0.01] rounded-2xl text-left transition-all duration-300 group"
                style={{ borderColor: "oklch(0.24 0.025 145 / 0.08)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    {checklist.recommendationsSent ? (
                      <CheckSquare className="w-5 h-5 transition-transform group-hover:scale-105" style={{ color: schoolTokens.color.sage }} />
                    ) : (
                      <Square className="w-5 h-5 text-black/20 transition-transform group-hover:scale-105" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider" style={{ color: schoolTokens.color.bgGreenDark }}>Teacher Recommendations</h5>
                    <p className="text-[10px] text-black/50 font-light mt-0.5">Evaluations from math & language advisors submitted</p>
                  </div>
                </div>
              </button>

              {/* 4. Interview */}
              <button
                onClick={() => toggleChecklistItem("interviewBooked")}
                className="w-full flex items-center justify-between p-4 border hover:border-emerald-800/40 hover:bg-emerald-800/[0.01] rounded-2xl text-left transition-all duration-300 group"
                style={{ borderColor: "oklch(0.24 0.025 145 / 0.08)" }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center">
                    {checklist.interviewBooked ? (
                      <CheckSquare className="w-5 h-5 transition-transform group-hover:scale-105" style={{ color: schoolTokens.color.sage }} />
                    ) : (
                      <Square className="w-5 h-5 text-black/20 transition-transform group-hover:scale-105" />
                    )}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider" style={{ color: schoolTokens.color.bgGreenDark }}>Roundtable Interview</h5>
                    <p className="text-[10px] text-black/50 font-light mt-0.5">Harkness simulation & parent-advisor interaction scheduled</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
