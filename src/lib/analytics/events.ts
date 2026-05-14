export const analyticsEvents = {
  ctaClicked: "cta_clicked",
  workClicked: "work_clicked",
  inquiryStarted: "inquiry_started",
  inquirySubmitted: "inquiry_submitted",
  inquiryFailed: "inquiry_failed",
} as const;

export type AnalyticsEvent =
  (typeof analyticsEvents)[keyof typeof analyticsEvents];

