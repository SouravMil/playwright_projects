const { test, request, expect } = require("@playwright/test");

test("api GET request", async () => {
  const apiContext = await request.newContext();
  const getRequest = await apiContext.get(
    "https://api.restful-api.dev/objects"
  );
  expect(getRequest.status()).toBe(200);
  const responseJson = await getRequest.json();
  const productDetails = await responseJson.find(
    (product) => product.name == "Beats Studio3 Wireless"
  );
  console.log(productDetails);
  //console.log(getRequest);
});

test("another GET request", async () => {
  const apiContext = await request.newContext();
  const productArray = await apiContext.get(
    "https://api.restful-api.dev/objects"
  );
  const jsonBody = await productArray.json();
  const appleIpad = await jsonBody.find(
    (product) => product.name == "Apple iPad Air"
  );
  console.log(appleIpad?.id);
  expect(productArray.status()).toBe(200);
});

test("api POST request", async () => {
  const apiContext = await request.newContext();
  const newProduct = await apiContext.post(
    "https://api.restful-api.dev/objects",
    {
      data: {
        name: "Test Apple iPhone 22 pro",
        data: {
          year: 2035,
          price: 1849.99,
          "CPU model": "Intel Core i39",
          "Hard disk size": "1 ZB",
        },
      },
    }
  );
  expect(newProduct.status()).toBe(200);
  const responseJson = await newProduct.json();
  expect(responseJson.id).toBeTruthy();
  console.log(await responseJson.id);
});

test("api PUT request", async () => {
  const apiContext = await request.newContext();
  const putRequest = await apiContext.put(
    "https://api.restful-api.dev/objects/ff8081819782e69e019abb909179736f",
    {
      data: {
        name: "Test Apple iPhone 22 pro",
        data: {
          year: 3035,
          price: 204999,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB",
          color: "silver",
        },
      },
    }
  );
  const putResponse = await putRequest.json();
  expect(putResponse.id).toBeTruthy();
  expect(putRequest.status()).toBe(200);
  console.log(await putResponse.data.year);
});

test("api DELETE request", async () => {
  const apiContext = await request.newContext();
  const deleteRequest = await apiContext.delete(
    "https://api.restful-api.dev/objects/ff8081819782e69e019abb909179736f"
  );
  expect(deleteRequest.status()).toBe(200);
  const jsonResponse = await deleteRequest.json();
  console.log(jsonResponse.message);
});
