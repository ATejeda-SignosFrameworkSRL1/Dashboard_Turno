import axios from "axios";
import settings from "./settings";

const api = axios.create({
  baseURL: settings.baseAPI || "",
});

api.interceptors.request.use(
  (config) => {
    // Se recalcula en cada request para tomar cambios de runtime (appsettings/localStorage).
    config.baseURL = settings.baseAPI || "";
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;