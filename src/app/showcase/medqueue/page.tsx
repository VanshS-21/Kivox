"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  CalendarDays,
  HeartHandshake,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  UserRoundCheck,
  type LucideIcon,
} from "lucide-react";

import {
  CarePath,
  DoctorCard,
  MQButton,
  MQChip,
  MQPanel,
  MQSectionLabel,
  TrustStack,
} from "./components";
import { useMedQueue } from "./context";
import { mq, routes } from "./tokens";

export default function MedQueueHomePage() {
  const router = useRouter();
  const { doctors, filters, updateFilter, appointments } = useMedQueue();
  const featuredDoctors = doctors.slice(0, 3);
  const upcoming = appointments.filter((appointment) => appointment.status === "upcoming");
  const stats: Array<[string, string, LucideIcon]> = [
    ["6", "specialists", UserRoundCheck],
    ["24", "visible slots", CalendarDays],
    ["3-step", "booking flow", SlidersHorizontal],
    ["Portal", "after visit state", Activity],
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6 md:pt-16">
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <MQSectionLabel icon={HeartHandshake}>Premium patient concierge</MQSectionLabel>
          <h1
            className="max-w-4xl text-5xl font-black leading-[0.95] md:text-7xl"
            style={{ color: mq.color.ink, fontFamily: mq.font.display }}
          >
            Healthcare booking that feels calm before it feels clinical.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8" style={{ color: mq.color.muted }}>
            MedQueue turns doctor discovery, insurance checks, appointment booking, and after-visit records into one
            warm patient app. Every state is simulated, so the showcase behaves like a real product without touching
            real medical data.
          </p>

          <MQPanel className="mt-8" tone="white">
            <form
              className="grid gap-3 md:grid-cols-[1fr_0.8fr_auto]"
              onSubmit={(event) => {
                event.preventDefault();
                router.push(routes.search);
              }}
            >
              <label className="group relative">
                <span className="sr-only">Search doctors, symptoms, or specialty</span>
                <Search
                  aria-hidden="true"
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2"
                  style={{ color: mq.color.faint }}
                />
                <input
                  className="min-h-14 w-full rounded-2xl border bg-white pl-12 pr-4 text-sm font-semibold outline-none transition"
                  onChange={(event) => updateFilter("query", event.target.value)}
                  placeholder="Cardiologist, anxiety, skin rash..."
                  style={{ borderColor: mq.color.rule, color: mq.color.ink }}
                  value={filters.query}
                />
              </label>
              <label>
                <span className="sr-only">City</span>
                <select
                  className="min-h-14 w-full rounded-2xl border bg-white px-4 text-sm font-semibold outline-none transition"
                  onChange={(event) => updateFilter("city", event.target.value)}
                  style={{ borderColor: mq.color.rule, color: mq.color.ink }}
                  value={filters.city}
                >
                  <option>Any city</option>
                  <option>Mumbai</option>
                  <option>Bengaluru</option>
                  <option>Delhi</option>
                  <option>Pune</option>
                  <option>Hyderabad</option>
                </select>
              </label>
              <MQButton icon="search" type="submit">
                Find care
              </MQButton>
            </form>
          </MQPanel>

          <div className="mt-6 flex flex-wrap gap-2">
            {["Verified license", "Insurance-aware", "No urgency games", "Persistent portal"].map((label) => (
              <MQChip key={label} tone={label === "No urgency games" ? "care" : "trust"}>
                <ShieldCheck aria-hidden="true" className="h-3 w-3" />
                {label}
              </MQChip>
            ))}
          </div>
        </div>

        <MQPanel className="relative overflow-hidden" tone="warm">
          <div
            className="absolute right-6 top-6 h-24 w-24 rounded-full border"
            style={{ borderColor: mq.color.care, backgroundColor: "oklch(0.98 0.025 58 / 0.72)" }}
          />
          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <MQChip tone="recovery">Live patient state</MQChip>
                <h2 className="mt-5 text-3xl font-black leading-tight" style={{ fontFamily: mq.font.display }}>
                  Your next appointment is always visible.
                </h2>
              </div>
              <div
                className="grid h-14 w-14 place-items-center rounded-2xl"
                style={{ backgroundColor: mq.color.white, color: mq.color.trust }}
              >
                <CalendarDays aria-hidden="true" className="h-7 w-7" />
              </div>
            </div>

            <div className="mt-8 space-y-3">
              {(upcoming.length ? upcoming : [{ doctorName: "No active booking yet", day: "Choose a doctor", time: "Open search", specialty: "Concierge ready" }]).map(
                (appointment) => (
                  <div
                    className="rounded-3xl border p-4"
                    key={`${appointment.doctorName}-${appointment.time}`}
                    style={{ backgroundColor: mq.color.white, borderColor: mq.color.rule }}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-black" style={{ color: mq.color.ink }}>
                          {appointment.doctorName}
                        </p>
                        <p className="mt-1 text-sm" style={{ color: mq.color.muted }}>
                          {appointment.specialty} - {appointment.day} - {appointment.time}
                        </p>
                      </div>
                      <MQChip tone="care">Ready</MQChip>
                    </div>
                  </div>
                ),
              )}
            </div>

            <div className="mt-8">
              <CarePath active={upcoming.length ? 4 : 1} />
            </div>
          </div>
        </MQPanel>
      </section>

      <section className="mt-16 grid gap-4 md:grid-cols-4">
        {stats.map(([value, label, Icon]) => (
          <MQPanel className="p-5" key={label} tone="white">
            <Icon aria-hidden="true" className="h-5 w-5" style={{ color: mq.color.trust }} />
            <div className="mt-5 text-3xl font-black" style={{ fontFamily: mq.font.display }}>
              {value}
            </div>
            <div className="mt-1 text-sm font-semibold" style={{ color: mq.color.muted }}>
              {label}
            </div>
          </MQPanel>
        ))}
      </section>

      <section className="mt-16">
        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <MQSectionLabel icon={UserRoundCheck}>Matched clinicians</MQSectionLabel>
            <h2 className="text-4xl font-black" style={{ fontFamily: mq.font.display }}>
              Searchable, bookable, and trust-first.
            </h2>
          </div>
          <MQButton href={routes.search} variant="soft">
            Browse all doctors
          </MQButton>
        </div>
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredDoctors.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.id} compact />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <MQPanel tone="trust">
          <MQSectionLabel icon={ShieldCheck}>Concierge promise</MQSectionLabel>
          <h2 className="text-4xl font-black leading-tight" style={{ fontFamily: mq.font.display }}>
            The product slows down the scary parts and speeds up the admin parts.
          </h2>
          <p className="mt-5 text-base leading-7" style={{ color: mq.color.muted }}>
            MedQueue avoids fake scarcity, vague availability, and hidden coverage friction. The north-star is a patient
            who understands who they are seeing, what happens next, and where their care record lives.
          </p>
          <div className="mt-6">
            <Link className="inline-flex items-center gap-2 text-sm font-black" href={routes.designSystem} style={{ color: mq.color.trust }}>
              View project design system
              <Search aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </MQPanel>
        <TrustStack />
      </section>
    </div>
  );
}
