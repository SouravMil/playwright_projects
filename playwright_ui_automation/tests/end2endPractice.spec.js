const { test, expect } = require("@playwright/test");

test("Practicing end2end flow of eCommerce", async ({ browser }) => {
  const validProduct = "Sauce Labs Bolt T-Shirt";
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = "standard_user";
  const password = "secret_sauce";
  await page.goto("https://www.saucedemo.com/");
  const credentialTextsUser = await page
    .locator("#login_credentials")
    .innerText();
  //convert text into array
  const usersArr = credentialTextsUser
    .split("\n")
    .map((user) => user.trim())
    .filter((user) => user !== "Accepted usernames are:");
  //dynamic user selection
  const selectedUser = usersArr.find((user) => user === username);
  await page.locator("#user-name").fill(selectedUser);
  const credentialTextsPassword = await page
    .locator(".login_password")
    .innerText();
  //convert text into array
  const passwordArr = credentialTextsPassword
    .split("\n")
    .map((pass) => pass.trim())
    .filter((pass) => pass !== "Password for all users:");
  //dynamic password
  const selectedPassword = passwordArr.find((pass) => pass === password);
  await page.locator("#password").fill(selectedPassword);
  await page.locator("#login-button").click();
  //handling js alert
  page.on("dialog", (dialog) => dialog.accept());
  //Clicking addToCart for all the visible products
  expect(await page.locator(".title").textContent()).toEqual("Products");
  const addToCart = page.locator(".btn_inventory");
  const totalButton = await addToCart.count();
  for (let i = 0; i < (await addToCart.count()) - 2; i++) {
    await addToCart.nth(i).click();
  }
  await page.locator(".shopping_cart_link").click();
  expect(await page.locator(".title").textContent()).toEqual("Your Cart");
  const cartItems = page.locator(".cart_item");
  await page.locator("#continue-shopping").click();
  for (let i = 0; i < (await addToCart.count()); i++) {
    if ((await addToCart.nth(i).textContent()) === "Add to cart") {
      await addToCart.nth(i).click();
    }
  }
  await page.locator(".shopping_cart_link").click();
  await page.pause();
  expect(await cartItems.count()).toEqual(totalButton);
  //Remove all invalid products from the shopping-cart
  const yourCart = page.locator(".cart_item");
  for (let i = 0; i < (await yourCart.count()); i++) {
    let cartItemTitle = await yourCart
      .nth(i)
      .locator(".cart_item_label")
      .locator(".inventory_item_name")
      .textContent();
    ////Removing items is not working. Fix it here.
    if (cartItemTitle !== validProduct) {
      await yourCart
        .nth(i)
        .locator(".cart_item_label")
        .locator(".item_pricebar")
        .locator("#remove-sauce-labs-backpack")
        .click();
    }
    i = -1;
  }
});
