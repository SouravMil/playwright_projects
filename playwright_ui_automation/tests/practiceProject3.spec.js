const{test,expect,request} = require('@playwright/test');
const loginPayload = {userEmail: "captainamerica@gmail.com", userPassword: "avengers@Assemble5"}
let token;

test.beforeAll(async()=>
{
   const apiContext = await request.newContext();
   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data:loginPayload
    })
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    const token = loginResponseJson.token;
    console.log(token);

})

test.beforeEach(async()=>
{

}
)

test('Login through API', async({page})=>
{
    await page.addInitScript(value => 
    {
        window.localStorage.setItem('token',value)
    },token);
    await page.goto('https://rahulshettyacademy.com/api/ecom/auth/login');
    

})