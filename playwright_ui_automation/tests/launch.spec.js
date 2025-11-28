const {test,expect} = require ('@playwright/test');

test('Home page', async ({page})=>{

   await page.goto('https://demoblaze.com/');
   //const pageTitle=page.title();
   await expect(page).toHaveTitle('STORE');
   await expect(page).toHaveURL('https://demoblaze.com/');
   const pageUrl = page.url();
   console.log('The page url is ',pageUrl);
   await page.close();

});