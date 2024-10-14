import { BASE_URL } from "../../config/url"

class AuthServices {

    login = (body) => {

        return fetch(BASE_URL + "auth/login", {
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

    register = (body) => {

        return fetch(BASE_URL + "auth/register", {
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

        return fetch(BASE_URL + "auth/update", {
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

        return fetch(BASE_URL + "auth/logout", {
            headers: {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Authorization": "Bearer "+token
            },
            method: "POST"
        })
            .then(ress => ress.json())
            .then(ressJson => {
                return ressJson;
            })
    }

}

export default AuthServices;