import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";

const root = new URL("..", import.meta.url);
const listed = execSync("git ls-files -co --exclude-standard", {
  cwd: root,
  encoding: "utf8",
})
  .trim()
  .split("\n")
  .filter(Boolean);

const secretRe = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /AKIA[0-9A-Z]{16}/,
  /sk_live_[0-9a-zA-Z]{20,}/,
  /ghp_[0-9A-Za-z]{36}/,
];

const assignedSecret = /^(FRAPPE_API_SECRET|FRAPPE_API_KEY|TURNSTILE_SECRET_KEY|RESEND_API_KEY|UPSTASH_REDIS_REST_TOKEN)\s*=\s*(.+)$/;

const hits = [];
for (const file of listed) {
  if (file.includes("node_modules/") || file.endsWith(".png") || file === "scripts/scan-secrets.mjs") continue;
  if (file === ".env.example") continue;
  if (file === ".env" || /(^|\/)\.env(\.|$)/.test(file)) {
    hits.push(`${file}: env file must not be committed`);
    continue;
  }
  let text;
  try {
    text = readFileSync(new URL(file, root), "utf8");
  } catch {
    continue;
  }
  for (const re of secretRe) {
    if (re.test(text)) hits.push(`${file}: matches ${re}`);
  }
  if (file === ".env.example") continue;
  for (const line of text.split("\n")) {
    const match = line.match(assignedSecret);
    if (!match) continue;
    const value = match[2].trim();
    if (value && !value.startsWith("{{")) hits.push(`${file}: ${match[1]} has a value`);
  }
}

if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log(`secret scan passed on ${listed.length} files`);
