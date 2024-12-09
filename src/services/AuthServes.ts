import { AxiosResponse } from 'axios';
import {User} from '../store/types/types';
import api from "../axios";

export class AuthServes {
    static postLoginAuth(body) {
        const url = `/user/login`
        return api.post<User>(url, body)
    }
    static postRegAuth(body) {
        const url = `/user/register`
        return api.post<User>(url, body)
    }
    static getCurrentAuth() {
        const url = `/user/current`
        return api.get<User>(url)
    }
    static updateNameAuth(body) {
        const url = `/user/update-name`
        return api.put<User>(url, body)
    }
    static updatePasswordAuth(body) {
        const url = `/user/update-password`
        return api.put<User>(url, body)
    }
}