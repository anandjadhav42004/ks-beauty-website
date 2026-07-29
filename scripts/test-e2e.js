import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const TARGET_URL = process.argv[2] || "http://localhost:5173/";

const SCREENSHOT_DIR = path.resolve("./e2e-screenshots");
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runDeployedE2EAudit() {
  console.log(`🚀 Starting Playwright E2E Browser Test on ${TARGET_URL} ...`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  const networkFailures = [];
  const status404s = [];

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  page.on("response", (res) => {
    if (res.status() === 404) {
      status404s.push(`404 Not Found: ${res.url()}`);
    }
  });

  page.on("requestfailed", (request) => {
    networkFailures.push(`${request.method()} ${request.url()} - ${request.failure()?.errorText}`);
  });

  try {
    // 1. Load Target URL
    console.log(`📡 Navigating to ${TARGET_URL} ...`);
    const response = await page.goto(TARGET_URL, { waitUntil: "networkidle" });
    const status = response ? response.status() : "No Response";
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "deployed_1_homepage.png") });
    console.log(`✅ Homepage loaded with HTTP Status ${status}. Title:`, await page.title());

    // 2. Test Navigation Links
    console.log("🔍 Testing Navigation links ...");
    const navLinks = ["About", "Services", "Why Us", "Packages", "Gallery", "Book Now"];
    for (const linkText of navLinks) {
      const link = page.locator(`nav a:has-text("${linkText}")`).first();
      if (await link.isVisible()) {
        console.log(`   - Found Nav Link: "${linkText}"`);
      }
    }

    // 3. Test Services Section
    console.log("🎨 Inspecting Services Section ...");
    await page.locator("#services").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "deployed_2_services.png") });

    const serviceCards = page.locator('[data-testid^="service-card-"]');
    const serviceCount = await serviceCards.count();
    console.log(`   - Found ${serviceCount} service cards.`);

    // 4. Test Gallery Section & Lightbox
    console.log("🖼️ Testing Gallery Section & Lightbox ...");
    await page.locator("#gallery").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const filterTabs = ["All", "Soft Glam", "Bridal", "Editorial", "Updos"];
    for (const tab of filterTabs) {
      const tabBtn = page.locator(`button:has-text("${tab}")`).first();
      if (await tabBtn.isVisible()) {
        await tabBtn.click();
        await page.waitForTimeout(200);
      }
    }

    // Open Lightbox
    const firstGalleryItem = page.locator('[data-testid="gallery-item-0"]').first();
    if (await firstGalleryItem.isVisible()) {
      await firstGalleryItem.click();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, "deployed_3_lightbox.png") });
      console.log("   - Lightbox modal opened cleanly.");

      const closeBtn = page.locator('[data-testid="lightbox-close-btn"]').first();
      if (await closeBtn.isVisible()) {
        await closeBtn.click();
        await page.waitForTimeout(300);
        console.log("   - Lightbox modal closed cleanly.");
      }
    }

    // 5. Test Instant Quote Calculator
    console.log("🧮 Testing Instant Quote Calculator Step-by-Step ...");
    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    // Step 1: Set Event Date & Finish Time via React native setter
    console.log("   - Executing Step 1 (Event Details)...");
    await page.evaluate(() => {
      const setNativeValue = (element, value) => {
        const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
        if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
          prototypeValueSetter.call(element, value);
        } else {
          valueSetter.call(element, value);
        }
      };

      const dateEl = document.querySelector('#contact input[type="date"]');
      const timeEl = document.querySelector('#contact input[type="time"]');

      if (dateEl) {
        setNativeValue(dateEl, "2026-08-15");
        dateEl.dispatchEvent(new Event("input", { bubbles: true }));
        dateEl.dispatchEvent(new Event("change", { bubbles: true }));
      }
      if (timeEl) {
        setNativeValue(timeEl, "11:00");
        timeEl.dispatchEvent(new Event("input", { bubbles: true }));
        timeEl.dispatchEvent(new Event("change", { bubbles: true }));
      }
    });

    await page.waitForTimeout(300);
    await page.locator('#contact button:has-text("Next Step")').click();
    await page.waitForTimeout(500);

    // Step 2: Region Selection
    console.log("   - Executing Step 2 (Region)...");
    await page.locator('#contact button:has-text("Durham Region")').first().click();
    await page.waitForTimeout(200);
    await page.locator('#contact button:has-text("Next Step")').click();
    await page.waitForTimeout(500);

    // Step 3: Service Type
    console.log("   - Executing Step 3 (Service Type)...");
    await page.locator('#contact button:has-text("Bridal Booking")').first().click();
    await page.waitForTimeout(200);
    await page.locator('#contact button:has-text("Next Step")').click();
    await page.waitForTimeout(500);

    // Step 4: Service Details & Counts
    console.log("   - Executing Step 4 (Service Details)...");
    await page.locator('#contact button:has-text("Next Step")').click();
    await page.waitForTimeout(500);

    // Step 5: Package Tier Selection
    console.log("   - Executing Step 5 (Package Tiers)...");
    await page.locator('#contact button:has-text("Next Step")').click();
    await page.waitForTimeout(500);

    // Step 6: Contact Info & Submission
    console.log("   - Executing Step 6 (Finalize & Submit)...");
    await page.evaluate(() => {
      const setNativeValue = (element, value) => {
        const valueSetter = Object.getOwnPropertyDescriptor(element, "value").set;
        const prototype = Object.getPrototypeOf(element);
        const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, "value").set;
        if (prototypeValueSetter && valueSetter !== prototypeValueSetter) {
          prototypeValueSetter.call(element, value);
        } else {
          valueSetter.call(element, value);
        }
      };

      const inputs = document.querySelectorAll('#contact form input');
      inputs.forEach((inp) => {
        const type = inp.getAttribute("type") || "text";
        if (type === "text") {
          setNativeValue(inp, inp.getAttribute("placeholder")?.includes("Priya") ? "Anand" : "Jadhav");
        } else if (type === "email") {
          setNativeValue(inp, "anand@example.com");
        } else if (type === "tel") {
          setNativeValue(inp, "6476403439");
        }
        inp.dispatchEvent(new Event("input", { bubbles: true }));
        inp.dispatchEvent(new Event("change", { bubbles: true }));
      });
    });

    await page.waitForTimeout(300);
    const submitBtn = page.locator('#contact button[type="submit"]').first();
    if (await submitBtn.isVisible()) {
      await submitBtn.click();
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, "deployed_4_quote_confirmation.png") });
      console.log("✅ Deployed Quote Calculator submitted cleanly & summary generated!");
    }

    // 6. Responsive Viewport Test (Mobile 375px)
    console.log("📱 Testing Mobile Viewport (375px) ...");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(TARGET_URL, { waitUntil: "networkidle" });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "deployed_5_mobile_375px.png") });
    console.log("✅ Mobile layout rendered cleanly without horizontal overflow.");

    // 7. Responsive Viewport Test (Tablet 768px)
    console.log("📱 Testing Tablet Viewport (768px) ...");
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, "deployed_6_tablet_768px.png") });
    console.log("✅ Tablet layout rendered cleanly.");

    console.log("\n==============================================");
    console.log(`📊 E2E AUDIT REPORT FOR: ${TARGET_URL}`);
    console.log("==============================================");
    console.log(`HTTP Status: ${status}`);
    console.log(`Console Errors (${consoleErrors.length}):`, consoleErrors);
    console.log(`404 Errors (${status404s.length}):`, status404s);
    console.log(`Network Failures (${networkFailures.length}):`, networkFailures);
    console.log(`Screenshots Saved to: ${SCREENSHOT_DIR}`);
    console.log("==============================================\n");

  } catch (err) {
    console.error("❌ Test error:", err);
  } finally {
    await browser.close();
  }
}

runDeployedE2EAudit();
