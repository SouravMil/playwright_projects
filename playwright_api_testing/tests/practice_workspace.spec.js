const { test, expect, request } = require("@playwright/test");
const loginPayload = {
  userEmail: "captainamerica@gmail.com",
  userPassword: "avengers@Assemble5",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "68a961459320a140fe1ca57a" }],
};

let authToken;

test.beforeAll("api actions", async () => {
  const apiContext = await request.newContext();

  //User login======
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginPayload,
    }
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginJson = await loginResponse.json();
  authToken = await loginJson.token;
  console.log(authToken);

  //create order============
  const createOrder = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderPayload,
      headers: {
        Authorization: authToken,
        "Content-type": "application/json",
      },
    }
  );
  expect(createOrder.ok()).toBeTruthy();
  const orderJson = await createOrder.json();
  const orderId = orderJson.orders[0];
  console.log(orderId);
});

test("Check Dashboard products", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, authToken);
  await page.goto("https://rahulshettyacademy.com/client/");
  const productList = page.locator(".card-body");
  const product = productList.filter({
    has: page.locator("b"),
    hasText: "ZARA COAT 3",
  });
  await product.getByRole("button", { name: "Add To Cart" }).click();
  //await page.locator('.card-body').filter({hasText:'ZARA COAT 3'}).getByText('Add To Cart').click();
});
