// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});



test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Home page', async ({ page })=> {

   await page.goto('https://demoblaze.com/');
   /*const pageTitle=page.title();
   await expect(pageTitle).toHaveTitle('STORE');
   await expect(page).toHaveUrl('https://demoblaze.com/');
   const pageUrl = page.url();
   console.log('The page url is ',pageUrl);
   await page.close();*/

});
