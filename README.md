# Opralvin

Marketing site for Opralvin Technologies. Phase 0 is the capability inventory. Later phases add the public site.

## What is here

| Path | What it is |
|---|---|
| `docs/CAPABILITIES.md` | What the product code actually does. Public copy may only claim a row marked Verified Y. |
| `docs/NOT_SUPPORTED.md` | Claims that must not be made. |
| `docs/TODO_FROM_OWNER.md` | Facts only the owner can supply. |
| `docs/ENVIRONMENT.md` | Cloned repos, skills, and whether paid SEO tools are available. |
| `docs/PHASE_STATE.md` | Which phase is in progress. |
| `web/` | An earlier Vite prototype. It is not the Next.js app described in the plan. |

## How to run the prototype

```bash
cd web
npm install
npm run dev
```

The dev server is Vite, usually at http://localhost:5173. `npm run build` writes `web/dist`.

## How this differs from the planned layout

The plan describes `apps/web` (Next.js), `apps/frappe-site`, `packages/ui`, `packages/content`, and `motion`. None of those directories exist yet. They are later phases. Until they do, the only runnable site is `web/`.

Do not treat client apps on the bench as examples. The off-limits list is in `docs/TODO_FROM_OWNER.md`.
