# ADR 0002 — Marketing front end on Next.js

Date: 2026-10-25
Status: accepted

## Context

The public site has to be fast on a phone, indexable, and able to hold one scroll-choreographed story. Frappe’s website module can serve pages. It is weaker for this level of motion and for metadata that changes per route.

## Decision

Ship the marketing site as Next.js, App Router, React Server Components, TypeScript `strict`, on Vercel. Tailwind reads `design/tokens.json`. Framer Motion covers UI motion. GSAP ScrollTrigger is allowed only where a scroll sequence needs it. React Three Fiber plus drei cover the single 3D hero and at most one other 3D moment.

The existing Vite prototype in `web/` stays as a study. It is not the production app. Production lives in `apps/web`.

## Consequences

`pnpm --filter @opralvin/web build` is the build that must stay green. ERP credentials never enter a client bundle. Public copy still does not name the stack.
