import { BASE_URL } from "../../config/url"

class ShiftServicesAdmin {

    getShifts = () => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + "shift/admin", {
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

}

export default ShiftServicesAdmin;