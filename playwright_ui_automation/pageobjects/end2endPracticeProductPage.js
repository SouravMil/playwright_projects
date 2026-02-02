import { expect } from "@playwright/test";

class end2endPracticeProductPage {
  constructor(page) {
    this.page = page;
    this.productPageTitle = page.locator(".title");
    this.addToCart = page.locator(".btn_inventory");
    this.pageHeader = page.locator(".app_logo");
    this.sideMenuBar = page.locator("#react-burger-menu-btn");
    this.signOutButton = page.getByText("Logout", { exact: true });
  }
  async productPageValidation() {
    //Clicking addToCart buttons for all the visible products
    expect(await this.productPageTitle.textContent()).toEqual("Products");
  }
  async addProductsToCart() {
    for (let i = 0; i < (await this.addToCart.count()) - 2; i++) {
      await this.addToCart.nth(i).click();
    }
  }
  async addRemainingToCart() {
    for (let i = 0; i < (await this.addToCart.count()); i++) {
      if ((await this.addToCart.nth(i).textContent()) === "Add to cart") {
        await this.addToCart.nth(i).click();
      }
    }
  }
  async totalVisibleProducts() {
    return await this.addToCart.count();
  }
  async productPageLanding() {
    expect(await this.pageHeader.textContent()).toEqual("Swag Labs");
  }
  async signOut() {
    await this.sideMenuBar.click();
    await this.signOutButton.click();
  }
}
export default end2endPracticeProductPage;
