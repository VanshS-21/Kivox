"use client";

import { useParams, useRouter } from "next/navigation";
import { useMedQueue } from "../../context";
import { ArrowLeft, MapPin, Clock, Info } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { c, font } from "../../tokens";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = ["09:00", "10:30", "12:00", "14:30", "16:00", "17:30"];

const generateGrid = () =>
  Array.from({ length: 7 }, () =>
    Array.from({ length: 6 }, () => Math.random() > 0.3)
  );

export default function DoctorProfile() {
  const { id } = useParams();
  const router = useRouter();
  const { doctors } = useMedQueue();
  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);

  const doctor = doctors.find((d) => d.id === id);
  const grid = useMemo(() => generateGrid(), [id]);

  if (!doctor) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8" style={{ backgroundColor: c.bg }}>
        <h2 style={{ fontFamily: font.display, fontWeight: 600, fontSize: "1.25rem", color: c.ink, marginBottom: "1rem" }}>
          Doctor not found
        </h2>
        <button onClick={() => router.back()} className="hover:opacity-60 transition-opacity" style={{ fontFamily: font.mono, fontSize: "0.75rem", color: c.accent, letterSpacing: "0.06em" }}>
          Go back
        </button>
      </div>
    );
  }

  const handleBook = () => {
    if (selectedSlot) {
      router.push(`/showcase/medqueue/book/${doctor.id}?day=${selectedSlot.day}&time=${selectedSlot.time}`);
    }
  };

  return (
    <div className="flex-1 pb-20" style={{ backgroundColor: c.bg }}>
      {/* Breadcrumb */}
      <div className="px-6 py-3" style={{ borderBottom: `1px solid ${c.subtle}` }}>
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
            style={{ fontFamily: font.mono, fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.06em", color: c.muted }}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to results
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile */}
        <div className="lg:col-span-7 space-y-6">
          {/* Profile Header */}
          <section className="flex gap-6">
            <div
              className="relative w-28 h-28 md:w-36 md:h-36 shrink-0 rounded-lg overflow-hidden"
              style={{ backgroundColor: c.subtle }}
            >
              <Image src={doctor.imageUrl} alt={doctor.name} fill className="object-cover object-top" />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-2">
                <span style={{
                  fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase" as const,
                  color: c.accent, padding: "2px 8px", borderRadius: "3px", backgroundColor: c.accentLt,
                }}>
                  {doctor.specialty}
                </span>
                <span style={{
                  fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 500,
                  letterSpacing: "0.06em", textTransform: "uppercase" as const, color: c.trust,
                }}>
                  NMC Verified
                </span>
              </div>
              <h1 style={{
                fontFamily: font.display, fontWeight: 700,
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                letterSpacing: "-0.02em", color: c.ink, marginBottom: "0.25rem",
              }}>
                {doctor.name}
              </h1>
              <p className="flex items-center gap-1.5" style={{ color: c.muted, fontSize: "0.875rem" }}>
                <MapPin className="w-3.5 h-3.5" /> {doctor.location}
              </p>
            </div>
          </section>

          {/* Credentials Table */}
          <section
            className="rounded-lg overflow-hidden"
            style={{ border: `1px solid ${c.subtle}`, backgroundColor: c.surface }}
          >
            <div className="px-5 py-3" style={{ borderBottom: `1px solid ${c.subtle}`, backgroundColor: c.bg }}>
              <h2 style={{
                fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase" as const, color: c.muted,
              }}>
                Credentials & Outcomes
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {[
                { label: "Experience", value: `${doctor.experience} yrs` },
                { label: "Success Rate", value: `${doctor.successRate}%` },
                { label: "Patients", value: `${(doctor.consultations / 1000).toFixed(1)}k` },
                { label: "Consult Fee", value: `₹${doctor.fee}` },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="p-5"
                  style={{
                    borderRight: i < 3 ? `1px solid ${c.subtle}` : undefined,
                    borderBottom: `1px solid ${c.subtle}`,
                  }}
                >
                  <div style={{
                    fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    color: c.muted, marginBottom: "6px",
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    fontFamily: font.mono, fontSize: "1.25rem", fontWeight: 600,
                    color: c.ink, fontVariantNumeric: "tabular-nums",
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Education & Registration */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-5" style={{ borderRight: `1px solid ${c.subtle}` }}>
                <div style={{
                  fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase" as const,
                  color: c.muted, marginBottom: "6px",
                }}>
                  Education
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 500, color: c.ink }}>M.D. (Gold Medal)</div>
                <div style={{ fontSize: "0.75rem", color: c.muted, marginTop: "2px" }}>
                  AIIMS Delhi, 2008 · Fellowship, Johns Hopkins, 2012
                </div>
              </div>
              <div className="p-5">
                <div style={{
                  fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase" as const,
                  color: c.muted, marginBottom: "6px",
                }}>
                  Registration
                </div>
                <div style={{ fontSize: "0.875rem", fontWeight: 500, color: c.ink }}>NMC #MH-28491</div>
                <div style={{ fontSize: "0.75rem", color: c.muted, marginTop: "2px" }}>
                  Maharashtra Medical Council · Active
                </div>
              </div>
            </div>
          </section>

          {/* Patient Experience */}
          <section
            className="rounded-lg overflow-hidden"
            style={{ border: `1px solid ${c.subtle}`, backgroundColor: c.surface }}
          >
            <div className="px-5 py-3" style={{ borderBottom: `1px solid ${c.subtle}`, backgroundColor: c.bg }}>
              <h2 style={{
                fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase" as const, color: c.muted,
              }}>
                Patient Experience
              </h2>
            </div>
            <div className="p-5 space-y-4">
              {[
                { label: "Diagnosis Accuracy", score: 98 },
                { label: "Wait Time Punctuality", score: 92 },
                { label: "Treatment Explanation", score: 95 },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div style={{ fontSize: "0.8125rem", color: c.ink, minWidth: "160px" }}>{item.label}</div>
                  <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: c.bg }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.score}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: c.accent }}
                    />
                  </div>
                  <div style={{
                    fontFamily: font.mono, fontSize: "0.75rem", fontWeight: 600,
                    color: c.ink, fontVariantNumeric: "tabular-nums", minWidth: "32px", textAlign: "right" as const,
                  }}>
                    {item.score}%
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Booking Sidebar */}
        <div className="lg:col-span-5">
          <div
            className="sticky top-28 rounded-lg overflow-hidden"
            style={{ border: `1px solid ${c.subtle}`, backgroundColor: c.surface }}
          >
            {/* Fee Header */}
            <div className="p-5 flex justify-between items-center" style={{ backgroundColor: c.hero }}>
              <div>
                <div style={{
                  fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 500,
                  letterSpacing: "0.1em", textTransform: "uppercase" as const, color: c.heroMuted,
                }}>
                  In-Clinic Consultation
                </div>
                <div style={{
                  fontFamily: font.mono, fontSize: "1.5rem", fontWeight: 700,
                  color: c.heroFg, fontVariantNumeric: "tabular-nums", marginTop: "4px",
                }}>
                  ₹{doctor.fee}
                </div>
              </div>
              {doctor.availableToday && (
                <div className="flex items-center gap-1.5" style={{
                  fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 500,
                  letterSpacing: "0.06em", textTransform: "uppercase" as const, color: c.trust,
                }}>
                  <Clock className="w-3 h-3" /> Today
                </div>
              )}
            </div>

            {/* Availability Grid */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 style={{
                  fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase" as const, color: c.muted,
                }}>
                  Select a slot
                </h3>
                <div style={{
                  fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 500,
                  letterSpacing: "0.06em", textTransform: "uppercase" as const,
                  color: c.trust, padding: "2px 6px", borderRadius: "3px", backgroundColor: c.trustLt,
                }}>
                  Live
                </div>
              </div>

              {/* Grid */}
              <div className="rounded overflow-hidden mb-4" style={{ border: `1px solid ${c.subtle}` }}>
                <div className="flex" style={{ backgroundColor: c.bg, borderBottom: `1px solid ${c.subtle}` }}>
                  <div className="w-14 shrink-0" style={{ borderRight: `1px solid ${c.subtle}` }} />
                  {days.map((day) => (
                    <div
                      key={day}
                      className="flex-1 text-center py-2"
                      style={{
                        fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                        letterSpacing: "0.06em", color: c.muted,
                        borderRight: `1px solid ${c.subtle}`,
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                {times.map((time, tIdx) => (
                  <div key={time} className="flex" style={{ borderBottom: `1px solid ${c.subtle}` }}>
                    <div
                      className="w-14 shrink-0 py-2 text-center"
                      style={{
                        fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 500,
                        color: c.muted, backgroundColor: c.bg,
                        borderRight: `1px solid ${c.subtle}`,
                      }}
                    >
                      {time}
                    </div>
                    {days.map((day, dIdx) => {
                      const avail = grid[dIdx]?.[tIdx];
                      const sel = selectedSlot?.day === day && selectedSlot?.time === time;
                      return (
                        <button
                          key={`${day}-${time}`}
                          disabled={!avail}
                          onClick={() => setSelectedSlot({ day, time })}
                          className="flex-1 min-h-[32px] transition-colors flex items-center justify-center"
                          style={{
                            borderRight: `1px solid ${c.subtle}`,
                            backgroundColor: !avail ? c.bg : sel ? c.accent : c.surface,
                            opacity: !avail ? 0.3 : 1,
                            cursor: !avail ? "not-allowed" : "pointer",
                          }}
                        >
                          {sel && (
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.heroFg }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div
                className="flex items-start gap-2 mb-5 p-3 rounded text-xs"
                style={{ backgroundColor: c.trustLt, color: c.trust, fontFamily: font.body }}
              >
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <p style={{ fontSize: "0.75rem", lineHeight: 1.5 }}>
                  Slots are real-time. Booking confirms your appointment instantly.
                </p>
              </div>

              <button
                disabled={!selectedSlot}
                onClick={handleBook}
                className="w-full py-3.5 rounded font-semibold transition-all"
                style={{
                  backgroundColor: selectedSlot ? c.accent : c.bg,
                  color: selectedSlot ? c.heroFg : c.muted,
                  cursor: selectedSlot ? "pointer" : "not-allowed",
                  fontFamily: font.body,
                  fontSize: "0.9375rem",
                }}
              >
                {selectedSlot
                  ? `Book for ${selectedSlot.day}, ${selectedSlot.time}`
                  : "Select a slot to continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
