import type { Metadata } from "next";
import type { ReactNode } from "react";

import { MQNav } from "./components";
import { MedQueueProvider } from "./context";
import { mq } from "./tokens";

export const metadata: Metadata = {
  title: "MedQueue Patient Concierge | Kivox Showcase",
  description:
    "A premium patient app demo with provider discovery, booking, insurance verification, and a persistent patient portal.",
};

export default function MedQueueLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <MedQueueProvider>
      <div
        className="medqueue-scope min-h-screen"
        style={{
          background:
            "radial-gradient(circle at 14% 4%, oklch(0.94 0.04 58 / 0.75), transparent 26rem), radial-gradient(circle at 88% 8%, oklch(0.93 0.032 228 / 0.65), transparent 30rem), oklch(0.975 0.009 82)",
          color: mq.color.ink,
          fontFamily: mq.font.body,
        }}
      >
        <MQNav />
        <div>{children}</div>
        <footer
          className="mx-auto max-w-7xl px-4 py-10 text-sm md:px-6"
          style={{ color: mq.color.muted }}
        >
          <div
            className="rounded-[28px] border p-5"
            style={{
              backgroundColor: mq.color.panel,
              borderColor: mq.color.rule,
            }}
          >
            MedQueue is a fictional healthcare product showcase. It does not
            provide medical advice, process payments, connect to real patient
            records, or represent real clinicians.
          </div>
        </footer>
      </div>
    </MedQueueProvider>
  );
}
