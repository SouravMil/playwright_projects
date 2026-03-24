import { test, expect } from "@playwright/test";
const dataSet = JSON.parse(
  JSON.stringify(require("../test-utils/practicePOMdata.json")),
);

for (const data of dataSet) {
  test(`E2E Checkout Flow Automation for ${data.item}`, async ({ page }) => {
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
    await page.getByPlaceholder("Username").fill(validUser);
    await page.getByPlaceholder("Password").fill(validPassword[0]);
    await page.locator("#login-button").click();
    //Assertion for inventory page visibility after login
    await expect(page.locator(".app_logo")).toContainText("Swag");
    ////Dashboard product page
    const itemDescription = page.locator(".inventory_item_description");
    for (let i = 0; i < (await itemDescription.count()); i++) {
      let itemName = await itemDescription
        .nth(i)
        .locator(".inventory_item_label")
        .locator(".inventory_item_name")
        .textContent();
      if (itemName?.trim() === data.item) {
        await itemDescription
          .nth(i)
          .getByRole("button", { name: "Add to cart" })
          .click();
      }
    }
    // let cartBadge = await page.locator(".shopping_cart_badge").textContent();
    await page.locator(".shopping_cart_link").click();
    //Your Cart
    //Assertion for cart items count equals cart badge on second page
    expect(
      await page
        .locator(".cart_item_label")
        .locator(".inventory_item_name")
        .textContent(),
    ).toEqual(data.item);
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
}
