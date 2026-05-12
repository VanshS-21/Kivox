import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE_NAME = "kivox_inquiry_started_at";
const MAX_AGE_SECONDS = 60 * 30; // 30 minutes

export function proxy(req: NextRequest) {
  if (req.nextUrl.pathname !== "/contact") return NextResponse.next();

  if (req.cookies.get(COOKIE_NAME)) return NextResponse.next();

  const res = NextResponse.next();
  res.cookies.set(COOKIE_NAME, Date.now().toString(), {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_SECONDS,
  });
  return res;
}

export const config = {
  matcher: ["/contact"],
};

