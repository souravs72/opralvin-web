# Phase 5 plan

Readers: the Phase 5 auditors. No API. User: Continue.

Phase 4 is sealed (`a3cdb74`, `phase-4-passed`). Phase 5 is calculator, assessment, migration map, hero, and tour. Dual auditors from Phase 4 onward.

## Scope

- Hero: the challan slides, flattens, and becomes one row (MOTION.md). 360ms `cubic-bezier(0.16, 1, 0.3, 1)`. No bounce. Reduced motion: still sheet and Posted stamp, no travel.
- Tour: the four rows that move (spreadsheet, opening invoices, opening stock, chart of accounts).
- Migration map: what a spreadsheet and an opening tool can hold. No desktop-company reader.
- Assessment: a short written quiz that produces a score for the audit call. Do not claim the product CRM stores the score (L44).
- Calculator: days × `{{DAY_RATE}}`. Unit tests on the formula. Do not invent a rupee amount. If the day rate is a token, the output stays a token.
- No 3D. MOTION.md is paper. The 250 KB 3D-chunk ceiling is met by not shipping a 3D chunk. Do not load extra motion on `prefers-reduced-motion` or a coarse pointer / low-end hint.
- Performance: home LCP < 2.0s, CLS < 0.05, TBT < 200ms on mid-range mobile emulation.

## Exit criteria (copied from §A.4)

1. Calculator, assessment, migration map, hero, and tour work.
2. Calculator formulas have unit tests.
3. Reduced motion works.
4. Home LCP < 2.0s, CLS < 0.05, TBT < 200ms on a mid-range mobile emulation.
5. The 3D chunk is at most 250 KB gzipped and is not loaded on low-end or reduced-motion devices.

## Files

`apps/web/src/components/motion/*`, calculator tests, `.build/phase-5/evidence/` traces.
