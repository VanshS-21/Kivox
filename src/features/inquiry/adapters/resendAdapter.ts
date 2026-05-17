import { Resend } from "resend";

import { brand } from "@/content/brand";
import { getRequiredServerEnv } from "@/lib/env";

import type { Inquiry } from "../inquiry.types";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kivox.in").replace(/\/$/, "");
const CARD_WIDTH = "640";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatFromAddress(email: string): string {
  if (email.includes("<")) return email;
  return `${brand.name} <${email}>`;
}

function formatSubmittedAt(): string {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });
}

function notesHtml(inquiry: Inquiry): string {
  const notes = inquiry.notes?.trim();
  if (!notes) return "<span style=\"color:#8B8176;\">No extra notes provided.</span>";
  return escapeHtml(notes).replace(/\n/g, "<br />");
}

function row(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:14px 18px;background:#F6F1E9;border-bottom:1px solid #E8DFD2;width:170px;font-size:11px;line-height:1.4;font-weight:700;color:#8B6A2C;text-transform:uppercase;letter-spacing:0.12em;">${label}</td>
      <td style="padding:14px 18px;background:#FFFCF7;border-bottom:1px solid #E8DFD2;font-size:15px;line-height:1.6;color:#1F1B16;">${value}</td>
    </tr>`;
}

function compactBrandHeader(label: string): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="vertical-align:middle;">
          <p style="margin:0;color:#FFF9EC;font-size:24px;line-height:1;font-weight:800;letter-spacing:-0.08em;">
            kivox<span style="font-size:11px;font-weight:700;letter-spacing:-0.02em;">.in</span>
          </p>
        </td>
        <td align="right" style="vertical-align:middle;">
          <p style="margin:0;color:#F1B64B;font-size:10px;line-height:1.4;font-weight:700;text-transform:uppercase;letter-spacing:0.16em;">${label}</p>
        </td>
      </tr>
    </table>`;
}

