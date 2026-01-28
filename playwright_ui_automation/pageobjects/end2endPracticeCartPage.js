const { expect } = require("@playwright/test");
class end2endPracticeCartPage {
  constructor(page) {
    this.page = page;
    this.shoppingCart = page.locator(".shopping_cart_link");
    this.continueShopping = page.locator("#continue-shopping");
    this.cartItems = page.locator(".cart_item");
    this.cartPageTitle = page.locator(".title");
    this.itemsAddedtoCart = page.locator(".cart_item_label");
    this.checkOut = page.locator("#checkout");
  }
  async validateCartPageLanding() {
    await this.shoppingCart.click();
    expect(await this.cartPageTitle.textContent()).toEqual("Your Cart");
  }
  async backToShopping() {
    await this.continueShopping.click();
  }
  async returnToCartPage() {
    await this.shoppingCart.click();
  }
  async cartItemsCount() {
    return await this.cartItems.count();
  }
  async removeExtraFromCart(validProduct) {
    // let yourCart = page.locator(".cart_item_label");
    for (let i = 0; i < (await this.itemsAddedtoCart.count()); i++) {
      let cartItemTitle = await this.itemsAddedtoCart
        .nth(i)
        .locator(".inventory_item_name")
        .textContent();
      if (cartItemTitle !== validProduct[0]) {
        await this.itemsAddedtoCart.nth(i).locator(".cart_button").click();
        this.itemsAddedtoCart;
        i = -1;
      }
    }
    expect(await this.itemsAddedtoCart.count()).toEqual(validProduct.length);
    await this.checkOut.click();
  }
}
export default end2endPracticeCartPage;
