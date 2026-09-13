/**
 * Record official ESCO occupation search for the V2 explainer.
 * Open: Classification → Occupations
 * https://esco.ec.europa.eu/en/classification/occupation_main
 * Type warehouse supervisor → pick warehouse manager.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "out", "esco-record");
mkdirSync(outDir, { recursive: true });

const START =
  "https://esco.ec.europa.eu/en/classification/occupation_main";
const PROFILE =
  "https://esco.ec.europa.eu/en/classification/occupation?uri=http://data.europa.eu/esco/occupation/2f5de1ab-eddf-4715-8193-e994912c22ea";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function dismissCookies(page) {
  for (const name of [
    "Accept only essential cookies",
    "Accept all cookies",
    "Close this message",
  ]) {
    const loc = page.getByText(name, { exact: false }).first();
    if (await loc.count()) {
      try {
        await loc.click({ timeout: 1200 });
        await sleep(400);
      } catch {
        /* ignore */
      }
    }
  }
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  recordVideo: { dir: outDir, size: { width: 1440, height: 900 } },
  locale: "en-GB",
});
const page = await context.newPage();

await page.goto(START, { waitUntil: "networkidle", timeout: 90000 });
await sleep(1500);
await dismissCookies(page);
await sleep(600);

const search = page.getByRole("textbox", { name: /search occupations/i }).first();
await search.waitFor({ timeout: 15000 });
await search.click();
await sleep(500);
await search.fill("");
await search.pressSequentially("warehouse supervisor", { delay: 85 });
await sleep(400);

const item = page.locator("ul.ui-autocomplete .ui-menu-item-wrapper").filter({
  hasText: /^warehouse manager$/i,
});
try {
  await item.first().waitFor({ state: "visible", timeout: 6000 });
  await sleep(900);
  await item.first().click();
} catch {
  await page.goto(PROFILE, { waitUntil: "domcontentloaded", timeout: 60000 });
}

await page.waitForURL(/occupation\?uri=/, { timeout: 12000 }).catch(() => {});
await page.waitForLoadState("domcontentloaded");
await sleep(2000);
await dismissCookies(page);

await page.evaluate(() => {
  const heading = document.querySelector("h1, .ecl-page-header, [class*='concept']");
  if (heading) heading.scrollIntoView({ block: "start" });
});
await sleep(1200);
await page.evaluate(() => window.scrollBy({ top: 240, behavior: "smooth" }));
await sleep(1600);
await page.evaluate(() => window.scrollBy({ top: 260, behavior: "smooth" }));
await sleep(1800);

const stillPath = join(root, "public", "recordings", "stills", "esco-search.png");
mkdirSync(dirname(stillPath), { recursive: true });
await page.screenshot({ path: stillPath, type: "png" });

const video = page.video();
await context.close();
await browser.close();
console.log("VIDEO", video ? await video.path() : null);
console.log("STILL", stillPath);
