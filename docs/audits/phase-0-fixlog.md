# Phase 0 fix log

Round 1 audit: `docs/audits/phase-0-round-1.md`.

| Finding | Fix | How it was checked |
|---|---|---|
| P0-R1-F01 | Moved the unverified `ui-ux-pro-max` folders off the skill path and copied commit `d14efff8` from https://github.com/nextlevelbuilder/ui-ux-pro-max-skill. Recorded owner, stars, and commit in `docs/ENVIRONMENT.md`. | `gh api repos/nextlevelbuilder/ui-ux-pro-max-skill` on 2026-10-25 returned owner `nextlevelbuilder`, 140040 stars, MIT. `diff -rq` of the installed folder against the clone printed nothing. |
| P0-R1-F02 | Added `docs/ENVIRONMENT.md` with the six repo hashes, the skill table, and OpenSEO status N plus the fallback. | Hashes match `git rev-parse HEAD` for each repo. |
| P0-R1-F03 | Added a module index to `docs/CAPABILITIES.md` with a path for each module that had no row. | Each new path is a DocType JSON under that module. |
| P0-R1-F04 | Added trademark status, Cal.com link, DataForSEO key, and Frappe Cloud API credentials to `docs/TODO_FROM_OWNER.md`. | Those four items are in the still-missing section. |
| P0-R1-F05 | Cited `setup_wizard.py` lines 13–48 and 53–70, the slide lines in `public/js/setup_wizard.js`, and the India Compliance field lines. | Line numbers taken from those files on 2026-10-25. |
| P0-R1-F06 | Added a root `README.md` that says how to run `web/` and that the planned `apps/` and `packages/` layout is not built. | `README.md` is at the repo root. |
