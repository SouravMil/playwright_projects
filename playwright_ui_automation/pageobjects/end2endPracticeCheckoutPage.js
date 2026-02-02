import{expect} from '@playwright/test';
class end2endPracticeCheckoutPage
{
    constructor(page)
    {
        this.page = page;
        this.checkoutPageTitle = page.locator(".title");
        this.visibleCartItems = page.locator(".shopping_cart_badge");
        this.cancelButton = page.getByRole("button", { name: "Cancel" });
        this.checkoutButton = page.locator("#checkout");
        this.firstName = page.locator("#first-name");
        this.lastName = page.locator("#last-name");
        this.postalCode = page.locator("#postal-code");
        this.shippingConfirmPage = page.locator("#continue");

    }
    async landingCheckoutPage(validProduct)
    {
        await expect(this.checkoutPageTitle).toBeVisible();
        await this.visibleCartItems.textContent();
        expect(await this.visibleCartItems.count()).toEqual(validProduct.length);
        expect(await this.checkoutPageTitle.textContent()).toEqual(
        "Checkout: Your Information");
    }
    async returnBackCartPage()
    {
        await this.cancelButton.click();
    }
    async checkoutPageFormfill()
    {
        await this.checkoutButton.click();
        await this.firstName.fill('Steve');
        await this.lastName.fill('Michael');
        await this.postalCode.fill('411102');
        await this.shippingConfirmPage.click();
    }
}
export default end2endPracticeCheckoutPage;