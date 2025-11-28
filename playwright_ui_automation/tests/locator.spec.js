const {test, expect} = require('@playwright/test');

test('Locator', async ({page})=>{
    //Open webPage
   await page.goto("https://demoblaze.com/")
   //await page.locator('id=login2').click()
   //Click on Login button
   await page.click('id=login2')

   //Insert username and pwd
   await page.fill('#loginusername','pavanol')
   await page.fill("input[id='loginpassword']",'test@123')

   //click log in button
   await page.click('//button[normalize-space()="Log in"]')

   //Visibility of logout

   const logoutLink = await page.locator('//a[normalize-space()="Log out"]')
   await expect(logoutLink).toBeVisible(); 

   await page.close();



})