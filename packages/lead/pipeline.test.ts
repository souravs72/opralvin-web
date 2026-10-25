import assert from "node:assert/strict";
import { test } from "node:test";
import {
  PipelineError,
  memoryRateLimit,
  runLeadPipeline,
  sandboxSink,
  toCrmFields,
  type Adapters,
  type LeadPayload,
} from "./pipeline.ts";

const VALID: LeadPayload = {
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

function adapters(overrides: Partial<Adapters> = {}): { adapters: Adapters; store: unknown[]; sink: ReturnType<typeof sandboxSink> } {
  const store: unknown[] = [];
  const sink = sandboxSink();
  const limit = memoryRateLimit(60_000, 5);
  return {
    store,
    sink,
    adapters: {
      verifyTurnstile: async () => true,
      rateLimit: limit,
      insert: async (doctype, fields) => {
        store.push({ doctype, fields });
        return "CRM-LEAD-0001";
      },
      mail: sink.sendMail,
      whatsapp: sink.sendWhatsApp,
      ...overrides,
    },
  };
}

test("e2e: form payload becomes a CRM Lead with UTM, consent, and score, and sandbox ack fires", async () => {
  const { adapters: a, store, sink } = adapters();
  const result = await runLeadPipeline({ payload: VALID, ip: "203.0.113.10", adapters: a });
  assert.equal(result.name, "CRM-LEAD-0001");
  assert.equal(result.mail.sandbox, true);
  assert.equal(result.whatsapp.sandbox, true);
  const row = store[0] as { doctype: string; fields: ReturnType<typeof toCrmFields> };
  assert.equal(row.doctype, "CRM Lead");
  assert.equal(row.fields.custom_utm_source, "google");
  assert.equal(row.fields.custom_utm_medium, "cpc");
  assert.equal(row.fields.custom_utm_campaign, "audit");
  assert.equal(row.fields.custom_consent, true);
  assert.equal(row.fields.custom_assessment_score, 3);
  assert.equal(sink.mail[0].to, "asha@example.com");
  assert.equal(sink.whatsapp[0].phone, "+919876543210");
  assert.match(sink.mail[0].body, /process audit/);
});

test("honeypot rejects", async () => {
  assert.throws(
    () => toCrmFields({ ...VALID, company_website: "http://spam.example" }),
    (err: unknown) => err instanceof PipelineError && err.code === "honeypot",
  );
  const { adapters: a } = adapters();
  await assert.rejects(
    () => runLeadPipeline({ payload: { ...VALID, company_website: "http://spam.example" }, ip: "203.0.113.9", adapters: a }),
    (err: unknown) => err instanceof PipelineError && err.code === "honeypot",
  );
});

test("turnstile reject", async () => {
  const { adapters: a } = adapters({ verifyTurnstile: async () => false });
  await assert.rejects(
    () => runLeadPipeline({ payload: VALID, ip: "203.0.113.11", adapters: a }),
    (err: unknown) => err instanceof PipelineError && err.code === "turnstile",
  );
});

test("rate limit reject on the sixth request", async () => {
  const { adapters: a } = adapters();
  for (let i = 0; i < 5; i += 1) {
    await runLeadPipeline({ payload: VALID, ip: "203.0.113.12", adapters: a });
  }
  await assert.rejects(
    () => runLeadPipeline({ payload: VALID, ip: "203.0.113.12", adapters: a }),
    (err: unknown) => err instanceof PipelineError && err.code === "limited",
  );
});
