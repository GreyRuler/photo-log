import axios from "axios";
import {API_ENDPOINT} from "@/config.ts";
import {getStoredUser, setStoredUser} from "@/lib/utils.ts";

const axiosClient = axios.create({
    baseURL: API_ENDPOINT
})

axiosClient.interceptors.request.use((config) => {
    const user = getStoredUser();
    config.headers.Authorization = `Bearer ${user?.token}`
    return config;
})

axiosClient.interceptors.response.use((response) => {
    return response
}, (error) => {
    const {response} = error;
    if (response.status === 401) {
        setStoredUser(null)
    }

    throw error;
})

export default axiosClient
