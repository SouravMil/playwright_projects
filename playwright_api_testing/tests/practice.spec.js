const { request, test, expect } = require("@playwright/test");

test("api chaining request", async () => {
  const apiContext = await request.newContext();
  //============POST REQUEST================
  const postRequest = await apiContext.post(
    "https://api.restful-api.dev/objects",
    {
      data: {
        name: "Orange MacElephant",
        data: {
          year: 2030,
          price: 1849.99,
          "CPU model": "Intel Core i9",
          "Hard disk size": "1 ZB",
        },
      },
    }
  );
  expect(postRequest.status()).toBe(200);
  const postJson = await postRequest.json();
  expect(postJson.id).toBeTruthy();
  const latestId = postJson.id;
  console.log(latestId);
  console.log(postJson.createdAt);
  //===============GET REQUEST===============
  const getResponse = await apiContext.get(
    `https://api.restful-api.dev/objects?id=${latestId}`
  );
  expect(getResponse.status()).toBe(200);
  const getJson = await getResponse.json();
  console.log(getJson.name);
  //===============POST REQUEST==============
  const putRequest = await apiContext.put(
    `https://api.restful-api.dev/objects/${latestId}`,
    {
      data: {
        name: "Orange MacElephant",
        data: {
          year: 2030,
          price: 2049.99,
          "CPU model": "Intel Core i9",
          "Hard disk size": "0.1 ZB",
          color: "silver",
        },
      },
    }
  );
  expect(putRequest.status()).toBe(200);
  const putJson = await putRequest.json();
  console.log(putJson.data[3]);
  console.log(putJson.updatedAt);
  //===============DELETE REQUEST============
  await apiContext.delete(`https://api.restful-api.dev/objects/${latestId}`);
});
