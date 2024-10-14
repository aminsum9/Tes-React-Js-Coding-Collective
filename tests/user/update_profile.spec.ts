import { test, expect } from '@playwright/test';
import data from '@data/user/update_profile/update.json';
import {BASE_URL} from '@src/config/url.js'

test('[+] Users must able to update profile using API', async ({ request }) => {

    const response = await request.post(`${BASE_URL}auth/update`, {
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+data?.token
        },
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