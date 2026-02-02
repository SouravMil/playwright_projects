import {expect} from '@playwright/test';
class end2endPracticeShippingInfoPage {
  constructor(page) {
    this.page = page;
    this.shippingPageTitle = page.locator(".title");
    this.totalPrice = page.locator(".summary_total_label");
    this.finishButton = page.locator("#finish");

  }
  async landingShippingInfoPage() {
    await expect(this.shippingPageTitle).toBeVisible();
    console.log(await this.totalPrice.textContent());
    await this.finishButton.click();
  }
}
export default end2endPracticeShippingInfoPage;