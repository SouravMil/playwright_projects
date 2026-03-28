import { test, expect } from "@playwright/test";

test.beforeEach("login setup", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.locator("#login-button").click();
});

test.afterEach("Closing session", async ({ page }, testInfo) => {
  //Logout Flow
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator("#logout_sidebar_link").click();
  //Login Page
  //Assertion for login button is visible after logout
  await expect(page.locator("#login-button")).toBeVisible();
  console.log(
    `The unit test ${testInfo.title} is completed with status ${testInfo.status}`,
  );
});

test("Get the list of products", async ({ page }) => {
  expect(await page.locator(".app_logo").textContent()).toEqual("Swag Labs");
  const products = page.locator(".inventory_item_name");
  for (let i = 0; i < (await products.count()); i++) {
    let itemName = await products.nth(i).textContent();
    console.log(itemName);
  }
});

test("Validate cart logo function", async ({ page }) => {
  await page.locator(".shopping_cart_link").click();
  await page.screenshot({
    path: "screenshots/cartPage.png",
    fullPage: true,
  });
});
