import axios from "axios";

const API_BASE_URL = import.meta.env.REACT_APP_API_URL || "http://localhost/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

instance.interceptors.request.use(async(config) => {
  if(!config.headers['X-XSRF-TOKEN']){
    try {
      await axios.get(`${API_BASE_URL.replace('/api', '')}/sanctum/csrf-cookie`, {
        withCredentials: true,
      });
    } catch (error) {
      console.warn("CSRF token fetch failed:", error);
    }
  }
  return config;
});

export default instance;