function buildAdminEmailHtml(inquiry: Inquiry): string {
  const submittedAt = formatSubmittedAt();

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New Kivox Inquiry</title>
  </head>
  <body style="margin:0;padding:0;background:#080706;font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;color:#F9F3E7;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#080706;padding:40px 16px;">
      <tr>
        <td align="center">
          <table width="${CARD_WIDTH}" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:${CARD_WIDTH}px;background:#12100D;border:1px solid #2B251E;border-radius:20px;overflow:hidden;box-shadow:0 28px 80px rgba(0,0,0,0.34);">
            <tr>
              <td style="padding:28px 34px;background:linear-gradient(135deg,#120F0B 0%,#241809 54%,#B77910 100%);">
                ${compactBrandHeader("New inquiry")}
                <h1 style="margin:22px 0 0;color:#FFF9EC;font-size:26px;line-height:1.16;font-weight:750;letter-spacing:-0.02em;">Someone wants to build with Kivox.</h1>
                <p style="margin:14px 0 0;color:#F7E6C7;font-size:14px;line-height:1.65;">Submitted from ${escapeHtml(SITE_URL)} on ${submittedAt} IST.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:30px 34px;background:#FFFCF7;">
                <p style="margin:0 0 22px;color:#3D352D;font-size:15px;line-height:1.75;">The contact form captured the details below. Replying to this email will reply directly to the prospect.</p>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid #E8DFD2;border-radius:14px;overflow:hidden;">
                  ${row("Name", escapeHtml(inquiry.name))}
                  ${row("Email", `<a href="mailto:${escapeHtml(inquiry.email)}" style="color:#B77910;text-decoration:none;font-weight:700;">${escapeHtml(inquiry.email)}</a>`)}
                  ${row("Phone", `<a href="tel:${escapeHtml(inquiry.phone.replace(/\s+/g, ""))}" style="color:#B77910;text-decoration:none;font-weight:700;">${escapeHtml(inquiry.phone)}</a>`)}
                  ${row("Business", escapeHtml(inquiry.businessType))}
                  ${row("Need", `<strong>${escapeHtml(inquiry.whatYouNeed)}</strong>`)}
                  ${row("Timeline", escapeHtml(inquiry.timeline ?? "Not specified"))}
                  ${row("Notes", notesHtml(inquiry))}
                </table>
                <p style="margin:24px 0 0;color:#8B8176;font-size:12px;line-height:1.6;text-align:center;">Kivox inquiry pipeline: protected by validation, honeypot, timing checks, and IP rate limiting.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildAutoReplyHtml(inquiry: Inquiry): string {
  const firstName = inquiry.name.trim().split(/\s+/)[0] || inquiry.name;
  const safeName = escapeHtml(firstName);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Thanks for contacting Kivox</title>
  </head>
  <body style="margin:0;padding:0;background:#F7F2EA;font-family:Inter,Segoe UI,Roboto,Arial,sans-serif;color:#211B14;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#F7F2EA;padding:40px 16px;">
      <tr>
        <td align="center">
          <table width="${CARD_WIDTH}" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:${CARD_WIDTH}px;background:#FFFCF7;border:1px solid #E8DFD2;border-radius:20px;overflow:hidden;box-shadow:0 22px 70px rgba(41,29,12,0.12);">
            <tr>
              <td style="padding:30px 36px;background:#100D0A;">
                ${compactBrandHeader("Message received")}
                <h1 style="margin:22px 0 0;color:#FFF9EC;font-size:26px;line-height:1.18;font-weight:750;letter-spacing:-0.02em;">We received your inquiry.</h1>
                <p style="margin:14px 0 0;color:#D9C9AD;font-size:14px;line-height:1.7;">${escapeHtml(brand.tagline)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 36px;">
                <p style="margin:0 0 18px;color:#211B14;font-size:16px;line-height:1.7;font-weight:700;">Hi ${safeName},</p>
                <p style="margin:0 0 16px;color:#4A4037;font-size:15px;line-height:1.8;">Thanks for reaching out to Kivox. We have your project details and will review them carefully before replying.</p>
                <p style="margin:0 0 24px;color:#4A4037;font-size:15px;line-height:1.8;">We help businesses build websites, apps, and online systems that are easier to find, trust, and choose. You can expect a clear next step from us within 24 hours.</p>
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 26px;border:1px solid #E8DFD2;border-radius:14px;overflow:hidden;background:#F6F1E9;">
                  <tr>
                    <td style="padding:18px 20px;">
                      <p style="margin:0 0 8px;color:#8B6A2C;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">What we received</p>
                      <p style="margin:0;color:#211B14;font-size:15px;line-height:1.7;"><strong>${escapeHtml(inquiry.whatYouNeed)}</strong> for ${escapeHtml(inquiry.businessType.toLowerCase())}${inquiry.timeline ? `, ${escapeHtml(inquiry.timeline.toLowerCase())}` : ""}.</p>
                    </td>
                  </tr>
                </table>
                <div style="height:1px;background:linear-gradient(90deg,rgba(183,121,16,0),rgba(183,121,16,0.52),rgba(183,121,16,0));margin:0 0 24px;"></div>
                <p style="margin:0 0 12px;color:#211B14;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;">Useful links</p>
                <p style="margin:0 0 8px;color:#4A4037;font-size:15px;line-height:1.7;"><a href="${escapeHtml(SITE_URL)}" style="color:#B77910;text-decoration:none;font-weight:700;">Visit kivox.in</a></p>
                <p style="margin:0 0 8px;color:#4A4037;font-size:15px;line-height:1.7;"><a href="${escapeHtml(SITE_URL)}/work" style="color:#B77910;text-decoration:none;font-weight:700;">See our work</a></p>
                <p style="margin:0;color:#4A4037;font-size:15px;line-height:1.7;"><a href="${escapeHtml(SITE_URL)}/faq" style="color:#B77910;text-decoration:none;font-weight:700;">Read common questions</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 36px;background:#F6F1E9;border-top:1px solid #E8DFD2;">
                <p style="margin:0;color:#7C7065;font-size:12px;line-height:1.7;">You can reply to this email directly, or reach us at <a href="mailto:${escapeHtml(brand.contact.email)}" style="color:#B77910;text-decoration:none;font-weight:700;">${escapeHtml(brand.contact.email)}</a>. ${escapeHtml(brand.locationLine)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildAdminText(inquiry: Inquiry): string {
  return [
    "New Kivox inquiry",
    "",
    `Submitted: ${formatSubmittedAt()} IST`,
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone}`,
    `Business type: ${inquiry.businessType}`,
    `What they need: ${inquiry.whatYouNeed}`,
    `Timeline: ${inquiry.timeline ?? "Not specified"}`,
    "",
    "Notes:",
    inquiry.notes?.trim() || "No extra notes provided.",
  ].join("\n");
}

function buildAutoReplyText(inquiry: Inquiry): string {
  const firstName = inquiry.name.trim().split(/\s+/)[0] || inquiry.name;

  return [
    `Hi ${firstName},`,
    "",
    "Thanks for reaching out to Kivox. We received your project inquiry and will review it carefully before replying.",
    "You can expect a clear next step from us within 24 hours.",
    "",
    `What we received: ${inquiry.whatYouNeed} for ${inquiry.businessType}${inquiry.timeline ? `, ${inquiry.timeline.toLowerCase()}` : ""}.`,
    "",
    `Website: ${SITE_URL}`,
    `Work: ${SITE_URL}/work`,
    `FAQ: ${SITE_URL}/faq`,
    "",
    `You can reply directly to this email or reach us at ${brand.contact.email}.`,
    "",
    "Best regards,",
    "Kivox",
  ].join("\n");
}

function getDeliveryError(result: PromiseSettledResult<{ error: unknown }>): unknown {
  if (result.status === "rejected") return result.reason;
  return result.value.error;
}

export async function resendAdapter(inquiry: Inquiry) {
  const resend = new Resend(getRequiredServerEnv("RESEND_API_KEY"));
  const to = getRequiredServerEnv("INQUIRY_TO_EMAIL");
  const from = formatFromAddress(getRequiredServerEnv("INQUIRY_FROM_EMAIL"));

  const [adminResult, autoReplyResult] = await Promise.allSettled([
    resend.emails.send({
      from,
      to: [to],
      subject: `New Kivox inquiry: ${inquiry.whatYouNeed} from ${inquiry.name}`,
      html: buildAdminEmailHtml(inquiry),
      text: buildAdminText(inquiry),
      replyTo: inquiry.email,
    }),
    resend.emails.send({
      from,
      to: [inquiry.email],
      subject: `Thanks for contacting Kivox, ${inquiry.name}`,
      html: buildAutoReplyHtml(inquiry),
      text: buildAutoReplyText(inquiry),
      replyTo: to,
    }),
  ]);

  const adminError = getDeliveryError(adminResult);
  if (adminError) {
    console.error("Kivox inquiry admin email failed:", adminError);
    throw new Error("Failed to send inquiry notification");
  }

  const autoReplyError = getDeliveryError(autoReplyResult);
  if (autoReplyError) {
    console.warn("Kivox inquiry auto-reply failed:", autoReplyError);
  }
}
