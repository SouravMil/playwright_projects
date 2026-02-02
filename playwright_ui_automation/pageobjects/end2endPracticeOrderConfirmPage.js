import{expect} from '@playwright/test';
class end2endPracticeOrderConfirmPage {
  constructor(page) {
    this.page = page;
    this.orderPlaced = page.locator(".complete-header");
    this.backToProducts = page.locator("#back-to-products");
  }
  async orderConfirmation() {
    expect(await this.orderPlaced.textContent()).toContain("Thank you");
  }
  async backtoShoppingPage() {
    await expect(this.backToProducts).toBeVisible();
    await this.backToProducts.click();
  }
}
export default end2endPracticeOrderConfirmPage;
