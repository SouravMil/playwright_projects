const{test,expect} = require('@playwright/test')

test('e2e ecommerce test',async({page})=>
{  
    const addProduct = 'iphone 13 pro';
    const email = 'captainamerica@gmail.com';
    const productList = await page.locator('.card-body');
    //const cartLabel = page.locator('button[class*=btn-custom]')
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.fill('#userEmail',email);
    await page.fill('#userPassword','avengers@Assemble5');
    await page.click('#login');
    await page.waitForLoadState('networkidle');
    await page.locator('.card-body').first().waitFor();
    await expect(page.locator('//nav[1]/ul')).toBeVisible();
    //await expect(page.locator('.fa-home')).toBeVisible()
    const totalCount = await productList.count();
    for(let i=0;i<totalCount;i++)
    {
        if(await productList.nth(i).locator('b').textContent() == addProduct)
        {
            await productList.nth(i).locator('text= Add To Cart').click();
            break;
        }
    }
    await page.locator('button[routerlink*=cart]').click();
    await page.locator('div li').nth(1).waitFor();
    const boolean = await page.locator('h3:has-text("iphone 13 pro")').isVisible();
    await expect(boolean).toBeTruthy();
    //await expect(page.locator('.cartSection h3').textContent()).toEqual(addProduct)
    await page.locator('button:has-text("Checkout")').click();
    await page.locator('.payment__cc').waitFor();
    await page.locator('input[type=text]').nth(1).fill('321');
    await page.locator('input[type=text]').nth(2).fill('Steve Rogger');
    await page.locator('input[type=text]').nth(3).fill('rahulshettyacademy');
    //await page.click('button[type=submit]')
    //await page.locator('[placeholder*="Country"]').waitFor()
    await page.locator('[placeholder*="Country"]').pressSequentially('ind',{delay:150});
    const dropdown =await page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for(let j=0;j<optionsCount;j++)
    {
         const text = await dropdown.locator('button').nth(j).textContent();
         if(text === " India")
         {
            await dropdown.locator('button').nth(j).click();
            break;
         }
    }
    const countryName = await page.locator('[placeholder*="Country"]').inputValue();
    console.log(countryName);
    const loggedUser = await page.locator('label[type="text"]').textContent();
    // const customerEmail = await page.locator('.user__name [type="text"]').last().inputValue()
    // console.log(customerEmail)
    await expect(loggedUser).toEqual(email);
    //apply coupon code click
    await page.click('button[type=submit]');
    //Place order
    await page.locator('a.ng-star-inserted').click();
    //Capture order finale text
    const orderPlaced = await page.locator('.hero-primary');
    await expect(orderPlaced).toBeVisible();
    await expect(orderPlaced).toHaveText(' Thankyou for the order. ');
    const orderID = await page.locator('label.ng-star-inserted').textContent();
    const orderNumber = await orderID.split(" ")[2];
    console.log(orderNumber);
    //Verify the recently placed order is visible on order History
    await page.locator('button[routerlink*=myorder]').click();
    await page.waitForLoadState('networkidle')
    await page.locator('tbody').waitFor();
    const rows = await page.locator('tbody tr'); //Loop does not work
    for(let i=0;i<await rows.count();i++)
    {
        const rowOrderHash = await rows.nth(i).locator('th').textContent();
        if(await orderNumber.includes(rowOrderHash))
        {
            await rows.nth(i).locator('.btn-primary').first().click();
            break;
        }
    }
    await page.locator('.email-title').waitFor();
    const viewOrder = await page.locator('.email-title').textContent();
    expect(viewOrder).toEqual(' order summary ');
    const confirmOrderNumber = await page.locator('.col-text').textContent();
    expect(confirmOrderNumber.includes(orderNumber)).toBeTruthy();
    console.log(await page.locator('.title').textContent());
})
