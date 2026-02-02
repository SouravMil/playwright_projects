import { test, expect } from "@playwright/test";
import end2endPracticeLoginPage from "../pageobjects/end2endPracticeLoginPage";
import end2endPracticeProductPage from "../pageobjects/end2endPracticeProductPage";
import end2endPracticeCartPage from "../pageobjects/end2endPracticeCartPage";
import end2endPracticeCheckoutPage from "../pageobjects/end2endPracticeCheckoutPage";
import end2endPracticeShippingInfoPage from "../pageobjects/end2endPracticeShippingInfoPage";
import end2endPracticeOrderConfirmPage from "../pageobjects/end2endPracticeOrderConfirmPage";

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
  const checkoutPage = new end2endPracticeCheckoutPage(page);
  await checkoutPage.landingCheckoutPage(validProduct);
  await checkoutPage.returnBackCartPage();
  await cartPage.validatePageTitle();
  await checkoutPage.checkoutPageFormfill();
  ////////////////////SHIPPING CONFIRMATION/////////////////
  const shippingPage = new end2endPracticeShippingInfoPage(page);
  await shippingPage.landingShippingInfoPage();
  ////////////////////ORDER CONFIRMATION PAGE//////////////
  const orderConfirm = new end2endPracticeOrderConfirmPage(page);
  await orderConfirm.orderConfirmation();
  await orderConfirm.backtoShoppingPage();
  /////////////////PRODUCT PAGE/////////////
  await productPage.productPageLanding();
  await productPage.signOut();
  await loginPage.validateLoginPageLanding();
});
