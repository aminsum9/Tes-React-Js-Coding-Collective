import { test, expect } from '@playwright/test';
import data from '@data/user/attendance/check-in.json';
import {BASE_URL, IMAGE_URL} from '@src/config/url.js'

test('[+] New  must be and able to check in using API', async ({ request }) => {

    const imageUserExample = await fetch(IMAGE_URL + "user_example.png");
    const blob = await imageUserExample.blob();
    var formData = new FormData();

    formData.set('shift_id', data.shift_id)
    formData.append('date', data.date)
    formData.append('check_in', data.check_in)
    formData.append('location', data.location)
    formData.append('timezone', data.timezone)
    formData.append('latitude', data.latitude)
    formData.append('longitude', data.longitude)
    formData.append('desc', data.desc)
    formData.append('photo', new File([blob], 'user-example.png', { type: 'image/png' }))

    const response = await fetch(`${BASE_URL}attendance/check-in`, {
        headers: {
            "Accept": "*/*",
            "Authorization": "Bearer "+data?.token
        },
        method: 'POST',
        body: formData
    });

    // convert response to json
    const bodyResponse = await response.json();
    console.log(bodyResponse)

    // expected result (status and response)
    expect(response.status).toBe(200);
    expect(bodyResponse.success).toBeTruthy();
});