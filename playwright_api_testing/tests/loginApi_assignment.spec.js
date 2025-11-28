const {test,expect,request} = require('@playwright/test');
const loginPayload = {userEmail: "captainamerica@gmail.com", userPassword: "avengers@Assemble5"};

let loginToken;

test.beforeAll('login through API',async()=>{
    const apiContext = await request.newContext();

    //Login using api call
    const loginRequest = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{
        data: loginPayload
    });
    expect(loginRequest.ok()).toBeTruthy();
    const loginJson = await loginRequest.json();
    loginToken = await loginJson.token;
    console.log(loginToken);
})

test('Faster execution of order', async({page})=>
{
    await page.addInitScript(value=>
    {
        window.localStorage.setItem('token',value)
    },loginToken);

    await page.goto('https://rahulshettyacademy.com/client');
})