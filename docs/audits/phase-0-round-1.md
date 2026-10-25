# Phase 0 audit round 1

Recorded from the independent auditor on 2026-10-25. The findings were not softened.

Auditor: independent and read-only. The default auditor slot failed to start. This round ran on Claude Opus 4.8.

## 1. Verdict

**FAIL** — BLOCKER: 1 · MAJOR: 6 · MINOR: 1

The capability inventory is largely verifiable. It fails because `docs/ENVIRONMENT.md` does not exist, and because `ui-ux-pro-max` is installed from an unverifiable source.

```
$ ls docs/ENVIRONMENT.md
ls: cannot access '.../ENVIRONMENT.md': No such file or directory
```

## 2. Item table

| # | Result | Severity | Evidence pointer |
|---|---|---|---|
| 0.1 | FAIL | MAJOR | Six repos cloned, but the commits are not in `docs/ENVIRONMENT.md` |
| 0.2 | PASS | | `diff -rq` of all 15 motion skills was identical |
| 0.3 | PASS | | 12 `openseo-*` skills, each with `name` and `description` |
| 0.4 | FAIL | MAJOR | Skill table required in `docs/ENVIRONMENT.md`, which is absent |
| 0.5 | FAIL | BLOCKER | Installed `ui-ux-pro-max` has no `.git` and no recorded source |
| 0.6 | PASS | | No `node_modules` or venv in paperclip or WanGP |
| 0.7 | FAIL | MAJOR | DataForSEO key and MCP status not recorded |
| 0.8 | PASS | | No commits yet, no `.env`, secret grep empty |
| 0.9 | FAIL | MAJOR | Utilities, Maintenance, Quality Management, Communication, Telephony, Bulk Transaction have no row |
| 0.10 | PASS | | 73/73 Verified=Y path tokens exist |
| 0.11 | PASS | | Versions match `__version__` and `git rev-parse` |
| 0.12 | PASS | | GST functions located; portal actions marked Demo-able N |
| 0.13 | PASS | | Doc says there is no Tally importer, and none was found |
| 0.14 | FAIL | MAJOR | Setup-wizard steps have no line references |
| 0.15 | PASS | | Demo-able Y rows point at standard apps |
| 0.16 | PASS | | No overstatement rising to BLOCKER |
| 0.17 | PASS | | Client apps are on the off-limits list |
| 0.18 | PASS | | No client code or site config in the website repo |
| 0.19 | PASS | | No ERPNext or Frappe in `web/` |
| 0.20 | FAIL | MINOR | No root README and no layout-deviation note |
| 0.21 | FAIL | MAJOR | TODO omits trademark, Cal.com, DataForSEO, and Frappe Cloud credentials |

## 3. Findings

### P0-R1-F01 · 0.5 · BLOCKER

`~/.claude/skills/ui-ux-pro-max` exists, has no `.git`, and no file records a repo URL, owner, or star count. The auditor compared it with https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (retrieved 2026-10-25, owner `nextlevelbuilder`) and treated a similar description as not enough.

Smallest fix: reinstall from that repo and record URL, owner, stars, and commit, or quarantine the copy and mark it awaiting owner OK.

### P0-R1-F02 · 0.1 / 0.4 / 0.7 · MAJOR

Create `docs/ENVIRONMENT.md` with the six commits, the skill table, and OpenSEO access plus a fallback. Auditor-confirmed short hashes:

```
motion-graphics-skills 229022e
figcraft 1070231
paperclip 470cb34
WanGP 9d25c60
PlacesToPostYourStartup 1941a95
open-seo 0ca244b
```

### P0-R1-F03 · 0.9 · MAJOR

Add a row or an explicit note for Utilities, Maintenance, Quality Management, Communication, Telephony, and Bulk Transaction.

### P0-R1-F04 · 0.21 · MAJOR

Add trademark status, Cal.com link, DataForSEO key, and Frappe Cloud API credentials to `docs/TODO_FROM_OWNER.md`.

### P0-R1-F05 · 0.14 · MAJOR

Add file and line anchors for the setup wizard. The auditor said the prose matches the files and the missing piece is the line reference.

### P0-R1-F06 · 0.20 · MINOR

Add a root README that explains how to run `web/` and that the planned `apps/` and `packages/` layout is not built.

## 4. Unscored notes

The Tally sentence says "the only hits". A grep also hits a bundled banking asset and `node_modules`. Those are not importers. GSTR-3B portal filing stays Verified N. Statutory payroll stays hedged.

## 5. Limits of the audit

Shell history was empty, so the Paperclip and WanGP check used missing `node_modules` and venv, not history. `PROMPT.md` is not in the repo. The bench was not launched. The auditor did not read the GitHub star count from the API.
