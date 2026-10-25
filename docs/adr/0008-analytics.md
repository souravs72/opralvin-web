# ADR 0008 — Analytics and experiments

Date: 2026-10-25
Status: accepted

## Context

The north star is qualified audit bookings. The site needs events, not a cookie wall.

## Decision

Use Plausible, or PostHog in an EU or IN region, for pageviews and named events (calculator complete, assessment complete, WhatsApp start, audit submit). GrowthBook holds A/B tests on hero copy and the primary button, one test at a time.

No analytics key is committed. Event names live in `packages/content/events.ts`.

## Consequences

If neither product is configured, the site still builds. A missing key is not replaced with a fabricated domain.
