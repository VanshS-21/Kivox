import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { inquirySubmissionSchema } from "@/features/inquiry/inquiry.schema";
import { devLogAdapter } from "@/features/inquiry/adapters/devLogAdapter";
import { resendAdapter } from "@/features/inquiry/adapters/resendAdapter";
import { apiRateLimiter } from "@/lib/rate-limit";

const MIN_SUBMISSION_TIME_MS = 1500;
const START_COOKIE_NAME = "kivox_inquiry_started_at";

export async function POST(req: Request) {
  // 1. IP-based Rate Limiting (DDoS & Spam Protection)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "127.0.0.1";
  const rateLimitResult = apiRateLimiter.check(ip);

  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: "Too many requests, please try again later." },
      { 
        status: 429,
        headers: {
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": Math.ceil(rateLimitResult.resetAt / 1000).toString(),
          "Retry-After": Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000).toString(),
        }
      }
    );
  }

  const rateLimitHeaders = {
    "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
    "X-RateLimit-Reset": Math.ceil(rateLimitResult.resetAt / 1000).toString(),
  };

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400, headers: rateLimitHeaders });
  }

  const parsed = inquirySubmissionSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Check the form fields and try again." }, { status: 400, headers: rateLimitHeaders });
  }

  const { data, hp, startedAtMs } = parsed.data;

  if (hp && hp.trim().length > 0) {
    return NextResponse.json({ ok: true }, { headers: rateLimitHeaders });
  }

  const cookieStore = await cookies();
  const cookieStartedAt = Number(cookieStore.get(START_COOKIE_NAME)?.value);
  const start = typeof startedAtMs === "number" ? startedAtMs : Number.isFinite(cookieStartedAt) ? cookieStartedAt : undefined;

  if (typeof start === "number") {
    const dt = Date.now() - start;
    if (dt > 0 && dt < MIN_SUBMISSION_TIME_MS) return NextResponse.json({ ok: true }, { headers: rateLimitHeaders });
  }

  const hasResendKey = Boolean(process.env.RESEND_API_KEY);
  const hasResendRouting = Boolean(process.env.INQUIRY_TO_EMAIL) && Boolean(process.env.INQUIRY_FROM_EMAIL);

  try {
    if (hasResendKey && hasResendRouting) {
      await resendAdapter(data);
    } else {
      await devLogAdapter(data);
    }
  } catch (error) {
    console.error("Inquiry delivery failed:", error);
    return NextResponse.json({ error: "Unable to send right now. Please email instead." }, { status: 500, headers: rateLimitHeaders });
  }

  return NextResponse.json({ ok: true }, { headers: rateLimitHeaders });
}
