import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { inquirySubmissionSchema } from "@/features/inquiry/inquiry.schema";
import { devLogAdapter } from "@/features/inquiry/adapters/devLogAdapter";
import { resendAdapter } from "@/features/inquiry/adapters/resendAdapter";

const MIN_SUBMISSION_TIME_MS = 1500;
const START_COOKIE_NAME = "kivox_inquiry_started_at";

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = inquirySubmissionSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the form fields and try again." }, { status: 400 });
  }

  const { data, hp, startedAtMs } = parsed.data;

  if (hp && hp.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const cookieStore = await cookies();
  const cookieStartedAt = Number(cookieStore.get(START_COOKIE_NAME)?.value);
  const start = typeof startedAtMs === "number" ? startedAtMs : Number.isFinite(cookieStartedAt) ? cookieStartedAt : undefined;

  if (typeof start === "number") {
    const dt = Date.now() - start;
    if (dt > 0 && dt < MIN_SUBMISSION_TIME_MS) return NextResponse.json({ ok: true });
  }

  const hasResendKey = Boolean(process.env.RESEND_API_KEY);
  const hasResendRouting = Boolean(process.env.INQUIRY_TO_EMAIL) && Boolean(process.env.INQUIRY_FROM_EMAIL);

  try {
    if (hasResendKey && hasResendRouting) {
      await resendAdapter(data);
    } else {
      await devLogAdapter(data);
    }
  } catch {
    return NextResponse.json({ error: "Unable to send right now. Please email instead." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
