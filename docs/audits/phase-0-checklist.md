# Phase 0 audit checklist

Written before the round-1 audit on 2026-10-25. This file is the checklist. It is not the audit result.

An item passes only with evidence the auditor produced: the command and its output, a file path plus line, or a URL with a retrieval date. A claim that the work is done, without that evidence, is a FAIL. Unverifiable is a MAJOR. The whole checklist is re-run on every round.

| Level | Meaning | Blocks the phase? |
|---|---|---|
| BLOCKER | Wrong, fabricated, insecure, broken, or a required deliverable missing | Yes |
| MAJOR | Incomplete, unverifiable, inconsistent with the master prompt, or below its quality bar | Yes |
| MINOR | Polish or a small gap that does not change a decision | No. Fix it if it takes under 10 minutes; otherwise log it in `docs/BACKLOG.md` |

Bench path for checks: `/home/ascra/Desktop/frappe-bench`. Website repo: `/home/ascra/Downloads/opralvin-web`. Recorded install path: `/home/ascra/src`.

## A1. Installs and repos

| # | Check | How to verify | Severity if it fails |
|---|---|---|---|
| 0.1 | All 6 repos are cloned under `~/src` (or the recorded path) at a recorded commit | `git -C <repo> rev-parse HEAD` for each one, recorded in `docs/ENVIRONMENT.md` | MAJOR |
| 0.2 | All 15 motion-graphics skills are installed, and no pre-existing skill was overwritten | Compare `ls ~/.claude/skills` with the repo's `skills/`, and diff any same-name folders against the repo copy. A mismatch means it was preserved, which is fine, but it must be recorded | MAJOR |
| 0.3 | All 12 OpenSEO skills are installed with the `openseo-` prefix, and each SKILL.md parses (has `name` and `description`) | A script over the frontmatter | MAJOR |
| 0.4 | Each required skill from the master prompt §4.1 is present, or is listed as missing with a reason. This specifically includes gstack, `ui-ux-pro-max`, `design-taste-frontend`, `frontend-design`, `vercel-react-best-practices`, `deploy-to-vercel` and `frappe-manager` | A table in `docs/ENVIRONMENT.md`: skill, present Y/N, source, version/commit | MAJOR |
| 0.5 | `ui-ux-pro-max` was installed only from a verified official source (repo URL, owner and star count recorded), or is marked "not installed — awaiting owner OK" | The recorded URL and a check of the installed folder | BLOCKER if installed from an unverified source |
| 0.6 | Paperclip and WanGP runtimes are not installed (reference clones only); no `npm install` or `pip install` was run for them | Check for `node_modules` or a venv in those repos and the shell history | MAJOR |
| 0.7 | OpenSEO access status is recorded: DataForSEO key present (Y/N), MCP reachable (Y/N). A missing key is fine, but it must be recorded along with the fallback plan | `docs/ENVIRONMENT.md` | MAJOR |
| 0.8 | No secrets are committed (API keys, Frappe API secret, `.env`) | `git log -p` grep for key patterns, plus `gitleaks` if it is available | BLOCKER |

## A2. Ground truth from the real ERP

| # | Check | How to verify | Severity if it fails |
|---|---|---|---|
| 0.9 | `docs/CAPABILITIES.md` exists and covers every module in `apps/erpnext/erpnext/modules.txt`, plus `india_compliance`, `hrms`, `crm`, `frappe_whatsapp`, `payments` and `insights` | Cross-check the list of modules against the rows | MAJOR |
| 0.10 | Every row marked Verified = Y cites a file path that exists and names a DocType or report that exists | A script that, for each row, checks the path exists and greps the DocType JSON or report folder. A 100% pass is required, not a sample | BLOCKER for any fabricated or broken reference |
| 0.11 | The version facts are correct: ERPNext version and commit, Frappe version, india_compliance version | Compare `__version__` and `git rev-parse` with what the doc says | MAJOR |
| 0.12 | The GST claims (e-invoice, e-way bill, GSTR-1/3B, GSTIN validation) are each traced to actual india_compliance DocTypes or reports, with the feature's settings flag noted. Any claim that depends on a paid or third-party API must say so | A grep of `apps/india_compliance` | BLOCKER if a claim is overstated |
| 0.13 | Migration claims: whether a Tally or Excel import path exists in this version is stated precisely (Data Import, opening tools, any Tally-specific utility found or not found), with paths | A grep for `tally` across the apps, plus Data Import DocType evidence | BLOCKER if it claims a Tally importer that does not exist |
| 0.14 | The setup-wizard steps are documented from `setup/setup_wizard/`, not from memory | Line references | MAJOR |
| 0.15 | Every "Demo-able = Y" row is reproducible on a fresh demo site and needs no client-specific app | Check that the DocType belongs to a standard app | MAJOR |
| 0.16 | Owner-language outcomes do not overstate the capability | An auditor reasoning note on each row | MAJOR |

## A3. Privacy and hygiene

| # | Check | How to verify | Severity if it fails |
|---|---|---|---|
| 0.17 | Client-specific apps on the bench (`ucl_chemist`, `unicom_chemist`, `ascra_logistics`, `vsd_fleet_ms`, `mcx_*`, `clapgrow_*`, `agency_billing`, `taxmate`, `huf`, `jarvis`) are listed in `TODO_FROM_OWNER.md` as off-limits pending approval | Read the file and compare with `ls apps` | BLOCKER if one is missing |
| 0.18 | No client names, code, data, screenshots or site configs are copied into the website repo | `grep -ri` for each client app name and for known client company names across the repo, excluding this checklist's own names where the checklist is the search list | BLOCKER |
| 0.19 | No customer-facing draft copy names ERPNext or Frappe | A grep on `apps/web` and `packages/content`, and on the existing `web/` tree if that is the current draft | MAJOR |
| 0.20 | The repo skeleton matches the master prompt §8, or the deviation is documented, and a README explains how to run each part | Tree listing | MINOR |
| 0.21 | `docs/TODO_FROM_OWNER.md` lists everything still unknown: prices, SLAs, address, domain/trademark status, founder photo, Cal.com link, WhatsApp number, DataForSEO key, Frappe Cloud API credentials | Read it | MAJOR |

## Pass rule

Phase 0 passes only when this whole checklist is PASS, with zero BLOCKER and zero MAJOR. MINOR items are fixed in the same round when they take under 10 minutes, or logged in `docs/BACKLOG.md`.
