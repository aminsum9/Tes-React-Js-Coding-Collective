import { BASE_URL } from "../../config/url"

class ShiftServicesAdmin {

    getShifts = (body) => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + `shift/admin?page=${body?.page || 1}&limit${body?.limit || 10}`, {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            },
        })
            .then(ress => ress.json())
            .then(ressJson => {
                return ressJson;
            })
    }

    addShift = (body) => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + `shift/add`, {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            },
            body: JSON.stringify(body)
        })
            .then(ress => ress.json())
            .then(ressJson => {
                return ressJson;
            })
    }

}

export default ShiftServicesAdmin;