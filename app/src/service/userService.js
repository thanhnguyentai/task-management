import axios from 'axios';
import { AppConfig } from '../config';


class UserService {
    checkSession() {
        return axios.get(AppConfig.apiRoot + AppConfig.sessionEndpoint, {
            withCredentials: true
        })
        .then(response => {
            return response.data;
        });
    }

    login(email, password) {
        return axios.get(AppConfig.apiRoot + AppConfig.loginEndpoint, {
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
        return axios.get(AppConfig.apiRoot + AppConfig.logoutEndpoint, {
            withCredentials: true
        })
        .then(response => {
            return response.data;
        });
    }
}

export default new UserService();