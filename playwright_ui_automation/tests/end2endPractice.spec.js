import { test, expect } from "@playwright/test";

test("Practicing end2end flow of eCommerce", async ({ browser }) => {
  const validProduct = ["Sauce Labs Bolt T-Shirt"];
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = "standard_user";
  const password = "secret_sauce";
  await page.goto("https://www.saucedemo.com/");
  ////////////LOGIN PAGE/////////////////////////////
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
  //////////////////////PRODUCT PAGE////////////////////
  //handling js alert
  page.on("dialog", (dialog) => dialog.accept());
  //Clicking addToCart for all the visible products
  expect(await page.locator(".title").textContent()).toEqual("Products");
  const addToCart = page.locator(".btn_inventory");
  const totalButton = await addToCart.count();
  for (let i = 0; i < (await addToCart.count()) - 2; i++) {
    await addToCart.nth(i).click();
  }
  /////////////////////CART PAGE////////////////////////
  await page.locator(".shopping_cart_link").click();
  expect(await page.locator(".title").textContent()).toEqual("Your Cart");
  const cartItems = page.locator(".cart_item");
  await page.locator("#continue-shopping").click();
  ////////////////////PRODUCT PAGE/////////////////////
  for (let i = 0; i < (await addToCart.count()); i++) {
    if ((await addToCart.nth(i).textContent()) === "Add to cart") {
      await addToCart.nth(i).click();
    }
  }
  /////////////////////CART PAGE//////////////////////
  await page.locator(".shopping_cart_link").click();
  expect(await cartItems.count()).toEqual(totalButton);
  //Remove all invalid products from the shopping-cart
  let yourCart = page.locator(".cart_item_label");
  for (let i = 0; i < (await yourCart.count()); i++) {
    let cartItemTitle = await yourCart
      .nth(i)
      .locator(".inventory_item_name")
      .textContent();

    if (cartItemTitle !== validProduct[0]) {
      await yourCart.nth(i).locator(".cart_button").click();
      yourCart = page.locator(".cart_item_label");
      i = -1;
    }
  }
  expect(await yourCart.count()).toEqual(validProduct.length);
  await page.locator('#checkout').click();
  ///////////////////CHECKOUT PAGE//////////////////////
  await expect(page.locator('.title')).toBeVisible();
  const visibleCartItemCount = await page.locator('.shopping_cart_badge').textContent();
  expect(visibleCartItemCount).toEqual(validProduct.length);
  await page.getByRole('button', {name:'Cancel'}).click();
  expect(await page.locator('.title').textContent()).toEqual('Checkout: Your Information');
  await page.locator('#first-name').fill('Steve');
  await page.locator('#last-name').fill('Michael');
  await page.locator('#postal-code').fill('411102');
  await page.locator('#continue').click();
  ////////////////////SHIPPING CONFIRMATION/////////////////
  await expect(page.locator('.title')).toBeVisible();
  const priceTotal = await page.locator('.summary_total_label').textContent();
  console.log(priceTotal);
  await page.locator('#finish').click();
  ////////////////////ORDER CONFIRMATION PAGE//////////////
  const orderConfirm = await page.locator('.complete-header').textContent();
  expect(orderConfirm).toContain('Thank you');
  await expect(page.locator('.btn_primary')).toBeVisible();
});
