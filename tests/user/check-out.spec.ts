import { test, expect } from '@playwright/test';
import data from '@data/user/attendance/check-out.json';
import {BASE_URL, IMAGE_URL} from '@src/config/url.js'

test('[+] New  must be and able to check out using API', async ({ request }) => {

    const imageUserExample = await fetch(IMAGE_URL + "user_example.png");
    const blob = await imageUserExample.blob();
    var formData = new FormData();

    formData.append('attendance_id', data.attendance_id)
    formData.append('date', data.date)
    formData.append('check_out', data.check_in)
    formData.append('location', data.location)
    formData.append('timezone', data.timezone)
    formData.append('latitude', data.latitude)
    formData.append('longitude', data.longitude)
    formData.append('desc', data.desc)
    formData.append('photo', new File([blob], 'user-example.png', { type: 'image/png' }))

    const response = await fetch(`${BASE_URL}attendance/check-out`, {
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