import { mkdirSync, writeFileSync } from "node:fs";
import puppeteer from "puppeteer-core";

const origin = process.env.SCREENSHOT_ORIGIN || "http://127.0.0.1:3010";
const out = ".build/phase-5/evidence";
mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/google-chrome",
  args: ["--no-sandbox", "--disable-gpu"],
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: 360, height: 800, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
await page.emulateCPUThrottling(4);
await page.emulateNetworkConditions({
  offline: false,
  download: (1.6 * 1024 * 1024) / 8,
  upload: (750 * 1024) / 8,
  latency: 150,
});
await page.evaluateOnNewDocument(() => {
  window.__vitals = { lcp: 0, cls: 0, tbt: 0 };
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) window.__vitals.lcp = entry.startTime;
    }).observe({ type: "largest-contentful-paint", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__vitals.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const blocked = entry.duration - 50;
        if (blocked > 0) window.__vitals.tbt += blocked;
      }
    }).observe({ type: "longtask", buffered: true });
  } catch {
    /* observer types can be missing */
  }
});

await page.goto(`${origin}/`, { waitUntil: "networkidle0", timeout: 60000 });
await new Promise((r) => setTimeout(r, 2500));
const vitals = await page.evaluate(() => window.__vitals);

const reduced = await browser.newPage();
await reduced.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
await reduced.goto(`${origin}/`, { waitUntil: "networkidle0", timeout: 60000 });
const motion = await reduced.evaluate(() => {
  const hero = document.querySelector("[data-hero='challan']");
  const article = document.querySelector(".hero-challan");
  const cs = article ? getComputedStyle(article) : null;
  return {
    flag: hero?.getAttribute("data-motion") ?? "missing",
    animation: cs?.animationName ?? "none",
    tour: Boolean(document.querySelector("[data-tour='move']")),
  };
});

await browser.close();

const report = {
  origin,
  viewport: "360x800 mobile, 4x CPU, Slow 4G",
  lcp_ms: vitals.lcp,
  cls: vitals.cls,
  tbt_ms: vitals.tbt,
  lcp_ok: vitals.lcp > 0 && vitals.lcp < 2000,
  cls_ok: vitals.cls < 0.05,
  tbt_ok: vitals.tbt < 200,
  reduced_motion: motion,
  three_d: "not shipped",
};
writeFileSync(`${out}/webvitals.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (!report.lcp_ok || !report.cls_ok || !report.tbt_ok) process.exit(1);
