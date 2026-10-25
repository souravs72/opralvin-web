import { productionAdapters } from "@/lib/adapters";
import { leadInput } from "@/lib/lead";
import { PipelineError, runLeadPipeline, type CrmFields } from "@opralvin/lead";
import { NextResponse } from "next/server";

const memoryLeads: { name: string; doctype: string; fields: CrmFields }[] = [];

async function frappeInsert(doctype: string, fields: CrmFields): Promise<string> {
  const secret = process.env.FRAPPE_API_SECRET;
  const key = process.env.FRAPPE_API_KEY;
  const url = process.env.FRAPPE_URL;
  if (!secret || !key || !url) {
    const name = `CRM-LEAD-${String(memoryLeads.length + 1).padStart(4, "0")}`;
    memoryLeads.push({ name, doctype, fields });
    console.info(JSON.stringify({ crm: "memory", name, sandbox: true }));
    return name;
  }
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const allowList = process.env.OPRALVIN_ALLOWED_ORIGINS ?? "";
  const response = await fetch(`${url}/api/method/opralvin_site.api.lead.capture_lead`, {
    method: "POST",
    headers: {
      Authorization: `token ${key}:${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      origin,
      allow_list: allowList,
      payload: {
        name: fields.lead_name,
        phone: fields.mobile_no,
        email: fields.email_id,
        company: fields.company_name,
        consent: true,
        utm_source: fields.custom_utm_source,
        utm_medium: fields.custom_utm_medium,
        utm_campaign: fields.custom_utm_campaign,
        landing_page: fields.custom_landing_page,
        segment: fields.custom_segment,
        assessment_score: fields.custom_assessment_score,
        calculator_result: fields.custom_calculator_result,
      },
    }),
  });
  if (!response.ok) throw new Error("storage-rejected");
  const result = (await response.json()) as { message?: { name?: string } };
  void doctype;
  return result.message?.name ?? "queued";
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Body must be JSON." }, { status: 400 });
  }

  const parsed = leadInput.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "The form did not pass checks." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "127.0.0.1";
  try {
    const result = await runLeadPipeline({
      payload: parsed.data,
      ip,
      adapters: productionAdapters(frappeInsert),
    });
    return NextResponse.json({ name: result.name, ack: { mail: result.mail, whatsapp: result.whatsapp } });
  } catch (err) {
    if (err instanceof PipelineError) {
      const status = err.code === "limited" ? 429 : err.code === "turnstile" ? 403 : 400;
      return NextResponse.json({ error: err.message }, { status });
    }
    if (err instanceof Error && err.message === "storage-unconfigured") {
      console.error("Lead storage is not configured. Server env is missing.");
      return NextResponse.json(
        { error: "Lead storage is not configured yet. The form cannot be stored until the owner supplies the server credentials." },
        { status: 503 },
      );
    }
    return NextResponse.json({ error: "The books did not accept the lead." }, { status: 502 });
  }
}
