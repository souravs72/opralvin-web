import { readFileSync } from "node:fs";

const required = ["Organization", "BreadcrumbList", "SoftwareApplication", "Service", "FAQPage"];
const files = ["apps/web/src/lib/jsonld.ts", "apps/web/src/components/Site.tsx"];
const blob = files.map((path) => readFileSync(path, "utf8")).join("\n");
const hits = [];
for (const type of required) {
  if (!blob.includes(`"@type": "${type}"`)) hits.push(`missing JSON-LD type ${type}`);
}
if (blob.toLowerCase().includes("erpnext") || blob.toLowerCase().includes("frappe")) {
  hits.push("JSON-LD builders name the stack");
}
if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log("jsonld builders include Organization, BreadcrumbList, SoftwareApplication, Service, FAQPage.");
