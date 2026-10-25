import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = ["apps/web/src", "packages/content"];
const banned = [
  "unlock",
  "elevate",
  "seamless",
  "supercharge",
  "revolutionise",
  "revolutionize",
  "empower",
  "cutting-edge",
  "next-gen",
  "game-changer",
  "in today's fast-paced world",
  "look no further",
  "take your business to the next level",
  "erpnext",
  "frappe",
  "sound familiar",
];

function files(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files(path, out);
    else if (/\.(tsx|ts|css|md)$/.test(name)) out.push(path);
  }
  return out;
}

const hits = [];
const titles = new Map();
for (const root of roots) {
  for (const path of files(root)) {
    const text = readFileSync(path, "utf8");
    const lower = text.toLowerCase();
    const words = path.includes("/api/") ? banned.filter((word) => word !== "frappe" && word !== "erpnext") : banned;
    for (const word of words) {
      if (lower.includes(word)) hits.push(`${path}: banned "${word}"`);
    }
    const copy = [
      ...text.matchAll(/>([^<>{}]+)</g),
      ...text.matchAll(/(?:title|description|h1|intro|scenario|text|label|q|a):\s*"([^"]+)"/g),
    ]
      .map((m) => m[1])
      .join(" ");
    if (copy.includes("!") && !path.endsWith(".css")) hits.push(`${path}: exclamation mark`);
  }
}

const site = readFileSync("packages/content/site.ts", "utf8");
const titleMatches = [...site.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
const descMatches = [...site.matchAll(/description:\s*"([^"]+)"/g)].map((m) => m[1]);
for (const title of titleMatches) {
  if (titles.has(title)) hits.push(`duplicate title: ${title}`);
  titles.set(title, 1);
}
const descs = new Map();
for (const desc of descMatches) {
  if (descs.has(desc)) hits.push(`duplicate description: ${desc}`);
  descs.set(desc, 1);
}

if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log(`banned-word lint passed. ${titleMatches.length} unique titles.`);
