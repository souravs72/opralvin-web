# MASTER BUILD PROMPT — Opralvin Technologies Marketing Web App

Readers: every phase auditor and the resume loop. No API. No schema beyond `.build/STATE.json`. The user said: "Read PROMPT.md fully. Execute the AUTONOMOUS PHASE LOOP in §A from the first phase that is not marked PASSED in .build/STATE.json. Do not stop between phases. Stop only for the Hard Stops in §A.6."

## §A. AUTONOMOUS PHASE LOOP

Run end to end. Do not wait between phases. Advance only when an independent strict audit finds zero open issues. Stop only for the Hard Stops in §A.6.

### A.1 Cycle

1. PLAN. Write `.build/phase-N/PLAN.md` with scope, deliverables, the exit criteria from §A.4, and the files to create or change.
2. BUILD. Do the work fully. No stubs. No TODOs in code.
3. AUDIT. A fresh auditor that did not build the phase writes `.build/phase-N/AUDIT-<i>.md` with PASS or FAIL and a numbered issue list.
4. DECIDE. PASS with zero Critical, Major, and Minor issues goes to step 6. FAIL goes to step 5.
5. FIX. Fix every issue at the root. Log it in `.build/phase-N/FIXLOG.md`. Then a new auditor re-checks everything.
6. SEAL. Commit `phase N: passed audit i`, update `STATE.json`, write `SUMMARY.md`, tag `phase-N-passed`, then start the next phase.

### A.2 State

`.build/STATE.json` is the resume point. Status values: `NOT_STARTED`, `PLANNING`, `BUILDING`, `IN_AUDIT`, `FIXING`, `PASSED`, `PASSED_WITH_PLACEHOLDERS`, `BLOCKED`.

Never redo a sealed phase unless a later audit proves it broke.

### A.3 Auditor

The auditor is a new subagent. It does not see the builder's reasoning. It checks every exit criterion by running something and pasting evidence. Verdict is PASS only with zero Critical, zero Major, and zero Minor issues.

### A.4 Exit criteria

| Phase | Exit criteria |
|---|---|
| 0 | All 6 repos cloned; skills installed with no existing skill overwritten (show a diff of `~/.claude/skills` before and after); `docs/CAPABILITIES.md` lists at least 30 outcomes, each with a real file path the auditor opens and confirms; the Tally/Excel migration tooling claim is verified or marked absent; `TODO_FROM_OWNER.md` lists the client-specific apps found; STATE.json exists. |
| 1 | `STRATEGY.md` has all 6 sections; every competitor fact has a source link; at least 40 keywords with volume/difficulty from OpenSEO, or marked "unverified — no API key"; each objection has an answer that names a mechanism; no claim exceeds CAPABILITIES.md. |
| 2 | 3 directions rendered as HTML at 1440px and 360px; one chosen by a scored rubric in `docs/adr/0001-design-direction.md`; `tokens.json` validated; contrast AA in both themes proven by an automated check; Storybook builds; design review shows no slop findings. |
| 3 | ADRs for every architecture decision; the repo scaffold builds; the Frappe app `opralvin_site` installs and its tests pass; env vars in `.env.example`; no secret in the repo. |
| 4 | Every core page renders without console errors; every claim traces to CAPABILITIES.md; unique titles and metas; valid JSON-LD; no broken internal links; screenshots at 360/768/1440 in light and dark; banned-word lint passes. |
| 5 | Calculator, assessment, migration map, hero, and tour work; calculator formulas have unit tests; reduced motion works; home LCP < 2.0s, CLS < 0.05, TBT < 200ms on a mid-range mobile emulation; the 3D chunk is at most 250 KB gzipped and is not loaded on low-end or reduced-motion devices. |
| 6 | An end-to-end test submits the form and asserts a CRM Lead with UTM, consent, and score; Turnstile, rate limit, and honeypot reject bad requests; sandbox email and WhatsApp acknowledgement fire; no ERP credential reaches the browser. |
| 7 | At least 12 original launch pieces, linked internally; sitemap, robots, canonicals, `llms.txt`; no thin programmatic pages. |
| 8 | Launch film, 3 chart loops, 9:16 exports; ffprobe check passes; every number is real or labelled illustrative. |
| 9 | Hardening table green; full Playwright suite green twice in a row; security review has no open High findings. |
| 10 | Production build ready, `RUNBOOK.md`, `listings.csv` drafted, launch posts drafted, then Hard Stop before anything public. |

### A.5 Placeholders

Missing prices, SLAs, address, photos, and API keys do not stop the loop. Use `{{PLACEHOLDER}}` tokens, add `owner_todos`, and seal as `PASSED_WITH_PLACEHOLDERS`. An invented value is Critical. If a key is missing, test against a mock and mark the live check pending.

### A.6 Hard Stops

1. Production deploy, DNS, public posts, directory submission, or a message to a real person.
2. Spending money.
3. Client data or a client-specific app used as an example.
4. Five failed audit rounds, or the same issue ID returning after two fixes.
5. Destructive operations outside the project folder.

### A.7 and A.8

From Phase 3 on, the auditor runs the test suite and the build. Do not weaken a test to pass an audit. Commit and tag each seal.

## Brand

Company: Opralvin Technologies. Product: Opralvin One. Tagline: "Simplify Today. Grow Tomorrow." Founder: Sourav Singh. Market: India first, firms in the owner's ₹2 Cr to ₹200 Cr band. Primary call to action: "Book a free process audit".

Customer-facing pages do not name the underlying stack. One allowed public line, "Built on proven open-source foundations", belongs on the Security/Trust page only.

Honesty contract: no invented clients, logos, metrics, testimonials, awards, or prices. Testimonials, logos, case studies, and metrics are empty.

## Phase 0 and Phase 1 work already in the repo

`docs/CAPABILITIES.md` is the only source for a product promise. `docs/NOT_SUPPORTED.md` is the ban list. There is no Tally company reader. Keyword volumes stay unverified until a DataForSEO key exists. Do not spend money to fetch them.
