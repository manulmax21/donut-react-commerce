import axios from "axios";
import useCookie from "../hooks/useCookie";

const url = import.meta.env.VITE_API_URL

const api = axios.create({
    baseURL: url
});
const {getCookie} = useCookie()
api.interceptors.request.use(config => {
    const token = getCookie("token")
    if (token) {
        config.headers = {authorization: `Bearer ${token}`}
    }

    return config
})

export default api