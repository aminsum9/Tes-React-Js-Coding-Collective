import { BASE_URL } from "../../config/url"

class AttendanceServices {

    getAttendances = (body) => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + `attendance/admin?page=${body?.page || 1}&limit=${body?.limit || 10}`, {
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

}

export default AttendanceServices;