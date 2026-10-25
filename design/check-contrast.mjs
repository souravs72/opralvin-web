import { readFileSync } from "node:fs";

const tokens = JSON.parse(readFileSync(new URL("./tokens.json", import.meta.url), "utf8"));

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function ratio(a, b) {
  const hi = Math.max(luminance(a), luminance(b));
  const lo = Math.min(luminance(a), luminance(b));
  return (hi + 0.05) / (lo + 0.05);
}

let failed = 0;
for (const pair of tokens.contrastPairs) {
  const fg = tokens.color[pair.theme][pair.fg];
  const bg = tokens.color[pair.theme][pair.bg];
  const value = ratio(fg, bg);
  const ok = value + 1e-9 >= pair.min;
  if (!ok) failed += 1;
  console.log(
    `${ok ? "PASS" : "FAIL"} ${pair.theme} ${pair.role}: ${fg} on ${bg} = ${value.toFixed(2)} (min ${pair.min})`,
  );
}
if (failed) {
  console.error(`${failed} pair(s) below AA`);
  process.exit(1);
}
console.log(`AA contrast passed for ${tokens.contrastPairs.length} pairs`);
