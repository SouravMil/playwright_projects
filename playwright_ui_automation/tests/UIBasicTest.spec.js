//Author: Sourav Mil
const{test,expect} = require('@playwright/test')

test('@Web Browser context palywright test', async ({browser})=>{

    const context = await browser.newContext()
    const page = await context.newPage()
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await page.locator('input#username').fill('rahulshetty')
    await page.fill('[type=password]','learning')
    await page.click('#signInBtn')
    const errorText = await page.locator('[style*="block"]').textContent()
    console.log(errorText)
    await expect(errorText).toContain('Incorrect')
    await page.fill('input#username','rahulshettyacademy')
    await page.click('#signInBtn')
    console.log(await page.locator('.card-body a').first().textContent())
    console.log(await page.locator('.card-body a').nth(1).textContent())
})

test('@Web Radio button assertion', async ({page})=>{
    const radioUser = await page.locator('.radiotextsty').last()
    const textBlink = page.locator('[href*=documents-request]')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    await radioUser.click()
    await page.click('#okayBtn')
    await expect(radioUser).toBeChecked()
    await page.locator('#terms').click()
    await expect(page.locator('#terms')).toBeChecked()
    await page.locator('#terms').uncheck()
    await expect(await page.locator('#terms').isChecked()).toBeFalsy()
    await expect(textBlink).toHaveAttribute('class','blinkingText')
    //await page.pause()
})

test('@Web Child windown handle',async({browser})=>{
    const context = await browser.newContext()
    const page = await context.newPage()
    const textBlink = page.locator('[href*=documents-request]')
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/')
    //Events should run parallaly
    const [newPage] = await Promise.all([
    context.waitForEvent('page'), //listen for any new page
    textBlink.click(),
    ])
    const highlightText = await newPage.locator('.red').textContent()
    expect(highlightText).toEqual('Please email us at mentor@rahulshettyacademy.com with below template to receive response ')
    const arrayText = highlightText.split('@')
    const domain = arrayText[1].split(' ')[0]
    //console.log(domain)
    await page.locator('input#username').fill(domain)
    console.log(await page.locator('input#username').inputValue())
})