const { test, expect } = require("@playwright/test");

test("Practicing end2end flow of eCommerce", async ({ browser }) => {
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
  ////////////////////////Buttons are not being clicked. Fix it here.
  const addToCart = page.locator(".btn_inventory");
  console.log(await addToCart.count());
  for (let i = 0; i < await addToCart.count(); i++) {
    await addToCart.nth(i).click();
  }
  await page.locator(".shopping_cart_link").click();
  const cartItems = page.locator(".cart_item");
  await page.pause();
  console.log(await cartItems.count());
});


 