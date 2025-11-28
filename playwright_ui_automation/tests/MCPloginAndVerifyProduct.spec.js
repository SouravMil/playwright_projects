const { test, expect } = require('@playwright/test');

test('Login and verify product presence', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  await page.fill('#userEmail', 'captainamerica@gmail.com');
  await page.fill('#userPassword', 'avengers@Assemble5');

  // Select checkbox if present
  const checkbox = page.locator('input[type="checkbox"]');
  if (await checkbox.isVisible()) {
    await checkbox.check();
  }

  await page.click('#login');
  await page.waitForURL('https://rahulshettyacademy.com/client/#/dashboard/dash');

  // Verify "iphone 13 pro" is present
  const product = page.locator('.card-body b', { hasText: 'iphone 13 pro' });
  await expect(product).toBeVisible();
});
