"use client";

import { useState, useMemo } from "react";
import { schoolTokens, routes } from "../tokens";
import { SchoolButton } from "../components";
import { CheckCircle2, AlertCircle, FileText, Calendar, Calculator, Check, Info } from "lucide-react";

type DivisionId = "early-years" | "middle-school" | "upper-school";
type EnrollmentType = "day" | "boarding-5" | "boarding-7";

// Base tuition fee structure in INR
const baseTuitionFees: Record<DivisionId, Record<EnrollmentType, number>> = {
  "early-years": {
    day: 450000,
    "boarding-5": 0, // not available
    "boarding-7": 0, // not available
  },
  "middle-school": {
    day: 620000,
    "boarding-5": 0, // not available
    "boarding-7": 0, // not available
  },
  "upper-school": {
    day: 850000,
    "boarding-5": 1120000,
    "boarding-7": 1350000,
  },
};

export default function SchoolAdmissionsView() {
  const [division, setDivision] = useState<DivisionId>("early-years");
  const [enrollment, setEnrollment] = useState<EnrollmentType>("day");
  const [busService, setBusService] = useState(false);
  const [diningProgram, setDiningProgram] = useState(false);
  const [sportsAcademy, setSportsAcademy] = useState(false);
  const [scholarship, setScholarship] = useState<number>(0); // percentage: 0, 25, 50, 75

  // If division is Early Years or Middle School, force enrollment to "day"
  const currentEnrollment = useMemo(() => {
    if (division !== "upper-school") {
      return "day";
    }
    return enrollment;
  }, [division, enrollment]);

  const baseCost = useMemo(() => {
    return baseTuitionFees[division][currentEnrollment] || 0;
  }, [division, currentEnrollment]);

  // Add-on costs
  const addonsCost = useMemo(() => {
    let total = 0;
    if (busService) total += 95000;
    if (diningProgram) total += 120000;
    if (sportsAcademy) total += 80000;
    return total;
  }, [busService, diningProgram, sportsAcademy]);

  // Scholarship deduction (applies only to base tuition)
  const discount = useMemo(() => {
    return baseCost * (scholarship / 100);
  }, [baseCost, scholarship]);

  const totalCost = useMemo(() => {
    return baseCost + addonsCost - discount;
  }, [baseCost, addonsCost, discount]);

  const criticalDates = [
    { event: "Inquiry Submission Priority Deadline", date: "October 15, 2026" },
    { event: "Application Portfolio & Transcript Deadline", date: "November 30, 2026" },
    { event: "Scholarship & Financial Aid Request", date: "December 15, 2026" },
    { event: "Admission Notification Letters Mailed", date: "February 10, 2027" },
  ];

  // Helper to format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto font-sans min-h-screen animate-fade-in" style={{ backgroundColor: schoolTokens.color.bgIvory }}>
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4 mt-16">
        <span 
          className="text-[10px] font-bold tracking-[0.25em] uppercase block"
          style={{ color: schoolTokens.color.sage }}
        >
          Financial Investment & Milestones
        </span>
        <h1 
          className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
        >
          Admissions & Tuition
        </h1>
        <p className="text-sm md:text-base text-black/70 leading-relaxed font-light font-sans">
          An education at Greenfield Academy is an investment in biophilic inquiry, global standards, and critical thinking. Explore our fee schedule using the interactive calculator below, and review important deadlines for the upcoming session.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Fee Calculator Container */}
        <div className="lg:col-span-8 space-y-8">
          <div 
            className="border p-6 md:p-8 rounded-3xl bg-white shadow-xl space-y-8"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "oklch(0.62 0.08 115 / 0.1)", color: schoolTokens.color.sage }}
              >
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 
                  className="text-2xl font-bold tracking-tight"
                  style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
                >
                  Interactive Tuition & Fee Calculator
                </h2>
                <p className="text-xs text-black/50">Simulate school fees, meal plans, transportation, and potential scholarship aid</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="space-y-6">
                {/* Select Division */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 block">1. Select Academic Division</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["early-years", "middle-school", "upper-school"] as DivisionId[]).map((divId) => (
                      <button
                        key={divId}
                        type="button"
                        onClick={() => {
                          setDivision(divId);
                          if (divId !== "upper-school") {
                            setEnrollment("day");
                          }
                        }}
                        className={`py-3 px-2 rounded-xl text-center border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          division === divId
                            ? "border-emerald-800 text-white shadow-sm"
                            : "border-black/10 text-black/70 hover:bg-black/5"
                        }`}
                        style={{
                          backgroundColor: division === divId ? schoolTokens.color.bgGreenDark : "transparent",
                        }}
                      >
                        {divId.replace("-", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Enrollment Type */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 block">2. Select Enrollment Type</label>
                  {division !== "upper-school" ? (
                    <div 
                      className="p-3.5 rounded-xl border text-xs text-black/60 flex items-center gap-2"
                      style={{ borderColor: "oklch(0.24 0.025 145 / 0.05)", backgroundColor: "oklch(0.985 0.004 90)" }}
                    >
                      <Info className="w-4 h-4 shrink-0" style={{ color: schoolTokens.color.sage }} />
                      <span>Early Years and Middle School are Day Scholar programs only.</span>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setEnrollment("day")}
                        className={`py-3 px-2 rounded-xl text-center border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          enrollment === "day"
                            ? "border-emerald-800 text-white"
                            : "border-black/10 text-black/70 hover:bg-black/5"
                        }`}
                        style={{
                          backgroundColor: enrollment === "day" ? schoolTokens.color.bgGreenDark : "transparent",
                        }}
                      >
                        Day Scholar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEnrollment("boarding-5")}
                        className={`py-3 px-2 rounded-xl text-center border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          enrollment === "boarding-5"
                            ? "border-emerald-800 text-white"
                            : "border-black/10 text-black/70 hover:bg-black/5"
                        }`}
                        style={{
                          backgroundColor: enrollment === "boarding-5" ? schoolTokens.color.bgGreenDark : "transparent",
                        }}
                      >
                        5-Day Boarding
                      </button>
                      <button
                        type="button"
                        onClick={() => setEnrollment("boarding-7")}
                        className={`py-3 px-2 rounded-xl text-center border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                          enrollment === "boarding-7"
                            ? "border-emerald-800 text-white"
                            : "border-black/10 text-black/70 hover:bg-black/5"
                        }`}
                        style={{
                          backgroundColor: enrollment === "boarding-7" ? schoolTokens.color.bgGreenDark : "transparent",
                        }}
                      >
                        7-Day Boarding
                      </button>
                    </div>
                  )}
                </div>

                {/* Add-ons */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 block">3. Optional Services & Add-ons</label>
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => setBusService(!busService)}
                      className="w-full flex items-center justify-between p-3.5 border rounded-xl text-left text-xs transition-colors"
                      style={{ borderColor: busService ? "oklch(0.24 0.025 145 / 0.3)" : "oklch(0.24 0.025 145 / 0.08)" }}
                    >
                      <span className="flex items-center gap-2">
                        <span 
                          className="w-4 h-4 rounded border flex items-center justify-center transition-colors"
                          style={{
                            backgroundColor: busService ? schoolTokens.color.bgGreenDark : "transparent",
                            borderColor: busService ? schoolTokens.color.bgGreenDark : "oklch(0.24 0.025 145 / 0.2)",
                          }}
                        >
                          {busService && <Check className="w-3 h-3 text-white" />}
                        </span>
                        <span>Daily Bus Service (Sarjapur / Whitefield Routes)</span>
                      </span>
                      <span className="font-bold font-mono">₹95,000</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDiningProgram(!diningProgram)}
                      className="w-full flex items-center justify-between p-3.5 border rounded-xl text-left text-xs transition-colors"
                      style={{ borderColor: diningProgram ? "oklch(0.24 0.025 145 / 0.3)" : "oklch(0.24 0.025 145 / 0.08)" }}
                    >
                      <span className="flex items-center gap-2">
                        <span 
                          className="w-4 h-4 rounded border flex items-center justify-center transition-colors"
                          style={{
                            backgroundColor: diningProgram ? schoolTokens.color.bgGreenDark : "transparent",
                            borderColor: diningProgram ? schoolTokens.color.bgGreenDark : "oklch(0.24 0.025 145 / 0.2)",
                          }}
                        >
                          {diningProgram && <Check className="w-3 h-3 text-white" />}
                        </span>
                        <span>Hot Meals Dining Program (Lunch & snacks)</span>
                      </span>
                      <span className="font-bold font-mono">₹1,20,000</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSportsAcademy(!sportsAcademy)}
                      className="w-full flex items-center justify-between p-3.5 border rounded-xl text-left text-xs transition-colors"
                      style={{ borderColor: sportsAcademy ? "oklch(0.24 0.025 145 / 0.3)" : "oklch(0.24 0.025 145 / 0.08)" }}
                    >
                      <span className="flex items-center gap-2">
                        <span 
                          className="w-4 h-4 rounded border flex items-center justify-center transition-colors"
                          style={{
                            backgroundColor: sportsAcademy ? schoolTokens.color.bgGreenDark : "transparent",
                            borderColor: sportsAcademy ? schoolTokens.color.bgGreenDark : "oklch(0.24 0.025 145 / 0.2)",
                          }}
                        >
                          {sportsAcademy && <Check className="w-3 h-3 text-white" />}
                        </span>
                        <span>Co-curricular Sports Academy (Tennis/Golf)</span>
                      </span>
                      <span className="font-bold font-mono">₹80,000</span>
                    </button>
                  </div>
                </div>

                {/* Scholarship Slider */}
                <div className="space-y-3.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 block">4. Scholarship Assistance</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 25, 50, 75].map((percent) => (
                      <button
                        key={percent}
                        type="button"
                        onClick={() => setScholarship(percent)}
                        className="py-2.5 rounded-xl border text-center text-xs font-semibold tracking-wider transition-all duration-300"
                        style={{
                          backgroundColor: scholarship === percent ? schoolTokens.color.sage : "transparent",
                          color: scholarship === percent ? "white" : "black",
                          borderColor: scholarship === percent ? schoolTokens.color.sage : "oklch(0.24 0.025 145 / 0.15)",
                        }}
                      >
                        {percent === 0 ? "None" : `${percent}%`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Display Result Card */}
              <div 
                className="p-6 md:p-8 rounded-2xl border flex flex-col justify-between"
                style={{ 
                  backgroundColor: "oklch(0.24 0.025 145 / 0.02)",
                  borderColor: "oklch(0.24 0.025 145 / 0.08)"
                }}
              >
                <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">Fee Statement Summary</h3>
                  
                  <div className="space-y-3 font-sans">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-black/60">Base Academic Tuition:</span>
                      <span className="font-semibold text-black">{formatCurrency(baseCost)}</span>
                    </div>

                    {addonsCost > 0 && (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-black/60">Optional Add-ons:</span>
                        <span className="font-semibold text-black">{formatCurrency(addonsCost)}</span>
                      </div>
                    )}

                    {scholarship > 0 && (
                      <div className="flex justify-between items-center text-xs text-emerald-700">
                        <span>Scholarship Grant ({scholarship}%):</span>
                        <span className="font-semibold">-{formatCurrency(discount)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 border-t pt-6" style={{ borderColor: "oklch(0.24 0.025 145 / 0.1)" }}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 mb-1">Estimated Net Annual Fee</p>
                  <p 
                    className="text-3xl md:text-4xl font-bold tracking-tight font-mono"
                    style={{ color: schoolTokens.color.bgGreenDark }}
                  >
                    {formatCurrency(totalCost)}
                  </p>
                  <p className="text-[9px] text-black/40 mt-2 leading-relaxed">
                    *The estimated fee does not include the refundable security deposit of ₹75,000 due at admission confirmation.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className="flex gap-3 p-4 border rounded-2xl text-xs leading-relaxed font-light font-sans"
              style={{ 
                borderColor: "oklch(0.62 0.08 115 / 0.3)",
                backgroundColor: "oklch(0.62 0.08 115 / 0.06)" 
              }}
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: schoolTokens.color.sage }} />
              <div className="text-black/85">
                <strong>Need-Based Aid & Support:</strong> Greenfield Academy believes in academic equity. We sponsor merit-cum-means scholarships to talented minds across Karnataka. Over 35% of applicants currently receive some level of financial sponsorship.
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          {/* Calendar Dates */}
          <div 
            className="border p-6 rounded-3xl bg-white shadow-xl space-y-6"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
          >
            <h3 
              className="text-sm font-bold uppercase tracking-[0.15em] border-b pb-3 flex items-center gap-2"
              style={{ 
                color: schoolTokens.color.sage,
                borderColor: "oklch(0.24 0.025 145 / 0.1)"
              }}
            >
              <Calendar className="w-4 h-4" /> Critical Deadlines
            </h3>
            <div className="space-y-4">
              {criticalDates.map((d, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.05em] text-black/40">{d.event}</p>
                  <p 
                    className="text-sm font-bold tracking-tight"
                    style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
                  >
                    {d.date}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Checklist Guide */}
          <div 
            className="border p-6 rounded-3xl bg-white shadow-xl space-y-6"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
          >
            <h3 
              className="text-sm font-bold uppercase tracking-[0.15em] border-b pb-3 flex items-center gap-2"
              style={{ 
                color: schoolTokens.color.sage,
                borderColor: "oklch(0.24 0.025 145 / 0.1)"
              }}
            >
              <FileText className="w-4 h-4" /> Admission Steps
            </h3>
            <ul className="space-y-3.5 text-xs text-black/70 font-light font-sans">
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: schoolTokens.color.sage }} />
                <span>Submit the online **Inquiry Form** on our portal.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: schoolTokens.color.sage }} />
                <span>Pay the ₹3,500 application registration fee.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: schoolTokens.color.sage }} />
                <span>Submit official academic transcripts from the past 2 years.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: schoolTokens.color.sage }} />
                <span>Provide recommendations from Math & English teachers.</span>
              </li>
              <li className="flex gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: schoolTokens.color.sage }} />
                <span>Attend the campus tour & Harkness seminar simulation.</span>
              </li>
            </ul>

            <div className="pt-2">
              <SchoolButton href={routes.inquiry} variant="primary" className="w-full !rounded-full shadow-md hover:shadow-lg">
                Begin Inquiry Form
              </SchoolButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
