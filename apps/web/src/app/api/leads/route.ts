import { leadInput } from "@/lib/lead";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const secret = process.env.FRAPPE_API_SECRET;
  const key = process.env.FRAPPE_API_KEY;
  const url = process.env.FRAPPE_URL;
  if (!secret || !key || !url) {
    console.error("Lead storage is not configured. Server env is missing.");
    return NextResponse.json(
      { error: "Lead storage is not configured yet. The form cannot be stored until the owner supplies the server credentials." },
      { status: 503 },
    );
  }

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

  const origin = request.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";
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
      payload: parsed.data,
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "The books did not accept the lead." }, { status: 502 });
  }
  const result = (await response.json()) as { message?: { name?: string } };
  return NextResponse.json({ name: result.message?.name ?? "queued" });
}
