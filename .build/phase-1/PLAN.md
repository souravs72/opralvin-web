# Phase 1 plan

Readers: the Phase 1 auditor. No API. No schema beyond the keyword columns. The user said: "Execute the AUTONOMOUS PHASE LOOP in §A from the first phase that is not marked PASSED in .build/STATE.json. Do not stop between phases. Stop only for the Hard Stops in §A.6."

## Scope

Bring the strategy pack up to the phase 1 exit criteria. Do not invent keyword volumes. Do not spend money. Do not start Phase 2.

## Deliverables

- `docs/STRATEGY.md` with these six sections present: ICP matrix, Competitive frame, Messaging house, Offer architecture, Keyword and question map, KPIs
- `docs/strategy/keywords.csv` with at least 40 keywords
- `docs/strategy/objections.md`
- `docs/strategy/competitors.csv`
- `docs/strategy/promise-ledger.md`
- `docs/CAPABILITIES.md` as the claim ceiling

## Exit criteria (copied from §A.4)

1. `STRATEGY.md` has all 6 sections.
2. Every competitor fact has a source link.
3. At least 40 keywords with volume and difficulty from OpenSEO, or marked `unverified — no API key`.
4. Each objection has an answer that names a mechanism.
5. No claim exceeds `docs/CAPABILITIES.md`.

## Files changed

- `docs/STRATEGY.md` section titles and the keyword paragraph
- `docs/strategy/keywords.csv` expanded to 40 rows, every volume and difficulty marked unverified
- `docs/strategy/objections.md` mechanism named on each reply
- `.build/STATE.json` current phase set to 1

Missing prices and the DataForSEO key stay as placeholders in `owner_todos`. A correctly marked placeholder is compliant. An invented volume is not.
