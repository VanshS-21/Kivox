"use client";

import { useEffect, useState } from "react";
import { useCafe } from "../context";
import { cafeTokens, routes } from "../tokens";
import { CafeButton, CafePanel } from "../components";
import { CheckCircle2, Clock, MapPin, Coffee, ArrowLeft, Check, Compass } from "lucide-react";

export default function OrderSuccessPage() {
  const { lastOrderId, checkoutInfo, resetDemo } = useCafe();
  const [statusStep, setStatusStep] = useState(0); // 0: Ticket Received, 1: Batch Roasting, 2: Ready

  // Auto-advance status steps for showcase interactive feedback
  useEffect(() => {
    if (!lastOrderId) return;
    const timers = [
      setTimeout(() => setStatusStep(1), 6000),  // Move to Preparing after 6s
      setTimeout(() => setStatusStep(2), 14000), // Move to Ready/Departed after 14s
    ];
    return () => timers.forEach(clearTimeout);
  }, [lastOrderId]);

  // Indian localized default data
  const orderId = lastOrderId || "ROAST-8834";
  const info = checkoutInfo || {
    fullName: "Vikram Nair",
    email: "vikram.nair@gmail.com",
    phone: "+91 98765 43210",
    method: "pickup" as const,
    address: "Indiranagar Flagship",
    timeSlot: "ASAP (15-20 mins)",
  };

  const steps = [
    {
      title: "Order Received",
      desc: "Our baristas in Bengaluru have received your ticket and are grinding the beans.",
      icon: Check,
    },
    {
      title: info.method === "delivery" ? "Packing & Brewing" : "Brewing & Extracting",
      desc: "Crafting your espresso cups and heat-sealing your estate coffee bags.",
      icon: Coffee,
    },
    {
      title: info.method === "delivery" ? "Out for Delivery" : "Ready for Pickup",
      desc: info.method === "delivery" ? "Our courier has departed Indiranagar." : "Head over to our specialty pickup counter.",
      icon: Compass,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 font-sans pb-24">
      {/* Top success badge */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex p-4 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900" style={{ fontFamily: cafeTokens.font.display }}>
          Order Confirmed
        </h1>
        <p className="text-sm text-gray-600">
          Your order has been queued at Indiranagar. Reference ID:{" "}
          <code className="px-2.5 py-1 rounded font-mono text-xs bg-gray-100 border border-gray-200 text-gray-800 font-bold">{orderId}</code>
        </p>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Status Tracker (Timeline style) */}
        <div className="md:col-span-7 space-y-6">
          <CafePanel bg="white" className="border-2" style={{ borderColor: cafeTokens.color.inkDark }}>
            <h2 className="text-lg font-bold mb-8" style={{ fontFamily: cafeTokens.font.display }}>
              Live Fulfillment Status
            </h2>

            {/* Stepper Timeline */}
            <div className="relative pl-8 border-l-2 space-y-12 ml-4" style={{ borderColor: `${cafeTokens.color.inkDark}15` }}>
              {steps.map((step, idx) => {
                const isActive = idx === statusStep;
                const isCompleted = idx < statusStep;
                const StepIcon = step.icon;

                return (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div
                      className="absolute -left-[45px] top-0 w-8 h-8 rounded-full border-2 transition-all duration-500 flex items-center justify-center shadow-sm"
                      style={{
                        backgroundColor: isCompleted
                          ? cafeTokens.color.copper
                          : isActive
                            ? cafeTokens.color.inkDark
                            : cafeTokens.color.bgIvory,
                        borderColor: isCompleted || isActive ? "transparent" : `${cafeTokens.color.inkDark}20`,
                      }}
                    >
                      <StepIcon
                        className="w-4 h-4 transition-colors duration-300"
                        style={{
                          color: isCompleted || isActive ? cafeTokens.color.bgIvory : `${cafeTokens.color.inkDark}66`,
                        }}
                      />

                      {/* Active pulse glow effect */}
                      {isActive && (
                        <div
                          className="absolute -inset-1.5 rounded-full animate-ping opacity-25 pointer-events-none"
                          style={{ backgroundColor: cafeTokens.color.inkDark }}
                        />
                      )}
                    </div>

                    <div className="space-y-1">
                      <h3
                        className="text-sm font-bold transition-colors duration-300 flex items-center gap-2"
                        style={{ color: isActive || isCompleted ? cafeTokens.color.inkDark : "oklch(0.55 0.02 35)" }}
                      >
                        {step.title}
                        {isActive && (
                          <span
                            className="inline-flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white animate-pulse"
                            style={{ backgroundColor: cafeTokens.color.copper }}
                          >
                            Active
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Manual Advance Controls for Demo */}
            <div className="mt-12 pt-6 border-t flex flex-col sm:flex-row gap-3 justify-between items-center" style={{ borderColor: cafeTokens.color.rule }}>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Interactive Simulation:</span>
              <div className="flex gap-2">
                {[0, 1, 2].map((step) => (
                  <button
                    key={step}
                    onClick={() => setStatusStep(step)}
                    className="px-3 py-1.5 text-[10px] font-bold border rounded-lg transition-all active:scale-95 shadow-sm"
                    style={{
                      borderColor: statusStep === step ? cafeTokens.color.copper : cafeTokens.color.rule,
                      backgroundColor: statusStep === step ? cafeTokens.color.peachBg : "white",
                      color: statusStep === step ? cafeTokens.color.copper : "inherit",
                    }}
                  >
                    Step {step + 1}
                  </button>
                ))}
              </div>
            </div>
          </CafePanel>
        </div>

        {/* Order Details Panel */}
        <div className="md:col-span-5 space-y-6">
          <CafePanel bg="paper" className="space-y-6">
            <h2 className="text-lg font-bold" style={{ fontFamily: cafeTokens.font.display }}>
              Fulfillment Method
            </h2>

            <div className="space-y-5 text-xs md:text-sm">
              <div className="flex gap-3">
                <Clock className="w-5 h-5 shrink-0 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-bold text-[10px] uppercase tracking-wider text-gray-400">Timing</p>
                  <p className="mt-0.5 font-semibold text-gray-900">{info.timeSlot}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-bold text-[10px] uppercase tracking-wider text-gray-400">
                    {info.method === "delivery" ? "Delivery Address" : "Pickup Location"}
                  </p>
                  <p className="mt-0.5 font-semibold text-gray-900 leading-relaxed">{info.address}</p>
                </div>
              </div>
            </div>
          </CafePanel>

          <CafePanel bg="white" className="space-y-4">
            <h2 className="text-lg font-bold" style={{ fontFamily: cafeTokens.font.display }}>
              Customer Information
            </h2>
            <div className="space-y-2 text-xs text-gray-600">
              <p>
                <strong className="text-gray-800">Name:</strong> {info.fullName}
              </p>
              <p>
                <strong className="text-gray-800">Email:</strong> {info.email}
              </p>
              <p>
                <strong className="text-gray-800">Phone:</strong> {info.phone}
              </p>
            </div>
          </CafePanel>

          <div className="text-center pt-2">
            <CafeButton href={routes.home} variant="outline" className="w-full shadow-sm hover:shadow" onClick={resetDemo}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Homepage
            </CafeButton>
          </div>
        </div>
      </div>
    </div>
  );
}
