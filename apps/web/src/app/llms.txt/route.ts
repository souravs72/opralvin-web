import { llmsTxt } from "@opralvin/content/launch";

export function GET() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return new Response(llmsTxt(site), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
