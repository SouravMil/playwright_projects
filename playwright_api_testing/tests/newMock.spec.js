import { test, expect } from "@playwright/test";

test("api mock chaining request", async ({ page }) => {
  //Required once for browser context
  await page.goto("data:text/html,<html></html>");
  const prodId = 254789;
  //=====Mock Post====//
  await page.route("**/object", async (route, request) => {
    const method = request.method();
    const url = request.url();
    if (method === "POST" && url.endsWith('/object')) {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          id: prodId,
          name: "HippoBook 2026",
          createdAt: "2026-03-03T10:00:00.000Z",
        }),
      });
    } 
    //====GET====//
    else if(method === 'GET' && url.endsWith(`/object/${prodId}`)) {
        await route.fulfill({
            status:200,
            contentType: "application/json",
            body:JSON.stringify({
                id: prodId,
                name: 'HippoBook 2026',
            })
        })
    }
    //======PUT====//
    else if(method === "PUT" && url.includes(`/object/${prodId}`))
    {
        await route.fulfill({
            status:201,
            contentType:'application/json',
            body: JSON.stringify({
                name: 'HippoBook 2026 updated',
            }),
        });
    }
    //====DELETE====//
    else if(method === "DELETE" && url.includes(`/object/${prodId}`))
    {
        await route.fulfill({
            status:200,
            contentType: 'application/json',
            body: JSON.stringify({
                message: 'Object deleted successfully'
            })
        })
    }
     else {
      await route.continue();
    }
  });
  //====Trigger POST====//
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
  expect(postResponse.status).toEqual(201);
  const id = postResponse.body.id;
  //=====Trigger GET====//
  const getResponse = await page.evaluate(async(id)=>{
    const response = await fetch(`http://url.com/object/${id}`);
    return{staus: response.status, body: response.json()};
  },id);
  expect(getResponse.staus).toBe(200)
  //=====Trigger PUT====//

  //=====Trigger DELETE====//
});
