# Inquiry Intake (Draft)

## Goal

Collect enough information to route the inquiry and reply with a useful next step, without turning the form into a questionnaire.

## Required Fields

- Name
- Email
- Phone
- Business type (select)
- What you need (select)
- Primary goal (short text)

## Optional Fields

- Current website/app (URL)
- Timeline (select)
- Notes (textarea)

## Response Expectation (What We Say Publicly)

“We reply within 24 hours with next steps and a few clarifying questions.”

## Routing Rules (Internal)

- Route by “What you need”:
  - Website / Web app → build track
  - Redesign → audit + restructure track
  - SEO → SEO track
  - Brand identity → brand track
  - Backend-enabled system → systems track
  - Android app → mobile track

## Spam Controls (Baseline)

- Honeypot field
- Minimum submit time
- Server-side validation

