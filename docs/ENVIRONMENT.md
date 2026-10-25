# Environment

Recorded 2026-10-25. Product behaviour is in `docs/CAPABILITIES.md`.

## Repos under `~/src`

Full hashes from `git rev-parse HEAD` on 2026-10-25.

| Repo | Commit | Runtime |
|---|---|---|
| motion-graphics-skills | `229022ebca76972e119e36ada23a1648d51665ab` | Skills copied. No extra runtime. |
| figcraft | `10702311f345393ee1d8868c3257679befcfa14d` | Reference clone only. |
| paperclip | `470cb34c0e42cb9d0b232d0bcf5d45cc7b0a81ca` | Clone only. No `node_modules`, no venv, no `paperclip` CLI on `PATH`. |
| WanGP | `9d25c601f3c7074ca03c50f41b307a7c517835f9` | Clone only. No `venv` and no `.venv`. |
| PlacesToPostYourStartup | `1941a95f344d90ea5ffe2e0b4c25ffa92dfd3d73` | Reference clone only. |
| open-seo | `0ca244b0dffef46820faa3fdcac21d7f9f76c088` | Skills copied. Server not started. |
| ui-ux-pro-max-skill | `d14efff8ed1faa4187f004f79926f428c8074ec7` | Official source for the skill below. |

## ui-ux-pro-max source

| Field | Value |
|---|---|
| Official repo | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| Owner | `nextlevelbuilder` |
| License | MIT |
| Stars | 140040, from `gh api repos/nextlevelbuilder/ui-ux-pro-max-skill` on 2026-10-25 |
| Commit installed | `d14efff8ed1faa4187f004f79926f428c8074ec7` (2026-10-23) |
| Installed path | `~/.claude/skills/ui-ux-pro-max` and `~/.cursor/skills/ui-ux-pro-max` |
| Check | `diff -rq` against `~/src/ui-ux-pro-max-skill/.claude/skills/ui-ux-pro-max` was empty after the copy |

The earlier folders were not git checkouts. They were moved to `~/.local/state/skill-quarantine/` as `ui-ux-pro-max-claude-unverified-20261025` and `ui-ux-pro-max-cursor-unverified-20261025`, then replaced by the official tree.

## OpenSEO access

| Check | Result |
|---|---|
| DataForSEO key in the environment | N. No `DATAFORSEO`, `OPENSEO`, or `DFS_` variable was set on 2026-10-25. |
| OpenSEO MCP reachable | N. No OpenSEO server was in the tool catalog for this session. |
| Paid calls so far | None. See `docs/SPEND.md`. |
| Fallback | Public pages of vendors and government sites, plus Google autocomplete and People Also Ask. Keyword volumes are marked `relative (no tool data)`. No paid call until `{{API_BUDGET_INR}}` is set. |

## Skills required by the master prompt

Present means the folder exists under `~/.claude/skills` on 2026-10-25. These copies are not git checkouts, except `ui-ux-pro-max` as recorded above.

| Skill | Present | Source |
|---|---|---|
| gstack, and autoplan, design-consultation, design-shotgun, design-html, design-review, browse, benchmark, canary, cso, check-pr, document-release, devex-review | Y | `~/.claude/skills/<name>` |
| frontend-design | Y | `~/.claude/skills/frontend-design` |
| design-taste-frontend | Y | `~/.claude/skills/design-taste-frontend` |
| ui-ux-pro-max | Y | Official repo above, commit `d14efff8` |
| web-design-guidelines | Y | `~/.claude/skills/web-design-guidelines` |
| brand-guidelines | Y | `~/.claude/skills/brand-guidelines` |
| vercel-react-best-practices | Y | `~/.claude/skills/vercel-react-best-practices` |
| deploy-to-vercel | Y | `~/.claude/skills/deploy-to-vercel` |
| frappe-manager | Y | `~/.claude/skills/frappe-manager` |
| doctype-development, web-forms, api-development, app-development, enterprise-patterns, desk-customization, testing | Y | `~/.claude/skills/<name>` |
| make-interfaces-feel-better | N | Not on disk. No verified copy was in the phase-0 install list. |
| emil-design-engineering | N | Same reason. |
| web-animation-design | N | Same reason. |
| modern-web-guidance | N | Same reason. |

Motion skills: 15 folders from `~/src/motion-graphics-skills/skills`, copied with `--update=none`. Round 1 found them identical to the repo.

OpenSEO skills: 12 folders named `openseo-*`, each with `name` and `description`. They do not replace unprefixed skills that were already installed.

## Bench

Native bench at `~/Desktop/frappe-bench`. Phase 0 read the code. No second site was created, and no site database was opened.
