# Readiness Gates (Design)

## Goal

Allow the team to begin building the Kivox website without being blocked on final public contact/identity details, while still keeping a clear “no placeholders at launch” standard.

## Decision

Split readiness into two explicit gates:

1) **Ready to Build**
   - Allows scaffolding and implementation to begin.
   - Allows placeholder values for public contact/identity inputs (email, phone, legal entity/address, socials) during development.

2) **Ready to Launch**
   - Required before publishing the site publicly.
   - Requires real (non-placeholder) public contact/identity inputs.

## Source of Truth

The gate checklists live in [DEFINITION_OF_READY.md](file:///f:/Kivox/docs/current/DEFINITION_OF_READY.md).

## Implications for Implementation

- The site can be scaffolded and built now.
- Any placeholder public contact/identity values must be centralized in content/config so they can be replaced quickly.
- The build should not assume that placeholders are acceptable for launch; “Ready to Launch” is a separate go-live gate.
