import { BASE_URL } from "../../config/url"

class ShiftServices {

    getShifts = () => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + "shift", {
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

export default ShiftServices;