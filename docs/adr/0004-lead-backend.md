# ADR 0004 — Lead path through our own Frappe app

Date: 2026-10-25
Status: accepted

## Context

Leads have to land in the same CRM the firm will sell. The browser must never hold an ERP key.

## Decision

A custom Frappe app `opralvin_site` lives in `apps/frappe-site`. The website posts to a Next.js Route Handler. That handler calls a whitelisted method on the app, using `FRAPPE_API_KEY` and `FRAPPE_API_SECRET` held only in server env. A CRM Lead is created with source, UTM, segment, assessment score, calculator result, and consent.

Email acknowledgement uses Resend or a Frappe email account. WhatsApp acknowledgement uses the WhatsApp app already on the product bench, with opt-in stored. Booking uses Cal.com, or the owner’s `{{BOOKING_LINK}}` until that exists.

A live install needs a non-client site and Frappe Cloud credentials. Those are owner todos. Until they exist, the app is tested against a mock in this repo. Pointing it at a named client site is forbidden.

## Consequences

Phase 6 can add the Playwright path once a staging site exists. The method is allow-listed and permission-checked. CORS allow-lists the marketing origin only.
