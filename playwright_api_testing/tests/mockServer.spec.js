import { test, expect } from "@playwright/test";

test("api mock server post and delete", async ({ page }) => {
  //Empty page, required for browser context
  await page.goto("data:text/html,<html></html>");
  //===Mock Post===
  await page.route("http://url.com/object", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: 123456,
        name: "HippoBook 2026",
        createdAt: "2026-03-03T10:00:00.000Z",
      }),
    });
  });
  

  //post call using browser fetch
  const postResponse = await page.evaluate(async () => {
    const response = await fetch("http://url.com/object", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "HippoBook 2026",
      }),
    });
    return { status: response.status, body: await response.json() };
  });
  const productID = postResponse.body.id;
  console.log(productID);
  expect(postResponse.status).toEqual(200);
  expect(postResponse.body.id).toBeTruthy();

  //===Mock Get===//
  await page.route(`http://url.com/object/${productID}`, async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        name: "HippoBook 2026",
      }),
    });
  });
  //empty page for browser context
    await page.goto("data:text/html,<html></html>");
});
