import { Resend } from "resend";

import { getRequiredServerEnv } from "@/lib/env";

import type { Inquiry } from "../inquiry.types";

export async function resendAdapter(inquiry: Inquiry) {
  const resend = new Resend(getRequiredServerEnv("RESEND_API_KEY"));
  const to = getRequiredServerEnv("INQUIRY_TO_EMAIL");
  const from = getRequiredServerEnv("INQUIRY_FROM_EMAIL");

  const subject = `Kivox inquiry: ${inquiry.whatYouNeed}`;
  const text = [
    `What you need: ${inquiry.whatYouNeed}`,
    `Business type: ${inquiry.businessType}`,
    inquiry.timeline ? `Timeline: ${inquiry.timeline}` : null,
    inquiry.notes ? `Notes: ${inquiry.notes}` : null,
    "",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
  ]
    .filter(Boolean)
    .join("\n");

  await resend.emails.send({
    from,
    to,
    subject,
    text,
  });
}

