# Phase 1 audit checklist

Written before the Phase 1 build on 2026-10-25. This is the checklist, not the result.

`docs/PHASE_STATE.md` marks Phase 1 as building. No phase-1 checklist existed. This file stores no records and calls no API. The runner says: "B4. Phase 1 audit checklist (write it to `docs/audits/phase-1-checklist.md` before building)".

An item passes only with evidence the auditor produced. The whole checklist is re-run every round. Strategy may promise only a `docs/CAPABILITIES.md` row with Verified = Y. Claims in `docs/NOT_SUPPORTED.md` must not appear as promises.

| # | Check | Severity if it fails |
|---|---|---|
| 1.1 | All 12 sections of `docs/STRATEGY.md` exist and are substantive. No "TBD" outside `{{}}` placeholders that are also listed in `docs/TODO_FROM_OWNER.md` | MAJOR |
| 1.2 | Every capability promised anywhere traces to a CAPABILITIES row with Verified = Y. The auditor checks every promise, not a sample | BLOCKER |
| 1.3 | Nothing in the banned-claims list or `docs/NOT_SUPPORTED.md` appears as a promise | BLOCKER |
| 1.4 | Every external fact has a working URL and a retrieval date. The auditor re-fetches at least 10 at random plus all prices and regulatory figures | BLOCKER for a wrong price or regulation; MAJOR for a missing source |
| 1.5 | No invented metrics, clients, testimonials, or search volumes. Assumptions are labelled as assumptions | BLOCKER |
| 1.6 | The ICP ranking is reproducible. The scores in `docs/strategy/icp-scoring.csv` match the doc, and the beachhead follows from the scores, or the override is justified | MAJOR |
| 1.7 | The competitor table is fair. Each competitor's real strengths are stated, and "when we are not the right choice" exists | MAJOR |
| 1.8 | Each package has scope in and out, a timeline, deliverables, client duties, acceptance criteria, exit and data-ownership terms, and its pricing logic | MAJOR |
| 1.9 | Every keyword cluster maps to a page in the planned information architecture, or a new page is proposed with a reason. No thin programmatic city pages | MAJOR |
| 1.10 | Funnel events are named consistently and can be implemented by a tracking plan | MINOR |
| 1.11 | Copy samples in `docs/strategy/BRIEF.md` contain zero banned words from the master prompt. The auditor greps the list | MAJOR |
| 1.12 | Customer-facing samples do not name ERPNext or Frappe | MAJOR |
| 1.13 | The same segment names, package names, and price placeholders are used in `STRATEGY.md`, the CSVs, and `BRIEF.md` | MAJOR |
| 1.14 | The auditor names the 3 weakest assumptions and checks whether the doc already says how they will be tested. If not, that is a MAJOR | MAJOR |
| 1.15 | Paid API spend is within `{{API_BUDGET_INR}}` and logged in `docs/SPEND.md`. No paid call is allowed while the budget number is unset | MAJOR |

## Required files

- `docs/STRATEGY.md` with the 12 sections named in the runner
- `docs/strategy/icp-scoring.csv`
- `docs/strategy/competitors.csv`
- `docs/strategy/keywords.csv`
- `docs/strategy/objections.md`
- `docs/strategy/BRIEF.md`

## Pass rule

Zero BLOCKER and zero MAJOR. MINOR items are fixed in the round if they take under 10 minutes, or logged in `docs/BACKLOG.md`.
