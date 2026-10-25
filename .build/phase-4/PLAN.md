# Phase 4 plan

Readers: the Phase 4 auditors. No API. No schema beyond page metadata. The user said: "Continue"

Phase 4 uses two auditors in parallel. Both must PASS.

## Scope

Every core page in the brief, statically generated where possible. No invented clients, prices, or metrics. Claims only from `docs/CAPABILITIES.md` with Verified = Y. Stack names stay off customer copy except the one allowed trust line on Security.

## Deliverables

Pages in `apps/web`: Home, Product, Solutions (one per module group), Industries (six), Migration, Pricing, How we work, Resources, About, Contact/Book audit, Security, Privacy, Terms, 404.

Each page: unique title and meta, one H1, heading order, Open Graph, JSON-LD as specified. Internal links checked. Screenshots at 360/768/1440 in light and dark under `.build/phase-4/evidence/`. Banned-word lint green.

## Exit criteria (copied from §A.4)

1. Every page exists and renders without console errors.
2. Every claim traces to CAPABILITIES.md.
3. Unique titles and metas.
4. Valid JSON-LD (validated).
5. No broken internal links.
6. Screenshots at 360/768/1440 in light and dark attached to the audit.
7. Banned-word lint passes.

## Files

`apps/web/src/app/**`, `packages/content/**`, lint script, evidence screenshots.
