const {test,expect} = require('@playwright/test');

test('Locating multiple webElements', async ({page})=>{

    await page.goto('https://demoblaze.com/index.html')
    await page.click('id=login2')

   //Insert username and pwd
   await page.fill('#loginusername','pavanol')
   await page.fill("input[id='loginpassword']",'test@123')

   //click log in button
   await page.click('//button[normalize-space()="Log in"]')

   //locate all the anchor elements
   const links = await page.$$('a')

   for(const link of links){

    const linkText = await link.textContent()
    console.log(linkText)

   }

   page.waitForSelector('//div[@id="tbodyid"]//div//h4/a')
   const products=await page.$$('//div[@id="tbodyid"]//div//h4/a')

   for(const product of products){
    const productName = await product.textContent()
    console.log(productName)

   }


})