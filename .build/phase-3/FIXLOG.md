# Phase 3 fix log

Readers: the next auditor. No API. No schema. The user said: "Continue"

## P3-001

Cause: the 503 body named the server env vars, so a browser could see the stack name when lead storage was not configured.

Change: `apps/web/src/app/api/leads/route.ts` now returns a generic message. The missing-config detail is `console.error` on the server.

Verified: read the route; the JSON string no longer contains `FRAPPE_`.

## P3-002

Cause: the Next.js route posted a flat lead object. The Frappe method expects `origin`, `allow_list`, and `payload`. The allow-list was never sent.

Change: `handle_request` in `lead_contract.py` is the shared contract. `capture_lead` calls it. The route posts `{ origin, allow_list, payload }`. Tests cover a matching body and a foreign origin.

Verified: `python3 -m unittest discover -s apps/frappe-site/opralvin_site/tests -v` after the change.
