import { test, expect } from "@playwright/test";

test("e2e flow with advanced-framework", async ({ page }) => {
  const validItem = "ZARA COAT 3";
  const validUser = "captainamerica@gmail.com";
  const validPassword = "avengers@Assemble5";
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await page.locator("#userEmail").fill(validUser);
  await page.locator("#userPassword").fill(validPassword);
  await page.locator("#login").click();
  const productList = page.locator(".card-body");
  for (let i = 0; i < (await productList.count()); i++) {
    let itemName = await productList.nth(i).getByRole("heading").textContent();
    if (itemName === validItem) {
      await productList
        .nth(i)
        .getByRole("button", { name: "Add To Cart" })
        .click();
    }
  }
  ////Fix the toast part later
  // await page.locator("#toast-container").waitFor();
  // await expect
  //   .soft(page.locator(".toast-message"))
  //   .toContainText("Product Added To Cart");
  //Clicking cart button
  await page.locator(".btn-custom").nth(2).click();
  //Cart Page
  await page.locator("div li").first().waitFor();
  const cartProductName = await page
    .locator(".infoWrap")
    .locator(".cartSection")
    .getByRole("heading")
    .textContent();
  expect.soft(cartProductName).toEqual(validItem);
  await page.getByRole("button", { name: "Checkout" }).click();
  //CheckOut page
  await page.locator(".input").fill("245");
  const visibleUser = await page.locator("label[type='text']").textContent();
  expect.soft(visibleUser).toEqual(validUser);
  await page.getByPlaceholder("Select Country").press("in");
  await page.pause();
});
