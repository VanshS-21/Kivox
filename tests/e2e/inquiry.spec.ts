import { test, expect } from '@playwright/test';

test.describe('Inquiry Form E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Intercept the API request to spoof the IP address so we don't hit the local 15-minute rate limit across test runs
    const testIp = `127.0.0.${Math.floor(Math.random() * 255)}`;
    await page.route('/api/inquiry', async route => {
      const headers = {
        ...route.request().headers(),
        'x-forwarded-for': testIp,
      };
      await route.continue({ headers });
    });

    await page.goto('/contact');
  });

  test('should display validation errors for empty/invalid required fields', async ({ page }) => {
    // Attempt to submit the form without filling it out
    const submitBtn = page.getByRole('button', { name: /Send inquiry/i });
    await submitBtn.click();

    // Verify error messages appear using the exact error text from the schema
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Enter a valid email')).toBeVisible();
    await expect(page.locator('text=Please enter a valid phone number')).toBeVisible();
    await expect(page.locator('text=Tell us what should improve when this goes live')).toBeVisible();
  });

  test('should submit successfully with valid data', async ({ page }) => {
    // Fill out the form
    await page.getByPlaceholder('Your full name').fill('John Doe');
    await page.getByPlaceholder('you@company.com').fill('john@example.com');
    await page.getByPlaceholder('+91 ...').fill('+1234567890');
    
    // Select dropdown values
    await page.getByLabel('Business type').selectOption('Fitness / Wellness');
    await page.getByLabel('What you need').selectOption('Web app');
    
    // Fill text areas
    await page.getByPlaceholder('What should improve when this is live?').fill('Our user retention needs to increase significantly.');
    
    // The anti-bot timer requires a 1500ms delay. Let's wait for 1.6 seconds to ensure success
    await page.waitForTimeout(1600);

    page.on('response', response => {
      if (response.url().includes('/api/inquiry')) {
        console.log(`API response status: ${response.status()}`);
        response.json().then(data => console.log('API response body:', data)).catch(() => {});
      }
    });

    const submitBtn = page.getByRole('button', { name: /Send inquiry/i });
    await submitBtn.click();

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'tests/e2e/debug-after-submit.png', fullPage: true });

    // Verify successful submission text appears or button text changes to Sent
    await expect(page.getByRole('button', { name: /Sent/i })).toBeVisible({ timeout: 10000 });
  });

  test('should trigger rate limit response if spammed', async ({ request }) => {
    // We configured max 5 requests per 15 minutes. We can test this directly via the API Context to avoid waiting for UI
    
    // Submit 5 valid requests rapidly
    const testIp = `192.168.1.${Math.floor(Math.random() * 255)}`; // Isolate this test's IP
    for (let i = 0; i < 5; i++) {
      const response = await request.post('/api/inquiry', {
        headers: {
          'x-forwarded-for': testIp,
        },
        data: {
          data: {
            name: 'Spammer',
            email: 'spam@spam.com',
            phone: '123456789',
            businessType: 'Other',
            whatYouNeed: 'Website',
            primaryGoal: 'Spamming the system',
          },
          startedAtMs: Date.now() - 2000, // Bypass the anti-bot timer
        }
      });
      // The first 5 should succeed (HTTP 200)
      expect(response.status()).toBe(200);
    }

    // The 6th request should trigger a 429 Too Many Requests
    const response6 = await request.post('/api/inquiry', {
      headers: {
        'x-forwarded-for': testIp,
      },
      data: {
        data: {
          name: 'Spammer',
          email: 'spam@spam.com',
          phone: '123456789',
          businessType: 'Other',
          whatYouNeed: 'Website',
          primaryGoal: 'Spamming the system',
        },
        startedAtMs: Date.now() - 2000,
      }
    });

    expect(response6.status()).toBe(429);
    
    const responseBody = await response6.json();
    expect(responseBody.error).toContain('Too many requests');
  });
});
