"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { fitnessTokens, routes } from "../tokens";
import { FitnessButton } from "../components";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      name: "Drop-In Pass",
      priceMonthly: "₹1,500",
      priceAnnual: "₹1,500",
      periodMonthly: "/day",
      periodAnnual: "/day",
      desc: "Perfect for travelers, visiting athletes, or single sessions.",
      benefits: [
        "Single day facility access",
        "1 Coach-led group class",
        "Full locker and sauna use",
        "Complimentary towel service",
      ],
      popular: false,
      cta: "Buy Pass",
      slug: "dropin",
    },
    {
      name: "Unlimited Access",
      priceMonthly: "₹4,500",
      priceAnnual: "₹3,600",
      periodMonthly: "/mo",
      periodAnnual: "/mo",
      desc: "Our standard membership. 24/7 keycard access and full coaching program.",
      benefits: [
        "24/7 Facility entry",
        "Unlimited group classes",
        "1 Personal coaching diagnostic",
        "Full recovery zone access",
        "Free guest pass per month",
      ],
      popular: true,
      cta: "Become a Member",
      slug: "unlimited",
    },
    {
      name: "Coached Athlete",
      priceMonthly: "₹12,000",
      priceAnnual: "₹9,600",
      periodMonthly: "/mo",
      periodAnnual: "/mo",
      desc: "Dedicated personal coaching, individualized logs, and meal profiles.",
      benefits: [
        "All Unlimited member benefits",
        "4 Individual 1-on-1 PT sessions",
        "Custom nutritional design",
        "Priority spot scheduling",
        "Bi-weekly biomechanic checks",
      ],
      popular: false,
      cta: "Apply for Coaching",
      slug: "coaching",
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 font-sans">
      <header className="mb-12 text-center max-w-2xl mx-auto space-y-3">
        <span className="text-[#CCFF00] text-xs font-mono uppercase tracking-[0.2em]">MEMBERSHIP RANGES</span>
        <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none text-white">
          JOIN THE RANKS
        </h1>
        <p className="text-white/60 text-xs md:text-sm">
          No locking contracts. No hidden fees. Select a tier below to initiate your checkout process.
        </p>
      </header>

      {/* Billing Switch */}
      <div className="flex justify-center items-center gap-4 mb-16 select-none">
        <span className={`text-xs font-bold uppercase tracking-wider ${!isAnnual ? "text-[#CCFF00]" : "text-white/50"}`}>
          Monthly Billed
        </span>
        <button
          type="button"
          onClick={() => setIsAnnual(!isAnnual)}
          className="w-14 h-7 rounded-full bg-neutral-800 p-1 transition-all duration-300 relative border border-white/10"
        >
          <span
            className={`block w-5 h-5 rounded-full bg-[#CCFF00] transition-all duration-300 ${
              isAnnual ? "translate-x-7" : "translate-x-0"
            }`}
          />
        </button>
        <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${isAnnual ? "text-[#CCFF00]" : "text-white/50"}`}>
          Annual Billed <span className="bg-[#CCFF00]/10 text-[#CCFF00] text-[9px] font-black px-2 py-0.5 border border-[#CCFF00]/20 rounded-full">SAVE 20%</span>
        </span>
      </div>

      {/* Tiers Grid */}
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {tiers.map((tier) => {
          const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
          const period = isAnnual ? tier.periodAnnual : tier.periodMonthly;
          return (
            <div
              key={tier.name}
              className={`border p-8 bg-[#111] hover:border-white/20 transition-all flex flex-col justify-between relative ${
                tier.popular ? "border-2 border-[#CCFF00] bg-gradient-to-b from-[#111] to-[#CCFF00]/5 md:-translate-y-4 shadow-2xl" : ""
              }`}
              style={{ borderColor: tier.popular ? fitnessTokens.color.neonGreen : fitnessTokens.color.border }}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#CCFF00] text-black px-4 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-sm">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div>
                  <h2 className={`text-2xl font-black uppercase italic tracking-tighter ${tier.popular ? "text-[#CCFF00]" : "text-white"}`}>
                    {tier.name}
                  </h2>
                  <p className="text-[11px] text-white/50 mt-1 leading-relaxed">{tier.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 select-none">
                  <span className="text-4xl md:text-5xl font-black tracking-tighter text-white font-mono">{price}</span>
                  <span className="text-xs font-bold text-white/60 font-mono">{period}</span>
                </div>

                <ul className="space-y-3 text-xs text-white/70 border-t border-white/10 pt-6">
                  {tier.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex gap-2.5 items-center">
                      <Check className="w-4 h-4 text-[#CCFF00] shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <FitnessButton
                  href={`${routes.book}?tier=${tier.slug}${isAnnual ? "&billing=annual" : ""}`}
                  variant={tier.popular ? "primary" : "secondary"}
                  className="w-full"
                >
                  {tier.cta}
                </FitnessButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
