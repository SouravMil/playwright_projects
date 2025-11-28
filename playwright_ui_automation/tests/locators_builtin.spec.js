const {test,expect} = require('@playwright/test');

test('Testing builtin locators',async({page})=>{

    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    /*Get by altText*/
    const logo = await page.getByAltText('company-branding')
    await expect(logo).toBeVisible()

    /*Get by Placeholder*/
    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')

    /*Get by role*/
    await page.getByRole('button','{type="submit"}').click()

    /*Assertion for logged in page*/
   /* const menuBar = await page.locator('ul[class="oxd-main-menu"]')
    await expect(menuBar).toBeVisible()
    */

    /*await expect(await page.getByText('Admin')).toBeVisible()*/
    /*Asserttion the current user name*/
    const userName = await page.locator('//p[@class="oxd-userdropdown-name"]').textContent()
    await expect(await page.getByText(userName)).toBeVisible()

})