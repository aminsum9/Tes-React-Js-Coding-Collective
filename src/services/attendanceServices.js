import { BASE_URL } from "../config/url"

class AttendanceServices {

    checkIn = (body) => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + "attendance/check-in", {
            headers: {
                "Accept": "*/*",
                // "Content-Type": "multipart/form-data",
                "Authorization": "Bearer "+token
            },
            method: "POST",
            body: body
        })
            .then(ress => ress.json())
            .then(ressJson => {
                return ressJson;
            })
    }

    checkOut = (body) => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + "attendance/check-out", {
            headers: {
                "Accept": "*/*",
                // "Content-Type": "multipart/form-data",
                "Authorization": "Bearer "+token
            },
            method: "POST",
            body: body
        })
            .then(ress => ress.json())
            .then(ressJson => {
                return ressJson;
            })
    }

    getAttendances = (body) => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + `attendance?page=${body?.page || 1}&limit=${body?.limit || 10}`, {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            },
            method: "GET",
        })
            .then(ress => ress.json())
            .then(ressJson => {
                return ressJson;
            })
    }

    checkAttendance = () => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + "attendance/check-attendance", {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            },
            method: "POST",
        })
            .then(ress => ress.json())
            .then(ressJson => {
                return ressJson;
            })
    }

}

export default AttendanceServices;