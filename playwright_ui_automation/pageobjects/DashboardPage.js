class DashboardPage 
{
    constructor(page)
    {
        this.page = page;
        this.productList = page.locator('.card-body');
        this.cartButton =page.locator('button[routerlink*=cart]')
        this.productsText = page.locator('.card-body b');
    }
    async searchProductAddCart(addProduct)
    {
        const titles = this.productsText.allTextContents();
        console.log(titles);
        const totalCount = await this.productList.count();
            for(let i=0;i<totalCount;i++)
            {
                if(await this.productList.nth(i).locator('b').textContent() == addProduct)
                {
                    await this.productList.nth(i).locator('text= Add To Cart').click();
                    break;
                }
            }
    }
    async navigatetoCart()
    {
        await this.cartButton.click();
        await this.page.locator('div li').nth(1).waitFor();
        
    }
}
module.exports = {DashboardPage};