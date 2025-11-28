const { test, request, expect } = require("@playwright/test");

test("api chaining request", async () => {
  const apiContext = await request.newContext();
  //=======================POST request=====================

  const postRequest = await apiContext.post(
    "https://api.restful-api.dev/objects",
    {
      data: {
        name: "Pink Elephant",
        data: {
          year: 3333,
          price: 280000,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB",
        },
      },
    }
  );
  expect(postRequest.status()).toBe(200);
  const jsonPostResponse = await postRequest.json();
  expect(jsonPostResponse.id).toBeTruthy();
  console.log(jsonPostResponse.createdAt);
  const latestId = jsonPostResponse.id;
  console.log(latestId);

  //====================GET request==========================

  const getResponse = await apiContext.get(
    `https://api.restful-api.dev/objects?id=${latestId}`
  );
  expect(getResponse.status()).toBe(200);
  const getJson = await getResponse.json();
  console.log(getJson[0].id);
  
  //====================PUT request==========================

  const putResponse = await apiContext.put(
    `https://api.restful-api.dev/objects/${latestId}`,
    {
      data: {
        name: "Rainbow Elephant",
        data: {
          year: 10000,
          price: 28000000,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 TB",
        },
      },
    }
  );
  expect(putResponse.status()).toBe(200);
  const putJson = await putResponse.json();
  console.log(putJson.updatedAt);

  //===================DELETE request==========================
  const delResponse = await apiContext.delete(
    `https://api.restful-api.dev/objects/${latestId}`
  );
  expect(delResponse.status()).toBe(200);
  const delJson = await delResponse.json();
  console.log(await delJson.message);
});
