const {test,expect,request} = require('@playwright/test');
const loginPayload = {username: "captainamerica@gmail.com", password: "avengers@Assemble5"};
let loginToken;

test.beforeAll(async()=>
{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: loginPayload
        })
        const loginResponseJson = await loginResponse.json();
        loginToken = await loginResponseJson.token;
        const tok = await loginResponseJson.token;
        console.log(tok);
        
});

test('Api login', async({page})=>
{
    await page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value)
    },loginToken)
    await page.goto('https://rahulshettyacademy.com/client');
});