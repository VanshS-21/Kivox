import type { Inquiry } from "../inquiry.types";

export async function devLogAdapter(inquiry: Inquiry) {
  const safe = {
    businessType: inquiry.businessType,
    whatYouNeed: inquiry.whatYouNeed,
    primaryGoal: inquiry.primaryGoal,
    hasCurrentUrl: Boolean(inquiry.currentUrl),
    hasTimeline: Boolean(inquiry.timeline),
    hasNotes: Boolean(inquiry.notes),
  };

  process.stdout.write(`Inquiry received (dev): ${JSON.stringify(safe)}\n`);
}

