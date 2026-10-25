# ADR 0006 — Form protection

Date: 2026-10-25
Status: accepted

## Context

The audit form will be scraped. The ERP method must not be a public write.

## Decision

Every public form uses Cloudflare Turnstile. The Route Handler validates with Zod. Rate limiting is per IP and per email, on Vercel KV or Upstash Redis. A honeypot field is rejected server-side. The Frappe method allow-lists the marketing origin.

Turnstile and Redis keys stay as env names until the owner supplies values. Tests in this phase use a mock limiter.

## Consequences

A missing Turnstile key does not invent a site key in the page. The form stays behind a placeholder until Phase 6 wires the live keys.
