"use client";

import { Activity, CalendarCheck2, HeartPulse, ShieldCheck, Stethoscope } from "lucide-react";

import { MQButton, MQChip, MQPanel, MQSectionLabel } from "../components";
import { mq, routes } from "../tokens";

const swatches = [
  ["Porcelain", mq.color.porcelain],
  ["Paper", mq.color.paper],
  ["Trust", mq.color.trust],
  ["Signal", mq.color.signal],
  ["Care", mq.color.care],
  ["Recovery", mq.color.recovery],
  ["Insurance", mq.color.insurance],
  ["Clay", mq.color.clay],
];

export default function MedQueueDesignSystemPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6">
      <section className="grid gap-6 lg:grid-cols-[0.56fr_0.44fr]">
        <MQPanel tone="warm">
          <MQSectionLabel icon={HeartPulse}>MedQueue system</MQSectionLabel>
          <h1 className="text-5xl font-black leading-none md:text-6xl" style={{ fontFamily: mq.font.display }}>
            A separate patient-app design system built for warmth, clarity, and state.
          </h1>
          <p className="mt-5 text-lg leading-8" style={{ color: mq.color.muted }}>
            This page is intentionally hidden from the main Kivox brand language. It documents the fictional product
            identity, tokens, UI states, and component behavior used across the MedQueue showcase.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <MQButton href={routes.home}>Open product</MQButton>
            <MQButton href={routes.search} variant="soft">
              Try search
            </MQButton>
          </div>
        </MQPanel>

        <MQPanel tone="white">
          <MQSectionLabel icon={ShieldCheck}>Principles</MQSectionLabel>
          <div className="space-y-4">
            {[
              ["Trust before conversion", "Credentials, coverage, and next steps are visible before the patient commits."],
              ["Warm precision", "Clinical information is structured, but the palette and spacing reduce anxiety."],
              ["State everywhere", "Booked slots, upcoming visits, and portal records change across routes."],
              ["No false urgency", "Healthcare UX does not use scarcity pressure as a conversion trick."],
            ].map(([title, body]) => (
              <div className="rounded-2xl border p-4" key={title} style={{ borderColor: mq.color.rule }}>
                <h2 className="text-base font-black">{title}</h2>
                <p className="mt-2 text-sm leading-6" style={{ color: mq.color.muted }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </MQPanel>
      </section>

      <section className="mt-8">
        <MQSectionLabel icon={Activity}>Color tokens</MQSectionLabel>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {swatches.map(([name, value]) => (
            <MQPanel className="p-4" key={name} tone="white">
              <div className="h-28 rounded-[22px] border" style={{ backgroundColor: value, borderColor: mq.color.rule }} />
              <h2 className="mt-4 text-base font-black">{name}</h2>
              <p className="mt-1 font-mono text-xs" style={{ color: mq.color.muted }}>
                {value}
              </p>
            </MQPanel>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <MQPanel tone="white">
          <MQSectionLabel icon={Stethoscope}>Component grammar</MQSectionLabel>
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.14em]" style={{ color: mq.color.faint }}>
                Buttons
              </h2>
              <div className="mt-3 flex flex-wrap gap-3">
                <MQButton href={routes.search}>Primary action</MQButton>
                <MQButton href={routes.portal} variant="soft">
                  Soft action
                </MQButton>
                <MQButton href={routes.home} variant="ghost">
                  Ghost action
                </MQButton>
              </div>
            </div>
            <div>
              <h2 className="text-sm font-black uppercase tracking-[0.14em]" style={{ color: mq.color.faint }}>
                Chips
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <MQChip tone="trust">Verified</MQChip>
                <MQChip tone="care">Available today</MQChip>
                <MQChip tone="recovery">Reviewed</MQChip>
                <MQChip tone="insurance">Coverage ready</MQChip>
              </div>
            </div>
          </div>
        </MQPanel>

        <MQPanel tone="warm">
          <MQSectionLabel icon={CalendarCheck2}>State model</MQSectionLabel>
          <div className="grid gap-3">
            {[
              ["Filters", "Query, specialty, city, availability, and insurance live in shared context."],
              ["Booked slots", "A confirmed appointment disables the same slot in profile and search flows."],
              ["Portal", "Upcoming appointments and mock records persist until the demo is reset."],
              ["Fictional data", "All medical, clinician, and insurance data is invented for the showcase."],
            ].map(([title, body]) => (
              <div className="rounded-2xl border bg-white p-4" key={title} style={{ borderColor: mq.color.rule }}>
                <h2 className="text-base font-black">{title}</h2>
                <p className="mt-2 text-sm leading-6" style={{ color: mq.color.muted }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </MQPanel>
      </section>
    </div>
  );
}
