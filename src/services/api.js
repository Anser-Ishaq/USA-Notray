import axios from "axios";
import useAuthStore from "../stores/authStore";
import AuthService from "./auth.service";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}`;

const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor to add the JWT token to the headers
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setToken, logout } = useAuthStore.getState();

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await AuthService.refreshToken(refreshToken);
        const newToken = response.data.token;

        setToken(newToken);

        // Update the Authorization header with the new token and retry the request
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (error) {
        // Redirect to login page if token refresh fails
        logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
