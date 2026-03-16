import { test, request, expect } from "@playwright/test";

test("api chaining request", async () => {
  const apiContext = await request.newContext();
  //=======POST REQUEST=======
  const postRequest = await apiContext.post(
    "https://api.restful-api.dev/objects",
    {
      name: "Orange Book 2025",
      data: {
        year: 2025,
        price: 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
      },
    },
  );
  expect(postRequest.status()).toBe(200);
  const postResponseBody = await postRequest.json();
  expect(postResponseBody.id).toBeTruthy();
  const productId = await postResponseBody.id;
  console.log(productId);
  console.log(postResponseBody.createdAt);
  //========DELETE PRODUCT=========
  const deleteRequest = await apiContext.delete(
    `https://api.restful-api.dev/objects/${productId}`,
  );
  expect(deleteRequest.status()).toBe(200);
  const deleteJsonBody = await deleteRequest.json();
  console.log(deleteJsonBody.message);
});

//======================Mock Server=================

test.only("api chaining request with mock", async ({ page }) => {

  // ---- MOCK POST ----
  await page.route("https://url.com/objects", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: "12345",
        name: "Orange Book 2025",
        createdAt: "2026-03-03T10:00:00.000Z"
      }),
    });
  });

  // Open empty page (required for browser context)
  await page.goto("data:text/html,<html></html>");

  // POST using browser fetch
  const postResponse = await page.evaluate(async () => {
    const response = await fetch("https://url.com/objects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Orange Book 2025"
      }),
    });
    return response.json();
  });

  const productId = postResponse.id;
  console.log(productId);

  // ---- MOCK DELETE ----
  await page.route(`https://url.com/objects/${productId}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Object deleted successfully"
      }),
    });
  });

  const deleteResponse = await page.evaluate(async (id) => {
    const response = await fetch(`https://url.com/objects/${id}`, {
      method: "DELETE"
    });
    return response.json();
  }, productId);

  console.log(deleteResponse.message);

  expect(productId).toBe("12345");
});
