const { test, expect } = require("@playwright/test");

test("Hard-wait", async ({ page }) => {
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
  //Logout
  await page.waitForTimeout(5000);
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.waitForTimeout(5000);
  await page.locator("#logout_sidebar_link").click();
});

test.only("Auto-wait", async ({ page }) => {
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
  //Logout
  await page.getByRole("button", { name: "Open Menu" }).click();
  await page.locator("#logout_sidebar_link").click();
});
