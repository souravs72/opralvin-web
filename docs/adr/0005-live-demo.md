# ADR 0005 — Live demo on a separate site

Date: 2026-10-25
Status: accepted

## Context

The site must show real screens of Opralvin One, not drawings of imaginary software. Client sites on the local bench are off limits.

## Decision

The demo is a separate, rebranded company on a site the owner names, seeded with a fictional Indian trading firm, reset on a schedule, with a read-only guest. It is linked as “Explore a live demo” and gated by email so the visit is a lead.

Until the owner names that site, no demo URL is published. Nightly reset is not built in this phase.

## Consequences

Screens used later are recorded from that demo, not from `agency-billing.localhost` or any other named client site.
