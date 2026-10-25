```yaml
AUTONOMY: loop
API_BUDGET_INR: "{{API_BUDGET_INR}}"
```

`.build/STATE.json` is the resume file. Paid API spend stays at zero until a budget number is supplied. Every paid call, if any, goes in `docs/SPEND.md`. The loop stops only for a production deploy, DNS, a public post or send, paid spend, client data, a fifth failed audit of the same phase, or a destructive action outside this folder.

| Phase | Status | Round | Last audit | Updated |
|---|---|---|---|---|
| 0 Environment and capability inventory | PASSED | 2 | .build/phase-0/AUDIT-2.md | 2026-10-25 |
| 1 Strategy, positioning and offer | PASSED_WITH_PLACEHOLDERS | 1 | .build/phase-1/AUDIT-1.md | 2026-10-25 |
| 2 Brand and design system | NOT_STARTED | 0 | | |
| 3 Architecture | NOT_STARTED | 0 | | |
| 4 Information architecture and core pages | NOT_STARTED | 0 | | |
| 5 Signature experiences | NOT_STARTED | 0 | | |
| 6 Lead engine | NOT_STARTED | 0 | | |
| 7 Content, SEO and AI-answer visibility | NOT_STARTED | 0 | | |
| 8 Motion and launch assets | NOT_STARTED | 0 | | |
| 9 Hardening and QA | NOT_STARTED | 0 | | |
| 10 Launch | NOT_STARTED | 0 | | |
| 11 Operate and compound | NOT_STARTED | 0 | | |

Owner gates, when reached, pause for a decision pack: Phase 1 positioning and packages, Phase 2 design direction, Phase 3 ADR sign-off, Phase 8 launch-film cut.

Always stop, even if autonomy later changes: production deploy, DNS, any public post or send, paid spend, client names or screenshots, deleting bench or Frappe Cloud data, and any edit to another client's app.
