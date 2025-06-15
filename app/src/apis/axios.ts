import axios from "axios";


const API_BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost/api";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

apiClient.interceptors.request.use(async (config) => {
    if(!config.headers['X-XSRF-TOKEN']){
        try {
            await axios.get(`/sanctum/csrf-cookie`);
        } catch (error) {
            console.error("CSRF token fetch failed:", error);
        }
    }
    return config;
});

export default apiClient;