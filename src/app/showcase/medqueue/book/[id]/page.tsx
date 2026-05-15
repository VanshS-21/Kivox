"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMedQueue } from "../../context";
import { ArrowLeft, CreditCard, User, Clock, MapPin, Check } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { c, font } from "../../tokens";

export default function BookingFlow() {
  const { id } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { doctors, bookAppointment } = useMedQueue();

  const doctor = doctors.find((d) => d.id === id);
  const day = searchParams.get("day");
  const time = searchParams.get("time");

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!doctor || !day || !time) {
      router.push("/showcase/medqueue/search");
    }
  }, [doctor, day, time, router]);

  if (!doctor || !day || !time) return null;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      bookAppointment({
        id: `appt-${Math.random().toString(36).substring(2, 9)}`,
        doctorId: doctor.id,
        date: day,
        time: time,
        status: "upcoming",
      });
      setStep(3);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col" style={{ backgroundColor: c.surface }}>
      {/* Minimal header */}
      <div className="px-6 py-3" style={{ borderBottom: `1px solid ${c.subtle}` }}>
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
            style={{ fontFamily: font.mono, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.06em", color: c.muted }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Cancel
          </button>
          <span style={{
            fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 500,
            letterSpacing: "0.1em", textTransform: "uppercase" as const, color: c.trust,
          }}>
            Secure Checkout
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto w-full px-6 py-10 flex-1 flex flex-col">
        {step === 3 ? (
          /* ─── Success ─── */
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center text-center"
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-6"
              style={{ backgroundColor: c.trustLt }}
            >
              <Check className="w-7 h-7" style={{ color: c.trust }} />
            </div>
            <h1 style={{
              fontFamily: font.display, fontWeight: 700, fontSize: "1.75rem",
              letterSpacing: "-0.02em", color: c.ink, marginBottom: "0.75rem",
            }}>
              Booking confirmed
            </h1>
            <p style={{ color: c.muted, fontSize: "0.9375rem", maxWidth: "40ch", marginBottom: "2rem" }}>
              Your appointment with {doctor.name} on {day} at {time} is confirmed. A summary has been sent to your phone.
            </p>

            <div
              className="rounded-lg p-5 w-full max-w-sm text-left"
              style={{ backgroundColor: c.bg, border: `1px solid ${c.subtle}` }}
            >
              <div style={{
                fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase" as const, color: c.muted, marginBottom: "8px",
              }}>
                Location
              </div>
              <div style={{ fontSize: "0.875rem", fontWeight: 500, color: c.ink }}>{doctor.location}</div>
              <div style={{ fontSize: "0.75rem", color: c.muted, marginTop: "4px" }}>Please arrive 10 minutes early</div>
            </div>

            <button
              onClick={() => router.push("/showcase/medqueue/portal")}
              className="mt-8 px-8 py-3 rounded font-semibold transition-opacity hover:opacity-80"
              style={{ backgroundColor: c.ink, color: c.heroFg, fontFamily: font.body }}
            >
              Go to My Appointments
            </button>
          </motion.div>
        ) : (
          <>
            {/* Progress */}
            <div className="flex items-center gap-3 mb-10">
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: step >= 1 ? c.accent : c.subtle }} />
              <div className="flex-1 h-1 rounded-full" style={{ backgroundColor: step >= 2 ? c.accent : c.subtle }} />
            </div>

            <div className="flex flex-col md:flex-row gap-10">
              {/* Steps */}
              <div className="flex-1">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 style={{
                      fontFamily: font.display, fontWeight: 600, fontSize: "1.375rem",
                      letterSpacing: "-0.01em", color: c.ink, marginBottom: "1.5rem",
                    }}>
                      Confirm your details
                    </h1>

                    <div
                      className="rounded-lg p-5 mb-6"
                      style={{ backgroundColor: c.bg, border: `1px solid ${c.subtle}` }}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: c.subtle }}
                        >
                          <User className="w-5 h-5" style={{ color: c.muted }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: c.ink, fontSize: "0.9375rem" }}>Aarav Patel</div>
                          <div style={{ color: c.muted, fontSize: "0.8125rem" }}>+91 98765 43210 · Male, 32</div>
                        </div>
                      </div>
                      <div style={{
                        fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 500,
                        letterSpacing: "0.06em", textTransform: "uppercase" as const, color: c.trust,
                      }}>
                        Verified via ABHA
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-3.5 rounded font-semibold transition-opacity hover:opacity-80"
                      style={{ backgroundColor: c.accent, color: c.heroFg, fontFamily: font.body }}
                    >
                      Continue to Payment
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 style={{
                      fontFamily: font.display, fontWeight: 600, fontSize: "1.375rem",
                      letterSpacing: "-0.01em", color: c.ink, marginBottom: "1.5rem",
                    }}>
                      Payment
                    </h1>

                    <div
                      className="rounded-lg p-5 mb-6"
                      style={{ backgroundColor: c.accentLt, border: `1px solid ${c.accent}` }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <CreditCard className="w-4 h-4" style={{ color: c.accent }} />
                        <span style={{ fontWeight: 600, fontSize: "0.875rem", color: c.ink }}>Saved Card</span>
                      </div>
                      <div style={{ fontFamily: font.mono, fontSize: "0.875rem", color: c.ink, fontVariantNumeric: "tabular-nums" }}>
                        •••• •••• •••• 4242
                      </div>
                      <div style={{ fontSize: "0.75rem", color: c.muted, marginTop: "4px" }}>Expires 12/26</div>
                    </div>

                    <button
                      onClick={handleConfirm}
                      disabled={isProcessing}
                      className="w-full py-3.5 rounded font-semibold transition-opacity hover:opacity-80 flex items-center justify-center gap-2"
                      style={{ backgroundColor: c.ink, color: c.heroFg, fontFamily: font.body }}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Pay ₹${doctor.fee} & Confirm`
                      )}
                    </button>
                    <button
                      onClick={() => setStep(1)}
                      className="w-full mt-3 py-3 transition-opacity hover:opacity-60"
                      style={{ color: c.muted, fontSize: "0.875rem" }}
                    >
                      Back
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Summary Sidebar */}
              <div className="w-full md:w-64 shrink-0">
                <div
                  className="rounded-lg p-5 sticky top-28"
                  style={{ backgroundColor: c.bg, border: `1px solid ${c.subtle}` }}
                >
                  <div style={{
                    fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    color: c.muted, marginBottom: "12px",
                  }}>
                    Appointment
                  </div>

                  <div className="flex gap-3 mb-5">
                    <div className="relative w-10 h-10 shrink-0 rounded overflow-hidden" style={{ backgroundColor: c.surface }}>
                      <Image src={doctor.imageUrl} alt={doctor.name} fill className="object-cover object-top" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.8125rem", color: c.ink }}>{doctor.name}</div>
                      <div style={{ fontSize: "0.75rem", color: c.muted }}>{doctor.specialty}</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5" style={{ color: c.muted }} />
                      <div>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: c.ink }}>{day}</div>
                        <div style={{ fontSize: "0.6875rem", color: c.muted }}>{time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" style={{ color: c.muted }} />
                      <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: c.ink }}>{doctor.location}</div>
                    </div>
                  </div>

                  <div className="w-full h-px mb-4" style={{ backgroundColor: c.subtle }} />

                  <div className="flex justify-between mb-1.5">
                    <span style={{ fontSize: "0.8125rem", color: c.muted }}>Consultation</span>
                    <span style={{ fontFamily: font.mono, fontSize: "0.8125rem", fontWeight: 600, color: c.ink, fontVariantNumeric: "tabular-nums" }}>₹{doctor.fee}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span style={{ fontSize: "0.8125rem", color: c.muted }}>Platform fee</span>
                    <span style={{ fontFamily: font.mono, fontSize: "0.8125rem", fontWeight: 600, color: c.trust }}>Free</span>
                  </div>
                  <div className="flex justify-between pt-4" style={{ borderTop: `1px solid ${c.subtle}` }}>
                    <span style={{ fontWeight: 600, color: c.ink }}>Total</span>
                    <span style={{ fontFamily: font.mono, fontSize: "1.125rem", fontWeight: 700, color: c.ink, fontVariantNumeric: "tabular-nums" }}>₹{doctor.fee}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
