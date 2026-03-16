import { test, expect, request } from '@playwright/test';
const loginPayload = {
  userEmail: "captainamerica@gmail.com",
  userPassword: "avengers@Assemble5",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }],
};
let authToken;
let orderId;

test.beforeAll('all API action',async()=>{
    //user login
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login',{
        data: loginPayload
    })
    expect(loginResponse.ok()).toBeTruthy();
    const loginJson = await loginResponse.json();
    authToken = await loginJson.token;
    console.log()

    //create order
    const createOrder = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',{
        data: JSON.stringify(orderPayload),
        headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json'
        }
    });
    expect(createOrder.ok()).toBeTruthy();
    const orderJson = await createOrder.json();
//     //{
//     "orders": [
//         "692bef4a5008f6a909435854"
//     ],
//     "productOrderId": [
//         "68a961459320a140fe1ca57a"
//     ],
//     "message": "Order Placed Successfully"
// }//
    orderId = orderJson.orders[0].productOrderId;
    console.log(orderId);
});

test('login and verify the order is placed',async({page})=>{
    
    await page.addInitScript(value =>{
        window.localStorage.setItem('token',value)
    },authToken);
    await page.goto('https://rahulshettyacademy.com/client/');
    await page.getByRole('button', {name: "ORDERS"}).click();
    await page.locator('.container').nth(0).waitFor();
    const orderHash = await page.locator('tbody th').nth(0).textContent();
    console.log(orderHash);
    const prodName = await page.locator('tbody td').nth(1).textContent();
    expect(prodName).toEqual('ZARA COAT 3');
    console.log(prodName);

})