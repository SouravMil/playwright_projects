const { test, expect } = require("@playwright/test");
const { POManager } = require("../pageobjects/POManager");
const testData = JSON.parse(
  JSON.stringify(require("../test-utils/eComm_e2e_POMtestData.json"))
);

for (const data of testData) {
  test(`client application test of ${data.addProduct}`, async ({ page }) => {
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    //const cartLabel = page.locator('button[class*=btn-custom]')

    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.addProduct);
    await dashboardPage.navigatetoCart();
    //await expect(page.locator('//nav[1]/ul')).toBeVisible();

    await page.locator("div li").nth(1).waitFor();
    const boolean = await page
      .locator('h3:has-text("' + data.addProduct + '")')
      .isVisible();
    expect(boolean).toBeTruthy();
    //await expect(page.locator('.cartSection h3').textContent()).toEqual(addProduct)
    await page.locator('button:has-text("Checkout")').click();
    await page.locator(".payment__cc").waitFor();
    await page.locator("input[type=text]").nth(1).fill("321");
    await page.locator("input[type=text]").nth(2).fill("Steve Rogger");
    await page.locator("input[type=text]").nth(3).fill("rahulshettyacademy");
    //await page.click('button[type=submit]')
    //await page.locator('[placeholder*="Country"]').waitFor()
    await page
      .locator('[placeholder*="Country"]')
      .pressSequentially("ind", { delay: 150 });
    const dropdown = await page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let j = 0; j < optionsCount; j++) {
      const text = await dropdown.locator("button").nth(j).textContent();
      if (text === " India") {
        await dropdown.locator("button").nth(j).click();
        break;
      }
    }
    const countryName = await page
      .locator('[placeholder*="Country"]')
      .inputValue();
    console.log(countryName);
    const loggedUser = await page.locator('label[type="text"]').textContent();
    // const customerEmail = await page.locator('.user__name [type="text"]').last().inputValue()
    // console.log(customerEmail)
    await expect(loggedUser).toEqual(data.username);
    //apply coupon code click
    await page.click("button[type=submit]");
    //Place order
    await page.locator("a.ng-star-inserted").click();
    //Capture order finale text
    const orderPlaced = await page.locator(".hero-primary");
    await expect(orderPlaced).toBeVisible();
    await expect(orderPlaced).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator("label.ng-star-inserted").textContent();
    const orderNumber = await orderID.split(" ")[2];
    console.log(orderNumber);
    //Verify the recently placed order is visible on order History
    await page.locator("button[routerlink*=myorder]").click();
    await page.waitForLoadState("networkidle");
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr"); //Loop does not work
    for (let i = 0; i < (await rows.count()); i++) {
      const rowOrderHash = await rows.nth(i).locator("th").textContent();
      if (await orderNumber.includes(rowOrderHash)) {
        await rows.nth(i).locator(".btn-primary").first().click();
        break;
      }
    }
    await page.locator(".email-title").waitFor();
    const viewOrder = await page.locator(".email-title").textContent();
    expect(viewOrder).toEqual(" order summary ");
    const confirmOrderNumber = await page.locator(".col-text").textContent();
    expect(confirmOrderNumber.includes(orderNumber)).toBeTruthy();
    console.log(await page.locator(".title").textContent());
  });
}
