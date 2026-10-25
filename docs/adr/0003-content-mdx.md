# ADR 0003 — Content lives in the repo as MDX

Date: 2026-10-25
Status: accepted

## Context

Guides, industry pages, and the glossary have to be reviewable. A headless CMS is useful when non-developers publish every week. That is not true at launch.

## Decision

Keep launch content as MDX in `packages/content`. Structured lists (industries, modules, FAQs) are TypeScript or JSON next to the MDX. Revisit a CMS only if a non-developer must publish weekly.

## Consequences

Content changes go through the same review as code. There is no CMS credential in `.env.example`.
