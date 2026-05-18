import { expect, type Page, test } from "@playwright/test";

async function waitForInquiryFormReady(page: Page) {
  await page.waitForFunction(() =>
    document.cookie.includes("kivox_inquiry_started_at="),
  );
}

async function chooseCustomSelect(page: Page, label: string, option: string) {
  await page.getByLabel(label).click();

  const optionLocator = page.getByRole("option", { name: option });
  await expect(optionLocator).toBeVisible();
  await optionLocator.click();
}

test.describe("Inquiry Form E2E", () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the API request to spoof the IP address so we don't hit the local 15-minute rate limit across test runs
    const testIp = `127.0.0.${Math.floor(Math.random() * 255)}`;
    await page.route("/api/inquiry", async (route) => {
      const headers = {
        ...route.request().headers(),
        "x-forwarded-for": testIp,
      };
      await route.continue({ headers });
    });

    await page.goto("/contact");
    await waitForInquiryFormReady(page);
  });

  test("should display validation errors for empty/invalid required fields", async ({ page }) => {
    // Attempt to submit the form without filling it out
    const submitBtn = page.getByRole("button", { name: /Send message/i });
    await submitBtn.click();

    // Verify error messages appear using the exact error text from the schema
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Enter a valid email")).toBeVisible();
    await expect(page.getByText("Please enter a valid 10-digit Indian phone number")).toBeVisible();
  });

  test("should submit successfully with valid data", async ({ page }) => {
    // Fill out the form
    await page.getByLabel("Your full name").fill("John Doe");
    await page.getByLabel("Email address").fill("john@example.com");
    await page.getByLabel("Phone number").fill("+91 98765 43210");

    // Select dropdown values
    await chooseCustomSelect(page, "What kind of business do you run?", "Fitness / Wellness");
    await chooseCustomSelect(page, "What can we help you with?", "A custom web application");

    // Fill text areas
    await page
      .getByLabel("Tell us a bit more about your goals (optional)")
      .fill("Our user retention needs to increase significantly.");

    // The anti-bot timer requires a 1500ms delay. Let's wait for 1.6 seconds to ensure success
    await page.waitForTimeout(1600);

    page.on("response", (response) => {
      if (response.url().includes("/api/inquiry")) {
        console.log(`API response status: ${response.status()}`);
        response.json().then((data) => console.log("API response body:", data)).catch(() => {});
      }
    });

    const submitBtn = page.getByRole("button", { name: /Send message/i });
    await submitBtn.click();

    // Verify successful submission text appears or button text changes to Sent
    await expect(page.getByRole("status")).toContainText("Received", { timeout: 10000 });
  });

  test("should trigger rate limit response if spammed", async ({ request }) => {
    // We configured max 5 requests per 15 minutes. We can test this directly via the API Context to avoid waiting for UI

    // Submit 5 schema-valid honeypot requests rapidly. The route rate-limits before
    // the honeypot exits, so this isolates throttling from email delivery.
    const testIp = `192.168.1.${Math.floor(Math.random() * 255)}`; // Isolate this test's IP
    for (let i = 0; i < 5; i++) {
      const response = await request.post("/api/inquiry", {
        headers: {
          "x-forwarded-for": testIp,
        },
        data: {
          data: {
            name: "Spammer",
            email: "spam@spam.com",
            phone: "+91 98765 43210",
            businessType: "Other",
            whatYouNeed: "A brand new website",
            notes: "Spamming the system",
          },
          hp: "bot-field",
          startedAtMs: Date.now() - 2000, // Bypass the anti-bot timer
        },
      });
      // The first 5 should succeed (HTTP 200)
      expect(response.status()).toBe(200);
    }

    // The 6th request should trigger a 429 Too Many Requests
    const response6 = await request.post("/api/inquiry", {
      headers: {
        "x-forwarded-for": testIp,
      },
      data: {
        data: {
          name: "Spammer",
          email: "spam@spam.com",
          phone: "+91 98765 43210",
          businessType: "Other",
          whatYouNeed: "A brand new website",
          notes: "Spamming the system",
        },
        hp: "bot-field",
        startedAtMs: Date.now() - 2000,
      },
    });

    expect(response6.status()).toBe(429);

    const responseBody = await response6.json();
    expect(responseBody.error).toContain("Too many requests");
  });
});
