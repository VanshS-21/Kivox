"use client";

import Link from "next/link";
import {
  Activity,
  CalendarCheck2,
  ClipboardList,
  FileText,
  HeartPulse,
  Pill,
  Plus,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { MQButton, MQChip, MQPanel, MQSectionLabel } from "../components";
import { useMedQueue } from "../context";
import { mq, routes } from "../tokens";

export default function MedQueuePortalPage() {
  const { appointments, records, prescriptions } = useMedQueue();
  const upcoming = appointments.filter(
    (appointment) => appointment.status === "upcoming",
  );
  const completed = appointments.filter(
    (appointment) => appointment.status === "completed",
  );
  const quickActions: Array<[string, string, LucideIcon]> = [
    [
      "Upload insurance card",
      "Keep coverage ready before the next visit.",
      ShieldCheck,
    ],
    ["Add symptom note", "Capture context while it is fresh.", ClipboardList],
    [
      "Schedule follow-up",
      completed.length
        ? "One previous visit is ready for follow-up."
        : "No prior visits yet.",
      Plus,
    ],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
      <section className="grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
        <MQPanel tone="warm">
          <MQSectionLabel icon={HeartPulse}>Patient portal</MQSectionLabel>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h1
                className="text-5xl font-black leading-none md:text-6xl"
                style={{ fontFamily: mq.font.display }}
              >
                Good afternoon, Aarya.
              </h1>
              <p
                className="mt-5 max-w-2xl text-lg leading-8"
                style={{ color: mq.color.muted }}
              >
                Your appointments, prescriptions, results, and follow-up tasks
                stay in one calm care timeline.
              </p>
            </div>
            <MQButton href={routes.search} icon="search">
              Book care
            </MQButton>
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              [upcoming.length, "upcoming"],
              [records.length, "records"],
              [prescriptions.length, "prescriptions"],
            ].map(([value, label]) => (
              <div
                className="rounded-2xl border bg-white p-4"
                key={label}
                style={{ borderColor: mq.color.rule }}
              >
                <div
                  className="text-3xl font-black"
                  style={{ fontFamily: mq.font.display }}
                >
                  {value}
                </div>
                <div
                  className="mt-1 text-xs font-bold uppercase"
                  style={{ color: mq.color.faint }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </MQPanel>

        <MQPanel tone="white">
          <MQSectionLabel icon={Activity}>Vitals snapshot</MQSectionLabel>
          <div className="space-y-4">
            {[
              ["Resting HR", "72", "bpm", "62%"],
              ["Sleep", "7.4", "hrs", "78%"],
              ["Stress", "Low", "today", "38%"],
            ].map(([label, value, unit, width]) => (
              <div key={label}>
                <div className="flex items-end justify-between">
                  <span className="text-sm font-black">{label}</span>
                  <span className="text-sm" style={{ color: mq.color.muted }}>
                    <strong style={{ color: mq.color.ink }}>{value}</strong>{" "}
                    {unit}
                  </span>
                </div>
                <div
                  className="mt-2 h-2 rounded-full"
                  style={{ backgroundColor: mq.color.paper }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ backgroundColor: mq.color.recovery, width }}
                  />
                </div>
              </div>
            ))}
          </div>
        </MQPanel>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
        <MQPanel tone="white">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <MQSectionLabel icon={CalendarCheck2}>
                Appointments
              </MQSectionLabel>
              <h2
                className="text-3xl font-black"
                style={{ fontFamily: mq.font.display }}
              >
                Care timeline
              </h2>
            </div>
            <MQChip tone="trust">{appointments.length} visits</MQChip>
          </div>

          <div className="space-y-3">
            {appointments.map((appointment) => (
              <div
                className="rounded-3xl border p-4"
                key={appointment.id}
                style={{
                  backgroundColor:
                    appointment.status === "upcoming"
                      ? mq.color.careSoft
                      : mq.color.panel,
                  borderColor: mq.color.rule,
                }}
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-black">
                        {appointment.doctorName}
                      </h3>
                      <MQChip
                        tone={
                          appointment.status === "upcoming" ? "care" : "neutral"
                        }
                      >
                        {appointment.status}
                      </MQChip>
                    </div>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: mq.color.muted }}
                    >
                      {appointment.specialty} - {appointment.day} at{" "}
                      {appointment.time}
                    </p>
                  </div>
                  <Link
                    className="inline-flex min-h-11 items-center text-sm font-black"
                    href={
                      appointment.status === "upcoming"
                        ? routes.doctor(appointment.doctorId)
                        : routes.search
                    }
                    style={{ color: mq.color.trust }}
                  >
                    {appointment.status === "upcoming"
                      ? "Manage visit"
                      : "Book follow-up"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </MQPanel>

        <div className="space-y-6">
          <MQPanel tone="white">
            <MQSectionLabel icon={FileText}>Records</MQSectionLabel>
            <div className="space-y-3">
              {records.map((record) => (
                <div
                  className="rounded-2xl border p-4"
                  key={record.id}
                  style={{ borderColor: mq.color.rule }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-black">{record.title}</h3>
                      <p
                        className="mt-1 text-sm"
                        style={{ color: mq.color.muted }}
                      >
                        {record.doctorName} - {record.date}
                      </p>
                    </div>
                    <MQChip tone="recovery">{record.status}</MQChip>
                  </div>
                </div>
              ))}
            </div>
          </MQPanel>

          <MQPanel tone="trust">
            <MQSectionLabel icon={Pill}>Prescriptions</MQSectionLabel>
            <div className="space-y-3">
              {prescriptions.map((item) => (
                <div
                  className="rounded-2xl border bg-white p-4"
                  key={item.id}
                  style={{ borderColor: mq.color.rule }}
                >
                  <h3 className="text-sm font-black">{item.name}</h3>
                  <p className="mt-1 text-sm" style={{ color: mq.color.muted }}>
                    {item.dose} - {item.schedule}
                  </p>
                </div>
              ))}
            </div>
          </MQPanel>
        </div>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        {quickActions.map(([title, body, Icon]) => (
          <MQPanel className="p-5" key={String(title)} tone="white">
            <Icon
              aria-hidden="true"
              className="h-5 w-5"
              style={{ color: mq.color.trust }}
            />
            <h3 className="mt-4 text-base font-black">{String(title)}</h3>
            <p
              className="mt-2 text-sm leading-6"
              style={{ color: mq.color.muted }}
            >
              {String(body)}
            </p>
          </MQPanel>
        ))}
      </section>
    </div>
  );
}
