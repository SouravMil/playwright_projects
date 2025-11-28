const{test,expect,request}  = require('@playwright/test')
const loginPayload = {userEmail: "captainamerica@gmail.com", userPassword: "avengers@Assemble5"}
let token

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
    {
        data: loginPayload
    })
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);
    expect(loginResponse.ok()).toBeTruthy();
})

test('Api practice for login', async({page})=>
{
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value)
    }, token);
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
})