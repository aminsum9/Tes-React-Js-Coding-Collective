import { BASE_URL } from "../../config/url"

class AuthServicesAdmin {

    login = (body) => {

        return fetch(BASE_URL + "auth/admin/login", {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(ress => ress.json())
            .then(ressJson => {
                return ressJson;
            })
    }

    update = (body) => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + "auth/admin/update", {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            },
            method: "POST",
            body: JSON.stringify(body)
        })
            .then(ress => ress.json())
            .then(ressJson => {
                return ressJson;
            })
    }

    logout = () => {
        var token = localStorage.getItem('token');

        return fetch(BASE_URL + "auth/admin/logout", {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            },
            method: "POST"
        })
            .then(ress => ress.json())
            .then(ressJson => {
                console.log("ressJson: ",ressJson)
                return ressJson;
            })
    }

}

export default AuthServicesAdmin;