# ADR 0009 — Options considered and rejected

Date: 2026-10-25
Status: accepted

## Context

Section 8 asked that two options be recorded as considered and rejected, with a path back if the owner later prefers a pure-Frappe site.

## Decision

1. Building the marketing site inside Frappe’s website module is rejected for launch. Weaker motion, weaker per-route metadata, weaker Vercel-edge caching. Migration path: replace `apps/web` with `www/` pages and Web Templates in `opralvin_site`, keep the same lead method, and point DNS at the Frappe site. The lead contract does not change.

2. FigCraft is rejected. It is early alpha. There is no handoff advantage over the HTML studies already in `design/directions`.

Paperclip and WanGP stay cloned for reference and are not run in this phase.

## Consequences

A later owner decision can take the Frappe website path without rewriting the lead API.
