import { test, expect } from '@playwright/test';
import data from '@data/user/attendance/attendance.json';
import {BASE_URL} from '@src/config/url.js'

test('[+] Users must be able to get data attendances using API', async ({ request }) => {

    const response = await request.get(`${BASE_URL}attendance?page=${data.page}&limit=${data.limit}`, {
        headers: {
            "Accept": "*/*",
            "Content-Type": "application/json",
            "Authorization": "Bearer "+data?.token
        }
    });

    // convert response to string
    const bodyResponse = (await response.body()).toString();
    const bodyResponseToJson = JSON.parse(bodyResponse);
    console.log(bodyResponseToJson);

    // expected result (status and response)
    expect(response.status()).toBe(200);
    expect(bodyResponseToJson.data).toBeDefined();
});