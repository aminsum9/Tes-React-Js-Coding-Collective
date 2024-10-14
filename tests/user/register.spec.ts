import { test, expect } from '@playwright/test';
import data from '@data/user/register/register.json';
import {BASE_URL} from '@src/config/url.js'

test('[+] New user must be authenticated and able to register using API', async ({ request }) => {

    const response = await request.post(`${BASE_URL}auth/register`, {
        data: data
    });

    // convert response to string
    const bodyResponse = (await response.body()).toString();
    const bodyResponseToJson = JSON.parse(bodyResponse);
    console.log(bodyResponseToJson);

    // expected result (status and response)
    expect(response.status()).toBe(200);
    expect(bodyResponseToJson.data.token).toBeDefined();
});