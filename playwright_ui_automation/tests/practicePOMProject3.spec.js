import { test, expect} from '@playwright/test';
import { POManager } from '../pageobjects/POManager';
const testData = JSON.parse(JSON.stringify(require('../test-utils/practicePOMdata.json')));

//for(const data of testData){ 
test.only("E-Commerce Functional Test Suite", async ({ page }) => {

    const poManager = new POManager(page);
  const addItem = [
    "Sauce Labs Bike Light",
    "Sauce Labs Backpack",
    "Sauce Labs Bolt T-Shirt",
    "Sauce Labs Onesie",
    "Test.allTheThings() T-Shirt (Red)",
    "Sauce Labs Fleece Jacket",
  ];
  //Login Page
  const loginPage = poManager.getloginPractice();
  await loginPage.goto();
  await loginPage.validLogin(user,password);
  
//   await page.goto("https://www.saucedemo.com/");
//   await page.locator("#user-name").fill(user);
//   await page.fill("#password", password);
//   await page.click("#login-button");
  //handling js alert
  page.on("dialog", (dialog) => dialog.accept());
  //Add items to cart (shopping page)
  await expect(page.getByText("Products")).toBeVisible();
  const items = page.locator(".inventory_item_description");
  for (let i = 0; i < (await items.count()); i++) {
    const productName = await items
      .nth(i)
      .locator(".inventory_item_name")
      .textContent();
    if (addItem.includes(productName)) {
      await items.nth(i).locator(".btn").click();
    }
  }
  await page.locator(".shopping_cart_link").click();
  const cartItem = page.locator(".cart_item");
  await cartItem.first().waitFor();
  //remove unwanted item from cart (cart page)
  let cartItems = page.locator(".cart_item_label");
  let count = await cartItems.count();
  for (let j = 0; j < count; j++) {
    const unwanted = await cartItems
      .nth(j)
      .locator(".inventory_item_name")
      .textContent();
    if (unwanted !== "Sauce Labs Bike Light") {
      await cartItems.nth(j).locator(".btn_secondary").click();
      //refresh the list since DOM has changed
      cartItems = page.locator(".cart_item_label");
      count = await cartItems.count();
      j = -1;
    }
  }
  const requireItem = await cartItems
    .locator(".inventory_item_name")
    .textContent();
  expect(requireItem).toEqual("Sauce Labs Bike Light");
  //checkout page
  await page.locator("#checkout").click();
  await page.locator(".form_input").first().waitFor();
  await page.fill("#first-name", "Robin");
  await page.fill("#last-name", "Hood");
  await page.fill("#postal-code", "711110");
  await page.click("#continue");
  //Order review page
  await page.locator(".summary_info_label").first().waitFor();
  const orderInfo = page.locator(".summary_value_label");
  for (let k = 0; k < (await orderInfo.count()); k++) {
    const orderConfirmation = await orderInfo.nth(k).textContent();
    console.log(orderConfirmation);
  }
  const price = await page.locator(".summary_total_label").textContent();
  const orderTotal = price.split(" ");
  console.log(orderTotal[1]);
  await page.click("#finish");
  //Order complete
  const thankYouText = await page.locator(".complete-header").textContent();
  expect(thankYouText).toEqual("Thank you for your order!");
  console.log(await page.locator(".complete-text").textContent());
  //Back to home page
  await page.getByRole("button", { name: "Back Home" }).click();
  //log out flow
  await page.locator(".inventory_item").last().waitFor();
  await page.locator("#react-burger-menu-btn").click();
  await page.locator(".bm-item-list").waitFor();
  await page.click("#logout_sidebar_link");
  //validate if user is logged out
  await expect(page.locator("#login-button")).toBeVisible();
});

test("Use invalid credentials", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.fill("#user-name", "problem_user");
  await page.fill("#password", "qwerty");
  await page.click("#login-button");
  var errorText = await page.locator('h3[data-test="error"]').textContent();
  console.log(errorText);
  await page.reload();
  await page.fill("#user-name", "problem_user1");
  await page.fill("#password", "qwerty");
  await page.click("#login-button");
  await expect(page.locator('h3[data-test="error"]')).toContainText(
    "do not match"
  );
});