import { test, expect } from "@playwright/test";

test("E2E Checkout Flow Automation", async ({ page }) => {
  const validProduct = "Test.allTheThings() T-Shirt (Red)";
  // const context = await browser.newContext();
  // const page = await context.newPage();
  //Login url
  await page.goto("https://www.saucedemo.com/");
  ///Login Page////
  const allUsers = await page.locator("#login_credentials").innerText();
  const validUser = allUsers
    .split("\n")
    .filter((user) => user !== "Accepted usernames are:")
    .map((user) => user.trim())
    .find((user) => user.includes("standard")); /////Fetching valid user
  const validPassword = (await page.locator(".login_password").innerText())
    .split("\n")
    .map((pass) => pass.trim())
    .filter((pass) => pass !== "Password for all users:"); ///Fetching valid password
  console.log(validPassword);
  await page.getByPlaceholder("Username").fill(validUser);
  await page.getByPlaceholder("Password").fill(validPassword[0]);
  await page.locator("#login-button").click();
  //Assertion for inventory page visibility after login
  await expect(page.locator(".app_logo")).toContainText("Swag");
  ////Dashboard product page
  const prodName = page.locator(".inventory_item");
  for (let i = 0; i < (await prodName.count()); i++) {
    let nameText = await prodName
      .nth(i)
      .locator(".inventory_item_label")
      .textContent();
    if (!nameText.includes("Sauce Labs Fleece Jacket")) {
      await prodName
        .nth(i)
        .getByRole("button", { name: "Add to cart" })
        .click();
    }
  }
  // const addButton = page.locator(".btn_primary");
  // for (let i = 0; i < (await addButton.count()) - 2; i++) {
  //   await addButton.nth(i).click();
  // }
  let cartBadge = await page.locator(".shopping_cart_badge").textContent();
  await page.locator(".shopping_cart_link").click();
  ///Your Cart
  //Assertion for cart items count equals cart badge
  expect(await page.locator(".cart_item").count()).toEqual(Number(cartBadge));
  await page.locator("#continue-shopping").click();
  //Product page
  // for (let i = 0; i < (await addButton.count()); i++) {
  //   await addButton.nth(i).click();
  // }
  cartBadge = await page.locator(".shopping_cart_badge").textContent();
  await page.locator(".shopping_cart_link").click();
  //Your Cart
  //Assertion for cart items count equals cart badge on second page
  expect(await page.locator(".cart_item").count()).toEqual(Number(cartBadge));
  let cartProductList = page.locator(".cart_item_label");
  for (let j = 0; j < (await cartProductList.count()); j++) {
    let itemName = await cartProductList
      .nth(j)
      .locator(".inventory_item_name")
      .textContent();
    if (itemName !== validProduct) {
      await cartProductList.nth(j).locator(".btn_secondary").click();
    }
    cartProductList = page.locator(".cart_item_label");
    j = -1;
  }
  await page.getByRole("button", { name: "Checkout" }).click();
  ///Checkout: Your information
  await page.getByPlaceholder("First Name").fill(validUser);
  await page.getByPlaceholder("Last Name").fill("Test");
  await page.getByPlaceholder("Zip/Postal Code").fill("411587");
  await page.locator("#continue").click();
  ///Checkout: Overview
  const checkoutInfo = await page.locator(".summary_info").allInnerTexts();
  console.log(checkoutInfo);
  //Place order once information are confirmed
  await page.getByRole("button", { name: "Finish" }).click();
  //Order confirmed
  await expect(page.locator(".complete-header")).toHaveText(
    "Thank you for your order!",
  );
  await expect(page.locator(".complete-text")).toContainText(
    "order has been dispatched",
  );
  //Logout Flow
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator("#logout_sidebar_link").click();
  //Login Page
  //Assertion for login button is visible after logout
  await expect(page.locator("#login-button")).toBeVisible();
  //Close browser
  await page.close();
  console.log("Order completed successfully via Playwright automation");
});
