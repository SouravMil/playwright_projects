import { expect } from "@playwright/test";

class end2endPracticeProductPage {
  constructor(page) {
    this.page = page;
    this.pageTitle = page.locator(".title");
    this.addToCart = page.locator(".btn_inventory");
  }
  async productPageValidation() {
    //Clicking addToCart buttons for all the visible products
    expect(await this.pageTitle.textContent()).toEqual("Products");
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
  async totalVisibleProducts()
  {
    return await this.addToCart.count();
  }
}
export default end2endPracticeProductPage;
