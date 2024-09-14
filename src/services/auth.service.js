import axios from "axios";
import useAuthStore from "../stores/authStore";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/auth`;

const register = (username, email, password) => {
  return axios.post(`${API_URL}/register`, { username, email, password });
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

  if (response.data.token) {
    useAuthStore.getState().setToken(response.data.token);
    useAuthStore.getState().setRefreshToken(response.data.refreshToken);
  }

  return response.data;
};

const refreshToken = (refreshToken) => {
  return axios.post(`${API_URL}/refresh-token`, { token: refreshToken });
};

const forgetPassword = (email) => {
  return axios.post(`${API_URL}/forget-password`, { email });
};

const logout = () => {
  localStorage.clear()
  useAuthStore.getState().logout();
};

export default {
  register,
  login,
  refreshToken,
  forgetPassword,
  logout,
};
