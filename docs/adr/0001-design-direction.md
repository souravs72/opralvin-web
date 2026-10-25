# ADR 0001 — Design direction

Date: 2026-10-25
Status: accepted

## Context

The site has to feel like a paper ledger becoming a live system, for an Indian owner who still runs on a register, spreadsheets, and a desktop accounts program. Three HTML studies were drawn at desktop and phone width. Scores run from 1 (poor) to 5 (strong). Implementation cost is scored high when the system is cheap to build without slop.

The brief asked for warm paper, a ledger-red rule, a posted colour, a serif or sharp grotesk, and tabular figures. A full cream page is the default a design review rejects, so the page ground is book cloth and the warm colour stays on the challan sheet. The red is a rule, not a terracotta accent on cards. Fraunces is on the overused-font list, so the display face is Source Serif 4.

## Options

| Direction | Fit to the ICP | Distinctiveness | Legibility | Implementation cost | §3 compliance | Total |
|---|---:|---:|---:|---:|---:|---:|
| Ledger to live | 5 | 4 | 5 | 4 | 4 | 22 |
| Dispatch manifest | 3 | 5 | 4 | 4 | 5 | 21 |
| Close of books | 3 | 4 | 4 | 4 | 4 | 19 |

Fit is whether the finance head, not the store clerk, recognises the fear in the first screen. Ledger speaks to the register and the desktop books. The manifest speaks to the lorry, which is real work but not the decision. The night close speaks to month-end, then hides the migration.

Distinctiveness of the ledger is 4, not 5, because paper and a serif are familiar. The challan sheet and the red rule are the specific parts. Compliance is 4 for the same reason: the paper ground is requested, and it must not grow into three icon cards or a gradient.

## Decision

Use Ledger to live. Tokens, Storybook, and later pages take `design/tokens.json`. The manifest and the close stay as rejected studies so the choice can be re-read.

## Consequences

Display is Source Serif 4, text is Source Sans 3, figures are IBM Plex Mono with tabular numbers. The page ground is book cloth, not a cream field. The warm sheet stays on the challan only. Both themes ship in the tokens. Motion later reads `motion/MOTION.md`. Prices stay as owner tokens. Illustrative sheets stay labelled.
