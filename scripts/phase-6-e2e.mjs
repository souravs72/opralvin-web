import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { test } from "node:test";

const base = process.env.OPRALVIN_E2E_BASE ?? "http://127.0.0.1:3010";

const VALID = {
  name: "Asha",
  phone: "+919876543210",
  email: "asha@example.com",
  company: "Sample Traders",
  consent: true,
  utm_source: "google",
  utm_medium: "cpc",
  utm_campaign: "audit",
  landing_page: "/process-audit",
  assessment_score: 3,
};

async function post(body, ip) {
  const response = await fetch(`${base}/api/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
  const json = await response.json().catch(() => ({}));
  return { status: response.status, json };
}

test("http e2e: CRM Lead with UTM, consent, score, and sandbox ack", async () => {
  const { status, json } = await post(VALID, "203.0.113.40");
  assert.equal(status, 200);
  assert.match(json.name, /^CRM-LEAD-/);
  assert.equal(json.ack.mail.sandbox, true);
  assert.equal(json.ack.whatsapp.sandbox, true);
  await mkdir(".build/phase-6/evidence", { recursive: true });
  await writeFile(".build/phase-6/evidence/http-e2e.json", JSON.stringify({ status, json }, null, 2));
});

test("http: honeypot rejects", async () => {
  const { status } = await post({ ...VALID, company_website: "http://spam.example" }, "203.0.113.41");
  assert.equal(status, 400);
});

test("http: rate limit rejects the sixth request", async () => {
  const ip = `198.51.100.${(Date.now() % 250) + 1}`;
  for (let i = 0; i < 5; i += 1) {
    const { status } = await post(VALID, ip);
    assert.equal(status, 200);
  }
  const sixth = await post(VALID, ip);
  assert.equal(sixth.status, 429);
});
