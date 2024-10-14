import { BASE_URL } from "../../config/url"

class ReportServices {

    report = (body) => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + `report?start_date=${body?.start_date || new Date()}&end_date=${body?.end_date || new Date()}&timezone=${body?.timezone || ''}&convertTimezone=${body?.convertTimezone || ''}`, {
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

export default ReportServices;