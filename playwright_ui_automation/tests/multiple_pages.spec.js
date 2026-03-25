import { test, expect, chromium } from "@playwright/test";

test("Handle multiple page-contexts", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page1 = await context.newPage();
  await page1.goto("https://www.google.com/search?q=suez+canal");
  await page1.title();

  const page2 = await context.newPage();
  await page2.goto("https://www.saucedemo.com/");
  await page2.title();

  const allPages = context.pages();
  console.log("Number of pages created: ", allPages.length);

  await page1.waitForTimeout(3000);
  await page2.waitForTimeout(3000);

  await browser.close();
});

test.only("Handle multiple connected pages", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const parentPage = await context.newPage();

  await parentPage.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
  );
  const pageEvent = context.waitForEvent("page");
  await parentPage.locator('a:has-text("OrangeHRM, Inc")').click();
  const childPage = await pageEvent;
  expect(childPage).toHaveTitle(
    "OrangeHRM: All in One HR Software for Businesses ",
  );
  const allPages = context.pages();
  console.log("Number of pages created: ", allPages.length);

  await parentPage.waitForTimeout(3000);
  await childPage.waitForTimeout(3000);

  await browser.close();
});
