import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const needles = ["webgl", "WebGL", "three.js", "from \"three", "from 'three", ".glb", ".gltf", "spline"];
const root = new URL("../apps/web/.next/static", import.meta.url).pathname;

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
let bytes = 0;
for (const file of files) {
  const text = readFileSync(file);
  bytes += text.length;
  const body = text.toString("utf8");
  for (const needle of needles) {
    if (body.includes(needle)) hits.push(`${file}: ${needle}`);
  }
}

if (hits.length) {
  console.error(hits.join("\n"));
  process.exit(1);
}
console.log(`3d chunk: 0 B gzipped (no WebGL/three/glb in ${files.length} client files, ${bytes} raw bytes scanned).`);
