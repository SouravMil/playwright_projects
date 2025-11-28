//Author: Sourav Mil
const{test,expect} = require('@playwright/test');

test('AssertionTest', async ({page})=>{

    await page.goto('https://demo.nopcommerce.com/register')

    //Validate the right url
    await expect.toHaveURL('https://demo.nopcommerce.com/register')

    //Validate the page title
    await expect.toHaveTitle('nopCommerce demo store. Register')

    //Validate if an element is visible
    const pageLogo = await page.locator('.header-logo')
    await expect(pageLogo).toBeVisible();

    //Validate if element is enabled
    const searchBox = await page.locator('#small-searchterms')
    await expect(searchBox).toBeEnabled()

    //Validate if element is disabled
    /*const firstNameRequired = await page.locator('//span[@data-valmsg-for="FirstName"]');
    await expect(firstNameRequired).toBeDisabled()*/

    //validate if radioButton is checked
    const maleRadioButton = await page.locator('#gender-male')
    await maleRadioButton.click()
    await expect(maleRadioButton).toBeChecked()

    //validate if checkbox is checked
    const checkNewsletter=await page.locator('#Newsletter')
    //await checkNewsletter.click()
    await expect(checkNewsletter).toBeChecked()

    //validate if element has attribute
    const submitButton=await page.locator('#register-button')
    await expect(submitButton).toHaveAttribute('type','submit');

    //toHaveText - exact text content of an element
    await expect(page.locator('.page-title h1')).toHaveText('Register')

    //toContainText - partial match of text 
    await expect(page.locator('.page-title h1')).toContainText('Regi')

    //Validate if input box has any value
    const lastNameBox=await page.locator('#LastName')
    await lastNameBox.fill('Kohli')
    await expect(lastNameBox).toHaveValue('Kohli')

    //Total count of element
    await page.goto('https://demo.nopcommerce.com/notebooks')
    const images=await page.locator('img')
    await expect(images).toHaveCount(7)
                                          



} )
