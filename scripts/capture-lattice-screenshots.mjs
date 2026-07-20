import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, "../apps/lattice-prop");
const url = "https://lattice-prop-prototype.vercel.app/";

async function shot(page, name, opts = {}) {
  const file = path.join(outDir, name);
  await page.screenshot({ path: file, type: "png", ...opts });
  console.log("wrote", name);
}

const browser = await chromium.launch();
const page = await browser.newPage();

await page.addInitScript(() => {
  sessionStorage.setItem("latticeBtlUnlocked_v1", JSON.stringify(["mike"]));
});

await page.goto(url, { waitUntil: "networkidle", timeout: 90000 });
await page.waitForTimeout(2000);

await page.setViewportSize({ width: 1280, height: 900 });
await shot(page, "screen-marketing.png");

await page.locator('[data-marketing-page="login"]').first().click();
await page.waitForTimeout(800);
await page.locator('[data-login-user="mike"]').click();
await page.waitForTimeout(3500);

await page.waitForSelector("#panel-m8, .btl-subnav-btn", { timeout: 30000 });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(1200);

await shot(page, "screen-overview.png");

const nav = (label) =>
  page.locator(".btl-subnav-btn, [data-btl-view-nav]").filter({ hasText: new RegExp(label, "i") }).first();

if (await nav("Properties").count()) {
  await nav("Properties").click();
  await page.waitForTimeout(1500);
  await shot(page, "screen-properties.png");
}

if (await nav("Insights").count()) {
  await nav("Insights").click();
  await page.waitForTimeout(1500);
  await shot(page, "screen-insights.png");
}

await browser.close();
