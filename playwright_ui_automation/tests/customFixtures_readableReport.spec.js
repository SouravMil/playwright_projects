import { test, expect } from "../fixtures/loginFixture";
import dataSet from "../test-utils/demoItems.json";

for (const data of dataSet) {
  test(`Flow Automation for ${data.item}`, async ({ loggedInPage }) => {
    //Assertion for inventory loggedInPage visibility after login
    await test.step(`Add product`, async () => {
      await expect(loggedInPage.locator(".app_logo")).toContainText("Swag");
      ////Dashboard product loggedInPage
      const itemDescription = loggedInPage.locator(
        ".inventory_item_description",
      );
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
      await loggedInPage.locator(".shopping_cart_link").click();
    });

    await test.step(`Cart Page`, async () => {
      //Your Cart
      //Assertion for cart items count equals cart badge on second loggedInPage
      expect(
        await loggedInPage
          .locator(".cart_item_label")
          .locator(".inventory_item_name")
          .textContent(),
      ).toEqual(data.item);
      await loggedInPage.getByRole("button", { name: "Checkout" }).click();
    });

    await test.step(`Checkout Page`, async () => {
      ///Checkout: Your information
      await loggedInPage.getByPlaceholder("First Name").fill("standard_user");
      await loggedInPage.getByPlaceholder("Last Name").fill("Test");
      await loggedInPage.getByPlaceholder("Zip/Postal Code").fill("411587");
      await loggedInPage.locator("#continue").click();
      ///Checkout: Overview
      const checkoutInfo = await loggedInPage
        .locator(".summary_info")
        .allInnerTexts();
      console.log(checkoutInfo);
    });

    await test.step(`Confirm order`, async () => {
      //Place order once information are confirmed
      await loggedInPage.getByRole("button", { name: "Finish" }).click();
      //Order confirmed
      await expect(loggedInPage.locator(".complete-header")).toHaveText(
        "Thank you for your order!",
      );
      await expect(loggedInPage.locator(".complete-text")).toContainText(
        "order has been dispatched",
      );
    });

    await test.step(`Logout Page`, async () => {
      //Logout Flow
      await loggedInPage.getByRole("button", { name: "Open Menu" }).click();
      await loggedInPage.locator("#logout_sidebar_link").click();
    });

    await test.step(`Logout Assertion`, async () => {
      //Login loggedInPage
      //Assertion for login button is visible after logout
      await expect(loggedInPage.locator("#login-button")).toBeVisible();
      //Close browser
      await loggedInPage.close();
    });

    console.log("Order completed successfully via Playwright automation");
  });
}
