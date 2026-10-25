export type LeadPayload = {
  name: string;
  phone: string;
  email: string;
  company: string;
  consent: true;
  company_website?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  landing_page?: string;
  segment?: string;
  assessment_score?: number;
  calculator_result?: unknown;
  turnstile_token?: string;
};

export type CrmFields = {
  lead_name: string;
  mobile_no: string;
  email_id: string;
  company_name: string;
  custom_utm_source: string;
  custom_utm_medium: string;
  custom_utm_campaign: string;
  custom_landing_page: string;
  custom_segment: string;
  custom_assessment_score: number | undefined;
  custom_calculator_result: unknown;
  custom_consent: true;
  custom_consent_purpose: string;
  source: string;
};

export class PipelineError extends Error {
  readonly code: "honeypot" | "turnstile" | "limited" | "consent" | "origin";
  constructor(code: "honeypot" | "turnstile" | "limited" | "consent" | "origin", message: string) {
    super(message);
    this.code = code;
  }
}

export type Adapters = {
  verifyTurnstile: (token: string | undefined) => Promise<boolean>;
  rateLimit: (ip: string) => Promise<"ok" | "limited">;
  insert: (doctype: string, fields: CrmFields) => Promise<string>;
  mail: (to: string, body: string) => Promise<{ id: string; sandbox: boolean }>;
  whatsapp: (phone: string, body: string) => Promise<{ id: string; sandbox: boolean }>;
};

export function toCrmFields(payload: LeadPayload): CrmFields {
  if (payload.company_website) throw new PipelineError("honeypot", "Rejected.");
  if (payload.consent !== true) throw new PipelineError("consent", "Consent is required.");
  return {
    lead_name: payload.name,
    mobile_no: payload.phone,
    email_id: payload.email,
    company_name: payload.company,
    custom_utm_source: payload.utm_source ?? "",
    custom_utm_medium: payload.utm_medium ?? "",
    custom_utm_campaign: payload.utm_campaign ?? "",
    custom_landing_page: payload.landing_page ?? "",
    custom_segment: payload.segment ?? "",
    custom_assessment_score: payload.assessment_score,
    custom_calculator_result: payload.calculator_result,
    custom_consent: true,
    custom_consent_purpose: "Contact about a process audit.",
    source: "Website",
  };
}

export async function runLeadPipeline(input: {
  payload: LeadPayload;
  ip: string;
  adapters: Adapters;
}): Promise<{ name: string; mail: { id: string; sandbox: boolean }; whatsapp: { id: string; sandbox: boolean } }> {
  const fields = toCrmFields(input.payload);
  const human = await input.adapters.verifyTurnstile(input.payload.turnstile_token);
  if (!human) throw new PipelineError("turnstile", "The form check did not pass.");
  const limit = await input.adapters.rateLimit(input.ip);
  if (limit === "limited") throw new PipelineError("limited", "Too many requests. Try later.");
  const name = await input.adapters.insert("CRM Lead", fields);
  const body = "We received your request for a free process audit. We will use these details only to call you about that audit.";
  const mail = await input.adapters.mail(fields.email_id, body);
  const whatsapp = await input.adapters.whatsapp(fields.mobile_no, body);
  return { name, mail, whatsapp };
}

export function memoryRateLimit(windowMs = 3_600_000, max = 5) {
  const hits = new Map<string, number[]>();
  return async (ip: string): Promise<"ok" | "limited"> => {
    const now = Date.now();
    const list = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    if (list.length >= max) return "limited";
    list.push(now);
    hits.set(ip, list);
    return "ok";
  };
}

export function sandboxSink() {
  const mail: { to: string; body: string; id: string }[] = [];
  const whatsapp: { phone: string; body: string; id: string }[] = [];
  return {
    mail,
    whatsapp,
    sendMail: async (to: string, body: string) => {
      const id = `sandbox-mail-${mail.length + 1}`;
      mail.push({ to, body, id });
      return { id, sandbox: true as const };
    },
    sendWhatsApp: async (phone: string, body: string) => {
      const id = `sandbox-wa-${whatsapp.length + 1}`;
      whatsapp.push({ phone, body, id });
      return { id, sandbox: true as const };
    },
  };
}
