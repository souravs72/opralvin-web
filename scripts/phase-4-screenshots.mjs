import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import puppeteer from "puppeteer-core";

const origin = process.env.SCREENSHOT_ORIGIN || "http://127.0.0.1:3010";
const out = ".build/phase-4/evidence";
mkdirSync(out, { recursive: true });
const site = readFileSync("packages/content/site.ts", "utf8");
const paths = [...site.matchAll(/path:\s*"([^"]+)"/g)].map((m) => m[1]);
paths.push("/missing-page-for-404");

const widths = [360, 768, 1440];
const schemes = ["light", "dark"];

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-gpu"],
  headless: true,
});

for (const scheme of schemes) {
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }]);
    for (const path of paths) {
      const slug = path.startsWith("/missing") ? "404" : path === "/" ? "home" : path.replace(/^\//, "").replaceAll("/", "-");
      const file = `${out}/${scheme}-${width}-${slug}.png`;
      await page.goto(`${origin}${path}`, { waitUntil: "networkidle0", timeout: 30000 });
      await page.screenshot({ path: file, fullPage: true });
    }
    await page.close();
  }
}

await browser.close();
writeFileSync(
  `${out}/INDEX.md`,
  `Screenshots of ${paths.length} routes at ${widths.join("/")} in ${schemes.join(" and ")} using prefers-color-scheme emulation.\n`,
);
console.log(`wrote screenshots under ${out}`);
