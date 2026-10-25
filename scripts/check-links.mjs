import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const site = readFileSync("packages/content/site.ts", "utf8");
const launch = readFileSync("packages/content/launch.ts", "utf8");
const allowed = new Set(
  [...site.matchAll(/path:\s*"([^"]+)"/g), ...launch.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]),
);
allowed.add("/sitemap.xml");
allowed.add("/robots.txt");
allowed.add("/og");
allowed.add("/api/leads");
allowed.add("/llms.txt");
allowed.add("#main");

function files(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files(path, out);
    else if (/\.(tsx|ts)$/.test(name)) out.push(path);
  }
  return out;
}

const hits = [];
for (const path of files("apps/web/src")) {
  const text = readFileSync(path, "utf8");
  for (const match of text.matchAll(/href="(\/[^"]*)"/g)) {
    const href = match[1].split("?")[0];
    if (href.startsWith("/og")) continue;
    if (!allowed.has(href)) hits.push(`${path}: unknown href ${href}`);
  }
}

for (const match of launch.matchAll(/href:\s*"(\/[^"]*)"/g)) {
  if (!allowed.has(match[1])) hits.push(`launch.ts: unknown href ${match[1]}`);
}

if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log(`link check passed. ${allowed.size} known paths.`);
