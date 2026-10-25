# Phase 2 plan

Readers: the Phase 2 auditor. No API. Schema: `design/tokens.schema.json`. The user said: "Execute the AUTONOMOUS PHASE LOOP in §A from the first phase that is not marked PASSED in .build/STATE.json. Do not stop between phases. Stop only for the Hard Stops in §A.6."

## Scope

Three different visual directions, one chosen by a scored rubric, then the design system for that choice. No prices, no client names, no invented metrics. The interactive gstack interviews stop for a person; this loop does not, so the consultation answers are taken from `PROMPT.md` and written into `motion/brand.md`. Missing reference frames stay an owner todo.

## Deliverables

- `design/directions/ledger/index.html`
- `design/directions/manifest/index.html`
- `design/directions/close/index.html`
- `docs/adr/0001-design-direction.md`
- `design/tokens.json` and `design/tokens.schema.json`
- `design/check-contrast.mjs`
- `motion/brand.md` and `motion/MOTION.md`
- `design/INVENTORY.md`
- `packages/ui` Storybook

## Exit criteria (copied from §A.4)

1. 3 directions rendered as HTML at 1440px and 360px.
2. One direction chosen with a scored rubric (fit to the ICP, distinctiveness, legibility, implementation cost, §3 compliance; scored 1–5) recorded in `docs/adr/0001-design-direction.md`.
3. `tokens.json` validated.
4. Contrast AA in both themes proven by an automated check.
5. Storybook builds.
6. `/design-review` shows no slop findings.

Screenshots for criterion 1 go in `.build/phase-2/evidence/`. The slop check is `design/check-slop.mjs` plus a written review in `.build/phase-2/design-review.md`.

## Files changed

The deliverables above, `packages/ui/**`, `CLAUDE.md` (read `MOTION.md` before animating), and `.build/STATE.json`.
