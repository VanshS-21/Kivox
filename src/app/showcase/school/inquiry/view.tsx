"use client";

import { useState } from "react";
import { useSchool } from "../context";
import { schoolTokens, routes } from "../tokens";
import { SchoolButton } from "../components";
import { ClipboardCheck, ArrowRight, BookOpen, GraduationCap, ArrowLeft } from "lucide-react";

export default function SchoolInquiryView() {
  const { inquiry, submitInquiry, resetDemo, changeView } = useSchool();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    childName: "",
    childAge: "",
    gradeApplying: "Grade 9",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    const { fullName, email, phone } = formData;
    if (!fullName || !email || !phone) {
      setError("Please complete all fields to proceed.");
      return;
    }
    // Simple email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleBack = () => {
    setError("");
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { fullName, childName, childAge, email, phone } = formData;

    if (!fullName || !childName || !childAge || !email || !phone) {
      setError("Please complete all required fields.");
      return;
    }

    setError("");
    submitInquiry({
      fullName,
      childName,
      childAge,
      gradeApplying: formData.gradeApplying,
      email,
      phone,
    });

    // Navigate to status portal
    changeView("parent-status");
  };

  const gradeOptions = [
    "Pre-Kindergarten",
    "Kindergarten",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ];

  if (inquiry) {
    return (
      <div className="max-w-xl mx-auto px-6 py-32 text-center font-sans space-y-6 min-h-screen flex flex-col justify-center items-center" style={{ backgroundColor: schoolTokens.color.bgIvory }}>
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto animate-bounce border"
          style={{ 
            backgroundColor: "oklch(0.62 0.08 115 / 0.15)",
            borderColor: "oklch(0.62 0.08 115 / 0.3)",
            color: schoolTokens.color.sage 
          }}
        >
          <ClipboardCheck className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight" style={{ color: schoolTokens.color.bgGreenDark }}>Inquiry Active</h1>
        <p className="text-sm text-black/70 leading-relaxed font-light font-sans max-w-md">
          An admissions portfolio is already active for candidate student <strong>{inquiry.childName}</strong>. You can track progress, toggle application tasks, and view decision status in the parent portal.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 w-full max-w-sm">
          <SchoolButton href={routes.parentStatus} variant="primary" className="!rounded-full w-full">
            View Portal Checklist
          </SchoolButton>
          <SchoolButton onClick={resetDemo} variant="outline" className="!rounded-full w-full">
            Reset Sandbox
          </SchoolButton>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto font-sans min-h-screen animate-fade-in" style={{ backgroundColor: schoolTokens.color.bgIvory }}>
      <div className="grid lg:grid-cols-12 gap-12 items-center mt-16">
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-6">
          <span 
            className="text-[10px] font-bold tracking-[0.25em] uppercase block"
            style={{ color: schoolTokens.color.sage }}
          >
            Admissions Pipeline
          </span>
          <h1 
            className="text-4xl md:text-5xl font-bold tracking-tight leading-tight"
            style={{ color: schoolTokens.color.bgGreenDark, fontFamily: schoolTokens.font.display }}
          >
            Inquiry Dossier Registration
          </h1>
          <p className="text-sm text-black/75 leading-relaxed font-light font-sans">
            Thank you for exploring Greenfield Academy. Submitting this progressive inquiry initializes your local admissions checklist, sandbox database, and application status evaluation.
          </p>
          <div 
            className="p-6 border bg-white rounded-3xl space-y-4 shadow-md"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.1)" }}
          >
            <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: schoolTokens.color.bgGreenDark }}>Simulation Notes</h4>
            <ul className="space-y-3.5 text-xs text-black/70 font-light font-sans">
              <li className="flex gap-2.5">
                <BookOpen className="w-4 h-4 shrink-0" style={{ color: schoolTokens.color.sage }} />
                <span>State is retained locally in your browser memory for verification purposes.</span>
              </li>
              <li className="flex gap-2.5">
                <GraduationCap className="w-4 h-4 shrink-0" style={{ color: schoolTokens.color.sage }} />
                <span>Upon successful completion, you will be navigated to the live Applicant Portal.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Wizard Form Column */}
        <div className="lg:col-span-7">
          <div 
            className="border p-6 md:p-10 rounded-3xl bg-white shadow-xl space-y-8"
            style={{ borderColor: "oklch(0.24 0.025 145 / 0.12)" }}
          >
            {/* Step Progress Tracker */}
            <div className="flex items-center justify-between pb-4 border-b" style={{ borderColor: "oklch(0.24 0.025 145 / 0.08)" }}>
              <div className="flex items-center gap-2">
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: step === 1 ? schoolTokens.color.bgGreenDark : "oklch(0.62 0.08 115 / 0.2)",
                    color: step === 1 ? "white" : schoolTokens.color.bgGreenDark,
                  }}
                >
                  1
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/60">Parent Info</span>
              </div>
              
              <div className="h-0.5 flex-1 mx-4" style={{ backgroundColor: "oklch(0.24 0.025 145 / 0.1)" }} />

              <div className="flex items-center gap-2">
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    backgroundColor: step === 2 ? schoolTokens.color.bgGreenDark : "oklch(0.24 0.025 145 / 0.05)",
                    color: step === 2 ? "white" : "black/40",
                  }}
                >
                  2
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">Candidate Details</span>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-2xl animate-shake">
                {error}
              </div>
            )}

            {/* Step 1: Parent Details */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in font-sans">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: schoolTokens.color.bgGreenDark }}>Parent / Guardian Profile</h3>
                  <p className="text-xs text-black/50">Provide the primary contact credentials for communications.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5 relative">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 block">
                      Parent/Guardian Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Devika Sharma"
                        className="w-full min-h-11 px-4 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-emerald-800 text-black bg-transparent transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 block">
                        Primary Contact Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. devika@sharmas.in"
                        className="w-full min-h-11 px-4 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-emerald-800 text-black bg-transparent transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 block">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full min-h-11 px-4 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-emerald-800 text-black bg-transparent transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t flex justify-end" style={{ borderColor: "oklch(0.24 0.025 145 / 0.08)" }}>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: schoolTokens.color.bgGreenDark }}
                  >
                    Next Step <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Candidate Details */}
            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in font-sans">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold tracking-tight" style={{ color: schoolTokens.color.bgGreenDark }}>Applicant Candidate Profile</h3>
                  <p className="text-xs text-black/50">Tell us about the candidate applying for admission.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 block">
                      Applicant Child Full Name *
                    </label>
                    <input
                      type="text"
                      name="childName"
                      value={formData.childName}
                      onChange={handleChange}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full min-h-11 px-4 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-emerald-800 text-black bg-transparent transition-colors"
                      required
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 block">
                        Applicant Age (Years) *
                      </label>
                      <input
                        type="number"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        placeholder="e.g. 14"
                        className="w-full min-h-11 px-4 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-emerald-800 text-black bg-transparent transition-colors"
                        min="3"
                        max="20"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-black/50 block">
                        Grade Level Applying For *
                      </label>
                      <select
                        name="gradeApplying"
                        value={formData.gradeApplying}
                        onChange={handleChange}
                        className="w-full min-h-11 px-4 rounded-xl border border-black/15 text-sm focus:outline-none focus:border-emerald-800 text-black bg-transparent transition-colors"
                        required
                      >
                        {gradeOptions.map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t flex justify-between items-center" style={{ borderColor: "oklch(0.24 0.025 145 / 0.08)" }}>
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.18em] border border-black/10 hover:bg-black/5 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>

                  <SchoolButton type="submit" variant="primary" className="!rounded-full shadow-md hover:shadow-lg">
                    Submit Inquiry
                  </SchoolButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
