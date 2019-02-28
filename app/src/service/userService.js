import axios from 'axios';
import { AppConfig } from '../config';


class UserService {
    checkSession() {
        return axios.get(AppConfig.apiRoot + AppConfig.userEndpoint.session, {
            withCredentials: true
        })
        .then(response => {
            return response.data;
        });
    }

    login(email, password) {
        return axios.get(AppConfig.apiRoot + AppConfig.userEndpoint.login, {
            withCredentials: true,
            params: {
                email: email,
                password: password
            }
        })
        .then(response => {
            return response.data;
        });
    }

    logout() {
        return axios.get(AppConfig.apiRoot + AppConfig.userEndpoint.logout, {
            withCredentials: true
        })
        .then(response => {
            return response.data;
        });
    }

    createAccount(username, email, password) {
        return axios.post(AppConfig.apiRoot + AppConfig.userEndpoint.createAccount, {
            name: username,
            email: email,
            password: password
        }, {
            withCredentials: true
        })
        .then(response => {
            return response.data;
        });
    }
}

export default new UserService();