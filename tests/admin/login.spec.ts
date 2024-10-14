import { test, expect } from '@playwright/test';
import data from '@data/admin/login/login.json';
import {BASE_URL} from '@src/config/url.js'

test('[+] Admin must be authenticated and able to login using API', async ({ request }) => {

    const response = await request.post(`${BASE_URL}auth/admin/login`, {
        data: data
    });

    // convert response to string
    const bodyResponse = (await response.body()).toString();
    const bodyResponseToJson = JSON.parse(bodyResponse);
    console.log(bodyResponseToJson);

    // expected result (status and response)
    expect(response.status()).toBe(200);
    expect(bodyResponseToJson.data).toBeDefined();
});