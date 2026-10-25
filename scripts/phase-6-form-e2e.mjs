import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { test } from "node:test";
import puppeteer from "puppeteer-core";

const base = process.env.OPRALVIN_E2E_BASE ?? "http://127.0.0.1:3010";

test("html form submit becomes a CRM Lead with UTM, consent, score, and sandbox ack", async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
    headless: true,
  });
  try {
    const page = await browser.newPage();
    await page.goto(`${base}/process-audit?utm_source=google&utm_medium=cpc&utm_campaign=audit`, {
      waitUntil: "networkidle0",
    });
    await page.evaluate(() => sessionStorage.setItem("opralvin_assessment_score", "3"));
    await page.type('input[name="name"]', "Asha");
    await page.type('input[name="phone"]', "+919876543210");
    await page.type('input[name="email"]', "asha@example.com");
    await page.type('input[name="company"]', "Sample Traders");
    await page.click('input[name="consent"]');
    const [response] = await Promise.all([
      page.waitForResponse((r) => r.url().includes("/api/leads") && r.request().method() === "POST"),
      page.click('button[type="submit"]'),
    ]);
    const json = await response.json();
    const posted = JSON.parse(response.request().postData() ?? "{}");
    assert.equal(response.status(), 200);
    assert.match(json.name, /^CRM-LEAD-/);
    assert.equal(json.ack.mail.sandbox, true);
    assert.equal(json.ack.whatsapp.sandbox, true);
    assert.equal(posted.utm_source, "google");
    assert.equal(posted.utm_medium, "cpc");
    assert.equal(posted.utm_campaign, "audit");
    assert.equal(posted.consent, true);
    assert.equal(posted.assessment_score, 3);
    const statusText = await page.$eval("[role=status]", (el) => el.textContent);
    assert.match(statusText ?? "", /Stored/);
    await mkdir(".build/phase-6/evidence", { recursive: true });
    await writeFile(
      ".build/phase-6/evidence/form-e2e.json",
      JSON.stringify({ status: response.status(), json, posted, statusText }, null, 2),
    );
  } finally {
    await browser.close();
  }
});
