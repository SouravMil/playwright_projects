const {test,expect,request} = require('@playwright/test');

test('api CRUD operation',async()=>
{
    const apiContext = await request.newContext();

    //Perform POST request===============
    const postRequest = await apiContext.post('https://jsonplaceholder.typicode.com/posts',{
        data: 
        {
            title: 'Certified motherboard',
            body: 'This is about the most talented CM of WB',
            userId: 1
        }
    });
    expect(postRequest.status()).toBe(201);
    const postJson = await postRequest.json();
    const objId = postJson.id;
    console.log(objId);

    //Perform GET request=================
    const getRequest = await apiContext.get(`https://jsonplaceholder.typicode.com/posts/${objId}`);
    expect(getRequest.status()).toBe(200);
    const getJson = await getRequest.json();
    console.log(getJson);

    //Perform PUT request==================
    const putRequest = await apiContext.put(`https://jsonplaceholder.typicode.com/posts/${objId}`,{
        data:
        {
            title: 'Certified motherboard',
            body: 'This is about the most talented CMs nephew of WB',
            userId: 111
        }
    });
    expect(putRequest.status()).toBe(201);
    const putJson = await putRequest.json();
    console.log(putJson);

    //Perform GET request to verify new data============
    const get2Request = await apiContext.get(`https://jsonplaceholder.typicode.com/posts/${objId}`);
    expect(get2Request.status()).toBe(200);
    const get2Json = await get2Request.json();
    expect(get2Json).toEqual(putJson);

    //Perform DELETE request================
    const delRequest = await apiContext.delete(`https://jsonplaceholder.typicode.com/posts/${objId}`);
    expect(delRequest.status()).toBe(204);
});