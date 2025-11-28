const {test,expect,request} = require('@playwright/test');
const loginPayload = {userEmail: "captainamerica@gmail.com", userPassword: "avengers@Assemble5"};
const createOrderPayload = {orders: [{country: "Cuba", productOrderedId: "68a961959320a140fe1ca57e"}]};

let sessionToken;
let orderId;

test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    //Login API
    const loginresponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        {
            data: loginPayload
        });
    expect(loginresponse.ok()).toBeTruthy();
    const responseJson = await loginresponse.json();
    sessionToken = await responseJson.token;
    console.log(sessionToken);

    //create order API
    const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
        data   : createOrderPayload,
        headers : {
            'Authorization' : sessionToken,
            'Content-type'  : 'application/json'
        },
    })
    const orderResponseJson = await orderResponse.json();
    orderId = orderResponseJson.orders[0];
    console.log(orderResponseJson);
});

test('@API Place the order',async({page})=>
{  
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value);
    },sessionToken)
    
    //Verify the order is present on Order History page
    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/dash');
    //Verify the recently placed order is visible on order History
    await page.locator('button[routerlink*=myorder]').click();
    await page.waitForLoadState('networkidle')
    await page.locator('tbody').waitFor();
    const rows = page.locator('tbody tr'); 
    for(let i=0;i<await rows.count();i++)
    {
        const rowOrderHash = await rows.nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderHash))
        {
            await rows.nth(i).locator('.btn-primary').first().click();
            break;
        }
    }
    await page.locator('.email-title').waitFor();
    const viewOrder = await page.locator('.email-title').textContent();
    expect(viewOrder).toEqual(' order summary ');
    const confirmOrderNumber = await page.locator('.col-text').textContent();
    expect(confirmOrderNumber.includes(orderId)).toBeTruthy();
    console.log(await page.locator('.title').textContent());
})
