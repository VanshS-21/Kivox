import type { Inquiry } from "./inquiry.types";

export async function submitProjectInquiry(input: {
  data: Inquiry;
  hp?: string;
  startedAtMs?: number;
}): Promise<void> {
  const res = await fetch("/api/inquiry", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });

  if (res.ok) return;

  let message = "Something went wrong. Please try again.";
  try {
    const data = (await res.json()) as { error?: string };
    if (data?.error) message = data.error;
  } catch {}

  throw new Error(message);
}

