import { test, expect } from "@playwright/test";
import end2endPracticeLoginPage from "../pageobjects/end2endPracticeLoginPage";
import end2endPracticeProductPage from "../pageobjects/end2endPracticeProductPage";
import end2endPracticeCartPage from "../pageobjects/end2endPracticeCartPage";

test("Practicing end2end flow of eCommerce", async ({ browser }) => {
  const validProduct = ["Sauce Labs Bolt T-Shirt"];
  const context = await browser.newContext();
  const page = await context.newPage();
  const username = "standard_user";
  const password = "secret_sauce";
  ////////////LOGIN PAGE/////////////////////////////
  const loginPage = new end2endPracticeLoginPage(page);
  await loginPage.hitUrl();
  await loginPage.validLogin(username, password);
  //handling js alert
  page.on("dialog", (dialog) => dialog.accept());
  //////////////////////PRODUCT PAGE////////////////////
  const productPage = new end2endPracticeProductPage(page);
  await productPage.productPageValidation();
  await productPage.addProductsToCart();
  const totalProductsInShoppingPage = await productPage.totalVisibleProducts();
  /////////////////////CART PAGE////////////////////////
  const cartPage = new end2endPracticeCartPage(page);
  await cartPage.validateCartPageLanding();
  await cartPage.backToShopping();
  ////////////////////PRODUCT PAGE/////////////////////
  await productPage.addRemainingToCart();
  /////////////////////CART PAGE//////////////////////
  await cartPage.returnToCartPage();
  const totalItemsInCart = await cartPage.cartItemsCount();
  expect(totalItemsInCart).toEqual(totalProductsInShoppingPage);
  //Remove all invalid products from the shopping-cart
  await cartPage.removeExtraFromCart(validProduct);
  ///////////////////CHECKOUT PAGE//////////////////////
  await expect(page.locator(".title")).toBeVisible();
  const visibleCartItemCount = await page
    .locator(".shopping_cart_badge")
    .textContent();
  expect(Number(visibleCartItemCount)).toEqual(validProduct.length);
  expect(await page.locator(".title").textContent()).toEqual(
    "Checkout: Your Information",
  );
  await page.getByRole("button", { name: "Cancel" }).click();
  expect(await page.locator(".title").textContent()).toEqual("Your Cart");
  await page.locator("#checkout").click();
  await page.locator("#first-name").fill("Steve");
  await page.locator("#last-name").fill("Michael");
  await page.locator("#postal-code").fill("411102");
  await page.locator("#continue").click();
  ////////////////////SHIPPING CONFIRMATION/////////////////
  await expect(page.locator(".title")).toBeVisible();
  const priceTotal = await page.locator(".summary_total_label").textContent();
  console.log(priceTotal);
  await page.locator("#finish").click();
  ////////////////////ORDER CONFIRMATION PAGE//////////////
  const orderConfirm = await page.locator(".complete-header").textContent();
  expect(orderConfirm).toContain("Thank you");
  await expect(page.locator("#back-to-products")).toBeVisible();
});
