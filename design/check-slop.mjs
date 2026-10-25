import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const roots = [
  new URL("./directions/", import.meta.url).pathname,
  new URL("../packages/ui/src/", import.meta.url).pathname,
  new URL("../motion/", import.meta.url).pathname,
];

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
];

function files(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) files(path, out);
    else if (/\.(html|css|jsx|js|md)$/.test(name)) out.push(path);
  }
  return out;
}

const hits = [];
for (const root of roots) {
  for (const path of files(root)) {
    const text = readFileSync(path, "utf8");
    const lower = text.toLowerCase();
    for (const word of banned) {
      if (lower.includes(word)) hits.push(`${path}: banned "${word}"`);
    }
    const visible = text
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<[^>]+>/g, " ");
    if (/\.(html|md)$/.test(path) && visible.includes("!")) hits.push(`${path}: exclamation mark`);
    if (/background-clip:\s*text/.test(text)) hits.push(`${path}: gradient text`);
    if (/font-family:[^;]*(Inter|Roboto|Arial|Helvetica|Open Sans)/i.test(text)) {
      hits.push(`${path}: overused font stack`);
    }
    if (/linear-gradient\([^)]*(#[0-9a-f]{6}[^)]*){2,}/i.test(text) && /purple|indigo|cyan|#7c3aed|#6366f1|#22d3ee/i.test(text)) {
      hits.push(`${path}: purple or cyan gradient`);
    }
    if (/[\u{1F300}-\u{1FAFF}]/u.test(text)) hits.push(`${path}: emoji`);
  }
}
if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log("slop check passed");
