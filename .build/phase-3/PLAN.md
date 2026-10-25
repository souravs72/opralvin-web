# Phase 3 plan

Readers: the phase 3 auditor. No API. No schema beyond the ADRs and `.env.example`. The user said: "Execute the AUTONOMOUS PHASE LOOP in §A from the first phase that is not marked PASSED in .build/STATE.json. Do not stop between phases. Stop only for the Hard Stops in §A.6."

## Scope

Record the architecture decisions and scaffold the repo so it builds. Do not deploy. Do not install onto an existing bench site. Those sites are not ours to open. The Frappe app is built and tested here. A live site install stays an owner todo until a non-client site is named.

## Deliverables

- ADRs in `docs/adr/` for the front end, content, lead path, protection, compliance, analytics, and the two rejected options
- `apps/web` Next.js app that `pnpm build` builds
- `apps/frappe-site` the `opralvin_site` app, with tests that pass without a bench site
- `.env.example` listing every env var, with no real secret
- a secret scan (`gitleaks` if present, otherwise an equivalent pattern scan) with a clean result

## Exit criteria (copied from §A.4)

1. ADRs for every decision in section 8.
2. The repo scaffold builds (`pnpm build` green).
3. The Frappe app `opralvin_site` installs on a local or staging site and its tests pass. If no safe site exists, the app and its tests still pass against a mock, and the live install is an owner todo. A correctly marked pending install is compliant. Pointing the app at a client site is not.
4. Env vars documented in `.env.example`.
5. No secret in the repo (gitleaks or an equivalent).

## Files to create

`docs/adr/0002` through the decision set, `apps/web`, `apps/frappe-site`, `pnpm-workspace.yaml`, root `package.json`, `.env.example`, and the secret scan script.
