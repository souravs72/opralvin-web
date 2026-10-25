import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../apps/web/.next/static", import.meta.url).pathname;
const needles = ["FRAPPE_API_SECRET", "FRAPPE_API_KEY", "token "];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, out);
    else if (/\.(js|css)$/.test(name)) out.push(path);
  }
  return out;
}

let files;
try {
  files = walk(root);
} catch {
  console.error("No client bundle. Run pnpm build first.");
  process.exit(1);
}

const hits = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const needle of needles) {
    if (text.includes(needle)) hits.push(`${file}: ${needle}`);
  }
}
if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log(`client bundle has no ERP credential strings (${files.length} files)`);
