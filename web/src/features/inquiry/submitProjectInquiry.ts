import type { Inquiry } from "./inquiry.types";

export async function submitProjectInquiry(input: {
  data: Inquiry;
  hp?: string;
  startedAtMs?: number;
}): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  let res: Response;
  try {
    res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(input),
      signal: controller.signal,
    });
  } catch (e) {
    clearTimeout(timeout);
    if (e instanceof DOMException && e.name === "AbortError") {
      throw new Error("Request timed out. Please check your connection and try again.");
    }
    throw new Error("Network error. Please check your connection and try again.");
  } finally {
    clearTimeout(timeout);
  }

  if (res.ok) return;

  let message = "Something went wrong. Please try again.";
  try {
    const data = (await res.json()) as { error?: string };
    if (data?.error) message = data.error;
  } catch {}

  throw new Error(message);
}

