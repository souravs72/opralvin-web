# Motion

Read this before animating. Colours match `design/tokens.json`. Reference frames were not supplied. Anything not listed here is ASK ME.

## Colour

Light ground `#e3e6e0` (the book cloth), ink `#1c1612`, ledger rule `#8e1e24`, posted `#0e5a3c`, sheet `#fffdf8`.
Dark ground `#161310`, ink `#f3ecdf`, rule `#f0b4b4`, posted `#9ed9b8`, sheet `#221e1a`.
The rule colour is a line or a short label. It is not a fill behind paragraphs.

## Type

Source Serif 4 for the display line, 56px on a wide screen and 34px on a phone, weight 560.
Source Sans 3 for sentences, 18px.
IBM Plex Mono for amounts, invoice numbers, and HSN codes, tabular figures. Rupees use Indian grouping, as in ₹12,34,567.

## Timing

A press settles in 120ms. A sheet settling into place takes 360ms with `cubic-bezier(0.16, 1, 0.3, 1)`. Nothing bounces. Nothing loops in order to look alive.

## How things move

The story is physical paper. A challan slides, flattens, and becomes one row in the books. It does not explode into particles. If the person prefers reduced motion, the same story is a still sheet and a posted stamp, with no travel.

## Texture

Ruled rows are real borders, one pixel, in the line colour. A stamp is a square outline in the posted colour with the word inside it. No glow, no blur used as light.

## Never

Do not fade type through a gradient.
Do not bounce or overshoot.
Do not pulse a dot beside the word posted.
Do not show a number as a result unless it is labelled illustrative or it is in the capability record.
Do not animate a fake customer logo.

## One example

Wide screen. A challan sits on the right, labelled illustrative. On the left, the sentence about one system. The red rule is a single horizontal line under that pair. Below it, four rows say what moves: the spreadsheet, the opening invoices, the opening stock, the chart of accounts. The stamp reads "Posted to stock" only on the illustrative challan.
