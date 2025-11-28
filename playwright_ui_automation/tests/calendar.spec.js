//Author: Sourav Mil
const{test,expect} = require('@playwright/test')

test('Handle calendar dynamically',async({page})=>{
    const month = "8";
    const day = "31";
    const year = "2027";
    const expectedvalue = [month,day,year];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.locator('.react-calendar__navigation__label').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(month-1).click();
    await page.locator(`//abbr[contains(@aria-label,'August') and text()="${day}"]`).click();

    const input = page.locator('.react-date-picker__inputGroup__input');
    for(let i=0;i<expectedvalue.length;i++)
    {
        const value = await input.nth(i).inputValue();
        expect(value).toEqual(expectedvalue[i]);
    }






})