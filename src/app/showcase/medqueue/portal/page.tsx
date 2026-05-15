"use client";

import { useMedQueue } from "../context";
import { useRouter } from "next/navigation";
import { User, Calendar, Clock, MapPin, Search, ChevronRight, FileText } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";
import { c, font } from "../tokens";

export default function PatientPortal() {
  const { appointments, doctors } = useMedQueue();
  const router = useRouter();

  const upcoming = appointments.filter((a) => a.status === "upcoming");

  return (
    <div className="flex-1 pb-20" style={{ backgroundColor: c.bg }}>
      {/* Profile Header */}
      <div className="px-6 pt-10 pb-20" style={{ backgroundColor: c.hero }}>
        <div className="max-w-5xl mx-auto flex items-center gap-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "oklch(0.25 0.03 240)", border: "1px solid oklch(0.35 0.03 240)" }}
          >
            <User className="w-8 h-8" style={{ color: c.heroMuted }} />
          </div>
          <div>
            <h1 style={{
              fontFamily: font.display, fontWeight: 700, fontSize: "1.75rem",
              letterSpacing: "-0.02em", color: c.heroFg,
            }}>
              Aarav Patel
            </h1>
            <p style={{
              fontFamily: font.mono, fontSize: "0.6875rem", fontWeight: 500,
              letterSpacing: "0.06em", color: c.heroMuted, marginTop: "2px",
            }}>
              ABHA ID: 91-8822-XXXX-XXXX
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            {/* Upcoming */}
            <section
              className="rounded-lg overflow-hidden"
              style={{ border: `1px solid ${c.subtle}`, backgroundColor: c.surface }}
            >
              <div className="px-5 py-3 flex items-center gap-2" style={{ borderBottom: `1px solid ${c.subtle}`, backgroundColor: c.bg }}>
                <Calendar className="w-4 h-4" style={{ color: c.accent }} />
                <h2 style={{
                  fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
                  letterSpacing: "0.12em", textTransform: "uppercase" as const, color: c.muted,
                }}>
                  Upcoming Appointments
                </h2>
              </div>

              {upcoming.length === 0 ? (
                <div className="p-10 text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: c.subtle }} />
                  <h3 style={{ fontFamily: font.display, fontWeight: 600, fontSize: "1rem", color: c.ink, marginBottom: "0.5rem" }}>
                    No upcoming appointments
                  </h3>
                  <p style={{ color: c.muted, fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                    Need to see a doctor?
                  </p>
                  <button
                    onClick={() => router.push("/showcase/medqueue/search")}
                    className="px-5 py-2.5 rounded font-semibold text-sm transition-opacity hover:opacity-80"
                    style={{ backgroundColor: c.accent, color: c.heroFg, fontFamily: font.body }}
                  >
                    Find a Doctor
                  </button>
                </div>
              ) : (
                <div>
                  {upcoming.map((appt, idx) => {
                    const doc = doctors.find((d) => d.id === appt.doctorId);
                    if (!doc) return null;
                    return (
                      <motion.div
                        key={appt.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="p-5 flex flex-col sm:flex-row gap-4"
                        style={{ borderBottom: `1px solid ${c.subtle}` }}
                      >
                        <div className="w-12 h-12 shrink-0 rounded overflow-hidden relative" style={{ backgroundColor: c.bg }}>
                          <Image src={doc.imageUrl} alt={doc.name} fill className="object-cover object-top" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 style={{ fontFamily: font.display, fontWeight: 600, fontSize: "0.9375rem", color: c.ink }}>
                                {doc.name}
                              </h3>
                              <p style={{ fontSize: "0.75rem", color: c.muted }}>{doc.specialty}</p>
                            </div>
                            <span style={{
                              fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                              letterSpacing: "0.1em", textTransform: "uppercase" as const,
                              color: c.trust, padding: "2px 6px", borderRadius: "3px", backgroundColor: c.trustLt,
                            }}>
                              Confirmed
                            </span>
                          </div>
                          <div className="mt-3 flex gap-4" style={{
                            fontFamily: font.mono, fontSize: "0.6875rem", color: c.muted,
                          }}>
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3 h-3" />
                              <span style={{ fontWeight: 500, color: c.ink }}>{appt.date}</span>
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3 h-3" />
                              <span style={{ fontWeight: 500, color: c.ink }}>{appt.time}</span>
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Medical Records */}
            <section
              className="rounded-lg overflow-hidden"
              style={{ border: `1px solid ${c.subtle}`, backgroundColor: c.surface }}
            >
              <div className="px-5 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${c.subtle}`, backgroundColor: c.bg }}>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" style={{ color: c.trust }} />
                  <h2 style={{
                    fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase" as const, color: c.muted,
                  }}>
                    Medical Records
                  </h2>
                </div>
                <button style={{
                  fontFamily: font.mono, fontSize: "0.5625rem", fontWeight: 500,
                  letterSpacing: "0.06em", textTransform: "uppercase" as const, color: c.accent,
                }}>
                  View All
                </button>
              </div>
              {[
                { name: "Blood Test Report", date: "12 Oct, 2023", doctor: "Dr. Ananya Sharma" },
                { name: "Digital Prescription", date: "12 Oct, 2023", doctor: "Dr. Ananya Sharma" },
                { name: "MRI Scan Analysis", date: "05 Aug, 2023", doctor: "Dr. Vikram Singh" },
              ].map((record, i, arr) => (
                <div
                  key={i}
                  className="px-5 py-3.5 flex items-center justify-between cursor-pointer transition-colors hover:bg-[oklch(0.96_0.004_240)]"
                  style={{ borderBottom: i < arr.length - 1 ? `1px solid ${c.subtle}` : undefined }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: c.bg }}>
                      <FileText className="w-4 h-4" style={{ color: c.muted }} />
                    </div>
                    <div>
                      <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: c.ink }}>{record.name}</div>
                      <div style={{ fontFamily: font.mono, fontSize: "0.625rem", color: c.muted }}>
                        {record.date} · {record.doctor}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4" style={{ color: c.subtle }} />
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div
              className="rounded-lg p-5"
              style={{ border: `1px solid ${c.subtle}`, backgroundColor: c.surface }}
            >
              <h3 style={{
                fontFamily: font.mono, fontSize: "0.5rem", fontWeight: 600,
                letterSpacing: "0.12em", textTransform: "uppercase" as const,
                color: c.muted, marginBottom: "12px",
              }}>
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/showcase/medqueue/search")}
                  className="w-full flex items-center gap-3 p-3 rounded transition-opacity hover:opacity-70 text-left"
                  style={{ border: `1px solid ${c.subtle}`, color: c.ink }}
                >
                  <Search className="w-4 h-4" style={{ color: c.muted }} />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Book New Appointment</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 p-3 rounded transition-opacity hover:opacity-70 text-left"
                  style={{ border: `1px solid ${c.subtle}`, color: c.ink }}
                >
                  <MapPin className="w-4 h-4" style={{ color: c.muted }} />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 500 }}>Find Nearby Labs</span>
                </button>
              </div>
            </div>

            <div
              className="rounded-lg p-5"
              style={{ backgroundColor: c.accent }}
            >
              <h3 style={{
                fontFamily: font.display, fontWeight: 600, fontSize: "1rem",
                color: c.heroFg, marginBottom: "0.5rem",
              }}>
                MedQueue Plus
              </h3>
              <p style={{ fontSize: "0.8125rem", color: "oklch(0.85 0.03 240)", lineHeight: 1.5, marginBottom: "1rem" }}>
                Zero wait times, free follow-ups, and priority access to top specialists.
              </p>
              <button
                className="w-full py-2 rounded font-semibold text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: c.heroFg, color: c.accent, fontFamily: font.body }}
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
