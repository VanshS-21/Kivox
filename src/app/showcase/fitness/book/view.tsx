"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { fitnessTokens, routes } from "../tokens";
import { ShieldAlert, CheckCircle2, User, Target, CreditCard } from "lucide-react";

function BookTrialForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTier = searchParams?.get("tier") || "unlimited";
  const initialBilling = searchParams?.get("billing") || "monthly";

  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [goal, setGoal] = useState("strength");
  const [tier, setTier] = useState(initialTier);
  const [billing, setBilling] = useState(initialBilling);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [prevInitialTier, setPrevInitialTier] = useState(initialTier);
  if (initialTier !== prevInitialTier) {
    setTier(initialTier);
    setPrevInitialTier(initialTier);
  }

  const [prevInitialBilling, setPrevInitialBilling] = useState(initialBilling);
  if (initialBilling !== prevInitialBilling) {
    setBilling(initialBilling);
    setPrevInitialBilling(initialBilling);
  }

  function handleNextStep() {
    if (step === 1 && (!fullName || !email || !phone)) return;
    setStep((prev) => prev + 1);
  }

  function handlePrevStep() {
    setStep((prev) => prev - 1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName || !email || !phone || !acceptTerms) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      // Success simulation, redirect to portal
      router.push(routes.member);
    }, 1200);
  }

  const getTierPrice = () => {
    const isAnn = billing === "annual";
    if (tier === "dropin") return "₹1,500 (One-Time)";
    if (tier === "unlimited") return isAnn ? "₹3,600 / mo" : "₹4,500 / mo";
    if (tier === "coaching") return isAnn ? "₹9,600 / mo" : "₹12,000 / mo";
    return "";
  };

  const getGoalLabel = () => {
    if (goal === "strength") return "Hypertrophy & Strength";
    if (goal === "conditioning") return "VO2 Endurance & Intervals";
    if (goal === "powerlifting") return "Olympic Powerlifting";
    if (goal === "mobility") return "Active Mobility Flow";
    return "";
  };

  const getTierLabel = () => {
    if (tier === "dropin") return "Drop-In Pass";
    if (tier === "unlimited") return `Unlimited Plan (${billing === "annual" ? "Annual" : "Monthly"})`;
    if (tier === "coaching") return `Coaching Package (${billing === "annual" ? "Annual" : "Monthly"})`;
    return "";
  };

  return (
    <form onSubmit={handleSubmit} className="border border-white/10 p-6 md:p-8 bg-[#111] rounded-sm space-y-6">
      {/* Wizard Steps indicator */}
      <div className="grid grid-cols-3 gap-2 pb-6 border-b border-white/10 select-none">
        {[
          { num: 1, label: "Info", icon: <User className="w-3.5 h-3.5" /> },
          { num: 2, label: "Goals", icon: <Target className="w-3.5 h-3.5" /> },
          { num: 3, label: "Checkout", icon: <CreditCard className="w-3.5 h-3.5" /> },
        ].map((s) => (
          <div
            key={s.num}
            className={`flex items-center gap-2 pb-2 border-b-2 text-xs transition-all ${
              step >= s.num
                ? "border-[#CCFF00] text-[#CCFF00] font-black"
                : "border-white/10 text-white/40 font-bold"
            }`}
          >
            <span className="font-mono">{s.num}.</span>
            <span className="hidden sm:inline">{s.label}</span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Aarav Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-sm border bg-black text-sm text-white outline-none focus:border-[#CCFF00] transition-colors"
              style={{ borderColor: fitnessTokens.color.border }}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="aarav@vortexfitness.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-sm border bg-black text-sm text-white outline-none focus:border-[#CCFF00] transition-colors"
                style={{ borderColor: fitnessTokens.color.border }}
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">Phone Number (India)</label>
              <input
                type="tel"
                required
                placeholder="+91 XXXXX XXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 rounded-sm border bg-black text-sm text-white outline-none focus:border-[#CCFF00] transition-colors font-mono"
                style={{ borderColor: fitnessTokens.color.border }}
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleNextStep}
              disabled={!fullName || !email || !phone}
              className="px-6 py-2.5 bg-[#CCFF00] disabled:bg-neutral-800 text-black disabled:text-white/30 text-xs font-black uppercase tracking-widest skew-x-[-8deg] transition-all"
            >
              <span className="block skew-x-[8deg]">Next Step</span>
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">Primary Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full p-3 rounded-sm border bg-black text-sm text-white outline-none focus:border-[#CCFF00] transition-colors"
                style={{ borderColor: fitnessTokens.color.border }}
              >
                <option value="strength">Hypertrophy & Strength</option>
                <option value="conditioning">VO2 Endurance & Intervals</option>
                <option value="powerlifting">Olympic Powerlifting</option>
                <option value="mobility">Active Mobility Flow</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">Preferred Membership</label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full p-3 rounded-sm border bg-black text-sm text-white outline-none focus:border-[#CCFF00] transition-colors"
                style={{ borderColor: fitnessTokens.color.border }}
              >
                <option value="dropin">Drop-In Pass (₹1,500)</option>
                <option value="unlimited">Unlimited Plan (₹4,500/mo)</option>
                <option value="coaching">Coaching Package (₹12,000/mo)</option>
              </select>
            </div>
          </div>

          {tier !== "dropin" && (
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-1">Billing Frequency</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setBilling("monthly")}
                  className={`p-3 border text-xs font-bold uppercase tracking-wider rounded-sm ${
                    billing === "monthly" ? "border-[#CCFF00] bg-[#CCFF00]/5 text-[#CCFF00]" : "border-white/10 text-white/60"
                  }`}
                >
                  Monthly Billing
                </button>
                <button
                  type="button"
                  onClick={() => setBilling("annual")}
                  className={`p-3 border text-xs font-bold uppercase tracking-wider rounded-sm ${
                    billing === "annual" ? "border-[#CCFF00] bg-[#CCFF00]/5 text-[#CCFF00]" : "border-white/10 text-white/60"
                  }`}
                >
                  Annual Billing (-20%)
                </button>
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-between">
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-6 py-2.5 bg-neutral-800 text-white text-xs font-black uppercase tracking-widest skew-x-[-8deg] transition-all"
            >
              <span className="block skew-x-[8deg]">Back</span>
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className="px-6 py-2.5 bg-[#CCFF00] text-black text-xs font-black uppercase tracking-widest skew-x-[-8deg] transition-all"
            >
              <span className="block skew-x-[8deg]">Next Step</span>
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          {/* Summary Box */}
          <div className="border border-white/5 bg-black/40 p-5 rounded-sm space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#CCFF00] border-b border-white/5 pb-2">
              Review Membership Package
            </h3>
            <div className="grid grid-cols-2 gap-y-2 text-xs">
              <span className="text-white/50">Athlete:</span>
              <span className="font-bold text-white text-right">{fullName}</span>
              
              <span className="text-white/50">Contact info:</span>
              <span className="font-bold text-white text-right">{phone} / {email}</span>

              <span className="text-white/50">Plan Selected:</span>
              <span className="font-bold text-[#CCFF00] text-right uppercase font-mono">{getTierLabel()}</span>

              <span className="text-white/50">Primary Goal Focus:</span>
              <span className="font-bold text-white text-right">{getGoalLabel()}</span>

              <span className="text-white/50 border-t border-white/10 pt-2 mt-1">Total Fee Amount:</span>
              <span className="font-black text-[#CCFF00] text-right border-t border-white/10 pt-2 mt-1 font-mono text-sm">{getTierPrice()}</span>
            </div>
          </div>

          <div className="flex gap-2.5 items-start">
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-1 cursor-pointer accent-[#CCFF00]"
            />
            <label htmlFor="terms" className="text-[11px] text-white/50 leading-relaxed cursor-pointer select-none">
              I accept the liability waiver, code of conduct, and agree to let Vortex Fitness track training logs in-memory for demonstration simulation.
            </label>
          </div>

          <div className="pt-4 flex justify-between border-t border-white/10">
            <button
              type="button"
              onClick={handlePrevStep}
              className="px-6 py-2.5 bg-neutral-800 text-white text-xs font-black uppercase tracking-widest skew-x-[-8deg] transition-all"
            >
              <span className="block skew-x-[8deg]">Back</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !acceptTerms}
              className="px-6 py-2.5 bg-[#CCFF00] disabled:bg-neutral-800 text-black disabled:text-white/30 text-xs font-black uppercase tracking-widest skew-x-[-8deg] transition-all"
            >
              <span className="block skew-x-[8deg] flex items-center gap-1.5">
                {isSubmitting ? "Finalizing Package..." : <>Complete Enrollment <CheckCircle2 className="w-3.5 h-3.5" /></>}
              </span>
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

export default function BookTrialPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans grid md:grid-cols-12 gap-8 items-start">
      {/* Form Left */}
      <div className="md:col-span-8">
        <header className="mb-8">
          <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em]">FAST REGISTER</span>
          <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mt-1 leading-none text-white">
            SECURE YOUR PASS
          </h1>
        </header>

        <Suspense fallback={<div className="text-white">Loading form parameters...</div>}>
          <BookTrialForm />
        </Suspense>
      </div>

      {/* Checklist Right */}
      <div className="md:col-span-4 space-y-6">
        <div className="border border-white/10 p-6 bg-[#111] rounded-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-white/50 border-b border-white/10 pb-2">
            Preparation Checklist
          </h3>
          <ul className="space-y-3 text-xs text-white/70">
            <li className="flex gap-2.5">
              <span className="text-[#CCFF00]">✓</span>
              <span>Bring athletic footwear and comfortable gym attire.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-[#CCFF00]">✓</span>
              <span>Arrive 10 minutes early to retrieve your physical scan card.</span>
            </li>
            <li className="flex gap-2.5">
              <span className="text-[#CCFF00]">✓</span>
              <span>Locker and shower towels are provided by the reception team.</span>
            </li>
          </ul>
        </div>

        <div className="border border-white/10 p-6 bg-[#111] rounded-sm flex gap-3 text-xs text-white/50">
          <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0" />
          <p>
            No real credit card authorization or payment details are collected for demonstration trials.
          </p>
        </div>
      </div>
    </div>
  );
}
