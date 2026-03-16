import { test, expect, request } from "@playwright/test";

test("API chaining request", async () => {
  const apiContext = await request.newContext();
  //============POST REQUEST============//
  const postRequest = await apiContext.post(
    "https://api.restful-api.dev/objects",
    {
      name: "Orange CherryBook pro 2026",
      data: {
        year: 2026,
        price: 1849.99,
        "CPU model": "Intel Core i90",
        "Hard disk size": "1 ZB",
      },
    },
  );
  expect(postRequest.status()).toBe(200);
  const postJson = await postRequest.json();
  expect(postJson.id).toBeTruthy();
  expect(postRequest.status()).toBe(200);
  const productId = postJson.id;
  console.log("Created resource ID:", productId);
  const createdTimeStamp = new Date(postJson.createdAt).toISOString();
  console.log(createdTimeStamp);

  //============GET REQUEST==========//
  const getRequest = await apiContext.get(
    `https://api.restful-api.dev/objects/${productId}`,
  );
  expect(getRequest.status()).toBe(200);
  const getJson = await getRequest.json();
  expect(getJson.id).toEqual(productId);

  //============PUT REQUEST===========//
  const putRequest = await apiContext.put(
    `https://api.restful-api.dev/objects/${productId}`,
    {
      data: {
        name: "Banana CherryBook pro 2026",
        data: {
          year: 2026,
          price: 2049.99,
          "CPU model": "Intel Core f9",
          "Hard disk size": "1 MB",
          color: "silver",
        },
      },
    },
  );
  expect(putRequest.status()).toBe(200);
  const putJson = await putRequest.json();
  const updatedTimeStamp = new Date(putJson.updatedAt).toISOString();
  console.log(updatedTimeStamp);
  expect(putJson.data.color).toBe("silver");

  //===========DELETE REQUEST============//
  const delRequest = await apiContext.delete(
    `https://api.restful-api.dev/objects/${productId}`,
  );
  expect(delRequest.status()).toBe(200);
  const delJson = await delRequest.json();
  expect(delJson.message).toContain("deleted");
  console.log(delJson.message);
});
