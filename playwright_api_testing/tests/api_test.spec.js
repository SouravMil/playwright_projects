const { test, expect, request } = require("@playwright/test");

test("api GET request", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2");
  expect(response.status()).toBe(200);
  const text = await response.text();
  expect(text).toContain("michael");
  console.log(await response.json());
});

test("api POST request", async ({ playwright }) => {
  // Disable all proxy at environment-level
  process.env.HTTP_PROXY = "";
  process.env.HTTPS_PROXY = "";
  process.env.http_proxy = "";
  process.env.https_proxy = "";
  const apiContext = await playwright.request.newContext();
  const response = await apiContext.post("https://reqres.in/api/users", {
    data: {
      name: "Steve",
      job: "SDET",
    },
  });
  //   expect(response.status()).toBe(201);
  //   const jsonResp = await response.json();
  //   expect(jsonResp.name).toBe("Steve");
  console.log(await response.text());
});
