const{test,expect} = require('@playwright/test')

test('Register new user', async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.click('.text-reset')
    await page.fill('#firstName','Captain')
    await page.fill('#lastName','America')
    await page.fill('#userEmail','captainamerica@gmail.com')
    await page.fill('#userMobile','7463131131')
    await page.locator('[class*=custom-select]').selectOption('3: Engineer')
    // await page.waitForSelector('.form-group option')   //Need debug from here
    // await page.locator('.form-group option').nth(3).click()
    await page.click('[value="Male"]')
    await page.locator('#userPassword').fill('avengers@Assemble5')
    await page.fill('#confirmPassword','avengers@Assemble5')
    await page.click('[type="checkbox"]')
    await page.click('[type="submit"]')
    const accountCreated = await page.locator('.headcolor').textContent()
    await expect(accountCreated).toContain('Successfully')
    //await page.pause()
})

test('Login as existing user', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.fill('#userEmail','captainamerica@gmail.com')
    await page.fill('#userPassword','avengers@Assemble5')
    await page.click('#login')
    console.log(await page.locator('.card-body h5').nth(0).textContent())
    await page.waitForLoadState('networkidle')
    //If networkidle fails
    //await page.locator('.card-body h5').last().waitFor()  //waitFor methods works for one element only. For arrays we need to use first/last
    const productTitle = await page.locator('.card-body h5').allTextContents()
    console.log(productTitle)
    //await page.pause()
})

