const { test, expect } = require("@playwright/test");

test("Form Automation & Validation", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://demoqa.com/automation-practice-form");
  await page.fill("#firstName", "Robin");
  await page.fill("#lastName", "Hood");
  await page.fill("#userEmail", "robinhood@example.com");
  const genderList = page.locator("#genterWrapper .custom-control");
  for (let i = 0; i < (await genderList.count()); i++) {
    const genderLabel = await genderList
      .nth(i)
      .locator(".custom-control-label")
      .textContent();
    if (genderLabel === "Male") {
      await genderList.nth(i).locator(".custom-control-label").click();
    }
  }
  await page.fill("#userNumber", "987654321");
  // const calendarPlaceholder = page.locator('#dateOfBirthInput');
  // await calendarPlaceholder.click();
  // const calendarPop = calendarPlaceholder.locator('.react-datepicker__month-container');//// looks good
  // const monthDropdown = calendarPop.locator('.react-datepicker__month-dropdown-container');
  // await monthDropdown.selectOption('.react-datepicker__month-select','August');
  // const yearDropdown = calendarPop.locator('.react-datepicker__year-dropdown-container');
  // await yearDropdown.selectOption('.react-datepicker__year-select','1947');
  // await calendarPop.locator('.react-datepicker__month').getByText('15').click();
  // expect(calendar).toHaveValue('15 Aug 1947');
  const hobbies = page
    .locator("#hobbiesWrapper")
    .locator(".col-md-9")
    .nth(5)
    .locator(".custom-checkbox");
  for (let j = 0; j < (await hobbies.count()); j++) 
    {
      const hobbyText = await hobbies.nth(i).locator('custom-control-label').textContent();
      if(hobbyText === 'Music')
      {
        await hobbies.nth(i).locator('.custom-control-input').click();
      }
    }
});
