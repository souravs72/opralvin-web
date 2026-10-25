# Phase 0 plan

Readers: the Phase 0 auditor and the resume loop. No API. The state schema is the JSON object in the master prompt §A.2. The user said: "Read PROMPT.md fully. Execute the AUTONOMOUS PHASE LOOP in §A from the first phase that is not marked PASSED in .build/STATE.json. Do not stop between phases. Stop only for the Hard Stops in §A.6."

Status: the environment work already exists in the repo. This plan records the exit criteria and the files the auditor must check. No client app is opened.

## Scope

Confirm the six reference repos, the skill install, the capability inventory, the migration finding, the client-app list, and `.build/STATE.json`.

## Deliverables

- `docs/CAPABILITIES.md`
- `docs/NOT_SUPPORTED.md`
- `docs/TODO_FROM_OWNER.md`
- `.build/STATE.json`
- `.build/phase-0/evidence/repos.txt`
- `.build/phase-0/evidence/skills-before.txt`
- `.build/phase-0/evidence/skills-copy-log.txt`
- `.build/phase-0/evidence/skills-after.txt`
- `.build/phase-0/evidence/skills-diff.txt`

## Files changed in this pass

- `.build/STATE.json` created
- `.build/phase-0/PLAN.md` created
- `.build/phase-0/evidence/*` created
- Skill copy re-run with `--update=none`. The diff is empty, so nothing already installed was overwritten.

## Exit criteria (copied from the master prompt §A.4)

All must be met:

1. All 6 repos cloned.
2. Skills installed with no existing skill overwritten (show a diff of `~/.claude/skills` before and after).
3. `docs/CAPABILITIES.md` lists at least 30 outcomes, each with a real file path the auditor opens and confirms.
4. The Tally/Excel migration tooling claim is verified or marked absent.
5. `docs/TODO_FROM_OWNER.md` lists the client-specific apps found.
6. `STATE.json` exists.

## How to check

- Repos: read `.build/phase-0/evidence/repos.txt` and confirm each directory under `~/src` is a git repo.
- Skills: the before snapshot, the copy log, and the after snapshot are three files with different timestamps. Compare inode and mtime. No inode change and no added directory means the copy did not overwrite an existing skill.
- Capabilities: open at least 30 of the `apps/...` paths on `~/Desktop/frappe-bench`. Do not open a site database.
- Migration: read the "Do not claim" row for a Tally import in `docs/CAPABILITIES.md`.
- Client apps: read the off-limits list in `docs/TODO_FROM_OWNER.md`. Do not use those names in customer copy.
